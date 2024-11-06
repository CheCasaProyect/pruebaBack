import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ReservationsService } from './reservations.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateReservationDTO } from 'src/dtos/createReservationDto';
import { AccessGuard } from 'src/guards/role.guard';
import { AuthGuard } from 'src/guards/auth.guard';

@ApiTags('reservations')
@Controller('reservations')
export class ReservationsController {
  constructor(private readonly reservationsService: ReservationsService) {}

  @ApiOperation({ summary: 'All Reservations' })
  @Get()
  @UseGuards(AccessGuard)
  getAllReservations() {
    return this.reservationsService.getAllReservation();
  }

  @ApiOperation({ summary: 'Create Reservation' })
  @Post('newReservation')
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.CREATED)
  createReservation(@Body() createReservation: CreateReservationDTO) {
    console.log('Payload de Reserva: ', createReservation);

    return this.reservationsService.createReservation(createReservation);
  }

  @ApiOperation({ summary: 'Cancel Reservation' })
  @Put(':id/cancel')
  @UseGuards(AuthGuard)
  cancelReservation(@Param('id') id: string) {
    return this.cancelReservation(id);
  }

  @ApiOperation({ summary: 'User Reservation' })
  @Get(':id/user')
  @UseGuards(AuthGuard)
  getUserReservations(@Param('id') userId: string) {
    return this.reservationsService.getUserReservations(userId);
  }
}
