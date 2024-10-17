import React, { useState, useEffect } from 'react';
import { Container, Typography, FormControl, Select, MenuItem, CircularProgress, Box, Slide } from '@mui/material';
import Statistics from './components/Statistics';
import TransactionsTable from './components/TransactionsTable';
import BarChart from './components/BarChart';
import PieChart from './components/PieChart';
import { getStatistics, getBarChart, getPieChart } from './api/api';

function App() {
  const [month, setMonth] = useState('March');
  const [year, setYear] = useState(new Date().getFullYear());
  const [loading, setLoading] = useState(false);
  const [statistics, setStatistics] = useState({});
  const [barChartData, setBarChartData] = useState({});
  const [pieChartData, setPieChartData] = useState({});

  const monthToYearMonth = (monthName, year) => {
    const monthIndex = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ].indexOf(monthName);
    return `${year}-${String(monthIndex + 1).padStart(2, '0')}`;
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const formattedMonth = monthToYearMonth(month, year);

        const stats = await getStatistics(formattedMonth);
        const barData = await getBarChart(formattedMonth);
        const pieData = await getPieChart(formattedMonth);

        setStatistics(stats);
        setBarChartData(barData);
        setPieChartData(pieData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [month, year]);

  return (
    <Container>
      <Typography variant="h3" align="center" gutterBottom>
        Transactions Dashboard
      </Typography>

      <FormControl fullWidth>
        <Select value={month} onChange={(e) => setMonth(e.target.value)} displayEmpty>
          {["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"].map((m) => (
            <MenuItem key={m} value={m}>{m}</MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl fullWidth style={{ marginTop: '20px' }}>
        <Select value={year} onChange={(e) => setYear(e.target.value)} displayEmpty>
          {Array.from({ length: 10 }, (_, i) => new Date().getFullYear() - i).map((y) => (
            <MenuItem key={y} value={y}>{y}</MenuItem>
          ))}
        </Select>
      </FormControl>

      {loading ? (
        <CircularProgress style={{ marginTop: '20px' }} />
      ) : (
        <>
          <Box display="flex" justifyContent="space-between" mt={4} flexWrap="wrap">
            <Slide direction="up" in={true} mountOnEnter unmountOnExit>
              <Box flex={1} mr={2} minWidth="300px">
                <Statistics month={month} year={year} />
              </Box>
            </Slide>
            <Slide direction="up" in={true} mountOnEnter unmountOnExit>
              <Box flex={2} ml={2} minWidth="300px" height="400px" overflow="auto">
                <TransactionsTable month={month} year={year} />
              </Box>
            </Slide>
          </Box>

          <Box display="flex" justifyContent="space-between" mt={4}>
            <BarChart data={barChartData} />
            <PieChart data={pieChartData} />
          </Box>
        </>
      )}
    </Container>
  );
}

export default App;
