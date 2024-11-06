import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { CreateReviewDto } from 'src/dtos/createReviewDto';
import { Review } from 'src/entities/review.entity';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/guards/auth.guard';
import { AccessGuard } from 'src/guards/role.guard';

@ApiTags('reviews')
@Controller('reviews')
export class ReviewsController {
  constructor(private readonly reviewService: ReviewsService) {}

  @Post('newReview')
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.CREATED)
  async createReview(@Body() createReview: CreateReviewDto): Promise<Review> {
    return this.reviewService.createReview(createReview);
  }

  @Get()
  @UseGuards(AuthGuard)
  async getAllReviews() {
    return this.reviewService.getAllReviews();
  }

  @Get(':propertyId')
  @UseGuards(AccessGuard)
  async getAllPropertyReviews(
    @Param('propertyId') propertyId: string,
  ): Promise<Review[]> {
    return this.reviewService.getAllPropertyReviews(propertyId);
  }
}
