import React, { useState } from 'react';
import {
  Paper, Typography, Grid, TextField, Button, MenuItem, Box, Radio, RadioGroup, FormControlLabel, FormControl, FormLabel
} from '@mui/material';
import Header from '../Component/Header';
import Sidebar from '../Component/Sidebar';
import { Container } from 'react-bootstrap';

const AddVehicle = () => {
  const [vehicleName, setVehicleName] = useState('');
  const [brand, setBrand] = useState('');
  const [vehicleCategory, setVehicleCategory] = useState('');
  const [year, setYear] = useState('');
  const [isElectric, setIsElectric] = useState('');
  const [version, setVersion] = useState('');
  const [fuelType, setFuelType] = useState('');
  const [image, setImage] = useState(null);

  const brands = ['Brand 1', 'Brand 2', 'Brand 3'];
  const vehicleCategories = ['Category 1', 'Category 2', 'Category 3'];

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    setImage(file);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // handle form submission
    console.log({
      vehicleName,
      brand,
      vehicleCategory,
      year,
      isElectric,
      version,
      fuelType,
      image
    });
  };

  return (
    <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
      <Header />
      <Box sx={{ display: 'flex', minHeight: '100vh' }}>
        <Sidebar />
        <Box component="main" sx={{ flexGrow: 1, p: 3, backgroundColor: '#f4f6f8' }}>
          <Container>
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
                          label="Brand"
                          fullWidth
                          required
                          value={brand}
                          onChange={(e) => setBrand(e.target.value)}
                        >
                          {brands.map((option) => (
                            <MenuItem key={option} value={option}>
                              {option}
                            </MenuItem>
                          ))}
                        </TextField>
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
                            <MenuItem key={option} value={option}>
                              {option}
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
                        <FormControl component="fieldset">
                          <FormLabel component="legend">Is Electric</FormLabel>
                          <RadioGroup
                            row
                            value={isElectric}
                            onChange={(e) => setIsElectric(e.target.value)}
                          >
                            <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                            <FormControlLabel value="no" control={<Radio />} label="No" />
                          </RadioGroup>
                        </FormControl>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          label="Version"
                          fullWidth
                          required
                          value={version}
                          onChange={(e) => setVersion(e.target.value)}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          label="Fuel Type"
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
                      <Grid item xs={12} sm={6}>
                        <Button
                          variant="outlined"
                          fullWidth
                          sx={{ mt: 2 }}
                          onClick={() => console.log('Cancelled')}
                        >
                          Cancel
                        </Button>
                      </Grid>
                      <Grid item xs={12} sm={6}>
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
                  </form>
                </Paper>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </Box>
    </Box>
  );
};

export default AddVehicle;
