import { Injectable, signal } from '@angular/core';
import { Brag } from '../models/brag.model';

@Injectable({
  providedIn: 'root'
})
export class BragService {
  readonly brags = signal<Brag[]>([
    {
      id: 'brag-1',
      title: 'Arquitetura de Agentes GenAI e Pipelines RAG',
      context: 'Liderança na implementação da arquitetura base de Inteligência Artificial para automação de análise de software e síntese de relatórios de entregas.',
      impact: 'Redução de 65% no tempo de documentação técnica dos projetos e melhoria significativa na consistência dos artefatos gerados.',
      metrics: '65% menos tempo de elaboração, 99.4% precisão técnica em testes comparativos.',
      technologies: ['Angular 21', 'TypeScript', 'Genkit AI', 'Angular Signals', 'Tailwind CSS'],
      createdAt: new Date('2026-07-24T14:30:00')
    },
    {
      id: 'brag-2',
      title: 'Otimização de Performance e Hydration Zoneless',
      context: 'Migração do ecossistema de renderização para Angular Zoneless e otimização dos tempos de resposta do servidor (SSR).',
      impact: 'Aumento expressivo nas pontuações de Core Web Vitals (LCP e INP) e redução do bundle JS final transferido ao cliente.',
      metrics: 'LCP reduzido para 0.8s, Score Lighthouse 98+ em Performance.',
      technologies: ['Angular 21', 'Zoneless', 'SSR', 'Tailwind CSS', 'Vite/PostCSS'],
      createdAt: new Date('2026-07-25T09:15:00')
    }
  ]);

  readonly loading = signal<boolean>(false);

  /**
   * Simula chamada de rede de 1.5s, ativa o loading e adiciona um objeto JSON mockado à lista de brags.
   */
  generateMockBrag(prompt: string): void {
    if (!prompt.trim() || this.loading()) {
      return;
    }

    this.loading.set(true);

    setTimeout(() => {
      const id = `brag-${Date.now()}`;
      
      // Criação de conquista mockada estática com base no prompt recebido
      const newBrag: Brag = {
        id,
        title: this.extractTitleFromPrompt(prompt),
        context: `Desenvolvimento e execução referente a: "${prompt.trim()}". Atuação proativa na definição de arquitetura e entrega com altíssimo padrão técnico.`,
        impact: 'Automação completa do fluxo com aumento de produtividade da equipe, reduzindo retrabalhos manuais e garantindo altíssima qualidade visual e técnica.',
        metrics: '95% de satisfação dos usuários e 40% de aceleração no ciclo de entrega.',
        technologies: ['Angular 21', 'Tailwind CSS', 'Genkit AI', 'TypeScript', 'MCP'],
        createdAt: new Date(),
        rawPrompt: prompt
      };

      this.brags.update(current => [newBrag, ...current]);
      this.loading.set(false);
    }, 1500);
  }

  getBragById(id: string): Brag | undefined {
    return this.brags().find(b => b.id === id);
  }

  private extractTitleFromPrompt(prompt: string): string {
    const cleanPrompt = prompt.trim();
    if (cleanPrompt.length <= 40) {
      return `Conquista: ${cleanPrompt}`;
    }
    return `Destilação: ${cleanPrompt.substring(0, 40)}...`;
  }
}
