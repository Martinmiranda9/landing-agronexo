import { AgentAssignScene } from './AgentAssignScene';
import { AgentAssistScene } from './AgentAssistScene';
import { AgentContextScene } from './AgentContextScene';
import { AgentStep } from './AgentStep';

/**
 * Agentes de IA, con la estructura de "From signal to content in 3 steps" de buzzabout.ai: encabezado alineado a la
 * izquierda (título de 52px, bajada de 17px) y tres columnas con una mini escena de la app cada una.
 */
export function AgentsSection() {
  return (
    <section id="agentes" aria-labelledby="agents-title" className="relative z-1 py-30">
      <div className="mx-auto max-w-350 px-6 md:px-8">
        <header className="mb-14 md:mb-20">
          <span className="border-border text-muted-foreground mb-6 inline-block rounded-full border bg-white/80 px-2.75 py-1.25 font-mono text-[11.5px] tracking-[0.1em] uppercase">
            04 · Agentes de IA
          </span>
          <h2
            id="agents-title"
            className="mb-3 text-[clamp(32px,3.4vw,52px)] leading-[1.08] font-medium tracking-[-0.04em]"
          >
            Un agente de IA
            <span className="text-sage-400 block">para cada profesional.</span>
          </h2>
          <p className="text-muted-foreground max-w-158 text-[17px] leading-[1.5]">
            Cada miembro del equipo suma un agente especializado en su área, entrenado para trabajar con los datos
            reales de tu campo.
          </p>
        </header>

        <ol className="grid gap-12 md:grid-cols-3 md:gap-6">
          <AgentStep
            eyebrow="Asignación"
            title="Especializado en su área"
            description="Al sumarse al campo, cada profesional recibe un agente configurado para su disciplina: agronomía, contabilidad, legales o inversión. Conoce sus tareas y opera con sus mismos permisos."
          >
            <AgentAssignScene />
          </AgentStep>
          <AgentStep
            eyebrow="Contexto"
            title="Contexto completo del campo"
            description="Trabaja sobre los lotes, cultivos, campañas y el historial de cada labor. Cada respuesta sale de esos registros y cita su fuente, sin inventar."
          >
            <AgentContextScene />
          </AgentStep>
          <AgentStep
            eyebrow="Asistencia"
            title="Un integrante más del equipo"
            description="Anticipa vencimientos, detecta lo que se atrasa, propone los próximos pasos y genera borradores de órdenes e informes. Vos revisás y confirmás."
          >
            <AgentAssistScene />
          </AgentStep>
        </ol>
      </div>
    </section>
  );
}
