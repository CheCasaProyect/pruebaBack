import { FileUploadService } from './file-upload.service';
export declare class FileUploadController {
    private readonly fileUploadService;
    constructor(fileUploadService: FileUploadService);
    uploadPropertyImg(userId: string, file: Express.Multer.File): Promise<import("../entities/users.entity").User>;
    uploadProfileImg(productId: string, photos: Express.Multer.File[]): Promise<import("../entities/property.entity").Property>;
}
