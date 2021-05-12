import { Controller, Get, Param } from "@nestjs/common";
import { MoviesService } from "./movies.service";

@Controller("v1/movie")
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Get("trailer/:title")
  async getMovieTrailer(@Param("title") title) {
    return await this.moviesService.getTrailer(title);
  }
}
