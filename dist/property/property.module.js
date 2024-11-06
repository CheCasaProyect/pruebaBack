"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PropertyModule = void 0;
const common_1 = require("@nestjs/common");
const property_controller_1 = require("./property.controller");
const property_service_1 = require("./property.service");
const property_repository_1 = require("./property.repository");
const typeorm_1 = require("@nestjs/typeorm");
const property_entity_1 = require("../entities/property.entity");
const reservations_module_1 = require("../reservations/reservations.module");
const cloudinary_1 = require("../config/cloudinary");
const cloudinary_service_1 = require("../files/cloudinary.service");
const axios_1 = require("@nestjs/axios");
let PropertyModule = class PropertyModule {
};
exports.PropertyModule = PropertyModule;
exports.PropertyModule = PropertyModule = __decorate([
    (0, common_1.Module)({
        imports: [
            axios_1.HttpModule,
            reservations_module_1.ReservationsModule,
            typeorm_1.TypeOrmModule.forFeature([property_entity_1.Property]),
        ],
        controllers: [property_controller_1.PropertyController],
        providers: [
            property_service_1.PropertyService,
            property_repository_1.PropertyRepository,
            cloudinary_service_1.CloudinaryService,
            cloudinary_1.CloudinaryConfig,
        ],
        exports: [property_repository_1.PropertyRepository],
    })
], PropertyModule);
//# sourceMappingURL=property.module.js.map