import { Routes, Route } from "react-router-dom";
import { Landing, Login, Register, ForgotPassword, Flights, Booking, Payment, Dashboard, Profile, Travellers, Password } from "../modules/user/pages";
import { BookingConfirm } from "../modules/user/pages/confirmPage/BookingConfirm";
import PrivateRoute from "./PrivateRoutes";


const UserRoutes = () => {
  return (
    <Routes>
        <Route path="/" element={<Landing/>}></Route>
        <Route path="/login" element={<Login/>}> </Route>
        <Route path="/register" element={<Register/>}> </Route>
        <Route path="/forgot-password" element={<ForgotPassword/>}> </Route>
        <Route path='/flights' element={<Flights/>}></Route>

        <Route path="/booking/initiate" element={<PrivateRoute><Booking/></PrivateRoute>}/>
        <Route path="/booking/payment/:bookingId" element={<PrivateRoute><Payment/></PrivateRoute>}/>
        <Route path="/booking/confirm/:bookingId" element={<PrivateRoute><BookingConfirm/></PrivateRoute>}/>
        <Route path="/dashboard" element={<PrivateRoute><Dashboard/></PrivateRoute>}/>
        <Route path="/profile" element={<PrivateRoute><Profile/></PrivateRoute>}/>
        <Route path="/travellers" element={<PrivateRoute><Travellers/></PrivateRoute>}/>
        <Route path="/change-password" element={<PrivateRoute><Password/></PrivateRoute>}/>
    </Routes>
  )
}

export default UserRoutes;