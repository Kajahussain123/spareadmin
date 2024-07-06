import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Paper, Typography, Grid, TextField, Button, MenuItem, Box
} from '@mui/material';
import Header from '../Component/Header';
import Sidebar from '../Component/Sidebar';
import { Container } from 'react-bootstrap';
import { getCarBrands, getCarCategories, getCarVehicles, viewVehicle } from '../services/allApi';

const CarSpare = () => {
  const [productName, setProductName] = useState('');
  const [category, setCategory] = useState('');
  const [brand, setBrand] = useState('');
  const [vehicle, setVehicle] = useState('');
  const [year, setYear] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [highlight, setHighlight] = useState('');
  const [selectedImages, setSelectedImages] = useState([]);
  const [carBrands, setCarBrands] = useState([]);
  const [carCategories, setCarCategories] = useState([]);
  const [vehicles, setVehicles] = useState([]);

  useEffect(() => {
    const fetchCarBrands = async () => {
      try {
        const data = await getCarBrands();
        setCarBrands(data);
      } catch (error) {
        console.error('Error fetching car brands:', error);
      }
    };

    const fetchCarCategories = async () => {
      try {
        const data = await getCarCategories();
        setCarCategories(data);
      } catch (error) {
        console.error('Error fetching car categories:', error);
      }
    };

    fetchCarBrands();
    fetchCarCategories();
  }, []);

  const handleBrandSelect = async (brandId) => {
    try {
      const data = await getCarVehicles(brandId);  // Call viewVehicle API with brandId parameter
      setVehicles(data);
    } catch (error) {
      console.error('Error fetching vehicles:', error);
    }
  };

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

  const handleSubmit = (event) => {
    event.preventDefault();
    // handle form submission
    console.log({
      productName,
      category,
      brand,
      vehicle,
      year,
      price,
      description,
      highlight,
      selectedImages
    });
  };

  const electricBrands = carBrands.filter((brand) => brand.is_electric);
  const normalBrands = carBrands.filter((brand) => !brand.is_electric);

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
                    Add Car Spare
                  </Typography>
                  <form onSubmit={handleSubmit}>
                    <Grid container spacing={3}>
                      <Grid item xs={12}>
                        <TextField
                          label="Product Name"
                          fullWidth
                          required
                          value={productName}
                          onChange={(e) => setProductName(e.target.value)}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          select
                          label="Category"
                          fullWidth
                          required
                          value={category}
                          onChange={(e) => setCategory(e.target.value)}
                        >
                          {carCategories.map((option) => (
                            <MenuItem key={option.id} value={option.name}>
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
                          onChange={(e) => {
                            setBrand(e.target.value);
                            // Fetch vehicles for the selected brand
                            handleBrandSelect(e.target.value);
                          }}
                        >
                          <MenuItem disabled>Select Brand</MenuItem>
                          <MenuItem disabled>Normal Brands</MenuItem>
                          {normalBrands.map((option) => (
                            <MenuItem key={option.id} value={option.id}>
                              {option.name}
                            </MenuItem>
                          ))}
                          <MenuItem disabled>Electric Brands</MenuItem>
                          {electricBrands.map((option) => (
                            <MenuItem key={option.id} value={option.id}>
                              {option.name}
                            </MenuItem>
                          ))}
                        </TextField>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          select
                          label="Vehicle"
                          fullWidth
                          required
                          value={vehicle}
                          onChange={(e) => setVehicle(e.target.value)}
                        >
                          {vehicles.map((option) => (
                            <MenuItem key={option.id} value={option.name}>
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
                          label="Price"
                          type="number"
                          fullWidth
                          required
                          value={price}
                          onChange={(e) => setPrice(e.target.value)}
                        />
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
                        <TextField
                          label="Highlight"
                          fullWidth
                          required
                          value={highlight}
                          onChange={(e) => setHighlight(e.target.value)}
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
                      <Grid item xs={12} align="center">
                        <Button type="submit" variant="contained" sx={{ backgroundColor: '#3f51b5', color: '#fff' }}>
                          Submit
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

export default CarSpare;
