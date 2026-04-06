import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ConfigProvider } from "antd";
import ptBR from "antd/locale/pt_BR";
import { AppLayout } from "./layouts/AppLayout";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { Login } from "./pages/Login";
import { Signup } from "./pages/Signup";
import { WordsList } from "./pages/WordsList";
import { WordDetail } from "./pages/WordDetail";
import { MyWords } from "./pages/MyWords";
import { WordForm } from "./pages/WordForm";
import { AdminCategories } from "./pages/AdminCategories";
import { AdminReferences } from "./pages/AdminReferences";
import { useAuthStore } from "./store/authStore";
import { AboutUs } from "./pages/AboutUs";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

function App() {
  const initAuth = useAuthStore((state) => state.initAuth);

  useEffect(() => {
    initAuth();
  }, [initAuth]);

  return (
    <ConfigProvider
      locale={ptBR}
      theme={{
        token: {
          colorPrimary: "#A63429",
        },
      }}
    >
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routes>
            <Route element={<AppLayout />}>
              <Route path="/" element={<WordsList />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/words/:word_id" element={<WordDetail />} />
              <Route path="/about" element={<AboutUs />} />

              <Route
                path="/me/words"
                element={
                  <ProtectedRoute>
                    <MyWords />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/words/new"
                element={
                  <ProtectedRoute>
                    <WordForm />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/words/:word_id/edit"
                element={
                  <ProtectedRoute>
                    <WordForm />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/categories"
                element={
                  <ProtectedRoute>
                    <AdminCategories />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/references"
                element={
                  <ProtectedRoute>
                    <AdminReferences />
                  </ProtectedRoute>
                }
              />
            </Route>
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </ConfigProvider>
  );
}

export default App;
