import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Box, 
  Typography, 
  Button, 
  Container, 
  Paper,
  Avatar,
  Divider,
  Rating,
  Chip,
  IconButton,
  AppBar,
  Toolbar,
  CircularProgress,
  Stack
} from '@mui/material';
import { 
  ArrowBack as ArrowBackIcon,
  LocalGasStation as GasIcon,
  WaterDrop as WaterIcon,
  CleaningServices as SewageIcon,
  LocalShipping as MovingIcon
} from '@mui/icons-material';
import { useProviderStore } from '../lib/store';
import { ServiceType } from '../lib/types';

const ProviderDetailsScreen: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { selectedProvider, isLoading, error } = useProviderStore();
  
  const handleBookNow = () => {
    navigate('/location-selection');
  };
  
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
  
  const getServiceTitle = (serviceType: ServiceType) => {
    switch (serviceType) {
      case ServiceType.GAS:
        return 'Gas Delivery';
      case ServiceType.WATER:
        return 'Water Tanker';
      case ServiceType.SEWAGE:
        return 'Sewage Services';
      case ServiceType.MOVING:
        return 'Furniture Moving';
      default:
        return 'Service';
    }
  };
  
  if (!selectedProvider && !isLoading) {
    navigate('/home');
    return null;
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
            Provider Details
          </Typography>
        </Toolbar>
      </AppBar>
      
      <Container maxWidth="md" sx={{ mt: 4, mb: 8 }}>
        {isLoading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', my: 8 }}>
            <CircularProgress />
          </Box>
        ) : error ? (
          <Paper 
            sx={{ 
              p: 3, 
              textAlign: 'center',
              borderRadius: 2,
              bgcolor: 'error.light'
            }}
          >
            <Typography variant="body1" color="error">
              {error}
            </Typography>
          </Paper>
        ) : selectedProvider ? (
          <>
            <Paper 
              sx={{ 
                borderRadius: 2,
                boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                overflow: 'hidden',
                mb: 3
              }}
            >
              <Box 
                sx={{ 
                  bgcolor: getServiceColor(selectedProvider.serviceType),
                  p: 4,
                  display: 'flex',
                  flexDirection: { xs: 'column', sm: 'row' },
                  alignItems: 'center',
                  gap: 3
                }}
              >
                <Avatar 
                  sx={{ 
                    bgcolor: 'white', 
                    color: getServiceColor(selectedProvider.serviceType),
                    width: 100, 
                    height: 100 
                  }}
                >
                  {getServiceIcon(selectedProvider.serviceType)}
                </Avatar>
                <Box sx={{ color: 'white', textAlign: { xs: 'center', sm: 'left' } }}>
                  <Typography variant="h4" component="h1" gutterBottom>
                    {selectedProvider.name}
                  </Typography>
                  <Typography variant="h6" gutterBottom>
                    {getServiceTitle(selectedProvider.serviceType)}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: { xs: 'center', sm: 'flex-start' } }}>
                    <Rating 
                      value={selectedProvider.rating} 
                      precision={0.5} 
                      readOnly 
                      sx={{ color: 'white' }}
                    />
                    <Typography variant="body1" sx={{ ml: 1 }}>
                      ({selectedProvider.totalRatings} ratings)
                    </Typography>
                  </Box>
                </Box>
              </Box>
              
              <Box sx={{ p: 3 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                  <Typography variant="h6">
                    About Provider
                  </Typography>
                  <Chip 
                    label={selectedProvider.isAvailable ? 'Available' : 'Unavailable'} 
                    color={selectedProvider.isAvailable ? 'success' : 'error'} 
                  />
                </Box>
                
                <Typography variant="body1" paragraph>
                  {selectedProvider.description}
                </Typography>
                
                <Divider sx={{ my: 3 }} />
                
                <Typography variant="h6" gutterBottom>
                  Service Details
                </Typography>
                
                <Stack spacing={2}>
                  <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 2 }}>
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="subtitle2" color="text.secondary">
                        Coverage Area
                      </Typography>
                      <Typography variant="body1">
                        {selectedProvider.coverageArea.radiusKm} km radius
                      </Typography>
                    </Box>
                    
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="subtitle2" color="text.secondary">
                        Response Time
                      </Typography>
                      <Typography variant="body1">
                        {selectedProvider.responseTimeMinutes} minutes (average)
                      </Typography>
                    </Box>
                  </Box>
                  
                  <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 2 }}>
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="subtitle2" color="text.secondary">
                        Base Price
                      </Typography>
                      <Typography variant="body1" fontWeight="bold">
                        {selectedProvider.pricing.basePrice} {selectedProvider.pricing.currency}
                      </Typography>
                    </Box>
                    
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="subtitle2" color="text.secondary">
                        Price Per Kilometer
                      </Typography>
                      <Typography variant="body1">
                        {selectedProvider.pricing.pricePerKm} {selectedProvider.pricing.currency}/km
                      </Typography>
                    </Box>
                  </Box>
                </Stack>
              </Box>
            </Paper>
            
            <Button
              variant="contained"
              size="large"
              fullWidth
              disabled={!selectedProvider.isAvailable}
              onClick={handleBookNow}
              sx={{ py: 1.5 }}
            >
              Book Now
            </Button>
            
            {!selectedProvider.isAvailable && (
              <Typography variant="body2" color="error" sx={{ mt: 1, textAlign: 'center' }}>
                This provider is currently unavailable for booking
              </Typography>
            )}
          </>
        ) : null}
      </Container>
    </Box>
  );
};

export default ProviderDetailsScreen;
