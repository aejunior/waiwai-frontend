import { EnvelopeIcon, GitHubIcon, LattesIcon, LinkedInIcon } from "@/icons";

import { ContactType, MemberType, SocialEnum } from "@/types/memberTypes";

import { v4 as uuidv4 } from "uuid";

function getSocialBadge(social: ContactType, key: string): React.ReactNode {
    switch (social.typeContact) {
        case SocialEnum.EMAIL:
            return (
                <a href={`mailto:${social.value}`} key={key}>
                    <EnvelopeIcon />
                </a>
            );
        case SocialEnum.GITHUB:
            return (
                <a
                    href={social.value}
                    key={key}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-slate-400"
                >
                    <GitHubIcon />
                </a>
            );
        case SocialEnum.LINKEDIN:
            return (
                <a
                    href={social.value}
                    key={key}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-slate-400"
                >
                    <LinkedInIcon />
                </a>
            );
        case SocialEnum.LATTES:
            return (
                <a
                    href={social.value}
                    key={key}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-slate-400"
                >
                    <LattesIcon />
                </a>
            );
    }
}

type MemberCardProps = {
    member: MemberType;
};

const MemberCard: React.FC<MemberCardProps> = ({ member }) => {
    return (
        <li key={member.id} className=" p-4 rounded-lg ">
            <div className="flex flex-col items-center">
                <img
                    src={member.avatar}
                    alt={member.fullName}
                    className="w-20 h-20 mb-4"
                />
                <p className="text-center font-semibold">{member.fullName}</p>
                <p className="text-center text-slate-400">
                    {member.roles.join(", ")}
                </p>
                <div className="mt-4 flex gap-2">
                    {member.contacts.map((contact) => {
                        const keyContact = uuidv4();
                        return getSocialBadge(contact, keyContact);
                    })}
                </div>
            </div>
        </li>
        // <>
        //     <div className="w-full max-w-xs bg-white border rounded-lg shadow">
        //         <div className="flex flex-col items-center py-5">
        //             <img
        //                 className="w-24 h-24 mb-3 rounded-full shadow-lg"
        //                 src={member.avatar}
        //                 alt={member.fullName}
        //             />
        //             <h5 className="mb-1 text-xl font-medium text-gray-900 ">
        //                 {member.fullName}
        //             </h5>
        //             <div className="flex gap-1 mb-3">
        //                 {member.roles.map((role: RoleEnum) => getRole(role))}
        //             </div>
        //             <div className="flex gap-4">
        //                 {member.contacts.map((social: ContactType) => {
        //                     const keySocial = uuidv4();
        //                     return (
        //                         <div className="flex-none" key={keySocial}>
        //                             {getSocial(social)}
        //                         </div>
        //                     );
        //                 })}
        //             </div>
        //         </div>
        //     </div>
        // </>
    );
};

export default MemberCard;
