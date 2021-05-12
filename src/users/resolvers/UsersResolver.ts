import {
  Resolver,
  Args,
  Query,
  ObjectType,
  Field,
} from "@nestjs/graphql";
import { Inject, UseGuards } from "@nestjs/common";
import { User } from "../../models/User";
import { UsersService } from "../users.service";

import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { GqlExecutionContext } from "@nestjs/graphql";
import { LoginDto } from "../dtos/usersDto";
import { AuthService } from "../../auth/auth.service";
import { GqlAuthGuard } from "../../auth/gql-jwt-auth.guard";

@Resolver((of) => User)
export class UsersResolver {
  constructor(
    @Inject(UsersService) private usersServices: UsersService,
    @Inject(AuthService) private authService: AuthService,
  ) {}

  @UseGuards(GqlAuthGuard)
  @Query((returns) => User)
  async user(@Args("name") name: string): Promise<User> {
    return await this.usersServices.findByName(name);
  }

  @Query((returns) => AuthToken)
  async signin(
    @Args("name") name: string,
    @Args("password") password: string
  ) {
    const { access_token } = await this.authService.login({
      name,
      password,
    } as LoginDto);
    return new AuthToken(access_token);
  }
}

@ObjectType()
export class AuthToken {
  constructor(token) {
    this.token = token;
  }
  @Field()
  token: string;
}

export const CurrentUser = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext().req.user;
  }
);
