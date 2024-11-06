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
exports.PropertyController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const property_service_1 = require("./property.service");
const swagger_1 = require("@nestjs/swagger");
const updatePropertyDto_1 = require("../dtos/updatePropertyDto");
const platform_express_1 = require("@nestjs/platform-express");
const auth_guard_1 = require("../guards/auth.guard");
let PropertyController = class PropertyController {
    constructor(propertyService) {
        this.propertyService = propertyService;
    }
    getProperties() {
        const properties = this.propertyService.getProperties();
        return properties;
    }
    getPropertyById(id) {
        const repository = this.propertyService.getPropertyById(id);
        return repository;
    }
    async addProperty(property, photos) {
        const newProperty = await this.propertyService.addProperty(property, photos);
        return newProperty;
    }
    updateProperty(id, property) {
        const updateProperty = this.propertyService.updateProperty(id, property);
        return updateProperty;
    }
    deacticateProperty(id) {
        const deactivatedProperty = this.propertyService.deactivateProperty(id);
        return deactivatedProperty;
    }
    activateProperty(id) {
        const activatedProperty = this.propertyService.activateProperty(id);
        return activatedProperty;
    }
    async filterProperties(query) {
        return this.propertyService.filterProperties(query);
    }
    async getCoordinates(state, city) {
        if (!state || !city) {
            throw new common_1.BadRequestException('State y City son requeridos');
        }
        try {
            const coordinates = await this.propertyService.getCoordinates(state, city);
            return coordinates;
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message);
        }
    }
    deleteProperty(id) {
        const deletedProperty = this.propertyService.deleteProperty(id);
        return deletedProperty;
    }
};
exports.PropertyController = PropertyController;
__decorate([
    (0, common_1.HttpCode)(200),
    (0, common_1.Get)(),
    openapi.ApiResponse({ status: 200, type: [require("../entities/property.entity").Property] }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], PropertyController.prototype, "getProperties", null);
__decorate([
    (0, common_1.HttpCode)(200),
    (0, common_1.Get)(`:id`),
    openapi.ApiResponse({ status: 200, type: require("../entities/property.entity").Property }),
    __param(0, (0, common_1.Param)(`id`)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PropertyController.prototype, "getPropertyById", null);
__decorate([
    (0, common_1.HttpCode)(201),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, swagger_1.ApiBody)({
        description: 'Pon los datos y sube imagenes:',
        schema: {
            type: 'object',
            properties: {
                title: {
                    type: `string`,
                    example: `Cabaña`,
                },
                description: {
                    type: `string`,
                    example: `Cabaña acogedora en la montaña`,
                },
                state: {
                    type: `string`,
                    example: `Buenos Aires`,
                },
                city: {
                    type: `string`,
                    example: `La Plata`,
                },
                price: {
                    type: `number`,
                    example: 1000,
                },
                isAvailable: {
                    type: `boolean`,
                    example: true,
                },
                capacity: {
                    type: `number`,
                    example: 4,
                },
                bedrooms: {
                    type: `number`,
                    example: 2,
                },
                bathrooms: {
                    type: `number`,
                    example: 1,
                },
                photos: {
                    type: 'array',
                    items: { type: `string`, format: 'binary' },
                },
            },
        },
    }),
    (0, common_1.UseInterceptors)((0, platform_express_1.FilesInterceptor)(`photos`)),
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    openapi.ApiResponse({ status: 201, type: require("../entities/property.entity").Property }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.UploadedFiles)(new common_1.ParseFilePipe({
        validators: [
            new common_1.MaxFileSizeValidator({
                maxSize: 5000000,
                message: 'El archivo no puede pesar 5mb o más',
            }),
            new common_1.FileTypeValidator({
                fileType: /(jpg|jpeg|png|webp|svg)$/,
            }),
        ],
    }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Array]),
    __metadata("design:returntype", Promise)
], PropertyController.prototype, "addProperty", null);
__decorate([
    (0, common_1.HttpCode)(200),
    (0, common_1.Put)(`:id`),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Param)(`id`)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, updatePropertyDto_1.UpdatePropertyDto]),
    __metadata("design:returntype", void 0)
], PropertyController.prototype, "updateProperty", null);
__decorate([
    (0, common_1.HttpCode)(200),
    (0, common_1.Put)(`/deactivate/:id`),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    openapi.ApiResponse({ status: 200, type: String }),
    __param(0, (0, common_1.Param)(`id`)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PropertyController.prototype, "deacticateProperty", null);
__decorate([
    (0, common_1.HttpCode)(200),
    (0, common_1.Put)(`/activate/:id`),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    openapi.ApiResponse({ status: 200, type: String }),
    __param(0, (0, common_1.Param)(`id`)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PropertyController.prototype, "activateProperty", null);
__decorate([
    (0, common_1.HttpCode)(200),
    (0, common_1.Get)('filter'),
    openapi.ApiResponse({ status: 200, type: [require("../entities/property.entity").Property] }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PropertyController.prototype, "filterProperties", null);
__decorate([
    (0, common_1.Get)('coordinates'),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Query)('state')),
    __param(1, (0, common_1.Query)('city')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], PropertyController.prototype, "getCoordinates", null);
__decorate([
    (0, common_1.Delete)(`:id`),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    openapi.ApiResponse({ status: 200, type: String }),
    __param(0, (0, common_1.Param)(`id`)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PropertyController.prototype, "deleteProperty", null);
exports.PropertyController = PropertyController = __decorate([
    (0, swagger_1.ApiTags)(`property`),
    (0, common_1.Controller)(`properties`),
    __metadata("design:paramtypes", [property_service_1.PropertyService])
], PropertyController);
//# sourceMappingURL=property.controller.js.map