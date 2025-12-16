// components/dashboard/ErrorState.tsx
import React from "react";
import { useTranslation } from "react-i18next";
import { Button } from "../ui/Button";
import { AlertTriangle } from "lucide-react";

interface ErrorStateProps {
  message?: string;
  onRetry?: () => void;
}

export const ErrorState: React.FC<ErrorStateProps> = ({ message, onRetry }) => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-900 dark:via-slate-900 dark:to-slate-900 flex items-center justify-center">
      <div className="text-center">
        <div className="relative inline-block mb-6">
          <div className="absolute inset-0 bg-red-500/20 blur-xl rounded-full"></div>
          <AlertTriangle className="relative h-16 w-16 text-red-500 mx-auto" />
        </div>
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
          {message || t("common.errorLoading")}
        </h2>
        <p className="text-slate-600 dark:text-slate-400 max-w-md mx-auto">
          Unable to load your projects. Please check your connection and try
          again.
        </p>
        {onRetry && (
          <Button
            onClick={onRetry}
            className="mt-6 bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800"
          >
            Retry
          </Button>
        )}
      </div>
    </div>
  );
};