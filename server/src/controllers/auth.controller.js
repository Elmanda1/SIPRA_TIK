import { registerSchema, loginSchema } from '../Validators/auth.schema.js';
import * as AuthService from '../services/auth.service.js';

export async function register(req, res) {
  try {
    const data = registerSchema.parse(req.body);
    const result = await AuthService.register(data);
    res.status(201).json(result);
  } catch (err) {
    if (err.name === 'ZodError') {
      return res.status(400).json({ message: 'Validation error', errors: err.errors });
    }
    res.status(500).json({ message: 'Server error', error: err.message });
  }
}

export async function login(req, res) {
  try {
    const data = loginSchema.parse(req.body);
    const result = await AuthService.login(data);
    res.status(200).json(result);
  } catch (err) {
    if (err.name === 'ZodError') {
      return res.status(400).json({ message: 'Validation error', errors: err.errors });
    }
    res.status(500).json({ message: 'Login failed', error: err.message });
  }
}
