import { CreateUserDto } from "./dtos/usersDto";
import { User } from "../models/User";
import { InjectRepository } from "@nestjs/typeorm";
import { UsersRepository } from "./users.repository";
import * as bcrypt from "bcrypt";
import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from "@nestjs/common";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: UsersRepository
  ) {}

  async findByName(name: string): Promise<User | undefined> {
    return await this.usersRepository.findOne({ where: { name } });
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const {
      name,
      password
    } = createUserDto;
    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    const user = this.usersRepository.create();
    user.name = name;
    user.password = await bcrypt.hashSync(password, salt);
    try {
      await this.usersRepository.save(user);
      delete user.password;
      return user;
    } catch (error) {
      console.log(error);
      if (error.code.toString() === "23505") {
        throw new ConflictException("Existing name.");
      } else {
        throw new InternalServerErrorException(
          "Error saving database user"
        );
      }
    }
  }
}
