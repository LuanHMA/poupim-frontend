import { ToastContainer, Zoom, } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export function ToastifyProvider() {
    return (
        <ToastContainer 
        position="top-right"
        transition={Zoom}
        autoClose={3000}
        hideProgressBar={false}
        closeOnClick
        pauseOnFocusLoss
        draggable
        theme="dark"
        />
    )
}