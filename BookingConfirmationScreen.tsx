import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  Box, 
  Typography, 
  Button, 
  Container, 
  Grid, 
  Paper,
  Card,
  CardContent,
  IconButton,
  AppBar,
  Toolbar,
  TextField,
  CircularProgress,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Divider,
  Switch
} from '@mui/material';
import { 
  ArrowBack as ArrowBackIcon,
  CalendarMonth as CalendarIcon,
  AccessTime as TimeIcon,
  Notes as NotesIcon
} from '@mui/icons-material';
import { useAuthStore, useProviderStore, useBookingStore } from '../lib/store';
import { Address, ServiceType } from '../lib/types';

const BookingConfirmationScreen: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuthStore();
  const { selectedProvider } = useProviderStore();
  const { createBooking, isLoading, error } = useBookingStore();
  
  const providerId = location.state?.providerId;
  const address = location.state?.address as Address;
  
  const [bookingType, setBookingType] = React.useState('immediate');
  const [scheduledDate, setScheduledDate] = React.useState('');
  const [scheduledTime, setScheduledTime] = React.useState('');
  const [notes, setNotes] = React.useState('');
  
  React.useEffect(() => {
    if (!providerId || !selectedProvider || !address) {
      navigate('/home');
    }
  }, [providerId, selectedProvider, address, navigate]);
  
  const handleBookingTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setBookingType(event.target.value);
  };
  
  const calculatePrice = () => {
    if (!selectedProvider) return 0;
    
    let price = selectedProvider.pricing.basePrice;
    
    // Add distance price (simplified calculation)
    if (selectedProvider.pricing.pricePerKm) {
      // Assume 5km distance for demo
      price += selectedProvider.pricing.pricePerKm * 5;
    }
    
    return price;
  };
  
  const handleConfirmBooking = async () => {
    if (!selectedProvider || !user) return;
    
    let scheduledDateTime: Date | undefined;
    
    if (bookingType === 'scheduled' && scheduledDate && scheduledTime) {
      scheduledDateTime = new Date(`${scheduledDate}T${scheduledTime}`);
    }
    
    const success = await createBooking({
      userId: user.id,
      providerId: selectedProvider.id,
      serviceType: selectedProvider.serviceType,
      location: address,
      amount: calculatePrice(),
      currency: selectedProvider.pricing.currency,
      scheduledTime: scheduledDateTime,
      notes: notes.trim() || undefined
    });
    
    if (success) {
      navigate('/booking-success');
    }
  };
  
  if (!selectedProvider) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }
  
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
            onClick={() => navigate(-1)}
          >
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Confirm Booking
          </Typography>
        </Toolbar>
      </AppBar>
      
      <Container maxWidth="sm" sx={{ mt: 4, mb: 8 }}>
        <Paper 
          sx={{ 
            p: 3, 
            borderRadius: 2,
            boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
            mb: 3
          }}
        >
          <Typography variant="h5" gutterBottom>
            Booking Details
          </Typography>
          
          <Box sx={{ mt: 3 }}>
            <Typography variant="subtitle2" color="text.secondary">
              Service Provider
            </Typography>
            <Typography variant="body1" gutterBottom>
              {selectedProvider.name}
            </Typography>
            
            <Typography variant="subtitle2" color="text.secondary" sx={{ mt: 2 }}>
              Service Type
            </Typography>
            <Typography variant="body1" gutterBottom>
              {selectedProvider.serviceType.charAt(0).toUpperCase() + selectedProvider.serviceType.slice(1)}
            </Typography>
            
            <Typography variant="subtitle2" color="text.secondary" sx={{ mt: 2 }}>
              Location
            </Typography>
            <Typography variant="body1" gutterBottom>
              {address.formattedAddress}
            </Typography>
          </Box>
          
          <Divider sx={{ my: 3 }} />
          
          <Typography variant="h6" gutterBottom>
            When do you need this service?
          </Typography>
          
          <FormControl component="fieldset" sx={{ width: '100%', mt: 2 }}>
            <RadioGroup
              aria-label="booking-type"
              name="booking-type"
              value={bookingType}
              onChange={handleBookingTypeChange}
            >
              <Paper 
                sx={{ 
                  p: 2, 
                  mb: 2, 
                  borderRadius: 2, 
                  border: '1px solid',
                  borderColor: bookingType === 'immediate' ? 'primary.main' : 'divider',
                  bgcolor: bookingType === 'immediate' ? 'primary.light' : 'background.paper',
                  opacity: bookingType === 'immediate' ? 1 : 0.8,
                  transition: 'all 0.2s'
                }}
              >
                <FormControlLabel 
                  value="immediate" 
                  control={<Radio />} 
                  label={
                    <Box sx={{ ml: 1 }}>
                      <Typography variant="subtitle1">As soon as possible</Typography>
                      <Typography variant="body2" color="text.secondary">
                        Provider will be notified immediately
                      </Typography>
                    </Box>
                  }
                  sx={{ width: '100%' }}
                />
              </Paper>
              
              <Paper 
                sx={{ 
                  p: 2, 
                  borderRadius: 2, 
                  border: '1px solid',
                  borderColor: bookingType === 'scheduled' ? 'primary.main' : 'divider',
                  bgcolor: bookingType === 'scheduled' ? 'primary.light' : 'background.paper',
                  opacity: bookingType === 'scheduled' ? 1 : 0.8,
                  transition: 'all 0.2s'
                }}
              >
                <FormControlLabel 
                  value="scheduled" 
                  control={<Radio />} 
                  label={
                    <Box sx={{ ml: 1, width: '100%' }}>
                      <Typography variant="subtitle1">Schedule for later</Typography>
                      <Grid container spacing={2} sx={{ mt: 1 }}>
                        <Grid item xs={6}>
                          <TextField
                            fullWidth
                            type="date"
                            label="Date"
                            InputLabelProps={{ shrink: true }}
                            value={scheduledDate}
                            onChange={(e) => setScheduledDate(e.target.value)}
                            disabled={bookingType !== 'scheduled'}
                            size="small"
                          />
                        </Grid>
                        <Grid item xs={6}>
                          <TextField
                            fullWidth
                            type="time"
                            label="Time"
                            InputLabelProps={{ shrink: true }}
                            value={scheduledTime}
                            onChange={(e) => setScheduledTime(e.target.value)}
                            disabled={bookingType !== 'scheduled'}
                            size="small"
                          />
                        </Grid>
                      </Grid>
                    </Box>
                  }
                  sx={{ width: '100%', alignItems: 'flex-start' }}
                />
              </Paper>
            </RadioGroup>
          </FormControl>
          
          <Box sx={{ mt: 3 }}>
            <Typography variant="subtitle1" gutterBottom>
              Additional Notes (Optional)
            </Typography>
            <TextField
              fullWidth
              multiline
              rows={3}
              placeholder="Add any special instructions or requirements..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </Box>
        </Paper>
        
        <Paper 
          sx={{ 
            p: 3, 
            borderRadius: 2,
            boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
            mb: 3
          }}
        >
          <Typography variant="h5" gutterBottom>
            Price Summary
          </Typography>
          
          <Box sx={{ mt: 2 }}>
            <Grid container justifyContent="space-between" sx={{ mb: 1 }}>
              <Grid item>
                <Typography variant="body1">Base Price</Typography>
              </Grid>
              <Grid item>
                <Typography variant="body1">
                  {selectedProvider.pricing.basePrice} {selectedProvider.pricing.currency}
                </Typography>
              </Grid>
            </Grid>
            
            {selectedProvider.pricing.pricePerKm && (
              <Grid container justifyContent="space-between" sx={{ mb: 1 }}>
                <Grid item>
                  <Typography variant="body1">Distance (est. 5 km)</Typography>
                </Grid>
                <Grid item>
                  <Typography variant="body1">
                    {selectedProvider.pricing.pricePerKm * 5} {selectedProvider.pricing.currency}
                  </Typography>
                </Grid>
              </Grid>
            )}
            
            <Divider sx={{ my: 2 }} />
            
            <Grid container justifyContent="space-between">
              <Grid item>
                <Typography variant="h6">Total</Typography>
              </Grid>
              <Grid item>
                <Typography variant="h6" color="primary.main">
                  {calculatePrice()} {selectedProvider.pricing.currency}
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </Paper>
        
        {error && (
          <Box sx={{ mb: 3, p: 2, bgcolor: 'error.light', borderRadius: 1 }}>
            <Typography color="error">{error}</Typography>
          </Box>
        )}
        
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Button
            variant="outlined"
            onClick={() => navigate(-1)}
            sx={{ px: 3 }}
          >
            Back
          </Button>
          <Button
            variant="contained"
            onClick={handleConfirmBooking}
            disabled={isLoading || (bookingType === 'scheduled' && (!scheduledDate || !scheduledTime))}
            sx={{ px: 4 }}
          >
            {isLoading ? <CircularProgress size={24} /> : 'Confirm Booking'}
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default BookingConfirmationScreen;
