
import { useState,React } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import api from "../lib/axios";
import { loginSchema, LoginSchema } from "../lib/validation";

export const useLogin = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const queryClient = useQueryClient();


  const [formData, setFormData] = useState<LoginSchema>({
    email: "",
    password: "",
  });
  const [validationErrors, setValidationErrors] = useState<
    Partial<Record<keyof LoginSchema, string>>
  >({});
  const [serverError, setServerError] = useState("");

 
  const loginMutation = useMutation({
    mutationFn: async (data: LoginSchema) => {
      await api.post("/auth/signin", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
      navigate("/");
    },
    onError: (err: any) => {
      if (err.response?.status === 401) {
        setServerError(
          t("auth.invalidCredentials") || "Invalid email or password"
        );
      } else {
        setServerError(err.response?.data?.message || t("common.error"));
      }
    },
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));


    if (validationErrors[name as keyof LoginSchema]) {
      setValidationErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }


    if (serverError) {
      setServerError("");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setServerError("");

  
    const result = loginSchema.safeParse(formData);

    if (!result.success) {
      const fieldErrors: Partial<Record<keyof LoginSchema, string>> = {};
      result.error.issues.forEach((issue) => {
        const path = issue.path[0] as keyof LoginSchema;
        fieldErrors[path] = issue.message;
      });
      setValidationErrors(fieldErrors);
      return;
    }

    setValidationErrors({});
    loginMutation.mutate(formData);
  };

  const resetForm = () => {
    setFormData({ email: "", password: "" });
    setValidationErrors({});
    setServerError("");
  };

  return {
    // State
    formData,
    validationErrors,
    serverError,


    isSubmitting: loginMutation.isPending,
    isError: loginMutation.isError,

    
    handleInputChange,
    handleSubmit,
    resetForm,

    
    setFormData,
    setValidationErrors,
    setServerError,
  };
};
