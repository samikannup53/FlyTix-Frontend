import { Routes, Route } from "react-router-dom";
import { Landing, Login, Register, ForgotPassword } from "../modules/user/pages";

const UserRoutes = () => {
  return (
    <Routes>
        <Route path="/" element={<Landing/>}></Route>
        <Route path="/login" element={<Login/>}> </Route>
        <Route path="/register" element={<Register/>}> </Route>
        <Route path="/forgot-password" element={<ForgotPassword/>}> </Route>
    </Routes>
  )
}

export default UserRoutes;