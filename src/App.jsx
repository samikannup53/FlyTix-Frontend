import { ToastContainer } from "react-toastify";
import UserRoutes from "./routes/UserRoutes";
import { CookieBanner } from "./modules/user/components";

function App() {
  return (
    <>
      <CookieBanner />
      <UserRoutes />
      <ToastContainer
        position="top-right"
        autoClose={4000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        draggable
      />
    </>
  );
}

export default App;
