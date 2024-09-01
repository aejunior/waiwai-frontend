export type ContactType = {
    value: string;
    typeContact: SocialEnum;
};

export enum SocialEnum {
    EMAIL,
    LINKEDIN,
    GITHUB,
    LATTES,
}
export type ColorBadge =
    | "red"
    | "yellow"
    | "green"
    | "blue"
    | "indigo"
    | "purple"
    | "pink";

export type BadgeProps = {
    textBadge: String;
    color: ColorBadge;
};

export enum RoleEnum {
    PROFESSOR = "Professor(a)",
    STUDENT = "Estudante",
    RESEARCHER = "Pesquisador(a)",
    DEVELOPER = "Desenvolvedor(a)",
    MANAGER = "Gerente",
    DESIGNER = "Designer",
    INTERDISCIPLINARY = "Equipe Interdisciplinar",
}

export type MemberType = {
    id: number;
    fullName: string;
    avatar: string;
    roles: RoleEnum[];
    contacts: ContactType[];
};
