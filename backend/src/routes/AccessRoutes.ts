import express, { Request, Response } from 'express';

const router = express.Router();

router.post('/signup', (req: Request, res: Response) => {
  res.status(204).send();
});

router.post('/login', (req: Request, res: Response) => {
  res.status(204).send();
});

export default router;
