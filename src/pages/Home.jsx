import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import RestaurantCard from "../components/RestaurantCard";
import SearchBar from "../components/searchbar";
import Pagination from "../components/Pagination";
import { BASE_URL } from "../utils/constants";

const HomePage = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [search, setSearch] = useState("");

  const fetchRestaurants = useCallback(async () => {
    try {
      const { data } = await axios.get(
        `${BASE_URL}/restaurants?page=${page}&search=${search}`
      );
      setRestaurants(data.restaurants || []);
      setTotal(data.total || 0);
    } catch (error) {
      console.error("Error fetching restaurants", error);
    }
  }, [page, search]);

  useEffect(() => {
    fetchRestaurants();
  }, [fetchRestaurants]);

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Restaurant Listing
      </h1>
      <SearchBar setSearch={setSearch} />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
        {restaurants && restaurants.length > 0 ? (
          restaurants.map((r) =>
            r ? <RestaurantCard key={r._id} restaurant={r} /> : null
          )
        ) : (
          <p className="text-gray-500 text-center col-span-full">
            No restaurants found.
          </p>
        )}
      </div>
      <div className="mt-6 flex justify-center">
        <Pagination
          currentPage={page}
          totalPages={Math.ceil(total / 10)}
          onPageChange={setPage}
          loading={false}
        />
      </div>
    </div>
  );
};

export default HomePage;
