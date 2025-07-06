import { ToastContainer } from "react-toastify";
import UserRoutes from "./routes/UserRoutes";

function App() {
  return (
    <>
      <UserRoutes />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        draggable
      />
    </>
  );
}

export default App;
