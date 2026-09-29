import { ToastContainer, Zoom, } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export function ToastifyProvider() {
    return (
        <ToastContainer 
        position="top-right"
        transition={Zoom}
        autoClose={3000}
        hideProgressBar={true}
        closeOnClick
        pauseOnFocusLoss
        draggable
        theme="dark"
        />
    )
}