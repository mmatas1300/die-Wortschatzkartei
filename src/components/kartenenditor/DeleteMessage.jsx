import React from 'react';
import * as AlertDialog from '@radix-ui/react-alert-dialog';
import "@/components/kartenenditor/DeleteMessage.css";
import { SquareX as SquareXIcon} from 'lucide-react';

const DeleteMessage = ({deleteCard}) => (
  <AlertDialog.Root>
    <AlertDialog.Trigger asChild>
      <SquareXIcon />
    </AlertDialog.Trigger>
    <AlertDialog.Portal>
      <AlertDialog.Overlay className="AlertDialogOverlay bg-black-card/[0.2] fixed z-50" />
      <AlertDialog.Content className="AlertDialogContent bg-black-card rounded-xl fixed z-50 p-7">
        <AlertDialog.Title className="text-base">Karte löschen!!!</AlertDialog.Title>
        <AlertDialog.Description className="text-sm">
          Sind Sie sicher, dass Sie die Karte löschen möchten?
        </AlertDialog.Description>
        <div style={{ display: 'flex', gap: 25, justifyContent: 'flex-end' }}>
          <AlertDialog.Cancel asChild>
            <button className="border-2 border-green-card">Abbrechen</button>
          </AlertDialog.Cancel>
          <AlertDialog.Action asChild>
            <button onClick={deleteCard} className="bg-red-card">Ja, Karte löschen</button>
          </AlertDialog.Action>
        </div>
      </AlertDialog.Content>
    </AlertDialog.Portal>
  </AlertDialog.Root>
);

export default DeleteMessage;