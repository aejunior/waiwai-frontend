/* eslint-disable */
import React from "react";
import Link from 'react-router-dom';
// import { Container, Row, Col } from "reactstrap";
// import Link from "next/link";

const Header = () => {
    return (
        <div>
            <h1>Header</h1>
            {/* <div className="header6">
        <Container className="po-relative">
          <Navbar className="navbar-expand-lg h6-nav-bar">
            <NavbarBrand href="/">
              <Image src={versaoWeb} alt="wrapkit" /> 
              
            </NavbarBrand>
            <NavbarToggler onClick={toggle}>
              <span className="ti-menu"></span>
            </NavbarToggler>
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
                      <b className={
                        router.pathname == "/"
                          ? "border-bottom border-danger pb-0"
                          : null
                      }>Home </b>
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
                      <b className={
                        router.pathname == "/myWord"
                          ? "border-bottom border-danger pb-0"
                          : null
                      }>Minhas palavras</b>
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
                      <b className={
                        router.pathname == "/dictionary"
                          ? "border-bottom border-danger pb-0"
                          : null
                      }>Dicionário</b>
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
                      <b className={
                        router.pathname == "/registerwords"
                          ? "border-bottom border-danger pb-0"
                          : null
                      }>Cadastrar Palavras</b>
                    </a>
                  </Link>
                </NavItem>
              </Nav>
              {session ? (
                <>
                  {/* <div className="act-buttons">
                    <Link href="/auth/registerformik">
                      <button
                        onClick={() => signOut()}
                        className="nav-link btn btn-danger font-14"
                      >
                        Sign out
                      </button>
                    </Link>
                  </div> 
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
                     <DropdownItem>
                        <User className="mr-2" size={25} /> Meu perfil
                      </DropdownItem> 
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
      </div> */}
        </div>
    );
};

function Footer() {
    return (
        <div>
            <h1>Footer</h1>
            {/* 
                <Row>
                    <Col lg="4" md="6" className="m-b-30">
                        <h5 className="m-b-20">Email</h5>
                        <p>
                            Office:
                            <Link href="mailto:dicionariowaiwai@ufopa.edu.br">
                                <a className="link"> dicionariowaiwai@ufopa.edu.br</a>
                            </Link>
                            <br />
                            Site:
                            <Link href="http://www.ufopa.edu.br/ufopa">
                                <a className="link"> http://www.ufopa.edu.br/ufopa/</a>
                            </Link>
                        </p>
                    </Col>
                </Row>
                <div className="f4-bottom-bar">
                    <Row>
                        <Col md="12">
                            <div className="d-flex font-14">
                                <div className="m-t-10 m-b-10 copyright">
                                    Todos os Direitos reservados{" "}
                                    <Link href="https://www.wrappixel.com">
                                        <a className="link">UFOPA - CAMPUS ORIXIMINÁ</a>
                                    </Link>
                                </div>
                                <div className="links ml-auto m-t-10 m-b-10">
                                    <Link href="#">
                                        <a className="p-10 p-l-0">Termos de Uso</a>
                                    </Link>
                                    <Link href="#">
                                        <a className="p-10">Direitos Legais</a>
                                    </Link>
                                    <Link href="#">
                                        <a className="p-10">Política de Privacidade</a>
                                    </Link>
                                </div>
                            </div>
                        </Col>
                    </Row> */}
        </div>


    );
};


function MainLayout() {
    return (
        <div>MainLayout</div>
        // <div id="main-wrapper">
        //     <Header />
        //     <div className="page-wrapper">
        //         <div className="container-fluid">{children}</div>
        //     </div>
        //     <Footer />
        // </div>
    );
};

export default MainLayout;