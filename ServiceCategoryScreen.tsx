import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Box, 
  Typography, 
  Container, 
  Paper,
  Card,
  CardContent,
  CardActionArea,
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
  LocalShipping as MovingIcon,
  LocationOn as LocationIcon
} from '@mui/icons-material';
import { useProviderStore } from '../lib/store';
import { ServiceType } from '../lib/types';

const ServiceCategoryScreen: React.FC = () => {
  const { type } = useParams<{ type: string }>();
  const navigate = useNavigate();
  const { fetchProviders, providers, isLoading, error, selectProvider } = useProviderStore();
  
  React.useEffect(() => {
    if (type && Object.values(ServiceType).includes(type as ServiceType)) {
      fetchProviders(type as ServiceType);
    }
  }, [type, fetchProviders]);
  
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
  
  const handleProviderSelect = (providerId: string) => {
    selectProvider(providerId);
    navigate(`/provider/${providerId}`);
  };
  
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
            {type && getServiceTitle(type as ServiceType)}
          </Typography>
        </Toolbar>
      </AppBar>
      
      <Container maxWidth="md" sx={{ mt: 4, mb: 8 }}>
        <Box sx={{ mb: 4, display: 'flex', alignItems: 'center', gap: 2 }}>
          <Avatar sx={{ bgcolor: type && getServiceColor(type as ServiceType), width: 56, height: 56 }}>
            {type && getServiceIcon(type as ServiceType)}
          </Avatar>
          <Box>
            <Typography variant="h4" component="h1" gutterBottom>
              {type && getServiceTitle(type as ServiceType)}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Find and book reliable service providers in your area
            </Typography>
          </Box>
        </Box>
        
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
        ) : providers.length > 0 ? (
          <Stack spacing={3}>
            {providers.map((provider) => (
              <Card 
                key={provider.id}
                sx={{ 
                  borderRadius: 2,
                  boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                  overflow: 'hidden'
                }}
              >
                <CardActionArea onClick={() => handleProviderSelect(provider.id)}>
                  <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' } }}>
                    <Box 
                      sx={{ 
                        width: { xs: '100%', sm: '33%' },
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center',
                        bgcolor: getServiceColor(provider.serviceType),
                        p: 3
                      }}
                    >
                      <Avatar 
                        sx={{ 
                          bgcolor: 'white', 
                          color: getServiceColor(provider.serviceType),
                          width: 80, 
                          height: 80 
                        }}
                      >
                        {getServiceIcon(provider.serviceType)}
                      </Avatar>
                    </Box>
                    <Box sx={{ width: { xs: '100%', sm: '67%' } }}>
                      <CardContent>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                          <Typography variant="h5" component="div" gutterBottom>
                            {provider.name}
                          </Typography>
                          <Chip 
                            label={provider.isAvailable ? 'Available' : 'Unavailable'} 
                            color={provider.isAvailable ? 'success' : 'error'} 
                            size="small"
                          />
                        </Box>
                        
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                          <Rating 
                            value={provider.rating} 
                            precision={0.5} 
                            readOnly 
                            size="small"
                          />
                          <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                            ({provider.totalRatings} ratings)
                          </Typography>
                        </Box>
                        
                        <Typography variant="body2" color="text.secondary" gutterBottom>
                          {provider.description}
                        </Typography>
                        
                        <Divider sx={{ my: 1.5 }} />
                        
                        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 2 }}>
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <LocationIcon fontSize="small" color="action" sx={{ mr: 1 }} />
                            <Typography variant="body2">
                              Coverage: {provider.coverageArea.radiusKm} km radius
                            </Typography>
                          </Box>
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Typography variant="body2" fontWeight="bold">
                              Base Price: {provider.pricing.basePrice} {provider.pricing.currency}
                            </Typography>
                          </Box>
                        </Box>
                      </CardContent>
                    </Box>
                  </Box>
                </CardActionArea>
              </Card>
            ))}
          </Stack>
        ) : (
          <Paper 
            sx={{ 
              p: 3, 
              textAlign: 'center',
              borderRadius: 2,
              bgcolor: 'background.default'
            }}
          >
            <Typography variant="body1" color="text.secondary">
              No service providers found for this category.
            </Typography>
          </Paper>
        )}
      </Container>
    </Box>
  );
};

export default ServiceCategoryScreen;
