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
}

export const DeleteConfirmationModal: React.FC<
  DeleteConfirmationModalProps
> = ({ isOpen, isDeleting, onCancel, onConfirm }) => {
  const { t } = useTranslation();

  if (!isOpen) return null;

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
          <h2 className="text-2xl font-bold">Delete Project</h2>
        </div>

        <p className="text-slate-600 dark:text-slate-300 text-sm mb-6 leading-relaxed">
          Are you sure you want to delete this project? This action{" "}
          <span className="font-bold text-red-500">cannot be undone</span> and
          will permanently remove all associated tasks and data.
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
            Delete Project
          </Button>
        </div>
      </div>
    </div>
  );
};
