import { Module } from '@nestjs/common';
import { ProjectsController } from './projects.controller';
import { ProjectsService } from './projects.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Project, Card, Link, CardData } from "./projects.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Project, Card, Link, CardData])],
  controllers: [ProjectsController],
  providers: [ProjectsService]
})
export class ProjectsModule {}
