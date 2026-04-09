import { Layout, Dropdown, Button, theme } from "antd";
import {
  UserOutlined,
  LoginOutlined,
  UserAddOutlined,
  LogoutOutlined,
  BookOutlined,
  MenuOutlined,
  TagsOutlined,
  LinkOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import { Outlet, useNavigate, Link } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import { useScrollDirection } from "../hooks/useScrollDirection";
import { hasPermission } from "../utils/permissions";

const { Header, Content, Footer } = Layout;

export function AppLayout() {
  const navigate = useNavigate();
  const { isAuthenticated, user, logout } = useAuthStore();
  const isHeaderVisible = useScrollDirection();

  const {
    token: { colorPrimary },
  } = theme.useToken();
  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const userMenuItems = [
    {
      key: "my-words",
      label: "Minhas Palavras",
      disabled: !hasPermission(user?.permission || "GUEST", "USER"),
      icon: <BookOutlined />,
      onClick: () => navigate("/me/words"),
    },
    ...(hasPermission(user?.permission || "GUEST", "ADMIN")
      ? [
          {
            key: "admin-categories",
            label: "Gerenciar Categorias",
            icon: <TagsOutlined />,
            onClick: () => navigate("/admin/categories"),
          },
          {
            key: "admin-references",
            label: "Gerenciar Referências",
            icon: <LinkOutlined />,
            onClick: () => navigate("/admin/references"),
          },
          {
            key: "users",
            label: <Link to="/admin/users">Gerenciar Usuários</Link>,
            icon: <TeamOutlined />,
          },
          {
            key: "admin-review",
            label: <Link to="/admin/review">Fila de Revisão</Link>,
            icon: <BookOutlined />,
          },
        ]
      : []),
    {
      key: "logout",
      label: "Sair",
      icon: <LogoutOutlined />,
      onClick: handleLogout,
    },
  ];

  const mobileMenuItems = [
    {
      key: "dictionary",
      label: "Dicionário",
      icon: <BookOutlined />,
      onClick: () => navigate("/"),
    },
    {
      key: "about-us",
      label: "Sobre Nós",
      icon: <BookOutlined />,
      onClick: () => navigate("/about"),
    },

    ...(isAuthenticated
      ? [...userMenuItems]
      : [
          {
            key: "login",
            label: "Login",
            icon: <LoginOutlined />,
            onClick: () => navigate("/login"),
          },
          {
            key: "signup",
            label: "Registrar-se",
            icon: <UserAddOutlined />,
            onClick: () => navigate("/signup"),
          },
        ]),
  ];

  return (
    <Layout className="min-h-screen">
      <Header
        className={`
          fixed w-full flex items-center justify-between px-8 z-10 
          transition-transform duration-300 ease-in-out
          ${isHeaderVisible ? "translate-y-0" : "-translate-y-full"}
        `}
        style={{ backgroundColor: colorPrimary }}
      >
        <img
          className=" w-12 cursor-pointer"
          src="/imagens/logo-white.png"
          onClick={() => navigate("/")}
        />

        <Dropdown
          className="md:hidden"
          menu={{ items: mobileMenuItems }}
          placement="bottomRight"
        >
          <Button
            icon={<MenuOutlined />}
            type="text"
            className="text-white hover:bg-white/20"
          />
        </Dropdown>

        <div className="hidden md:flex gap-2 ">
          <Button
            onClick={() => navigate("/")}
            className="text-white hover:bg-white/20"
            type="text"
          >
            Dicionário
          </Button>
          <Button
            onClick={() => navigate("/about")}
            className="text-white hover:bg-white/20"
            type="text"
          >
            Sobre Nós
          </Button>
          {isAuthenticated ? (
            <Dropdown menu={{ items: userMenuItems }} placement="bottomRight">
              <Button type="text" className="text-white hover:bg-white/20">
                <UserOutlined /> {user?.name || "Usuário"}
              </Button>
            </Dropdown>
          ) : (
            <>
              <Button
                type="text"
                className="text-white hover:bg-white/20"
                icon={<LoginOutlined />}
                onClick={() => navigate("/login")}
              >
                Login
              </Button>
              <Button
                type="text"
                className="text-white hover:bg-white/20"
                icon={<UserAddOutlined />}
                onClick={() => navigate("/signup")}
              >
                Registrar-se
              </Button>
            </>
          )}
        </div>
      </Header>

      <Content className="p-8 mt-16 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <Outlet />
        </div>
      </Content>

      <Footer className="text-center bg-gray-800 text-white">
        © {new Date().getFullYear()} WaiWaiTapota -{" "}
        <a
          href="https://www.ufopa.edu.br/oriximina/"
          target="_blank"
          rel="noreferrer"
          className="hover:underline"
        >
          UFOPA - CAMPUS ORIXIMINÁ
        </a>
        . Todos os direitos reservados.
      </Footer>
    </Layout>
  );
}
