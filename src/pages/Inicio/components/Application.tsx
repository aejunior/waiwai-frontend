import { PlayStoreGetInOn } from "@/components/Icons";
import styled from "styled-components";

const Section = styled.section`
    background-image: url("/bg.png");
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
`;
const Application: React.FC = () => (
    <Section
        id="aplicativo"
        className="dark:bg-gray-dark text-white bg-white relative z-10 overflow-hidden pb-16 pt-[60px] md:pb-[60px] md:pt-[75px] xl:pb-[80px] xl:pt-[90px] 2xl:pb-[100px] 2xl:pt-[105px]"
    >
        <div className="-mx-4 flex flex-wrap">
            <div className="w-full px-4">
                <div
                    className="wow fadeInUp mx-auto text-center"
                    data-wow-delay=".2s"
                >
                    <div className="md:mt-12 md:max-w-screen-xl md:mx-auto flex flex-col md:flex-row items-center">
                        <img
                            src="/logo/logo-white.png"
                            alt="Logo"
                            className=" md:w-1/3 mx-4 "
                        />
                        <div className="text-center sm:w-2/3 ">
                            <h1 className="text-5xl font-bold mt-8 md:mt-0 mb-2">
                                Tradução, conhecimento e interculturalidade
                            </h1>
                            <h2 className="text-2xl mt-6 mb-4">
                                Venha conhecer e aprender palavras, termos e
                                conceitos da língua indígena Wai Wai. O
                                aplicativo foi pensado para facilitar a
                                comunicação do aluno indígena no estudo de
                                assuntos técnicos de sua área de estudo, e na
                                preparação de material de aula pelo professor.
                            </h2>
                            <PlayStoreGetInOn />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </Section>
);

export default Application;
