import { PropertyService } from './property.service';
import { Property } from 'src/entities/property.entity';
import { UpdatePropertyDto } from 'src/dtos/updatePropertyDto';
export declare class PropertyController {
    private readonly propertyService;
    constructor(propertyService: PropertyService);
    getProperties(): Promise<Property[]>;
    getPropertyById(id: string): Promise<Property>;
    addProperty(property: any, photos: Express.Multer.File[]): Promise<Property>;
    updateProperty(id: string, property: UpdatePropertyDto): Promise<import("typeorm").UpdateResult>;
    deacticateProperty(id: string): Promise<string>;
    activateProperty(id: string): Promise<string>;
    filterProperties(query: any): Promise<Property[]>;
    getCoordinates(state: string, city: string): Promise<{
        latitude: number;
        longitude: number;
    }>;
    deleteProperty(id: string): Promise<string>;
}
