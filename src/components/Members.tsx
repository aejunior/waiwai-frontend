import { MemberType, RoleEnum, SocialEnum } from "@/types/memberTypes";
import { useMemo } from "react";

import MemberCard from "@/components/MemberCard";

const members: MemberType[] = [
    {
        id: 1,
        fullName: "Crystian C. Printes",
        avatar: "/team/crystian.png",
        roles: [RoleEnum.DEVELOPER, RoleEnum.STUDENT],
        contacts: [
            {
                value: "https://www.linkedin.com/in/crystian-printes-b052691b7/",
                typeContact: SocialEnum.LINKEDIN,
            },
            {
                value: "crystianprintes.ufopa@gmail.com",
                typeContact: SocialEnum.EMAIL,
            },
        ],
    },
    {
        id: 2,
        fullName: "Marcos V. Printes",
        avatar: "/team/marcos.png",
        roles: [RoleEnum.DEVELOPER, RoleEnum.STUDENT],
        contacts: [
            {
                value: "https://www.linkedin.com/in/marcos-vinicius-de-castro-printes-b22442201",
                typeContact: SocialEnum.LINKEDIN,
            },
            {
                value: "mvprintes2@gmail.com",
                typeContact: SocialEnum.EMAIL,
            },
        ],
    },
    {
        id: 3,
        fullName: "Débora Marcião dos Santos",
        avatar: "/team/debora.png",
        roles: [RoleEnum.STUDENT, RoleEnum.DESIGNER],
        contacts: [
            {
                value: "http://lattes.cnpq.br/1806104313800692",
                typeContact: SocialEnum.LATTES,
            },
            {
                value: "debeokjin@gmail.com",
                typeContact: SocialEnum.EMAIL,
            },
        ],
    },
    {
        id: 4,
        fullName: "Camila Pereira Jácome",
        avatar: "/team/camila.png",
        roles: [RoleEnum.PROFESSOR, RoleEnum.RESEARCHER],
        contacts: [
            {
                value: "http://lattes.cnpq.br/0219164021278742",
                typeContact: SocialEnum.LATTES,
            },
            {
                value: "camilajacome88@gmail.com",
                typeContact: SocialEnum.EMAIL,
            },
        ],
    },
    {
        id: 5,
        fullName: "Flávia Pessoa Monteiro",
        avatar: "/team/flavia.png",
        roles: [RoleEnum.PROFESSOR, RoleEnum.RESEARCHER, RoleEnum.MANAGER],
        contacts: [
            {
                value: "http://lattes.cnpq.br/3434022917410660",
                typeContact: SocialEnum.LATTES,
            },
            {
                value: "flavia.monteiro@ufopa.edu.br",
                typeContact: SocialEnum.EMAIL,
            },
        ],
    },
    {
        id: 6,
        fullName: "Dávia Marciana Talgatti",
        avatar: "/team/davia.png",
        roles: [RoleEnum.PROFESSOR, RoleEnum.RESEARCHER],
        contacts: [
            {
                value: "daviatalgatti@gmail.com",
                typeContact: SocialEnum.EMAIL,
            },
        ],
    },
    {
        id: 7,
        fullName: "Mazzile Tavares Rodrigues",
        avatar: "/team/mazzile.png",
        roles: [RoleEnum.DESIGNER],
        contacts: [
            {
                value: "http://lattes.cnpq.br/1803108295629145",
                typeContact: SocialEnum.LATTES,
            },
            {
                value: "mazziletavaresrodrigues@gmail.com",
                typeContact: SocialEnum.EMAIL,
            },
        ],
    },
    {
        id: 8,
        fullName: "Rui Harayama",
        avatar: "/team/rui.png",
        roles: [RoleEnum.PROFESSOR, RoleEnum.RESEARCHER],
        contacts: [
            {
                value: "rui.harayama@gmail.com",
                typeContact: SocialEnum.EMAIL,
            },
        ],
    },
    {
        id: 9,
        fullName: "Carolina Wai Wai",
        avatar: "/team/carolina.png",
        roles: [RoleEnum.INTERDISCIPLINARY],
        contacts: [],
    },
    {
        id: 10,
        fullName: "Elaíde Wai Wai",
        avatar: "/team/elaide.png",
        roles: [RoleEnum.INTERDISCIPLINARY],
        contacts: [],
    },
    {
        id: 11,
        fullName: "Ediane Santos",
        avatar: "/team/ediane.png",
        roles: [RoleEnum.INTERDISCIPLINARY],
        contacts: [],
    },
    {
        id: 12,
        fullName: "Izabelle Sena",
        avatar: "/team/izabelle.png",
        roles: [RoleEnum.INTERDISCIPLINARY],
        contacts: [],
    },
    {
        id: 13,
        fullName: "Ronildo Wai Wai",
        avatar: "/team/ronildo.png",
        roles: [RoleEnum.INTERDISCIPLINARY],
        contacts: [],
    },
    {
        id: 14,
        fullName: "Terezinha Lira",
        avatar: "/team/terezinha.png",
        roles: [RoleEnum.INTERDISCIPLINARY],
        contacts: [],
    },
];

function renderMembers(members: MemberType[]) {
    return members.map((member) => {
        return <MemberCard key={member.id} member={member} />;
    });
}

const Members: React.FC = () => {
    const listMembers = useMemo(() => renderMembers(members), []);
    return (
        <ul className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
            {listMembers}
        </ul>
    );
};

export default Members;
