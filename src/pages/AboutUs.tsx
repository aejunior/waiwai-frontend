import {
  BookOutlined,
  BulbOutlined,
  CodeOutlined,
  CommentOutlined,
  EditOutlined,
  RocketOutlined,
} from "@ant-design/icons";
import { members } from "../constains";
import { CollaboratorsSection } from "../components/CollaboratorsSection";

export function AboutUs() {
  return (
    <div className="space-y-12">
      <section
        style={{
          backgroundImage: `url("imagens/bg.png")`,
        }}
        className="py-12"
      >
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col-reverse md:flex-row items-center gap-8">
              <div className="w-full md:w-1/2 text-center md:text-left">
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-white">
                  Tradução, conhecimento e interculturalidade
                </h1>
                <h2 className="text-lg sm:text-xl md:text-2xl mb-6 text-white">
                  Venha conhecer e aprender palavras, termos e conceitos da
                  língua indígena Wai Wai. O aplicativo foi pensado para
                  facilitar a comunicação do aluno indígena no estudo de
                  assuntos técnicos de sua área de estudo, e na preparação de
                  material de aula pelo professor.
                </h2>
              </div>
              <div className="w-full md:w-1/2 flex justify-center">
                <img
                  src="/imagens/logo-white.png"
                  alt="Logo"
                  className="w-2/3 sm:w-1/2 md:w-full max-w-xs md:max-w-sm lg:max-w-md"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className={` px-4 sm:px-6 lg:px-8`}>
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col items-center text-center">
            <h1 className="text-2xl sm:text-3xl font-semibold text-slate-700 ">
              Quais foram as motivações para o projeto?
            </h1>
            <h2 className="font-bold mb-4"></h2>
            <p className="text-justify px-4 sm:px-6 md:px-12 text-base sm:text-lg text-slate-600 leading-relaxed">
              Os povos indígenas falantes da língua Wai Wai (FOCK, 1963), grupo
              étnico que agrupa diferentes etnias do norte do Pará e leste de
              Roraima, são atendidos pelas políticas de ações afirmativas da
              UFOPA, e frequentam diferentes cursos dentro da instituição
              (JACOMÉ e HARAYAMA, 2021). Foi observado a existência de uma
              barreira linguística que compromete o seu desenvolvimento ideal
              dentro da instituição, que é resultado de um processo estrutural
              de carência de materiais formativos em língua Wai Wai - Português,
              assim como na ausência de pesquisas que compreendam as
              especificidades linguísticas desse grupo no processo de
              escolarização em contextos não indígenas. O projeto
              <span className="quotation-marks italic">
                Wai Wai Tapota: tradução, conhecimento e interculturalidade
              </span>
              vem com o objetivo central de atuar no combate a essa
              <span className="quotation-marks">barreira</span>, por meio da
              verificação de temas e conceitos cuja tradução necessitem de
              mediação ou reflexão epistemológica, para a composição de uma base
              de dados e a criação de um Dicionário Wai Wai.
            </p>
          </div>
        </div>
      </section>
      <section className={` px-4 sm:px-6 lg:px-8`}>
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col items-center text-center">
            <h1 className="text-2xl sm:text-3xl font-semibold text-slate-700 mb-6">
              Objetivos e Metas
            </h1>
            <ul className="grid gap-6 md:grid-cols-3 mx-6">
              <li className="flex flex-col items-center text-center">
                <div className="bg-primary rounded-full p-4 w-12 h-12 flex items-center justify-center">
                  <CommentOutlined className="text-white opacity-75" />
                </div>
                <p className="mt-2">
                  Possibilitar a discussão sobre o processo de documentação,
                  revitalização e tradução entre o Wai Wai e Português na forma
                  coloquial, culta e técnico-científica.
                </p>
              </li>

              <li className="flex flex-col items-center text-center ">
                <div className="bg-primary rounded-full p-4 w-12 h-12 flex items-center justify-center">
                  <BookOutlined className="text-white opacity-75" />
                </div>
                <p className="mt-2">
                  Capacitar estudantes dentro da universidade em um processo
                  reflexivo e crítico do processo de documentação linguística,
                  tradução e aprendizagem em contexto intercultural.
                </p>
              </li>

              <li className="flex flex-col items-center text-center">
                <div className="bg-primary rounded-full p-4 w-12 h-12 flex items-center justify-center">
                  <RocketOutlined className="text-white opacity-75" />
                </div>
                <p className="mt-2">
                  Socializar com a educação fundamental e sociedade em geral
                  materiais que reflitam as traduções e interfaces entre a
                  língua wai wai e o português.
                </p>
              </li>
            </ul>
          </div>
        </div>
      </section>
      <section className={` px-4 sm:px-6 lg:px-8`}>
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col items-center text-center">
            <h1 className="text-2xl sm:text-3xl font-semibold text-slate-700 mb-6">
              Principais produções e produtos
            </h1>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-8 px-4 sm:px-6 md:px-12">
              <li className="flex items-start">
                <div className="mr-4 p-4 w-12 h-12 flex items-center justify-center rounded-full bg-slate-100">
                  <BulbOutlined />
                </div>
                <p className="text-slate-600 text-base leading-relaxed">
                  Investigar as especificidades na tradução do Wai Wai para
                  Português e Português para Wai Wai a partir da literatura
                  específica sobre tradução de línguas do tronco karib.
                </p>
              </li>

              <li className="flex items-start">
                <div className="mr-4 p-4 w-12 h-12 flex items-center justify-center rounded-full bg-slate-100">
                  <EditOutlined />
                </div>
                <p className="text-slate-600 text-base leading-relaxed">
                  Produzir material bilíngue para promover a interculturalidade
                  e conhecimento indígena no ensino básico nas cidades de
                  Santarém e Oriximiná.
                </p>
              </li>

              <li className="flex items-start">
                <div className="mr-4 p-4 w-12 h-12 flex items-center justify-center rounded-full bg-slate-100">
                  <BookOutlined />
                </div>
                <p className="text-slate-600 text-base leading-relaxed">
                  Produzir material bilíngue para disciplinas e/ou temas de
                  interesse aos acadêmicos indígenas da Ufopa.
                </p>
              </li>

              <li className="flex items-start">
                <div className="mr-4 p-4 w-12 h-12 flex items-center justify-center rounded-full bg-slate-100">
                  <CodeOutlined />
                </div>
                <p className="text-slate-600 text-base leading-relaxed">
                  Desenvolver tecnologia de produção de dicionário bilíngue.
                </p>
              </li>
            </ul>
          </div>
        </div>
      </section>
      <CollaboratorsSection members={members} />
    </div>
  );
}
