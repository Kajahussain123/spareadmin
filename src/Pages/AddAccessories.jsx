import React, { useState, useEffect } from 'react';
import {
  Paper, Typography, Grid, TextField, Button, MenuItem, Box, Snackbar
} from '@mui/material';
import Header from '../Component/Header';
import Sidebar from '../Component/Sidebar';
import { Container } from 'react-bootstrap';
import MuiAlert from '@mui/material/Alert';
import { addAccessory } from '../services/allApi';

const AddAccessories = () => {
  const [accessoryType, setAccessoryType] = useState('');
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [offerPrice, setOfferPrice] = useState('');
  const [discount, setDiscount] = useState('');
  const [selectedImages, setSelectedImages] = useState([]);
  const [toastOpen, setToastOpen] = useState(false);

  const accessoryTypes = ['Car', 'Bike'];

  useEffect(() => {
    if (price && offerPrice) {
      const calculatedDiscount = ((price - offerPrice) / price) * 100;
      setDiscount(calculatedDiscount.toFixed(2));
    }
  }, [price, offerPrice]);

  const handleFileSelect = (event) => {
    const files = event.target.files;
    const fileObjects = Array.from(files);
    setSelectedImages(fileObjects);
  };

  const removeImage = (index) => {
    const newImages = [...selectedImages];
    newImages.splice(index, 1);
    setSelectedImages(newImages);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('accessory_type', accessoryType);
    formData.append('accessory_name', name);
    formData.append('price', price);
    formData.append('description', description);
    formData.append('offer_price', offerPrice);
    formData.append('discount_percentage', discount);
    selectedImages.forEach((image, index) => {
      formData.append(`accessory_image_files[${index}]`, image);
    });

    try {
      await addAccessory(formData);
      setToastOpen(true);
      // Clear the form fields
      setAccessoryType('');
      setName('');
      setPrice('');
      setDescription('');
      setOfferPrice('');
      setDiscount('');
      setSelectedImages([]);
    } catch (error) {
      console.error('Error adding accessory:', error);
    }
  };

  const handleToastClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setToastOpen(false);
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
                    Add Accessories
                  </Typography>
                  <form onSubmit={handleSubmit}>
                    <Grid container spacing={3}>
                      <Grid item xs={12}>
                        <TextField
                          select
                          label="Accessories Type"
                          fullWidth
                          required
                          value={accessoryType}
                          onChange={(e) => setAccessoryType(e.target.value)}
                        >
                          {accessoryTypes.map((option) => (
                            <MenuItem key={option} value={option}>
                              {option}
                            </MenuItem>
                          ))}
                        </TextField>
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          label="Name"
                          fullWidth
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          label="Price"
                          type="number"
                          fullWidth
                          required
                          value={price}
                          onChange={(e) => setPrice(e.target.value)}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6} container spacing={2}>
                        <Grid item xs={6}>
                          <TextField
                            label="Offer Price"
                            type="number"
                            fullWidth
                            required
                            value={offerPrice}
                            onChange={(e) => setOfferPrice(e.target.value)}
                          />
                        </Grid>
                        <Grid item xs={6}>
                          <TextField
                            label="Discount %"
                            type="text"
                            fullWidth
                            disabled
                            value={discount}
                          />
                        </Grid>
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          label="Description"
                          multiline
                          rows={4}
                          fullWidth
                          required
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <Typography variant="subtitle1" gutterBottom>
                          Choose Image
                        </Typography>
                        <Box className="imageContainer" sx={{ display: 'flex', flexWrap: 'wrap' }}>
                          {selectedImages.map((file, index) => (
                            <Box className="imgdiv" key={index} sx={{ position: 'relative', marginRight: 2, marginBottom: 2 }}>
                              <Button 
                                variant="contained" 
                                color="secondary" 
                                onClick={() => removeImage(index)} 
                                sx={{ 
                                  position: 'absolute', 
                                  top: 0, 
                                  right: 0, 
                                  minWidth: 'unset', 
                                  width: '18px', 
                                  height: '18px', 
                                  padding: 0,
                                  fontSize: '10px'
                                }}
                              >
                                X
                              </Button>
                              <img 
                                className="subimage" 
                                src={URL.createObjectURL(file)} 
                                alt={`Image ${index}`} 
                                style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '4px' }} 
                              />
                            </Box>
                          ))}
                        </Box>
                        <Box
                          sx={{
                            paddingTop: 3,
                            border: '2px dashed #aaa',
                            width: '100%',
                            height: '20vh',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer',
                            marginTop: 2,
                          }}
                          onClick={() => document.getElementById("fileInput").click()}
                        >
                          <Typography variant="body1" sx={{ color: '#0468d5' }}>
                            Drag Product Photos here or <span style={{ textDecoration: 'underline' }}>Browse from device</span>
                          </Typography>
                          <input onChange={handleFileSelect} type="file" id="fileInput" multiple style={{ display: 'none' }} />
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
      <Snackbar open={toastOpen} autoHideDuration={6000} onClose={handleToastClose}>
        <MuiAlert onClose={handleToastClose} severity="success" sx={{ width: '100%' }}>
          Accessory added successfully!
        </MuiAlert>
      </Snackbar>
    </Box>
  );
};

export default AddAccessories;
