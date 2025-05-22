import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import { useNavigate } from "react-router-dom";

const RestaurantDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [restaurant, setRestaurant] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRestaurantDetails = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `${BASE_URL}/restaurants/completeDetails/${id}`
        );
        setRestaurant(response.data);
      } catch (err) {
        setError("Error fetching restaurant details.");
      } finally {
        setLoading(false);
      }
    };

    fetchRestaurantDetails();
  }, [id]);

  if (loading) {
    return <div className="text-center text-gray-500">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  if (restaurant) {
    return (
      <div className="w-full h-screen bg-gray-200 flex justify-center items-center">
        <div className="max-w-2xl mx-auto p-8 bg-white shadow-lg rounded-lg">
          <img
            src={restaurant.featured_image}
            alt={restaurant.name}
            className="w-full h-72 object-cover rounded-md"
          />
          <div className="mt-6">
            <h1 className="text-3xl font-bold text-gray-900">
              {restaurant.name}
            </h1>
            <div className="mt-4 space-y-3 text-gray-800">
              <p>
                <strong>Cuisines:</strong> {restaurant.cuisines}
              </p>
              <p>
                <strong>Average cost for two:</strong>{" "}
                {restaurant.average_cost_for_two} {restaurant.currency}
              </p>
              <p>
                <strong>Location:</strong> {restaurant.location.address}
              </p>
              <p>
                <strong>Rating:</strong>{" "}
                {restaurant.user_rating.aggregate_rating} (
                {restaurant.user_rating.votes} votes)
              </p>
              <p>
                <strong>Price Range:</strong> {restaurant.price_range}
              </p>
            </div>
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-8 mt-6 rounded-lg transition duration-300"
              onClick={() => navigate("/")}
            >
              Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default RestaurantDetails;
