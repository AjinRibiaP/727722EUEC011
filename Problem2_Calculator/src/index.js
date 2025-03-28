const express = require("express");

const app = express();
const PORT = 3000;

let storedNumbers = [];

const getRandomNumbers = (count, min, max) => {
    let numbers = [];
    for (let i = 0; i < count; i++) {
        numbers.push(Math.floor(Math.random() * (max - min + 1)) + min);
    }
    return numbers;
};

const isPrime = (num) => {
    if (num < 2) return false;
    for (let i = 2; i <= Math.sqrt(num); i++) {
        if (num % i === 0) return false;
    }
    return true;
};

const getPrimeNumbers = (count) => {
    let numbers = [];
    let num = 2;
    while (numbers.length < count) {
        if (isPrime(num)) numbers.push(num);
        num++;
    }
    return numbers;
};

const getFibonacciNumbers = (count) => {
    let numbers = [0, 1];
    while (numbers.length < count) {
        numbers.push(numbers[numbers.length - 1] + numbers[numbers.length - 2]);
    }
    return numbers;
};

const getEvenNumbers = (count, min, max) => {
    let numbers = [];
    while (numbers.length < count) {
        let num = Math.floor(Math.random() * (max - min + 1)) + min;
        if (num % 2 === 0) numbers.push(num);
    }
    return numbers;
};

app.get("/numbers/:type", (req, res) => {
    const type = req.params.type;
    let numbers = [];

    if (type === "prime") {
        numbers = getPrimeNumbers(5);
    } else if (type === "fibo") {
        numbers = getFibonacciNumbers(5);
    } else if (type === "even") {
        numbers = getEvenNumbers(5, 1, 100);
    } else if (type === "rand") {
        numbers = getRandomNumbers(5, 1, 100);
    } else {
        return res.status(400).json({ error: "Invalid type" });
    }

    const windowPrevState = [...storedNumbers];

    storedNumbers = [...new Set([...storedNumbers, ...numbers])].slice(-10);

    const avg = storedNumbers.length > 0
        ? storedNumbers.reduce((sum, num) => sum + num, 0) / storedNumbers.length
        : 0;

    res.json({
        windowPrevState,
        windowCurrState: storedNumbers,
        numbers,
        avg
    });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
