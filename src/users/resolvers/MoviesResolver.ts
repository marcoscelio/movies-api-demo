import { Resolver, Args, Query } from "@nestjs/graphql";
import { Inject, UseGuards } from "@nestjs/common";
import { User } from "../../models/User";

import { AuthService } from "../../auth/auth.service";
import { GqlAuthGuard } from "../../auth/gql-jwt-auth.guard";
import { MoviesService } from "../../movies/movies.service";
import { Trailer } from "../../movies/types";

@Resolver((of) => User)
export class MoviesResolver {
  constructor(
    @Inject(MoviesService) private moviesService: MoviesService,
    @Inject(AuthService) private authService: AuthService
  ) {}

  @UseGuards(GqlAuthGuard)
  @Query((returns) => Trailer)
  async trailer(@Args("title") title: string): Promise<Trailer> {
    return await this.moviesService.getTrailer(title);
  }
}
