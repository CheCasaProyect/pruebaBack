import { CreateReviewDto } from 'src/dtos/createReviewDto';
import { Property } from 'src/entities/property.entity';
import { Review } from 'src/entities/review.entity';
import { User } from 'src/entities/users.entity';
import { Repository } from 'typeorm';
export declare class ReviewsService {
    private readonly reviewRepository;
    private readonly propertyRepository;
    private readonly userRepository;
    constructor(reviewRepository: Repository<Review>, propertyRepository: Repository<Property>, userRepository: Repository<User>);
    createReview(newReview: CreateReviewDto): Promise<Review>;
    getAllPropertyReviews(propertyId: string): Promise<Review[]>;
    getAllReviews(): Promise<Review[]>;
}
