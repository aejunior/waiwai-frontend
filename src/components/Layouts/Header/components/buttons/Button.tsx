import { Link } from "react-router-dom";

interface ButtonProps {
    url: string;
    classes: string;
    texto: string;
}

const Button: React.FC<ButtonProps> = ({ url, classes, texto }) => {
    return (
        <Link to={url} className={classes}>
            {texto}
        </Link>
    );
};

export default Button;
