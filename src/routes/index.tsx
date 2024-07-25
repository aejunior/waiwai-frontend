// Layouts
import AnonymousLayout from "../layouts/AnonymousLayout";
import MainLayout from "../layouts/MainLayout";

import { RouterProvider, createBrowserRouter, Link } from 'react-router-dom';
import { useAuth } from '../provider/authProvider';
import { ProtectedRoute } from './ProtectedRoute';
import Members from '../components/Members';
// import { Login } from '../pages/Login';
import Home from '../pages/Home';

export default function Routes() {
    // const { token } = useAuth();

    const routesForPublic = [
        {
            path: '/',
            element: <Home />,
        },
        {
            path: '/about-us',
            element: <h1>About Us</h1>,
        },
    ];

    const routesForNotAuthenticatedOnly = [
        {
            path: '/',
            element: <> <h1>Home Page</h1><Link to='/login-auth'>Login</Link></>,
        },
        {
            path: '/login',
            element: <h1>Login</h1>,
        },
        {
            path: '/login-auth',
            element: <h1>Login Auth</h1>// <Login />,
        },
    ];

    const routesForAuthenticatedOnly = [
        {
            path: '/',
            element: <ProtectedRoute />,
            // children: [
            //     {
            //         path: '/',
            //         element: <><h1 className="auth-path">User Home Page</h1><Link to='/logout'>Logout</Link></>,
            //     },
            //     {
            //         path: '/profile',
            //         element: <h1 className="auth-path">User Profile</h1>,
            //     },
            //     {
            //         path: '/logout',
            //         element: <h1>Logout</h1>//<Logout className="auth-path" />,
            //     },
            // ],
        },
    ];

    const router = createBrowserRouter([
        ...routesForPublic,
        ...routesForNotAuthenticatedOnly
        // ...(!token ? routesForNotAuthenticatedOnly : []),
        // ...routesForAuthenticatedOnly
    ]);

    return <RouterProvider router={router} />;
}
