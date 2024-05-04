import React from 'react';
import * as AlertDialog from '@radix-ui/react-alert-dialog';
import "@/components/kartenenditor/ResetMessage.css";
import { RotateCcw as RotateCcwIcon } from 'lucide-react';

const ResetMessage = ({ resetLevel }) => (
    <AlertDialog.Root>
        <AlertDialog.Trigger asChild>
            <RotateCcwIcon />
        </AlertDialog.Trigger>
        <AlertDialog.Portal>
            <AlertDialog.Overlay className="AlertDialogOverlay bg-black-card/[0.2] fixed z-50" />
            <AlertDialog.Content className="AlertDialogContent bg-black-card rounded-xl fixed border-2 border-orange-card z-50 p-7">
                <AlertDialog.Title className="text-base">Stufe zurücksetzen!!!</AlertDialog.Title>
                <AlertDialog.Description className="text-sm">
                    Sind Sie sicher, dass Sie Ihre Stufe zurücksetzen möchten?
                </AlertDialog.Description>
                <div style={{ display: 'flex', gap: 25, justifyContent: 'flex-end' }}>
                    <AlertDialog.Cancel asChild>
                        <button className="border-2 border-green-card">Abbrechen</button>
                    </AlertDialog.Cancel>
                    <AlertDialog.Action asChild>
                        <button onClick={resetLevel} className="bg-red-card">Ja, Stufe zurücksetzen</button>
                    </AlertDialog.Action>
                </div>
            </AlertDialog.Content>
        </AlertDialog.Portal>
    </AlertDialog.Root>
);

export default ResetMessage;