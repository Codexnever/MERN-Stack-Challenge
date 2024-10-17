import React, { useEffect, useState } from 'react';
import { Typography, Paper, Box, Slide } from '@mui/material';
import axios from 'axios';

const Statistics = ({ month, year }) => {
  const [data, setData] = useState({
    totalSaleAmount: 0,
    soldItems: 0,
    notSoldItems: 0
  });

  const monthToYearMonth = (monthName, year) => {
    const monthIndex = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ].indexOf(monthName);
    return `${year}-${String(monthIndex + 1).padStart(2, '0')}`;
  };

  useEffect(() => {
    const fetchStatistics = async () => {
      try {
        const API_URL ='http://localhost:5000';
        const formattedMonth = monthToYearMonth(month, year); 
        const response = await axios.get(`${API_URL}/api/statistics`, {
          params: { month: formattedMonth }, 
        });

        const transactions = response.data; 
        const totalSaleAmount = Array.isArray(transactions) ? transactions.reduce((acc, curr) => acc + (curr.price || 0), 0) : 0;
        const soldItems = Array.isArray(transactions) ? transactions.filter(t => t.sold).length : 0;
        const notSoldItems = Array.isArray(transactions) ? transactions.filter(t => !t.sold).length : 0;

        setData({
          totalSaleAmount,
          soldItems,
          notSoldItems,
        });
      } catch (error) {
        console.error('Error fetching statistics:', error);
      }
    };

    fetchStatistics();
  }, [month, year]); 

  return (
    <Slide direction="up" in={true} mountOnEnter unmountOnExit>
      <Box mt={4} height="300px">
        <Paper elevation={3} style={{ padding: '20px', backgroundColor: '#f5f5f5', borderRadius: '8px' }}>
          <Typography variant="h6" color="primary">Total Sale Amount: ${data.totalSaleAmount.toFixed(2)}</Typography>
          <Typography variant="h6" color="success.main">Sold Items: {data.soldItems}</Typography>
          <Typography variant="h6" color="error.main">Not Sold Items: {data.notSoldItems}</Typography>
        </Paper>
      </Box>
    </Slide>
  );
};

export default Statistics;
