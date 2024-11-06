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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const user_repository_1 = require("./user.repository");
let UserService = class UserService {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async getAllUsers() {
        const user = await this.userRepository.getAllUsers();
        const userWithoutPass = user.map(({ password, ...userWithoutPass }) => userWithoutPass);
        return userWithoutPass;
    }
    async getUserById(id) {
        const user = await this.userRepository.getUserById(id);
        if (!user)
            throw new common_1.NotFoundException('User not found');
        const { password, ...userWithoutPass } = user;
        return userWithoutPass;
    }
    async getUserByEmail(email) {
        const user = await this.userRepository.getUserByEmail(email);
        if (!user)
            throw new common_1.NotFoundException('User not found');
        return user;
    }
    async createUser(userData) {
        try {
            const newUser = await this.userRepository.createUser(userData);
            const { password, ...userWithoutPass } = newUser;
            return userWithoutPass;
        }
        catch (error) {
            throw new common_1.BadRequestException('New user not created');
        }
    }
    async updateUser(id, updateUser) {
        const findUser = await this.userRepository.getUserById(id);
        if (!findUser)
            throw new common_1.NotFoundException('User not found');
        const user = Object.assign(findUser, updateUser);
        const { password, ...userWithoutPass } = user;
        return userWithoutPass;
    }
    async deactivateUser(id) {
        return await this.userRepository.deactivateUser(id);
    }
    async activeUser(id) {
        return await this.userRepository.activeUser(id);
    }
    async removeUser(id) {
        const user = await this.userRepository.getUserById(id);
        if (!user)
            throw new common_1.NotFoundException('User not found');
        await this.userRepository.removeUser(id);
        return 'User removed successfully';
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_repository_1.UserRepository])
], UserService);
//# sourceMappingURL=user.service.js.map