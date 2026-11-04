/** El bot escribiendo: tres puntos que suben y bajan (quietos con "reducir movimiento"). */
export function TypingDots() {
  return (
    <span className="flex h-4 items-center gap-1 px-1" aria-label="Escribiendo">
      {[0, 150, 300].map((delay) => (
        <span
          key={delay}
          className="bg-sage-400 size-1.5 animate-bounce rounded-full motion-reduce:animate-none"
          style={{ animationDelay: `${delay}ms`, animationDuration: '900ms' }}
        />
      ))}
    </span>
  );
}
