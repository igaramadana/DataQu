import React, { useEffect, useState } from 'react';
import {
  Container,
  Typography,
  Box,
  Grid,
  TextField,
  InputAdornment,
  ToggleButtonGroup,
  ToggleButton,
  CircularProgress,
} from '@mui/material';
import { Search } from '@mui/icons-material';
import axios from 'axios';
import PackageCard from '../components/PackageCard';
import { useAuth } from '../contexts/AuthContext';

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

const Dashboard = () => {
  const { user, isAuthenticated } = useAuth();
  const [packages, setPackages] = useState<Package[]>([]);
  const [filteredPackages, setFilteredPackages] = useState<Package[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const response = await axios.get(`${API_URL}/packages`);
        setPackages(response.data);
        setFilteredPackages(response.data);
      } catch (error) {
        console.error('Error fetching packages:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchPackages();
  }, []);

  useEffect(() => {
    let filtered = packages;

    if (categoryFilter !== 'all') {
      filtered = filtered.filter((pkg) => pkg.category === categoryFilter);
    }

    if (searchQuery) {
      filtered = filtered.filter(
        (pkg) =>
          pkg.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          pkg.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          pkg.quota.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredPackages(filtered);
  }, [searchQuery, categoryFilter, packages]);

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Box mb={4}>
        <Typography variant="h3" sx={{ mb: 1, fontWeight: 700 }}>
          Pilih Paket Internet
        </Typography>
        {isAuthenticated && user && (
        <Typography 
          variant="h6" 
          sx={{ 
            mb: 1,
            color: 'text.secondary',
            fontStyle: 'semibold'
          }}
        >
          Halo, {user.name}! Mari temukan paket yang sesuai untuk Anda
        </Typography>
      )}
      </Box>

      <Box mb={4}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={6} component="div">
            <TextField
              fullWidth
              placeholder="Cari paket..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12} md={6} component="div">
            <ToggleButtonGroup
              value={categoryFilter}
              exclusive
              onChange={(_, newValue) => {
                if (newValue !== null) {
                  setCategoryFilter(newValue);
                }
              }}
              fullWidth
            >
              <ToggleButton value="all">Semua</ToggleButton>
              <ToggleButton value="daily">Harian</ToggleButton>
              <ToggleButton value="weekly">Mingguan</ToggleButton>
              <ToggleButton value="monthly">Bulanan</ToggleButton>
            </ToggleButtonGroup>
          </Grid>
        </Grid>
      </Box>

      {loading ? (
        <Box display="flex" justifyContent="center" py={8}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          {filteredPackages.length === 0 ? (
            <Box textAlign="center" py={8}>
              <Typography variant="h6" color="text.secondary">
                Tidak ada paket yang ditemukan
              </Typography>
            </Box>
          ) : (
            <Grid container spacing={3}>
              {filteredPackages.map((pkg) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={pkg.id}>
                  <PackageCard package={pkg} />
                </Grid>
              ))}
            </Grid>
          )}
        </>
      )}
    </Container>
  );
};

export default Dashboard;
