import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Brag } from '../models/brag.model';

@Injectable({
  providedIn: 'root'
})
export class BragService {
  private readonly http = inject(HttpClient);

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
   * Envia o rascunho do usuário para o backend (/api/brag) e adiciona o resultado à lista de brags.
   */
  generateBrag(definition: string): void {
    if (!definition.trim() || this.loading()) {
      return;
    }

    this.loading.set(true);

    this.http.post<any>('/api/brag', { definition }).subscribe({
      next: (res) => {
        const newBrag: Brag = {
          id: res.id || `brag-${Date.now()}`,
          title: res.title,
          context: res.context,
          impact: res.businessImpact || res.impact || res.actionTaken || '',
          metrics: Array.isArray(res.metrics) ? res.metrics.join(', ') : (res.metrics || ''),
          technologies: res.technologiesUsed || res.technologies || [],
          createdAt: new Date(),
          rawPrompt: definition
        };

        this.brags.update(current => [newBrag, ...current]);
        this.loading.set(false);
      },
      error: (err) => {
        console.error('Erro ao gerar brag:', err);
        this.loading.set(false);
      }
    });
  }

  getBragById(id: string): Brag | undefined {
    return this.brags().find(b => b.id === id);
  }
}

