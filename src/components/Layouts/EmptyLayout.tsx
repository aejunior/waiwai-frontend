import { Outlet } from "react-router-dom";
import Header from "@/components/Layouts/Header";
import Footer from "@/components/Layouts/Footer";

const EmptyLayout: React.FC = () => {
    return (
        <>
            <Header />
            <main>
                <Outlet />
            </main>
            <Footer />
        </>
    );
};

export default EmptyLayout;
