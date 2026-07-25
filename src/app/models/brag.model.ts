export interface Brag {
  id: string;
  title: string;
  context: string;
  impact: string;
  metrics?: string;
  technologies: string[];
  createdAt: Date;
  rawPrompt?: string;
}
