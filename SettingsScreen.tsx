import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Box, 
  Typography, 
  Button, 
  Container, 
  Paper,
  Divider,
  Switch,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  AppBar,
  Toolbar,
  IconButton
} from '@mui/material';
import { 
  ArrowBack as ArrowBackIcon,
  Notifications as NotificationsIcon,
  Language as LanguageIcon,
  DarkMode as DarkModeIcon,
  Security as SecurityIcon,
  Help as HelpIcon,
  Info as InfoIcon,
  Logout as LogoutIcon
} from '@mui/icons-material';
import { useAuthStore } from '../lib/store';

const SettingsScreen: React.FC = () => {
  const navigate = useNavigate();
  const { logout } = useAuthStore();
  
  const [darkMode, setDarkMode] = React.useState(false);
  const [notifications, setNotifications] = React.useState(true);
  const [logoutDialogOpen, setLogoutDialogOpen] = React.useState(false);
  
  const handleDarkModeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDarkMode(event.target.checked);
  };
  
  const handleNotificationsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNotifications(event.target.checked);
  };
  
  const handleLogout = () => {
    logout();
    navigate('/login');
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
            Settings
          </Typography>
        </Toolbar>
      </AppBar>
      
      <Container maxWidth="sm" sx={{ mt: 4, mb: 8 }}>
        <Paper 
          sx={{ 
            borderRadius: 2,
            boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
            overflow: 'hidden',
            mb: 3
          }}
        >
          <List>
            <ListItem>
              <ListItemIcon>
                <DarkModeIcon color="primary" />
              </ListItemIcon>
              <ListItemText 
                primary="Dark Mode" 
                secondary="Switch between light and dark themes" 
              />
              <Switch
                edge="end"
                checked={darkMode}
                onChange={handleDarkModeChange}
              />
            </ListItem>
            
            <Divider variant="inset" component="li" />
            
            <ListItem>
              <ListItemIcon>
                <NotificationsIcon color="primary" />
              </ListItemIcon>
              <ListItemText 
                primary="Notifications" 
                secondary="Receive alerts about your bookings" 
              />
              <Switch
                edge="end"
                checked={notifications}
                onChange={handleNotificationsChange}
              />
            </ListItem>
            
            <Divider variant="inset" component="li" />
            
            <ListItemButton onClick={() => navigate('/profile')}>
              <ListItemIcon>
                <SecurityIcon color="primary" />
              </ListItemIcon>
              <ListItemText 
                primary="Account Settings" 
                secondary="Manage your profile and security" 
              />
            </ListItemButton>
            
            <Divider variant="inset" component="li" />
            
            <ListItemButton>
              <ListItemIcon>
                <LanguageIcon color="primary" />
              </ListItemIcon>
              <ListItemText 
                primary="Language" 
                secondary="English" 
              />
            </ListItemButton>
          </List>
        </Paper>
        
        <Paper 
          sx={{ 
            borderRadius: 2,
            boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
            overflow: 'hidden',
            mb: 3
          }}
        >
          <List>
            <ListItemButton>
              <ListItemIcon>
                <HelpIcon color="primary" />
              </ListItemIcon>
              <ListItemText 
                primary="Help & Support" 
                secondary="Get assistance with the app" 
              />
            </ListItemButton>
            
            <Divider variant="inset" component="li" />
            
            <ListItemButton>
              <ListItemIcon>
                <InfoIcon color="primary" />
              </ListItemIcon>
              <ListItemText 
                primary="About" 
                secondary="App version 1.0.0" 
              />
            </ListItemButton>
          </List>
        </Paper>
        
        <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
          <Button
            variant="outlined"
            color="error"
            startIcon={<LogoutIcon />}
            onClick={() => setLogoutDialogOpen(true)}
            sx={{ py: 1.5, px: 4 }}
          >
            Logout
          </Button>
        </Box>
      </Container>
      
      <Dialog
        open={logoutDialogOpen}
        onClose={() => setLogoutDialogOpen(false)}
      >
        <DialogTitle>Confirm Logout</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to logout from your account?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setLogoutDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleLogout} color="error" autoFocus>
            Logout
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default SettingsScreen;
