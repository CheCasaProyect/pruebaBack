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
exports.UserController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const user_service_1 = require("./user.service");
const users_entity_1 = require("../entities/users.entity");
const auth_guard_1 = require("../guards/auth.guard");
const role_guard_1 = require("../guards/role.guard");
let UserController = class UserController {
    constructor(userService) {
        this.userService = userService;
    }
    getAllUser() {
        return this.userService.getAllUsers();
    }
    getUserByEmail(email) {
        if (!email) {
            throw new common_1.BadRequestException('Email is required');
        }
        console.log('email a buscar: ' + email);
        return this.userService.getUserByEmail(email);
    }
    deactivateUser(id) {
        return this.userService.deactivateUser(id);
    }
    activateUser(id) {
        return this.userService.activeUser(id);
    }
    removeUser(id) {
        return this.userService.removeUser(id);
    }
    getUserById(id) {
        return this.userService.getUserById(id);
    }
    updateUser(id, updateUser) {
        return this.userService.updateUser(id, updateUser);
    }
};
exports.UserController = UserController;
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get All Users' }),
    (0, common_1.Get)(),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard, role_guard_1.AccessGuard),
    (0, swagger_1.ApiBearerAuth)(),
    openapi.ApiResponse({ status: 200 }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], UserController.prototype, "getAllUser", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get User By Email' }),
    (0, common_1.Get)('email'),
    (0, common_1.UseGuards)(role_guard_1.AccessGuard),
    openapi.ApiResponse({ status: 200, type: require("../entities/users.entity").User }),
    __param(0, (0, common_1.Query)('email')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "getUserByEmail", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Deactivate User' }),
    (0, common_1.Put)(':id/deactivate'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    openapi.ApiResponse({ status: 200, type: String }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "deactivateUser", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Activate User' }),
    (0, common_1.Put)(':id/activate'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    openapi.ApiResponse({ status: 200, type: String }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "activateUser", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Remove User' }),
    (0, common_1.Delete)(':id/delete'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    openapi.ApiResponse({ status: 200, type: String }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "removeUser", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get User By ID' }),
    (0, common_1.Get)(':id'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "getUserById", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Update User' }),
    (0, common_1.Put)(':id'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, users_entity_1.User]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "updateUser", null);
exports.UserController = UserController = __decorate([
    (0, swagger_1.ApiTags)('users'),
    (0, common_1.Controller)('users'),
    __metadata("design:paramtypes", [user_service_1.UserService])
], UserController);
//# sourceMappingURL=user.controller.js.map