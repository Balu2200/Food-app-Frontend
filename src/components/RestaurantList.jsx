import { useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";

import RestaurantCard from "./RestaurantCard";
import Pagination from "./Pagination";
import SearchBar from "./searchbar";

import { useNavigate } from "react-router";

const RestaurantList = () => {
  const navigate = useNavigate();
  const [restaurants, setRestaurants] = useState([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
  });
  const [restaurantById, setRestaurantById] = useState(null);
  const [cuisine, setCuisine] = useState("");
  const [showImagePopup, setShowImagePopup] = useState(false);

  useEffect(() => {
    if (cuisine) {
      fetchRestaurantsByCuisine(cuisine, pagination.currentPage);
    } else {
      fetchRestaurants(pagination.currentPage);
    }
  }, [cuisine, pagination.currentPage]);

  useEffect(() => {
    setFilteredRestaurants(
      restaurants.filter((restaurant) =>
        restaurant.name.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search, restaurants]);

  const fetchRestaurants = async (page) => {
    try {
      setLoading(true);
      let url = `${BASE_URL}/restaurants?page=${page}&limit=9`;

      const response = await axios.get(url);
      setRestaurants(response.data.restaurants || []);
      setFilteredRestaurants(response.data.restaurants || []);
      setPagination({
        currentPage: response.data.pagination?.currentPage || 1,
        totalPages: response.data.pagination?.totalPages || 1,
      });
    } catch (err) {
      setError("Error fetching data");
      console.error(err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchRestaurantsByCuisine = async (cuisine, page) => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${BASE_URL}/restaurants/findByCuisine?cuisine=${encodeURIComponent(
          cuisine
        )}&page=${page}`
      );
      setRestaurants(response.data.restaurants || []);
      setFilteredRestaurants(response.data.restaurants || []);
      setPagination({
        currentPage: response.data.pagination?.currentPage || 1,
        totalPages: response.data.pagination?.totalPages || 1,
      });
    } catch (err) {
      setError("Error fetching restaurants by cuisine");
      console.error(err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= pagination.totalPages) {
      setPagination((prev) => ({ ...prev, currentPage: newPage }));
    }
  };

  return (
    <div className="flex flex-col items-center p-8 min-h-screen bg-gray-100">
      <div className="w-full max-w-4xl flex flex-col md:flex-row items-center justify-between mb-6 gap-4">
        <SearchBar
          setSearch={(query) => {
            setSearch(query);
            setPagination((prev) => ({ ...prev, currentPage: 1 }));
          }}
          setRestaurantById={setRestaurantById}
        />
        <div className="flex gap-4">
          <button
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition-all"
            onClick={() => navigate("/image")}
          >
            Find By Image
          </button>
          <button
            className="bg-indigo-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition-all"
            onClick={() => navigate("/address")}
          >
            Find By Location
          </button>
        </div>
      </div>
      <div className="w-full max-w-5xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {loading ? (
          <p className="text-center text-gray-600 text-lg">Loading...</p>
        ) : error ? (
          <p className="text-center text-red-500 text-lg">{error}</p>
        ) : restaurantById ? (
          <RestaurantCard restaurant={restaurantById} />
        ) : filteredRestaurants.length === 0 ? (
          <p className="text-center text-gray-600 text-lg">
            No restaurants found
          </p>
        ) : (
          filteredRestaurants.map((restaurant) => (
            <RestaurantCard key={restaurant.id} restaurant={restaurant} />
          ))
        )}
      </div>
      {!restaurantById && filteredRestaurants.length > 0 && (
        <div className="mt-6">
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

export default RestaurantList;
