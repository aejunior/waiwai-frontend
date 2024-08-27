import { createContext } from "react";
import { LoadingContextType } from "../types";

const LoadingContext = createContext<LoadingContextType>({
    isLoading: false,
    changeLoadingState: () => null,
});

export default LoadingContext;
