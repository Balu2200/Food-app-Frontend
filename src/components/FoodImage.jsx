import { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useNavigate } from "react-router-dom";

const cuisineData = {
  Continental: [
    "Grilled Chicken",
    "Roast Beef",
    "Mashed Potatoes",
    "Baked Fish",
    "Garlic Bread",
    "French Toast",
  ],
  "North Indian": [
    "Butter Chicken",
    "Dal Makhani",
    "Paneer Tikka",
    "Rogan Josh",
    "Aloo Paratha",
    "Chole Bhature",
  ],
  Italian: ["Pizza", "Pasta", "Lasagna", "Risotto", "Tiramisu", "Bruschetta"],
  Asian: ["Sushi", "Ramen", "Dumplings", "Kimchi", "Pad Thai", "Pho"],
};

const ImageUploader = ({ onCuisineDetected }) => {
  const navigate = useNavigate();
  const [image, setImage] = useState(null);
  const [foodLabel, setFoodLabel] = useState("");
  const [cuisine, setCuisine] = useState("");

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  const findCuisine = (food) => {
    for (const [cuisine, foods] of Object.entries(cuisineData)) {
      if (foods.includes(food)) {
        return cuisine;
      }
    }
    return "Unknown Cuisine";
  };

  const handleSubmit = async () => {
    if (!image) {
      setFoodLabel("Please select an image");
      setCuisine("");
      return;
    }

    const formData = new FormData();
    formData.append("image", image);

    try {
      const response = await axios.post(`${BASE_URL}/detect-food`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      const label1 = response.data.label1?.toLowerCase();
      const label2 = response.data.label2?.toLowerCase();
      let detectedFood = "Unknown";

      if (label1 !== "food" && label1) {
        detectedFood = response.data.label1;
      } else if (label2 !== "food" && label2) {
        detectedFood = response.data.label2;
      }

      const detectedCuisine = findCuisine(detectedFood);
      setFoodLabel(detectedFood);
      setCuisine(detectedCuisine);

      if (detectedCuisine !== "Unknown Cuisine") {
        onCuisineDetected(detectedCuisine);
      }
    } catch (err) {
      console.error("Error:", err);
      setFoodLabel("Error detecting food.");
      setCuisine("");
    }
  };

  return (
    <div className="flex flex-col items-center p-6 bg-gray-200 rounded-lg shadow-lg w-1/2 mx-auto mt-10">
      <h1 className="text-3xl font-bold text-indigo-600 mb-6 text-center">
        Find Restaurants by Image
      </h1>
      <input
        id="file-upload"
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="mb-4 p-2 border rounded-lg cursor-pointer w-full text-gray-700"
      />
      <div>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700 mx-3"
          onClick={handleSubmit}
        >
          Detect Food
        </button>
        <button
          className="bg-red-500 hover:bg-red-600 text-white py-2 px-6 mt-5 rounded-lg transition duration-300"
          onClick={() => navigate("/")}
        >
          Home
        </button>
      </div>
      {foodLabel && (
        <div className="mt-4 p-4 bg-white rounded-lg shadow-md w-full text-center">
          <p className="font-semibold text-gray-800">
            Detected Food: {foodLabel}
          </p>
          <p className="font-semibold text-gray-800">Cuisine: {cuisine}</p>
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
