import {
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
  Badge
} from "reactstrap";
import BookIcon from './Icons/BookIcon';
import EnvelopeIcon from './Icons/EnvelopeIcon';
import GitHubIcon from './Icons/GitHubIcon';
import LinkedInIcon from './Icons/LinkedInIcon';
import { MemberType, ContactType, SocialEnum, RoleEnum } from './types';

type MemberCardProps = {
  member: MemberType
}


function getSocial(social: ContactType) {
  switch (social.typeContact) {
    case SocialEnum.EMAIL:
      return (<a href={`mailto:${social.value}`}><EnvelopeIcon /></a>
      )
    case SocialEnum.GITHUB:
      return (<a
        href={social.value}
        target="_blank"
        rel="noreferrer"
      ><GitHubIcon /></a>)
    case SocialEnum.LINKEDIN:
      return (<a
        href={social.value}
        target="_blank"
        rel="noreferrer"
      ><LinkedInIcon /></a>)
    case SocialEnum.LATTES:
      return (<a
        href={social.value}
        target="_blank"
        rel="noreferrer"
      ><BookIcon /></a>)

  }
}

function getRole(role: RoleEnum) {
  switch (role) {
    case RoleEnum.PROFESSOR:
      return (<Badge
        className="text-dark"
        color="light"
      >
        Professor</Badge>)

    case RoleEnum.STUDENT:
      return (<Badge
        className="text-dark"
        color="light"
      >
        Estudante</Badge>)
    case RoleEnum.RESEARCHER:
      return (<Badge
        className="text-dark"
        color="light"
      >
        Pesquisador</Badge>)
    case RoleEnum.DEVELOPER:
      return (<Badge
        className="text-dark"
        color="light"
      >
        Desenvolvedor</Badge>)
    case RoleEnum.MANAGER:
      return (<Badge
        className="text-dark"
        color="light"
      >
        Gerente</Badge>)
    case RoleEnum.DESIGNER:
      return (<Badge
        className="text-dark"
        color="light"
      >
        Designer</Badge>)
    case RoleEnum.INTERDISCIPLINARY:
      return (<Badge
        className="text-dark"
        color="light"
      >
        Interdisciplinar</Badge>)
  }
}


const MemberCard: React.FC<MemberCardProps> = ({ member }) => {
  return (
    <Card className="no-border-card">
      <CardBody>
        <img
          alt={member.fullName}
          src={member.avatar}
          width={160}
          height={150}
          className="mb-2"
        />
        <CardTitle tag="h5">{member.fullName}</CardTitle>
        <CardSubtitle className="mb-2 text-muted" tag="h6">
          <div> {member.roles.map((role) => getRole(role))}</div>
        </CardSubtitle>

        <ul className="list-inline">
          {member.contacts.map((social) => (<li className="list-inline-item">{getSocial(social)}</li>))}
        </ul>
      </CardBody>
    </Card>
  );
};

export default MemberCard;