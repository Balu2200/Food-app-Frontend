
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; 
import RestaurantList from "./components/RestaurantList";
import RestaurantDetails from "./components/RestrauntDetails"; 
import FindByAddressPage from "./components/findbyAddress";
import ImageUploader from "./components/FoodImage";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<RestaurantList />} />{" "}
          
          <Route
            path="/restaurant/:id"
            element={<RestaurantDetails />}
          />{" "}
         <Route path="address" element={<FindByAddressPage/>} />
         <Route path="image" element={<ImageUploader/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
