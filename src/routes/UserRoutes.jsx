import { Routes, Route } from "react-router-dom";
import { Landing, Login, Register, ForgotPassword, Flights, Booking, Payment, Dashboard, Profile, Travellers, Password } from "../modules/user/pages";
import { BookingConfirm } from "../modules/user/pages/confirmPage/BookingConfirm";


const UserRoutes = () => {
  return (
    <Routes>
        <Route path="/" element={<Landing/>}></Route>
        <Route path="/login" element={<Login/>}> </Route>
        <Route path="/register" element={<Register/>}> </Route>
        <Route path="/forgot-password" element={<ForgotPassword/>}> </Route>
        <Route path='/flights' element={<Flights/>}></Route>
        <Route path="/booking/details" element={<Booking/>}></Route>
        <Route path="/booking/payment" element={<Payment/>}></Route>
        <Route path="/booking/confirm" element={<BookingConfirm/>}></Route>
        <Route path="/dashboard" element={<Dashboard/>}></Route>
        <Route path="/profile" element={<Profile/>}></Route>
        <Route path="/travellers" element={<Travellers/>}></Route>
        <Route path="/change-password" element={<Password/>}></Route>
    </Routes>
  )
}

export default UserRoutes;