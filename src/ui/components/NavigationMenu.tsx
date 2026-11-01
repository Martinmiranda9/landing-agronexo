// Código oficial: Cashmere `navigation-menu-base` (registro de Better Design). Solo cambian los imports (alias de AgroNexo e íconos Material de react-icons).
// AgroNexo suma la variante `underline` (solapas como links con la raya de `tabs-subtle`, en pine) y el foco con anillo.
'use client';

import * as React from 'react';
import { NavigationMenu as NavigationMenuPrimitive } from '@base-ui/react/navigation-menu';
import { cva } from 'class-variance-authority';
import { MdKeyboardArrowDown } from 'react-icons/md';

import { cn } from '@/shared/utils/cn';

// Base UI className can be a state function; the wrappers feed it to cn(), so
// narrow it to a plain string (same treatment as the other ported files).
type WithClassName<P> = Omit<P, 'className'> & { className?: string };

function NavigationMenu({
  className,
  children,
  ...props
}: WithClassName<NavigationMenuPrimitive.Root.Props>) {
  return (
    <NavigationMenuPrimitive.Root
      className={cn('relative z-10 flex max-w-max flex-1 items-center justify-center', className)}
      {...props}
    >
      {children}
      <NavigationMenuViewport />
    </NavigationMenuPrimitive.Root>
  );
}
NavigationMenu.displayName = 'NavigationMenu';

function NavigationMenuList({
  className,
  ...props
}: WithClassName<NavigationMenuPrimitive.List.Props>) {
  return (
    <NavigationMenuPrimitive.List
      className={cn('group flex flex-1 list-none items-center justify-center gap-1', className)}
      {...props}
    />
  );
}
NavigationMenuList.displayName = 'NavigationMenuList';

const NavigationMenuItem = NavigationMenuPrimitive.Item;

const navigationMenuTriggerStyle = cva(
  'inline-flex h-9 w-max items-center justify-center rounded-lg px-4 py-2 text-sm font-medium ' +
    'transition-[background-color,color] duration-150 ' +
    'hover:bg-accent hover:text-accent-foreground ' +
    'focus-visible:ring-ring focus-visible:ring-2 focus-visible:outline-none ' +
    'disabled:pointer-events-none disabled:opacity-50 ' +
    'data-[active]:bg-accent/60 data-popup-open:bg-accent'
);

/*
 * Solapas subrayadas: la fila de links de una sección (el espacio del campo). La activa va en pine con la raya de 2 px
 * de `tabs-subtle` debajo (en pine y no en verde campo: lo activo es pine); en celular la fila se desliza de costado
 * y los íconos se ocultan para que entren más solapas.
 */
const navigationMenuUnderlineRootStyle =
  'w-full max-w-full justify-start overflow-x-auto border-b border-border ' +
  '[scrollbar-width:none] [&::-webkit-scrollbar]:hidden';

const navigationMenuUnderlineListStyle = 'flex-none justify-start gap-1';

const navigationMenuLinkStyle = cva(
  'relative inline-flex min-h-11 shrink-0 items-center gap-2 rounded-t-lg px-3 text-sm font-medium ' +
    'whitespace-nowrap text-muted-foreground transition-[background-color,color] duration-150 lg:min-h-10 ' +
    'hover:bg-secondary hover:text-foreground ' +
    'focus-visible:ring-ring focus-visible:ring-2 focus-visible:outline-none focus-visible:ring-inset ' +
    'data-[active]:font-semibold data-[active]:text-foreground ' +
    'after:absolute after:inset-x-3 after:-bottom-px after:h-0.5 after:rounded-full data-[active]:after:bg-foreground ' +
    '[&>svg]:size-4.5 [&>svg]:shrink-0 max-sm:[&>svg]:hidden'
);

function NavigationMenuTrigger({
  className,
  children,
  ...props
}: WithClassName<NavigationMenuPrimitive.Trigger.Props>) {
  return (
    <NavigationMenuPrimitive.Trigger
      className={cn(navigationMenuTriggerStyle(), 'group', className)}
      {...props}
    >
      {children}
      <MdKeyboardArrowDown
        className="relative top-[0.0625rem] ml-1 h-3 w-3 transition duration-200 group-data-popup-open:rotate-180"
        aria-hidden="true"
      />
    </NavigationMenuPrimitive.Trigger>
  );
}
NavigationMenuTrigger.displayName = 'NavigationMenuTrigger';

function NavigationMenuContent({
  className,
  ...props
}: WithClassName<NavigationMenuPrimitive.Content.Props>) {
  return (
    <NavigationMenuPrimitive.Content
      className={cn(
        'top-0 left-0 w-full transition-[opacity,transform,translate] duration-150 data-ending-style:opacity-0 data-starting-style:opacity-0 data-ending-style:data-[activation-direction=left]:translate-x-52 data-starting-style:data-[activation-direction=left]:-translate-x-52 data-ending-style:data-[activation-direction=right]:-translate-x-52 data-starting-style:data-[activation-direction=right]:translate-x-52 md:absolute md:w-auto',
        className
      )}
      {...props}
    />
  );
}
NavigationMenuContent.displayName = 'NavigationMenuContent';

const NavigationMenuLink = NavigationMenuPrimitive.Link;

function NavigationMenuViewport({
  className,
  ...props
}: WithClassName<NavigationMenuPrimitive.Viewport.Props>) {
  return (
    <NavigationMenuPrimitive.Portal>
      <NavigationMenuPrimitive.Positioner sideOffset={8} className="isolate z-50">
        <NavigationMenuPrimitive.Popup
          className={cn(
            'relative h-[var(--popup-height)] w-full origin-[var(--transform-origin)] overflow-hidden',
            'border-border bg-popover text-popover-foreground rounded-xl border',
            '[box-shadow:var(--shadow-l)]',
            'transition-[opacity,transform,scale,width,height] duration-150 data-ending-style:scale-95 data-ending-style:opacity-0 data-starting-style:scale-90 data-starting-style:opacity-0 md:w-[var(--popup-width)]'
          )}
        >
          <NavigationMenuPrimitive.Viewport
            className={cn('relative h-full w-full overflow-hidden', className)}
            {...props}
          />
        </NavigationMenuPrimitive.Popup>
      </NavigationMenuPrimitive.Positioner>
    </NavigationMenuPrimitive.Portal>
  );
}
NavigationMenuViewport.displayName = 'NavigationMenuViewport';

// BEHAVIOR DELTA (flagged): Base UI has no equivalent of the upstream
// NavigationMenu.Indicator (the pointer that tracks the active trigger along
// the list). This is an inert passthrough that renders nothing so existing
// call sites keep compiling. The closest Base UI analogues are
// NavigationMenu.Icon (chevron inside the trigger) and NavigationMenu.Arrow
// (popup-anchored pointer), neither of which tracks the trigger list.
function NavigationMenuIndicator(props: React.ComponentPropsWithoutRef<'div'>) {
  void props;
  return null;
}
NavigationMenuIndicator.displayName = 'NavigationMenuIndicator';

export {
  navigationMenuTriggerStyle,
  navigationMenuLinkStyle,
  navigationMenuUnderlineRootStyle,
  navigationMenuUnderlineListStyle,
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuContent,
  NavigationMenuTrigger,
  NavigationMenuLink,
  NavigationMenuIndicator,
  NavigationMenuViewport,
};
