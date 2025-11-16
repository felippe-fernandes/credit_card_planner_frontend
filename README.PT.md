# Credit Card Planner - Frontend

Uma aplicação moderna e completa para rastreamento de despesas, projetada para ajudá-lo a gerenciar suas despesas de cartão de crédito, faturas e transações com facilidade. Este é o frontend da aplicação construído com Next.js 15 e React 19.

## 🔗 Repositório do Backend

Esta aplicação frontend requer a API backend para funcionar. Você pode encontrar o repositório do backend em:
**[credit_card_planner_backend](https://github.com/felippe-fernandes/credit_card_planner_backend)**

## 🧪 Credenciais de Teste

Para recrutadores e avaliadores que desejam explorar a aplicação com dados pré-preenchidos:

- **Email:** `teste@teste.com`
- **Senha:** `123456`

Esta conta de teste contém dados de exemplo incluindo cartões de crédito, transações, faturas e categorias para demonstrar toda a funcionalidade da aplicação.

## ✨ Funcionalidades

- **🔐 Autenticação Segura**: Login e cadastro com autenticação baseada em JWT via Supabase
- **💳 Gerenciamento de Cartões de Crédito**: Adicione, edite e gerencie múltiplos cartões de crédito
- **📊 Rastreamento de Transações**: Registre e categorize todas as suas transações de cartão de crédito
- **🧾 Gerenciamento de Faturas**: Acompanhe faturas mensais de cada cartão de crédito
- **📂 Organização por Categorias**: Organize transações por categorias personalizadas
- **👥 Suporte a Dependentes**: Gerencie despesas de familiares ou dependentes
- **📱 Design Responsivo**: Interface totalmente responsiva que funciona em desktop, tablet e mobile
- **🌓 Modo Escuro**: Suporte integrado ao modo escuro para visualização confortável
- **📈 Dashboard com Análises**: Visualize seus padrões de gastos e acompanhe despesas com gráficos
- **🔄 Atualizações em Tempo Real**: Sincronização instantânea com a API backend
- **📅 Manipulação de Datas**: Filtragem e formatação avançada de datas com date-fns
- **♿ Acessibilidade**: Construído com Radix UI para acessibilidade superior

## 🛠️ Stack Tecnológica

### Framework Principal
- **[Next.js 15](https://nextjs.org/)** - Framework React com App Router e Turbopack
- **[React 19](https://react.dev/)** - Última versão da biblioteca de UI React
- **[TypeScript](https://www.typescriptlang.org/)** - Desenvolvimento com tipagem segura

### Gerenciamento de Estado & Busca de Dados
- **[TanStack Query v5](https://tanstack.com/query)** - Poderoso gerenciamento de estado do servidor
- **[Zustand](https://github.com/pmndrs/zustand)** - Gerenciamento de estado local leve
- **[Axios](https://axios-http.com/)** - Cliente HTTP baseado em Promises

### Autenticação
- **[Supabase Auth](https://supabase.com/docs/guides/auth)** - Provedor de autenticação robusto com JWT

### Formulários & Validação
- **[React Hook Form](https://react-hook-form.com/)** - Gerenciamento performático de formulários
- **[@hookform/resolvers](https://github.com/react-hook-form/resolvers)** - Resolvers de validação de formulários
- **[Zod](https://zod.dev/)** - Validação de schemas TypeScript-first

### Componentes de UI & Estilização
- **[Tailwind CSS 4](https://tailwindcss.com/)** - Framework CSS utility-first
- **[shadcn/ui](https://ui.shadcn.com/)** - Componentes reutilizáveis de alta qualidade
- **[Radix UI](https://www.radix-ui.com/)** - Primitivos de componentes sem estilo e acessíveis:
  - Avatar, Dialog, Dropdown Menu, Label, Popover
  - Progress, Scroll Area, Select, Separator, Slot, Tabs
- **[Lucide React](https://lucide.dev/)** - Biblioteca de ícones bonitos e consistentes
- **[React Icons](https://react-icons.github.io/react-icons/)** - Conjuntos de ícones adicionais
- **[class-variance-authority](https://cva.style/)** - CVA para variantes de componentes
- **[clsx](https://github.com/lukeed/clsx) + [tailwind-merge](https://github.com/dcastil/tailwind-merge)** - Utilitários de className condicionais
- **[tailwindcss-animate](https://github.com/jamiebuilds/tailwindcss-animate)** - Utilitários de animação

### Visualização de Dados
- **[Recharts](https://recharts.org/)** - Biblioteca de gráficos componível para React

### Utilitários de UI
- **[Sonner](https://sonner.emilkowal.ski/)** - Notificações toast elegantes
- **[cmdk](https://cmdk.paco.me/)** - Componente de menu de comandos
- **[react-day-picker](https://react-day-picker.js.org/)** - Componente de seleção de data
- **[date-fns](https://date-fns.org/)** - Biblioteca moderna de utilitários de data

### Ferramentas de Desenvolvimento
- **[Turbopack](https://turbo.build/pack)** - Bundler rápido do Next.js 15
- **[ESLint](https://eslint.org/)** - Linting e qualidade de código
- **[PostCSS](https://postcss.org/)** - Transformação CSS
- **[Geist Font](https://vercel.com/font)** - Família de fontes moderna e otimizada

## 📋 Pré-requisitos

Antes de começar, certifique-se de ter o seguinte instalado:

- **Node.js** 20.x ou superior
- **npm**, **yarn**, **pnpm** ou **bun**
- A **API backend** rodando (veja o [repositório do backend](https://github.com/felippe-fernandes/credit_card_planner_backend))
- Uma **conta Supabase** (o plano gratuito funciona bem)

## 🚀 Começando

### 1. Clone o repositório

```bash
git clone https://github.com/felippe-fernandes/credit_card_planner_frontend.git
cd credit_card_planner_frontend
```

### 2. Instale as dependências

```bash
npm install
# ou
yarn install
# ou
pnpm install
# ou
bun install
```

### 3. Configure as variáveis de ambiente

Crie um arquivo `.env.local` no diretório raiz com as seguintes variáveis:

```env
# URL da API Backend (certifique-se de que o backend está rodando)
NEXT_PUBLIC_API_BASE_URL=http://localhost:3001

# Configuração do Supabase
NEXT_PUBLIC_SUPABASE_URL=url_do_seu_projeto_supabase
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua_chave_anonima_supabase
```

**Nota:**
- Você precisará criar um projeto Supabase em [supabase.com](https://supabase.com)
- Obtenha suas credenciais nas configurações do seu projeto Supabase
- O backend deve ser configurado com o mesmo projeto Supabase
- As variáveis de ambiente são validadas em tempo de execução usando schemas Zod

### 4. Execute o servidor de desenvolvimento

```bash
npm run dev
# ou
yarn dev
# ou
pnpm dev
# ou
bun dev
```

Abra [http://localhost:3000](http://localhost:3000) no seu navegador para ver a aplicação.

## 📦 Scripts Disponíveis

```bash
# Desenvolvimento
npm run dev          # Inicia servidor de desenvolvimento com Turbopack (HMR rápido)

# Produção
npm run build        # Cria build otimizado para produção
npm run start        # Inicia servidor de produção

# Qualidade de Código
npm run lint         # Executa verificações ESLint do Next.js
```

## 🏗️ Estrutura do Projeto

```
credit_card_planner_frontend/
├── app/                      # Next.js 15 App Router
│   ├── (private)/           # Rotas protegidas (requer autenticação)
│   │   ├── layout.tsx       # Layout protegido com Header + Sidebar
│   │   ├── page.tsx         # Redirecionamento para dashboard
│   │   ├── dashboard/       # Dashboard com análises
│   │   ├── cards/           # Gerenciamento de cartões de crédito
│   │   ├── transactions/    # Operações CRUD de transações
│   │   ├── invoices/        # Gerenciamento de faturas
│   │   ├── categories/      # Gerenciamento de categorias
│   │   └── dependents/      # Gerenciamento de dependentes
│   ├── login/               # Página pública de login
│   ├── signup/              # Página pública de cadastro
│   ├── layout.tsx           # Layout raiz com providers
│   └── globals.css          # Estilos globais
│
├── components/              # Componentes React
│   ├── common/             # Componentes compartilhados (Button, Input, Header, etc.)
│   ├── ui/                 # Componentes shadcn/ui (gerados automaticamente)
│   ├── login/              # Componente de formulário de login
│   ├── signup/             # Componente de formulário de cadastro
│   ├── cards/              # Componentes específicos de cartões
│   ├── transactions/       # Componentes de transações
│   ├── invoices/           # Componentes de faturas
│   ├── categories/         # Componentes de categorias
│   └── dependents/         # Componentes de dependentes
│
├── context/                # Providers de Contexto React
│   ├── AuthContext.tsx     # Gerenciamento de estado de autenticação
│   └── ThemeContext.tsx    # Gerenciamento de tema (modo claro/escuro)
│
├── hooks/                  # Custom React hooks
│   ├── useServiceClient/   # Hook de instanciação de serviços
│   └── [outros hooks]/     # Hooks específicos de funcionalidades
│
├── lib/                    # Utilitários e configurações principais
│   ├── axios.ts           # Instância Axios com interceptors
│   ├── env.ts             # Validação de variáveis de ambiente (Zod)
│   ├── supabaseClient.ts  # Inicialização do cliente Supabase
│   └── utils.ts           # Funções utilitárias (cn, etc.)
│
├── schemas/               # Schemas de validação Zod
│   ├── api/              # Schemas de requisição/resposta da API
│   └── entities/         # Schemas de entidades de domínio
│
├── services/             # Camada de serviços da API (baseada em classes)
│   ├── auth/            # Serviço de autenticação
│   ├── cards/           # Serviço de cartões de crédito
│   ├── transactions/    # Serviço de transações
│   ├── invoices/        # Serviço de faturas
│   ├── categories/      # Serviço de categorias
│   └── dependents/      # Serviço de dependentes
│
├── types/               # Definições de tipos TypeScript
│   ├── api/            # Tipos da API (IResponseBase, etc.)
│   ├── auth/           # Tipos de autenticação (LoginRequest, SignupRequest)
│   └── entities/       # Tipos de entidades (Card, Transaction, Invoice)
│
├── utils/              # Utilitários específicos da aplicação
│   └── Wrapper.tsx     # Componente wrapper de providers
│
├── styles/             # Estilos globais
│
├── public/             # Assets estáticos (imagens, ícones, etc.)
│
├── components.json     # Configuração do shadcn/ui
├── tailwind.config.ts  # Configuração do Tailwind CSS
├── tsconfig.json       # Configuração do TypeScript
└── next.config.ts      # Configuração do Next.js
```

## 🏛️ Visão Geral da Arquitetura

### Fluxo de Autenticação

1. Usuário envia formulário de login/cadastro
2. Frontend chama a API backend (`/auth/login` ou `/auth/signup`)
3. Backend valida credenciais e retorna tokens Supabase (access_token, refresh_token)
4. Frontend estabelece sessão Supabase via `supabase.auth.setSession()`
5. `AuthContext` gerencia estado de autenticação usando TanStack Query
6. Listener `onAuthStateChange` do Supabase mantém sessão sincronizada
7. Rotas protegidas redirecionam automaticamente usuários não autenticados para `/login`

### Padrão de Integração com API

Todas as chamadas de API seguem um padrão consistente e type-safe:

1. **Camada de Serviço**: Serviços baseados em classes no diretório `services/`
2. **Tipagem Segura**: Tipos de requisição/resposta definidos com schemas Zod, depois inferidos
3. **Tratamento de Erros**: Centralizado via helper `handleAxiosRequest` em `lib/axios.ts`
4. **Gerenciamento de Estado**: TanStack Query para cache e sincronização de estado do servidor
5. **Instanciação de Serviços**: Sempre via hook `useServiceClient` (suporta modo mock)

**Exemplo de chamada de API:**

```typescript
// Serviço (services/cards/index.ts)
export class CardService {
  public async getCards(): Promise<IResponseBase<Card[]>> {
    return await handleAxiosRequest({
      path: "/cards",
      method: "get",
    });
  }
}

// Uso no componente
const CardClient = useServiceClient({ service: CardService });
const { data, isLoading } = useQuery({
  queryKey: ["cards"],
  queryFn: async () => await CardClient.getCards(),
});
```

### Estratégia de Gerenciamento de Estado

- **Estado do Servidor**: TanStack Query v5 para dados da API (cache automático, refetching e sincronização)
- **Estado de Autenticação**: React Context (`AuthContext`) com integração TanStack Query
- **Estado de Formulários**: React Hook Form com validação Zod para formulários type-safe
- **Estado Local**: Zustand para estado cross-component quando Context é muito pesado
- **Estado de UI**: React `useState`/`useReducer` para estado específico de componentes

### Proteção de Rotas

Todas as rotas autenticadas são colocadas sob `app/(private)/`. O layout (`app/(private)/layout.tsx`) automaticamente:

- Mostra skeleton de carregamento durante verificação de autenticação
- Redireciona para `/login` se o usuário não estiver autenticado
- Renderiza Header e Sidebar para usuários autenticados
- Fornece acesso ao contexto de autenticação via hook `useAuth()`

**Não é necessário verificação manual de autenticação** - apenas coloque sua página sob `(private)/`!

### Hierarquia de Providers

Os providers são envolvidos em `utils/Wrapper.tsx` na seguinte ordem (ordem importa para dependências):

1. **Suspense** - Fallback de carregamento (componente `LoadingPage`)
2. **ThemeProvider** - Estado de modo claro/escuro
3. **QueryClientProvider** - Configuração do TanStack Query
4. **AuthProvider** - Estado de autenticação + sessão Supabase
5. **Toaster** - Notificações toast (Sonner)

## 🎨 Sistema de Estilização

A aplicação usa Tailwind CSS 4 com configuração personalizada e componentes shadcn/ui para um sistema de design moderno e consistente.

### Principais Características

- **Abordagem utility-first**: Componha estilos diretamente no JSX
- **Tema personalizado**: Definido em `tailwind.config.ts`
- **Modo escuro**: Automático via `ThemeProvider` com prefixo `dark:`
- **Responsivo**: Mobile-first com breakpoints `sm:`, `md:`, `lg:`, `xl:`
- **Animações**: Integradas com `tailwindcss-animate`
- **Tipografia**: Fontes Geist Sans e Geist Mono

### Adicionando Componentes shadcn/ui

Para adicionar novos componentes do shadcn/ui:

```bash
npx shadcn add <nome-do-componente>
```

Exemplos:
```bash
npx shadcn add button
npx shadcn add dialog
npx shadcn add form
```

Os componentes são automaticamente adicionados a `components/ui/` e podem ser personalizados.

## 🔌 Integração com API

Este frontend se comunica com a API backend NestJS. A URL base é configurada via variável de ambiente `NEXT_PUBLIC_API_BASE_URL`.

### Formato de Resposta Esperado

Todos os endpoints da API retornam respostas no seguinte formato:

```typescript
interface IResponseBase<T> {
  message: string;
  statusCode: number;
  data: T;           // ou result: T (varia por endpoint)
  count?: number;    // para respostas paginadas
  success: boolean;
}
```

### Serviços Disponíveis

- **AuthService** - Login, cadastro, gerenciamento de sessão
- **CardService** - Operações CRUD para cartões de crédito
- **TransactionService** - Gerenciamento de transações
- **InvoiceService** - Operações de faturas
- **CategoryService** - Gerenciamento de categorias
- **DependentService** - Gerenciamento de usuários dependentes

## 🧪 Modo Mock

A aplicação suporta um **modo mock** para testes sem o backend. Adicione `?useMock=true` a qualquer URL para habilitar respostas mock dos serviços.

**Exemplo:**
```
http://localhost:3000/dashboard?useMock=true
```

Isso é útil para:
- Desenvolvimento frontend sem dependência do backend
- Testes de UI/UX
- Demos e apresentações

## 🔒 Variáveis de Ambiente

Todas as variáveis de ambiente são validadas em tempo de execução usando schemas Zod (`lib/env.ts`). A aplicação falhará ao iniciar se variáveis obrigatórias estiverem faltando ou inválidas.

**Variáveis obrigatórias:**

```env
NEXT_PUBLIC_API_BASE_URL      # URL da API Backend (deve ser URL válida)
NEXT_PUBLIC_SUPABASE_URL      # URL do projeto Supabase (deve ser URL válida)
NEXT_PUBLIC_SUPABASE_ANON_KEY # Chave anônima Supabase (JWT)
```

## 🚢 Deploy

### Vercel (Recomendado)

A maneira mais fácil de fazer deploy é usando a [Plataforma Vercel](https://vercel.com/new):

1. Faça push do seu código para o GitHub
2. Importe seu repositório para a Vercel
3. Configure as variáveis de ambiente no dashboard da Vercel
4. Deploy automático a cada push

[![Deploy com Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/felippe-fernandes/credit_card_planner_frontend)

### Outras Plataformas

Você também pode fazer deploy em:
- **Netlify** - Configure comando de build: `npm run build`, diretório de publicação: `.next`
- **AWS Amplify** - Use preset Next.js 15
- **Docker** - Crie Dockerfile com imagem base Node.js 20+

**Importante**: Certifique-se de configurar as variáveis de ambiente na sua plataforma de deploy.

## 🧑‍💻 Diretrizes de Desenvolvimento

### Estilo de Código

- Use TypeScript para todo código novo
- Siga as regras do ESLint (`npm run lint`)
- Use componentes funcionais com hooks
- Prefira `const` ao invés de `let`, evite `var`
- Use nomes de variáveis descritivos

### Padrões de Componentes

```typescript
// Prefira este padrão
"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

export default function MeuComponente() {
  const [state, setState] = useState<string>("");

  const { data, isLoading } = useQuery({
    queryKey: ["key"],
    queryFn: fetchFunction,
  });

  if (isLoading) return <div>Carregando...</div>;

  return <div>{/* JSX do componente */}</div>;
}
```

### Padrão de Serviços

```typescript
// Sempre use o hook useServiceClient
const ServiceClient = useServiceClient({ service: MeuServico });

// Use TanStack Query para busca de dados
const { data } = useQuery({
  queryKey: ["meusDados"],
  queryFn: async () => await ServiceClient.getData(),
});

// Use mutations para modificação de dados
const { mutate } = useMutation({
  mutationFn: async (data) => await ServiceClient.create(data),
  onSuccess: () => queryClient.invalidateQueries({ queryKey: ["meusDados"] }),
});
```

### Padrão de Formulários

```typescript
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { meuSchema } from "@/schemas/api/meu.schema";

const { register, handleSubmit, formState: { errors } } = useForm({
  resolver: zodResolver(meuSchema),
});

const onSubmit = (data: MeusDadosForm) => {
  // Lidar com envio do formulário
};
```

## 🤝 Contribuindo

Contribuições são bem-vindas! Por favor, siga estes passos:

1. Faça um fork do repositório
2. Crie sua branch de feature (`git checkout -b feature/FuncionalidadeIncrivel`)
3. Commit suas mudanças (`git commit -m 'Adiciona alguma FuncionalidadeIncrivel'`)
4. Push para a branch (`git push origin feature/FuncionalidadeIncrivel`)
5. Abra um Pull Request

### Convenção de Commits

Seguimos commits convencionais:

- `feat:` - Nova funcionalidade
- `fix:` - Correção de bug
- `docs:` - Mudanças de documentação
- `style:` - Mudanças de estilo de código (formatação, etc.)
- `refactor:` - Refatoração de código
- `test:` - Adições ou mudanças de testes
- `chore:` - Mudanças no processo de build ou ferramentas auxiliares

## 📝 Licença

Este projeto faz parte de um portfólio pessoal e está disponível para fins educacionais.

## 👤 Autor

**Felippe Fernandes**

- GitHub: [@felippe-fernandes](https://github.com/felippe-fernandes)
- LinkedIn: [Felippe Fernandes](https://www.linkedin.com/in/felippe-fernandes/)

## 🙏 Agradecimentos

- **Framework**: [Next.js](https://nextjs.org/) pela Vercel
- **Componentes de UI**: [shadcn/ui](https://ui.shadcn.com/) por shadcn
- **Ícones**: [Lucide](https://lucide.dev/) e [React Icons](https://react-icons.github.io/)
- **Autenticação**: [Supabase](https://supabase.com/)
- **Gerenciamento de Estado**: [TanStack Query](https://tanstack.com/query) por Tanner Linsley
- **Estilização**: [Tailwind CSS](https://tailwindcss.com/)

---

**Notas Importantes:**

1. **Backend Obrigatório**: Certifique-se de que a API backend está rodando antes de iniciar o frontend. Veja o [repositório do backend](https://github.com/felippe-fernandes/credit_card_planner_backend) para instruções de configuração.

2. **Configuração do Supabase**: Você precisa criar um projeto Supabase e configurá-lo tanto no frontend quanto no backend.

3. **Variáveis de Ambiente**: A aplicação valida variáveis de ambiente na inicialização e falhará se estiverem faltando ou inválidas.

4. **Conta de Teste**: Use `teste@teste.com` / `123456` para explorar a aplicação com dados de exemplo.

