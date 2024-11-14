'use client'
import Header from "./components/header";
import { useEffect, useState } from 'react';

const currencies = [
  "USD", "EUR", "GBP", "CHF", "JPY", "CAD",
];

const CurrencyConverter: React.FC = () => {
  const [currencyOne, setCurrencyOne] = useState("USD");
  const [currencyTwo, setCurrencyTwo] = useState("EUR");
  const [amountOne, setAmountOne] = useState(1);
  const [amountTwo, setAmountTwo] = useState(0);
  const [rate, setRate] = useState<number | null>(0.84); // Set rate to a valid initial value

  const fetchRate = async () => {
    try {
      const response = await fetch(`/api/convert?base=${currencyOne}&target=${currencyTwo}`);

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      if (data.rate) {
        setRate(data.rate);
        setAmountTwo(amountOne * data.rate);
      } else {
        console.error("Rate data is missing from response");
      }
    } catch (error) {
      console.error("Failed to fetch the conversion rate:", error);
    }
  };

  // Use useEffect to call fetchRate when currencyOne, currencyTwo, or amountOne changes
  useEffect(() => {
    fetchRate();
  }, [currencyOne, currencyTwo, amountOne]);

  const handleSwap = () => {
    setCurrencyOne(currencyTwo);
    setCurrencyTwo(currencyOne);
    setAmountOne(amountTwo);
    setAmountTwo(amountOne);
    setRate((prevRate) => (prevRate ? 1 / prevRate : null)); // Swap the rate safely
  };

  return (
    <>
      <Header />
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6 font-poppins">
        <div className="bg-gray-400 p-8 rounded-lg shadow-lg sm:mx-auto sm:w-full sm:max-w-[600px] h-[500px]">
          <div className="flex items-center justify-between py-12">
            <select
              value={currencyOne}
              onChange={(e) => setCurrencyOne(e.target.value)}
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
              value={amountOne}
              onChange={(e) => setAmountOne(parseFloat(e.target.value))}
              placeholder="0"
              className="ml-4 border border-gray-300 py-3 rounded w-24 focus:outline-none text-black"
            />
          </div>

          <div className="flex items-center justify-center py-4">
            <button
              onClick={handleSwap}
              className="bg-gray-500 text-white p-2 mr-4 rounded-lg shadow-md hover:bg-gray-600"
            >
              Swap
            </button>
            <div className="ml-4 text-black">
              {/* Display rate only if it's available */}
              {rate !== null ? (
                `${currencyOne} to ${currencyTwo} rate: ${rate.toFixed(2)}`
              ) : (
                <span>Loading rate...</span>
              )}
            </div>
          </div>

          <div className="flex items-center justify-between mt-10">
            <select
              value={currencyTwo}
              onChange={(e) => setCurrencyTwo(e.target.value)}
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
              value={amountTwo}
              onChange={(e) => setAmountTwo(parseFloat(e.target.value))}
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

