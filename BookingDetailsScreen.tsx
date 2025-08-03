import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
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
  Divider,
  Chip,
  CircularProgress,
  List,
  ListItem,
  ListItemIcon,
  ListItemText
} from '@mui/material';
import { 
  ArrowBack as ArrowBackIcon,
  LocalGasStation as GasIcon,
  WaterDrop as WaterIcon,
  CleaningServices as SewageIcon,
  LocalShipping as MovingIcon,
  Phone as PhoneIcon,
  Email as EmailIcon,
  LocationOn as LocationIcon,
  AccessTime as TimeIcon,
  EventNote as EventIcon,
  Cancel as CancelIcon
} from '@mui/icons-material';
import { useBookingStore, useProviderStore } from '../lib/store';
import { BookingStatus, ServiceType } from '../lib/types';

const BookingDetailsScreen: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { bookings, selectedBooking, selectBooking, cancelBooking, isLoading, error } = useBookingStore();
  const { providers, fetchProviders } = useProviderStore();
  
  React.useEffect(() => {
    if (id && (!selectedBooking || selectedBooking.id !== id)) {
      selectBooking(id);
    }
  }, [id, selectedBooking, selectBooking]);
  
  React.useEffect(() => {
    if (selectedBooking && providers.length === 0) {
      fetchProviders(selectedBooking.serviceType);
    }
  }, [selectedBooking, providers, fetchProviders]);
  
  const getServiceIcon = (serviceType: ServiceType) => {
    switch (serviceType) {
      case ServiceType.GAS:
        return <GasIcon fontSize="large" />;
      case ServiceType.WATER:
        return <WaterIcon fontSize="large" />;
      case ServiceType.SEWAGE:
        return <SewageIcon fontSize="large" />;
      case ServiceType.MOVING:
        return <MovingIcon fontSize="large" />;
      default:
        return <GasIcon fontSize="large" />;
    }
  };
  
  const getServiceColor = (serviceType: ServiceType) => {
    switch (serviceType) {
      case ServiceType.GAS:
        return 'primary.light';
      case ServiceType.WATER:
        return 'info.light';
      case ServiceType.SEWAGE:
        return 'warning.light';
      case ServiceType.MOVING:
        return 'secondary.light';
      default:
        return 'primary.light';
    }
  };
  
  const getStatusColor = (status: BookingStatus) => {
    switch (status) {
      case BookingStatus.PENDING:
        return 'warning';
      case BookingStatus.ACCEPTED:
        return 'info';
      case BookingStatus.IN_PROGRESS:
        return 'info';
      case BookingStatus.COMPLETED:
        return 'success';
      case BookingStatus.CANCELLED:
        return 'error';
      default:
        return 'default';
    }
  };
  
  const getStatusText = (status: BookingStatus) => {
    return status.toUpperCase().replace('_', ' ');
  };
  
  const getProvider = () => {
    if (!selectedBooking) return null;
    return providers.find(p => p.id === selectedBooking.providerId);
  };
  
  const handleCancelBooking = async () => {
    if (!selectedBooking) return;
    
    if (window.confirm('Are you sure you want to cancel this booking?')) {
      const success = await cancelBooking(selectedBooking.id);
      if (success) {
        // Refresh the booking
        selectBooking(selectedBooking.id);
      }
    }
  };
  
  if (!selectedBooking) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }
  
  const provider = getProvider();
  
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
            onClick={() => navigate('/bookings')}
          >
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Booking Details
          </Typography>
        </Toolbar>
      </AppBar>
      
      <Container maxWidth="md" sx={{ mt: 4, mb: 8 }}>
        <Paper 
          sx={{ 
            borderRadius: 2,
            boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
            overflow: 'hidden',
            mb: 4
          }}
        >
          <Box 
            sx={{ 
              bgcolor: getServiceColor(selectedBooking.serviceType),
              p: 3,
              display: 'flex',
              flexDirection: { xs: 'column', sm: 'row' },
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 2
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Avatar 
                sx={{ 
                  bgcolor: 'white', 
                  color: getServiceColor(selectedBooking.serviceType),
                  width: 60, 
                  height: 60 
                }}
              >
                {getServiceIcon(selectedBooking.serviceType)}
              </Avatar>
              <Box sx={{ color: 'white' }}>
                <Typography variant="h5" component="h1">
                  {selectedBooking.serviceType.charAt(0).toUpperCase() + selectedBooking.serviceType.slice(1)} Service
                </Typography>
                <Typography variant="body1">
                  Booking ID: {selectedBooking.id}
                </Typography>
              </Box>
            </Box>
            <Chip 
              label={getStatusText(selectedBooking.status)} 
              color={getStatusColor(selectedBooking.status)}
              sx={{ fontWeight: 'bold', fontSize: '0.9rem', py: 2, px: 1 }}
            />
          </Box>
          
          <CardContent>
            <Grid container spacing={4}>
              <Grid item xs={12} md={6}>
                <Typography variant="h6" gutterBottom>
                  Booking Information
                </Typography>
                
                <List>
                  <ListItem>
                    <ListItemIcon>
                      <EventIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText 
                      primary="Date" 
                      secondary={new Date(selectedBooking.createdAt).toLocaleDateString()} 
                    />
                  </ListItem>
                  
                  <ListItem>
                    <ListItemIcon>
                      <TimeIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText 
                      primary="Time" 
                      secondary={new Date(selectedBooking.createdAt).toLocaleTimeString()} 
                    />
                  </ListItem>
                  
                  {selectedBooking.scheduledTime && (
                    <ListItem>
                      <ListItemIcon>
                        <EventIcon color="primary" />
                      </ListItemIcon>
                      <ListItemText 
                        primary="Scheduled For" 
                        secondary={new Date(selectedBooking.scheduledTime).toLocaleString()} 
                      />
                    </ListItem>
                  )}
                  
                  <ListItem>
                    <ListItemIcon>
                      <LocationIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText 
                      primary="Location" 
                      secondary={selectedBooking.location.formattedAddress} 
                    />
                  </ListItem>
                  
                  {selectedBooking.notes && (
                    <ListItem>
                      <ListItemIcon>
                        <EventIcon color="primary" />
                      </ListItemIcon>
                      <ListItemText 
                        primary="Notes" 
                        secondary={selectedBooking.notes} 
                      />
                    </ListItem>
                  )}
                </List>
              </Grid>
              
              <Grid item xs={12} md={6}>
                <Typography variant="h6" gutterBottom>
                  Service Provider
                </Typography>
                
                {provider ? (
                  <List>
                    <ListItem>
                      <ListItemText 
                        primary="Name" 
                        secondary={provider.name} 
                      />
                    </ListItem>
                    
                    <ListItem>
                      <ListItemIcon>
                        <PhoneIcon color="primary" />
                      </ListItemIcon>
                      <ListItemText 
                        primary="Phone" 
                        secondary={provider.phone} 
                      />
                    </ListItem>
                    
                    <ListItem>
                      <ListItemIcon>
                        <EmailIcon color="primary" />
                      </ListItemIcon>
                      <ListItemText 
                        primary="Email" 
                        secondary={provider.email} 
                      />
                    </ListItem>
                  </List>
                ) : (
                  <Typography variant="body1" color="text.secondary">
                    Loading provider information...
                  </Typography>
                )}
                
                <Divider sx={{ my: 2 }} />
                
                <Typography variant="h6" gutterBottom>
                  Payment
                </Typography>
                
                <Box sx={{ p: 2, bgcolor: 'background.default', borderRadius: 2 }}>
                  <Grid container justifyContent="space-between">
                    <Grid item>
                      <Typography variant="body1">Total Amount</Typography>
                    </Grid>
                    <Grid item>
                      <Typography variant="h6" color="primary.main">
                        {selectedBooking.amount} {selectedBooking.currency}
                      </Typography>
                    </Grid>
                  </Grid>
                </Box>
              </Grid>
            </Grid>
            
            {selectedBooking.status === BookingStatus.PENDING && (
              <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
                <Button
                  variant="outlined"
                  color="error"
                  startIcon={<CancelIcon />}
                  onClick={handleCancelBooking}
                  disabled={isLoading}
                  sx={{ py: 1, px: 3 }}
                >
                  {isLoading ? <CircularProgress size={24} /> : 'Cancel Booking'}
                </Button>
              </Box>
            )}
            
            {error && (
              <Box sx={{ mt: 2, p: 2, bgcolor: 'error.light', borderRadius: 1 }}>
                <Typography color="error">{error}</Typography>
              </Box>
            )}
          </CardContent>
        </Paper>
        
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Button
            variant="contained"
            onClick={() => navigate('/home')}
            sx={{ py: 1.5, px: 4 }}
          >
            Back to Home
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default BookingDetailsScreen;
