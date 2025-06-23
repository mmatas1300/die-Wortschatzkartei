import React from 'react';
import * as AlertDialog from '@radix-ui/react-alert-dialog';
import { Pencil as PencilIcon } from 'lucide-react';
import ScrollAreaUpdate from '@/app/(pages)/karteneditor/_components/meineKarte/ScrollAreaUpdate';

const UpdateMessage = () => (
    <AlertDialog.Root>
        <AlertDialog.Trigger asChild>
            <PencilIcon />
        </AlertDialog.Trigger>
        <AlertDialog.Portal>
            <AlertDialog.Overlay className="inset-0 bg-black-card/[0.7] fixed z-50" />
            <AlertDialog.Content className="top-2/4 left-2/4 transform -translate-x-2/4 -translate-y-2/4 max-w-[700px] max-h-[500px] w-[90vw] overflow-hidden bg-black-card rounded-xl border-2 border-orange-card fixed z-50 px-3 py-7">
                <AlertDialog.Title className="text-base text-center">Bearbeite deine Karte</AlertDialog.Title>
                <ScrollAreaUpdate />
                <div style={{ display: 'flex', gap: 25, justifyContent: 'flex-end' }}>
                    <AlertDialog.Cancel asChild>

                    </AlertDialog.Cancel>
                    <AlertDialog.Action asChild>
                        <button className="border-2 border-orange-card">Fertig</button>
                    </AlertDialog.Action>
                </div>
            </AlertDialog.Content>
        </AlertDialog.Portal>
    </AlertDialog.Root>
);

export default UpdateMessage;