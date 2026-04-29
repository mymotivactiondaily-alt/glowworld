import Anthropic from '@anthropic-ai/sdk';
import dotenv from 'dotenv';
dotenv.config();

const getClient = () => new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY || ''
});

export async function* streamMascotResponse(params: {
  systemPrompt: string;
  history: Array<{ role: 'user' | 'assistant'; content: string }>;
  userMessage: string;
  footballContext?: string | null;
}): AsyncGenerator<string> {
  const anthropic = getClient();
  const model = process.env.ANTHROPIC_MODEL || 'claude-haiku-4-5';
  const maxTokens = Number(process.env.ANTHROPIC_MAX_TOKENS_OUT) || 400;

  const finalSystemPrompt = params.systemPrompt + (params.footballContext ? `\n\n[CONTEXTE FOOTBALL]\n${params.footballContext}` : '');

  const messages = [...params.history, { role: 'user' as const, content: params.userMessage }];

  const stream = await anthropic.messages.create({
    model: model,
    max_tokens: maxTokens,
    system: finalSystemPrompt,
    messages: messages,
    stream: true,
  });

  let input_tokens = 0;
  let output_tokens = 0;

  for await (const chunk of stream) {
    if (chunk.type === 'message_start' && chunk.message.usage) {
      input_tokens += chunk.message.usage.input_tokens;
    } else if (chunk.type === 'content_block_delta' && chunk.delta.type === 'text_delta') {
      yield chunk.delta.text;
    } else if (chunk.type === 'message_delta' && chunk.usage) {
      output_tokens += chunk.usage.output_tokens;
    }
  }

  yield JSON.stringify({ __usage: { input_tokens, output_tokens } });
}

export function estimateCostEUR(usage: { input_tokens: number; output_tokens: number }): number {
  const inputCostUSD = Number(process.env.HAIKU_INPUT_COST_PER_MTOK_USD) || 1.0;
  const outputCostUSD = Number(process.env.HAIKU_OUTPUT_COST_PER_MTOK_USD) || 5.0;
  const eurUsdRate = Number(process.env.EUR_USD_RATE) || 0.92;

  const costUSD = (usage.input_tokens * inputCostUSD / 1000000) + (usage.output_tokens * outputCostUSD / 1000000);
  return costUSD * eurUsdRate;
}
