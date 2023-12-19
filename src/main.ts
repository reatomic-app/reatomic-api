import { NestFactory } from '@nestjs/core';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

import { MainController } from "./main.controller";
import { UsersModule } from './users/users.module';
import { ProjectsModule } from './projects/projects.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    UsersModule,
    ProjectsModule,

    TypeOrmModule.forRoot({
      type: process.env.DB_TYPE as any || "postgres",
      host: process.env.PG_HOST || "localhost",
      port: parseInt(process.env.PG_PORT) || 5432,
      username: process.env.PG_USER || "postgres",
      password: process.env.PG_PASSWORD || "postgres",
      database: process.env.PG_DB || "postgres",
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
  ],
  controllers: [MainController],
})
class AppModule {}


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  await app.listen(3000);
}
bootstrap();
