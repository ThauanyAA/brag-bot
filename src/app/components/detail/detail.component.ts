import { Component, inject, input, computed } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';
import { BragService } from '../../services/brag.service';

@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [RouterLink, DatePipe],
  template: `
    <div class="min-h-screen bg-[#0b0f17] text-slate-100 flex flex-col">
      <!-- Navigation Header -->
      <header class="border-b border-slate-800/80 bg-slate-950/40 backdrop-blur-md sticky top-0 z-50">
        <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <a
            routerLink="/"
            class="inline-flex items-center gap-2 text-sm font-semibold text-slate-300 hover:text-lime-400 bg-slate-900/80 hover:bg-slate-800 px-4 py-2 rounded-xl border border-slate-800 transition-all cursor-pointer"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span>Voltar ao Dashboard</span>
          </a>

          <div class="flex items-center space-x-2">
            <span class="text-xs text-slate-400 font-mono">Brag ID: {{ id() }}</span>
          </div>
        </div>
      </header>

      <!-- Detail Body -->
      <main class="flex-grow max-w-4xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10">
        @if (brag(); as item) {
          <article class="space-y-8 animate-fade-in">
            <!-- Article Header -->
            <div class="bg-gradient-to-r from-slate-900 via-slate-900/90 to-slate-950 border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl space-y-4">
              <div class="flex flex-wrap items-center justify-between gap-4">
                <span class="px-3 py-1 rounded-full text-xs font-semibold bg-lime-400/10 text-lime-400 border border-lime-400/30">
                  Conquista Destilada
                </span>
                <span class="text-xs text-slate-400 font-mono">
                  Registrada em {{ item.createdAt | date:'dd/MM/yyyy HH:mm' }}
                </span>
              </div>

              <h1 class="text-2xl sm:text-4xl font-bold font-display text-white tracking-tight leading-tight">
                {{ item.title }}
              </h1>

              <div class="flex flex-wrap gap-2 pt-2">
                @for (tech of item.technologies; track tech) {
                  <span class="text-xs px-3 py-1 rounded-lg bg-lime-400/10 text-lime-300 border border-lime-400/20 font-mono">
                    {{ tech }}
                  </span>
                }
              </div>
            </div>

            <!-- Detail Sections Grid -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <!-- Contexto -->
              <section class="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-6 space-y-3">
                <div class="flex items-center space-x-2 text-lime-400">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <h2 class="text-lg font-bold font-display text-white">Contexto</h2>
                </div>
                <p class="text-slate-300 text-sm sm:text-base leading-relaxed">
                  {{ item.context }}
                </p>
              </section>

              <!-- Impacto -->
              <section class="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-6 space-y-3">
                <div class="flex items-center space-x-2 text-lime-400">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  <h2 class="text-lg font-bold font-display text-white">Impacto Gerado</h2>
                </div>
                <p class="text-slate-300 text-sm sm:text-base leading-relaxed">
                  {{ item.impact }}
                </p>
              </section>
            </div>

            <!-- Métricas Destacadas -->
            @if (item.metrics) {
              <section class="bg-gradient-to-r from-lime-400/5 via-slate-900 to-slate-900/80 border border-lime-400/30 rounded-2xl p-6 sm:p-8 space-y-3 shadow-lg">
                <div class="flex items-center space-x-2 text-lime-400">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                  <h2 class="text-lg font-bold font-display text-white">Métricas & Resultados Quantitativos</h2>
                </div>
                <p class="text-lime-300 text-base sm:text-lg font-semibold font-mono leading-relaxed">
                  {{ item.metrics }}
                </p>
              </section>
            }

            <!-- Prompt Bruto (opcional) -->
            @if (item.rawPrompt) {
              <section class="bg-slate-950/80 border border-slate-800/80 rounded-2xl p-6 space-y-2">
                <h3 class="text-xs text-slate-400 font-semibold uppercase tracking-wider">Entrada Bruta de Origem</h3>
                <p class="text-slate-400 text-sm font-mono italic">
                  "{{ item.rawPrompt }}"
                </p>
              </section>
            }

            <!-- Footer Action -->
            <div class="pt-6 flex justify-center">
              <a
                routerLink="/"
                class="inline-flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-white font-semibold px-6 py-3 rounded-xl border border-slate-700 transition-all cursor-pointer text-sm"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                <span>Voltar ao Dashboard</span>
              </a>
            </div>
          </article>
        } @else {
          <div class="text-center py-20 bg-slate-900/40 border border-slate-800 rounded-3xl space-y-6">
            <div class="text-5xl">🔍</div>
            <div class="space-y-2">
              <h2 class="text-2xl font-bold font-display text-white">Conquista não encontrada</h2>
              <p class="text-slate-400 text-sm max-w-md mx-auto">
                Não foi possível localizar nenhuma conquista com o identificador "{{ id() }}".
              </p>
            </div>
            <a
              routerLink="/"
              class="inline-flex items-center gap-2 bg-lime-400 text-black font-bold px-6 py-3 rounded-xl hover:bg-lime-300 transition-all cursor-pointer text-sm"
            >
              <span>Voltar ao Dashboard</span>
            </a>
          </div>
        }
      </main>
    </div>
  `
})
export class DetailComponent {
  // Input route binding for 'id' parameter
  readonly id = input.required<string>();
  
  private readonly bragService = inject(BragService);
  
  protected readonly brag = computed(() => this.bragService.getBragById(this.id()));
}
