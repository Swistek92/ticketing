import express from 'express';

const router = express.Router();

router.post('/api/user/signin', (req, res) => {
  res.send('hi there');
});

export { router as signinRouter };
