// import { StrictMode } from "react";
import AuthProvider from "./contexts/AuthProvider";
import ReactDOM from "react-dom/client";
import App from "@/App";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <AuthProvider>
        <App />
    </AuthProvider>
);
