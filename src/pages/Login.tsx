import { Form, Input, Button, Card, message } from "antd";
import { MailOutlined, LockOutlined } from "@ant-design/icons";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import api from "../lib/axios";
import { useAuthStore } from "../store/authStore";
import type { SignInRequest, AuthResponse } from "../types/api";
import fnErrorMessage from "../utils/fnErrorMessage";

export function Login() {
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);

  const signInMutation = useMutation({
    mutationFn: async (data: SignInRequest) => {
      const response = await api.post<{ data: AuthResponse }>(
        "/auth/signin",
        data
      );
      return response.data;
    },
    onSuccess: (data) => {
      login(data.data.access_token);
      localStorage.setItem("refresh_token", data.data.refresh_token);
      message.success("Login realizado com sucesso!");
      navigate("/");
    },
    onError: (error) => {
      message.error(fnErrorMessage(error) || "Erro ao fazer login");
    },
  });

  const onFinish = (values: SignInRequest) => {
    signInMutation.mutate(values);
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-200px)]">
      <Card title="Login" className="w-full max-w-md">
        <Form
          name="login"
          onFinish={onFinish}
          layout="vertical"
          autoComplete="off"
        >
          <Form.Item
            name="email"
            label="Email"
            rules={[
              { required: true, message: "Por favor, insira seu email!" },
              { type: "email", message: "Email inválido!" },
            ]}
          >
            <Input prefix={<MailOutlined />} placeholder="Email" />
          </Form.Item>

          <Form.Item
            name="password"
            label="Senha"
            rules={[
              { required: true, message: "Por favor, insira sua senha!" },
            ]}
          >
            <Input.Password prefix={<LockOutlined />} placeholder="Senha" />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="w-full"
              loading={signInMutation.isPending}
            >
              Entrar
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}
