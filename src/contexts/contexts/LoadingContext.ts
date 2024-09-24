import { createContext } from "react";
import { LoadingContextType } from "@/types";

// Criação do contexto
const LoadingContext = createContext<LoadingContextType>({
    isLoading: false,
    changeLoadingState: () => null,
});

export default LoadingContext;
