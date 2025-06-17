import { Routes, Route } from "react-router-dom";
import { Landing } from "../modules/user/pages";

const UserRoutes = () => {
  return (
    <Routes>
        <Route path="/" element={<Landing/>}></Route>
    </Routes>
  )
}

export default UserRoutes;