import {
    Application,
    Collaborators,
    Motivation,
    Products,
    Purpose,
} from "@/pages/Inicio/components";

const Inicio: React.FC = () => {
    return (
        <>
            <Application />
            <Motivation />
            <Purpose />
            <Products />
            <Collaborators />
        </>
    );
};

export default Inicio;
