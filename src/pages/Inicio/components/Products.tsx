import Topic from "@/components/Topic";
import {
    faBook,
    faCode,
    faLightbulb,
    faPencilSquare,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Products: React.FC = () => (
    <Topic
        idTopic="produtos"
        titleTopic="Principais produções e produtos"
        bgColor=""
    >
        <ul className="grid gap-6 md:grid-cols-2 mx-6 ">
            <li className="flex items-start text-start">
                <div className="mr-4 rounded-full p-4 w-12 h-12 flex items-center justify-center">
                    <FontAwesomeIcon
                        icon={faLightbulb}
                        size="xl"
                        className="text-slate-400"
                    />
                    {/* <i className="fa fa-lightbulb-o text-xl text-[#8d97ad]"></i> */}
                </div>
                <p className="mt-2 text-slate-400">
                    Investigar as especificidades na tradução do Wai Wai para
                    Português e Português para Wai Wai a partir da literatura
                    específica sobre tradução de línguas do tronco karib.
                </p>
            </li>

            <li className="flex  items-start text-start">
                <div className=" mr-4 rounded-full p-4 w-12 h-12 flex items-center justify-center">
                    <FontAwesomeIcon
                        icon={faPencilSquare}
                        size="xl"
                        className="text-slate-400"
                    />
                </div>
                <p className="mt-2 text-slate-400">
                    Produzir material bilíngue para promover a
                    interculturalidade e conhecimento indígena no ensino básico
                    nas cidades de Santarém e Oriximiná.
                </p>
            </li>

            <li className="flex items-start text-start">
                <div className=" mr-4 rounded-full p-4 w-12 h-12 flex items-center justify-center">
                    <FontAwesomeIcon
                        icon={faBook}
                        size="xl"
                        className="text-slate-400"
                    />
                </div>
                <p className="mt-2 text-slate-400">
                    Produzir material bilíngue para disciplinas e/ou temas de
                    interesse aos acadêmicos indígenas da Ufopa.
                </p>
            </li>
            <li className="flex items-start text-start">
                <div className=" mr-4 rounded-full p-4 w-12 h-12 flex items-center justify-center">
                    <FontAwesomeIcon
                        icon={faCode}
                        size="xl"
                        className="text-slate-400"
                    />
                </div>
                <p className="mt-2 text-slate-400">
                    Desenvolver tecnologia de produção de dicionário bilíngue.
                </p>
            </li>
        </ul>
    </Topic>
);

export default Products;
