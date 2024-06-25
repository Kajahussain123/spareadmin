import React, { useState } from 'react';
import { Box, List, ListItem, ListItemText, ListItemIcon, Typography, Collapse } from '@mui/material';
import { useNavigate } from 'react-router-dom';
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
  Settings as SettingsIcon,
  ExpandLess as ExpandLessIcon,
  ExpandMore as ExpandMoreIcon
} from '@mui/icons-material';

const Sidebar = () => {
  const [selectedItem, setSelectedItem] = useState('Dashboard');
  const [openProducts, setOpenProducts] = useState(false);
  const navigate = useNavigate();

  const handleProductsClick = () => {
    setOpenProducts(!openProducts);
    setSelectedItem('Products'); // Set the parent menu item as selected
  };

  const handleNavigation = (path, itemText) => {
    setSelectedItem(itemText);
    navigate(path);
  };

  const menuItems = [
    { icon: <DashboardIcon />, text: 'Dashboard', path: '/' },
    { 
      icon: <ProductsIcon />, 
      text: 'Products', 
      subItems: [
        { icon: null, text: 'Car Spare', path: '/carspare' },
        { icon: null, text: 'Bike Spare', path: '/bikespare' }
      ]
    },
    { icon: <OrdersIcon />, text: 'Orders', path: '/orders' },
    { icon: <CustomersIcon />, text: 'Customers', path: '/customers' },
    { icon: <StatisticsIcon />, text: 'Add Brands', path: '/addbrands' },
    { icon: <ReviewsIcon />, text: 'Reviews', path: '/reviews' },
    { icon: <TransactionsIcon />, text: 'Transactions', path: '/transactions' },
    { icon: <SellersIcon />, text: 'Sellers', path: '/sellers' },
    { icon: <HotOffersIcon />, text: 'Hot offers', path: '/hotoffers' },
    { icon: <AppearanceIcon />, text: 'Appearance', path: '/appearance' },
    { icon: <SettingsIcon />, text: 'Settings', path: '/settings' },
  ];

  return (
    <Box sx={{ width: 240, bgcolor: 'white', height: '100vh', py: 2 }}>
      <List sx={{ '& .MuiListItem-root': { py: 1 } }}>
        {menuItems.map((item, index) => (
          <React.Fragment key={index}>
            {item.subItems ? (
              <>
                <ListItem 
                  button 
                  onClick={handleProductsClick}
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
                  {openProducts ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                </ListItem>
                <Collapse in={openProducts} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    {item.subItems.map((subItem, subIndex) => (
                      <ListItem 
                        key={subIndex} 
                        button 
                        sx={{ 
                          pl: 4,
                          '&:hover': { bgcolor: 'rgba(0, 0, 0, 0.04)' },
                          bgcolor: selectedItem === subItem.text ? 'rgba(0, 0, 0, 0.08)' : 'transparent'
                        }}
                        onClick={() => handleNavigation(subItem.path, subItem.text)}
                      >
                        <ListItemText 
                          primary={
                            <Typography 
                              variant="body2" 
                              color={selectedItem === subItem.text ? '#3f51b5' : 'text.primary'}
                            >
                              {subItem.text}
                            </Typography>
                          } 
                        />
                      </ListItem>
                    ))}
                  </List>
                </Collapse>
              </>
            ) : (
              <ListItem 
                button 
                onClick={() => handleNavigation(item.path, item.text)}
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
            )}
          </React.Fragment>
        ))}
      </List>
    </Box>
  );
};

export default Sidebar;
