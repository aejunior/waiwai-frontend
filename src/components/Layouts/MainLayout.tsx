import { Outlet } from "react-router-dom";
import Header from "@/components/Layouts/Header";
import Footer from "@/components/Layouts/Footer";
import Message from "../Message";
const MainLayout: React.FC = () => {
    return (
        <>
            <Header />
            <Message/>
            <main>
                <Outlet />
            </main>
            <Footer />
        </>
    );
};

export default MainLayout;
