# Credit Card Planner - Frontend

Uma aplicação web moderna para rastreamento e gerenciamento de despesas de cartão de crédito, construída com Next.js 15 e React 19.

[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-61dafb?style=flat-square&logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind-4-38bdf8?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)

> **Leia em outros idiomas**: [English](./README.md)

## Visão Geral

Esta é a aplicação frontend do sistema Credit Card Planner. Ela fornece uma interface intuitiva para os usuários gerenciarem seus cartões de crédito, rastrearem despesas, organizarem transações por categorias, gerenciarem dependentes e monitorarem faturas mensais.

**Nota sobre Arquitetura**: Este projeto segue uma **arquitetura de microsserviços** com repositórios separados para frontend e backend. Não é uma aplicação monolítica - o frontend e backend são projetos independentes que se comunicam via API REST.

### Principais Funcionalidades

- **Gerenciamento de Cartões de Crédito**: Adicione, edite e rastreie múltiplos cartões de crédito
- **Rastreamento de Transações**: Registre e categorize despesas com informações detalhadas
- **Gerenciamento de Faturas**: Visualize e organize faturas mensais de cartão de crédito
- **Organização por Categorias**: Categorize despesas para melhores insights financeiros
- **Gerenciamento de Dependentes**: Rastreie despesas feitas por dependentes
- **Autenticação**: Autenticação segura de usuários com Supabase
- **Modo Escuro**: Suporte integrado de tema para modos claro e escuro
- **Design Responsivo**: Otimizado para dispositivos desktop e mobile

## Stack Tecnológica

