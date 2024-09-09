import { Outlet } from "react-router-dom";
import Header from "@/components/Layouts/Header";
import Footer from "@/components/Layouts/Footer";
import MessageBox from "../MessageBox";
const MainLayout: React.FC = () => {
    return (
        <>
            <Header />
            {/* <MessageBox /> */}
            <main>
                <Outlet />
            </main>
            <Footer />
        </>
    );
};

export default MainLayout;
