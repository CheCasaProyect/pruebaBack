import { FileUploadRepository } from './file-upload.repository';
export declare class FileUploadService {
    private readonly fileUploadRepository;
    constructor(fileUploadRepository: FileUploadRepository);
    uploadProfileImg(file: Express.Multer.File, userId: string): Promise<import("../entities/users.entity").User>;
    uploadPropertyImg(photos: Express.Multer.File[], productId: string): Promise<import("../entities/property.entity").Property>;
}
