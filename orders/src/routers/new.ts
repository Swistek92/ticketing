import mongoose from 'mongoose';
import express, { Request, Response } from 'express';
import {
  BadRequestError,
  NotFoundError,
  OrderStatus,
  requireAuth,
  validateRequest,
} from '@ps_tickets/common';
import { body } from 'express-validator';
import { Ticket } from '../models/ticket';
import { Order } from '../models/order';
const router = express.Router();

const EXPIRATION_WINDOW_SECOUNDS = 15 * 60;

router.post(
  '/api/orders',
  requireAuth,
  [
    body('ticketId')
      .not()
      .isEmpty()
      .custom((input: string) => mongoose.Types.ObjectId.isValid(input))
      .withMessage('ticketid must be provided'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { ticketId } = req.body;
    // find the ticket the user is trying to order
    // in the db
    const ticket = await Ticket.findById(ticketId);
    if (!ticket) {
      throw new NotFoundError();
    }

    //make sure this ticket is not allready reserved
    //run query to look at all order. find an order where the ticket
    //is the ticket we found and the status is not cancelled.
    // if we  find order that means ticker is reserverd
    const isReserved = await ticket.isReserved();

    if (isReserved) {
      throw new BadRequestError('ticket is allready reserved');
    }
    //calculate an expiration date for this order

    const expiration = new Date();
    expiration.setSeconds(expiration.getSeconds() + EXPIRATION_WINDOW_SECOUNDS);

    //build the order and save it to the database
    const order = Order.build({
      userId: req.currentUser!.id,
      status: OrderStatus.Created,
      expiresAt: expiration,
      ticket: ticket,
    });
    await order.save();

    //publish an sevent saying that an order was created

    res.status(201).send(order);
  }
);
export { router as newOrderRouter };
