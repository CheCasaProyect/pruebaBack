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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ForgotPasswordService = void 0;
const common_1 = require("@nestjs/common");
const forgotPassword_repository_1 = require("./forgotPassword.repository");
let ForgotPasswordService = class ForgotPasswordService {
    constructor(forgotPasswordRepository) {
        this.forgotPasswordRepository = forgotPasswordRepository;
    }
    getEmail(email) {
        return this.forgotPasswordRepository.getEmail(email);
    }
    changePassword(id, newPassword) {
        return this.forgotPasswordRepository.changePassword(id, newPassword);
    }
};
exports.ForgotPasswordService = ForgotPasswordService;
exports.ForgotPasswordService = ForgotPasswordService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [forgotPassword_repository_1.ForgotPasswordRepository])
], ForgotPasswordService);
//# sourceMappingURL=forgotPassword.service.js.map