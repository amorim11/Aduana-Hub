# Sistema de Averbação Aduaneira — Porto Seco (Agesbec)

Aplicação web para operadores aduaneiros de um **Porto Seco** (recinto alfandegado no interior que recebe cargas sob controle da Receita Federal). O sistema cobre o fluxo de **averbação**: vincular a carga que chegou ao recinto (identificada pela DTA) à documentação de importação correspondente (DI ou DUIMP), acompanhar o envio desse vínculo em segundo plano e consultar o que já foi averbado.

Projeto desenvolvido como desafio técnico para a Agesbec.

## Sobre o fluxo de negócio

No comércio exterior brasileiro, uma carga que chega a um recinto alfandegado no interior passa por alguns documentos-chave:

| Documento | O que é |
|---|---|
| **DTA** (Declaração de Trânsito Aduaneiro) | Ampara o transporte da mercadoria, sob controle da Receita Federal, de um ponto a outro — por exemplo, do porto marítimo até o Porto Seco. |
| **DI** (Declaração de Importação) | Documento tradicional em que se declaram as informações da mercadoria importada. |
| **DUIMP** (Declaração Única de Importação) | Documento digital do Portal Único do Siscomex que vem substituindo/modernizando a DI. |

**Averbar**, nesse contexto, é o ato de vincular a DTA (a carga que chegou fisicamente) à DI ou à DUIMP (a documentação que autoriza a importação). É esse vínculo que o operador faz na tela de Averbação do sistema: busca a DTA, confirma os dados do importador, escolhe se o processo é DUIMP ou DI, anexa os arquivos exigidos por cada tipo e envia para processamento.

## Stack Tecnológica

