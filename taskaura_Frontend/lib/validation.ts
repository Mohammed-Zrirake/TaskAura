import { z } from "zod";

export const userSchema = z.object({
  id: z.number().optional(),
  username: z
    .string()
    .min(1, "Username is required") 
    .max(50, "Username cannot exceed 50 characters"),
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(6, "Password must be at least 6 characters"),
});

export type UserSchema = z.infer<typeof userSchema>;

export const projectSchema = z.object({
  id: z.number().optional(),
  title: z
    .string()
    .min(1, "Project title is required")
    .max(100, "Project title is too long"),
  description: z.string().optional(),
  createdAt: z.string().optional(),
});

export type ProjectSchema = z.infer<typeof projectSchema>;


export const taskSchema = z.object({
  id: z.number().optional(),
  title: z
    .string()
    .min(1, "Task title is required")
    .max(100, "Task title is too long"),
  description: z.string().optional(),
  dueDate: z.string().optional(),
  completed: z.boolean().default(false),
  projectId: z.number().optional(),
});

export type TaskSchema = z.infer<typeof taskSchema>;


export const loginSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email format"),
  password: z.string().min(1, "Password is required"),
});

export type LoginSchema = z.infer<typeof loginSchema>;
