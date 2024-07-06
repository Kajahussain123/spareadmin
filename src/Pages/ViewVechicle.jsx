import React, { useState, useEffect } from 'react';
import {
  Paper, Typography, Grid, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Dialog, DialogTitle, DialogContent, DialogActions
} from '@mui/material';
import { Container } from 'react-bootstrap';
import Header from '../Component/Header';
import Sidebar from '../Component/Sidebar';
import { viewVehicles, updateVehicle, deleteVehicle, getCarBrands, getBikeBrands, viewVehicle } from '../services/allApi'; // Adjust paths as per your project structure
import EditVehicle from './EditVehicle'; // Assuming EditVehicle component is in the same directory

const ViewVehicle = () => {
  const [vehicles, setVehicles] = useState([]);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [vehicleCategories, setVehicleCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [error, setError] = useState('');
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [vehicleToDelete, setVehicleToDelete] = useState(null);

  useEffect(() => {
    fetchVehicles();
    fetchVehicleCategories();
  }, []);

  const fetchVehicles = async () => {
    try {
      const data = await viewVehicle();
      setVehicles(data);
    } catch (error) {
      console.error('Error fetching vehicles:', error);
    }
  };

  const fetchVehicleCategories = async () => {
    // Assuming you have a function to fetch vehicle categories
    // Example implementation
    try {
      // Fetch vehicle categories from backend or use a static list
      const categories = [
        { id: 1, name: 'Car' },
        { id: 2, name: 'Bike' }
        // Add more categories if needed
      ];
      setVehicleCategories(categories);
    } catch (error) {
      console.error('Error fetching vehicle categories:', error);
    }
  };

  const handleEditClick = (vehicle) => {
    setSelectedVehicle(vehicle);
    setOpenEditModal(true);
  };

  const handleCloseEditModal = () => {
    setOpenEditModal(false);
    setSelectedVehicle(null);
  };

  const handleUpdateVehicle = (updatedVehicle) => {
    setVehicles(prevVehicles =>
      prevVehicles.map(vehicle =>
        vehicle.id === updatedVehicle.id ? updatedVehicle : vehicle
      )
    );
    handleCloseEditModal();
  };

  const handleOpenDeleteDialog = (vehicleId) => {
    setVehicleToDelete(vehicleId);
    setOpenDeleteDialog(true);
  };

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
    setVehicleToDelete(null);
  };

  const handleDeleteVehicle = async () => {
    try {
      await deleteVehicle(vehicleToDelete);
      fetchVehicles(); // Refresh the list of vehicles after delete
      setOpenDeleteDialog(false); // Close the dialog after deletion
    } catch (error) {
      console.error('Error deleting vehicle:', error);
      setError('An error occurred while deleting the vehicle. Please try again.');
    }
  };

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
                    View Vehicles
                  </Typography>
                  <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                      <TableHead>
                        <TableRow>
                          <TableCell align="center">Name</TableCell>
                          <TableCell align="center">Image</TableCell>
                          <TableCell align="center">Year</TableCell>
                          <TableCell align="center">Brand</TableCell>
                          <TableCell align="center">Category</TableCell>
                          <TableCell align="center">Version Fuel Type</TableCell>
                          <TableCell align="center">Actions</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {vehicles.map((vehicle) => (
                          <TableRow key={vehicle.id}>
                            <TableCell align="center">{vehicle.name}</TableCell>
                            <TableCell align="center">
                              <img src={vehicle.image} alt={vehicle.name} style={{ height: 50 }} />
                            </TableCell>
                            <TableCell align="center">{vehicle.model_year}</TableCell>
                            <TableCell align="center">{vehicle.brand.name}</TableCell>
                            <TableCell align="center">{vehicle.vehicle_category.name}</TableCell>
                            <TableCell align="center">{vehicle.version_fuel_type}</TableCell>
                            <TableCell align="center">
                              <Button variant="contained" color="primary" sx={{ mr: 1 }} onClick={() => handleEditClick(vehicle)}>Edit</Button>
                              <Button variant="outlined" color="secondary" onClick={() => handleOpenDeleteDialog(vehicle.id)}>Delete</Button>
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

      {/* Edit Vehicle Modal */}
      <Dialog open={openEditModal} onClose={handleCloseEditModal} maxWidth="md" fullWidth>
        <EditVehicle
          open={openEditModal}
          handleClose={handleCloseEditModal}
          vehicle={selectedVehicle}
          vehicleCategories={vehicleCategories}
          brands={brands}
          onVehicleUpdated={handleUpdateVehicle}
        />
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={openDeleteDialog}
        onClose={handleCloseDeleteDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Delete Vehicle"}</DialogTitle>
        <DialogContent>
          <Typography variant="body1">
            Are you sure you want to delete this vehicle?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDeleteVehicle} color="secondary" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ViewVehicle;
