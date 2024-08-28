import Badge from "./Badge";
import { BookIcon, EnvelopeIcon, GitHubIcon, LinkedInIcon } from "@/icons";

import {
    MemberType,
    ContactType,
    SocialEnum,
    RoleEnum,
} from "@/types/memberTypes";

import { v4 as uuidv4 } from "uuid";
type MemberCardProps = {
    member: MemberType;
};

function getSocial(social: ContactType) {
    switch (social.typeContact) {
        case SocialEnum.EMAIL:
            return (
                <a href={`mailto:${social.value}`}>
                    <EnvelopeIcon />
                </a>
            );
        case SocialEnum.GITHUB:
            return (
                <a href={social.value} target="_blank" rel="noreferrer">
                    <GitHubIcon />
                </a>
            );
        case SocialEnum.LINKEDIN:
            return (
                <a href={social.value} target="_blank" rel="noreferrer">
                    <LinkedInIcon />
                </a>
            );
        case SocialEnum.LATTES:
            return (
                <a href={social.value} target="_blank" rel="noreferrer">
                    <BookIcon />
                </a>
            );
    }
}
function getRole(role: RoleEnum): React.ReactNode {
    const keyBadge = uuidv4();
    switch (role) {
        case RoleEnum.PROFESSOR:
            return (
                <Badge key={keyBadge} textBadge={"Professor(a)"} color="red" />
            );

        case RoleEnum.STUDENT:
            return (
                <Badge key={keyBadge} textBadge={"Estudante"} color="yellow" />
            );
        case RoleEnum.RESEARCHER:
            return (
                <Badge
                    key={keyBadge}
                    textBadge={"Pesquisador(a)"}
                    color="green"
                />
            );
        case RoleEnum.DEVELOPER:
            return (
                <Badge
                    key={keyBadge}
                    textBadge={"Desenvolvedor"}
                    color="blue"
                />
            );
        case RoleEnum.MANAGER:
            return (
                <Badge key={keyBadge} textBadge={"Gerente"} color="indigo" />
            );
        case RoleEnum.DESIGNER:
            return (
                <Badge key={keyBadge} textBadge={"Designer"} color="purple" />
            );
        case RoleEnum.INTERDISCIPLINARY:
            return (
                <Badge
                    key={keyBadge}
                    textBadge={"Equipe Interdisciplinar"}
                    color="pink"
                />
            );
    }
}

const MemberCard: React.FC<MemberCardProps> = ({ member }) => {
    return (
        <>
            <div className="w-full max-w-xs bg-white border rounded-lg shadow">
                <div className="flex flex-col items-center py-5">
                    <img
                        className="w-24 h-24 mb-3 rounded-full shadow-lg"
                        src={member.avatar}
                        alt={member.fullName}
                    />
                    <h5 className="mb-1 text-xl font-medium text-gray-900 ">
                        {member.fullName}
                    </h5>
                    <div className="flex gap-1 mb-3">
                        {" "}
                        {member.roles.map((role: RoleEnum) => getRole(role))}
                    </div>
                    <div className="flex gap-4">
                        {member.contacts.map((social: ContactType) => {
                            const keySocial = uuidv4();
                            return (
                                <div className="flex-none" key={keySocial}>
                                    {getSocial(social)}
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </>
    );
};

export default MemberCard;
