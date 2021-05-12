import { Injectable } from "@nestjs/common";
import bcrypt = require("bcrypt");
import { JwtService } from "@nestjs/jwt";
import { User } from "../models/User";
import { UsersService } from "../users/users.service";
import { LoginDto } from "../users/dtos/usersDto";

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async validateUser(login: LoginDto): Promise<User> {
    const user = await this.usersService.findByName(login.name);
    if (user) {
      const match = await bcrypt.compareSync(login.password, user.password);
      if (user && match) {
        return user;
      }
    }
    throw new Error("Invalid credentials");
  }

  async login(login: LoginDto) {
    const user = this.validateUser(login);
    return {
      access_token: this.jwtService.sign({
        name: login.name,
        sub: { password: login.password },
      }),
    };
  }
}
