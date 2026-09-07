import Grid from '@mui/material/Grid';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import { useGetEventsQuery } from '../../api/api';
import EventCard from './EventCard';

const EventsList = () => {
  const { data, isLoading, isError } = useGetEventsQuery();

  if (isLoading) return <CircularProgress />;
  if (isError || !data) return <Alert severity="error">Failed to load events</Alert>;

  return (
    <Grid container spacing={2}>
      {data.map((event) => (
        <Grid item xs={12} sm={6} md={4} key={event.id} sx={{ display: 'flex' }}>
          <EventCard event={event} />
        </Grid>
      ))}
    </Grid>
  );
};

export default EventsList;
