import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class Trailer {
  constructor(url) {
    this.url = url;
  }
  @Field({ nullable: true })
  url: string;
}
