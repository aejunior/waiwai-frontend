import React from 'react';

const Footer: React.FC = () => {
    return (
        <footer className="bg-white mt-4">
            <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
                <div className="sm:flex sm:items-center sm:justify-between">
                    <a
                        href="/"
                        className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse"
                    >
                        <img
                            src="logo/icon.png"
                            className="h-10"
                            alt="Dicionário Wai Wai logo"
                        />
                        <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
                            Flowbite
                        </span>
                    </a>
                    <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
                        <li>
                            <a href="#about" className="hover:underline me-4 md:me-6">
                                Sobre nós
                            </a>
                        </li>
                        <li>
                            <a href="https://docs.google.com/document/d/1PYYkZTznMVp6ELcrGOrMwyHwiDBzx3n-2WAQwB9uaxg" target='_blank' rel="noreferrer" className="hover:underline me-4 md:me-6">
                                Política de Privacidade
                            </a>
                        </li>
                        <li>
                            <a href="http://www.ufopa.edu.br/ufopa/" target='_blank' rel="noreferrer" className="me-4 md:me-6 hover:underline">
                                Site UFOPA
                            </a>
                        </li>
                        <li>
                            <a href="mailto:dicionariowaiwai@ufopa.edu.br" className="hover:underline ">
                                Email
                            </a>
                        </li>
                    </ul>
                </div>
                <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
                <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">
                    © 2024{" "}
                    <a href="https://www.ufopa.edu.br/oriximina/" target='_blank' rel="noreferrer" className="hover:underline">
                        UFOPA - CAMPUS ORIXIMINÁ
                    </a>
                    . Todos os direitos reservados.
                </span>
            </div>
        </footer >

    );
};

// <Card className="no-border-card">
//   <CardBody>
//     <img
//       alt={member.fullName}
//       src={member.avatar}
//       width={160}
//       height={150}
//       className="mb-2"
//     />
//     <CardTitle tag="h5">{member.fullName}</CardTitle>
//     <CardSubtitle className="mb-2 text-muted" tag="h6">
//       <div> {member.roles.map((role) => getRole(role))}</div>
//     </CardSubtitle>

//     <ul className="list-inline">
//       {member.contacts.map((social) => (<li className="list-inline-item">{getSocial(social)}</li>))}
//     </ul>
//   </CardBody>
// </Card>


{/* <li>
<a href="#" className="hover:underline me-4 md:me-6">
    Licensing
</a>
</li> */}
export default Footer;