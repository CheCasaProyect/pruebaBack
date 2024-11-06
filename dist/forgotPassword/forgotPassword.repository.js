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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ForgotPasswordRepository = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const users_entity_1 = require("../entities/users.entity");
const user_repository_1 = require("../user/user.repository");
const typeorm_2 = require("typeorm");
const bcrypt = __importStar(require("bcrypt"));
const mailer_1 = require("../config/mailer");
(0, common_1.Injectable)();
let ForgotPasswordRepository = class ForgotPasswordRepository {
    constructor(userDBRepository, userRepository) {
        this.userDBRepository = userDBRepository;
        this.userRepository = userRepository;
    }
    async getEmail(email) {
        const user = await this.userRepository.getUserByEmail(email);
        if (!user) {
            throw new common_1.NotFoundException(`User not found`);
        }
        await mailer_1.transporter.sendMail({
            from: '"Has olvidado tu contraseña?" <che.casa.proyect@gmail.com>',
            to: user.email,
            subject: 'Cambiar contraseña',
            html: '<b>Para cambiar la contraseña sigue este link:</b>',
        });
        return `Verifique su email para cambiar la contraseña`;
    }
    async changePassword(id, newPassword) {
        const user = await this.userDBRepository.findOne({ where: { id } });
        if (!user) {
            throw new common_1.NotFoundException(`User not found`);
        }
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
        await this.userDBRepository.save(user);
        return `Contraseña cambiada con éxito`;
    }
};
exports.ForgotPasswordRepository = ForgotPasswordRepository;
exports.ForgotPasswordRepository = ForgotPasswordRepository = __decorate([
    __param(0, (0, typeorm_1.InjectRepository)(users_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        user_repository_1.UserRepository])
], ForgotPasswordRepository);
//# sourceMappingURL=forgotPassword.repository.js.map