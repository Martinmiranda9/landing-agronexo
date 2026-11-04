'use client';

import { Accordion as AccordionPrimitive } from '@base-ui/react/accordion';
import { MdKeyboardArrowDown } from 'react-icons/md';
import { cn } from '@/shared/utils/cn';

/*
 * Cashmere Accordion (registro `cashmere/accordion-base`): ítems separados por hairline, trigger a lo ancho con la
 * flecha que gira al abrir y panel que anima su alto. El ícono de Iconify se cambia por `react-icons/md`; AgroNexo
 * agranda el trigger y el texto para usarlo como lista de preguntas de la landing.
 */

const Accordion = AccordionPrimitive.Root;

// El className de Base UI puede ser una función de estado: los wrappers lo pasan por cn(), así que se acota a string.
type WithClassName<P> = Omit<P, 'className'> & { className?: string };

function AccordionItem({ className, ...props }: WithClassName<AccordionPrimitive.Item.Props>) {
  return (
    <AccordionPrimitive.Item
      data-slot="accordion-item"
      className={cn('border-border border-b last:border-b-0', className)}
      {...props}
    />
  );
}

function AccordionTrigger({ className, children, ...props }: WithClassName<AccordionPrimitive.Trigger.Props>) {
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        data-slot="accordion-trigger"
        className={cn(
          'text-pine flex flex-1 items-center justify-between gap-4 rounded-md py-4.5 text-left text-base font-medium md:py-5 md:text-[17px] tracking-[-0.2px] transition-colors duration-150',
          'hover:text-primary focus-visible:ring-ring/40 focus-visible:ring-2 focus-visible:outline-none',
          '[&[data-panel-open]>svg]:rotate-180',
          className
        )}
        {...props}
      >
        {children}
        <MdKeyboardArrowDown
          aria-hidden
          className="text-muted-foreground size-5 shrink-0 transition-transform duration-200"
        />
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  );
}

function AccordionContent({ className, children, ...props }: WithClassName<AccordionPrimitive.Panel.Props>) {
  return (
    <AccordionPrimitive.Panel
      data-slot="accordion-content"
      className="text-muted-foreground h-(--accordion-panel-height) overflow-hidden text-[15px] transition-[height] duration-200 ease-out data-ending-style:h-0 data-starting-style:h-0"
      {...props}
    >
      <div className={cn('max-w-[62ch] pt-0 pb-5 leading-[1.6]', className)}>{children}</div>
    </AccordionPrimitive.Panel>
  );
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
