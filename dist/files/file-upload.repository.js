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
exports.FileUploadRepository = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const users_entity_1 = require("../entities/users.entity");
const typeorm_2 = require("typeorm");
const property_entity_1 = require("../entities/property.entity");
const cloudinary_service_1 = require("./cloudinary.service");
let FileUploadRepository = class FileUploadRepository {
    constructor(cloudinaryService, userDBRepository, propertyDBRepository) {
        this.cloudinaryService = cloudinaryService;
        this.userDBRepository = userDBRepository;
        this.propertyDBRepository = propertyDBRepository;
    }
    async uploadProfileImg(file, userId) {
        try {
            const foundUser = await this.userDBRepository.findOne({
                where: { id: userId },
            });
            if (!foundUser) {
                throw new common_1.NotFoundException(`Usuario no encontrado.`);
            }
            try {
                const uploadImg = await this.cloudinaryService.uploadImage(file);
                if (!uploadImg || uploadImg === undefined || uploadImg === null) {
                    throw new common_1.ConflictException(`No se subió la imagen correctamente`);
                }
                foundUser.profileImgUrl = uploadImg.secure_url;
            }
            catch (error) {
                if (error instanceof common_1.ConflictException) {
                    throw new common_1.ConflictException(error.message);
                }
                throw new common_1.ConflictException(`No se pudo subir la imágen correctamente`);
            }
            await this.userDBRepository.save(foundUser);
            return foundUser;
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException) {
                throw new common_1.NotFoundException(error.message);
            }
            if (error instanceof common_1.ConflictException) {
                throw new common_1.ConflictException(error.message);
            }
        }
    }
    async uploadPropertyImg(photos, propertyId) {
        try {
            const photosArray = [];
            const photosPromises = photos.map(async (file) => {
                try {
                    const uploadImg = await this.cloudinaryService.uploadImage(file);
                    if (!uploadImg || !uploadImg.secure_url) {
                        throw new common_1.ConflictException(`No se subió la imágen correctamente`);
                    }
                    photosArray.push(uploadImg.secure_url);
                }
                catch (error) {
                    throw new common_1.ConflictException(`Error uploading files`);
                }
            });
            await Promise.all(photosPromises);
            const foundProperty = await this.propertyDBRepository.findOne({
                where: { id: propertyId },
            });
            if (!foundProperty) {
                throw new common_1.NotFoundException(`Propiedad no encontrada.`);
            }
            await this.propertyDBRepository.update(propertyId, {
                photos: photosArray,
            });
            const foundUpdatedProperty = await this.propertyDBRepository.findOne({
                where: { id: propertyId },
            });
            if (!foundUpdatedProperty) {
                throw new common_1.NotFoundException(`No se econtró la propiedad actualizada`);
            }
            return foundUpdatedProperty;
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException) {
                throw new common_1.NotFoundException(error.message);
            }
            if (error instanceof common_1.ConflictException) {
                throw new common_1.ConflictException(error.message);
            }
        }
    }
};
exports.FileUploadRepository = FileUploadRepository;
exports.FileUploadRepository = FileUploadRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, typeorm_1.InjectRepository)(users_entity_1.User)),
    __param(2, (0, typeorm_1.InjectRepository)(property_entity_1.Property)),
    __metadata("design:paramtypes", [cloudinary_service_1.CloudinaryService,
        typeorm_2.Repository,
        typeorm_2.Repository])
], FileUploadRepository);
//# sourceMappingURL=file-upload.repository.js.map