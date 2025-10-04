import { useGlobalStore } from '@/lib/use-global-store'
import React from 'react'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from './ui/alert-dialog';
import { Button } from './ui/button';

const AlertDialogProvider = () => {
          const {alertOpen,alertConfig,updateAlertOpen}= useGlobalStore();

          const handleConfirm=()=>{
                    if(alertConfig?.onConfirm){
                              alertConfig.onConfirm();
                    }
                    updateAlertOpen(false);
          }

          const handleCancel =()=>{
                    if(alertConfig?.onCancel){
                              alertConfig.onCancel();
                    }
                    updateAlertOpen(false)
          }

          if(!alertConfig) return null;

  return (
   <AlertDialog open={alertOpen}>
      <AlertDialogTrigger asChild>
        <Button variant="outline">Show Dialog</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{alertConfig.title || "Are you absolutely sure?"}</AlertDialogTitle>
          <AlertDialogDescription>
            {alertConfig.description || "This action cannot be undone. This will permanently delete your account and remove your data from our servers."}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={handleCancel}>{alertConfig.cancelLabel|| "Cancel"}</AlertDialogCancel>
          <AlertDialogAction onClick={handleConfirm}>{alertConfig.confirmLabel || "Continue"}</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default AlertDialogProvider
