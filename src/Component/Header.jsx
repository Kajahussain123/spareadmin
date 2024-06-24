import React from 'react';
import { AppBar, Toolbar, Typography, Avatar, Box, InputBase, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SettingsIcon from '@mui/icons-material/Settings';
import DiamondIcon from '@mui/icons-material/Diamond';

const Header = () => {
  return (
    <AppBar position="static" sx={{ backgroundColor: 'white', color: 'black', boxShadow: 'none', borderBottom: '1px solid #e0e0e0' }}>
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <DiamondIcon sx={{ color: '#3f51b5', mr: 1 }} />
          <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#3f51b5' }}>
            Admin
          </Typography>
        </Box>
        
        <Box   sx={{ display: 'flex', alignItems: 'center', flexGrow: 1, ml: 50 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', backgroundColor: '#f5f5f5', borderRadius: '4px', padding: '2px 8px', width: '100%', maxWidth: 400 }}>
            <SearchIcon sx={{ color: 'action.active', mr: 1 }} />
            <InputBase
              placeholder="Search…"
              sx={{ ml: 1, flex: 1 }}
            />
          </Box>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <IconButton color="inherit">
            <NotificationsIcon />
          </IconButton>
          <IconButton color="inherit">
            <SettingsIcon />
          </IconButton>
          <Avatar alt="Profile Picture" src="/static/images/avatar/1.jpg" sx={{ ml: 2 }} />
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;