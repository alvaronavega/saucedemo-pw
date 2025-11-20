# Saucedemo Playwright JS — Skeleton

Este repositório contém um esqueleto de automação usando Playwright e JavaScript, organizado com Page Object Model (POM). O objetivo é cobrir o fluxo básico de compra em https://www.saucedemo.com/.

Principais recursos
- POM: `src/pages` com classes para Login, Products, Product Details, Cart e Checkout.
- Teste E2E: `tests/sauce.spec.js` executa login, navegação, validação do produto, adicionar ao carrinho e finalizar pedido.
- Configuração via `.env` (credenciais e URL).

Pré-requisitos
- Node.js (recomendado 18+)

Instalação do Playwright

Você pode instalar e configurar o Playwright de duas formas simples:

- Método interativo (recomendado para começar rápido):

```powershell
npm init playwright@latest
```

Esse comando vai guiar você por um assistente que instala `@playwright/test`, adiciona arquivos de configuração e pergunta se deseja instalar os navegadores suportados.

- Método manual (útil em CI ou quando quiser controle total):

```powershell
npm install -D @playwright/test
npx playwright install
```

Após instalar o Playwright, instale as dependências do projeto (se ainda não instalou):

```powershell
npm install
```

2. Variáveis de ambiente
- O arquivo `.env` na raiz contém as credenciais padrão (já incluído no repositório local, mas é ignorado pelo git):

```
SAUCE_USERNAME=standard_user
SAUCE_PASSWORD=secret_sauce
BASE_URL=https://www.saucedemo.com
```

IMPORTANTE: o projeto NÃO deve conter URLs hardcoded. O `LoginPage.goto()` lê a URL base do arquivo `.env` através de `process.env.BASE_URL`. Certifique-se de que o `.env` contém essa chave antes de rodar os testes. Caso contrário, o teste lançará um erro indicando que `BASE_URL` não está definido.

Exemplo mínimo de `.env` (não comitar este arquivo):

```
# credenciais de teste
SAUCE_USERNAME=standard_user
SAUCE_PASSWORD=secret_sauce
# endereço base da aplicação AUT (obrigatório)
BASE_URL=https://www.saucedemo.com
```

Modelo do `.env`
-----------------

Existe um arquivo de exemplo chamado `.env.exemple` na raiz do projeto que contém o modelo das variáveis de ambiente. Para criar seu `.env` a partir do modelo (PowerShell):

```powershell
copy .env.exemple .env
```

Verifique o conteúdo de `.env` antes de rodar os testes e não comite este arquivo no repositório.

Execução dos testes
- Rodar todos os testes:

```powershell
npx playwright test
```

- Rodar em modo headed (visível):

```powershell
npx playwright test --headed
```

- Rodar um teste específico (ex.: teste de fluxo saucedemo):

```powershell
npx playwright test tests/sauce.spec.js --project=chromium
```



## Decisões e suposições
- O site `saucedemo.com` não possui uma barra de pesquisa. A etapa de "pesquisa" foi implementada como uma busca por produto pelo nome visível na lista de produtos (método `openProductByName`).
- As credenciais padrão informadas foram colocadas em `.env`. O `playwright.config.js` carrega automaticamente esse arquivo para os testes.

Próximos passos sugeridos
- Validar preços e totais do carrinho: criar testes que verifiquem preço unitário, quantidade, subtotal e total (incluindo impostos/descontos quando aplicável) para 1+ produtos.
- Validar filtros e ordenação: testar que os filtros e ordenadores da listagem (por preço, nome, disponibilidade) retornam resultados corretos e consistentes.
- Testar múltiplos produtos no fluxo: cenários que adicionam/removem vários itens, verificam a soma correta, persistência do carrinho e comportamento no checkout com vários itens.
- Testes negativos e de borda: cenários como checkout com campos faltando, quantidades inválidas, produtos esgotados, sessão expirada e erros de rede.
- Fixtures e testes data-driven: criar fixtures reutilizáveis (usuários, dados de checkout) e executar testes com conjuntos de dados para cobrir variações.
- Observabilidade e robustez: adicionar logging/trace quando testes falham para reduzir flakiness.

