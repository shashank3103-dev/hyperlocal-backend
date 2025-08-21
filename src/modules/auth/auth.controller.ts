import { Request, Response } from 'express';
import * as svc from './auth.service.js';
import { ok } from '../../utils/http.js';

export const registerCtrl = async (req: Request, res: Response) => {
  const data = await svc.register(req.body);
  res.status(201).json(ok(data));
};

export const loginCtrl = async (req: Request, res: Response) => {
  const data = await svc.login(req.body);
  res.json(ok(data));
};

export const meCtrl = async (req: any, res: Response) => {
  const data = await svc.me(req.user.sub);
  res.json(ok(data));
};
