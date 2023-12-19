import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Project, Card, Link } from "./projects.entity";

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project)
    private projectsRepository: Repository<Project>,
    @InjectRepository(Card)
    private cardsRepository: Repository<Card>,
    @InjectRepository(Link)
    private linksRepository: Repository<Link>
  ) {}

  async list(): Promise<Project[]> {
    return this.projectsRepository.find();
  }

  async get(id): Promise<Project> {
    return this.projectsRepository.findOne({where: { id }});
  }

  async create(project: Project): Promise<Project> {
    const result = this.projectsRepository.create(project);
    return this.projectsRepository.save(result);
  }

  async detail(id: string): Promise<Project> {
    return this.projectsRepository.findOne({
      where: { id },
      relations: {
        cards: true,
        links: true
      }
    });
  }

  async addCard(project: Project, card: Card): Promise<Card> {
    const result = this.cardsRepository.create(card);
    result.project = project;
    return this.cardsRepository.save(result);
  }

  async addLink(project: Project, sourceId: string, targetId: string): Promise<Link> {
    const source = await this.cardsRepository.findOne({where: { id: sourceId }});
    const target = await this.cardsRepository.findOne({where: { id: targetId }});
    const result = this.linksRepository.create();
    result.project = project;
    result.sourceCard = source;
    result.targetCard = target;
    return this.linksRepository.save(result);
  }

  async updateCard(project: Project, card: Card): Promise<Card> {
    const target = await this.cardsRepository.findOne({
      where: { id: card.id },
      relations: {
        project: true
      }
    });
    
    const updatedCard = {
      ...card,
      project: target.project,
      id: target.id
    }
    return this.cardsRepository.save(updatedCard);
  }

  async deleteCard(id: string) {
    this.cardsRepository.delete(id);
  }

  async deleteLink(source: string, target: string) {
    const sourceCard = await this.cardsRepository.findOne({where: {id: source}});
    const targetCard = await this.cardsRepository.findOne({where: {id: target}});
    const link = await this.linksRepository.findOne({
      where: {
        sourceCard: sourceCard,
        targetCard: targetCard
      }
    });
    if (link) {
      this.linksRepository.delete(link.id);
    }
  }
}
