import React from 'react';
import * as ScrollArea from '@radix-ui/react-scroll-area';
import EditCardForm from './EditCardForm';

const ScrollAreaUpdate = () => (
  <ScrollArea.Root className="min-h-60 h-[340px] lg:w-[670px] lg:h-[400px] rounded overflow-hidden bg-black-card">
    <ScrollArea.Viewport className="w-full h-full rounded">
     <EditCardForm/>
    </ScrollArea.Viewport>
    <ScrollArea.Scrollbar
      className="flex select-none touch-none p-0.5 bg-white-card transition-colors duration-[160ms] ease-out hover:bg-orange-card data-[orientation=vertical]:w-2.5 data-[orientation=horizontal]:flex-col data-[orientation=horizontal]:h-2.5"
      orientation="vertical"
    >
      <ScrollArea.Thumb className="flex-1 bg-black-card rounded-[10px] relative before:content-[''] before:absolute before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:w-full before:h-full before:min-w-[44px] before:min-h-[44px]" />
    </ScrollArea.Scrollbar>
    <ScrollArea.Scrollbar
      className="flex select-none touch-none p-0.5 bg-black-card transition-colors duration-[160ms] ease-out hover:bg-green-card data-[orientation=vertical]:w-2.5 data-[orientation=horizontal]:flex-col data-[orientation=horizontal]:h-2.5"
      orientation="horizontal"
    >
      <ScrollArea.Thumb className="flex-1 bg-yellow-card rounded-[10px] relative before:content-[''] before:absolute before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:w-full before:h-full before:min-w-[44px] before:min-h-[44px]" />
    </ScrollArea.Scrollbar>
    <ScrollArea.Corner className="bg-yellow-card" />
  </ScrollArea.Root>
);

export default ScrollAreaUpdate;