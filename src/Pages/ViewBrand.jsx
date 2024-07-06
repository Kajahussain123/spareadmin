import React, { useState, useEffect } from 'react';
import {
  Paper, Typography, Grid, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Dialog, DialogActions, DialogContent, DialogTitle
} from '@mui/material';
import Header from '../Component/Header';
import Sidebar from '../Component/Sidebar';
import { Container } from 'react-bootstrap';
import { viewBrand, deleteBrand } from '../services/allApi'; // Import deleteBrand function
import EditBrand from './EditBrand';

const ViewBrand = () => {
  const [brands, setBrands] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const data = await viewBrand();
        setBrands(data);
      } catch (error) {
        console.error('Error fetching brands:', error);
      }
    };

    fetchBrands();
  }, []);

  const handleEditClick = (brand) => {
    setSelectedBrand(brand);
    setIsEditModalOpen(true);
  };

  const handleEditModalClose = () => {
    setIsEditModalOpen(false);
    setSelectedBrand(null);
  };

  const handleBrandUpdated = (updatedBrand) => {
    setBrands((prevBrands) =>
      prevBrands.map((brand) => (brand.id === updatedBrand.id ? updatedBrand : brand))
    );
  };

  const handleDeleteClick = (brand) => {
    setSelectedBrand(brand);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteModalClose = () => {
    setIsDeleteModalOpen(false);
    setSelectedBrand(null);
  };

  const handleBrandDeleted = (deletedBrandId) => {
    setBrands((prevBrands) =>
      prevBrands.filter((brand) => brand.id !== deletedBrandId)
    );
    setIsDeleteModalOpen(false);
    setSelectedBrand(null);
  };

  const handleConfirmDelete = async () => {
    if (!selectedBrand) return;

    try {
      await deleteBrand(selectedBrand.id);
      handleBrandDeleted(selectedBrand.id);
      console.log('Brand deleted successfully');
    } catch (error) {
      console.error('Error deleting brand:', error);
      // Handle error if needed
    }
  };

  const vehicleCategories = [
    { label: 'Car', value: 1 },
    { label: 'Bike', value: 2 }
  ];

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
                          <TableCell align="center">Vehicle Category</TableCell>
                          <TableCell align="center">Electric</TableCell>
                          <TableCell align="center">Actions</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {brands.map((brand) => (
                          <TableRow key={brand.id}>
                            <TableCell align="center">{brand.name}</TableCell>
                            <TableCell align="center">
                              <img src={brand.image} style={{ height: 50 }} alt={brand.name} />
                            </TableCell>
                            <TableCell align="center">{brand.main_category.name}</TableCell>
                            <TableCell align="center">{brand.is_electric ? 'Yes' : 'No'}</TableCell>
                            <TableCell align="center">
                              <Button variant="contained" color="primary" sx={{ mr: 1 }} onClick={() => handleEditClick(brand)}>Edit</Button>
                              <Button variant="outlined" color="secondary" onClick={() => handleDeleteClick(brand)}>Delete</Button>
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
      <EditBrand
        open={isEditModalOpen}
        handleClose={handleEditModalClose}
        brand={selectedBrand}
        vehicleCategories={vehicleCategories}
        onBrandUpdated={handleBrandUpdated}
      />
      <Dialog open={isDeleteModalOpen} onClose={handleDeleteModalClose}>
        <DialogTitle>Delete Brand</DialogTitle>
        <DialogContent>
          <Typography variant="body1">
            Are you sure you want to delete {selectedBrand && selectedBrand.name}?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteModalClose} color="primary">Cancel</Button>
          <Button onClick={handleConfirmDelete} color="secondary">Delete</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ViewBrand;
