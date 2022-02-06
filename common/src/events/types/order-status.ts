export enum OrderStatus {
  //when the order has been created but the
  // thicket it is try to order has not been reserved
  Created = 'created',
  //the ticket the order is trying to rovolve has allready
  // been reserved, or when the use has cancelled the order
  Cancelled = 'cancelled',

  //  the order has successfully reserved the ticket
  AwaitingPayment = 'awaiting:payment',

  //the order has reserved the thicket and the user has
  //  provided payment successfully
  Complete = 'complete',
}
