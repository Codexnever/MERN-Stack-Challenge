const Transaction = require('../models/Transaction');
const axios = require('axios');

// Fetch data and seed database
exports.seedData = async (req, res) => {
    try {
        const response = await axios.get('https://s3.amazonaws.com/roxiler.com/product_transaction.json');
        const transactions = response.data;

        await Transaction.deleteMany(); // Clear old data
        await Transaction.insertMany(transactions); // Insert new data

        res.status(200).json({ message: 'Database initialized with seed data.' });
    } catch (error) {
        console.error("Error seeding data:", error);
        res.status(500).json({ error: 'Failed to fetch and seed data.' });
    }
};

exports.getTransactions = async (req, res) => {
    const { page = 1, perPage = 10, search = '', month } = req.query;
    const regex = new RegExp(search, 'i'); // Case-insensitive search

    try {
        const startDate = new Date(`${month}-01`);  // First day of the month
        const endDate = new Date(startDate.getFullYear(), startDate.getMonth() + 1, 0);  // Last day of the month

        const transactions = await Transaction.find({
            $and: [
                //   { dateOfSale: { $gte: startDate, $lte: endDate } },  // Filter by date range(If you want to filter by date)
                { $or: [{ title: regex }, { description: regex }] } 
            ]
        })
            .skip((page - 1) * perPage)
            .limit(parseInt(perPage));

        const total = await Transaction.countDocuments({
            $and: [
                { dateOfSale: { $gte: startDate, $lte: endDate } },
                { $or: [{ title: regex }, { description: regex }] }
            ]
        });

        res.status(200).json({ transactions, total });
    } catch (error) {
        console.error("Error fetching transactions:", error);
        res.status(500).json({ error: 'Error fetching transactions.' });
    }
};


exports.getStatistics = async (req, res) => {
    const { month } = req.query;

    if (!month) {
        return res.status(400).json({ error: "Month query parameter is required" });
    }

    try {
        const startDate = new Date(`${month}-01`);
        const endDate = new Date(startDate.getFullYear(), startDate.getMonth() + 1, 0); // End of the month

        // Query the database for transactions within the month
        const transactions = await Transaction.find({
            dateOfSale: { $gte: startDate, $lte: endDate }
        });

        console.log('Fetched transactions:', transactions);

        res.status(200).json(transactions);
    } catch (error) {
        console.error("Error in getStatistics:", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};


exports.getBarChart = async (req, res) => {
    const { month } = req.query;
    const priceRanges = [100, 200, 300, 400, 500, 600, 700, 800, 900];

    try {
        const startDate = new Date(`${month}-01`);
        const endDate = new Date(startDate.getFullYear(), startDate.getMonth() + 1, 0); // End of the month

        const transactions = await Transaction.find({
            dateOfSale: { $gte: startDate, $lte: endDate }
        });

        const rangeCounts = {};

        priceRanges.forEach(range => {
            rangeCounts[`0-${range}`] = transactions.filter(t => t.price <= range).length;
        });

        res.status(200).json(rangeCounts);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching bar chart data.' });
    }
};

exports.getPieChart = async (req, res) => {
    const { month } = req.query;

    try {
        const startDate = new Date(`${month}-01`);
        const endDate = new Date(startDate.getFullYear(), startDate.getMonth() + 1, 0); // End of the month

        const transactions = await Transaction.find({
            dateOfSale: { $gte: startDate, $lte: endDate }
        });

        const categoryCounts = transactions.reduce((acc, curr) => {
            acc[curr.category] = (acc[curr.category] || 0) + 1;
            return acc;
        }, {});

        res.status(200).json(categoryCounts);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching pie chart data.' });
    }
};

// Combined API
exports.getCombinedData = async (req, res) => {
    const { month } = req.query;
console.log('Combined',month)
    try {
        const startDate = new Date(`${month}-01`);
        const endDate = new Date(startDate.getFullYear(), startDate.getMonth() + 1, 0); 

        const transactions = await Transaction.find({
            dateOfSale: { $gte: startDate, $lte: endDate }
        });

        const priceRanges = [100, 200, 300, 400, 500, 600, 700, 800, 900];
        const rangeCounts = {};

        priceRanges.forEach(range => {
            rangeCounts[`0-${range}`] = transactions.filter(t => t.price <= range).length;
        });

        const categoryCounts = transactions.reduce((acc, curr) => {
            acc[curr.category] = (acc[curr.category] || 0) + 1;
            return acc;
        }, {});

        res.status(200).json({
            statistics: transactions,
            barChart: rangeCounts,
            pieChart: categoryCounts
        });
    } catch (error) {
        res.status(500).json({ error: 'Error fetching combined data.' });
    }
};
