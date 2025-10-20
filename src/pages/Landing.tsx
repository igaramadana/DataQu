import React, { useEffect, useState } from 'react';
import {
  Container,
  Typography,
  Box,
  Grid,
  Button,
  Card,
  CardContent,
  alpha,
} from '@mui/material';
import {
  Speed,
  Security,
  Support,
  TrendingUp,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import PackageCard from '../components/PackageCard';

const API_URL = 'http://localhost:3001';

interface Package {
  id: string;
  name: string;
  description: string;
  price: number;
  quota: string;
  validity: string;
  category: string;
  features: string[];
}

const Landing = () => {
  const navigate = useNavigate();
  const [featuredPackages, setFeaturedPackages] = useState<Package[]>([]);

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const response = await axios.get(`${API_URL}/packages?_limit=3`);
        setFeaturedPackages(response.data);
      } catch (error) {
        console.error('Error fetching packages:', error);
      }
    };
    fetchPackages();
  }, []);

  const features = [
    {
      icon: <Speed sx={{ fontSize: 48 }} />,
      title: 'Kecepatan Tinggi',
      description: 'Nikmati kecepatan internet hingga 100 Mbps untuk semua aktivitas digital Anda',
    },
    {
      icon: <Security sx={{ fontSize: 48 }} />,
      title: 'Aman & Terpercaya',
      description: 'Jaringan terenkripsi dengan keamanan tingkat enterprise untuk melindungi data Anda',
    },
    {
      icon: <Support sx={{ fontSize: 48 }} />,
      title: 'Dukungan 24/7',
      description: 'Tim customer service kami siap membantu Anda kapan saja, di mana saja',
    },
    {
      icon: <TrendingUp sx={{ fontSize: 48 }} />,
      title: 'Harga Terjangkau',
      description: 'Paket internet dengan harga kompetitif dan value terbaik untuk kebutuhan Anda',
    },
  ];

  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, rgba(147, 51, 234, 0.1) 0%, rgba(236, 72, 153, 0.1) 100%)',
          py: { xs: 8, md: 12 },
          position: 'relative',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'radial-gradient(circle at 30% 50%, rgba(147, 51, 234, 0.2), transparent 50%)',
          },
        }}
      >
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
          <Box textAlign="center" maxWidth="800px" mx="auto">
            <Typography
              variant="h1"
              sx={{
                fontWeight: 800,
                mb: 3,
                fontSize: { xs: '2.5rem', md: '3.5rem' },
                background: 'linear-gradient(135deg, #9333EA 0%, #EC4899 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Internet Cepat & Terpercaya
            </Typography>
            <Typography
              variant="h5"
              color="text.secondary"
              sx={{ mb: 4, lineHeight: 1.6 }}
            >
              Pilih paket internet yang sesuai dengan kebutuhan Anda. Dapatkan koneksi stabil dengan harga terjangkau.
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
              <Button
                variant="contained"
                size="large"
                onClick={() => navigate('/dashboard')}
                sx={{
                  px: 4,
                  py: 1.5,
                  fontSize: '1.1rem',
                  background: 'linear-gradient(135deg, #9333EA 0%, #EC4899 100%)',
                }}
              >
                Lihat Semua Paket
              </Button>
              <Button
                variant="outlined"
                size="large"
                onClick={() => navigate('/auth')}
                sx={{ px: 4, py: 1.5, fontSize: '1.1rem' }}
              >
                Mulai Sekarang
              </Button>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Features Section */}
      <Container maxWidth="lg" sx={{ py: 10 }}>
        <Typography
          variant="h2"
          textAlign="center"
          sx={{ mb: 6, fontWeight: 700 }}
        >
          Mengapa Memilih DataKu?
        </Typography>
        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card
                sx={{
                  height: '100%',
                  textAlign: 'center',
                  p: 2,
                  backgroundColor: alpha('#9333EA', 0.03),
                }}
              >
                <CardContent>
                  <Box sx={{ color: 'primary.main', mb: 2 }}>
                    {feature.icon}
                  </Box>
                  <Typography variant="h6" sx={{ mb: 1, fontWeight: 600 }}>
                    {feature.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {feature.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Featured Packages Section */}
      <Box sx={{ backgroundColor: 'background.paper', py: 10 }}>
        <Container maxWidth="lg">
          <Typography
            variant="h2"
            textAlign="center"
            sx={{ mb: 2, fontWeight: 700 }}
          >
            Paket Populer
          </Typography>
          <Typography
            variant="body1"
            textAlign="center"
            color="text.secondary"
            sx={{ mb: 6 }}
          >
            Pilihan paket internet terfavorit dari pelanggan kami
          </Typography>
          <Grid container spacing={4}>
            {featuredPackages.map((pkg) => (
              <Grid item xs={12} sm={6} md={4} key={pkg.id}>
                <PackageCard package={pkg} />
              </Grid>
            ))}
          </Grid>
          <Box textAlign="center" mt={6}>
            <Button
              variant="contained"
              size="large"
              onClick={() => navigate('/dashboard')}
              sx={{
                px: 4,
                py: 1.5,
                background: 'linear-gradient(135deg, #9333EA 0%, #EC4899 100%)',
              }}
            >
              Lihat Semua Paket
            </Button>
          </Box>
        </Container>
      </Box>

      {/* CTA Section */}
      <Container maxWidth="lg" sx={{ py: 10 }}>
        <Card
          sx={{
            background: 'linear-gradient(135deg, #9333EA 0%, #EC4899 100%)',
            color: 'white',
            p: { xs: 4, md: 6 },
            textAlign: 'center',
          }}
        >
          <Typography variant="h3" sx={{ mb: 2, fontWeight: 700 }}>
            Siap untuk Internet Lebih Cepat?
          </Typography>
          <Typography variant="h6" sx={{ mb: 4, opacity: 0.9 }}>
            Daftar sekarang dan dapatkan bonus kuota untuk pengguna baru!
          </Typography>
          <Button
            variant="contained"
            size="large"
            onClick={() => navigate('/auth?mode=signup')}
            sx={{
              px: 4,
              py: 1.5,
              fontSize: '1.1rem',
              backgroundColor: 'white',
              color: 'primary.main',
              '&:hover': {
                backgroundColor: alpha('#FFFFFF', 0.9),
              },
            }}
          >
            Daftar Gratis
          </Button>
        </Card>
      </Container>
    </Box>
  );
};

export default Landing;