### Framework Principal
- **[Next.js 15](https://nextjs.org/)** - Framework React com App Router
- **[React 19](https://reactjs.org/)** - Biblioteca de UI
- **[TypeScript](https://www.typescriptlang.org/)** - Tipagem estática

### Gerenciamento de Estado e Busca de Dados
- **[TanStack Query](https://tanstack.com/query)** (React Query) - Gerenciamento de estado do servidor
- **[Zustand](https://zustand-demo.pmnd.rs/)** - Gerenciamento de estado do cliente
- **[React Hook Form](https://react-hook-form.com/)** - Gerenciamento de estado de formulários
- **[Zod](https://zod.dev/)** - Validação de schemas

### Estilização e UI
- **[Tailwind CSS 4](https://tailwindcss.com/)** - Framework CSS utility-first
- **[shadcn/ui](https://ui.shadcn.com/)** - Biblioteca de componentes reutilizáveis
- **[Geist Font](https://vercel.com/font)** - Família de fontes moderna

### Autenticação e Backend
- **[Supabase](https://supabase.com/)** - Autenticação e gerenciamento de sessão
- **[Axios](https://axios-http.com/)** - Cliente HTTP para comunicação com API
- **NestJS Backend** - Integração com API RESTful

## Pré-requisitos

Antes de começar, certifique-se de ter instalado:

- **Node.js** 18.x ou superior
- **npm** 9.x ou superior
- **Git**

Você também precisará:
- Uma instância em execução do **[Credit Card Planner Backend](https://github.com/felippe-fernandes/credit_card_planner_backend)** (repositório separado)
- Credenciais do projeto Supabase (URL e Chave Anônima)

## Começando

### 1. Clone o Repositório

```bash
git clone https://github.com/felippe-fernandes/credit_card_planner_frontend.git
cd credit_card_planner_frontend
```

### 2. Instale as Dependências

```bash
npm install
```

### 3. Configuração do Ambiente

Crie um arquivo `.env.local` no diretório raiz:

```env
# Configuração da API Backend
NEXT_PUBLIC_API_BASE_URL=http://localhost:3001

# Configuração do Supabase
NEXT_PUBLIC_SUPABASE_URL=url_do_seu_projeto_supabase
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua_chave_anonima_supabase
```

**Variáveis de Ambiente Obrigatórias**:
- `NEXT_PUBLIC_API_BASE_URL` - URL da API backend NestJS
- `NEXT_PUBLIC_SUPABASE_URL` - URL do seu projeto Supabase
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Sua chave anônima (pública) do Supabase

> **Nota**: A aplicação falhará ao iniciar se essas variáveis estiverem ausentes ou inválidas (validadas via Zod).

### 4. Execute o Servidor de Desenvolvimento

```bash
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000) no seu navegador.

A aplicação recarregará automaticamente quando você fizer alterações no código.

## Conta de Demonstração

Para recrutadores e avaliadores, uma conta de teste está disponível para explorar a aplicação sem precisar preencher dados:

**Credenciais do Usuário de Teste**:
- **Email**: `teste@teste.com`
- **Senha**: `teste123`

> Esta conta vem pré-populada com dados de exemplo (cartões, transações, faturas, categorias) para que você possa ver imediatamente as funcionalidades da aplicação em ação.

## Scripts Disponíveis

```bash
npm run dev          # Inicia servidor de desenvolvimento com Turbopack (http://localhost:3000)
npm run build        # Cria build de produção
npm run start        # Inicia servidor de produção
npm run lint         # Executa ESLint para verificação de qualidade de código
```

## Estrutura do Projeto

```
credit_card_planner_frontend/
├── app/                      # Páginas do Next.js App Router
│   ├── (private)/            # Rotas protegidas (requer autenticação)
│   │   ├── dashboard/        # Página do dashboard
│   │   ├── cards/            # Páginas de gerenciamento de cartões
│   │   ├── transactions/     # Páginas de transações
│   │   ├── invoices/         # Páginas de faturas
│   │   ├── categories/       # Páginas de gerenciamento de categorias
│   │   ├── dependents/       # Páginas de gerenciamento de dependentes
│   │   └── layout.tsx        # Layout de rotas protegidas (Header + Sidebar)
│   ├── login/                # Página de login
│   ├── signup/               # Página de cadastro
│   └── layout.tsx            # Layout raiz
├── components/               # Componentes React
│   ├── common/               # Componentes compartilhados (Header, Sidebar, etc.)
│   ├── ui/                   # Primitivos do shadcn/ui
│   └── [feature]/            # Componentes específicos de funcionalidade
├── context/                  # Provedores de Contexto React
│   ├── AuthContext.tsx       # Estado de autenticação
│   └── ThemeContext.tsx      # Estado de tema (claro/escuro)
├── hooks/                    # Hooks React personalizados
├── lib/                      # Utilitários compartilhados
│   ├── axios.ts              # Configuração do Axios
│   ├── supabaseClient.ts     # Cliente Supabase
│   ├── env.ts                # Validação de ambiente
│   └── utils.ts              # Funções utilitárias
├── schemas/                  # Schemas de validação Zod
│   ├── api/                  # Schemas de requisição API
│   └── entities/             # Schemas de entidades
├── services/                 # Classes de serviço de API
│   ├── auth/                 # Serviço de autenticação
│   ├── cards/                # Serviço de cartões
│   ├── transactions/         # Serviço de transações
│   ├── invoices/             # Serviço de faturas
│   ├── categories/           # Serviço de categorias
│   └── dependents/           # Serviço de dependentes
├── types/                    # Definições de tipos TypeScript
│   ├── api/                  # Tipos de resposta da API
│   ├── auth/                 # Tipos de autenticação
│   └── entities/             # Tipos de modelos de domínio
└── utils/                    # Utilitários específicos da aplicação
```

## Destaques da Arquitetura

### Fluxo de Autenticação

A aplicação usa uma abordagem híbrida de autenticação:

1. Usuário envia credenciais via formulário de login/cadastro
2. Backend valida credenciais e retorna tokens do Supabase
3. Frontend define sessão usando `supabase.auth.setSession()`
4. `AuthContext` gerencia estado de autenticação com TanStack Query
5. Rotas protegidas redirecionam automaticamente usuários não autenticados

Todas as páginas em `app/(private)/` são automaticamente protegidas.

### Padrão de Serviços

Serviços são baseados em classes e suportam modo mock opcional:

```typescript
// Sempre use o hook useServiceClient
const CardService = useServiceClient({ service: CardsService });

// Use no TanStack Query
const { data } = useQuery({
  queryKey: ['cards'],
  queryFn: async () => await CardService.getCards(),
});
```

**Modo Mock**: Adicione `?useMock=true` à URL para habilitar dados mock sem conexão com backend.

### Validação de Formulários

Formulários usam React Hook Form com validação Zod:

```typescript
const { register, handleSubmit, formState: { errors } } = useForm({
  resolver: zodResolver(cardSchema),
});
```

### Integração com API

Todas as chamadas de API usam tratamento de erros centralizado via helper `handleAxiosRequest`:

```typescript
return await handleAxiosRequest({
  path: '/cards',
  method: 'get',
});
```

## Diretrizes de Desenvolvimento

### Adicionando uma Nova Funcionalidade

1. Crie serviço em `services/[funcionalidade]/index.ts`
2. Defina tipos em `types/entities/[funcionalidade].ts`
3. Crie schemas Zod em `schemas/api/[funcionalidade].schema.ts`
4. Construa componentes UI em `components/[funcionalidade]/`
5. Crie páginas em `app/(private)/[funcionalidade]/`

### Adicionando Componentes shadcn/ui

```bash
npx shadcn add <nome-do-componente>
```

Componentes são adicionados a `components/ui/` e podem ser importados:

```typescript
import { Button } from "@/components/ui/button"
```

### Diretrizes de Estilização

- Use classes utilitárias do Tailwind diretamente no JSX
- Use o helper `cn()` para classes condicionais
- Siga padrões de design responsivo (prefixos `md:`, `lg:`)
- Modo escuro é gerenciado automaticamente via `ThemeProvider`

## Documentação

Para instruções detalhadas de desenvolvimento, padrões de arquitetura e melhores práticas, consulte:
- **[CLAUDE.md](./CLAUDE.md)** - Guia completo para desenvolvedores

### Projetos Relacionados

Esta aplicação frontend funciona com uma API backend separada:
- **[Repositório Backend](https://github.com/felippe-fernandes/credit_card_planner_backend)** - API REST NestJS (projeto separado)

> **Importante**: Frontend e backend são intencionalmente repositórios separados seguindo uma arquitetura de microsserviços, não uma estrutura monolítica.

## Licença

Este projeto está licenciado sob a Licença MIT.

## Suporte

Para problemas, questões ou sugestões:
- Abra uma issue no GitHub
- Entre em contato com o mantenedor

---

**Construído com ❤️ usando Next.js 15 e React 19**
