"use client";

import Header from "@/app/components/header"; 
import { useRouter } from "next/navigation";     // Router for navigation
import { useEffect, useState } from "react";    // React hooks for state management and side effects



export default function DashboardPage() {
  // State to store exchange rates (array of objects with pair and rate)
  const [rates, setRates] = useState<{ pair: string; rate: number }[]>([]);


  // State for handling editing a rate (stores index of the rate being edited)
  const [editIndex, setEditIndex] = useState<number | null>(null);


  // State for new rate and pair input fields
  const [newRate, setNewRate] = useState("");
  const [newPair, setNewPair] = useState("");

  const router = useRouter();       // Next.js router instance for navigation



  // Fetch rates from the backend on component mount
  useEffect(() => {
    const fetchRates = async () => {
      try {
        const response = await fetch("/api/convert", { method: "GET" }); // Make a GET request to the backend
        if (!response.ok) {
          throw new Error("Failed to fetch rates");
        }
        const data: { pair: string; rate: number }[] = await response.json(); // Parse response
        setRates(data);            // Update rates state with fetched data
      } catch (error) {
        console.error("Error fetching rates:", error); // Log errors
      }
    };

    fetchRates();          // Trigger fetch on component load
  }, []);                 // Empty dependency array ensures this runs only once



  // Handle edit button click
  const handleEdit = (index: number) => {
    setEditIndex(index);                         // Set the index of the rate being edited
    setNewRate(rates[index].rate.toString());   // Prefill the input with the existing rate
  };



  // Handle update when saving an edited rate
  const handleUpdate = async () => {
    if (editIndex === null) return;      // Do nothing if no rate is being edited

    try {
      const updatedRateData = { pair: rates[editIndex].pair, rate: parseFloat(newRate) }; // Prepare updated rate

      const response = await fetch("/api/convert", {
        method: "PUT", // PUT request to update the rate
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedRateData), // Send updated rate as JSON
      });

      if (!response.ok) {
        throw new Error("Failed to update the rate");
      }

      // Fetch updated rates from backend to reflect changes
      const updatedRates = await fetchRatesFromBackend();
      setRates(updatedRates);                      // Update local state with the latest data
      setEditIndex(null);                         // Clear editing state
      setNewRate("");                            // Clear input field
    } catch (error) {
      console.error("Error updating rate:", error);     // Log errors
      alert("Failed to update the rate.");             // Show error to the user
    }
  };



  // Fetch updated rates from the backend
  const fetchRatesFromBackend = async () => {
    try {
      const response = await fetch("/api/convert", { method: "GET" });
      if (!response.ok) {
        throw new Error("Failed to fetch rates");
      }
      return await response.json();          // Return the fetched rates
    } catch (error) {
      console.error("Error fetching rates from backend:", error);
      return rates;                       // Return current rates as fallback
    }
  };



  // Cancel editing a rate
  const handleCancel = () => {
    setEditIndex(null); // Reset editing state
    setNewRate(""); // Clear input field
  };



  // Handle deletion of a rate
  const handleDelete = async (index: number) => {
    try {
      const pairToDelete = rates[index].pair;        // Get the pair to delete

      const response = await fetch(`/api/convert?pair=${pairToDelete}`, { method: "DELETE" }); // DELETE request

      if (!response.ok) {
        throw new Error("Failed to delete rate");
      }

      // Fetch updated rates after deletion
      const updatedRates = await fetchRatesFromBackend();
      setRates(updatedRates); // Update local state
    } catch (error) {
      console.error("Error deleting rate:", error);            // Log errors
      alert("Failed to delete rate.");                        // Show error to the user
    }
  };



  // Handle adding a new rate
  const handleAdd = async () => {
    if (newPair && newRate) {
      try {
        const newRateData = { pair: newPair.toUpperCase(), rate: parseFloat(newRate) }; // Prepare new rate

        const response = await fetch("/api/convert", {
          method: "POST",                                 // POST request to add the rate
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newRateData),             // Send new rate as JSON
        });

        if (!response.ok) {
          throw new Error("Failed to add new rate");
        }

        // Fetch updated rates after adding the new rate
        const updatedRates = await fetchRatesFromBackend();
        setRates(updatedRates);                             // Update local state
        setNewPair("");                                    // Clear input field
        setNewRate("");                                   // Clear input field
      } catch (error) {
        console.error("Error adding new rate:", error);    // Log errors
        alert("Failed to add new rate.");                 // Show error to the user
      }
    }
  };


  
  // Handle logout
  const handleLogout = () => {
    alert("Logged out!");          // Notify user
    router.push("/pages/login"); // Redirect to login page
  };



  return (
    <>
      <Header /> {/*Header component*/}

      {/*Dashboard Panel section*/}
      <div className="flex flex-col items-center justify-center min-h-screen bg-[url('/image4.jpg')] p-6 font-poppins">
        <div className="bg-gray-700 p-8 rounded-lg shadow-lg sm:w-full sm:max-w-[800px]">
          <h1 className="text-2xl font-bold text-center mb-6">Dashboard Panel</h1>
          <table className="w-full table-auto border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-500">
                <th className="border px-4 py-2">Currency Pair</th>
                <th className="border px-4 py-2">Rate</th>
                <th className="border px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {rates.map((rate, index) => (
                <tr key={rate.pair} className="text-center">
                  <td className="border px-4 py-2">{rate.pair}</td>
                  <td className="border px-4 py-2">
                    {editIndex === index ? (
                      <input
                        type="number"
                        value={newRate}
                        onChange={(e) => setNewRate(e.target.value)}
                        className="border rounded p-1 w-20 text-black"
                      />
                    ) : (
                      rate.rate.toFixed(4)
                    )}
                  </td>
                  <td className="border px-4 py-2">
                    {editIndex === index ? (
                      <>
                        <button
                          onClick={handleUpdate}
                          className="bg-green-500 text-white px-2 py-1 rounded"
                          
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
                          className="bg-blue-500 text-white px-2 py-1 rounded"
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

          {/*Add new conversion Panel section*/}
          <div className="mt-6">
            <h2 className="text-xl font-bold text-center mb-4">Add New Conversion</h2>
            <div className="flex justify-between space-x-4">
              <input
                type="text"
                placeholder="Currency Pair (e.g., USD-EUR)"
                value={newPair}
                onChange={(e) => setNewPair(e.target.value)}
                className="border text-black rounded p-2 w-full"
              />
              <input
                type="number"
                placeholder="Rate"
                value={newRate}
                onChange={(e) => setNewRate(e.target.value)}
                className="border rounded text-black p-2 w-full"
              />
              <button
                onClick={handleAdd}
                className="bg-green-500 text-white px-4 py-2 rounded shadow-lg"
                
              >
                Add
              </button>
            </div>
          </div>

          <div className="mt-6 text-center">
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-2 rounded shadow-lg"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
