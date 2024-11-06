import { User } from 'src/entities/users.entity';
import { Repository } from 'typeorm';
import { Property } from 'src/entities/property.entity';
import { CloudinaryService } from './cloudinary.service';
export declare class FileUploadRepository {
    private readonly cloudinaryService;
    private readonly userDBRepository;
    private readonly propertyDBRepository;
    constructor(cloudinaryService: CloudinaryService, userDBRepository: Repository<User>, propertyDBRepository: Repository<Property>);
    uploadProfileImg(file: Express.Multer.File, userId: string): Promise<User>;
    uploadPropertyImg(photos: Express.Multer.File[], propertyId: string): Promise<Property>;
}
