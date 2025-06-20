import { Routes, Route } from "react-router-dom";
import { Landing, Login, Register, ForgotPassword, Flights, Booking } from "../modules/user/pages";

const UserRoutes = () => {
  return (
    <Routes>
        <Route path="/" element={<Landing/>}></Route>
        <Route path="/login" element={<Login/>}> </Route>
        <Route path="/register" element={<Register/>}> </Route>
        <Route path="/forgot-password" element={<ForgotPassword/>}> </Route>
        <Route path='/flights' element={<Flights/>}></Route>
        <Route path="/booking" element={<Booking/>}></Route>
    </Routes>
  )
}

export default UserRoutes;