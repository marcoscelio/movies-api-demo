import { Module } from "@nestjs/common";
import { GraphQLModule } from "@nestjs/graphql";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AuthController } from "./auth/auth.controller";
import { AuthModule } from "./auth/auth.module";
import { MoviesController } from './movies/movies.controller';
import { MoviesService } from './movies/movies.service';
import { MoviesModule } from './movies/movies.module';

@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forRoot(),
    GraphQLModule.forRoot({
      autoSchemaFile: "schema.gql",
    }),
    MoviesModule,
  ],
  controllers: [AppController, AuthController, MoviesController],
  providers: [AppService, MoviesService],
})
export class AppModule {}
