import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Box, 
  Typography, 
  Container, 
  Paper,
  TextField,
  AppBar,
  Toolbar,
  IconButton,
  Stack
} from '@mui/material';
import { 
  ArrowBack as ArrowBackIcon,
  PersonAdd as PersonAddIcon
} from '@mui/icons-material';
import { useAuthStore } from '../lib/store';
import { Address } from '../lib/types';

const RegisterScreen: React.FC = () => {
  const navigate = useNavigate();
  const { register, isLoading, error } = useAuthStore();
  
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [phone, setPhone] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');
  const [city, setCity] = React.useState('');
  const [state, setState] = React.useState('');
  const [postalCode, setPostalCode] = React.useState('');
  
  const [passwordError, setPasswordError] = React.useState('');
  
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Reset error
    setPasswordError('');
    
    // Validate passwords match
    if (password !== confirmPassword) {
      setPasswordError('Passwords do not match');
      return;
    }
    
    // Create address object
    const address: Address = {
      city,
      state,
      postalCode,
      country: 'Oman'
    };
    
    const success = await register(name, email, phone, password, address);
    
    if (success) {
      navigate('/home');
    }
  };
  
  return (
    <Box sx={{ 
      flexGrow: 1, 
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      bgcolor: 'background.default'
    }}>
      <AppBar position="static" elevation={0} color="transparent">
        <Toolbar>
          <IconButton
            edge="start"
            color="primary"
            aria-label="back"
            onClick={() => navigate('/login')}
            sx={{ mr: 2 }}
          >
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, color: 'primary.main', fontWeight: 'bold' }}>
            Logis
          </Typography>
        </Toolbar>
      </AppBar>
      
      <Container 
        maxWidth="sm" 
        sx={{ 
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          py: 8
        }}
      >
        <Box sx={{ mb: 4, textAlign: 'center' }}>
          <Typography variant="h4" component="h1" gutterBottom fontWeight="bold">
            Create Account
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Join Logis to access essential services in Oman
          </Typography>
        </Box>
        
        <Paper 
          sx={{ 
            p: 4, 
            borderRadius: 2,
            boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
          }}
        >
          <form onSubmit={handleRegister}>
            {error && (
              <Box sx={{ mb: 3, p: 2, bgcolor: 'error.light', borderRadius: 1 }}>
                <Typography color="error">{error}</Typography>
              </Box>
            )}
            
            <TextField
              fullWidth
              label="Full Name"
              variant="outlined"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              margin="normal"
            />
            
            <TextField
              fullWidth
              label="Email"
              variant="outlined"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              margin="normal"
            />
            
            <TextField
              fullWidth
              label="Phone Number"
              variant="outlined"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              margin="normal"
            />
            
            <TextField
              fullWidth
              label="Password"
              variant="outlined"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              margin="normal"
              error={!!passwordError}
            />
            
            <TextField
              fullWidth
              label="Confirm Password"
              variant="outlined"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              margin="normal"
              error={!!passwordError}
              helperText={passwordError}
            />
            
            <Typography variant="subtitle1" sx={{ mt: 2, mb: 1 }}>
              Address Information
            </Typography>
            
            <TextField
              fullWidth
              label="City"
              variant="outlined"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              required
              margin="normal"
            />
            
            <TextField
              fullWidth
              label="State/Governorate"
              variant="outlined"
              value={state}
              onChange={(e) => setState(e.target.value)}
              required
              margin="normal"
            />
            
            <TextField
              fullWidth
              label="Postal Code"
              variant="outlined"
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
              required
              margin="normal"
            />
            
            <Box sx={{ mt: 3 }}>
              <Box
                component="button"
                type="submit"
                disabled={isLoading}
                sx={{
                  width: '100%',
                  py: 1.5,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 1,
                  bgcolor: 'primary.main',
                  color: 'white',
                  border: 'none',
                  borderRadius: 1,
                  fontSize: '1rem',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  '&:hover': {
                    bgcolor: 'primary.dark'
                  },
                  '&:disabled': {
                    bgcolor: 'action.disabledBackground',
                    color: 'action.disabled',
                    cursor: 'not-allowed'
                  }
                }}
              >
                {isLoading ? 'Creating Account...' : (
                  <>
                    <PersonAddIcon />
                    <span>Register</span>
                  </>
                )}
              </Box>
            </Box>
          </form>
        </Paper>
        
        <Box sx={{ mt: 3, textAlign: 'center' }}>
          <Typography variant="body2" color="text.secondary">
            Already have an account?{' '}
            <Box 
              component="button"
              onClick={() => navigate('/login')}
              sx={{
                background: 'none',
                border: 'none',
                padding: 0,
                font: 'inherit',
                color: 'primary.main',
                fontWeight: 'bold',
                textDecoration: 'underline',
                cursor: 'pointer',
                '&:hover': {
                  color: 'primary.dark'
                }
              }}
            >
              Login
            </Box>
          </Typography>
        </Box>
      </Container>
      
      <Box component="footer" sx={{ py: 3, textAlign: 'center' }}>
        <Typography variant="body2" color="text.secondary">
          © {new Date().getFullYear()} Logis. All rights reserved.
        </Typography>
      </Box>
    </Box>
  );
};

export default RegisterScreen;
