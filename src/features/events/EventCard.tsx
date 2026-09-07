import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import type { Event } from '../../api/types';

const formatDate = (iso: string): string =>
  new Date(iso).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' });

const availabilityLabel = (event: Event): string => {
  if (event.availableTickets.length === 0) return 'Sold out';
  const lowestPrice = Math.min(...event.availableTickets.map((ticket) => ticket.price));
  return `${event.availableTickets.length} tickets from $${lowestPrice}`;
};

interface EventCardProps {
  event: Event;
}

const EventCard = ({ event }: EventCardProps) => (
  <Card sx={{ height: '100%' }}>
    <CardContent>
      <Typography variant="h6">{event.name}</Typography>
      <Typography variant="body2" color="text.secondary">
        {formatDate(event.date)} · {event.location ?? 'Location unavailable'}
      </Typography>
      <Typography variant="body1" sx={{ mt: 1 }}>
        {event.description}
      </Typography>
      <Typography variant="body2" sx={{ mt: 1 }}>
        {availabilityLabel(event)}
      </Typography>
    </CardContent>
  </Card>
);

export default EventCard;
