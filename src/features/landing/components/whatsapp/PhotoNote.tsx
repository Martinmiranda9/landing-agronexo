import Image from 'next/image';

/** Foto que manda el trabajador desde el lote (malezas entre los surcos), con la leyenda abajo. */
export function PhotoNote({ caption }: { caption: string }) {
  return (
    <span className="block w-44">
      <span className="relative -mx-1 mt-0.5 block aspect-square overflow-hidden rounded-md">
        <Image
          src="/images/whatsapp/malezas-lote-4.png"
          alt=""
          fill
          sizes="180px"
          className="object-cover"
        />
      </span>
      <span className="mt-1 block">{caption}</span>
    </span>
  );
}
