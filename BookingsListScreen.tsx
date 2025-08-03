import React from 'react';
import { useNavigate } from 'react-router-dom';
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
  ListItemText,
  Tabs,
  Tab,
  Avatar
} from '@mui/material';
import { 
  ArrowBack as ArrowBackIcon,
  LocalGasStation as GasIcon,
  WaterDrop as WaterIcon,
  CleaningServices as SewageIcon,
  LocalShipping as MovingIcon,
  History as HistoryIcon
} from '@mui/icons-material';
import { useBookingStore } from '../lib/store';
import { BookingStatus, ServiceType } from '../lib/types';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`bookings-tabpanel-${index}`}
      aria-labelledby={`bookings-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ py: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

const BookingsListScreen: React.FC = () => {
  const navigate = useNavigate();
  const { bookings, fetchBookings, selectBooking, isLoading, error } = useBookingStore();
  const [tabValue, setTabValue] = React.useState(0);
  
  React.useEffect(() => {
    fetchBookings();
  }, [fetchBookings]);
  
  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };
  
  const getServiceIcon = (serviceType: ServiceType) => {
    switch (serviceType) {
      case ServiceType.GAS:
        return <GasIcon fontSize="medium" />;
      case ServiceType.WATER:
        return <WaterIcon fontSize="medium" />;
      case ServiceType.SEWAGE:
        return <SewageIcon fontSize="medium" />;
      case ServiceType.MOVING:
        return <MovingIcon fontSize="medium" />;
      default:
        return <GasIcon fontSize="medium" />;
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
  
  const handleBookingClick = (bookingId: string) => {
    selectBooking(bookingId);
    navigate(`/booking/${bookingId}`);
  };
  
  const activeBookings = bookings.filter(
    booking => booking.status === BookingStatus.PENDING || 
               booking.status === BookingStatus.ACCEPTED || 
               booking.status === BookingStatus.IN_PROGRESS
  );
  
  const completedBookings = bookings.filter(
    booking => booking.status === BookingStatus.COMPLETED
  );
  
  const cancelledBookings = bookings.filter(
    booking => booking.status === BookingStatus.CANCELLED
  );
  
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
            My Bookings
          </Typography>
        </Toolbar>
      </AppBar>
      
      <Container maxWidth="md" sx={{ mt: 4, mb: 8 }}>
        <Paper 
          sx={{ 
            borderRadius: 2,
            boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
          }}
        >
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs 
              value={tabValue} 
              onChange={handleTabChange} 
              variant="fullWidth"
              textColor="primary"
              indicatorColor="primary"
            >
              <Tab label="Active" />
              <Tab label="Completed" />
              <Tab label="Cancelled" />
            </Tabs>
          </Box>
          
          {isLoading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', my: 8 }}>
              <CircularProgress />
            </Box>
          ) : error ? (
            <Box sx={{ p: 3, textAlign: 'center' }}>
              <Typography color="error">{error}</Typography>
            </Box>
          ) : (
            <>
              <TabPanel value={tabValue} index={0}>
                {activeBookings.length > 0 ? (
                  <Grid container spacing={2}>
                    {activeBookings.map((booking) => (
                      <Grid item xs={12} key={booking.id}>
                        <Card 
                          sx={{ 
                            borderRadius: 2,
                            boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
                            cursor: 'pointer',
                            '&:hover': {
                              boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                            },
                          }}
                          onClick={() => handleBookingClick(booking.id)}
                        >
                          <CardContent>
                            <Grid container spacing={2} alignItems="center">
                              <Grid item>
                                <Avatar 
                                  sx={{ 
                                    bgcolor: getServiceColor(booking.serviceType),
                                    width: 50, 
                                    height: 50 
                                  }}
                                >
                                  {getServiceIcon(booking.serviceType)}
                                </Avatar>
                              </Grid>
                              <Grid item xs>
                                <Typography variant="h6">
                                  {booking.serviceType.charAt(0).toUpperCase() + booking.serviceType.slice(1)} Service
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                  {new Date(booking.createdAt).toLocaleDateString()} • {booking.location.formattedAddress}
                                </Typography>
                              </Grid>
                              <Grid item>
                                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                                  <Chip 
                                    label={booking.status.toUpperCase().replace('_', ' ')} 
                                    color={getStatusColor(booking.status)}
                                    size="small"
                                    sx={{ mb: 1 }}
                                  />
                                  <Typography variant="subtitle1" fontWeight="bold">
                                    {booking.amount} {booking.currency}
                                  </Typography>
                                </Box>
                              </Grid>
                            </Grid>
                          </CardContent>
                        </Card>
                      </Grid>
                    ))}
                  </Grid>
                ) : (
                  <Box sx={{ p: 3, textAlign: 'center' }}>
                    <Typography variant="body1" color="text.secondary">
                      No active bookings found.
                    </Typography>
                  </Box>
                )}
              </TabPanel>
              
              <TabPanel value={tabValue} index={1}>
                {completedBookings.length > 0 ? (
                  <Grid container spacing={2}>
                    {completedBookings.map((booking) => (
                      <Grid item xs={12} key={booking.id}>
                        <Card 
                          sx={{ 
                            borderRadius: 2,
                            boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
                            cursor: 'pointer',
                            '&:hover': {
                              boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                            },
                          }}
                          onClick={() => handleBookingClick(booking.id)}
                        >
                          <CardContent>
                            <Grid container spacing={2} alignItems="center">
                              <Grid item>
                                <Avatar 
                                  sx={{ 
                                    bgcolor: getServiceColor(booking.serviceType),
                                    width: 50, 
                                    height: 50 
                                  }}
                                >
                                  {getServiceIcon(booking.serviceType)}
                                </Avatar>
                              </Grid>
                              <Grid item xs>
                                <Typography variant="h6">
                                  {booking.serviceType.charAt(0).toUpperCase() + booking.serviceType.slice(1)} Service
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                  {new Date(booking.createdAt).toLocaleDateString()} • {booking.location.formattedAddress}
                                </Typography>
                              </Grid>
                              <Grid item>
                                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                                  <Chip 
                                    label={booking.status.toUpperCase().replace('_', ' ')} 
                                    color={getStatusColor(booking.status)}
                                    size="small"
                                    sx={{ mb: 1 }}
                                  />
                                  <Typography variant="subtitle1" fontWeight="bold">
                                    {booking.amount} {booking.currency}
                                  </Typography>
                                </Box>
                              </Grid>
                            </Grid>
                          </CardContent>
                        </Card>
                      </Grid>
                    ))}
                  </Grid>
                ) : (
                  <Box sx={{ p: 3, textAlign: 'center' }}>
                    <Typography variant="body1" color="text.secondary">
                      No completed bookings found.
                    </Typography>
                  </Box>
                )}
              </TabPanel>
              
              <TabPanel value={tabValue} index={2}>
                {cancelledBookings.length > 0 ? (
                  <Grid container spacing={2}>
                    {cancelledBookings.map((booking) => (
                      <Grid item xs={12} key={booking.id}>
                        <Card 
                          sx={{ 
                            borderRadius: 2,
                            boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
                            cursor: 'pointer',
                            '&:hover': {
                              boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                            },
                          }}
                          onClick={() => handleBookingClick(booking.id)}
                        >
                          <CardContent>
                            <Grid container spacing={2} alignItems="center">
                              <Grid item>
                                <Avatar 
                                  sx={{ 
                                    bgcolor: getServiceColor(booking.serviceType),
                                    width: 50, 
                                    height: 50 
                                  }}
                                >
                                  {getServiceIcon(booking.serviceType)}
                                </Avatar>
                              </Grid>
                              <Grid item xs>
                                <Typography variant="h6">
                                  {booking.serviceType.charAt(0).toUpperCase() + booking.serviceType.slice(1)} Service
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                  {new Date(booking.createdAt).toLocaleDateString()} • {booking.location.formattedAddress}
                                </Typography>
                              </Grid>
                              <Grid item>
                                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                                  <Chip 
                                    label={booking.status.toUpperCase().replace('_', ' ')} 
                                    color={getStatusColor(booking.status)}
                                    size="small"
                                    sx={{ mb: 1 }}
                                  />
                                  <Typography variant="subtitle1" fontWeight="bold">
                                    {booking.amount} {booking.currency}
                                  </Typography>
                                </Box>
                              </Grid>
                            </Grid>
                          </CardContent>
                        </Card>
                      </Grid>
                    ))}
                  </Grid>
                ) : (
                  <Box sx={{ p: 3, textAlign: 'center' }}>
                    <Typography variant="body1" color="text.secondary">
                      No cancelled bookings found.
                    </Typography>
                  </Box>
                )}
              </TabPanel>
            </>
          )}
        </Paper>
      </Container>
    </Box>
  );
};

export default BookingsListScreen;
