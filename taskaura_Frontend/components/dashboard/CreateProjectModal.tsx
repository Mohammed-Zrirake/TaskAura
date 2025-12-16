// components/dashboard/CreateProjectModal.tsx
import React from "react";
import { useTranslation } from "react-i18next";
import { Button } from "../ui/Button";
import { Input } from "../ui/Input";

interface CreateProjectModalProps {
  isOpen: boolean;
  editingId: number | null;
  formData: { title: string; description: string };
  errors: { title?: string; description?: string };
  serverError: string;
  isSubmitting: boolean;
  onClose: () => void;
  onSubmit: (e: React.FormEvent) => void;
  onInputChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
}

export const CreateProjectModal: React.FC<CreateProjectModalProps> = ({
  isOpen,
  editingId,
  formData,
  errors,
  serverError,
  isSubmitting,
  onClose,
  onSubmit,
  onInputChange,
}) => {
  const { t } = useTranslation();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-md"
        onClick={onClose}
      ></div>
      <div className="relative bg-white/95 dark:bg-slate-800/95 backdrop-blur-sm rounded-3xl w-full max-w-md p-8 shadow-2xl animate-in fade-in zoom-in duration-300 border border-white/20 dark:border-slate-700/50">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
          {editingId ? "Edit Project" : t("project.create")}
        </h2>
        <p className="text-slate-600 dark:text-slate-300 text-sm mb-6">
          {editingId
            ? "Update your project details below."
            : "Fill in the details to create a new project."}
        </p>

        {serverError && (
          <div className="mb-6 p-4 bg-red-50/80 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl">
            <p className="text-red-600 dark:text-red-400 text-sm font-medium">
              {serverError}
            </p>
          </div>
        )}

        <form onSubmit={onSubmit} noValidate>
          <div className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                {t("project.title")} *
              </label>
              <Input
                name="title"
                value={formData.title}
                onChange={onInputChange}
                placeholder="Enter project title"
                required
                autoFocus
                className={`w-full bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm ${
                  errors.title ? "border-red-500 focus:ring-red-500" : ""
                }`}
              />
              {errors.title && (
                <p className="text-red-500 text-xs mt-2">{errors.title}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                {t("project.description")}
              </label>
              <textarea
                className={`w-full rounded-xl border px-4 py-3 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm ${
                  errors.description
                    ? "border-red-500 focus:ring-red-500"
                    : "border-slate-300 dark:border-slate-700"
                }`}
                name="description"
                rows={4}
                value={formData.description}
                onChange={onInputChange}
                placeholder="Describe your project goals, team members, or any important details..."
              />
              {errors.description && (
                <p className="text-red-500 text-xs mt-2">
                  {errors.description}
                </p>
              )}
            </div>
          </div>

          <div className="mt-8 flex justify-end gap-3">
            <Button
              type="button"
              variant="secondary"
              onClick={onClose}
              className="border border-slate-300 dark:border-slate-700"
            >
              {t("common.cancel")}
            </Button>
            <Button
              type="submit"
              isLoading={isSubmitting}
              className="bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800"
            >
              {editingId ? t("common.update") : t("common.create")}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
