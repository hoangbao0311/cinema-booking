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
import FoodAdmin from "./components/Admin/FoodAdmin/FoodAdmin";
import RoomAdmin from "./components/Admin/RoomAdmin/RoomAdmin";
import ShowtimeAdmin from "./components/Admin/ShowtimeAdmin/ShowtimeAdmin";
import VoucherAdmin from "./components/Admin/VoucherAdmin/VoucherAdmin";
import FilmHome from "./components/Admin/FilmAdmin/FilmHome";
import FilmNew from "./components/Admin/FilmAdmin/FilmNew";
import EditFilm from "./components/Admin/FilmAdmin/EditFilm";
import EditRoom from "./components/Admin/RoomAdmin/EditRoom";
import RoomNew from "./components/Admin/RoomAdmin/RoomNew";
import CinemaNew from "./components/Admin/CinemaAdmin/CinemaNew";
import EditCinema from "./components/Admin/CinemaAdmin/EditCinema";
import ShowtimeNew from "./components/Admin/ShowtimeAdmin/ShowtimeNew";
import EditShowtime from "./components/Admin/ShowtimeAdmin/EditShowtime";
import FoodEdit from "./components/Admin/FoodAdmin/FoodEdit";
import FoodNew from "./components/Admin/FoodAdmin/FoodNew";
import VoucherNew from "./components/Admin/VoucherAdmin/VoucherNew";
import Staff from "./components/Staff/Staff";
import BookingManage from "./components/Staff/BookingManage/BookingManage";
import CommentManage from "./components/Staff/CommentManage/CommentManage";
import CustomerManage from "./components/Staff/CustomerManage/CustomerManage";
import Report from "./components/Staff/InvoiceManage/Report.js";
import ReviewManage from "./components/Staff/ReviewManage/ReviewManage";
import VoteManage from "./components/Staff/VoteManage/VoteManage";
import TicketDetail from "./components/Staff/BookingManage/TicketDetail.js";


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
            <Route path="/admin/filmhome" element={<FilmHome />} />
            <Route path="/admin/filmhome/:id" element={<EditFilm />} />
            <Route path="/admin/filmnew" element={<FilmNew />} />
            <Route path="/admin/roomadmin" element={<RoomAdmin />} />
            <Route path="/admin/roomnew" element={<RoomNew />} />
            <Route path="/admin/editroom/:id" element={<EditRoom />} />
            <Route path="/admin/cinemaadmin" element={<CinemaAdmin />} />
            <Route path="/admin/cinemanew" element={<CinemaNew />} />
            <Route path="/admin/editcinema/:id" element={<EditCinema />} />
            <Route path="/admin/foodadmin" element={<FoodAdmin />} />
            <Route path="/admin/showtimeadmin" element={<ShowtimeAdmin />} />
            <Route path="/admin/showtimenew" element={<ShowtimeNew />} />
            <Route path="/admin/editshowtime/:id" element={<EditShowtime />} />
            <Route path="/admin/voucheradmin" element={<VoucherAdmin />} />
            <Route path="/admin/foodadmin/:id" element={<FoodEdit />} />
            <Route path="/admin/foodNew" element={<FoodNew />} />
            <Route path="/admin/vouchernew" element={<VoucherNew />} />
          </Route>
          <Route path="staff" element={<Staff />}>
            <Route path="/staff/bookingManage" element={<BookingManage />} />
            <Route path="/staff/commentManage" element={<CommentManage />} />
            <Route path="/staff/customerManage" element={<CustomerManage />} />
            <Route path="/staff/Report" element={<Report />} />
            <Route path="/staff/reviewManage" element={<ReviewManage />} />
            <Route path="/staff/voteManage" element={<VoteManage />} />
            <Route path="/staff/ticketDetail/:id" element={<TicketDetail />} />
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
