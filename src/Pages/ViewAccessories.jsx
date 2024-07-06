import React, { useState, useEffect } from 'react';
import {
  Paper, Typography, Grid, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle
} from '@mui/material';
import Header from '../Component/Header';
import Sidebar from '../Component/Sidebar';
import { Container } from 'react-bootstrap';
import { fetchAccessories, deleteAccessory } from '../services/allApi';
import EditAccessory from './EditAccessory';

// Helper function to truncate text
const truncateText = (text, maxLength) => {
  if (text.length > maxLength) {
    return text.substring(0, maxLength) + '...';
  }
  return text;
};

const ViewAccessories = () => {
  const [accessories, setAccessories] = useState([]);
  const [selectedAccessory, setSelectedAccessory] = useState(null);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [accessoryToDelete, setAccessoryToDelete] = useState(null);

  useEffect(() => {
    const getAccessories = async () => {
      try {
        const data = await fetchAccessories();
        setAccessories(data);
      } catch (error) {
        console.error('Error fetching accessories:', error);
      }
    };

    getAccessories();
  }, []);

  const handleEditClick = (accessory) => {
    setSelectedAccessory(accessory);
    setEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setEditModalOpen(false);
    setSelectedAccessory(null);
  };

  const handleDeleteClick = (accessory) => {
    setAccessoryToDelete(accessory);
    setDeleteModalOpen(true);
  };

  const handleCloseDeleteModal = () => {
    setDeleteModalOpen(false);
    setAccessoryToDelete(null);
  };

  const handleUpdate = async () => {
    try {
      const data = await fetchAccessories();
      setAccessories(data);
    } catch (error) {
      console.error('Error fetching accessories:', error);
    }
  };

  const handleConfirmDelete = async () => {
    try {
      await deleteAccessory(accessoryToDelete.id);
      handleUpdate();
      handleCloseDeleteModal();
    } catch (error) {
      console.error('Error deleting accessory:', error);
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
                    View Accessories
                  </Typography>
                  <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                      <TableHead>
                        <TableRow>
                          <TableCell align="center">Accessory Type</TableCell>
                          <TableCell align="center">Name</TableCell>
                          <TableCell align="center">Image</TableCell>
                          <TableCell align="center">Price</TableCell>
                          <TableCell align="center">Offer Price</TableCell>
                          <TableCell align="center">Discount</TableCell>
                          <TableCell align="center">Description</TableCell>
                          <TableCell align="center">Actions</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {accessories.map((accessory) => (
                          <TableRow key={accessory.id}>
                            <TableCell align="center">{accessory.accessory_type}</TableCell>
                            <TableCell align="center">{truncateText(accessory.accessory_name, 30)}</TableCell>
                            <TableCell align="center">
                              {accessory.accessory_images && accessory.accessory_images.length > 0 ? (
                                <img src={accessory.accessory_images[0].image} alt={accessory.accessory_name} style={{ height: 50 }} />
                              ) : (
                                'No Image'
                              )}
                            </TableCell>
                            <TableCell align="center">{accessory.price}</TableCell>
                            <TableCell align="center">{accessory.offer_price}</TableCell>
                            <TableCell align="center">{accessory.discount_percentage}</TableCell>
                            <TableCell align="center">{truncateText(accessory.description, 100)}</TableCell>
                            <TableCell align="center">
                              <Button variant="contained" color="primary" sx={{ mr: 1 }} onClick={() => handleEditClick(accessory)}>Edit</Button>
                              <Button variant="outlined" color="secondary" onClick={() => handleDeleteClick(accessory)}>Delete</Button>
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
      <EditAccessory
        open={editModalOpen}
        handleClose={handleCloseEditModal}
        accessory={selectedAccessory}
        onUpdate={handleUpdate}
      />
      <Dialog
        open={deleteModalOpen}
        onClose={handleCloseDeleteModal}
      >
        <DialogTitle>Delete Accessory</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this accessory? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteModal} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirmDelete} color="secondary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ViewAccessories;
