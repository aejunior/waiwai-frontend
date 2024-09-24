import App from "@/App";
import ReactDOM from "react-dom/client";
import ContextProvider from "./contexts/ContextProvider";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <ContextProvider>
        <App />
    </ContextProvider>
);
