import Joi from 'joi';
import { z } from 'zod';

export const loginSchema = Joi.object({
  username: Joi.string()
    .required()
    .trim()
    .messages({
      'string.empty': 'Username harus diisi',
      'any.required': 'Username harus diisi',
    }),
  password: Joi.string()
    .required()
    .min(6)
    .messages({
      'string.empty': 'Password harus diisi',
      'string.min': 'Password minimal 6 karakter',
      'any.required': 'Password harus diisi',
    }),
});

export const resetPasswordSchema = z.object({
  email: z.string().email(),
});
