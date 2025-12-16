
import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useLogin } from "../hooks/useLogin";
import { Input } from "../components/ui/Input";
import { Button } from "../components/ui/Button";
import { CheckSquare } from "lucide-react";

export const Login: React.FC = () => {
  const { t } = useTranslation();
  const {
    formData,
    validationErrors,
    serverError,
    isSubmitting,
    handleInputChange,
    handleSubmit,
  } = useLogin();

  return (
    <div className="min-h-[80vh] flex flex-col justify-center items-center">
      <div className="sm:mx-auto sm:w-full sm:max-w-md mb-8 text-center">
        <div className="bg-primary-600 h-12 w-12 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-primary-600/30">
          <CheckSquare className="text-white h-7 w-7" />
        </div>
        <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
          {t("auth.signin")}
        </h2>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
          Welcome back to {t("app.name")}
        </p>
      </div>

      <div className="w-full max-w-md">
        <div className="bg-white dark:bg-slate-850 py-8 px-6 shadow-xl rounded-2xl border border-slate-100 dark:border-slate-800">
          <form className="space-y-6" onSubmit={handleSubmit} noValidate>
            {/* Email Field */}
            <div>
              <Input
                label={t("auth.email")}
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleInputChange}
                className={
                  validationErrors.email
                    ? "border-red-500 focus:ring-red-500"
                    : ""
                }
                autoComplete="email"
              />
              {validationErrors.email && (
                <p className="text-red-500 text-xs mt-1">
                  {validationErrors.email}
                </p>
              )}
            </div>

            <div>
              <Input
                label={t("auth.password")}
                name="password"
                type="password"
                required
                value={formData.password}
                onChange={handleInputChange}
                className={
                  validationErrors.password
                    ? "border-red-500 focus:ring-red-500"
                    : ""
                }
                autoComplete="current-password"
              />
              {validationErrors.password && (
                <p className="text-red-500 text-xs mt-1">
                  {validationErrors.password}
                </p>
              )}
            </div>

            {serverError && (
              <div className="p-3 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800">
                <p className="text-sm text-red-600 dark:text-red-400 text-center font-medium">
                  {serverError}
                </p>
              </div>
            )}

            <Button
              type="submit"
              className="w-full"
              size="lg"
              isLoading={isSubmitting}
              disabled={isSubmitting}
            >
              {t("auth.signin")}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-slate-600 dark:text-slate-400">
              {t("auth.noAccount")}{" "}
              <Link
                to="/register"
                className="font-medium text-primary-600 hover:text-primary-500 dark:text-primary-400"
              >
                {t("auth.signup")}
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
