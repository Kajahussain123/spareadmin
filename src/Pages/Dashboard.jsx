import React from 'react';
import { Box, Container, Grid, Paper, Typography, List, ListItem, ListItemText, Divider, CircularProgress, TableCell, TableRow, TableHead, TableContainer, Chip, TableBody } from '@mui/material';

import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import Sidebar from '../Component/Sidebar';
import Header from '../Component/Header';
import MonetizationOnOutlinedIcon from '@mui/icons-material/MonetizationOnOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import ShoppingBasketOutlinedIcon from '@mui/icons-material/ShoppingBasketOutlined';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { Table } from 'react-bootstrap';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const socialMedia = 67;
const affiliateVisitors = 21;
const byAdvertisement = 12;


const Dashboard = () => {
  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Sales',
        backgroundColor: '#3f51b5',
        borderColor: '#3f51b5',
        borderWidth: 1,
        hoverBackgroundColor: '#303f9f',
        hoverBorderColor: '#303f9f',
        data: [650, 590, 800, 810, 560, 550, 400, 950, 700, 600, 750, 1000],
      },
    ],
  };

  return (
   
      <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <Header />
        <Box sx={{ display: 'flex', minHeight: '100vh' }}>
        <Sidebar />
        <Box component="main" sx={{ flexGrow: 1, p: 3, backgroundColor: '#f4f6f8' }}>
          <Container>
          <Grid container spacing={2}>
  <Grid item xs={12} sm={4}>
    <Paper sx={{ p: 2, display: 'flex', alignItems: 'center', backgroundColor: '#FFF9E6' }}>
      <MonetizationOnOutlinedIcon sx={{ fontSize: 40, color: '#FFA500', mr: 2 }} />
      <Box>
        <Typography variant="body2" color="text.secondary">Total Sales</Typography>
        <Typography variant="h6" fontWeight="bold">$19,626,058.20</Typography>
      </Box>
    </Paper>
  </Grid>
  <Grid item xs={12} sm={4}>
    <Paper sx={{ p: 2, display: 'flex', alignItems: 'center', backgroundColor: '#E6FFE6' }}>
      <ShoppingCartOutlinedIcon sx={{ fontSize: 40, color: '#00A300', mr: 2 }} />
      <Box>
        <Typography variant="body2" color="text.secondary">Total Orders</Typography>
        <Typography variant="h6" fontWeight="bold">3290</Typography>
      </Box>
    </Paper>
  </Grid>
  <Grid item xs={12} sm={4}>
    <Paper sx={{ p: 2, display: 'flex', alignItems: 'center', backgroundColor: '#E6E6FF' }}>
      <ShoppingBasketOutlinedIcon sx={{ fontSize: 40, color: '#0000FF', mr: 2 }} />
      <Box>
        <Typography variant="body2" color="text.secondary">Total Products</Typography>
        <Typography variant="h6" fontWeight="bold">322</Typography>
      </Box>
    </Paper>
  </Grid>

              <Grid item xs={12} sm={8}>
                <Paper sx={{ p: 2 }}>
                  <Typography variant="h6">Sales Statistics</Typography>
                  <Bar data={data} />
                </Paper>
              </Grid>
              <Grid item xs={12} sm={4}>
      <Paper sx={{ p: 2, height: 430, display: 'flex', flexDirection: 'column' }}>
        <Typography variant="h6" align="left" sx={{ mb: 2 }}>Visitors</Typography>
        <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <Typography variant="body2" sx={{ mb: 1 }}>Recent month</Typography>
          <Box sx={{ position: 'relative', display: 'inline-flex', width: 180, height: 180 }}>
            <CircularProgress
              variant="determinate"
              value={100}
              size={180}
              thickness={2}
              sx={{ color: '#F4B400', position: 'absolute' }}
            />
            <CircularProgress
              variant="determinate"
              value={socialMedia + affiliateVisitors}
              size={180}
              thickness={2}
              sx={{ color: '#0F9D58', position: 'absolute' }}
            />
            <CircularProgress
              variant="determinate"
              value={socialMedia}
              size={180}
              thickness={2}
              sx={{ color: '#4285F4', position: 'absolute' }}
            />
            <Box
              sx={{
                top: 0,
                left: 0,
                bottom: 0,
                right: 0,
                position: 'absolute',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
              }}
            >
              <Typography variant="h4" component="div" fontWeight="bold">
                {socialMedia + affiliateVisitors + byAdvertisement}%
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Website growth
              </Typography>
            </Box>
          </Box>
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', mt: 2 }}>
          <Typography variant="caption" sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
            <span style={{ width: 8, height: 8, backgroundColor: '#4285F4', borderRadius: '50%', display: 'inline-block', marginRight: 8 }}></span>
            Social media: {socialMedia}%
          </Typography>
          <Typography variant="caption" sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
            <span style={{ width: 8, height: 8, backgroundColor: '#0F9D58', borderRadius: '50%', display: 'inline-block', marginRight: 8 }}></span>
            Affiliate visitors: {affiliateVisitors}%
          </Typography>
          <Typography variant="caption" sx={{ display: 'flex', alignItems: 'center' }}>
            <span style={{ width: 8, height: 8, backgroundColor: '#F4B400', borderRadius: '50%', display: 'inline-block', marginRight: 8 }}></span>
            By advertisement: {byAdvertisement}%
          </Typography>
        </Box>
      </Paper>
    </Grid>
 

<Grid item xs={12}>
  <Paper sx={{ p: 2 }}>
    <Typography variant="h6" sx={{ mb: 2 }}>Latest orders</Typography>
    <TableContainer>
      <Table sx={{ minWidth: 650 }} aria-label="latest orders table">
        <TableHead>
          <TableRow>
            <TableCell>Order ID</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell align="right">Amount</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Date</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {[
            { id: '2323', name: 'Devon Lane', email: 'devon@example.com', amount: '$778.35', status: 'Delivered', date: '07.05.2020', color: 'success' },
            { id: '2454', name: 'Darrell Steward', email: 'darrell@example.com', amount: '$219.78', status: 'Delivered', date: '03.07.2020', color: 'success' },
            { id: '6289', name: 'Darlene Robertson', email: 'darlene@example.com', amount: '$928.41', status: 'Cancelled', date: '23.03.2020', color: 'error' },
            { id: '3869', name: 'Courtney Henry', email: 'courtney@example.com', amount: '$80.51', status: 'Pending', date: '04.07.2020', color: 'warning' },
            { id: '1247', name: 'Eleanor Pena', email: 'eleanor@example.com', amount: '$275.43', status: 'Delivered', date: '10.03.2020', color: 'success' },
            { id: '3981', name: 'Ralph Edwards', email: 'ralph@example.com', amount: '$830.44', status: 'Delivered', date: '23.03.2020', color: 'success' },
          ].map((order, index) => (
            <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell component="th" scope="row">{order.id}</TableCell>
              <TableCell>{order.name}</TableCell>
              <TableCell>{order.email}</TableCell>
              <TableCell align="right">{order.amount}</TableCell>
              <TableCell>
                <Chip label={order.status} color={order.color} size="small" />
              </TableCell>
              <TableCell>{order.date}</TableCell>
              <TableCell>
                <MoreHorizIcon sx={{ color: 'text.secondary', cursor: 'pointer' }} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  </Paper>
</Grid>
            </Grid>
          </Container>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
