import React, { useState } from 'react';
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  Button,
  IconButton,
  List,
  ListItem,
  Grid,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert,
} from '@mui/material';
import { Delete, ShoppingCartCheckout } from '@mui/icons-material';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import { formatCurrency } from '../utils/formatters';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const API_URL = 'http://localhost:3001';

const Cart = () => {
  const { cart, removeFromCart, clearCart, getTotalPrice } = useCart();
  const { user, updateUser } = useAuth();
  const navigate = useNavigate();
  const [openDialog, setOpenDialog] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleCheckout = () => {
    if (!user) return;
    
    const total = getTotalPrice();
    if (user.balance < total) {
      setError('Saldo tidak mencukupi. Silakan top up terlebih dahulu.');
      return;
    }
    
    setOpenDialog(true);
  };

  const confirmCheckout = async () => {
    if (!user) return;
    
    setLoading(true);
    try {
      const total = getTotalPrice();
      
      // Create transactions for each item
      for (const item of cart) {
        await axios.post(`${API_URL}/transactions`, {
          userId: user.id,
          packageId: item.id,
          packageName: item.name,
          amount: item.price * item.quantity,
          status: 'completed',
          date: new Date().toISOString(),
          paymentMethod: 'balance',
        });
      }
      
      // Update user balance
      const newBalance = user.balance - total;
      await axios.patch(`${API_URL}/users/${user.id}`, {
        balance: newBalance,
      });
      
      updateUser({ ...user, balance: newBalance });
      clearCart();
      setOpenDialog(false);
      navigate('/transactions');
    } catch (err) {
      setError('Terjadi kesalahan. Silakan coba lagi.');
    } finally {
      setLoading(false);
    }
  };

  if (cart.length === 0) {
    return (
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Box textAlign="center">
          <ShoppingCartCheckout sx={{ fontSize: 80, color: 'text.secondary', mb: 2 }} />
          <Typography variant="h4" sx={{ mb: 2 }}>
            Keranjang Kosong
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
            Belum ada paket yang ditambahkan ke keranjang
          </Typography>
          <Button
            variant="contained"
            size="large"
            onClick={() => navigate('/dashboard')}
            sx={{
              background: 'linear-gradient(135deg, #9333EA 0%, #EC4899 100%)',
            }}
          >
            Lihat Paket
          </Button>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h3" sx={{ mb: 4, fontWeight: 700 }}>
        Keranjang Belanja
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }} onClose={() => setError('')}>
          {error}
        </Alert>
      )}

      <Grid container spacing={4}>
        <Grid item xs={12} md={8} component="div">
          <Card>
            <CardContent>
              <List>
                {cart.map((item, index) => (
                  <React.Fragment key={item.id}>
                    {index > 0 && <Divider />}
                    <ListItem
                      sx={{
                        py: 2,
                        display: 'flex',
                        alignItems: 'flex-start',
                      }}
                    >
                      <Box sx={{ flexGrow: 1 }}>
                        <Typography variant="h6" sx={{ fontWeight: 600 }}>
                          {item.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                          {item.quota} • {item.validity}
                        </Typography>
                        <Typography variant="body1" sx={{ fontWeight: 600 }}>
                          {formatCurrency(item.price)} x {item.quantity}
                        </Typography>
                      </Box>
                      <Box textAlign="right">
                        <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
                          {formatCurrency(item.price * item.quantity)}
                        </Typography>
                        <IconButton
                          color="error"
                          onClick={() => removeFromCart(item.id)}
                          size="small"
                        >
                          <Delete />
                        </IconButton>
                      </Box>
                    </ListItem>
                  </React.Fragment>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4} component="div">
          <Card sx={{ position: 'sticky', top: 80 }}>
            <CardContent>
              <Typography variant="h5" sx={{ mb: 3, fontWeight: 700 }}>
                Ringkasan Belanja
              </Typography>
              
              <Box sx={{ mb: 3 }}>
                <Box display="flex" justifyContent="space-between" mb={1}>
                  <Typography color="text.secondary">Subtotal</Typography>
                  <Typography fontWeight={600}>{formatCurrency(getTotalPrice())}</Typography>
                </Box>
                <Box display="flex" justifyContent="space-between" mb={1}>
                  <Typography color="text.secondary">Admin</Typography>
                  <Typography fontWeight={600}>Rp 0</Typography>
                </Box>
                <Divider sx={{ my: 2 }} />
                <Box display="flex" justifyContent="space-between">
                  <Typography variant="h6" fontWeight={700}>Total</Typography>
                  <Typography variant="h6" fontWeight={700} color="primary">
                    {formatCurrency(getTotalPrice())}
                  </Typography>
                </Box>
              </Box>

              {user && (
                <Box sx={{ mb: 3, p: 2, backgroundColor: 'background.default', borderRadius: 2 }}>
                  <Typography variant="body2" color="text.secondary" mb={0.5}>
                    Saldo Anda
                  </Typography>
                  <Typography variant="h6" fontWeight={700}>
                    {formatCurrency(user.balance)}
                  </Typography>
                </Box>
              )}

              <Button
                fullWidth
                variant="contained"
                size="large"
                onClick={handleCheckout}
                startIcon={<ShoppingCartCheckout />}
                sx={{
                  py: 1.5,
                  background: 'linear-gradient(135deg, #9333EA 0%, #EC4899 100%)',
                }}
              >
                Checkout
              </Button>

              <Button
                fullWidth
                variant="text"
                onClick={() => navigate('/dashboard')}
                sx={{ mt: 2 }}
              >
                Lanjut Belanja
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Konfirmasi Pembayaran</DialogTitle>
        <DialogContent>
          <Typography>
            Total pembayaran: <strong>{formatCurrency(getTotalPrice())}</strong>
          </Typography>
          <Typography sx={{ mt: 2 }}>
            Saldo setelah transaksi: <strong>{formatCurrency((user?.balance || 0) - getTotalPrice())}</strong>
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)} disabled={loading}>
            Batal
          </Button>
          <Button
            onClick={confirmCheckout}
            variant="contained"
            disabled={loading}
            sx={{
              background: 'linear-gradient(135deg, #9333EA 0%, #EC4899 100%)',
            }}
          >
            {loading ? 'Memproses...' : 'Bayar Sekarang'}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Cart;
