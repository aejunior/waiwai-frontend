import { Form, Input, Button, Card, message } from "antd";
import { MailOutlined, LockOutlined, UserOutlined } from "@ant-design/icons";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import api from "../lib/axios";
import { useAuthStore } from "../store/authStore";
import type { SignUpRequest, AuthResponse } from "../types/api";
import fnErrorMessage from "../utils/fnErrorMessage";

export function Signup() {
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);

  const signUpMutation = useMutation({
    mutationFn: async (data: SignUpRequest) => {
      const response = await api.post<AuthResponse>("/auth/signup", data);
      return response.data;
    },
    onSuccess: (data) => {
      login(data.access_token);
      localStorage.setItem("refresh_token", data.refresh_token);
      message.success("Conta criada com sucesso!");
      navigate("/");
    },
    onError: (error) => {
      message.error(fnErrorMessage(error) || "Erro ao criar conta");
    },
  });

  const onFinish = (values: SignUpRequest) => {
    signUpMutation.mutate(values);
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-200px)]">
      <Card title="Registrar-se" className="w-full max-w-md">
        <Form
          name="signup"
          onFinish={onFinish}
          layout="vertical"
          autoComplete="off"
        >
          <Form.Item
            name="first_name"
            label="Nome"
            rules={[{ required: true, message: "Por favor, insira seu nome!" }]}
          >
            <Input prefix={<UserOutlined />} placeholder="Nome" />
          </Form.Item>

          <Form.Item
            name="last_name"
            label="Sobrenome"
            rules={[
              { required: true, message: "Por favor, insira seu sobrenome!" },
            ]}
          >
            <Input prefix={<UserOutlined />} placeholder="Sobrenome" />
          </Form.Item>

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
              { min: 6, message: "A senha deve ter no mínimo 6 caracteres!" },
            ]}
          >
            <Input.Password prefix={<LockOutlined />} placeholder="Senha" />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="w-full"
              loading={signUpMutation.isPending}
            >
              Criar Conta
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}
