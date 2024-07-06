import React, { useState, useEffect } from 'react';
import {
  Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, MenuItem, Box, Typography
} from '@mui/material';
import { updateAccessory } from '../services/allApi';

const EditAccessory = ({ open, handleClose, accessory, onUpdate }) => {
  const [accessoryType, setAccessoryType] = useState('');
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [offerPrice, setOfferPrice] = useState('');
  const [discount, setDiscount] = useState('');
  const [selectedImages, setSelectedImages] = useState([]);

  const accessoryTypes = ['Car', 'Bike'];

  useEffect(() => {
    if (accessory) {
      setAccessoryType(accessory.accessory_type);
      setName(accessory.accessory_name);
      setPrice(accessory.price);
      setDescription(accessory.description);
      setOfferPrice(accessory.offer_price);
      setDiscount(accessory.discount_percentage);
      setSelectedImages(accessory.accessory_images.map(image => ({
        url: image, // Assuming image is a URL
        file: null // File object will be set if it's a new file
      })));
    }
  }, [accessory]);

  useEffect(() => {
    if (price && offerPrice) {
      const calculatedDiscount = ((price - offerPrice) / price) * 100;
      setDiscount(calculatedDiscount.toFixed(2));
    }
  }, [price, offerPrice]);

  const handleFileSelect = (event) => {
    const files = event.target.files;
    const fileObjects = Array.from(files).map(file => ({
      url: URL.createObjectURL(file),
      file: file
    }));
    setSelectedImages([...selectedImages, ...fileObjects]);
  };

  const removeImage = (index) => {
    const updatedImages = [...selectedImages];
    updatedImages.splice(index, 1);
    setSelectedImages(updatedImages);
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
      if (image.file) {
        formData.append(`accessory_image_files[${index}]`, image.file);
      }
    });

    try {
      await updateAccessory(accessory.id, formData);
      onUpdate();
      handleClose();
    } catch (error) {
      console.error('Error updating accessory:', error);
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
      <DialogTitle>Edit Accessory</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <Box sx={{ mt: 2 }}>
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
          </Box>
          <Box sx={{ mt: 2 }}>
            <TextField
              label="Name"
              fullWidth
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Box>
          <Box sx={{ mt: 2, display: 'flex', gap: 2 }}>
            <TextField
              label="Price"
              type="number"
              fullWidth
              required
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
            <TextField
              label="Offer Price"
              type="number"
              fullWidth
              required
              value={offerPrice}
              onChange={(e) => setOfferPrice(e.target.value)}
            />
            <TextField
              label="Discount %"
              type="text"
              fullWidth
              disabled
              value={discount}
            />
          </Box>
          <Box sx={{ mt: 2 }}>
            <TextField
              label="Description"
              multiline
              rows={4}
              fullWidth
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Box>
          <Box sx={{ mt: 2 }}>
            <Typography variant="subtitle1" gutterBottom>
              Choose Image
            </Typography>
            <Box className="imageContainer" sx={{ display: 'flex', flexWrap: 'wrap' }}>
              {selectedImages.map((image, index) => (
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
                    src={image.file ? URL.createObjectURL(image.file) : image.url} 
                    alt={`Image ${index}`} 
                    style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '4px' }} 
                    onError={() => console.log(`Error loading image at index ${index}`)}
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
              onClick={() => document.getElementById("editFileInput").click()}
            >
              <Typography variant="body1" sx={{ color: '#0468d5' }}>
                Drag Product Photos here or <span style={{ textDecoration: 'underline' }}>Browse from device</span>
              </Typography>
              <input onChange={handleFileSelect} type="file" id="editFileInput" multiple style={{ display: 'none' }} />
            </Box>
          </Box>
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} variant="contained" color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditAccessory;
