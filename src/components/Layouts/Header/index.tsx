import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Button from "./components/buttons/Button";

const Header: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [activeIndex, setActiveIndex] = useState(0);
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    const buttons = [
        { url: "/", texto: "Home" },
        { url: "/dicionario", texto: "Dicionario" },
    ];

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    useEffect(() => {
        const currentIndex = buttons.findIndex(
            (button) => button.url === location.pathname
        );
        setActiveIndex(currentIndex !== -1 ? currentIndex : 0);
    }, [location.pathname]);

    return (
        <header className={`fixed w-full top-0 left-0 z-50 ${
                    isScrolled
                        ? "md:bg-white md:shadow-md"
                        : "md:bg-transparent"
                } bg-[#D9AA71]`}>
            <nav
                className="text-black transition-colors duration-500 md:max-w-[1200px] md:mx-auto md:flex md:justify-between py-2 px-4 grid grid-rows-[auto_auto] grid-cols-1"
            >
                <div className="flex items-center justify-between">
                    <img
                        src="/logo/logo-bar-colored.png"
                        alt="Logo"
                        className="w-20 md:w-18 h-auto"
                    />

                    <button
                        className="md:hidden text-white flex flex-col items-center space-y-1"
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        <div className="w-6 h-1 bg-white rounded-full"></div>
                        <div className="w-6 h-1 bg-white rounded-full"></div>
                        <div className="w-6 h-1 bg-white rounded-full"></div>
                    </button>
                </div>

                {/* Mobile Menu */}
                <section
                    className={`md:hidden ${
                        isOpen
                            ? "max-h-screen opacity-100"
                            : "max-h-0 opacity-0"
                    } transition-all duration-500 ease-in-out text-white mt-2 overflow-hidden bg-[#D9AA71] `}
                >
                    <ul className="flex flex-col items-start mt-4 space-y-4 text-[#263741]">
                        {buttons.map((button, index) => (
                            <li key={index}>
                                <Button
                                    url={button.url}
                                    classes={`text-white hover:text-gray-400 ${
                                        activeIndex === index
                                            ? "border-b border-primary"
                                            : ""
                                    }`}
                                    texto={button.texto}
                                    onClick={() => {
                                        setActiveIndex(index);
                                        setIsOpen(false);
                                        navigate(button.url);
                                    }}
                                />
                            </li>
                        ))}
                        <div className="flex justify-center w-full space-x-4">
                            <li>
                                <Button
                                    url="/entrar"
                                    classes="border border-white text-white flex px-6 py-2 rounded-lg hover:bg-white hover:text-[#263741] transition duration-300"
                                    texto="Entrar"
                                />
                            </li>
                            <li>
                                <Button
                                    url="/registrar"
                                    classes="border border-transparent bg-primary text-white flex px-4 py-2 rounded-lg hover:bg-white hover:text-[#263741] transition duration-300"
                                    texto="Registrar"
                                />
                            </li>
                        </div>
                    </ul>
                </section>

                {/* Desktop Menu */}
                <section className="hidden md:flex space-x-6 items-center">
                    <ul className="flex space-x-4">
                        {buttons.map((button, index) => (
                            <li key={index}>
                                <Button
                                    url={button.url}
                                    classes={`hover:text-gray-400 text-[#263741] ${
                                        activeIndex === index
                                            ? "border-b border-primary"
                                            : ""
                                    }`}
                                    texto={button.texto}
                                    onClick={() => {
                                        setActiveIndex(index);
                                        navigate(button.url);
                                    }}
                                />
                            </li>
                        ))}
                    </ul>

                    <div className="flex space-x-4">
                        <Button
                            url="/entrar"
                            classes="border border-[#263741] text-[#263741] px-4 py-2 rounded-lg hover:bg-[#C8554A] hover:border-primary hover:text-white transition duration-300"
                            texto="Entrar"
                        />
                        <Button
                            url="/registrar"
                            classes="border border-primary bg-primary text-white px-4 py-2 rounded-lg hover:bg-[#C8554A] transition duration-300"
                            texto="Registrar"
                        />
                    </div>
                </section>
            </nav>
        </header>
    );
};

export default Header;