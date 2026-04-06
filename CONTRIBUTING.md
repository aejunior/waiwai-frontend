# Guia de Contribuição para o Dicionário Wai-Wai

Agradecemos o seu interesse em contribuir para o Dicionário Wai-Wai! Toda contribuição é bem-vinda, desde a correção de bugs simples até a implementação de novas funcionalidades.

Para garantir que o processo seja claro e eficiente para todos, siga as diretrizes abaixo.

## Como Contribuir

### Reportando Bugs

Se você encontrar um bug, por favor, abra uma **Issue** no repositório do GitHub. No seu reporte, inclua:

-   **Título claro e descritivo:** "Bug: O botão de salvar não funciona na página de edição de palavras."
-   **Descrição detalhada:** Explique o que aconteceu, o que você esperava que acontecesse e os passos exatos para reproduzir o problema.
-   **Ambiente:** Informe a versão do navegador e o sistema operacional que você está usando.
-   **Screenshots ou vídeos:** Se possível, anexe capturas de tela ou um vídeo que demonstre o problema.

### Sugerindo Melhorias ou Novas Funcionalidades

Se você tem uma ideia para uma nova funcionalidade ou uma melhoria, sinta-se à vontade para abrir uma **Issue** com a tag `enhancement`. Descreva sua ideia com o máximo de detalhes possível:

-   **Título claro:** "Sugestão: Adicionar funcionalidade de busca por áudio."
-   **Descrição:** Explique como a funcionalidade deveria funcionar e por que ela seria útil para o projeto.
-   **Casos de uso:** Descreva cenários onde essa funcionalidade seria aplicada.

### Submetendo Pull Requests (PRs)

Se você deseja contribuir com código, siga os passos abaixo:

1.  **Faça o Fork do repositório:**
    Clique no botão "Fork" no canto superior direito da página do repositório.

2.  **Clone o seu fork localmente:**

    ```bash
    git clone https://github.com/seu-usuario/dicionario-wai-wai-frontend-V2.git
    cd dicionario-wai-wai-frontend-v2
    ```

3.  **Crie uma nova branch para sua contribuição:**
    Use um nome descritivo para a branch, como `feat/nova-funcionalidade` ou `fix/bug-no-login`.

    ```bash
    git checkout -b feat/adicionar-busca-avancada
    ```

4.  **Faça suas alterações no código:**
    Siga as convenções de estilo de código do projeto (ver abaixo).

5.  **Instale as dependências e teste suas alterações:**
    Certifique-se de que a aplicação ainda funciona corretamente.

    ```bash
    npm install
    npm run dev
    ```

6.  **Execute o linter e o type checker:**
    Garanta que seu código está livre de erros de linting e de tipos.

    ```bash
    npm run lint
    npm run typecheck
    ```

7.  **Faça o commit das suas alterações:**
    Use mensagens de commit claras e descritivas.

    ```bash
    git commit -m "feat: Adiciona funcionalidade de busca avançada"
    ```

8.  **Envie suas alterações para o seu fork:**

    ```bash
    git push origin feat/adicionar-busca-avancada
    ```

9.  **Abra um Pull Request (PR):**
    Vá para o repositório original e abra um PR da sua branch para a branch `main`. No PR, descreva as alterações que você fez e por quê.

## Convenções de Código

-   **Estilo:** Siga as regras definidas no arquivo `.eslintrc.js`.
-   **Formatação:** Use Prettier (se configurado) para manter a formatação consistente.
-   **Nomenclatura:** Use nomes de variáveis e funções claros e em inglês.

Agradecemos novamente por sua contribuição!
