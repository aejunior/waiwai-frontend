import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCommentDots } from '@fortawesome/free-regular-svg-icons';
import { faGraduationCap, faComments, faLightbulb, faCode, faSquarePen, faPencilSquare } from '@fortawesome/free-solid-svg-icons';
import Members from '../../components/Members';
import Footer from '../../components/Footer';
import PlayStoreGetInOn from '../../components/Icons/PlayStoreGetInOn';


const Home: React.FC = () => {
    return (
        <div className='flex flex-col justify-between content-center'>
            <div className="grid grid-cols-4 gap-4 content-center">
                <i className="fa-solid fa-user"></i>
                <div className="">
                    <p>
                        Dicionário Wai Wai: significados, conhecimento e interculturalidade
                    </p>
                    <p>
                        Venha conhecer e aprender palavras, termos e conceitos da língua indígena Wai Wai.

                        O aplicativo foi pensado para facilitar a comunicação do aluno indígena no estudo de assuntos técnicos de sua área de estudo,
                        e na preparação de material de aula pelo professor.
                    </p>
                    <PlayStoreGetInOn />
                    {/* <a href="https://play.google.com/store/apps/details?id=com.ufopa.dicionario.waiwai" target="_blank" rel="noopener noreferrer">
                            <GooglePlayBadge />
                        </a> */}
                </div>
                <div className="">
                    <img className="" src="/logo/logo-white.png" alt="Logo Branca Dicionário" />
                </div>
            </div>
            <div className="" id='about'>
                <p className="text-center">
                    Quais são as motivações para criação do projeto?
                </p>
                <p className="">
                    Os povos indígenas falantes da língua wai wai (FOCK, 1963), grupo étnico que agrupa diferentes etnias do norte do Pará e leste de Roraima, são atendidos pelas políticas de ações afirmativas da UFOPA, e frequentam diferentes cursos dentro da instituição (Jácome e Harayama, 2021).
                    Foi observado a existência de uma barreira linguística que compromete o seu desenvolvimento ideal dentro da instituição, que é resultado de um processo estrutural de carência de materiais formativos em língua wai wai-português, assim como na ausência de pesquisas que compreendam as especificidades linguísticas desse grupo no processo de escolarização em contextos não indígenas.
                    O projeto <span className='quotation-marks'>Dicionário Wai Wai: significado, conhecimento e interculturalidade</span> vem com o objetivo central de atuar no combate a essa <span className="quotation-marks">barreiras</span> , por meio da verificação de temas e conceitos cuja tradução necessitem de mediação ou reflexão epistemológica, para a composição de uma base de dados e a criação de um dicionário wai wai.
                </p>
            </div>
            <div className="">
                <p className="text-center">Objetivos e Metas</p>
                <div className="flex flex-row">
                    <div className="flex flex-col">
                        <div className="p-4 shadow-sm bg-orange-600 w-24 h-24 rounded-full flex items-center justify-center">
                            <FontAwesomeIcon className='text-white' size='3x' icon={faCommentDots} />
                        </div>
                        <div><p>Possibilitar a discussão sobre o processo de documentação, revitalização e tradução entre o wai wai e português na forma coloquial, culta e técnico-científica.</p></div>
                    </div>
                    <div className="flex flex-col">
                        <div className="p-6 shadow-sm bg-orange-600 w-24 h-24 rounded-full flex items-center justify-center">
                            <FontAwesomeIcon className='text-white' size='3x' icon={faGraduationCap} /></div>
                        <div><p>Capacitar estudantes dentro da universidade em um processo reflexivo e crítico do processo de documentação linguística, tradução e aprendizagem em contexto intercultural.</p></div>
                    </div>
                    <div className="flex flex-col">
                        <div className="p-4 shadow-sm bg-orange-600 w-24 h-24 rounded-full flex items-center justify-center">
                            <FontAwesomeIcon className='text-white' size='3x' icon={faComments} />
                        </div>
                        <div><p>Socializar com a educação fundamental e sociedade em geral materiais que reflitam as traduções e interfaces entre a língua wai wai e o português.</p></div>
                    </div>
                </div>
            </div>
            <div className="">
                <p className="text-center">
                    Principais Produções e Produtos
                </p>
                <div className="grid grid-cols-2 gap-4 items-center">
                    <div
                        className="flex max-w-xl p-5 bg-white border border-gray-200 rounded-lg shadow"
                    ><div className="flex-none w-8">
                            <FontAwesomeIcon className='text-slate-200' size='lg' icon={faLightbulb} />
                        </div>
                        <div className="flex-1">
                            Investigar as especificidades na tradução do wai wai - português e português - wai wai a partir da literatura específica sobre tradução de línguas do tronco karib.
                        </div>
                    </div>

                    <div className="flex max-w-xl p-5 bg-white border border-gray-200 rounded-lg shadow">
                        <div className="flex-none w-8">
                            <FontAwesomeIcon className='text-slate-200' size='lg' icon={faSquarePen} />
                        </div>
                        <div className="flex-1">
                            Produzir material bilíngue para promover a interculturalidade e conhecimento indígena no ensino básico nas cidades de Santarém e Oriximiná.
                        </div>
                    </div>
                    <div className="flex max-w-xl p-5 bg-white border border-gray-200 rounded-lg shadow">
                        <div className="flex-none w-8">
                            <FontAwesomeIcon className='text-slate-200' size='lg' icon={faPencilSquare} />
                        </div>
                        <div className="flex-1">
                            Produzir material bilíngue para disciplinas e/ou temas de interesse aos acadêmicos indígenas da UFOPA.
                        </div>
                    </div>
                    <div className="flex max-w-xl p-5 bg-white border border-gray-200 rounded-lg shadow">
                        <div className="flex-none w-8">
                            <FontAwesomeIcon className='text-slate-200' size='lg' icon={faCode} />
                        </div>
                        <div className="flex-1">
                            Desenvolver tecnologia de produção de dicionário bilíngue.
                        </div>
                    </div>

                </div >
            </div >
            <div className="flex flex-col justify-center">
                <p className='text-center'>Colaboradores & Time de Desenvolvimento</p>
                <Members />
            </div>
            <Footer />
        </div>

    );
};

export default Home;
