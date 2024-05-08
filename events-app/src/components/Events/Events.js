import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import {
  Typography,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Button,
  Grid,
  Divider,
  ThemeProvider,
  createTheme,
  styled,

  Box
} from '@mui/material';
import { Event as EventIcon, CalendarToday, StarBorder, InfoOutlined, DateRange } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { getAllevents } from '../../api-helpers/api-helpers';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { cssTransition, toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#0d47a1',
    },
    secondary: {
      main: '#ff6f00',
    },
    background: {
      default: '#121212',
      paper: '#222222',
    },
    text: {
      primary: '#ffffff',
      secondary: '#b3b3b3',
    },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          background: 'rgba(0,0,0,0.5)', 
          backdropFilter: 'blur(10px)', 
          border: '1px solid rgba(255, 255, 255, 0.2)', 
          transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
          '&:hover': {
            transform: 'scale(1.03)', 
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.5)' 
          },
          position: 'relative', 
          overflow: 'hidden' 
        }
      }
    },
    MuiCardContent: {
      styleOverrides: {
        root: {
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          backgroundColor: 'rgba(0,0,0,0.6)', 
          color: '#fff', 
          padding: '16px'
        }
      }
    }
  }
});
const GlowCard = styled(Card)({
  background: 'rgba(0,0,0,0.5)', 
  backdropFilter: 'blur(10px)', 
  border: '1px solid rgba(255, 255, 255, 0.2)', 
  transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
  '&:hover': {
    transform: 'scale(1.05)',
    boxShadow: '0 4px 20px rgba(255, 255, 255, 0.75)'
  },
  position: 'relative',
  overflow: 'hidden',
  margin: '1rem',
  borderRadius: '20px' 
});

const Events = () => {
  const [events, setEvents] = useState([]);
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const navigate = useNavigate();

  useEffect(() => {
    let isMounted = true;  
  
    const fetchEvents = async () => {
      try {
        const { success, events } = await getAllevents();
        if (success && isMounted) { 
          setEvents(events);
        } else {
        }
      } catch (error) {
      }
    };
  
    fetchEvents();
  
    return () => {
      isMounted = false;  
    };
  }, []);

  const handleDateChange = (date) => {
    setSelectedDate(date);
    toast.info(`Date changed to ${dayjs(date).format('MMMM D, YYYY')}`);
  };

  const filteredEvents = events.filter((event) => {
    const eventDate = dayjs(event.eventDate);
    return (
      eventDate.date() === selectedDate.date() &&
      eventDate.month() === selectedDate.month() &&
      eventDate.year() === selectedDate.year()
    );
  });

  const placeholderImageUrl = 'https://via.placeholder.com/200';

  return (
    <ThemeProvider theme={darkTheme}>
      <div style={{ padding: 20 }}>
        <ToastContainer transition={cssTransition} />
        <Typography variant="h4" gutterBottom color="primary">
          Featured Events <EventIcon />
        </Typography>
        <Grid container spacing={2}>
          {events.filter(event => event.featured).map(event => (
            <Grid item xs={12} sm={6} md={4} key={event._id}>
              <GlowCard raised>
              <CardActionArea onClick={() => navigate(`/event/${event._id}`)}>
                  <CardMedia
                    component="img"
                    height="200"
                    image={event.posterUrl ? `http://localhost:5000/uploads/${event.posterUrl}` : placeholderImageUrl}
                    alt={event.title}
                    onError={(e) => { e.target.src = placeholderImageUrl; }}
                    sx={{ objectFit: 'cover' }}
                  />
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      {event.title} <StarBorder color="warning" />
                    </Typography>
                    <Typography variant="body2" paragraph>
                      {event.actors.join(', ')}
                    </Typography>
                    <Typography variant="caption">
                      <CalendarToday /> {dayjs(event.eventDate).format('MMMM D, YYYY')}
                    </Typography>
                  </CardContent>
                </CardActionArea>
                <Button
                  variant="contained"
                  color="secondary"
                  fullWidth
                  onClick={() => navigate(`/event/${event._id}`)}
                >
Get Your Ticket Now!                </Button>
</GlowCard>
            </Grid>
          ))}
        </Grid>
        <Divider sx={{ my: 4, backgroundColor: 'rgba(255, 255, 255, 0.12)' }} />
        <Typography variant="h4" color="primary" gutterBottom>
          All Events <DateRange />
        </Typography>
        <Box sx={{ maxWidth: 320, mx: 'auto', my: 2, p: 3, backgroundColor: 'background.paper', borderRadius: 2 }}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateCalendar
              value={selectedDate}
              onChange={handleDateChange}
              renderInput={() => null}
            />
          </LocalizationProvider>

          </Box>
        {filteredEvents.length > 0 ? filteredEvents.map(event => (
          <Card key={event._id} raised sx={{
            maxWidth: 280,
            my: 2,
            boxShadow: '0 0 8px 2px rgba(25, 118, 210, 0.5)',
            transition: 'box-shadow 0.3s ease-in-out', 
            ':hover': {
              boxShadow: '0 0 16px 4px rgba(25, 118, 210, 0.75)' 
            },
            borderRadius: '16px' 
          }}>
            <CardActionArea onClick={() => navigate(`/event/${event._id}`)}> 
              <CardMedia
                component="img"
                height="140" 
                image={event.posterUrl ? `http://localhost:5000/uploads/${event.posterUrl}` : placeholderImageUrl}
                alt={event.title}
                onError={(e) => { e.target.src = placeholderImageUrl; }}
                sx={{ objectFit: 'cover', borderRadius: '16px 16px 0 0' }} 
              />
              <CardContent sx={{ padding: '16px' }}>
                <Typography variant="h6" component="div" gutterBottom>
                  {event.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  {event.actors.join(', ')}
                </Typography>
                <Typography variant="caption" display="block" gutterBottom>
                  <CalendarToday sx={{ verticalAlign: 'bottom', mr: 0.5 }} />
                  {dayjs(event.eventDate).format('MMMM D, YYYY')}
                </Typography>
              </CardContent>
            </CardActionArea>
            <Button
              variant="contained"
              color="secondary"
              fullWidth
              sx={{ borderRadius: '0 0 16px 16px' }} 
              onClick={() => navigate(`/event-detail/${event._id}`)}  
              >
Get Your Ticket Now!            </Button>
          </Card>
        )) : (
          <Typography variant="subtitle1" color="textSecondary" align="center" style={{ marginTop: 20 }}>
            <InfoOutlined /> No events on this day.
          </Typography>
        )}
      </div>
    </ThemeProvider>
  );
};

export default Events;
