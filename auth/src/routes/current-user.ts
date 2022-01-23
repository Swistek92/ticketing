import express from 'express';

const router = express.Router();

router.get('/api/user/crurentuser', (req, res) => {
  res.send('hi there');
});

export { router as currentUserRouter };
