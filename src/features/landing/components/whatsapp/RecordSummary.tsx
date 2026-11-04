import type { RecordField } from './chat-script';

/**
 * Lo que registró el bot, en texto plano como un mensaje de WhatsApp: un dato por renglón con el nombre en negrita
 * (el *negrita* de WhatsApp) y la confirmación con el ✅.
 */
export function RecordSummary({ intro, fields }: { intro: string; fields: RecordField[] }) {
  return (
    <span className="block w-48">
      <span className="block">{intro}</span>
      <span className="mt-1.5 block">
        {fields.map((field) => (
          <span key={field.key} className="block">
            <strong className="font-semibold">{field.key}:</strong> {field.value}
          </span>
        ))}
      </span>
      <span className="mt-1.5 block">✅ Guardado en La Esperanza</span>
    </span>
  );
}
