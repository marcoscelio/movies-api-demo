import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { getConnection } from 'typeorm';
import { AppModule } from './app.module';
import { User } from './models/User';
import bcrypt = require('bcrypt');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  const repo = await getConnection().getRepository(User);
  const found = await repo.findOne({ name: 'Admin' });
  if (!found) {
    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    const user = {
      name: 'Admin',
      password: await bcrypt.hashSync('admin123', salt),
    };
    repo.insert(user);
  }

  await app.listen(3000);
}
bootstrap();
