import React from "react";
import { Outlet } from "react-router-dom";
import Header from "@/components/Layouts/Header";
import Footer from "@/components/Layouts/Footer";

const MainLayout: React.FC = () => {
    return (
        <>
            <Header />
            <main className="dark:bg-gray-dark relative z-10 overflow-hidden bg-white pb-16 pt-[120px] md:pb-[120px] md:pt-[150px] xl:pb-[160px] xl:pt-[180px] 2xl:pb-[200px] 2xl:pt-[210px]">
                <Outlet />
            </main>
            <Footer />
        </>
    );
};

export default MainLayout;
