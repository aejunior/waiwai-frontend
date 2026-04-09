import { Card, Avatar, Tooltip } from "antd";
import {
  MailOutlined,
  LinkedinFilled,
  GithubFilled,
  ReadOutlined,
} from "@ant-design/icons";
import { ContactType, MemberType, SocialEnum } from "../types/memberTypes";

function getSocialLink(contact: ContactType) {
  const iconProps = { className: "text-xl", key: contact.typeContact };

  switch (contact.typeContact) {
    case SocialEnum.EMAIL:
      return (
        <Tooltip title={`Email: ${contact.value}`}>
          <a
            href={`mailto:${contact.value}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <MailOutlined {...iconProps} />
          </a>
        </Tooltip>
      );
    case SocialEnum.LINKEDIN:
      return (
        <Tooltip title="LinkedIn">
          <a href={contact.value} target="_blank" rel="noopener noreferrer">
            <LinkedinFilled {...iconProps} />
          </a>
        </Tooltip>
      );
    case SocialEnum.GITHUB:
      return (
        <Tooltip title="GitHub">
          <a href={contact.value} target="_blank" rel="noopener noreferrer">
            <GithubFilled {...iconProps} />
          </a>
        </Tooltip>
      );
    case SocialEnum.LATTES:
      return (
        <Tooltip title="Currículo Lattes">
          <a href={contact.value} target="_blank" rel="noopener noreferrer">
            <ReadOutlined {...iconProps} />
          </a>
        </Tooltip>
      );
    default:
      return null;
  }
}

interface MemberCardProps {
  member: MemberType;
}

export function MemberCard({ member }: MemberCardProps) {
  const socialActions = member.contacts.map(getSocialLink).filter(Boolean); // Filtra contatos não mapeados

  return (
    <Card
      hoverable
      actions={socialActions.length > 0 ? socialActions : undefined}
      className="text-center shadow-md hover:shadow-lg transition-shadow"
    >
      <div className="flex flex-col items-center">
        <Avatar
          size={128}
          src={member.avatar}
          alt={member.fullName}
          className="mb-4 border-2 border-gray-100"
        />
        <Card.Meta
          title={
            <span className="font-semibold text-base text-slate-800">
              {member.fullName}
            </span>
          }
          description={
            <div className="flex flex-wrap justify-center gap-1 mt-2 text-xs">
              {member.roles.join(", ")}
            </div>
          }
        />
      </div>
    </Card>
  );
}
