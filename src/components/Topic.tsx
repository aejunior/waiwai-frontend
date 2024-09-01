type TopicProps = {
    idTopic: string;
    titleTopic: string;
    children: React.ReactNode;
    bgColor: string;
};

const Topic: React.FC<TopicProps> = ({
    idTopic,
    titleTopic,
    children,
    bgColor,
}) => (
    <section id={idTopic} className={bgColor}>
        <div className="container py-16">
            <div className="flex flex-col items-center">
                <h1 className="text-3xl font-semibold text-slate-700 pb-6">
                    {titleTopic}
                </h1>
                <h2 className=" font-bold text-center mb-4"></h2>
                {children}
            </div>
        </div>
    </section>
);

export default Topic;
