import express from 'express';
import { currentUser } from '@ps_tickets/common';
const router = express.Router();

router.get('/api/users/currentUser', currentUser, (req, res) => {
  // !(!req.session || !req.session.jwt) {

  res.send({ currentUser: req.currentUser || null });
});

export { router as currentUserRouter };
