import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TablePagination, CircularProgress, Typography, TextField } from '@mui/material'; 
import { getTransactions } from '../api/api';

const TransactionsTable = ({ month }) => {
  const [transactions, setTransactions] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [loading, setLoading] = useState(false); 
  const [error, setError] = useState(null); 
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchTransactions = async () => {
      setLoading(true);
      setError(null); 
      try {
        if (!month) {
          throw new Error('Month is required');
        }

        const monthMap = {
          January: '01',
          February: '02',
          March: '03',
          April: '04',
          May: '05',
          June: '06',
          July: '07',
          August: '08',
          September: '09',
          October: '10',
          November: '11',
          December: '12'
        };

        const year = '2024'; // Explicitly set the year
        const formattedMonth = `${year}-${monthMap[month]}`;

        // Fetch transactions from the API
        const { transactions, total } = await getTransactions(formattedMonth, page + 1, rowsPerPage, searchQuery);

        setTransactions(transactions);
        setTotal(total);
      } catch (err) {
        console.error("Error fetching transactions:", err.message);
        setError("Failed to fetch transactions. Please check the month value.");
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, [month, page, rowsPerPage, searchQuery]); // Include searchQuery in dependencies

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // Reset to first page when changing rows per page
  };

  // Filter transactions based on the search query
  const filteredTransactions = transactions.filter(transaction => 
    transaction.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    transaction.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <Typography variant="h6" style={{ marginBottom: '10px' }}>
        Search Transactions:
      </Typography>
      <TextField
        variant="outlined"
        size="small"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search by title or category"
      />

      <TableContainer component={Paper} style={{ marginTop: '20px' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Date of Sale</TableCell>
              <TableCell>Sold</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={7} align="center">
                  <CircularProgress />
                </TableCell>
              </TableRow>
            ) : filteredTransactions.length > 0 ? (
              filteredTransactions.map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell>{transaction.id}</TableCell>
                  <TableCell>{transaction.title}</TableCell>
                  <TableCell>${transaction.price}</TableCell>
                  <TableCell>{transaction.description}</TableCell>
                  <TableCell>{transaction.category}</TableCell>
                  <TableCell>{new Date(transaction.dateOfSale).toLocaleDateString()}</TableCell>
                  <TableCell>{transaction.sold ? 'Yes' : 'No'}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} align="center">
                  No transactions found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        component="div"
        count={total}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      
      {error && <Typography color="error" align="center">{error}</Typography>}
    </>
  );
};

export default TransactionsTable;
