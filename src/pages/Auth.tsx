import React, { useState } from 'react';
import {
  Container,
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Alert,
  InputAdornment,
  IconButton,
  Tabs,
  Tab,
} from '@mui/material';
import { Visibility, VisibilityOff, Wifi } from '@mui/icons-material';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Auth = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { login, signup } = useAuth();
  
  const [mode, setMode] = useState(searchParams.get('mode') === 'signup' ? 1 : 0);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    phone: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError('');
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const success = await login(formData.email, formData.password);
      if (success) {
        navigate('/dashboard');
      } else {
        setError('Email atau password salah');
      }
    } catch (err) {
      setError('Terjadi kesalahan. Silakan coba lagi.');
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!formData.name || !formData.phone) {
      setError('Semua field harus diisi');
      setLoading(false);
      return;
    }

    try {
      const success = await signup(formData.email, formData.password, formData.name, formData.phone);
      if (success) {
        navigate('/dashboard');
      } else {
        setError('Email sudah terdaftar');
      }
    } catch (err) {
      setError('Terjadi kesalahan. Silakan coba lagi.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        background: 'linear-gradient(135deg, rgba(147, 51, 234, 0.1) 0%, rgba(236, 72, 153, 0.1) 100%)',
        py: 4,
      }}
    >
      <Container maxWidth="sm">
        <Box textAlign="center" mb={4}>
          <Wifi sx={{ fontSize: 64, color: 'primary.main', mb: 2 }} />
          <Typography
            variant="h3"
            sx={{
              fontWeight: 700,
              background: 'linear-gradient(135deg, #9333EA 0%, #EC4899 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            DataKu
          </Typography>
        </Box>

        <Card sx={{ overflow: 'visible' }}>
          <CardContent sx={{ p: 4 }}>
            <Tabs
              value={mode}
              onChange={(_, newValue) => setMode(newValue)}
              variant="fullWidth"
              sx={{ mb: 3 }}
            >
              <Tab label="Masuk" />
              <Tab label="Daftar" />
            </Tabs>

            {error && (
              <Alert severity="error" sx={{ mb: 3 }}>
                {error}
              </Alert>
            )}

            <form onSubmit={mode === 0 ? handleLogin : handleSignup}>
              {mode === 1 && (
                <>
                  <TextField
                    fullWidth
                    label="Nama Lengkap"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    margin="normal"
                    required
                  />
                  <TextField
                    fullWidth
                    label="Nomor Telepon"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    margin="normal"
                    placeholder="+62"
                    required
                  />
                </>
              )}

              <TextField
                fullWidth
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                margin="normal"
                required
              />

              <TextField
                fullWidth
                label="Password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                value={formData.password}
                onChange={handleChange}
                margin="normal"
                required
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              <Button
                fullWidth
                variant="contained"
                type="submit"
                size="large"
                disabled={loading}
                sx={{
                  mt: 3,
                  mb: 2,
                  py: 1.5,
                  background: 'linear-gradient(135deg, #9333EA 0%, #EC4899 100%)',
                }}
              >
                {loading ? 'Memproses...' : mode === 0 ? 'Masuk' : 'Daftar'}
              </Button>
            </form>

            {mode === 0 && (
              <Box textAlign="center" mt={2}>
                <Typography variant="body2" color="text.secondary">
                  Demo: email@example.com / demo123
                </Typography>
              </Box>
            )}
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
};

export default Auth;
