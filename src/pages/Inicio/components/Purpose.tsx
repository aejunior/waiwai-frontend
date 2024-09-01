import Topic from "@/components/Topic";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faCommenting,
    faGraduationCap,
    faComments,
} from "@fortawesome/free-solid-svg-icons";

const Purpose: React.FC = () => (
    <Topic
        idTopic="proposito"
        titleTopic="Objetivos e Metas"
        bgColor="bg-slate-100"
    >
        <ul className="grid gap-6 md:grid-cols-3 mx-6">
            <li className="flex flex-col items-center text-center">
                <div className="bg-primary rounded-full p-4 w-12 h-12 flex items-center justify-center">
                    <FontAwesomeIcon
                        icon={faCommenting}
                        size="lg"
                        className="text-white opacity-75"
                    />
                </div>
                <p className="mt-2">
                    Possibilitar a discussão sobre o processo de documentação,
                    revitalização e tradução entre o Wai Wai e Português na
                    forma coloquial, culta e técnico-científica.
                </p>
            </li>

            <li className="flex flex-col items-center text-center ">
                <div className="bg-primary rounded-full p-4 w-12 h-12 flex items-center justify-center">
                    <FontAwesomeIcon
                        icon={faGraduationCap}
                        size="lg"
                        className="text-white opacity-75"
                    />
                </div>
                <p className="mt-2">
                    Capacitar estudantes dentro da universidade em um processo
                    reflexivo e crítico do processo de documentação linguística,
                    tradução e aprendizagem em contexto intercultural.
                </p>
            </li>

            <li className="flex flex-col items-center text-center">
                <div className="bg-primary rounded-full p-4 w-12 h-12 flex items-center justify-center">
                    <FontAwesomeIcon
                        icon={faComments}
                        size="lg"
                        className="text-white opacity-75"
                    />
                </div>
                <p className="mt-2">
                    Socializar com a educação fundamental e sociedade em geral
                    materiais que reflitam as traduções e interfaces entre a
                    língua wai wai e o português.
                </p>
            </li>
        </ul>
    </Topic>
);

export default Purpose;