- **[Next.js](https://nextjs.org/) 16 (App Router)** — Server Components por padrão, Route Handlers para a API mockada.
- **TypeScript** — tipagem estrita em toda a aplicação.
- **[Tailwind CSS v4](https://tailwindcss.com/)** — estilização utilitária, responsiva do mobile ao desktop.
- **[Zustand](https://zustand-demo.pmnd.rs/)** — estado global da fila de uploads (ver decisão de engenharia abaixo).
- **[React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/)** — formulários e validação de schema, com máscaras de input em tempo real.
- **[Recharts](https://recharts.org/)** — gráficos do dashboard (rosca de distribuição por modal, tendência mensal).
- **[Vitest](https://vitest.dev/) + [React Testing Library](https://testing-library.com/react)** — testes unitários e de componente.
- **[Lucide](https://lucide.dev/) / [Phosphor Icons](https://phosphoricons.com/)** — ícones.

## Decisões de Engenharia

### Por que Zustand para a fila de uploads

Quando o operador envia uma averbação, o processamento (upload dos arquivos, validação no backend) não é instantâneo — e não deveria bloquear a tela. A store em `src/store/useUploadStore.ts` mantém a fila de envios (status `processing` → `completed`/`failed`, progresso, metadados) **fora** do ciclo de vida do formulário de averbação:

- O formulário reseta imediatamente após o envio, liberando o operador para buscar a próxima DTA sem esperar o processamento anterior terminar.
- Um widget global (`src/components/layout/UploadQueue.tsx`), visível em qualquer tela do app, mostra o andamento de todos os envios simultaneamente — inclusive se o operador navegar para outra página no meio do processo.
- Cada envio roda sua própria simulação assíncrona (`src/store/simulateUpload.ts`), isolada por `id`, garantindo que a falha de um item não trave nem afete os demais na fila.

Context API não serviria bem aqui porque o estado precisa sobreviver a trocas de rota sem re-render em cascata da árvore inteira; Zustand resolve isso com uma store simples, fora do React tree, com seletores granulares.

### Outras decisões

- **RSC por padrão, `"use client"` isolado nas folhas** — páginas são Server Components; interatividade (formulários, store, gráficos) fica isolada em componentes-folha explicitamente marcados como client.
- **Mock API via Route Handlers do Next.js** (`src/app/api/*`), em vez de MSW — como o projeto já roda em um servidor Next, os Route Handlers dão uma API real (com latência simulada de 300–600ms e status HTTP corretos, incluindo 404) sem dependência extra.
- **Zod + React Hook Form com `mode: "onChange"`** — o botão de envio só habilita quando `formState.isValid` é verdadeiro; validação condicional (`superRefine`) troca os campos obrigatórios conforme o tipo de processo (DUIMP exige PDF + número da DUIMP; DI exige PDF + XML + número da DI).
- **happy-dom em vez de jsdom** para os testes — a árvore de dependências do jsdom mais recente é ESM-only em várias camadas e não roda em Node < 20.19 via `require()` síncrono; happy-dom tem dependências independentes e evita esse problema sem downgrade de nada.

## Funcionalidades Implementadas

- **Autenticação simples** — tela de login (`/login`) com validação de formulário; qualquer e-mail/senha preenchidos avançam para o dashboard (não há backend de autenticação real neste desafio).
- **Dashboard** (`/dashboard`) — visão geral com total de documentos averbados, distribuição por modal (Aéreo, Marítimo, Rodoviário) em gráfico de rosca, taxa de averbação, status (Averbado/Pendente/Rejeitado) e tendência mensal.
- **Averbação** (`/averbacao`) — busca de DTA por número, exibição dos dados do importador, formulário com campos dinâmicos conforme o tipo de processo (DUIMP ou DI), máscaras de input em tempo real e validação estrita de formato.
- **Fila global de uploads** — widget flutuante, recolhível, com status por item (Em processamento / Concluído / Falha) e opção de reenviar em caso de falha.
- **Consulta de Documentos** (`/consulta`) — busca única por número de DTA, DUIMP ou DI, com visualização (preview simulado) e download dos arquivos anexados.
- **Mocks de API e validações** — endpoints mockados (`/api/dta`, `/api/documentos`, `/api/averbacao`) com latência simulada e tratamento de erro (404 para DTA não encontrada); máscaras e regex estritos para os formatos de DTA (`25/0000000-1`), DI (`25/0000000-1`) e DUIMP (`26BR0000123456-7`).
- **Responsividade total** — sidebar recolhível em drawer no mobile, tabelas com rolagem horizontal contida, formulários em coluna única até `md`, widget de uploads adaptado a telas pequenas.
- **Testes unitários** — schemas de validação, formulário de averbação (estados do botão, troca de campos DUIMP/DI) e cards do dashboard.

## Estrutura do Projeto

```
src/
├── app/
│   ├── (dashboard)/        # Route group autenticado: layout com sidebar/header
│   │   ├── dashboard/
│   │   ├── averbacao/
│   │   └── consulta/
│   ├── api/                # Route Handlers da mock API (dta, documentos, averbacao)
│   ├── login/               # Tela de login
│   └── page.tsx             # Redireciona "/" para "/login"
├── components/
│   ├── averbacao/           # Busca de DTA, formulário, upload de arquivos
│   ├── consulta/            # Busca, tabela de resultados, modal de preview
│   ├── dashboard/           # Cards, gráficos (rosca, tendência), atividade recente
│   └── layout/              # Sidebar, Header, AppShell, widget de fila de uploads
├── lib/
│   ├── masks.ts              # Máscaras de DTA/DI/DUIMP
│   └── validations/          # Schemas Zod
├── mocks/                    # "Banco de dados" mockado (DTAs, documentos, comissárias)
├── services/api.ts           # Cliente HTTP tipado para a mock API
└── store/                    # Store Zustand da fila de uploads + simulação assíncrona
```

## Como Rodar o Projeto

### Pré-requisitos

- Node.js >= 18 (recomendado 20.19+ ou 22.13+, para compatibilidade total com as dependências de teste)
- npm

### Comandos

```bash
# Clonar e instalar
npm install

# Rodar em desenvolvimento
npm run dev

# Rodar testes unitários
npm run test

# Rodar testes unitários uma vez (modo CI, sem watch)
npm run test:run

# Build de produção
npm run build

# Lint
npm run lint
```

A aplicação sobe em [http://localhost:3000](http://localhost:3000).

### Testando o fluxo (dados mockados)

Não há backend real — os dados abaixo estão fixos no código para permitir testar o fluxo completo:

- **Login**: qualquer e-mail e senha preenchidos.
- **Busca de DTA** (tela Averbação): use um dos números já cadastrados —
  `24/0456123-9`, `24/0512987-4` ou `24/0098231-1`.
- **Envio da averbação**: ~10% das simulações falham propositalmente, para exercitar o estado de falha e o botão de reenvio na fila de uploads.
