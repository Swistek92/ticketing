// import axios from 'axios';
import Link from 'next/link';
const LandingPage = ({ currentUser, tickets }) => {
  console.log('tickets', tickets);
  console.log('user', currentUser);
  const ticketList = tickets.map((ticket) => {
    return (
      <tr key={ticket.id}>
        <td> {ticket.title}</td>
        <td> {ticket.price}</td>
        <td>
          <Link href='/tickets/[ticketId]' as={`/tickets/${ticket.id}`}>
            <a> View </a>
          </Link>
        </td>
      </tr>
    );
  });
  return (
    <div>
      <div class='jumbotron jumbotron-fluid'>
        <div class='container'>
          <h1 class='display-4'>Fluid jumbotron</h1>
          <p class='lead'>
            This is a modified jumbotron that occupies the entire horizontal
            space of its parent.
          </p>
        </div>
      </div>

      <h2> Tickets</h2>
      <table class='table table-dark ' className='table'>
        <thead>
          <tr>
            <th>Title</th>
            <th>Price</th>
            <th>Link</th>
          </tr>
        </thead>
        <tbody>{ticketList}</tbody>
      </table>
    </div>
  );
};

LandingPage.getInitialProps = async (context, client, currentUser) => {
  const { data } = await client.get('/api/tickets');

  return { tickets: data };
};
export default LandingPage;
