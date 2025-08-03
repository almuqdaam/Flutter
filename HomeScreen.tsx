import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Box, 
  Typography, 
  Container, 
  Paper,
  AppBar,
  Toolbar,
  IconButton,
  Stack
} from '@mui/material';
import { 
  Home as HomeIcon,
  LocalGasStation as GasIcon,
  WaterDrop as WaterIcon,
  CleaningServices as SewageIcon,
  LocalShipping as MovingIcon
} from '@mui/icons-material';
import { ServiceType } from '../lib/types';

const HomeScreen: React.FC = () => {
  const navigate = useNavigate();
  
  const handleServiceSelect = (serviceType: ServiceType) => {
    navigate(`/service/${serviceType}`);
  };
  
  const recentBookings: {id: string}[] = []; // This would come from a booking store
  
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Logis
          </Typography>
          <IconButton
            size="large"
            edge="end"
            color="inherit"
            aria-label="profile"
            onClick={() => navigate('/profile')}
          >
            <HomeIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      
      <Container maxWidth="md" sx={{ mt: 4, mb: 8 }}>
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Welcome to Logis
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Oman's Essential Services, One Tap Away
          </Typography>
        </Box>
        
        <Paper 
          sx={{ 
            p: 3, 
            borderRadius: 2,
            boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
            mb: 4
          }}
        >
          <Typography variant="h6" gutterBottom>
            What service do you need?
          </Typography>
          
          <Stack spacing={2} sx={{ mt: 3 }}>
            <Box 
              sx={{ 
                p: 2, 
                borderRadius: 2, 
                border: '1px solid',
                borderColor: 'divider',
                display: 'flex',
                alignItems: 'center',
                cursor: 'pointer',
                transition: 'all 0.2s ease-in-out',
                '&:hover': {
                  borderColor: 'primary.main',
                  bgcolor: 'action.hover'
                }
              }}
              onClick={() => handleServiceSelect(ServiceType.GAS)}
            >
              <Box 
                sx={{ 
                  width: 50, 
                  height: 50, 
                  borderRadius: '50%', 
                  bgcolor: 'primary.light',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  mr: 2
                }}
              >
                <GasIcon sx={{ color: 'primary.main' }} />
              </Box>
              <Box>
                <Typography variant="subtitle1" fontWeight="bold">
                  Gas Delivery
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Order LPG cylinders for home or business
                </Typography>
              </Box>
            </Box>
            
            <Box 
              sx={{ 
                p: 2, 
                borderRadius: 2, 
                border: '1px solid',
                borderColor: 'divider',
                display: 'flex',
                alignItems: 'center',
                cursor: 'pointer',
                transition: 'all 0.2s ease-in-out',
                '&:hover': {
                  borderColor: 'info.main',
                  bgcolor: 'action.hover'
                }
              }}
              onClick={() => handleServiceSelect(ServiceType.WATER)}
            >
              <Box 
                sx={{ 
                  width: 50, 
                  height: 50, 
                  borderRadius: '50%', 
                  bgcolor: 'info.light',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  mr: 2
                }}
              >
                <WaterIcon sx={{ color: 'info.main' }} />
              </Box>
              <Box>
                <Typography variant="subtitle1" fontWeight="bold">
                  Water Tanker
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Get water delivered to your location
                </Typography>
              </Box>
            </Box>
            
            <Box 
              sx={{ 
                p: 2, 
                borderRadius: 2, 
                border: '1px solid',
                borderColor: 'divider',
                display: 'flex',
                alignItems: 'center',
                cursor: 'pointer',
                transition: 'all 0.2s ease-in-out',
                '&:hover': {
                  borderColor: 'warning.main',
                  bgcolor: 'action.hover'
                }
              }}
              onClick={() => handleServiceSelect(ServiceType.SEWAGE)}
            >
              <Box 
                sx={{ 
                  width: 50, 
                  height: 50, 
                  borderRadius: '50%', 
                  bgcolor: 'warning.light',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  mr: 2
                }}
              >
                <SewageIcon sx={{ color: 'warning.main' }} />
              </Box>
              <Box>
                <Typography variant="subtitle1" fontWeight="bold">
                  Sewage Services
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Schedule sewage tank cleaning or maintenance
                </Typography>
              </Box>
            </Box>
            
            <Box 
              sx={{ 
                p: 2, 
                borderRadius: 2, 
                border: '1px solid',
                borderColor: 'divider',
                display: 'flex',
                alignItems: 'center',
                cursor: 'pointer',
                transition: 'all 0.2s ease-in-out',
                '&:hover': {
                  borderColor: 'secondary.main',
                  bgcolor: 'action.hover'
                }
              }}
              onClick={() => handleServiceSelect(ServiceType.MOVING)}
            >
              <Box 
                sx={{ 
                  width: 50, 
                  height: 50, 
                  borderRadius: '50%', 
                  bgcolor: 'secondary.light',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  mr: 2
                }}
              >
                <MovingIcon sx={{ color: 'secondary.main' }} />
              </Box>
              <Box>
                <Typography variant="subtitle1" fontWeight="bold">
                  Furniture Moving
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Get help with moving furniture or relocation
                </Typography>
              </Box>
            </Box>
          </Stack>
        </Paper>
        
        {recentBookings.length > 0 && (
          <Paper 
            sx={{ 
              p: 3, 
              borderRadius: 2,
              boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
            }}
          >
            <Typography variant="h6" gutterBottom>
              Recent Bookings
            </Typography>
            
            <Stack spacing={2} sx={{ mt: 2 }}>
              {recentBookings.map((booking) => (
                <Box 
                  key={booking.id}
                  sx={{ 
                    p: 2, 
                    borderRadius: 2, 
                    border: '1px solid',
                    borderColor: 'divider'
                  }}
                >
                  {/* Booking card content would go here */}
                </Box>
              ))}
            </Stack>
          </Paper>
        )}
      </Container>
    </Box>
  );
};

export default HomeScreen;
