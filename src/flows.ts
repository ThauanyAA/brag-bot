import { genkit, z } from 'genkit';
import { googleAI } from '@genkit-ai/google-genai';
import { startFlowServer } from '@genkit-ai/express';
import { v4 as uuidv4 } from 'uuid';

/**
 * Inicialização da instância do Genkit com o plugin Google AI
 * Configurado com modelo padrão 'gemini-flash-latest' e temperatura 0.8
 */
export const ai = genkit({
  plugins: [
    googleAI({
      apiKey: process.env['GEMINI_API_KEY'] || process.env['GOOGLE_API_KEY'],
    }),
  ],
  model: googleAI.model('gemini-flash-latest'),
  config: {
    temperature: 0.8,
  },
});

/**
 * Schema de entrada para o rascunho informal do usuário
 */
export const BragInputSchema = z.object({
  definition: z
    .string()
    .describe('Rascunho informal do usuário sobre suas realizações no trabalho.'),
});

/**
 * Schema de saída rigoroso em JSON para o Brag Document
 */
export const BragSchema = z.object({
  title: z
    .string()
    .describe('Ação principal + Resultado de alto nível.'),
  context: z
    .string()
    .describe('Situação/Problema original. O que estava quebrado, lento etc.'),
  actionTaken: z
    .string()
    .describe('Ação técnica ou estratégica tomada passo a passo para resolver o problema.'),
  businessImpact: z
    .string()
    .describe('Qual o impacto de negócio, tempo ganho, redução de falhas etc.'),
  metrics: z
    .array(z.string())
    .describe('Apenas dados estritamente quantificáveis. Ex.: "50% reduction".'),
  technologiesUsed: z
    .array(z.string())
    .describe('Ferramentas, linguagens e plataformas mencionadas ou inferidas.'),
});

/**
 * Fluxo do Genkit para transformação do rascunho informal em um Brag Document profissional
 */
export const bragGeneratorFlow = ai.defineFlow(
  {
    name: 'bragGeneratorFlow',
    inputSchema: BragInputSchema,
    outputSchema: BragSchema,
  },
  async (input) => {
    const prompt = `Você é um "Senior Career Consultant" focado em Planos de Desenvolvimento Individual (IDP) para Engenheiros de Software.

Objetivo: Transformar o rascunho informal do usuário sobre suas realizações no trabalho em um "Brag Document" executivo.

Regras:
- Regra 1: Usar tom profissional, objetivo e focado em impacto, sem adjetivos emocionais.
- Regra 2: Se não existirem métricas exatas, a IA deve inferir a natureza da métrica baseada na ação tomada.
- Regra 3: Seguir ESTRITAMENTE o formato do schema JSON (BragSchema).
- Regra 4: O output deve respeitar a linguagem original do input. Se o usuário mandou em português, responda em português.

Rascunho do usuário:
${input.definition}`;

    const response = await ai.generate({
      prompt,
      output: {
        format: 'json',
        schema: BragSchema,
      },
    });

    if (!response.output) {
      throw new Error('Falha ao gerar o Brag Document: Resposta do modelo inválida ou ausente.');
    }

    return {
      id: uuidv4(),
      ...response.output,
    };
  }
);

/**
 * Inicia o servidor de fluxos (Flow Server) na porta 3400 para permitir que
 * o Genkit Developer UI (genkit start) se conecte ao runtime em modo dev.
 */
startFlowServer({
  flows: [bragGeneratorFlow],
});
