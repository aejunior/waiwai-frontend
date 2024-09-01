const Footer: React.FC = () => {
    return (
        <footer>
            <div className="w-full md:max-w-screen-xl mx-auto p-4 md:py-8">
                <div className="md:flex md:flex-row-reverse ">
                    <ul className="flex flex-wrap items-center mb-6 text-md font-medium md:mb-0 dark:text-gray-400 ">
                        <li>
                            <a
                                href="#aplicativo"
                                className="hover:underline me-4 md:me-6"
                            >
                                Sobre nós
                            </a>
                        </li>
                        <li>
                            <a
                                href="https://docs.google.com/document/d/1PYYkZTznMVp6ELcrGOrMwyHwiDBzx3n-2WAQwB9uaxg"
                                target="_blank"
                                rel="noreferrer"
                                className="hover:underline me-4 md:me-6"
                            >
                                Política de Privacidade
                            </a>
                        </li>
                        <li>
                            <a
                                href="http://www.ufopa.edu.br/ufopa/"
                                target="_blank"
                                rel="noreferrer"
                                className="me-4 md:me-6 hover:underline"
                            >
                                Site UFOPA
                            </a>
                        </li>
                        <li>
                            <a
                                href="mailto:dicionariowaiwai@ufopa.edu.br"
                                className="hover:underline "
                            >
                                Email
                            </a>
                        </li>
                    </ul>
                </div>
                <hr className="my-6 md:mx-auto dark:text-gray-400 lg:my-8" />
                <span className="block text-md text-gray-500 md:text-center dark:text-gray-400">
                    © 2024{" "}
                    <a
                        href="https://www.ufopa.edu.br/oriximina/"
                        target="_blank"
                        rel="noreferrer"
                        className="hover:underline"
                    >
                        UFOPA - CAMPUS ORIXIMINÁ
                    </a>
                    . Todos os direitos reservados.
                </span>
            </div>
        </footer>
    );
};

export default Footer;
