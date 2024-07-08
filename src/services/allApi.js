import axios from "axios";
import { BASE_URL } from "./baseUrl";
import { commonApi } from "./commonApi";


// add brands
export const addBrand = async (formData) => {
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    };
    
    const response = await axios.post(`${BASE_URL}/api/brands/`, formData, config);
    return response.data;
 };

// view brands 
export const viewBrand = async (body) => {
    try {
      const response = await axios.get(`${BASE_URL}/api/brands/`, {
        params: body,
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching brands:', error);
      throw error;
    }
  };

// edit brand
export const editBrand = async (id, formData) => {
    const response = await axios.put(`${BASE_URL}/api/brands/${id}/`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data;
  };

// delete brand 
  export const deleteBrand = async (id, formData) => {
    const response = await axios.delete(`${BASE_URL}/api/brands/${id}/`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data;
  };

  // view vehicles
  export const viewVehicle = async (body) => {
    try {
      const response = await axios.get(`${BASE_URL}/api/vehicles/`, {
        params: body,
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching brands:', error);
      throw error;
    }
  };


// get car brands
  export const getCarBrands = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/brands/main-categories/1/`);
      return response.data;
    } catch (error) {
      console.error('Error fetching car brands:', error);
      throw error;
    }
  };
  

  // get bike brands
  export const getBikeBrands = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/brands/main-categories/2/`);
      return response.data;
    } catch (error) {
      console.error('Error fetching bike brands:', error);
      throw error;
    }
  };


  // add vehicle
  export const addVehicle = async (vehicleData) => {
    try {
      const response = await axios.post(`${BASE_URL}/api/vehicles/`, vehicleData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  };

// add accessories
  export const addAccessory = async (formData) => {
    const response = await axios.post(`${BASE_URL}/api/accessory/`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  };

  
  // get all accessories
  export const fetchAccessories = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/accessory/`);
      return response.data;
    } catch (error) {
      console.error('Error fetching accessories:', error);
      throw error;
    }
  };

  // Function to update a vehicle
  export const updateVehicle = async (id, formData) => {
    const response = await axios.put(`${BASE_URL}/api/vehicles/${id}/`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data;
  };


// delete vehicle
export const deleteVehicle = async (id, formData) => {
  const response = await axios.delete(`${BASE_URL}/api/vehicles/${id}/`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
  return response.data;
};

// update accessory
export const updateAccessory = async (id, formData) => {
  const response = await fetch(`${BASE_URL}/api/accessory/${id}/`, {
    method: 'PUT',
    body: formData
  });
  if (!response.ok) {
    throw new Error('Failed to update accessory');
  }
  return await response.json();
};

// delete accessory
export const deleteAccessory = async (id) => {
  const response = await axios.delete(`${BASE_URL}/api/accessory/${id}/`);
  return response.data;
};

// fetch car categories
export const getCarCategories = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/api/categories-view/1/`);
    return response.data;
  } catch (error) {
    console.error('Error fetching bike brands:', error);
    throw error;
  }
};


export const getCarVehicles = async (brandId) => {
  try {
    const response = await axios.get(`${BASE_URL}/api/main_category/1/brand/${brandId}/vehicles/`);
    return response.data;
  } catch (error) {
    console.error('Error fetching vehicles:', error);
    throw error;
  }
};


export const fetchAds = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/api/CarouselImage/`);
    return response.data;
  } catch (error) {
    console.error('Error fetching ads:', error);
    throw error;
  }
};

export const addAd = async (image) => {
  const formData = new FormData();
  formData.append('image', image);
  
  try {
    await axios.post(`${BASE_URL}/api/CarouselImage/`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
  } catch (error) {
    console.error('Error adding ad:', error);
    throw error;
  }
};

export const deleteAd = async (adId) => {
  try {
    await axios.delete(`${BASE_URL}/api/CarouselImage/${adId}/`);
  } catch (error) {
    console.error('Error deleting ad:', error);
    throw error;
  }
};