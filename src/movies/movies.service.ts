import { Injectable } from "@nestjs/common";
import axios from "axios";
import { Trailer } from "./types";

@Injectable()
export class MoviesService {
    
  async getTrailer(title: string): Promise<Trailer> {
    try {
        const moviesUrl = process.env.MOVIES_ENDPOINT;
        if (!moviesUrl) {
          throw new Error("Mising movies DB configuration");
        }
        const result = await axios.get(moviesUrl);
        const movies = result?.data?._embedded["viaplay:blocks"][0]?._embedded[
          "viaplay:products"
        ].find((movie) => movie.publicPath === title);
        const trailer = movies?._links["viaplay:trailerStream"] || {};
        return {
          url: trailer.href
        };
    } catch (err) {
        throw new Error("Error when fetching movie trailer")
    }
    
  }
}
