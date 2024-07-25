import {
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    Container,
    NavbarBrand,
    Navbar,
    Nav,
    NavItem,
    NavbarToggler,
    Collapse,
} from "reactstrap"
import { Link } from "react-router-dom";;

const AnonymousLayout = () => {
    return (

        <Container className="po-relative">
            <Navbar className="navbar-expand-lg h6-nav-bar">
                <NavbarBrand href="/">
                    <img src='/logo/logo-bar-colored.png' alt="wrapkit" />
                </NavbarBrand>
                {/* <NavbarToggler onClick={toggle}>
                    <span className="ti-menu"></span>
                </NavbarToggler> */}
                <Collapse
                    isOpen={isOpen}
                    navbar
                    className="hover-dropdown ml-auto"
                    id="h6-info"
                >
                    <Nav navbar className="ml-auto mt-2 mt-lg-0">
                        <NavItem>
                            <Link href="/">
                                <a
                                    className={
                                        router.pathname == "/"
                                            ? "text-white nav-link"
                                            : "nav-link"
                                    }
                                >
                                    <b
                                        className={
                                            router.pathname == "/"
                                                ? "border-bottom border-danger pb-0"
                                                : null
                                        }
                                    >
                                        Home{" "}
                                    </b>
                                </a>
                            </Link>
                        </NavItem>
                        <NavItem>
                            <Link href="/myWord">
                                <a
                                    className={
                                        router.pathname == "/myWord"
                                            ? "text-white nav-link"
                                            : "nav-link"
                                    }
                                >
                                    <b
                                        className={
                                            router.pathname == "/myWord"
                                                ? "border-bottom border-danger pb-0"
                                                : null
                                        }
                                    >
                                        Minhas palavras
                                    </b>
                                </a>
                            </Link>
                        </NavItem>
                        <NavItem>
                            <Link href="/dictionary">
                                <a
                                    className={
                                        router.pathname == "/dictionary"
                                            ? "text-white nav-link"
                                            : "nav-link"
                                    }
                                >
                                    <b
                                        className={
                                            router.pathname == "/dictionary"
                                                ? "border-bottom border-danger pb-0"
                                                : null
                                        }
                                    >
                                        Dicionario
                                    </b>
                                </a>
                            </Link>
                        </NavItem>
                        <NavItem>
                            <Link href="/registerwords">
                                <a
                                    className={
                                        router.pathname == "/registerwords"
                                            ? "text-white nav-link"
                                            : "nav-link"
                                    }
                                >
                                    <b
                                        className={
                                            router.pathname == "/registerwords"
                                                ? "border-bottom border-danger pb-0"
                                                : null
                                        }
                                    >
                                        Cadastrar Palavras
                                    </b>
                                </a>
                            </Link>
                        </NavItem>
                        {session?.user?.permission == 3 && (
                            <NavItem>
                                <Link href="/admin/adminHome">
                                    <a
                                        className={
                                            router.pathname == "/admin/adminHome"
                                                ? "text-white nav-link"
                                                : "nav-link"
                                        }
                                    >
                                        <b
                                            className={
                                                router.pathname == "/admin/adminHome"
                                                    ? "border-bottom border-danger pb-0"
                                                    : null
                                            }
                                        >
                                            Admin
                                        </b>
                                    </a>
                                </Link>
                            </NavItem>
                        )}
                    </Nav>
                    {session ? (
                        <>

                            <UncontrolledDropdown>
                                <DropdownToggle color="transparent">
                                    <div className="d-flex gap-3 border-bottom border-danger p-0">
                                        <span className="text-truncate mr-3">
                                            <h6 className="mb-0 text-white text-uppercase">
                                                {session.user.username}
                                            </h6>
                                            <small className="elipsis">
                                                {session.user.email}
                                            </small>
                                        </span>

                                        <User
                                            className="border rounded-circle"
                                            size={40}
                                            color="white"
                                        />
                                    </div>
                                </DropdownToggle>

                                <DropdownMenu dark>
                                    {/* <DropdownItem>
                      <User className="mr-2" size={25} /> Meu perfil
                    </DropdownItem> */}
                                    <DropdownItem onClick={() => signOut()}>
                                        <LogOut className="mr-2" size={25} />
                                        Sair
                                    </DropdownItem>
                                </DropdownMenu>
                            </UncontrolledDropdown>
                        </>
                    ) : (
                        <>
                            <div className="act-buttons">
                                <Link href="/auth/loginformik">
                                    <a
                                        className={
                                            router.pathname == "/auth/loginformik"
                                                ? "text-white nav-link btn btn-outline-light font-14"
                                                : "nav-link btn btn-outline-light font-14"
                                        }
                                    >
                                        Sign In
                                    </a>
                                </Link>
                            </div>

                            <div className="act-buttons">

                                <Link href="/auth/registerformik">
                                    <a
                                        className={
                                            router.pathname == "/auth/registerformik"
                                                ? "text-white nav-link btn btn-danger font-14"
                                                : "nav-link btn btn-danger font-14"
                                        }
                                    >
                                        Sign up
                                    </a>
                                </Link>
                            </div>
                        </>
                    )}
                </Collapse>
            </Navbar>
        </Container>
    )
}

export default AnonymousLayout;