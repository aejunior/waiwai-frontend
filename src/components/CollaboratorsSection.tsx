import { MemberType } from "../types/memberTypes";
import { MemberCard } from "./MemberCard";

interface CollaboratorsSectionProps {
  members: MemberType[];
}

export function CollaboratorsSection({ members }: CollaboratorsSectionProps) {
  return (
    <section className={`px-4 sm:px-6 lg:px-8 pb-12`}>
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col items-center text-center mb-8">
          <h1 className="text-2xl sm:text-3xl font-semibold text-slate-700">
            Nossos Colaboradores
          </h1>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {members.map((member) => (
            <MemberCard key={member.id} member={member} />
          ))}
        </div>
      </div>
    </section>
  );
}
