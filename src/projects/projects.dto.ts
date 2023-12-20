import { Project, Card, Link } from "./projects.entity";

export class CreateProjectInput {
  name: string;

  constructor(o: CreateProjectInput) {
    this.name = o.name;
  }

  public parse(): Project {
    return {
      name: this.name,
    }
  }
}

export class CreateProjectOutput {
  id: string;
  name: string;

  constructor(project: Project) {
    this.id = project.id;
    this.name = project.name;
  }
}

export class ListProjectOutputItem {
  id: string;
  name: string;
  
  constructor(project: Project) {
    this.id = project.id;
    this.name = project.name;
  }
}

export class ListProjectOutput {
  result: ListProjectOutputItem[];

  constructor(projects: Project[]) {
    this.result = [];
    for (const p of projects) {
      this.result.push(new ListProjectOutputItem(p));
    }
  }
}

export class DetailProjectOutput {
  id: string;
  name: string;
  cards: Card[];
  links: {source: string; target: string}[];
 
  constructor(project: Project) {
    this.id = project.id;
    this.name = project.name;
    this.cards = project.cards || [];
    this.links = project.links.map((it) => ({
      source: it.sourceCard.id,
      target: it.targetCard.id
    })) || [];
  }
}

export class CreateCardInput {
  cardType: 'data-source' | 'insight' | 'fact' | 'conclusion';
  title?: string;
  description?: string;
  factType?: 'wish' | 'pain' | 'quote' | 'good';
  dataSourceType?: string;
  source?: string;
  url?: string;
  date?: string;

  constructor(input: CreateCardInput) {
    this.cardType = input.cardType;
    this.title = input.title;
    this.description = input.description
    this.factType = input.factType;
    this.dataSourceType = input.dataSourceType;
    this.source = input.source;
    this.url = input.url;
    this.date = input.date;
  }

  public parse(): Card {
    const card = new Card();
    card.cardType = this.cardType;
    card.title = this.title;
    card.description = this.description
    card.factType = this.factType;
    card.dataSourceType = this.dataSourceType;
    card.source = this.source;
    card.url = this.url;
    card.date = this.date ? new Date(this.date) : undefined;
    return card;
  }
}

export class CreateCardOutput {
  id: string;
  cardType: 'data-source' | 'insight' | 'fact' | 'conclusion';
  title?: string;
  description?: string;
  factType?: 'wish' | 'pain' | 'quote' | 'good';
  dataSourceType?: string;
  source?: string;
  url?: string;
  date?: string;

  constructor(card: Card) {
    this.id = card.id;
    this.cardType = card.cardType;
    this.title = card.title;
    this.description = card.description
    this.factType = card.factType;
    this.dataSourceType = card.dataSourceType;
    this.source = card.source;
    this.url = card.url;
    this.date = card.date ? card.date.toISOString() : undefined;
  }
}

export class CreateLinkInput {
  source: string;
  target: string;
}

export class CreateLinkOutput {
  id: string

  constructor(link: Link) {
    this.id = link.id;
  }
}
