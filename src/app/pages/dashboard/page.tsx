'use client'

import Header from "@/app/components/header";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";


// Sample initial rates data

const initialRates = [
  { pair: "USD-JPY", rate: 76.7200 },
  { pair: "EUR-USD", rate: 0.84 },
  { pair: "EUR-GBP", rate: 0.8731 },
  { pair: "CHF-USD", rate: 1.1379 },
  { pair: "GBP-CAD", rate: 1.5648 },
];


 // CRUD

export default function DashboardPage() {
  const [rates, setRates] = useState(initialRates);
  const [editIndex, setEditIndex] = useState<number | null>(null);   // edit rates
  const [newRate, setNewRate] = useState("");                       //add new rate
  const [newPair, setNewPair] = useState(""); // For creating new conversions
  
  // router for redirecting to login page when click logout 

  const router = useRouter();


  // connection with API to fetch rates and dynamically update them from front end

  useEffect(() => {
    const fetchRates = async () => {
      try {
        const response = await fetch("/api/convert", { method: "GET" });
        if (!response.ok) {
          throw new Error("Failed to fetch rates");
        }
  
        const data: { pair: string; rate: number }[] = await response.json();
        // Ensure data integrity
        const validatedData = data.map((item) => ({
          pair: item.pair,
          rate: typeof item.rate === "number" ? item.rate : 0, // Default to 0 if rate is not a number
        }));
  
        setRates(validatedData); // Set state with validated data
      } catch (error) {
        console.error("Error fetching rates:", error);
      }
    };
  
    fetchRates();
  }, []);
  
  


  // Handle edit mode

  const handleEdit = (index: number) => {
    setEditIndex(index);
    setNewRate(rates[index].rate.toString());
  };


  // Handle rate update

  const handleUpdate = async () => {
    if (editIndex !== null) {
      const updatedRateData = { pair: rates[editIndex].pair, rate: parseFloat(newRate) };
      const response = await fetch("/api/convert", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedRateData),
      });

      if (response.ok) {
        // Update the rates in the local state after successful API response
        const updatedRates = [...rates];
        updatedRates[editIndex].rate = parseFloat(newRate);
        setRates(updatedRates); // Refresh the rates in the dashboard UI

        setEditIndex(null); // Exit edit mode
        setNewRate(""); // Clear the input field
      }
    }
  };
  


  // Handle cancel edit
  
  const handleCancel = () => {
    setEditIndex(null);
    setNewRate("");
  };


  // Handle logout (placeholder)

  const handleLogout = () => {
    alert("Logged out!");

    // Redirect to login page 
    router.push("/pages/login");
  };


    // Handle delete (delete option)

    const handleDelete = async (index: number) => {
        const pairToDelete = rates[index].pair;
        const response = await fetch(`/api/convert?pair=${pairToDelete}`, { method: "DELETE" });
      
        if (response.ok) {
          setRates(rates.filter((_, i) => i !== index));
        }
      };
      


    // Handle add (add option) 
    
    const handleAdd = async () => {
        if (newPair && newRate) {
          const newRateData = { pair: newPair.toUpperCase(), rate: parseFloat(newRate) };
          const response = await fetch("/api/convert", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newRateData),
          });
      
          if (response.ok) {
            setRates([...rates, newRateData]);
            setNewPair("");
            setNewRate("");
          }
        }
    };
      

  return (
    <>
    <Header />

    {/* Main Dashboard panel */}
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6 font-poppins">
        <div className="bg-gray-700 p-8 rounded-lg shadow-lg sm:w-full sm:max-w-[800px]">
          <h1 className="text-2xl font-bold text-center mb-6">Dashboard Panel</h1>
          
          {/* Main Dashboard panel tables */}
          <table className="w-full table-auto border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-500">
                <th className="border border-gray-300 px-4 py-2">Currency Pair</th>
                <th className="border border-gray-300 px-4 py-2">Rate</th>
                <th className="border border-gray-300 px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {rates.map((rate, index) => (
                <tr key={rate.pair} className="text-center">
                  <td className="border border-gray-300 px-4 py-2">{rate.pair}</td>
                  <td className="border border-gray-300 px-4 py-2">
                    {editIndex === index ? (
                      <input
                        type="number"
                        value={newRate}
                        onChange={(e) => setNewRate(e.target.value)}
                        className="border rounded p-1 w-20 text-black text-center"
                      />
                    ) : (
                      rate.rate.toFixed(4)
                    )}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {editIndex === index ? (
                      <>
                        <button
                          onClick={handleUpdate}
                          className="bg-green-500 text-white px-2 py-1 rounded mr-2"
                        >
                          Save
                        </button>
                        <button
                          onClick={handleCancel}
                          className="bg-gray-500 text-white px-2 py-1 rounded"
                        >
                          Cancel
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={() => handleEdit(index)}
                          className="bg-blue-500 text-white px-2 py-1 rounded mr-2"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(index)}
                          className="bg-red-500 text-white px-2 py-1 rounded"
                        >
                          Delete
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Add New Conversion section */}

          <div className="mt-6">
            <h2 className="text-xl font-bold text-center mb-4">Add New Conversion</h2>
            <div className="flex text-black justify-between items-center space-x-4">
              <input
                type="text"
                placeholder="Currency Pair (e.g., USD-EUR)"
                value={newPair}
                onChange={(e) => setNewPair(e.target.value)}
                className="border rounded p-2 w-full"
              />
              <input
                type="number"
                placeholder="Rate"
                value={newRate}
                onChange={(e) => setNewRate(e.target.value)}
                className="border rounded p-2 w-full"
              />
              <button
                onClick={handleAdd}
                className="bg-green-500 text-white px-4 py-2 rounded shadow-lg hover:bg-green-600"
              >
                Add
              </button>
            </div>
          </div>
          <div className="mt-6 text-center">
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-2 rounded shadow-lg hover:bg-red-600"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
