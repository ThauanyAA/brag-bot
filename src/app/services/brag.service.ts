import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Brag } from '../models/brag.model';

@Injectable({
  providedIn: 'root'
})
export class BragService {
  private readonly http = inject(HttpClient);

  readonly brags = signal<Brag[]>([]);

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

