import React from 'react';
import * as AlertDialog from '@radix-ui/react-alert-dialog';
import "@/components/kartenenditor/UpdateMessage.css";
import { Pencil as PencilIcon} from 'lucide-react';

import ScrollAreaUpdate from './ScrollAreaUpdate';

const UpdateMessage = () => (
  <AlertDialog.Root>
    <AlertDialog.Trigger asChild>
      <PencilIcon />
    </AlertDialog.Trigger>
    <AlertDialog.Portal>
      <AlertDialog.Overlay className="AlertDialogOverlay bg-black-card/[0.5] fixed z-50" />
      <AlertDialog.Content className="AlertDialogContent overflow-hidden bg-black-card rounded-xl border-2 border-orange-card fixed z-50 px-3 py-7">
        <AlertDialog.Title className="text-base text-center">Bearbeite deine Karte</AlertDialog.Title>
        <ScrollAreaUpdate />
        <div style={{ display: 'flex', gap: 25, justifyContent: 'flex-end' }}>
          <AlertDialog.Cancel asChild>
            <button className="border-2 border-red-card">Abbrechen</button>
          </AlertDialog.Cancel>
          <AlertDialog.Action asChild>
            <button className="bg-green-card">Fertig</button>
          </AlertDialog.Action>
        </div>
      </AlertDialog.Content>
    </AlertDialog.Portal>
  </AlertDialog.Root>
);

export default UpdateMessage;