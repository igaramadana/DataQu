import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  Chip,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import { CheckCircle, AddShoppingCart } from '@mui/icons-material';
import { formatCurrency } from '../utils/formatters';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

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

interface PackageCardProps {
  package: Package;
}

const PackageCard: React.FC<PackageCardProps> = ({ package: pkg }) => {
  const { addToCart } = useCart();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleAddToCart = () => {
    if (!isAuthenticated) {
      navigate('/auth');
      return;
    }
    addToCart(pkg);
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'daily':
        return 'info';
      case 'weekly':
        return 'warning';
      case 'monthly':
        return 'success';
      default:
        return 'default';
    }
  };

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case 'daily':
        return 'Harian';
      case 'weekly':
        return 'Mingguan';
      case 'monthly':
        return 'Bulanan';
      default:
        return category;
    }
  };

  return (
    <Card
      sx={{
        height: '100%',
        minHeight: 460,
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        overflow: 'hidden',
        borderRadius: 2,
        boxShadow: '0 8px 24px rgba(17,24,39,0.5)',
        backgroundColor: 'background.paper',
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          top: 12,
          right: 12,
          zIndex: 2,
        }}
      >
        <Chip
          label={getCategoryLabel(pkg.category)}
          color={getCategoryColor(pkg.category)}
          size="small"
          sx={{ fontWeight: 700, px: 1.2 }}
        />
      </Box>

      <CardContent
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 1.5,
          height: '100%',
          px: { xs: 2.5, md: 3 },
          py: { xs: 2.5, md: 3 },
        }}
      >
        <Box>
          <Typography
            variant="h4"
            component="div"
            sx={{
              fontWeight: 800,
              mb: 0.5,
              background: 'linear-gradient(135deg, #9333EA 0%, #EC4899 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            {pkg.quota}
          </Typography>

          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
            {pkg.name}
          </Typography>

          <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
            {pkg.description}
          </Typography>
        </Box>

        <Box sx={{ mt: 1 }}>
          <Typography variant="caption" color="text.secondary">
            Masa Aktif
          </Typography>
          <Typography variant="body2" sx={{ fontWeight: 700 }}>
            {pkg.validity}
          </Typography>
        </Box>

        <List dense sx={{ my: 1.5, px: 0 }}>
          {pkg.features.map((feature, index) => (
            <ListItem
              key={index}
              disableGutters
              sx={{ alignItems: 'flex-start', gap: 1, py: 0.5 }}
            >
              <ListItemIcon sx={{ minWidth: 32, mt: 0.25 }}>
                <CheckCircle sx={{ fontSize: 18, color: 'primary.main' }} />
              </ListItemIcon>
              <ListItemText
                primary={feature}
                primaryTypographyProps={{ variant: 'body2', color: 'text.primary' }}
              />
            </ListItem>
          ))}
        </List>

        <Box sx={{ mt: 'auto', pt: 2, borderTop: 1, borderColor: 'divider' }}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              mb: 1,
              gap: 2,
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: 800 }}>
              {formatCurrency(pkg.price)}
            </Typography>
          </Box>

          <Button
            variant="contained"
            fullWidth
            startIcon={<AddShoppingCart />}
            onClick={handleAddToCart}
            sx={{
              py: 1.4,
              borderRadius: 2,
              textTransform: 'none',
              fontWeight: 700,
              background: 'linear-gradient(135deg, #9333EA 0%, #EC4899 100%)',
              '&:hover': {
                filter: 'brightness(0.95)',
              },
            }}
          >
            Tambah ke Keranjang
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default PackageCard;
