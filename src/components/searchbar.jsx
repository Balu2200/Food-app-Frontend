import { useState } from "react";
import { BASE_URL } from "../utils/constants";

const SearchBar = ({ setSearch, setRestaurantById }) => {
  const [idInput, setIdInput] = useState("");

 
  const handleIdSearch = async () => {
    const numericId = parseInt(idInput); 

    if (!idInput || isNaN(numericId)) {
      alert("Please enter a valid numeric restaurant ID");
      return;
    }

    try {
      const response = await fetch(
        `${BASE_URL}/restaurants/restaurant/${numericId}`
      );
      const data = await response.json();
      if (data.error) {
        alert("Restaurant not found");
      } else {
        setRestaurantById(data); 
      }
    } catch (error) {
      console.error("Error fetching restaurant by ID:", error);
      alert("An error occurred while searching for the restaurant.");
    }
  };

  return (
    <div className="flex flex-col md:flex-row gap-4 items-center p-4 bg-gray-100 rounded-lg shadow-md justify-between">
      <input
        id="first-box"
        type="text"
        className="p-2 border border-gray-300 rounded-md w-full md:w-1/2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Search restaurant name..."
        onChange={(e) => setSearch(e.target.value)}
      />

      <input
        type="text"
        className="p-2 border border-gray-300 rounded-md w-full md:w-1/2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Enter ID..."
        value={idInput}
        onChange={(e) => setIdInput(e.target.value)}
      />

      <button
        className="p-1   bg-blue-500  text-white rounded-md hover:bg-blue-600 transition w-full md:w-auto"
        onClick={handleIdSearch}
      >
        Search
      </button>
    </div>
  );
};

export default SearchBar;
