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
exports.FileUploadController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const file_upload_service_1 = require("./file-upload.service");
const platform_express_1 = require("@nestjs/platform-express");
let FileUploadController = class FileUploadController {
    constructor(fileUploadService) {
        this.fileUploadService = fileUploadService;
    }
    async uploadPropertyImg(userId, file) {
        const updateUser = await this.fileUploadService.uploadProfileImg(file, userId);
        return updateUser;
    }
    async uploadProfileImg(productId, photos) {
        console.log(photos);
        const updateProperty = await this.fileUploadService.uploadPropertyImg(photos, productId);
        return updateProperty;
    }
};
exports.FileUploadController = FileUploadController;
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'File Upload Profile Image Url' }),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, swagger_1.ApiBody)({
        description: 'Selecciona el archivo:',
        schema: {
            type: 'object',
            properties: {
                profileImg: {
                    type: 'string',
                    format: 'binary',
                },
            },
        },
    }),
    (0, common_1.Post)(`uploadProfileImg/:id`),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)(`profileImg`)),
    openapi.ApiResponse({ status: 201, type: require("../entities/users.entity").User }),
    __param(0, (0, common_1.Param)(`id`)),
    __param(1, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], FileUploadController.prototype, "uploadPropertyImg", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Files Upload Property Images Url' }),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, swagger_1.ApiBody)({
        description: 'Selecciona los archivos:',
        schema: {
            type: 'object',
            properties: {
                photos: {
                    type: 'array',
                    items: { type: `string`, format: `binary` },
                },
            },
        },
    }),
    (0, common_1.UseInterceptors)((0, platform_express_1.FilesInterceptor)(`photos`)),
    (0, common_1.Post)(`uploadPropertyImg/:id`),
    openapi.ApiResponse({ status: 201, type: require("../entities/property.entity").Property }),
    __param(0, (0, common_1.Param)(`id`)),
    __param(1, (0, common_1.UploadedFile)(new common_1.ParseFilePipe({
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
    __metadata("design:paramtypes", [String, Array]),
    __metadata("design:returntype", Promise)
], FileUploadController.prototype, "uploadProfileImg", null);
exports.FileUploadController = FileUploadController = __decorate([
    (0, swagger_1.ApiTags)(`files`),
    (0, common_1.Controller)('file-upload'),
    __metadata("design:paramtypes", [file_upload_service_1.FileUploadService])
], FileUploadController);
//# sourceMappingURL=file-upload.controller.js.map