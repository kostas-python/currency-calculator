'use client'
import Header from "./components/header";
import { useEffect, useState } from 'react';

   // List of available currencies

const currencies = [
  "USD", "EUR", "GBP", "CHF", "JPY", "CAD",
];

const CurrencyConverter: React.FC = () => {
  // States to store selected currencies, amounts, and conversion rate

  const [currencyOne, setCurrencyOne] = useState("USD");           // Default to USD for currencyOne
  const [currencyTwo, setCurrencyTwo] = useState("EUR");          // Default to EUR for currencyTwo
  const [amountOne, setAmountOne] = useState(1);                 // Default to 1 for the amount of currencyOne
  const [amountTwo, setAmountTwo] = useState(0);                // Default to 0 for the amount of currencyTwo
  const [rate, setRate] = useState<number | null>(0.84);       // Default to 0.84 as the exchange rate

  // Function to fetch the exchange rate from the API

  const fetchRate = async () => {
    try {

      // Fetch conversion rate from the API endpoint
      const response = await fetch(`/api/convert?base=${currencyOne}&target=${currencyTwo}`);
      

      // Check if the response is OK (status code 200)
      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.statusText}`);
      }
      
      
      // Parse the JSON data from the response
      const data = await response.json();
      console.log("Received data from API:", data);


      if (data.rate) {
        setRate(data.rate);
        setAmountTwo(amountOne * data.rate);


        // Calculate the amount in currencyTwo based on amountOne and the rate
        const calculatedAmount = amountOne * data.rate;


        // Set the calculated amount for currencyTwo, ensuring it's not NaN
        setAmountTwo(isNaN(calculatedAmount) ? 0 : calculatedAmount); 
      } else {
        console.error("Rate data is missing or invalid");
      }
    } catch (error) {
      console.error("Failed to fetch the conversion rate:", error);
    }
  };

  // Trigger fetching of the conversion rate whenever currencyOne, currencyTwo, or amountOne changes
  useEffect(() => {
    fetchRate();
  }, [currencyOne, currencyTwo, amountOne]);

  // Swap the selected currencies and update amounts and rates accordingly
  const handleSwap = () => {
    setCurrencyOne(currencyTwo);                          // Set currencyOne to currencyTwo
    setCurrencyTwo(currencyOne);                         // Set currencyTwo to currencyOne
    setAmountOne(amountTwo);                            // Set amountOne to the current value of amountTwo
    setAmountTwo(amountOne);                           // Set amountTwo to the current value of amountOne
    setRate((prevRate) => (prevRate ? 1 / prevRate : null));   // Invert the rate safely
  };


  // Handle changes in the amount of currencyOne input field
  const handleAmountOneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);  // Convert the input to a number
    setAmountOne(isNaN(value) ? 0 : value);    // If value is NaN, set it to 0
  };

  
  // Handle changes in the amount of currencyTwo input field
  const handleAmountTwoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);  // Convert the input to a number
    setAmountTwo(isNaN(value) ? 0 : value);    // If value is NaN, set it to 0
  };

  return (
    <>
      <Header />
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6 font-poppins">
        <div className="bg-gray-400 p-8 rounded-lg shadow-lg sm:mx-auto sm:w-full sm:max-w-[600px] h-[500px]">
          {/* Currency 1 and amount input */}
          <div className="flex items-center justify-between py-12">
            <select
              value={currencyOne}  // Current selected currency for currencyOne
              onChange={(e) => setCurrencyOne(e.target.value)}  // Update currencyOne when changed
              className="border border-gray-300 py-3 rounded focus:outline-none text-black"
            >
              {currencies.map((currency) => (
                <option key={currency} value={currency}>
                  {currency}
                </option>
              ))}
            </select>
            <input
              type="number"
              value={isNaN(amountOne) ? 0 : amountOne}  // Ensure valid number for amountOne
              onChange={handleAmountOneChange}  // Handle input change for amountOne
              placeholder="0"
              className="ml-4 border border-gray-300 py-3 rounded w-24 focus:outline-none text-black"
            />
          </div>

          {/* Swap button and rate display */}
          <div className="flex items-center justify-center py-4">
            <button
              onClick={handleSwap}  // Swap currencies when clicked
              className="bg-gray-500 text-white p-2 mr-4 rounded-lg shadow-md hover:bg-gray-600"
            >
              Swap
            </button>
            <div className="ml-4 text-black">
              {/* Display the conversion rate */}
              {rate && !isNaN(rate) ? (
                `${currencyOne} to ${currencyTwo} rate: ${rate.toFixed(2)}`
              ) : (
                <span>Loading rate...</span>    // Display loading message while rate is being fetched
              )}
            </div>
          </div>

          {/* Currency 2 and amount input */}
          <div className="flex items-center justify-between mt-10">
            <select
              value={currencyTwo}     // Current selected currency for currencyTwo
              onChange={(e) => setCurrencyTwo(e.target.value)}    // Update currencyTwo when changed
              className="border border-gray-300 py-3 rounded focus:outline-none text-black"
            >
              {currencies.map((currency) => (
                <option key={currency} value={currency}>
                  {currency}
                </option>
              ))}
            </select>
            <input
              type="number"
              value={isNaN(amountTwo) ? 0 : amountTwo}     // Ensure valid number for amountTwo
              onChange={handleAmountTwoChange}            // Handle input change for amountTwo
              placeholder="0"
              className="ml-4 border border-gray-300 py-3 rounded w-24 focus:outline-none text-black"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default CurrencyConverter;