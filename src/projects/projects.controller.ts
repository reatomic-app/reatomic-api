import { Controller, Get, Post, Body, Param, Put, Delete, HttpCode } from '@nestjs/common';
import { ProjectsService } from "./projects.service";
import { Project } from "./projects.entity";
import * as dto from "./projects.dto";

@Controller('projects')
export class ProjectsController {
  constructor(
    private projectsService: ProjectsService
  ) {}

  @Get()
  async list(): Promise<dto.ListProjectOutput> {
    return new dto.ListProjectOutput(await this.projectsService.list());
  }

  @Get(":id")
  async detail(@Param("id") id: string): Promise<dto.DetailProjectOutput> {
    const project = await this.projectsService.detail(id);
    return new dto.DetailProjectOutput(project);
  }

  @Post()
  async create(@Body() input: dto.CreateProjectInput): Promise<dto.CreateProjectOutput> {
    const project = new dto.CreateProjectInput(input).parse();
    const result = await this.projectsService.create(project);
    return new dto.CreateProjectOutput(result);
  }

  @Post(":id/cards")
  async addCard(@Param("id") projectId: string,
                @Body() input: dto.CreateCardInput): Promise<dto.CreateCardOutput> {
    const project = await this.projectsService.get(projectId);
    const card = new dto.CreateCardInput(input).parse();
    const result = await this.projectsService.addCard(project, card);
    return new dto.CreateCardOutput(result);
  }

  @Post(":id/links")
  async addLink(@Param("id") projectId: string,
                @Body() input: dto.CreateLinkInput): Promise<dto.CreateLinkOutput> {
    const project = await this.projectsService.get(projectId);
    const result = await this.projectsService.addLink(project, input.source, input.target);
    return new dto.CreateLinkOutput(result);
  }

  @Put(":projectId/cards/:cardId")
  async updateCard(@Param("projectId") projectId: string,
                   @Param("cardId") cardId: string,
                   @Body() input: dto.CreateCardInput): Promise<dto.CreateCardOutput> {
    const project = await this.projectsService.get(projectId);
    const updatedCard = new dto.CreateCardInput(input).parse();
    updatedCard.id = cardId;
    const result = await this.projectsService.updateCard(project, updatedCard);
    return new dto.CreateCardOutput(result);
  }

  @Delete(":projectId/cards/:cardId")
  @HttpCode(204)
  async deleteCard(@Param("projectId") projectId: string,
                   @Param("cardId") cardId: string) {
    await this.projectsService.get(projectId);
    await this.projectsService.deleteCard(cardId);
  }

  @Delete(":projectId/links/:source/:target")
  @HttpCode(204)
  async deleteLink(@Param("projectId") projectId: string,
                   @Param("source") sourceId: string,
                   @Param("target") targetId: string) {
    await this.projectsService.get(projectId);
    await this.projectsService.deleteLink(sourceId, targetId);
  }

}
