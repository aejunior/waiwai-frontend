// ./App.js

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/page";
import Home from "./pages/Home";
// ...
import About from "./pages/About";

function App() {
    const router = createBrowserRouter([
        {
            // parent route component
            element: <Layout />,
            // child route components
            children: [
                {
                    path: "/",
                    element: <Home />,
                },
                // other pages....
                {
                    path: "/about",
                    element: <About />,
                },
            ],
        },
    ]);

    return <RouterProvider router={router} />;
}

export default App;
