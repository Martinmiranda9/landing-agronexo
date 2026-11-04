/*
 * Guion del chat de WhatsApp de la landing: un trabajador de La Esperanza carga una pulverización por audio, un
 * monitoreo de malezas con una foto y hace una consulta. `at` es el momento (ms desde que arranca) en que entra cada paso;
 * `typing` muestra al bot escribiendo. Al terminar, el chat se vacía y vuelve a empezar.
 */

export interface RecordField {
  key: string;
  value: string;
}

export type ChatMessage =
  | { id: string; from: 'worker'; kind: 'audio'; duration: string; time: string }
  | { id: string; from: 'worker'; kind: 'photo'; caption: string; time: string }
  | { id: string; from: 'worker'; kind: 'text'; text: string; time: string }
  | { id: string; from: 'bot'; kind: 'record'; intro: string; fields: RecordField[]; time: string; stage: number }
  | { id: string; from: 'bot'; kind: 'text'; text: string; source?: string; time: string; stage: number };

export type ChatStep = { at: number; typing: true } | { at: number; message: ChatMessage };

/** Lo que la IA sacó de cada mensaje: los tags que flotan al lado del celular, por etapa. */
export const UNDERSTOOD: RecordField[][] = [
  [
    { key: 'Tipo', value: 'Pulverización' },
    { key: 'Lote', value: 'Lote 7' },
    { key: 'Superficie', value: '120 ha' },
    { key: 'Producto', value: 'Glifosato · 2 L/ha' },
  ],
  [
    { key: 'Tipo', value: 'Monitoreo de malezas' },
    { key: 'Lote', value: 'Lote 4' },
    { key: 'Aviso', value: 'Ing. agrónoma' },
  ],
  [
    { key: 'Consulta', value: 'Soja sembrada' },
    { key: 'Fuente', value: 'Campaña 2026/27' },
  ],
];

export const CHAT_SCRIPT: ChatStep[] = [
  { at: 700, message: { id: 'audio', from: 'worker', kind: 'audio', duration: '0:14', time: '7:42' } },
  { at: 1700, typing: true },
  {
    at: 3100,
    message: {
      id: 'record',
      from: 'bot',
      kind: 'record',
      intro: 'Listo, registré la pulverización:',
      fields: UNDERSTOOD[0],
      time: '7:42',
      stage: 0,
    },
  },
  {
    at: 5400,
    message: { id: 'photo', from: 'worker', kind: 'photo', caption: 'esto en el lote 4', time: '9:15' },
  },
  { at: 6300, typing: true },
  {
    at: 7700,
    message: {
      id: 'weeds',
      from: 'bot',
      kind: 'text',
      text: 'Registré el monitoreo de malezas en el Lote 4 y le avisé a la ingeniera agrónoma.',
      time: '9:15',
      stage: 1,
    },
  },
  {
    at: 10000,
    message: { id: 'question', from: 'worker', kind: 'text', text: '¿Cuánta soja llevamos sembrada?', time: '11:03' },
  },
  { at: 10900, typing: true },
  {
    at: 12300,
    message: {
      id: 'answer',
      from: 'bot',
      kind: 'text',
      text: '400 de 1.060 ha (38 %). Faltan el Lote 9 y el Lote 11.',
      source: 'Campaña 2026/27',
      time: '11:03',
      stage: 2,
    },
  },
];

/** Cuánto queda quieto el chat completo antes de volver a empezar. */
export const CHAT_HOLD_MS = 5000;
