import { z } from 'zod';

export const userSchema = z.object({
  username: z
    .string()
    .min(3, 'Username deve essere almeno di 3 caratteri')
    .max(50, 'Username non può superare i 50 caratteri'),
  email: z
    .string()
    .email('Email non valida')
    .endsWith('@cafasso.it', "L'email deve essere un dominio cafasso.it"),
  role: z.enum(['admin', 'manager', 'employee'], {
    required_error: 'Seleziona un ruolo',
  }),
  department: z
    .string()
    .min(1, 'Seleziona un dipartimento'),
  status: z.enum(['active', 'inactive'], {
    required_error: 'Seleziona uno stato',
  }),
  twoFactorEnabled: z.boolean().default(false),
  permissions: z.array(z.string()).default([]),
});

export type UserFormData = z.infer<typeof userSchema>;