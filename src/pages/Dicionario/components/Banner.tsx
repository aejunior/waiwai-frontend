import styled from "styled-components";

const Section = styled.section`
    background-image: url("/bg.png");
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
`;
const Banner: React.FC = () => {
    return (
        <Section
            id="aplicativo"
            className="md:-mt-20 w-full pt-28 pb-12 px-4 text-white text-center"
        >
            <div className="max-w-screen-xl mx-auto">
                <h1 className="text-4xl font-bold mb-4">Dicionario Wai Wai</h1>
                <h2 className="text-xl">
                    Conheça todas as palavras, termos e conceitos da língua
                    indígena Wai Wai.
                </h2>
            </div>
        </Section>
    );
};

export default Banner;
