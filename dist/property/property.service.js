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
exports.PropertyService = void 0;
const common_1 = require("@nestjs/common");
const property_repository_1 = require("./property.repository");
let PropertyService = class PropertyService {
    constructor(propertyRepository) {
        this.propertyRepository = propertyRepository;
    }
    getProperties() {
        const properties = this.propertyRepository.getProperties();
        return properties;
    }
    getPropertyById(id) {
        const property = this.propertyRepository.getPropertyById(id);
        return property;
    }
    async addProperty(property, photos) {
        const newProperty = await this.propertyRepository.addProperty(property, photos);
        return newProperty;
    }
    updateProperty(id, property) {
        const updateProperty = this.propertyRepository.updateProperty(id, property);
        return updateProperty;
    }
    deactivateProperty(id) {
        const deactivatedProperty = this.propertyRepository.deactivateProperty(id);
        return deactivatedProperty;
    }
    activateProperty(id) {
        const activatedProperty = this.propertyRepository.activateProperty(id);
        return activatedProperty;
    }
    filterProperties(filters) {
        return this.propertyRepository.filterProperties(filters);
    }
    getCoordinates(state, city) {
        return this.propertyRepository.getCoordinates(state, city);
    }
    deleteProperty(id) {
        const deletedProperty = this.propertyRepository.deleteProperty(id);
        return deletedProperty;
    }
};
exports.PropertyService = PropertyService;
exports.PropertyService = PropertyService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [property_repository_1.PropertyRepository])
], PropertyService);
//# sourceMappingURL=property.service.js.map