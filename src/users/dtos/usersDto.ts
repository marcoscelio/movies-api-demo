import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  id: number;
  @IsNotEmpty()
  name: string;
  @IsNotEmpty()
  password: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
}

export class NameDto {
  @IsNotEmpty()
  name: string;
}

export class LoginDto {
  @IsNotEmpty()
  name: string;  
  @IsNotEmpty()
  password: string;  
}
