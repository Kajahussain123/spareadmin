import React, { useState, useEffect } from 'react';
import {
  Paper, Typography, Grid, TextField, Button, MenuItem, Box, ListSubheader
} from '@mui/material';
import Header from '../Component/Header';
import Sidebar from '../Component/Sidebar';
import { Container } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { addVehicle, getBikeBrands, getCarBrands } from '../services/allApi';

const AddVehicle = () => {
  const [vehicleName, setVehicleName] = useState('');
  const [brand, setBrand] = useState('');
  const [vehicleCategory, setVehicleCategory] = useState('');
  const [year, setYear] = useState('');
  const [fuelType, setFuelType] = useState('');
  const [image, setImage] = useState(null);
  const [brands, setBrands] = useState([]);
  const [electricBrands, setElectricBrands] = useState([]);

  const vehicleCategories = [
    { id: 1, name: 'Car' },
    { id: 2, name: 'Bike' }
  ];

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    setImage(file);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('name', vehicleName);
    formData.append('brand_id', brand);
    formData.append('vehicle_category_id', vehicleCategory);
    formData.append('model_year', year);
    formData.append('version_fuel_type', fuelType);
    if (image) {
      formData.append('image', image);
    }

    try {
      const response = await addVehicle(formData);
      toast.success('Vehicle added successfully!');
      clearFields();
      console.log('Vehicle added successfully:', response);
    } catch (error) {
      toast.error('Error adding vehicle!');
      console.error('Error adding vehicle:', error);
    }
  };

  const clearFields = () => {
    setVehicleName('');
    setBrand('');
    setVehicleCategory('');
    setYear('');
    setFuelType('');
    setImage(null);
  };

  const fetchBrands = async (category) => {
    try {
      let allBrands;
      if (category === 1) {
        allBrands = await getCarBrands();
      } else if (category === 2) {
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
      fetchBrands(vehicleCategory);
    }
  }, [vehicleCategory]);

  return (
    <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
      <Header />
      <Box sx={{ display: 'flex', minHeight: '100vh' }}>
        <Sidebar />
        <Box component="main" sx={{ flexGrow: 1, p: 3, backgroundColor: '#f4f6f8' }}>
          <Container className='mt-5'>
            <Grid container justifyContent="center">
              <Grid item xs={12} sm={10} md={8}>
                <Paper elevation={3} sx={{ padding: 4, backgroundColor: '#fff' }}>
                  <Typography variant="h4" component="h1" gutterBottom align="center" sx={{ fontWeight: 'bold', color: '#3f51b5' }}>
                    Add Vehicle
                  </Typography>
                  <form onSubmit={handleSubmit}>
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
                          onChange={(e) => setVehicleCategory(e.target.value)}
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
                      <Grid item xs={12} sm={6}>
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
                              sx={{ mt: 2 }}
                              onClick={() => clearFields()}
                            >
                              Cancel
                            </Button>
                          </Grid>
                          <Grid item xs={6}>
                            <Button
                              type="submit"
                              variant="contained"
                              fullWidth
                              sx={{ mt: 2, backgroundColor: "#3f51b5" }}
                            >
                              Add
                            </Button>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </form>
                </Paper>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </Box>
      <ToastContainer />
    </Box>
  );
};

export default AddVehicle;
