import React, { useState } from 'react';
import { Box, List, ListItem, ListItemText, ListItemIcon, Typography } from '@mui/material';
import {
  Dashboard as DashboardIcon,
  Inventory as ProductsIcon,
  ShoppingCart as OrdersIcon,
  People as CustomersIcon,
  BarChart as StatisticsIcon,
  RateReview as ReviewsIcon,
  MonetizationOn as TransactionsIcon,
  Storefront as SellersIcon,
  LocalOffer as HotOffersIcon,
  Palette as AppearanceIcon,
  Settings as SettingsIcon
} from '@mui/icons-material';

const Sidebar = () => {
  const [selectedItem, setSelectedItem] = useState('Dashboard');

  const menuItems = [
    { icon: <DashboardIcon />, text: 'Dashboard' },
    { icon: <ProductsIcon />, text: 'Products' },
    { icon: <OrdersIcon />, text: 'Orders' },
    { icon: <CustomersIcon />, text: 'Customers' },
    { icon: <StatisticsIcon />, text: 'Statistics' },
    { icon: <ReviewsIcon />, text: 'Reviews' },
    { icon: <TransactionsIcon />, text: 'Transactions' },
    { icon: <SellersIcon />, text: 'Sellers' },
    { icon: <HotOffersIcon />, text: 'Hot offers' },
    { icon: <AppearanceIcon />, text: 'Appearance' },
    { icon: <SettingsIcon />, text: 'Settings' },
  ];

  return (
    <Box sx={{ width: 240, bgcolor: 'white', height: '100vh', py: 2 }}>
      <List sx={{ '& .MuiListItem-root': { py: 1 } }}>
        {menuItems.map((item, index) => (
          <ListItem 
            button 
            key={index} 
            onClick={() => setSelectedItem(item.text)}
            sx={{ 
              '&:hover': { bgcolor: 'rgba(0, 0, 0, 0.04)' },
              bgcolor: selectedItem === item.text ? 'rgba(0, 0, 0, 0.08)' : 'transparent'
            }}
          >
            <ListItemIcon 
              sx={{ 
                color: selectedItem === item.text ? '#3f51b5' : 'text.secondary', 
                minWidth: 40 
              }}
            >
              {item.icon}
            </ListItemIcon>
            <ListItemText 
              primary={
                <Typography 
                  variant="body2" 
                  color={selectedItem === item.text ? '#3f51b5' : 'text.primary'}
                >
                  {item.text}
                </Typography>
              } 
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default Sidebar;