import React, { useState } from 'react';
import {
  Paper, Typography, Grid, TextField, Button, MenuItem, Box, Radio, RadioGroup, FormControlLabel, FormControl, FormLabel
} from '@mui/material';
import Header from '../Component/Header';
import Sidebar from '../Component/Sidebar';
import { Container } from 'react-bootstrap';
import { addBrand } from '../services/allApi';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddBrand = () => {
  const [brandName, setBrandName] = useState('');
  const [vehicleCategory, setVehicleCategory] = useState('');
  const [logo, setLogo] = useState(null);
  const [isElectric, setIsElectric] = useState('');
  const [error, setError] = useState('');

  const vehicleCategories = [
    { label: 'Car', value: 1 },
    { label: 'Bike', value: 2 }
  ];

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    setLogo(file);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    if (!brandName || !vehicleCategory || !logo || isElectric === '') {
      setError('All fields are required.');
      return;
    }

    const formData = new FormData();
    formData.append('name', brandName);
    formData.append('main_category_id', vehicleCategory);
    formData.append('image', logo);
    formData.append('is_electric', isElectric);

    try {
      const response = await addBrand(formData);
      console.log('Brand added successfully', response);
      toast.success('Brand added successfully!');
    } catch (error) {
      console.error('Error adding brand', error);
      setError('An error occurred while adding the brand. Please try again.');
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
              <Grid item xs={12} sm={10} md={8}>
                <Paper elevation={3} sx={{ padding: 4, backgroundColor: '#fff' }}>
                  <Typography variant="h4" component="h1" gutterBottom align="center" sx={{ fontWeight: 'bold', color: '#3f51b5' }}>
                    Add Brand
                  </Typography>
                  {error && <Typography color="error" align="center">{error}</Typography>}
                  <form onSubmit={handleSubmit} encType="multipart/form-data">
                    <Grid container spacing={3}>
                      <Grid item xs={12}>
                        <TextField
                          label="Brand Name"
                          fullWidth
                          required
                          value={brandName}
                          onChange={(e) => setBrandName(e.target.value)}
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
                            <MenuItem key={option.value} value={option.value}>
                              {option.label}
                            </MenuItem>
                          ))}
                        </TextField>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <FormControl component="fieldset">
                          <FormLabel component="legend">Is Electric</FormLabel>
                          <RadioGroup
                            row
                            value={isElectric}
                            onChange={(e) => setIsElectric(e.target.value)}
                          >
                            <FormControlLabel value="true" control={<Radio />} label="Yes" />
                            <FormControlLabel value="false" control={<Radio />} label="No" />
                          </RadioGroup>
                        </FormControl>
                      </Grid>
                      <Grid item xs={12}>
                        <Typography variant="subtitle1" gutterBottom>
                          Choose Logo
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <input
                            onChange={handleFileSelect}
                            type="file"
                            accept="image/*"
                            style={{ display: 'none' }}
                            id="logoInput"
                          />
                          <Button variant="contained" component="span" onClick={() => document.getElementById('logoInput').click()}>
                            Browse
                          </Button>
                          {logo && <Typography variant="body1" sx={{ marginLeft: 2 }}>{logo.name}</Typography>}
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
      <ToastContainer />
    </Box>
  );
};

export default AddBrand;
