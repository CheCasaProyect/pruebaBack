"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const auth_service_1 = require("./auth.service");
const swagger_1 = require("@nestjs/swagger");
const userDto_1 = require("../dtos/userDto");
const loginDto_1 = require("../dtos/loginDto");
let AuthController = class AuthController {
    constructor(authService) {
        this.authService = authService;
    }
    signinUp(user) {
        return this.authService.signUp(user);
    }
    login(login) {
        const { email, password } = login;
        return this.authService.login(email, password);
    }
    async signinWithGoogle() {
        return { url: 'https://accounts.google.com/o/oauth2/auth?...' };
    }
    async googleOAuthredirect(req, res) {
        this.authService.googleAuthRedirect(req.user, res);
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'SignUp' }),
    (0, common_1.Post)('signup'),
    openapi.ApiResponse({ status: 201, type: String }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [userDto_1.UserDto]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "signinUp", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Login' }),
    (0, common_1.Post)('login'),
    openapi.ApiResponse({ status: 201 }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [loginDto_1.LoginDto]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "login", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Login Google' }),
    (0, common_1.Post)('oauth/google'),
    openapi.ApiResponse({ status: 201 }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "signinWithGoogle", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Redirect' }),
    (0, common_1.Post)('oauth/google/redirect'),
    openapi.ApiResponse({ status: 201 }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "googleOAuthredirect", null);
exports.AuthController = AuthController = __decorate([
    (0, swagger_1.ApiTags)('auth'),
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], AuthController);
//# sourceMappingURL=auth.controller.js.map