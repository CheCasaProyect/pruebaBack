import { Property } from 'src/entities/property.entity';
import { Repository } from 'typeorm';
import { UpdatePropertyDto } from 'src/dtos/updatePropertyDto';
import { CloudinaryService } from 'src/files/cloudinary.service';
import { HttpService } from '@nestjs/axios';
export declare class PropertyRepository {
    private readonly propertyDBRepository;
    private readonly cloudinaryService;
    private readonly httpService;
    private stripe;
    constructor(propertyDBRepository: Repository<Property>, cloudinaryService: CloudinaryService, httpService: HttpService);
    getProperties(): Promise<Property[]>;
    getPropertyById(id: string): Promise<Property>;
    addProperty(property: any, photos: Express.Multer.File[]): Promise<Property>;
    updateProperty(id: string, property: UpdatePropertyDto): Promise<import("typeorm").UpdateResult>;
    deactivateProperty(id: string): Promise<string>;
    activateProperty(id: string): Promise<string>;
    filterProperties(filters: any): Promise<Property[]>;
    seederProperties(): Promise<void>;
    getCoordinates(state: string, city: string): Promise<{
        latitude: number;
        longitude: number;
    }>;
    deleteProperty(id: string): Promise<string>;
}
