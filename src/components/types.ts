export type ContactType = {
    value: string;
    typeContact: SocialEnum;
}

export enum SocialEnum {
    EMAIL,
    LINKEDIN,
    GITHUB,
    LATTES
}


export enum RoleEnum {
    PROFESSOR,
    STUDENT,
    RESEARCHER,
    DEVELOPER,
    MANAGER,
    DESIGNER,
    INTERDISCIPLINARY
}


export type MemberType = {
    id: number;
    fullName: string;
    avatar: string;
    roles: RoleEnum[];
    contacts: ContactType[];
}
