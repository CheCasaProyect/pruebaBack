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
exports.UserRepository = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const property_repository_1 = require("../property/property.repository");
const reservations_repository_1 = require("../reservations/reservations.repository");
const users_entity_1 = require("../entities/users.entity");
const typeorm_2 = require("typeorm");
let UserRepository = class UserRepository {
    constructor(userRepository, propertyRepository, reservationsRepository) {
        this.userRepository = userRepository;
        this.propertyRepository = propertyRepository;
        this.reservationsRepository = reservationsRepository;
    }
    getAllUsers() {
        return this.userRepository.find();
    }
    getUserById(id) {
        return this.userRepository.findOneBy({ id: id });
    }
    async getUserByEmail(email) {
        return this.userRepository.findOne({ where: { email } });
    }
    createUser(userData) {
        const newUser = this.userRepository.create(userData);
        return this.userRepository.save(newUser);
    }
    userUpdate(id, updateUser) {
        return this.userRepository.update(id, updateUser);
    }
    async deactivateUser(id) {
        const user = await this.userRepository.findOne({
            where: { id },
            relations: ['properties', 'reservations'],
        });
        if (!user)
            throw new common_1.NotFoundException('User not found');
        user.active = false;
        await this.userRepository.save(user);
        await Promise.all(user.properties.map(async (property) => {
            property.active = false;
            property.isAvailable = false;
            await this.propertyRepository.updateProperty(id, property);
        }));
        if (user.reservations && user.reservations.length > 0) {
            await Promise.all(user.reservations.map(async (reservation) => {
                await this.reservationsRepository.cancelReservation(reservation.id);
            }));
        }
        return 'Disabled user';
    }
    async activeUser(id) {
        const user = await this.userRepository.findOneBy({ id });
        if (!user)
            throw new common_1.NotFoundException('User not found');
        user.active = true;
        await this.userRepository.save(user);
        return 'Active user';
    }
    removeUser(id) {
        return this.userRepository.delete({ id: id });
    }
    async updateRefreshToken(id, refreshToken) {
        const user = await this.userRepository.findOneBy({ id });
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        user.refreshToken = refreshToken;
        return await this.userRepository.save(user);
    }
};
exports.UserRepository = UserRepository;
exports.UserRepository = UserRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(users_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        property_repository_1.PropertyRepository,
        reservations_repository_1.ReservationsRepository])
], UserRepository);
//# sourceMappingURL=user.repository.js.map