## Estrutura do projeto

O projeto está organizado da seguinte forma (principais arquivos e pastas):

```
.
├── package.json             # Scripts e dependências do projeto
├── playwright.config.js     # Configuração do Playwright (carrega .env)
├── .env                     # Variáveis de ambiente (credenciais) — IGNORADO pelo git
├── .gitignore
├── README.md
├── src/
│   └── pages/               # Page Object Model (POM)
│       ├── LoginPage.js
│       ├── ProductsPage.js
│       ├── ProductPage.js
│       ├── CartPage.js
│       └── CheckoutPage.js
└── tests/
	└── sauce.spec.js        # Teste E2E que executa o fluxo completo
```

Breve descrição das pastas/arquivos:

- `src/pages/` — Implementação do POM. Cada arquivo contém uma classe com seletores e ações relacionadas àquela página/fluxo.
- `tests/` — Testes Playwright (uses `@playwright/test`). Coloque testes adicionais aqui seguindo o padrão existente.
- `playwright.config.js` — Arquivo de configuração do Playwright (projetos, reporter, carregamento de .env).
- `.env` — Contém `SAUCE_USERNAME`, `SAUCE_PASSWORD` e `BASE_URL` (não commitar este arquivo; ele já está listado no `.gitignore`).
- `package.json` — Scripts úteis: `npm test`, `npm run test:headed`, `npm run test:report`.

Siga essa organização ao adicionar novas páginas, helpers e testes; isso facilita manutenção e expansão do conjunto de testes.

Sobre o uso de Inteligência Artificial
------------------------------------

Parte da documentação e o esqueleto inicial deste projeto foram gerados com o auxílio de uma ferramenta de Inteligência Artificial para acelerar a criação de artefatos (POM, testes, README e workflows). Todo o código e as decisões finais foram revisados e ajustados manualmente para garantir coerência e corretude.

Observações:
- A IA foi usada para agilizar o trabalho repetitivo e sugerir estruturas; as validações finais, seletores e execuções de teste foram feitas no repositório.


CI / GitHub Actions (o que foi adicionado)
---------------------------------------

Adicionamos um workflow GitHub Actions em `.github/workflows/ci.yml` que instala dependências, instala os navegadores do Playwright e executa os testes usando uma matrix de navegadores (por padrão: Chromium, Firefox e WebKit). Principais pontos:

- Gatilhos: `push` para a branch `main` e `pull_request` para PRs apontando para `main`.
- Passos: checkout, setup Node.js, `npm ci`, `npx playwright install --with-deps`, executar `npx playwright test --project=<browser>`, e upload do `playwright-report` como artifact.
- Para executar manualmente via UI você pode adicionar `workflow_dispatch` ao workflow (podemos habilitar se desejar).

Como ver o que rodou (repositório público)
- Vá em Actions → selecione o workflow (CI - Playwright tests) → clique na run desejada. Você verá os logs de cada step e o output dos testes.
- Artefatos (relatório HTML) são enviados como artifact chamado `playwright-report` — ao abrir a run, na seção de artifacts você pode baixar o zip com o relatório e abri-lo localmente.

Visibilidade e segurança (repositório público)
- Em repositórios públicos as execuções do Actions (logs e artifacts) ficam visíveis para quem tem acesso de leitura ao repositório. Ou seja, qualquer pessoa pode ver os logs e baixar artifacts gerados por runs públicas.
- Secrets (ex.: `SAUCE_USERNAME`, `SAUCE_PASSWORD`, `BASE_URL`) não são expostos nos logs — o GitHub mascarará valores de secrets automaticamente. Mesmo assim, evite fazer `console.log` de variáveis sensíveis.
- Se você precisa restringir logs/artifacts, considere: rodar o workflow apenas em PRs internos, usar jobs privados em runners auto-hospedados, ou publicar apenas resumos no report.

Configurar secrets
- Adicione os secrets necessários em: Settings → Secrets and variables → Actions no repositório GitHub.
- Os nomes esperados pelo workflow atual são: `SAUCE_USERNAME`, `SAUCE_PASSWORD`, `BASE_URL`.
