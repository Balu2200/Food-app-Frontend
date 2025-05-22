import { useState } from "react";
import axios from "axios";
import RestaurantCard from "../components/RestaurantCard";
import Pagination from "../components/Pagination";
import { BASE_URL } from "../utils/constants";
import { useNavigate } from "react-router";

const FindByAddressPage = () => {
  const navigate = useNavigate();
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
  });
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");

  const fetchRestaurants = async (latitude, longitude, page = 1) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        `${BASE_URL}/restaurants/findByAddress?latitude=${latitude}&longitude=${longitude}&page=${page}`
      );
      setRestaurants(response.data.restaurants);
      setPagination(response.data.pagination);
    } catch (err) {
      setError("No restaurants found in this area.");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    if (latitude && longitude) {
      fetchRestaurants(latitude, longitude);
    }
  };

  const handlePageChange = (newPage) => {
    if (latitude && longitude) {
      fetchRestaurants(latitude, longitude, newPage);
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-indigo-600 mb-6 text-center">
        Find Restaurants by Address
      </h1>

      <div className=" flex gap-4 mb-2">
        <input
          type="text"
          placeholder="Enter latitude"
          value={latitude}
          onChange={(e) => setLatitude(e.target.value)}
          className="p-2 border rounded-2xl w-1/2"
        />
        <input
          type="text"
          placeholder="Enter longitude"
          value={longitude}
          onChange={(e) => setLongitude(e.target.value)}
          className="p-2 border rounded-2xl w-1/2"
        />
        <button
          onClick={handleSearch}
          className="bg-blue-500 rounded-2xl text-white px-4 py-2 "
        >
          Search
        </button>
        <button
          className="bg-red-500 hover:bg-red-600 text-white py-2 px-6 rounded-2xl transition duration-300"
          onClick={() => navigate("/")}
        >
          Home
        </button>
      </div>

      {loading && <p className="text-center text-gray-500 mt-4">Loading...</p>}
      {error && <p className="text-center text-red-500 mt-4">{error}</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
        {restaurants.map((restaurant) => (
          <RestaurantCard key={restaurant.id} restaurant={restaurant} />
        ))}
      </div>

      {restaurants.length > 0 && (
        <div className="mt-6 flex justify-center">
          <Pagination
            currentPage={pagination.currentPage}
            totalPages={pagination.totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      )}
    </div>
  );
};

export default FindByAddressPage;
