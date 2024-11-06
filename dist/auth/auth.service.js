"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const bcrypt = __importStar(require("bcrypt"));
const jwt_1 = require("@nestjs/jwt");
const user_repository_1 = require("../user/user.repository");
const user_enum_1 = require("../utils/user.enum");
const mailer_1 = require("../config/mailer");
const google_auth_library_1 = require("google-auth-library");
let AuthService = class AuthService {
    constructor(userRepository, jwtService) {
        this.userRepository = userRepository;
        this.jwtService = jwtService;
        this.SALT_ROUNDS = 10;
        this.client = new google_auth_library_1.OAuth2Client(process.env.GOOGLE_CLIENT_ID);
    }
    async signUp(user) {
        const { email, password } = user;
        if (!email || !password)
            throw new common_1.BadRequestException('Required');
        const foundUser = await this.userRepository.getUserByEmail(user.email);
        if (foundUser)
            throw new common_1.BadRequestException('Email already exists');
        const hashedPassword = await bcrypt.hash(user.password, 10);
        if (!hashedPassword)
            throw new common_1.BadRequestException('Password could not hashed');
        console.log(hashedPassword);
        await this.userRepository.createUser({ ...user, password: hashedPassword });
        await mailer_1.transporter.sendMail({
            from: '"Te Registraste en CheCasa ✍" <che.casa.proyect@gmail.com>',
            to: user.email,
            subject: 'Registro existoso',
            html: `
          <b>Te has registrado en la página CheCasa correctamente, ahora solo debes iniciar sesión si deseas reservar una propiedad.</b>
          <b>Toca aquí para dirigirte directamente al inicio de sesión en CheCasa: <a href="https://checasafront.onrender.com/login">Ir a Iniciar Sesión</a></b>
          `,
        });
        return 'User created successfully!';
    }
    async login(email, password) {
        if (!email || !password)
            throw new common_1.BadRequestException('Required');
        const user = await this.userRepository.getUserByEmail(email);
        if (!user)
            throw new common_1.NotFoundException('Invalid Credentials');
        const passwordValidation = await bcrypt.compare(password, user.password);
        if (!passwordValidation)
            throw new common_1.BadRequestException('Invalid Credentials');
        const payload = {
            id: user.id,
            email: user.email,
            roles: [user.isAdmin ? user_enum_1.Role.Admin : user_enum_1.Role.User]
        };
        const token = this.jwtService.sign(payload);
        await mailer_1.transporter.sendMail({
            from: '"Iniciaste Sesión en CheCasa 👌" <che.casa.proyect@gmail.com>',
            to: user.email,
            subject: 'Inicio de sesión exitoso',
            html: `
          <b>Has iniciado sesión en la página de CheCasa con éxito, para poder reservar solo debes completar todos los datos de tu perfil.</b>
          <b>Toca aquí para dirigirte directamente al Home de CheCasa: <a href="https://checasafront.onrender.com/">Ir al Home</a></b>
          `,
        });
        return {
            message: 'Loggin successfully!',
            token,
        };
    }
    async googleAuthRedirect(token, res) {
        const ticket = await this.client.verifyIdToken({ idToken: token, audience: process.env.GOOGLE_CLIENT_ID, });
        const payload = ticket.getPayload();
        if (!payload) {
            throw new common_1.NotFoundException('Google account not found');
        }
        const user = {
            email: payload.email,
            name: payload.name,
        };
        this.userId = (await this.userRepository.getUserByEmail(user.email))?.id;
        if (!this.userId) {
            this.userId = (await this.userRepository.createUser(user)).id;
        }
        const refreshToken = await this.generateRefreshToken(this.userId);
        const accessToken = await this.generateAccessToken(this.userId);
        const hashedRefreshToken = await bcrypt.hash(refreshToken, this.SALT_ROUNDS);
        await this.userRepository.updateRefreshToken(this.userId, hashedRefreshToken);
        res.cookie('token', refreshToken, {
            maxAge: 3 * 24 * 60 * 60 * 1000,
            httpOnly: true,
        });
        res.json({
            status: 'success',
            message: 'Login successfully',
            data: { accessToken: accessToken, },
        });
        ;
        await mailer_1.transporter.sendMail({
            from: '"Iniciaste Sesión en CheCasa 👌" <che.casa.proyect@gmail.com>',
            to: user.email,
            subject: 'Inicio de sesión exitoso',
            html: `
      <b>Has iniciado sesión en la página de CheCasa con éxito, para poder reservar solo debes completar todos los datos de tu perfil.</b>
      <b>Toca aquí para dirigirte directamente al Home de CheCasa: <a href="https://checasafront.onrender.com/">Ir al Home</a></b>
      `,
        });
    }
    async generateAccessToken(userId) {
        return await this.jwtService.signAsync({ sub: userId }, {
            secret: process.env.ACCESS_TOKEN_SECRET,
            expiresIn: '20m',
        });
    }
    async generateRefreshToken(userId) {
        return await this.jwtService.signAsync({ sub: userId }, {
            secret: process.env.REFRESH_TOKEN_SECRET,
            expiresIn: '3d',
        });
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_repository_1.UserRepository,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map