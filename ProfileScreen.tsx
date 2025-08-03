import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Box, 
  Typography, 
  Container, 
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Avatar,
  AppBar,
  Toolbar,
  IconButton,
  Stack
} from '@mui/material';
import { 
  ArrowBack as ArrowBackIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  LocationOn as LocationIcon,
  Edit as EditIcon
} from '@mui/icons-material';
import { useAuthStore } from '../lib/store';

const ProfileScreen: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  
  const handleEditProfile = () => {
    navigate('/edit-profile');
  };
  
  if (!user) {
    navigate('/login');
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
            onClick={() => navigate('/home')}
          >
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            My Profile
          </Typography>
        </Toolbar>
      </AppBar>
      
      <Container maxWidth="md" sx={{ mt: 4, mb: 8 }}>
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
              bgcolor: 'primary.main',
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
                color: 'primary.main',
                width: 100, 
                height: 100,
                fontSize: '3rem'
              }}
            >
              {user.name.charAt(0)}
            </Avatar>
            <Box sx={{ color: 'white', textAlign: { xs: 'center', sm: 'left' } }}>
              <Typography variant="h4" component="h1" gutterBottom>
                {user.name}
              </Typography>
              <Typography variant="body1">
                Member since {new Date().toLocaleDateString()}
              </Typography>
            </Box>
          </Box>
          
          <Box sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6">
                Personal Information
              </Typography>
              <Box
                component="button"
                onClick={handleEditProfile}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                  border: '1px solid',
                  borderColor: 'primary.main',
                  borderRadius: 1,
                  px: 2,
                  py: 1,
                  bgcolor: 'transparent',
                  color: 'primary.main',
                  cursor: 'pointer',
                  '&:hover': {
                    bgcolor: 'primary.light',
                    color: 'primary.dark'
                  }
                }}
              >
                <EditIcon fontSize="small" />
                <Typography variant="button">Edit Profile</Typography>
              </Box>
            </Box>
            
            <List>
              <ListItem>
                <ListItemIcon>
                  <EmailIcon color="primary" />
                </ListItemIcon>
                <ListItemText 
                  primary="Email" 
                  secondary={user.email}
                />
              </ListItem>
              
              <ListItem>
                <ListItemIcon>
                  <PhoneIcon color="primary" />
                </ListItemIcon>
                <ListItemText 
                  primary="Phone" 
                  secondary={user.phone}
                />
              </ListItem>
              
              <ListItem>
                <ListItemIcon>
                  <LocationIcon color="primary" />
                </ListItemIcon>
                <ListItemText 
                  primary="Address" 
                  secondary={`${user.address.city}, ${user.address.state}, ${user.address.country}`}
                />
              </ListItem>
            </List>
          </Box>
        </Paper>
        
        <Stack spacing={2}>
          <Box
            component="button"
            onClick={() => navigate('/bookings')}
            sx={{
              width: '100%',
              py: 1.5,
              bgcolor: 'primary.main',
              color: 'white',
              border: 'none',
              borderRadius: 1,
              fontSize: '1rem',
              fontWeight: 'bold',
              cursor: 'pointer',
              '&:hover': {
                bgcolor: 'primary.dark'
              }
            }}
          >
            My Bookings
          </Box>
          
          <Box
            component="button"
            onClick={() => navigate('/settings')}
            sx={{
              width: '100%',
              py: 1.5,
              bgcolor: 'transparent',
              color: 'text.primary',
              border: '1px solid',
              borderColor: 'divider',
              borderRadius: 1,
              fontSize: '1rem',
              cursor: 'pointer',
              '&:hover': {
                bgcolor: 'action.hover'
              }
            }}
          >
            Settings
          </Box>
          
          <Box
            component="button"
            onClick={() => {
              useAuthStore.getState().logout();
              navigate('/login');
            }}
            sx={{
              width: '100%',
              py: 1.5,
              bgcolor: 'transparent',
              color: 'error.main',
              border: '1px solid',
              borderColor: 'error.main',
              borderRadius: 1,
              fontSize: '1rem',
              cursor: 'pointer',
              '&:hover': {
                bgcolor: 'error.light',
                color: 'error.dark'
              }
            }}
          >
            Logout
          </Box>
        </Stack>
      </Container>
    </Box>
  );
};

export default ProfileScreen;
