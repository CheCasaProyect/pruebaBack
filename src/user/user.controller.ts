import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import { User } from 'src/entities/users.entity';
import { AuthGuard } from 'src/guards/auth.guard';
import { AccessGuard } from 'src/guards/role.guard';

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: 'Get All Users' })
  @Get()
  @UseGuards(AuthGuard, AccessGuard)
  @ApiBearerAuth()
  getAllUser() {
    return this.userService.getAllUsers();
  }

  @ApiOperation({ summary: 'Get User By Email' })
  @Get('email')
  @UseGuards(AccessGuard)
  getUserByEmail(@Query('email') email: string) {
    if (!email) {
      throw new BadRequestException('Email is required');
    }
    console.log('email a buscar: ' + email);
    return this.userService.getUserByEmail(email);
  }

  @ApiOperation({ summary: 'Deactivate User' })
  @Put(':id/deactivate')
  @UseGuards(AuthGuard)
  deactivateUser(@Param('id') id: string) {
    return this.userService.deactivateUser(id);
  }

  @ApiOperation({ summary: 'Activate User' })
  @Put(':id/activate')
  @UseGuards(AuthGuard)
  activateUser(@Param('id') id: string) {
    return this.userService.activeUser(id);
  }

  @ApiOperation({ summary: 'Remove User' })
  @Delete(':id/delete')
  @UseGuards(AuthGuard)
  removeUser(@Param('id') id: string) {
    return this.userService.removeUser(id);
  }

  @ApiOperation({ summary: 'Get User By ID' })
  @Get(':id')
  @UseGuards(AuthGuard)
  getUserById(@Param('id') id: string) {
    return this.userService.getUserById(id);
  }

  @ApiOperation({ summary: 'Update User' })
  @Put(':id')
  @UseGuards(AuthGuard)
  updateUser(@Param('id') id: string, @Body() updateUser: User) {
    return this.userService.updateUser(id, updateUser);
  }
}
