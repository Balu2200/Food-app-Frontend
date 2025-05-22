import { Link } from "react-router-dom";
import {
  FaUtensils,
  FaMapMarkerAlt,
  FaDollarSign,
  FaStar,
} from "react-icons/fa";

const RestaurantCard = ({ restaurant }) => {
  return (
    <div className="bg-gray-100 shadow-xl rounded-2xl overflow-hidden hover:shadow-2xl transition duration-300 ease-in-out">
      <Link to={`/restaurant/${restaurant.id}`} className="block">
        <img
          src={restaurant.featured_image}
          alt={restaurant.name}
          className="w-full h-48 object-cover"
        />
        <div className="p-4">
          <h2 className="text-xl font-semibold text-gray-900">
            {restaurant.name}
            <div className="border-b border-gray-300 mt-1"></div>
          </h2>
          <div className="mt-3 space-y-2">
            <div className="flex items-center text-gray-700 text-sm">
              <FaUtensils className="mr-2" />
              <span>{restaurant.cuisines}</span>
            </div>
            <div className="flex items-center text-gray-700 text-sm">
              <FaMapMarkerAlt className="mr-2" />
              <span>{restaurant.location}</span>
            </div>
            <div className="flex items-center font-bold text-gray-900 text-sm">
              <FaDollarSign className="mr-2" />
              <span>Avg for Two: {restaurant.average_cost_for_two}</span>
            </div>
          </div>
          <p className="mt-3 flex items-center text-red-500 font-semibold">
            <FaStar className="mr-1" />
            Rating: {restaurant.user_rating?.aggregate_rating}
          </p>
        </div>
      </Link>
    </div>
  );
};

export default RestaurantCard;
