import Home from "./page/Home/Home";
import Index from "./page/Home/Index";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "./components/user/Login";
import Register from "./components/user/Register";
import Film from "./page/FilmInfo/Index";
import SelectSeat from "./page/SelectSeat/SelectSeat.js";
import EditUser from "./components/user/EditUser";
import Payment from "./page/Payment/Payment";
import Food from "./page/Food/Food";
import Err from "./page/Err/Err";
import Success from "./page/Err/Success/Success";
import SearchMovie from "./components/search/FilterFindter";
import Search from "./components/search/Search";
import SearchResult from "./components/search/SearchResult";

function App() {
  return (
    <div className="">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />}>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/editUser" element={<EditUser />} />
            <Route path="/film/:id" element={<Film />} />
            <Route path="/selectseat/:id" element={<SelectSeat />} />
            <Route path="/food/:id" element={<Food />} />
            <Route path="/payment" element={<Payment />} />
            <Route path="/err" element={<Err />} />
            <Route path="/success" element={<Success />} />
            <Route path="/searchfilter" element={<SearchMovie />} />
            <Route path="/search" element={<Search />} />
            <Route path="/searchResult" element={<SearchResult />} />
          </Route>
        </Routes>
      </BrowserRouter>
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
}

export default App;
