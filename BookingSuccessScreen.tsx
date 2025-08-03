import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Box, 
  Typography, 
  Button, 
  Container, 
  Paper,
  IconButton,
  AppBar,
  Toolbar,
  CircularProgress,
  CheckCircle as CheckCircleIcon
} from '@mui/material';
import { 
  ArrowBack as ArrowBackIcon,
  CheckCircle as CheckCircleIcon
} from '@mui/icons-material';
import { useBookingStore } from '../lib/store';

const BookingSuccessScreen: React.FC = () => {
  const navigate = useNavigate();
  const { selectedBooking } = useBookingStore();
  
  React.useEffect(() => {
    if (!selectedBooking) {
      navigate('/home');
    }
  }, [selectedBooking, navigate]);
  
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="back"
            sx={{ mr: 2 }}
            onClick={() => navigate('/home')}
          >
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Booking Confirmed
          </Typography>
        </Toolbar>
      </AppBar>
      
      <Container maxWidth="sm" sx={{ mt: 4, mb: 8 }}>
        <Paper 
          sx={{ 
            p: 4, 
            borderRadius: 2,
            boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
            textAlign: 'center'
          }}
        >
          <Box 
            sx={{ 
              width: 80, 
              height: 80, 
              borderRadius: '50%', 
              bgcolor: 'success.light',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto',
              mb: 3
            }}
          >
            <CheckCircleIcon sx={{ fontSize: 48, color: 'success.main' }} />
          </Box>
          
          <Typography variant="h4" gutterBottom>
            Booking Successful!
          </Typography>
          
          <Typography variant="body1" color="text.secondary" paragraph>
            Your booking has been confirmed. The service provider will be notified and will contact you shortly.
          </Typography>
          
          <Typography variant="body2" sx={{ mt: 3, mb: 1 }}>
            Booking ID: {selectedBooking?.id || 'N/A'}
          </Typography>
          
          <Typography variant="body2" sx={{ mb: 4 }}>
            Status: <span style={{ fontWeight: 'bold', color: '#ff7043' }}>PENDING</span>
          </Typography>
          
          <Box sx={{ mt: 4, display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Button
              variant="contained"
              onClick={() => navigate(`/booking/${selectedBooking?.id}`)}
              sx={{ py: 1.5 }}
            >
              View Booking Details
            </Button>
            
            <Button
              variant="outlined"
              onClick={() => navigate('/home')}
              sx={{ py: 1.5 }}
            >
              Back to Home
            </Button>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default BookingSuccessScreen;
