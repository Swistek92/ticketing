import { Ticket } from '../ticket';

it('impelent optimistic cocurrency control', async (done) => {
  //create an instance of a ticket

  const ticket = Ticket.build({
    title: 'concert',
    price: 5,
    userId: '123',
  });

  //save the ticket to the database
  const firstInstance = await Ticket.findById(ticket.id);
  const secoundInstance = await Ticket.findById(ticket.id);

  //fetch the ticket twice
  firstInstance!.set({ price: 10 });
  secoundInstance!.set({ price: 15 });
  // make two spearate changes to the ticket we fetch

  await firstInstance!.save();

  //save the first fetched ticket

  try {
    await secoundInstance!.save();
  } catch (err) {
    return done();
  }
  throw new Error('sould not reach this point');
});

//  try {
//     await secondInstance!.save();
//   } catch (err) {
//     return;
it('increments the version number on multiple saves', async () => {
  const ticket = Ticket.build({
    title: 'concert',
    price: 20,
    userId: '6564',
  });

  await ticket.save();
  expect(ticket.version).toEqual(0);
  await ticket.save();
  expect(ticket.version).toEqual(1);
  await ticket.save();
  expect(ticket.version).toEqual(2);
});
