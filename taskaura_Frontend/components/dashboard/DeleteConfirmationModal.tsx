// components/dashboard/DeleteConfirmationModal.tsx
import React from "react";
import { useTranslation } from "react-i18next";
import { Button } from "../ui/Button";
import { AlertTriangle } from "lucide-react";

interface DeleteConfirmationModalProps {
  isOpen: boolean;
  isDeleting: boolean;
  onCancel: () => void;
  onConfirm: () => void;
  title?: string;
  message?: string;
  itemType?: "project" | "task"; // Optional helper for default texts
}

export const DeleteConfirmationModal: React.FC<
  DeleteConfirmationModalProps
> = ({ 
  isOpen, 
  isDeleting, 
  onCancel, 
  onConfirm,
  title,
  message,
  itemType = "project" 
}) => {
  const { t } = useTranslation();

  if (!isOpen) return null;

  // Default texts based on itemType
  const defaultTitle = itemType === "project" ? "Delete Project" : "Delete Task";
  const defaultMessage = itemType === "project" 
    ? "Are you sure you want to delete this project? This action cannot be undone and will permanently remove all associated tasks and data."
    : "Are you sure you want to delete this task? This action cannot be undone.";

  const displayTitle = title || defaultTitle;
  const displayMessage = message || defaultMessage;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-md"
        onClick={onCancel}
      ></div>
      <div className="relative bg-white/95 dark:bg-slate-800/95 backdrop-blur-sm rounded-3xl w-full max-w-sm p-8 shadow-2xl animate-in fade-in zoom-in duration-300 border-l-4 border-red-500">
        <div className="flex items-center gap-4 text-red-600 dark:text-red-400 mb-6">
          <div className="p-3 bg-red-100 dark:bg-red-900/30 rounded-xl">
            <AlertTriangle size={24} />
          </div>
          <h2 className="text-2xl font-bold">{displayTitle}</h2>
        </div>

        <p className="text-slate-600 dark:text-slate-300 text-sm mb-6 leading-relaxed">
          {displayMessage}
        </p>

        <div className="flex justify-end gap-3">
          <Button
            type="button"
            variant="secondary"
            onClick={onCancel}
            className="border border-slate-300 dark:border-slate-700"
          >
            {t("common.cancel")}
          </Button>
          <Button
            type="button"
            className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white"
            onClick={onConfirm}
            isLoading={isDeleting}
          >
            {displayTitle}
          </Button>
        </div>
      </div>
    </div>
  );
};
