// API Configuration
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';

export const getConceptBooks = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/concept-books`);
    return await response.json();
  } catch (error) {
    console.error('Error fetching concept books:', error);
    return null;
  }
};

export const getComponents = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/components`);
    return await response.json();
  } catch (error) {
    console.error('Error fetching components:', error);
    return null;
  }
};

export const getProducts = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/products`);
    return await response.json();
  } catch (error) {
    console.error('Error fetching products:', error);
    return null;
  }
};

export const getCertifications = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/certifications`);
    return await response.json();
  } catch (error) {
    console.error('Error fetching certifications:', error);
    return null;
  }
};

export const submitContactForm = async (formData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/contact`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });
    return await response.json();
  } catch (error) {
    console.error('Error submitting contact form:', error);
    return null;
  }
};

export default API_BASE_URL;
