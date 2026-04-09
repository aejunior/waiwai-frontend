import { FallbackProps } from "react-error-boundary";

/**
 * Componente exibido como fallback quando um erro é capturado
 * pelo ErrorBoundary.
 */
function ErrorFallback({ error, resetErrorBoundary }: FallbackProps) {
  return (
    <div
      role="alert"
      style={{
        padding: "20px",
        background: "#fff0f0",
        color: "#d00",
        border: "1px solid #d00",
        borderRadius: "8px",
        margin: "20px",
      }}
    >
      <h2>Algo deu errado:</h2>
      <pre
        style={{
          color: "#d00",
          whiteSpace: "pre-wrap",
          fontFamily: "monospace",
        }}
      >
        {error.message}
      </pre>
      <button onClick={resetErrorBoundary}>Tentar Novamente</button>
    </div>
  );
}

export default ErrorFallback;
