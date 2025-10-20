import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Badge,
  Box,
  Container,
} from '@mui/material';
import {
  ShoppingCart,
  AccountCircle,
  Wifi,
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, logout } = useAuth();
  const { getCartCount } = useCart();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <AppBar position="sticky" elevation={0}>
      <Container maxWidth="xl">
        <Toolbar sx={{ py: 1 }}>
          <Wifi sx={{ mr: 1, fontSize: 32, color: 'primary.main' }} />
          <Typography
            variant="h6"
            component="div"
            sx={{
              flexGrow: 1,
              fontWeight: 700,
              cursor: 'pointer',
              background: 'linear-gradient(135deg, #9333EA 0%, #EC4899 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
            onClick={() => navigate('/')}
          >
            DataKu
          </Typography>

          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
            {isAuthenticated && (
              <>
                <Button
                  color="inherit"
                  onClick={() => navigate('/dashboard')}
                  sx={{
                    fontWeight: location.pathname === '/dashboard' ? 700 : 400,
                    color: location.pathname === '/dashboard' ? 'primary.main' : 'inherit',
                  }}
                >
                  Paket
                </Button>
                <Button
                  color="inherit"
                  onClick={() => navigate('/transactions')}
                  sx={{
                    fontWeight: location.pathname === '/transactions' ? 700 : 400,
                    color: location.pathname === '/transactions' ? 'primary.main' : 'inherit',
                  }}
                >
                  Transaksi
                </Button>
                <IconButton
                  color="inherit"
                  onClick={() => navigate('/cart')}
                  sx={{
                    color: location.pathname === '/cart' ? 'primary.main' : 'inherit',
                  }}
                >
                  <Badge badgeContent={getCartCount()} color="secondary">
                    <ShoppingCart />
                  </Badge>
                </IconButton>
                <IconButton
                  color="inherit"
                  onClick={() => navigate('/profile')}
                  sx={{
                    color: location.pathname === '/profile' ? 'primary.main' : 'inherit',
                  }}
                >
                  <AccountCircle />
                </IconButton>
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={handleLogout}
                  sx={{ ml: 1 }}
                >
                  Keluar
                </Button>
              </>
            )}
            {!isAuthenticated && (
              <>
                <Button
                  color="inherit"
                  onClick={() => navigate('/auth')}
                >
                  Masuk
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => navigate('/auth?mode=signup')}
                >
                  Daftar
                </Button>
              </>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
