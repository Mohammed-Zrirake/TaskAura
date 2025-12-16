import React, { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import api from "../lib/axios";
import { Input } from "../components/ui/Input";
import { Button } from "../components/ui/Button";
import { CheckSquare } from "lucide-react";
import { userSchema, UserSchema } from "../lib/validation";

export const Register: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [validationErrors, setValidationErrors] = useState<
    Partial<Record<keyof UserSchema, string>>
  >({});
  const [serverError, setServerError] = useState("");

  const mutation = useMutation({
    mutationFn: async (data: typeof formData) => {
      await api.post("/auth/signup", data);
      await api.post("/auth/signin", {
        email: data.email,
        password: data.password,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
      navigate("/");
    },
    onError: (err: any) => {
      setServerError(err.response?.data?.message || t("common.error"));
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setServerError("");

    const result = userSchema.safeParse(formData);

    if (!result.success) {
      const fieldErrors: Partial<Record<keyof UserSchema, string>> = {};
      result.error.issues.forEach((issue) => {
        const path = issue.path[0] as keyof UserSchema;
        fieldErrors[path] = issue.message;
      });
      setValidationErrors(fieldErrors);
      return;
    }
    setValidationErrors({});
    mutation.mutate(formData);
  };

  return (
    <div className="min-h-[80vh] flex flex-col justify-center items-center">
      <div className="sm:mx-auto sm:w-full sm:max-w-md mb-8 text-center">
        <div className="bg-primary-600 h-12 w-12 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-primary-600/30">
          <CheckSquare className="text-white h-7 w-7" />
        </div>
        <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
          {t("auth.signup")}
        </h2>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
          Create your {t("app.name")} account
        </p>
      </div>

      <div className="w-full max-w-md">
        <div className="bg-white dark:bg-slate-850 py-8 px-6 shadow-xl rounded-2xl border border-slate-100 dark:border-slate-800">
          <form className="space-y-6" onSubmit={handleSubmit} noValidate>
            <div>
              <Input
                label={t("auth.username")}
                type="text"
                required
                value={formData.username}
                onChange={(e) =>
                  setFormData({ ...formData, username: e.target.value })
                }
                className={
                  validationErrors.username
                    ? "border-red-500 focus:ring-red-500"
                    : ""
                }
              />
              {validationErrors.username && (
                <p className="text-red-500 text-xs mt-1">
                  {validationErrors.username}
                </p>
              )}
            </div>
            <div>
              <Input
                label={t("auth.email")}
                type="email"
                required
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className={
                  validationErrors.email
                    ? "border-red-500 focus:ring-red-500"
                    : ""
                }
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
                type="password"
                required
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                className={
                  validationErrors.password
                    ? "border-red-500 focus:ring-red-500"
                    : ""
                }
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
              isLoading={mutation.isPending}
            >
              {t("auth.signup")}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-slate-600 dark:text-slate-400">
              {t("auth.haveAccount")}{" "}
              <Link
                to="/login"
                className="font-medium text-primary-600 hover:text-primary-500 dark:text-primary-400"
              >
                {t("auth.signin")}
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
