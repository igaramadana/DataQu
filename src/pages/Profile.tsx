import React from 'react';
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  Grid,
  Avatar,
  Divider,
  Chip,
  Stack,
} from '@mui/material';
import {
  AccountCircle,
  Email,
  Phone,
  AccountBalance,
} from '@mui/icons-material';
import { useAuth } from '../contexts/AuthContext';
import { formatCurrency } from '../utils/formatters';

const Profile = () => {
  const { user } = useAuth();

  if (!user) return null;

  const initial = (user.name && user.name.charAt(0)) ? user.name.charAt(0).toUpperCase() : '?';

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 3, md: 4 } }}>
      <Typography variant="h4" sx={{ mb: { xs: 3, md: 4 }, fontWeight: 700 }}>
        Profil Saya
      </Typography>

      <Grid container spacing={{ xs: 2, md: 4 }} alignItems="flex-start">
        <Grid item xs={12} md={4}>
          <Card elevation={3} sx={{ borderRadius: 2 }}>
            <CardContent sx={{ textAlign: 'center', py: { xs: 3, md: 4 } }}>
              <Avatar
                sx={{
                  width: 120,
                  height: 120,
                  mx: 'auto',
                  mb: 2,
                  fontSize: 48,
                  color: 'white',
                  backgroundImage: 'linear-gradient(135deg, #9333EA 0%, #EC4899 100%)',
                }}
                aria-label="user-avatar"
              >
                {initial}
              </Avatar>

              <Typography variant="h6" sx={{ fontWeight: 600, mb: 0.5 }} noWrap>
                {user.name || '-'}
              </Typography>
              <Typography variant="body2" color="text.secondary" noWrap>
                {user.email}
              </Typography>

              <Chip
                label="Verified"
                color="success"
                size="small"
                sx={{ mt: 2 }}
              />
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={8}>
          <Stack spacing={3}>
            <Card elevation={1} sx={{ borderRadius: 2 }}>
              <CardContent>
                <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                  Informasi Akun
                </Typography>

                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <Box display="flex" alignItems="center">
                    <AccountCircle sx={{ mr: 2, color: 'primary.main' }} />
                    <Box>
                      <Typography variant="caption" color="text.secondary">
                        Nama Lengkap
                      </Typography>
                      <Typography variant="body1" fontWeight={600}>
                        {user.name || '-'}
                      </Typography>
                    </Box>
                  </Box>

                  <Divider />

                  <Box display="flex" alignItems="center">
                    <Email sx={{ mr: 2, color: 'primary.main' }} />
                    <Box>
                      <Typography variant="caption" color="text.secondary">
                        Email
                      </Typography>
                      <Typography variant="body1" fontWeight={600}>
                        {user.email}
                      </Typography>
                    </Box>
                  </Box>

                  <Divider />

                  <Box display="flex" alignItems="center">
                    <Phone sx={{ mr: 2, color: 'primary.main' }} />
                    <Box>
                      <Typography variant="caption" color="text.secondary">
                        Nomor Telepon
                      </Typography>
                      <Typography variant="body1" fontWeight={600}>
                        {user.phone || '-'}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </CardContent>
            </Card>

            <Card
              elevation={2}
              sx={{
                borderRadius: 2,
                background: 'linear-gradient(135deg, #9333EA 0%, #EC4899 100%)',
                color: 'white',
              }}
            >
              <CardContent>
                <Box display="flex" alignItems="center" justifyContent="space-between" flexWrap="wrap">
                  <Box display="flex" alignItems="center" mb={{ xs: 1, md: 0 }}>
                    <AccountBalance sx={{ mr: 2, fontSize: 32 }} />
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                      Saldo Akun
                    </Typography>
                  </Box>

                  <Typography variant="h4" sx={{ fontWeight: 700 }}>
                    {formatCurrency(user.balance)}
                  </Typography>
                </Box>

                <Typography variant="body2" sx={{ mt: 1, opacity: 0.95 }}>
                  Gunakan saldo untuk membeli paket internet
                </Typography>
              </CardContent>
            </Card>
          </Stack>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Profile;
