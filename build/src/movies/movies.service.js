"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MoviesService = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = require("axios");
let MoviesService = class MoviesService {
    getTrailer(title) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const moviesUrl = process.env.MOVIES_ENDPOINT;
                if (!moviesUrl) {
                    throw new Error("Mising movies DB configuration");
                }
                const result = yield axios_1.default.get(moviesUrl);
                const movies = (_b = (_a = result === null || result === void 0 ? void 0 : result.data) === null || _a === void 0 ? void 0 : _a._embedded["viaplay:blocks"][0]) === null || _b === void 0 ? void 0 : _b._embedded["viaplay:products"].find((movie) => movie.publicPath === title);
                const trailer = (movies === null || movies === void 0 ? void 0 : movies._links["viaplay:trailerStream"]) || {};
                return {
                    url: trailer.href
                };
            }
            catch (err) {
                throw new Error("Error when fetching movie trailer");
            }
        });
    }
};
MoviesService = __decorate([
    common_1.Injectable()
], MoviesService);
exports.MoviesService = MoviesService;
//# sourceMappingURL=movies.service.js.map