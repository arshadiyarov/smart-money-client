import { ToastContainer } from "react-toastify";
import "./toast.scss";

function Toast() {
  return (
    <ToastContainer
      position="top-right"
      autoClose={5000}
      closeOnClick
      pauseOnHover
      newestOnTop
      theme="colored"
    />
  );
}

export default Toast;
