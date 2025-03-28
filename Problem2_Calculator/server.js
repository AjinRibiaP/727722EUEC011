const express = require('express');
const axios = require('axios');

const app = express();
const PORT = 8081;
const WINDOW_SIZE = 10;

const ACCESS_TOKEN = 
"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiZXhwIjoxNzQzMTUyNzcyLCJpYXQiOjE3NDMxNTI0NzIsImlzcyI6IkFmZm9yZG1lZCIsImp0aSI6ImRkOThiNDIwLTQ2YTUtNDhlYi05NDgwLTBlYjAxYmNhMTJiOCIsInN1YiI6IjcyNzcyMmV1ZWMwMTFAc2tjZXQuYWMuaW4ifSwiY29tcGFueU5hbWUiOiJTS0NFVCIsImNsaWVudElEIjoiZGQ5OGI0MjAtNDZhNS00OGViLTk0ODAtMGViMDFiY2ExMmI4IiwiY2xpZW50U2VjcmV0IjoiZUpiS0p1c2djZFR2SE9TVCIsIm93bmVyTmFtZSI6IkFqaW4gUmliaWEgUCIsIm93bmVyRW1haWwiOiI3Mjc3MjJldWVjMDExQHNrY2V0LmFjLmluIiwicm9sbE5vIjoiNzI3NzIyZXVlYzAxMSJ9.01IeBSwUd2vH15Y_HDTqeiuuK5f8Jy18HA39DwSz9bk";
const API_ENDPOINTS = {
    p: "http://20.244.56.144/test/primes",
    f: "http://20.244.56.144/test/fibo",
    e: "http://20.244.56.144/test/even",
    r: "http://20.244.56.144/test/rand"
};

let numberWindow = [];

app.get('/numbers/:type', async (req, res) => {
    const { type } = req.params;

    if (!API_ENDPOINTS[type]) {
        return res.status(400).json({ error: "Invalid type. Use 'p', 'f', 'e', or 'r'." });
    }

    const previousState = [...numberWindow];

    try {
        console.log(`Requesting ${type} numbers from ${API_ENDPOINTS[type]}...`);

        const response = await axios.get(API_ENDPOINTS[type], {
            timeout: 5000,
            headers: { "Authorization": `Bearer ${ACCESS_TOKEN}` }
        });

        console.log("API Response:", response.data);

        if (!response.data || !response.data.numbers) {
            throw new Error("Received invalid data from the API");
        }

        const newNumbers = response.data.numbers.filter(num => !numberWindow.includes(num));

        numberWindow = [...numberWindow, ...newNumbers].slice(-WINDOW_SIZE);

        const average = numberWindow.length > 0
            ? (numberWindow.reduce((sum, num) => sum + num, 0) / numberWindow.length).toFixed(2)
            : 0;

        return res.json({
            windowPrevState: previousState,
            windowCurrState: numberWindow,
            numbers: newNumbers,
            avg: average
        });
    } catch (error) {
        console.error("Error fetching data:", error.message);
        return res.status(500).json({ error: "Unable to fetch data (timeout or authorization error)." });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
