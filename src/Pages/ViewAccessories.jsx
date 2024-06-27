import React, { useState } from 'react';
import {
  Paper, Typography, Grid, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button
} from '@mui/material';
import Header from '../Component/Header';
import Sidebar from '../Component/Sidebar';
import { Container } from 'react-bootstrap';

const ViewAccessories = () => {
  // Sample data for accessories
  const [accessories, setAccessories] = useState([
    {
      id: 1,
      type: 'Type 1',
      name: 'Accessory 1',
      price: 100,
      description: 'Description for Accessory 1',
      offerPrice: 90,
      image: 'path_to_image_1.jpg'
    },
    {
      id: 2,
      type: 'Type 2',
      name: 'Accessory 2',
      price: 200,
      description: 'Description for Accessory 2',
      offerPrice: 180,
      image: 'path_to_image_2.jpg'
    },
    // Add more sample data as needed
  ]);

  return (
    <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
      <Header />
      <Box sx={{ display: 'flex', minHeight: '100vh' }}>
        <Sidebar />
        <Box component="main" sx={{ flexGrow: 1, p: 3, backgroundColor: '#f4f6f8' }}>
          <Container className='mt-5'>
            <Grid container justifyContent="center">
              <Grid item xs={12}>
                <Paper elevation={3} sx={{ padding: 4, backgroundColor: '#fff' }}>
                  <Typography variant="h4" component="h1" gutterBottom align="center" sx={{ fontWeight: 'bold', color: '#3f51b5' }}>
                    View Accessories
                  </Typography>
                  <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                      <TableHead>
                        <TableRow>
                          <TableCell align="center">Accessory Type</TableCell>
                          <TableCell align="center">Name</TableCell>
                          <TableCell align="center">Price</TableCell>
                          <TableCell align="center">Description</TableCell>
                          <TableCell align="center">Offer Price</TableCell>
                          <TableCell align="center">Image</TableCell>
                          <TableCell align="center">Actions</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {accessories.map((accessory) => (
                          <TableRow key={accessory.id}>
                            <TableCell align="center">{accessory.type}</TableCell>
                            <TableCell align="center">{accessory.name}</TableCell>
                            <TableCell align="center">{accessory.price}</TableCell>
                            <TableCell align="center">{accessory.description}</TableCell>
                            <TableCell align="center">{accessory.offerPrice}</TableCell>
                            <TableCell align="center">
                              <img src={URL.createObjectURL(new Blob([accessory.image]))} alt={accessory.name} style={{ height: 50 }} />
                            </TableCell>
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

export default ViewAccessories;
