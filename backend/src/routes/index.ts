import express from 'express';

import AccessRoutes from './AccessRoutes';

const router = express.Router();

const PREFIX = '/api/v1';

router.get('/', (req, res) => {
  res
    .status(200)
    .send(
      '<h1>Movie List</h1><p>Hello! Welcome to the Movie List API!</p><br /><span> Node.js + Express + MongoDB</span>'
    );
});

router.use(PREFIX, AccessRoutes);

export default router;
