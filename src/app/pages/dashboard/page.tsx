'use client'
import Header from "@/app/components/header";
import { useState } from "react";

// Sample initial rates data
const initialRates = [
  { pair: "USD-JPY", rate: 76.7200 },
  { pair: "EUR-USD", rate: 0.84 },
  { pair: "EUR-GBP", rate: 0.8731 },
  { pair: "CHF-USD", rate: 1.1379 },
  { pair: "GBP-CAD", rate: 1.5648 },
];

export default function DashboardPage() {
  const [rates, setRates] = useState(initialRates);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [newRate, setNewRate] = useState("");

  // Handle edit mode
  const handleEdit = (index: number) => {
    setEditIndex(index);
    setNewRate(rates[index].rate.toString());
  };

  // Handle rate update
  const handleUpdate = () => {
    if (editIndex !== null) {
      const updatedRates = [...rates];
      updatedRates[editIndex].rate = parseFloat(newRate);
      setRates(updatedRates);
      setEditIndex(null);
      setNewRate("");
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
    // Redirect to login page (use appropriate routing in your app)
    // Example: router.push("/login");
  };

  return (
    <>
    <Header />
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6 font-poppins">
          <div className="bg-gray-700 p-8 rounded-lg shadow-lg sm:w-full sm:max-w-[800px]">
              <h1 className="text-2xl font-bold text-center mb-6">Dashboard</h1>
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
                                          className="border rounded p-1 w-20 text-center" />
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
                                      <button
                                          onClick={() => handleEdit(index)}
                                          className="bg-blue-500 text-white px-2 py-1 rounded"
                                      >
                                          Edit
                                      </button>
                                  )}
                              </td>
                          </tr>
                      ))}
                  </tbody>
              </table>
              <div className="mt-6 text-center">
                  <button
                      onClick={handleLogout}
                      className="bg-red-500 text-white px-4 py-2 rounded shadow-lg hover:bg-red-600"
                  >
                      Logout
                  </button>
              </div>
          </div>
      </div></>
  );
}
