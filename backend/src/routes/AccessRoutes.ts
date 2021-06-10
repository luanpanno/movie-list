import express from 'express';

import { makeAccessController } from '../controllers/AccessController';

const router = express.Router();

router.post('/signup', makeAccessController().signup);

router.post('/login', makeAccessController().login);

export default router;
