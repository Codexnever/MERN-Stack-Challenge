// PieChart.js
import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Paper, Typography, Box } from '@mui/material';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = ({ data }) => {
  const labels = Object.keys(data);
  const values = Object.values(data);

  const chartData = {
    labels,
    datasets: [
      {
        label: 'Transaction Categories',
        data: values,
        backgroundColor: [
          'rgba(75,192,192,0.6)',
          'rgba(255,99,132,0.6)',
          'rgba(255,206,86,0.6)',
          'rgba(54,162,235,0.6)',
        ],
      },
    ],
  };

  return (
    <Box mt={4} style={{ width: '100%', maxWidth: '45%' }}>
      <Paper elevation={3} style={{ padding: '40px', height: '300px' }}> 
        <Typography variant="h6" gutterBottom>
          Transaction Category Distribution
        </Typography>
        <Pie 
          data={chartData} 
          options={{ maintainAspectRatio: false }} 
        />
      </Paper>
    </Box>
  );
};

export default PieChart;
