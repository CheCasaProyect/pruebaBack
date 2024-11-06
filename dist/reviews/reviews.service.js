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
exports.ReviewsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const property_entity_1 = require("../entities/property.entity");
const review_entity_1 = require("../entities/review.entity");
const users_entity_1 = require("../entities/users.entity");
const typeorm_2 = require("typeorm");
let ReviewsService = class ReviewsService {
    constructor(reviewRepository, propertyRepository, userRepository) {
        this.reviewRepository = reviewRepository;
        this.propertyRepository = propertyRepository;
        this.userRepository = userRepository;
    }
    async createReview(newReview) {
        const property = await this.propertyRepository.findOne({
            where: { id: newReview.propertyId },
        });
        const user = await this.userRepository.findOne({
            where: { id: newReview.userId },
        });
        if (!property || !user) {
            throw new common_1.NotFoundException('Usuario o Propiedad no encontrados');
        }
        const review = this.reviewRepository.create({
            comment: newReview.comment,
            rating: newReview.rating,
            property: property,
            user: user,
            reviewDate: new Date(),
        });
        return this.reviewRepository.save(review);
    }
    async getAllPropertyReviews(propertyId) {
        return this.reviewRepository.find({
            where: { property: { id: propertyId } },
        });
    }
    async getAllReviews() {
        return this.reviewRepository.find();
    }
};
exports.ReviewsService = ReviewsService;
exports.ReviewsService = ReviewsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(review_entity_1.Review)),
    __param(1, (0, typeorm_1.InjectRepository)(property_entity_1.Property)),
    __param(2, (0, typeorm_1.InjectRepository)(users_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], ReviewsService);
//# sourceMappingURL=reviews.service.js.map