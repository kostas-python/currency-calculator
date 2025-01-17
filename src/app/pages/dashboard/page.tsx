"use client";

import Header from "@/app/components/header";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function DashboardPage() {
  const [rates, setRates] = useState<{ pair: string; rate: number }[]>([]);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [newRate, setNewRate] = useState("");
  const [newPair, setNewPair] = useState("");

  const router = useRouter();

  // Check authentication token on component mount
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      router.push("/pages/login");
    }
  }, [router]);

  // Fetch rates from the backend
  useEffect(() => {
    const fetchRates = async () => {
      try {
        const response = await fetch("/api/convert", { method: "GET" });
        if (!response.ok) throw new Error("Failed to fetch rates");
        const data: { pair: string; rate: number }[] = await response.json();
        setRates(data);
      } catch (error) {
        console.error("Error fetching rates:", error);
      }
    };

    fetchRates();
  }, []);

  const fetchRatesFromBackend = async () => {
    try {
      const response = await fetch("/api/convert", { method: "GET" });
      if (!response.ok) throw new Error("Failed to fetch rates");
      return await response.json();
    } catch (error) {
      console.error("Error fetching rates from backend:", error);
      return rates;
    }
  };

  const handleEdit = (index: number) => {
    setEditIndex(index);
    setNewRate(rates[index].rate.toString());
  };

  const handleUpdate = async () => {
    if (editIndex === null) return;

    try {
      const updatedRateData = { pair: rates[editIndex].pair, rate: parseFloat(newRate) };
      const response = await fetch("/api/convert", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedRateData),
      });
      if (!response.ok) throw new Error("Failed to update the rate");

      const updatedRates = await fetchRatesFromBackend();
      setRates(updatedRates);
      setEditIndex(null);
      setNewRate("");
    } catch (error) {
      console.error("Error updating rate:", error);
      alert("Failed to update the rate.");
    }
  };

  const handleCancel = () => {
    setEditIndex(null);
    setNewRate("");
  };

  const handleDelete = async (index: number) => {
    try {
      const pairToDelete = rates[index].pair;
      const response = await fetch(`/api/convert?pair=${pairToDelete}`, { method: "DELETE" });
      if (!response.ok) throw new Error("Failed to delete rate");

      const updatedRates = await fetchRatesFromBackend();
      setRates(updatedRates);
    } catch (error) {
      console.error("Error deleting rate:", error);
      alert("Failed to delete rate.");
    }
  };

  const handleAdd = async () => {
    if (newPair && newRate) {
      try {
        const newRateData = { pair: newPair.toUpperCase(), rate: parseFloat(newRate) };
        const response = await fetch("/api/convert", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newRateData),
        });
        if (!response.ok) throw new Error("Failed to add new rate");

        const updatedRates = await fetchRatesFromBackend();
        setRates(updatedRates);
        setNewPair("");
        setNewRate("");
      } catch (error) {
        console.error("Error adding new rate:", error);
        alert("Failed to add new rate.");
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    router.push("/pages/login");
    alert("Logged out!");
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
                      <div className="space-x-2">
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
                        </div>
                      </>
                    ) : (
                      <>
                      <div className="space-x-2">
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
                        </div>
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
