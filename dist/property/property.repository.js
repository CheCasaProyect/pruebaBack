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
exports.PropertyRepository = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const property_entity_1 = require("../entities/property.entity");
const typeorm_2 = require("typeorm");
const fs = __importStar(require("fs"));
const stripe_1 = require("stripe");
const cloudinary_service_1 = require("../files/cloudinary.service");
const axios_1 = require("@nestjs/axios");
let PropertyRepository = class PropertyRepository {
    constructor(propertyDBRepository, cloudinaryService, httpService) {
        this.propertyDBRepository = propertyDBRepository;
        this.cloudinaryService = cloudinaryService;
        this.httpService = httpService;
        this.stripe = new stripe_1.Stripe(process.env.STRIPE_SECRET_KEY, {
            apiVersion: '2024-09-30.acacia',
        });
    }
    async getProperties() {
        try {
            const properties = await this.propertyDBRepository.find();
            if (!properties) {
                throw new common_1.NotFoundException(`No se encontraron las propiedades`);
            }
            return properties;
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException) {
                throw new common_1.NotFoundException(error.message);
            }
        }
    }
    async getPropertyById(id) {
        try {
            const property = await this.propertyDBRepository.findOne({
                where: { id },
            });
            if (!property) {
                throw new common_1.NotFoundException(`No se encontró la propiedad`);
            }
            return property;
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException) {
                throw new common_1.NotFoundException(error.message);
            }
        }
    }
    async addProperty(property, photos) {
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
            const stripeProduct = await this.stripe.products.create({
                name: property.title,
                description: property.description,
                images: photosArray,
            });
            const stripePrice = await this.stripe.prices.create({
                unit_amount: property.price * 100,
                currency: 'USD',
                product: stripeProduct.id,
            });
            const newProperty = this.propertyDBRepository.create({
                title: property.title,
                description: property.description,
                state: property.state,
                city: property.city,
                price: Number(property.price),
                isAvailable: property.isAvailable,
                capacity: property.capacity,
                bedrooms: property.bedrooms,
                bathrooms: property.bathrooms,
                photos: photosArray,
                stripeProductId: stripeProduct.id,
                stripePriceId: stripePrice.id,
            });
            if (!newProperty) {
                throw new common_1.ConflictException(`La propiedad no se creó correctamente`);
            }
            const saveProperty = await this.propertyDBRepository.save(newProperty);
            if (!saveProperty) {
                throw new common_1.ConflictException(`La propiedad no se pudo guardar correctamente en la base de datos`);
            }
            return saveProperty;
        }
        catch (error) {
            if (error instanceof common_1.ConflictException) {
                throw new common_1.ConflictException(error.message);
            }
        }
    }
    async updateProperty(id, property) {
        try {
            const foundProperty = await this.propertyDBRepository.findOne({
                where: { id },
            });
            if (!foundProperty) {
                throw new common_1.NotFoundException(`No se encontró la propiedad`);
            }
            const updateProperty = this.propertyDBRepository.update(id, property);
            return updateProperty;
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException) {
                throw new common_1.NotFoundException(error.message);
            }
        }
    }
    async deactivateProperty(id) {
        try {
            const property = await this.propertyDBRepository.findOne({
                where: { id },
            });
            if (!property) {
                throw new common_1.NotFoundException(`Property not found`);
            }
            property.active = false;
            property.isAvailable = false;
            await this.propertyDBRepository.save(property);
            return `Se desactivó la propiedad con éxito`;
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException) {
                throw new common_1.NotFoundException(error.message);
            }
        }
    }
    async activateProperty(id) {
        try {
            const property = await this.propertyDBRepository.findOne({
                where: { id },
            });
            if (!property) {
                throw new common_1.NotFoundException(`Property not found`);
            }
            property.active = true;
            property.isAvailable = true;
            await this.propertyDBRepository.save(property);
            return `Se activó la propiedad con éxito`;
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException) {
                throw new common_1.NotFoundException(error.message);
            }
        }
    }
    async filterProperties(filters) {
        const query = this.propertyDBRepository.createQueryBuilder('property');
        if (filters.state) {
            query.andWhere('property.state = :state'), { state: filters.state };
        }
        if (filters.city) {
            query.andWhere('property.city = :city'), { city: filters.city };
        }
        if (filters.price && filters.price.length == 2) {
            query.andWhere('property.price BETWEEN :minPrice AND :maxPrice', {
                minPrice: filters.price[0],
                maxPrice: filters.price[1],
            });
        }
        if (filters.capacity) {
            query.andWhere('property.capacity >= :capacity', {
                capacity: filters.capacity,
            });
        }
        if (filters.price && filters.price.length == 2) {
            query.andWhere('property.price >= :minPrice AND property.price <= :maxPrice', {
                minPrice: filters.price[0],
                maxPrice: filters.price[1],
            });
        }
        if (filters.bedrooms && filters.bedrooms.length) {
            query.andWhere('property.bedrooms >= :bedrooms', {
                bedrooms: filters.bedrooms[0],
            });
        }
        return await query.getMany();
    }
    async seederProperties() {
        try {
            const data = fs.readFileSync('src/seeder/properties.json', 'utf8');
            const properties = JSON.parse(data);
            for (const property of properties) {
                const existingProperty = await this.propertyDBRepository.findOne({
                    where: { title: property.title },
                });
                if (!existingProperty) {
                    const newProperty = this.propertyDBRepository.create(property);
                    await this.propertyDBRepository.save(newProperty);
                    console.log(`Propiedad ${property.title} creada correctamente.`);
                }
                else {
                    console.log(`Propiedad ${property.title} ya existe.`);
                }
            }
            console.log('seeder completo');
        }
        catch (error) {
            console.error('Error al cargar el seeder:', error);
        }
    }
    async getCoordinates(state, city) {
        const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(city + ', ' + state)}`;
        try {
            const response = await this.httpService.get(url).toPromise();
            const data = response.data;
            if (data && data.length > 0) {
                return {
                    latitude: parseFloat(data[0].lat),
                    longitude: parseFloat(data[0].lon),
                };
            }
            else {
                throw new Error('No se encontraron coordenadas para esta ubicación.');
            }
        }
        catch (error) {
            throw new Error('Error al obtener las coordenadas.');
        }
    }
    async deleteProperty(id) {
        try {
            const foundProperty = await this.propertyDBRepository.findOne({
                where: { id },
            });
            if (!foundProperty) {
                throw new common_1.NotFoundException(`Not found property`);
            }
            await this.propertyDBRepository.delete(foundProperty.id);
            return `Propiedad borrada correctamente`;
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException) {
                throw new common_1.NotFoundException(error.message);
            }
        }
    }
};
exports.PropertyRepository = PropertyRepository;
exports.PropertyRepository = PropertyRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(property_entity_1.Property)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        cloudinary_service_1.CloudinaryService,
        axios_1.HttpService])
], PropertyRepository);
//# sourceMappingURL=property.repository.js.map