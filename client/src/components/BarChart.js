// BarChart.js
import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Paper, Typography, Box } from '@mui/material';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const BarChart = ({ data }) => {
  const labels = Object.keys(data);
  const values = Object.values(data);

  const chartData = {
    labels,
    datasets: [
      {
        label: 'Number of Transactions',
        backgroundColor: 'rgba(75,192,192,0.6)',
        borderColor: 'rgba(75,192,192,1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(75,192,192,0.8)',
        hoverBorderColor: 'rgba(75,192,192,1)',
        data: values,
      },
    ],
  };

  return (
    <Box mt={4} style={{ width: '100%', maxWidth: '45%' }}>
      <Paper elevation={3} style={{ padding: '10px' }}>
        <Typography variant="h6" gutterBottom>
          Price Range Distribution
        </Typography>
        <Bar data={chartData} />
      </Paper>
    </Box>
  );
};

export default BarChart;
