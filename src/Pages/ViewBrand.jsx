import React, { useState } from 'react';
import {
  Paper, Typography, Grid, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button
} from '@mui/material';
import Header from '../Component/Header';
import Sidebar from '../Component/Sidebar';
import { Container } from 'react-bootstrap';

const ViewBrand = () => {
  // Sample data for brands
  const [brands, setBrands] = useState([
    {
      id: 1,
      name: 'Brand A Model',
      image: 'logoA.png',
      description: 'Description for Brand A Model',
      year: 2021,
      brandName: 'Brand A',
      category: 'Category 1',
      version: 'V1',
      fuelType: 'Electric'
    },
    {
      id: 2,
      name: 'Brand B Model',
      image: 'logoB.png',
      description: 'Description for Brand B Model',
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
                    View Brands
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
                        {brands.map((brand) => (
                          <TableRow key={brand.id}>
                            <TableCell align="center">{brand.name}</TableCell>
                            <TableCell align="center">
                              <img src={URL.createObjectURL(new Blob([brand.image]))} alt={brand.name} style={{ height: 50 }} />
                            </TableCell>
                            <TableCell align="center">{brand.description}</TableCell>
                            <TableCell align="center">{brand.year}</TableCell>
                            <TableCell align="center">{brand.brandName}</TableCell>
                            <TableCell align="center">{brand.category}</TableCell>
                            <TableCell align="center">{brand.version}</TableCell>
                            <TableCell align="center">{brand.fuelType}</TableCell>
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

export default ViewBrand;
