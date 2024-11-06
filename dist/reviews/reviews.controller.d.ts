import { ReviewsService } from './reviews.service';
import { CreateReviewDto } from 'src/dtos/createReviewDto';
import { Review } from 'src/entities/review.entity';
export declare class ReviewsController {
    private readonly reviewService;
    constructor(reviewService: ReviewsService);
    createReview(createReview: CreateReviewDto): Promise<Review>;
    getAllReviews(): Promise<Review[]>;
    getAllPropertyReviews(propertyId: string): Promise<Review[]>;
}
