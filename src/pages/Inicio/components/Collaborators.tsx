import Members from "@/components/Members";
import Topic from "@/components/Topic";

const Collaborators: React.FC = () => (
    <Topic
        idTopic="colaboradores"
        titleTopic="Nossos colaboradores"
        bgColor="bg-slate-100"
    >
        <p></p>
        <Members />
    </Topic>
);

export default Collaborators;
