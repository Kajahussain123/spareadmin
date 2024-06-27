import React, { useState } from 'react';
import {
  Paper, Typography, Grid, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button
} from '@mui/material';
import Header from '../Component/Header';
import Sidebar from '../Component/Sidebar';
import { Container } from 'react-bootstrap';

const ViewCarSpare = () => {
  // Sample data for car spares
  const [carSpares, setCarSpares] = useState([
    {
      id: 1,
      name: 'Car Spare A',
      image: 'spareA.png',
      description: 'Description for Car Spare A',
      year: 2021,
      brandName: 'Brand A',
      category: 'Category 1',
      version: 'V1',
      fuelType: 'Electric'
    },
    {
      id: 2,
      name: 'Car Spare B',
      image: 'spareB.png',
      description: 'Description for Car Spare B',
      year: 2020,
      brandName: 'Brand B',
      category: 'Category 2',
      version: 'V2',
      fuelType: 'Petrol'
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
                    View Car Spares
                  </Typography>
                  <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                      <TableHead>
                        <TableRow>
                          <TableCell align="center">Name</TableCell>
                          <TableCell align="center">Image</TableCell>
                          <TableCell align="center">Description</TableCell>
                          <TableCell align="center">Year</TableCell>
                          <TableCell align="center">Brand</TableCell>
                          <TableCell align="center">Category</TableCell>
                          <TableCell align="center">Version</TableCell>
                          <TableCell align="center">Fuel Type</TableCell>
                          <TableCell align="center">Actions</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {carSpares.map((carSpare) => (
                          <TableRow key={carSpare.id}>
                            <TableCell align="center">{carSpare.name}</TableCell>
                            <TableCell align="center">
                              <img src={URL.createObjectURL(new Blob([carSpare.image]))} alt={carSpare.name} style={{ height: 50 }} />
                            </TableCell>
                            <TableCell align="center">{carSpare.description}</TableCell>
                            <TableCell align="center">{carSpare.year}</TableCell>
                            <TableCell align="center">{carSpare.brandName}</TableCell>
                            <TableCell align="center">{carSpare.category}</TableCell>
                            <TableCell align="center">{carSpare.version}</TableCell>
                            <TableCell align="center">{carSpare.fuelType}</TableCell>
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

export default ViewCarSpare;
