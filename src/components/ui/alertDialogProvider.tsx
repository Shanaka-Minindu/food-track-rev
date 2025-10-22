import { useGlobalStore } from "@/lib/useGlobleStore";
import React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./alert-dialog";
import { Button } from "./button";

const AlertDialogProvider = () => {
  const { alertConfig, alertOpen, updateAlertOpen } = useGlobalStore();

  if (!alertConfig) return null;

  const handleConfirm = () => {
    if (alertConfig.onConfirm) {
      alertConfig.onConfirm();
    }
    updateAlertOpen(false);
  };

  const handleCancel = () => {
    if (alertConfig.onCancel) {
      alertConfig.onCancel();
    }
    updateAlertOpen(false);
  };

  return (
    <AlertDialog open={alertOpen}>
      <AlertDialogTrigger asChild>
        <Button variant="outline">Show Dialog</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            {alertConfig.title || "Are you absolutely sure?"}
          </AlertDialogTitle>
          <AlertDialogDescription>
            {alertConfig.description ||
              "This action cannot be undone. This will permanently delete your account and remove your data from our servers."}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={handleCancel}>
            {alertConfig.cancelLabel || "Cancel"}
          </AlertDialogCancel>
          <AlertDialogAction onClick={handleConfirm}>
            {alertConfig.confirmLabel || "Continue"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default AlertDialogProvider;
