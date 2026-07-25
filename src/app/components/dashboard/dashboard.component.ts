import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';
import { BragService } from '../../services/brag.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [FormsModule, RouterLink, DatePipe],
  template: `
    <div class="min-h-screen bg-[#0b0f17] text-slate-100 flex flex-col">
      <!-- Top Navigation Header -->
      <header class="border-b border-slate-800/80 bg-slate-950/40 backdrop-blur-md sticky top-0 z-50">
        <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div class="flex items-center space-x-3">
            <div class="w-10 h-10 rounded-xl bg-lime-400/10 border border-lime-400/30 flex items-center justify-center text-lime-400 font-bold font-display text-xl shadow-lg shadow-lime-400/10">
              ⚡
            </div>
            <div>
              <h1 class="text-xl sm:text-2xl font-bold font-display tracking-tight text-white flex items-center gap-2">
                <span>Brag-Bot</span>
              </h1>
              <p class="text-xs text-slate-400 hidden sm:block">Transforme suas realizações brutas em documentos de alto impacto com IA</p>
            </div>
          </div>
          <div class="flex items-center space-x-3">
            <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-lime-400/10 text-lime-400 border border-lime-400/30">
              <span class="w-2 h-2 rounded-full bg-lime-400 animate-pulse"></span>
              Genkit & Signals Active
            </span>
          </div>
        </div>
      </header>

      <!-- Main Body Content -->
      <main class="flex-grow max-w-5xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
        <!-- Hero & Form Section -->
        <section class="bg-gradient-to-b from-slate-900/80 to-slate-950/80 border border-slate-800/80 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur relative overflow-hidden">
          <div class="absolute -right-20 -top-20 w-64 h-64 bg-lime-400/5 rounded-full blur-3xl pointer-events-none"></div>
          <div class="absolute -left-20 -bottom-20 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl pointer-events-none"></div>

          <div class="relative z-10 space-y-6">
            <div>
              <h2 class="text-2xl sm:text-3xl font-bold font-display text-white tracking-tight">
                Destilador de Conquistas
              </h2>
              <p class="text-slate-400 text-sm sm:text-base mt-1">
                Descreva suas entregas ou marcos recentes no campo abaixo. Nossa IA irá estruturar em Contexto, Impacto, Métricas e Tecnologias.
              </p>
            </div>

            <form (submit)="onSubmit($event)" class="space-y-4">
              <div class="relative">
                <textarea
                  [(ngModel)]="rawPrompt"
                  name="rawPrompt"
                  rows="4"
                  [disabled]="bragService.loading()"
                  placeholder="Ex.: Desenvolvi o novo fluxo de autenticação e refatorei os serviços com Signals no Angular 21, reduzindo bugs de estado em 40%..."
                  class="w-full bg-slate-900/90 border border-slate-800 rounded-2xl p-4 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-lime-400 focus:ring-1 focus:ring-lime-400 transition-all resize-y disabled:opacity-60 font-sans text-sm sm:text-base"
                ></textarea>
              </div>

              <div class="flex items-center justify-between pt-2">
                <span class="text-xs text-slate-500">
                  Dica: Quanto mais detalhes e números você incluir, melhor será a destilação.
                </span>
                <button
                  type="submit"
                  [disabled]="!rawPrompt().trim() || bragService.loading()"
                  class="inline-flex items-center justify-center gap-2 bg-lime-400 hover:bg-lime-300 text-black font-bold px-6 py-3.5 rounded-xl shadow-lg shadow-lime-400/20 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer text-sm sm:text-base"
                >
                  @if (bragService.loading()) {
                    <svg class="animate-spin -ml-1 mr-2 h-5 w-5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>Destilando Conquista...</span>
                  } @else {
                    <span>Destilar Conquista</span>
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  }
                </button>
              </div>
            </form>
          </div>
        </section>

        <!-- Brags List Section -->
        <section class="space-y-6">
          <div class="flex items-center justify-between border-b border-slate-800/80 pb-4">
            <h3 class="text-xl sm:text-2xl font-bold font-display text-white flex items-center gap-3">
              <span>Conquistas Registradas</span>
              <span class="text-xs px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-300 font-mono">
                {{ bragService.brags().length }}
              </span>
            </h3>
            <span class="text-xs text-slate-400">Clique em qualquer card para ver os detalhes completos</span>
          </div>

          <div class="grid grid-cols-1 gap-6">
            @for (brag of bragService.brags(); track brag.id) {
              <article
                [routerLink]="['/detail', brag.id]"
                class="group bg-slate-900/60 hover:bg-slate-900/90 border border-slate-800/80 hover:border-lime-500/40 rounded-2xl p-6 sm:p-7 transition-all duration-300 shadow-xl hover:shadow-2xl hover:shadow-lime-500/5 cursor-pointer flex flex-col justify-between space-y-4 transform hover:-translate-y-1 relative overflow-hidden"
              >
                <div class="space-y-3">
                  <div class="flex items-start justify-between gap-4">
                    <h4 class="text-lg sm:text-xl font-bold text-white group-hover:text-lime-400 transition-colors font-display">
                      {{ brag.title }}
                    </h4>
                    <span class="text-xs text-slate-500 shrink-0 font-mono">
                      {{ brag.createdAt | date:'dd/MM/yyyy HH:mm' }}
                    </span>
                  </div>

                  <p class="text-slate-300 text-sm line-clamp-2 leading-relaxed">
                    {{ brag.context }}
                  </p>

                  <div class="p-3.5 bg-slate-950/60 border border-slate-800/60 rounded-xl">
                    <p class="text-xs text-slate-400 font-semibold mb-1 uppercase tracking-wider">Impacto Principal</p>
                    <p class="text-sm text-slate-200 font-medium">
                      {{ brag.impact }}
                    </p>
                  </div>
                </div>

                <div class="flex items-center justify-between pt-2 border-t border-slate-800/40">
                  <div class="flex flex-wrap gap-1.5">
                    @for (tech of brag.technologies; track tech) {
                      <span class="text-xs px-2.5 py-1 rounded-md bg-lime-400/10 text-lime-300 border border-lime-400/20 font-mono">
                        {{ tech }}
                      </span>
                    }
                  </div>

                  <span class="inline-flex items-center text-xs font-semibold text-lime-400 group-hover:translate-x-1 transition-transform">
                    Ver Detalhes
                    <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </span>
                </div>
              </article>
            } @empty {
              <div class="text-center py-16 bg-slate-900/30 border border-slate-800/60 rounded-2xl space-y-3">
                <p class="text-slate-400 text-lg">Nenhuma conquista cadastrada ainda.</p>
                <p class="text-slate-500 text-sm">Digite no formulário acima para destilar sua primeira conquista!</p>
              </div>
            }
          </div>
        </section>
      </main>

      <!-- Footer -->
      <footer class="border-t border-slate-800/80 py-6 text-center text-xs text-slate-500">
        <p>Brag-Bot © 2026 — Gerador Inteligente de Conquistas</p>
      </footer>
    </div>
  `
})
export class DashboardComponent {
  protected readonly bragService = inject(BragService);
  protected readonly rawPrompt = signal<string>('');

  onSubmit(event: Event): void {
    event.preventDefault();
    const promptValue = this.rawPrompt();

    if (promptValue.trim()) {
      this.bragService.generateMockBrag(promptValue);
      this.rawPrompt.set('');
    }
  }
}
