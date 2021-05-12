import { Body, Controller, Get, Post, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { CreateUserDto, NameDto } from "./dtos/usersDto";
import { UsersService } from "./users.service";

@Controller("v1")
export class UsersController {
  constructor(private readonly usersServices: UsersService) {}

  @Post("users")
  async create(@Body() createUserDto: CreateUserDto) {
    return this.usersServices.create(createUserDto);
  }

  @Get("users")
  async find(@Body() user: NameDto) {
    return this.usersServices.findByName(user.name);
  }

  @UseGuards(JwtAuthGuard)
  @Get("users")
  findOrCreate(): string {
    return "hello nestjs";
  }
}
