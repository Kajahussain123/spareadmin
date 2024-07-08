import React, { useState, useEffect } from 'react';
import {
  Paper, Typography, Grid, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton
} from '@mui/material';
import { PhotoCamera } from '@mui/icons-material';
import Header from '../Component/Header';
import Sidebar from '../Component/Sidebar';
import { Container } from 'react-bootstrap';
import { addAd, deleteAd, fetchAds } from '../services/allApi';

const Ads = () => {
  const [ads, setAds] = useState([]);
  const [newAd, setNewAd] = useState({ image: null });
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedAd, setSelectedAd] = useState(null);

  useEffect(() => {
    fetchAdsData();
  }, []);

  const fetchAdsData = async () => {
    try {
      const adsData = await fetchAds();
      setAds(adsData);
    } catch (error) {
      console.error('Error fetching ads:', error);
    }
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setNewAd({ image: file });
    }
  };

  const handleAddAd = async () => {
    if (newAd.image) {
      try {
        await addAd(newAd.image);
        fetchAdsData();
        setNewAd({ image: null });
      } catch (error) {
        console.error('Error adding ad:', error);
      }
    }
  };

  const handleDeleteClick = (ad) => {
    setSelectedAd(ad);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteModalClose = () => {
    setIsDeleteModalOpen(false);
    setSelectedAd(null);
  };

  const handleConfirmDelete = async () => {
    try {
      await deleteAd(selectedAd.id);
      fetchAdsData();
      setIsDeleteModalOpen(false);
      setSelectedAd(null);
    } catch (error) {
      console.error('Error deleting ad:', error);
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
                    Manage Ads
                  </Typography>
                  <Grid container spacing={2} alignItems="center">
                    <Grid item>
                      <input
                        accept="image/*"
                        style={{ display: 'none' }}
                        id="ad-image-upload"
                        type="file"
                        onChange={handleImageChange}
                      />
                      <label htmlFor="ad-image-upload">
                        <IconButton color="primary" aria-label="upload picture" component="span">
                          <PhotoCamera />
                        </IconButton>
                      </label>
                      {newAd.image && <img src={URL.createObjectURL(newAd.image)} alt="Ad" style={{ height: 50, marginLeft: 10 }} />}
                    </Grid>
                    <Grid item>
                      <Button variant="contained" color="primary" onClick={handleAddAd}>
                        Add Ad
                      </Button>
                    </Grid>
                  </Grid>
                  <TableContainer component={Paper} className="mt-4">
                    <Table sx={{ minWidth: 650 }} aria-label="ads table">
                      <TableHead>
                        <TableRow>
                          <TableCell align="center">Image</TableCell>
                          <TableCell align="center">Actions</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {ads.map((ad) => (
                          <TableRow key={ad.id}>
                            <TableCell align="center">
                              <img src={ad.image} alt="Ad" style={{ height: 50 }} />
                            </TableCell>
                            <TableCell align="center">
                              <Button variant="outlined" color="secondary" onClick={() => handleDeleteClick(ad)}>Delete</Button>
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
      <Dialog open={isDeleteModalOpen} onClose={handleDeleteModalClose}>
        <DialogTitle>Delete Ad</DialogTitle>
        <DialogContent>
          <Typography variant="body1">
            Are you sure you want to delete this ad?
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

export default Ads;
