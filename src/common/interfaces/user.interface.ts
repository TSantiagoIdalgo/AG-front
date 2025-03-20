import {z} from 'zod';

const emailMinLength = 3, maxLength = 20, passwordMinLength = 8, userMinLength = 3;

export const loginSchema = z.object({
  email: z.string()
    .min(emailMinLength, 'Email is required')
    .email('Invalid email'),
  password: z.string()
    .min(passwordMinLength, 'Password is required')
});

export type signInSchema = z.infer<typeof loginSchema>;

export const registerSchema = z.object({
  email: z.string()
    .min(emailMinLength, 'Email is required')
    .email('Invalid email'),
  password: z.string()
    .min(passwordMinLength, 'Password is required')
    .max(maxLength, 'Password is too long'),
  repeatPassword: z.string(),
  userName: z.string()
    .min(userMinLength, 'User name is required')
    .max(maxLength, 'User name is too long'),
}).refine((data) => data.password === data.repeatPassword, {
  message: 'Passwords do not match',
  path: ['repeatPassword']
});

export type TRegisterSchema = z.infer<typeof registerSchema>;