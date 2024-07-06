import React, { useState } from 'react';
import {
  Paper, Typography, Grid, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button
} from '@mui/material';
import Header from '../Component/Header';
import Sidebar from '../Component/Sidebar';
import { Container } from 'react-bootstrap';
const Customers = () => {
  // Sample data for customers
  const [customers, setCustomers] = useState([
    {
      id: 1,
      image: 'path_to_image_1.jpg',
      name: 'Customer 1',
      mobile: '1234567890',
      email: 'customer1@example.com',
      addressType: 'Home',
      address: '123 Main St, City, Country'
    },
    {
      id: 2,
      image: 'path_to_image_2.jpg',
      name: 'Customer 2',
      mobile: '0987654321',
      email: 'customer2@example.com',
      addressType: 'Office',
      address: '456 Elm St, City, Country'
    },
    // Add more sample data as needed
  ]);
  return (
    <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
      <Header />
      <Box sx={{ display: 'flex', minHeight: '100vh' }}>
        <Sidebar />
        <Box component="main" sx={{ flexGrow: 1, p: 3, backgroundColor: '#F4F6F8' }}>
          <Container className='mt-5'>
            <Grid container justifyContent="center">
              <Grid item xs={12}>
                <Paper elevation={3} sx={{ padding: 4, backgroundColor: '#fff' }}>
                  <Typography variant="h4" component="h1" gutterBottom align="center" sx={{ fontWeight: 'bold', color: '#3F51B5' }}>
                    View Customers
                  </Typography>
                  <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                      <TableHead>
                        <TableRow>
                          <TableCell align="center">Image</TableCell>
                          <TableCell align="center">Name</TableCell>
                          <TableCell align="center">Mobile</TableCell>
                          <TableCell align="center">Email</TableCell>
                          <TableCell align="center">Address Type</TableCell>
                          <TableCell align="center">Address</TableCell>
                          <TableCell align="center">Actions</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {customers.map((customer) => (
                          <TableRow key={customer.id}>
                            <TableCell align="center">
                              <img src={URL.createObjectURL(new Blob([customer.image]))} alt={customer.name} style={{ height: 50 }} />
                            </TableCell>
                            <TableCell align="center">{customer.name}</TableCell>
                            <TableCell align="center">{customer.mobile}</TableCell>
                            <TableCell align="center">{customer.email}</TableCell>
                            <TableCell align="center">{customer.addressType}</TableCell>
                            <TableCell align="center">{customer.address}</TableCell>
                            <TableCell align="center">
                              <Button variant="contained" color="primary" sx={{ mr: 1 }}>Edit</Button>
                              <Button variant="outlined" color="secondary">Delete</Button>
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
export default Customers;