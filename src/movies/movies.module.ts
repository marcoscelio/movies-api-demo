import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from '../auth/auth.service';
import { jwtConstants } from '../auth/constants';
import { User } from '../models/User';
import { MoviesResolver } from '../users/resolvers/MoviesResolver';
import { UsersService } from '../users/users.service';
import { MoviesController } from './movies.controller';
import { MoviesService } from './movies.service';

@Module({
    imports: [
      TypeOrmModule.forFeature([User]),
      JwtModule.register({
        secret: jwtConstants.secret,
        signOptions: { expiresIn: "60s" },
      }),
    ],
    providers: [UsersService, MoviesService, MoviesResolver, AuthService],
    controllers: [],
    exports: [MoviesService],
  })
export class MoviesModule {}
