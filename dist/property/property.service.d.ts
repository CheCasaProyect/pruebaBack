import { PropertyRepository } from './property.repository';
import { UpdatePropertyDto } from 'src/dtos/updatePropertyDto';
export declare class PropertyService {
    private readonly propertyRepository;
    constructor(propertyRepository: PropertyRepository);
    getProperties(): Promise<import("../entities/property.entity").Property[]>;
    getPropertyById(id: string): Promise<import("../entities/property.entity").Property>;
    addProperty(property: any, photos: Express.Multer.File[]): Promise<import("../entities/property.entity").Property>;
    updateProperty(id: string, property: UpdatePropertyDto): Promise<import("typeorm").UpdateResult>;
    deactivateProperty(id: string): Promise<string>;
    activateProperty(id: string): Promise<string>;
    filterProperties(filters: any): Promise<import("../entities/property.entity").Property[]>;
    getCoordinates(state: string, city: string): Promise<{
        latitude: number;
        longitude: number;
    }>;
    deleteProperty(id: string): Promise<string>;
}
