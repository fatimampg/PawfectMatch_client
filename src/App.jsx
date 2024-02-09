import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import DogSearchParams from "./views/dog-adoption/DogSearchParams";
import DogDetails from "./views/dog-adoption/DogDetails";
import Footer from "./components/layout/Footer";
import DogWalkingSearchParams from "./views/dog-walking/DogWalkingSearchParams";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import UserProfile from "./components/auth/UserProfile";
import Home from "./views/Home";
import AddDog from "./views/dog-adoption/AddDog";
import EditDog from "./views/dog-adoption/EditDog";
import ManageDogs from "./views/dog-adoption/ManageDogs";
import axios from "axios";
axios.defaults.withCredentials = true;

const App = () => {
  return (
    <BrowserRouter>
      <div className="App m-0 ml-0 flex h-screen min-h-screen flex-col bg-white p-0">
        <header>
          <Navbar />
        </header>
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dogsadoption" element={<DogSearchParams />} />
            <Route path="/dogdetails/:dogId" element={<DogDetails />} />
            <Route path="/dogwalking" element={<DogWalkingSearchParams />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register userType="" />} />
            <Route path="/profile" element={<UserProfile />} />
            <Route path="/adddog" element={<AddDog />} />
            <Route path="/editdog/:dogId" element={<EditDog />} />
            <Route path="/managedogs" element={<ManageDogs />} />
          </Routes>
        </main>

        <footer className="m-0 w-full pt-12">
          <Footer />
        </footer>
      </div>
    </BrowserRouter>
  );
};

export default App;