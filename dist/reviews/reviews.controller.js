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
exports.ReviewsController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const reviews_service_1 = require("./reviews.service");
const createReviewDto_1 = require("../dtos/createReviewDto");
const swagger_1 = require("@nestjs/swagger");
const auth_guard_1 = require("../guards/auth.guard");
const role_guard_1 = require("../guards/role.guard");
let ReviewsController = class ReviewsController {
    constructor(reviewService) {
        this.reviewService = reviewService;
    }
    async createReview(createReview) {
        return this.reviewService.createReview(createReview);
    }
    async getAllReviews() {
        return this.reviewService.getAllReviews();
    }
    async getAllPropertyReviews(propertyId) {
        return this.reviewService.getAllPropertyReviews(propertyId);
    }
};
exports.ReviewsController = ReviewsController;
__decorate([
    (0, common_1.Post)('newReview'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    openapi.ApiResponse({ status: common_1.HttpStatus.CREATED, type: require("../entities/review.entity").Review }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [createReviewDto_1.CreateReviewDto]),
    __metadata("design:returntype", Promise)
], ReviewsController.prototype, "createReview", null);
__decorate([
    (0, common_1.Get)(),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    openapi.ApiResponse({ status: 200, type: [require("../entities/review.entity").Review] }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ReviewsController.prototype, "getAllReviews", null);
__decorate([
    (0, common_1.Get)(':propertyId'),
    (0, common_1.UseGuards)(role_guard_1.AccessGuard),
    openapi.ApiResponse({ status: 200, type: [require("../entities/review.entity").Review] }),
    __param(0, (0, common_1.Param)('propertyId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ReviewsController.prototype, "getAllPropertyReviews", null);
exports.ReviewsController = ReviewsController = __decorate([
    (0, swagger_1.ApiTags)('reviews'),
    (0, common_1.Controller)('reviews'),
    __metadata("design:paramtypes", [reviews_service_1.ReviewsService])
], ReviewsController);
//# sourceMappingURL=reviews.controller.js.map