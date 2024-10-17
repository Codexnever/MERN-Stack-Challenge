import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

// Function to fetch statistics based on the provided month
export const getStatistics = async (month) => {
  const response = await axios.get(`${API_URL}/statistics`, { params: { month } });

  return response.data;
};

// Function to fetch transactions for a specific month with pagination and search capabilities
export const getTransactions = async (month, page, perPage, searchQuery) => {
  const response = await axios.get(`${API_URL}/transactions`, {
    params: { month, page, perPage, search: searchQuery },
  });
  return response.data;
};

export const getCombinedData = async (month) => {
  try {
    const response = await axios.get(`${API_URL}/combined`, {
      params: { month }
    })

    return response.data;
  } catch (error) {
    console.error('Error fetching combined data:', error);
    throw error; // Propagate the error
  }
};

// Function to fetch data for the bar chart based on the selected month
export const getBarChart = async (month) => {
  const response = await axios.get(`${API_URL}/bar-chart`, { params: { month } });
  return response.data;
};

export const getPieChart = async (month) => {
  const response = await axios.get(`${API_URL}/pie-chart`, { params: { month } });
  return response.data;
};
