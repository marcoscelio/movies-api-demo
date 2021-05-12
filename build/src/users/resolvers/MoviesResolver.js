"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
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
exports.MoviesResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const common_1 = require("@nestjs/common");
const User_1 = require("../../models/User");
const auth_service_1 = require("../../auth/auth.service");
const gql_jwt_auth_guard_1 = require("../../auth/gql-jwt-auth.guard");
const movies_service_1 = require("../../movies/movies.service");
const types_1 = require("../../movies/types");
let MoviesResolver = class MoviesResolver {
    constructor(moviesService, authService) {
        this.moviesService = moviesService;
        this.authService = authService;
    }
    trailer(title) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.moviesService.getTrailer(title);
        });
    }
};
__decorate([
    common_1.UseGuards(gql_jwt_auth_guard_1.GqlAuthGuard),
    graphql_1.Query((returns) => types_1.Trailer),
    __param(0, graphql_1.Args("title")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], MoviesResolver.prototype, "trailer", null);
MoviesResolver = __decorate([
    graphql_1.Resolver((of) => User_1.User),
    __param(0, common_1.Inject(movies_service_1.MoviesService)),
    __param(1, common_1.Inject(auth_service_1.AuthService)),
    __metadata("design:paramtypes", [movies_service_1.MoviesService,
        auth_service_1.AuthService])
], MoviesResolver);
exports.MoviesResolver = MoviesResolver;
//# sourceMappingURL=MoviesResolver.js.map