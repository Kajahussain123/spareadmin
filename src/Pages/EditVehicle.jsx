import React, { useState, useEffect } from 'react';
import {
  Paper, Typography, Grid, TextField, Button, MenuItem, Box, ListSubheader
} from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { updateVehicle, getCarBrands, getBikeBrands } from '../services/allApi';

const EditVehicle = ({ open, handleClose, vehicle, vehicleCategories, onVehicleUpdated }) => {
  const [vehicleName, setVehicleName] = useState('');
  const [brand, setBrand] = useState('');
  const [vehicleCategory, setVehicleCategory] = useState('');
  const [year, setYear] = useState('');
  const [fuelType, setFuelType] = useState('');
  const [image, setImage] = useState(null);
  const [brands, setBrands] = useState([]);
  const [electricBrands, setElectricBrands] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    if (vehicle) {
      setVehicleName(vehicle.name);
      setBrand(vehicle.brand.id);
      setVehicleCategory(vehicle.vehicle_category.id);
      setYear(vehicle.model_year);
      setFuelType(vehicle.version_fuel_type);
    }
  }, [vehicle]);

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    setImage(file);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Check if required fields are empty
    if (!vehicleName || !brand || !vehicleCategory || !year || !fuelType || !image) {
      setError('All fields are required.');
      return;
    }

    const formData = new FormData();
    formData.append('name', vehicleName);
    formData.append('brand_id', brand); // Ensure `brand` is the ID
    formData.append('vehicle_category_id', vehicleCategory); // Ensure `vehicleCategory` is the ID
    formData.append('model_year', year);
    formData.append('version_fuel_type', fuelType);
    formData.append('image', image); // Ensure `image` is the file object

    try {
      const response = await updateVehicle(vehicle.id, formData);
      console.log('Vehicle updated successfully:', response);
      toast.success('Vehicle updated successfully!');
      onVehicleUpdated(response); // Callback to update the vehicle list in ViewVehicle
      handleClose();
    } catch (error) {
      console.error('Error updating vehicle:', error);
      if (error.response) {
        console.error('Response data:', error.response.data);
        console.error('Response status:', error.response.status);
        console.error('Response headers:', error.response.headers);
        toast.error(`Error updating vehicle: ${error.response.data.detail || 'Check console for details.'}`);
      } else if (error.request) {
        console.error('Request data:', error.request);
        toast.error('Error updating vehicle: No response received from server.');
      } else {
        console.error('Error message:', error.message);
        toast.error(`Error updating vehicle: ${error.message}`);
      }
    }
  };

  const fetchBrandsByCategory = async (categoryId) => {
    try {
      let allBrands;
      if (categoryId === 1) {
        allBrands = await getCarBrands();
      } else if (categoryId === 2) {
        allBrands = await getBikeBrands();
      }
      setBrands(allBrands.filter(brand => !brand.is_electric));
      setElectricBrands(allBrands.filter(brand => brand.is_electric));
    } catch (error) {
      console.error('Error fetching brands:', error);
    }
  };

  useEffect(() => {
    if (vehicleCategory) {
      fetchBrandsByCategory(vehicleCategory);
    }
  }, [vehicleCategory]);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Paper elevation={3} sx={{ padding: 4, backgroundColor: '#fff', width: '100%' }}>
        <Typography variant="h5" gutterBottom align="center" sx={{ fontWeight: 'bold', color: '#3f51b5' }}>
          Edit Vehicle
        </Typography>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                label="Vehicle Name"
                fullWidth
                required
                value={vehicleName}
                onChange={(e) => setVehicleName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                select
                label="Vehicle Category"
                fullWidth
                required
                value={vehicleCategory}
                onChange={(e) => {
                  setVehicleCategory(e.target.value);
                  fetchBrandsByCategory(e.target.value); // Fetch brands when category changes
                }}
              >
                {vehicleCategories.map((option) => (
                  <MenuItem key={option.id} value={option.id}>
                    {option.name}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                select
                label="Brand"
                fullWidth
                required
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
              >
                <ListSubheader>Available brands</ListSubheader>
                {brands.map((option) => (
                  <MenuItem key={option.id} value={option.id}>
                    {option.name}
                  </MenuItem>
                ))}
                <ListSubheader>EV brands</ListSubheader>
                {electricBrands.map((option) => (
                  <MenuItem key={option.id} value={option.id}>
                    {option.name}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Year"
                type="number"
                fullWidth
                required
                value={year}
                onChange={(e) => setYear(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Version/Fuel Type"
                fullWidth
                required
                value={fuelType}
                onChange={(e) => setFuelType(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="subtitle1" gutterBottom>
                Choose Image
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <input onChange={handleFileSelect} type="file" style={{ display: 'none' }} id="imageInput" />
                <Button variant="contained" component="span" onClick={() => document.getElementById('imageInput').click()}>
                  Browse
                </Button>
                {image && <Typography variant="body1" sx={{ marginLeft: 2 }}>{image.name}</Typography>}
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Button
                    variant="outlined"
                    fullWidth
                    onClick={handleClose}
                  >
                    Cancel
                  </Button>
                </Grid>
                <Grid item xs={6}>
                  <Button
                    type="submit"
                    variant="contained"
                    fullWidth
                    sx={{ backgroundColor: "#3f51b5", color: '#fff' }}
                  >
                    Save Changes
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Box>
  );
};

export default EditVehicle;
