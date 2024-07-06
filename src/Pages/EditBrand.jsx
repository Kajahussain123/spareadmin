import React, { useState, useEffect } from 'react';
import {
  Paper, Typography, Grid, TextField, Button, MenuItem, Box, Radio, RadioGroup, FormControlLabel, FormControl, FormLabel, Dialog, DialogActions, DialogContent, DialogTitle
} from '@mui/material';
import { editBrand } from '../services/allApi'; // Make sure to create this function

const EditBrand = ({ open, handleClose, brand, vehicleCategories, onBrandUpdated }) => {
  const [brandName, setBrandName] = useState('');
  const [vehicleCategory, setVehicleCategory] = useState('');
  const [logo, setLogo] = useState(null);
  const [isElectric, setIsElectric] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (brand) {
      setBrandName(brand.name);
      setVehicleCategory(brand.main_category.id);
      setLogo(null);
      setIsElectric(brand.is_electric ? 'true' : 'false');
    }
  }, [brand]);

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    setLogo(file);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    if (!brandName || !vehicleCategory || isElectric === '') {
      setError('All fields are required.');
      return;
    }

    const formData = new FormData();
    formData.append('name', brandName);
    formData.append('main_category_id', vehicleCategory);
    if (logo) {
      formData.append('image', logo);
    }
    formData.append('is_electric', isElectric);

    try {
      const response = await editBrand(brand.id, formData);
      console.log('Brand updated successfully', response);
      onBrandUpdated(response); // Callback to update the brand list in ViewBrand
      handleClose();
    } catch (error) {
      console.error('Error updating brand', error);
      setError('An error occurred while updating the brand. Please try again.');
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
      <DialogTitle>Edit Brand</DialogTitle>
      <DialogContent>
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
            {error && <Grid item xs={12}><Typography color="error" align="center">{error}</Typography></Grid>}
          </Grid>
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="secondary">Cancel</Button>
        <Button onClick={handleSubmit} variant="contained" color="primary">Save</Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditBrand;
