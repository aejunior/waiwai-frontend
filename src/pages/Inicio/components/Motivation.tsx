import Topic from "@/components/Topic";

const Motivation: React.FC = () => (
    <Topic
        idTopic="motivacao"
        titleTopic="Quais foram as motivações para o projeto?"
        bgColor=""
    >
        <p className="text-center px-6 text-lg text-slate-600">
            Os povos indígenas falantes da língua Wai Wai (FOCK, 1963), grupo
            étnico que agrupa diferentes etnias do norte do Pará e leste de
            Roraima, são atendidos pelas políticas de ações afirmativas da
            UFOPA, e frequentam diferentes cursos dentro da instituição (JACOMÉ
            e HARAYAMA, 2021). Foi observado a existência de uma barreira
            linguística que compromete o seu desenvolvimento ideal dentro da
            instituição, que é resultado de um processo estrutural de carência
            de materiais formativos em língua Wai Wai - Português, assim como na
            ausência de pesquisas que compreendam as especificidades
            linguísticas desse grupo no processo de escolarização em contextos
            não indígenas. O projeto{" "}
            <span className="quotation-marks italic">
                Wai Wai Tapota: tradução, conhecimento e interculturalidade
            </span>{" "}
            vem com o objetivo central de atuar no combate a essa{" "}
            <span className="quotation-marks">barreira</span>, por meio da
            verificação de temas e conceitos cuja tradução necessitem de
            mediação ou reflexão epistemológica, para a composição de uma base
            de dados e a criação de um Dicionário Wai Wai.
        </p>
    </Topic>
);

export default Motivation;
