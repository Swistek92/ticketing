import express from 'express';
import { currentUser } from '../middlewares/current-user';
const router = express.Router();

router.get('/api/users/crurentuser', currentUser, (req, res) => {
  // !(!req.session || !req.session.jwt) {

  res.send(req.currentUser || null);
});

export { router as currentUserRouter };
