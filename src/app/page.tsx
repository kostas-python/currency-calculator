'use client';

import Flag from "react-world-flags";
import Header from "./components/header";
import { useEffect, useState } from 'react';


// List of available currencies
const currencies = [
  "USD", "EUR", "GBP", "CHF", "JPY", "CAD",
];


// Map currency codes to flag country codes
const currencyToFlagCode: { [key: string]: string } = {
  USD: 'US',
  EUR: 'EU',
  GBP: 'GB',
  CHF: 'CH',
  JPY: 'JP',
  CAD: 'CA',
};



const CurrencyConverter: React.FC = () => {
  // States to store selected currencies, amounts, and conversion rate
  const [currencyOne, setCurrencyOne] = useState("USD");           // Default to USD for currencyOne
  const [currencyTwo, setCurrencyTwo] = useState("EUR");           // Default to EUR for currencyTwo
  const [amountOne, setAmountOne] = useState(1);                   // Default to 1 for the amount of currencyOne
  const [amountTwo, setAmountTwo] = useState(0);                   // Default to 0 for the amount of currencyTwo
  const [rate, setRate] = useState<number | null>(0.84);           // Default to 0.84 as the exchange rate

  // Function to fetch the exchange rate from the API
  const fetchRate = async () => {
    try {
      // If currencies are the same, directly set rate to 1
      if (currencyOne === currencyTwo) {
        setRate(1);
        setAmountTwo(amountOne);  // Set amountTwo to the same value as amountOne
        return;  // No need to fetch from the API
      }

      // Fetch conversion rate from the API endpoint
      const response = await fetch(`/api/convert?base=${currencyOne}&target=${currencyTwo}`);

      // Check if the response is OK (status code 200)
      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.statusText}`);
      }

      // Parse the JSON data from the response
      const data = await response.json();

      if (data?.rate) {
        setRate(data.rate);
        setAmountTwo(amountOne * data.rate);

        // Calculate the amount in currencyTwo based on amountOne and the rate
        const calculatedAmount = amountOne * data.rate;

        // Set the calculated amount for currencyTwo, ensuring it's not NaN
        setAmountTwo(isNaN(calculatedAmount) ? 0 : calculatedAmount);
      } else {
        console.error("Rate data is missing or invalid", data);
      }
    } catch (error) {
      console.error("Failed to fetch the conversion rate:", error);
    }
  };



  // Trigger fetching of the conversion rate whenever currencyOne, currencyTwo, or amountOne changes
  useEffect(() => {
    fetchRate();
  }, [currencyOne, currencyTwo, amountOne]);



  // Reset amountOne to 1 whenever currencyOne or currencyTwo changes
  useEffect(() => {
    setAmountOne(1);  // Reset amount to 1 when currencies are swapped
  }, [currencyOne, currencyTwo]);



  // Swap the selected currencies and update amounts and rates accordingly
  const handleSwap = () => {
    setCurrencyOne(currencyTwo);                          // Set currencyOne to currencyTwo
    setCurrencyTwo(currencyOne);                          // Set currencyTwo to currencyOne
    setAmountOne(amountTwo);                               // Set amountOne to the current value of amountTwo
    setAmountTwo(amountOne);                               // Set amountTwo to the current value of amountOne
    setRate((prevRate) => (prevRate ? 1 / prevRate : null)); // Invert the rate safely
  };



  // Handle changes in the amount of currencyOne input field
  const handleAmountOneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value; // Get the value from the input field as a string
    const numericValue = parseFloat(value);  // Convert it to a number



    // Set amountOne to the new value, ensuring it's a valid number
    setAmountOne(isNaN(numericValue) ? 0 : numericValue);
  };



  // Handle changes in the amount of currencyTwo input field
  const handleAmountTwoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value; // Get the value from the input field as a string
    const numericValue = parseFloat(value);  // Convert it to a number

    // Set amountTwo to the new value, ensuring it's a valid number
    setAmountTwo(isNaN(numericValue) ? 0 : numericValue);
  };



  return (
    <>
      <Header />
      <div className="flex flex-col items-center justify-center min-h-screen bg-[url('/image3.jpg')] bg-left p-6 font-poppins">
        <div className="bg-[url('/image2.jpeg')] bg-center p-8 rounded-lg shadow-lg sm:mx-auto sm:w-full sm:max-w-[600px] h-[500px]">

          {/* Currency 1 and amount input */}
          <div className="flex items-center justify-between py-12">
            <div className="flex items-center">

              {/* Flag next to currency */}
              <Flag
                code={currencyToFlagCode[currencyOne]}
                alt={`${currencyOne} Flag`}
                width={50}
                height={50}
                className="mr-2"
              />
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
            </div>
            <input
              type="number"
              value={amountOne} // Controlled input for amountOne
              onChange={handleAmountOneChange} // Update the amountOne state
              placeholder="Amount in Currency 1"
              className="ml-4 border border-gray-300 py-3 rounded w-24 focus:outline-none text-black"
            />
          </div>

          {/* Swap button and rate display */}
          <div className="flex items-center justify-center py-4">
            <button
              onClick={handleSwap}  // Swap currencies when clicked
              className="bg-red-500 text-white p-2 mr-4 rounded-lg shadow-md hover:bg-gray-600"
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
            <div className="flex items-center">
              {/* Flag next to currency */}
              <Flag
                code={currencyToFlagCode[currencyTwo]}
                alt={`${currencyTwo} Flag`}
                width={50}
                height={50}
                className="mr-2"
              />
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
            </div>
            <input
              type="number"
              value={amountTwo} // Controlled input for amountTwo
              onChange={handleAmountTwoChange} // Update the amountTwo state
              placeholder="Amount in Currency 2"
              className="ml-4 border border-gray-300 py-3 rounded w-24 focus:outline-none text-black"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default CurrencyConverter;
