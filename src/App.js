import Home from "./page/Home/Home";
import Index from "./page/Home/Index";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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
import TicketEmail from "./components/email/TicketEmail";
import ForgotPassword from "./components/user/forgotPassword";
import Admin from "./components/Admin/Admin";
import ManageUser from "./components/Admin/ManageUser/ManageUser";
import CinemaAdmin from "./components/Admin/CinemaAdmin/CinemaAdmin";
import FilmAdmin from "./components/Admin/FilmAdmin/FilmAdmin";
import FoodAdmin from "./components/Admin/FoodAdmin/FoodAdmin";
import RoomAdmin from "./components/Admin/RoomAdmin/RoomAdmin";
import ShowtimeAdmin from "./components/Admin/ShowtimeAdmin/ShowtimeAdmin";
import VoucherAdmin from "./components/Admin/VoucherAdmin/VoucherAdmin";

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
            <Route path="/ticketemail" element={<TicketEmail />} />
            <Route path="/forgotpassword" element={<ForgotPassword />} />
          </Route>
          <Route path="admin" element={<Admin />}>
            <Route path="/admin/manageuser" element={<ManageUser />} />
            <Route path="/admin/cinemaadmin" element={<CinemaAdmin />} />
            <Route path="/admin/filmadmin" element={<FilmAdmin />} />
            <Route path="/admin/foodadmin" element={<FoodAdmin />} />
            <Route path="/admin/roomadmin" element={<RoomAdmin />} />
            <Route path="/admin/showtimeadmin" element={<ShowtimeAdmin />} />
            <Route path="/admin/voucheradmin" element={<VoucherAdmin />} />
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
