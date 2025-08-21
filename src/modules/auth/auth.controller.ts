import { Request, Response, NextFunction } from 'express';
import * as svc from './auth.service.js';
import { ok } from '../../utils/http.js';

export const registerCtrl = async (req: Request, res: Response, next: NextFunction) => {
   try {
    const data = await svc.register(req.body);
    res.status(201).json(ok(data, "User registered successfully"));
  } catch (err) {
    next(err);
  }
};

export const loginCtrl = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await svc.login(req.body);
    res.status(200).json(ok(data, "Login successful"));
  } catch (err) {
    next(err);
  }
};


export const meCtrl = async (req: any, res: Response, next: NextFunction) => {
   try {
    const data = await svc.me(req.user.sub);
    res.status(200).json(ok(data, "User profile"));
  } catch (err) {
    next(err);
  }
};
