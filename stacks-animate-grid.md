# Plano de Implementação: Refatoração da Seção de Stacks (Animate Grid 3D)

**Status:** Proposto / Em Validação  
**Data:** 25 de Setembro de 2026  
**Responsáveis:** `@[project-planner]` & `@[frontend-specialist]`  
**Arquivo Alvo:** [`src/components/Stacks.tsx`](file:///c:/Users/Corpvs/Documents/lucas-tomaz-portfolio/portfolio_lucastomaz/src/components/Stacks.tsx) (e possível novo [`src/components/ui/animate-grid.tsx`](file:///c:/Users/Corpvs/Documents/lucas-tomaz-portfolio/portfolio_lucastomaz/src/components/ui/animate-grid.tsx))

---

## 1. Visão Geral & Objetivos

Substituir o modelo atual de carrossel orbital com sub-abas (Frontend, Backend, Database, DevOps) por um layout moderno de duas colunas:
- **Lado Esquerdo:** Painel dinâmico e contextual com título da seção, estatísticas rápidas e descrição técnica detalhada da tecnologia atualmente em foco (hover).
- **Lado Direito:** Grid animado 4x4 (16 blocos) com perspectiva 3D, efeito de elevação da carta em foco (`scale(1.15)`, `translateZ(15px)`) e elevação secundária dos blocos adjacentes (vizinhos acima, abaixo, esquerda e direita), inspirado no componente `animate-grid` do Inspira UI.

---

## 2. Ponto Crítico de Arquitetura: Inspira UI (Vue) vs Stack do Projeto (Next.js / React)

> [!IMPORTANT]
> **Aviso de Compatibilidade Técnica:**  
> O comando informado (`npx shadcn-vue@latest add "https://registry.inspira-ui.com/animate-grid.json"`) pertence ao **Inspira UI**, que é uma biblioteca desenvolvida especificamente para o ecossistema **Vue 3 / Nuxt**.  
> O portfólio atual é construído sobre:
> - **Next.js 16 (App Router)**
> - **React 19**
> - **Tailwind CSS v4**
> - **Framer Motion 12**
>
> **Solução Recomendada:**  
> Faremos a **portabilidade nativa** da lógica e dos efeitos CSS/3D do `AnimateGrid` diretamente para **React 19 + TypeScript + Tailwind CSS / Framer Motion**. Dessa forma:
> 1. Preservamos 100% da fidelidade visual e física do Inspira UI (perspectiva 3D de 600px, rotação -1deg X / -15deg Y, vizinhos adjacentes detectados por matriz matemática).
> 2. Mantemos zero dependências externas extras, evitando conflitos de runtime entre Vue e React.
> 3. Integramos com o contexto de acessibilidade do portfólio (`AnimationContext` - suporte a `prefers-reduced-motion`).

---

## 3. As 16 Tecnologias Mapeadas (Grid 4x4)

A matriz 4x4 será composta rigorosamente pelas 16 tecnologias solicitadas:

| Posição (Index) | Tecnologia | Categoria / Tipo | Cor Temática | Ícone / Vetor |
| :---: | :--- | :--- | :---: | :--- |
| **0** | **HTML5** | Base Web / Semântica | `#E34F26` | SVG Oficial HTML5 |
| **1** | **CSS3** | Estilização & Animações | `#1572B6` | SVG Oficial CSS3 |
| **2** | **JavaScript** | Linguagem / Runtime | `#F7DF1E` | SVG Oficial JS |
| **3** | **React** | Biblioteca UI Reativa | `#61DAFB` | SVG Átomo React |
| **4** | **Node.js** | Backend / Runtime | `#339933` | SVG Hexágono Node.js |
| **5** | **GitHub** | Versionamento & CI/CD | `#F0F6FC` | SVG GitHub (já existente em `icons.tsx`) |
| **6** | **PostgreSQL** | Banco Relacional SQL | `#336791` | Ícone Oficial Icons8 (38561) |
| **7** | **Supabase** | BaaS / PostgreSQL Cloud | `#3ECF8E` | SVG Raio Supabase |
| **8** | **Vercel** | Edge Deployment & Cloud | `#FFFFFF` | SVG Triângulo Vercel |
| **9** | **Render** | Cloud Application Hosting | `#46E3B7` | SVG Oficial Render |
| **10** | **Vite** | Bundler & Dev Tooling | `#646CFF` | SVG Raio/Gradiente Vite |
| **11** | **Next.js** | Framework Full-Stack React | `#FFFFFF` | SVG Monograma Next.js |
| **12** | **Claude Code** | AI Agent & Pair Programming | `#D97706` | SVG Símbolo Claude / Anthropic Spark |
| **13** | **Codex** | Modelos LLM & Code Gen | `#10A37F` | SVG OpenAI / Codex |
| **14** | **Antigravity** | Agentic IDE & Automação | `#5DADE2` | SVG Geométrico Antigravity |
| **15** | **Tailwind CSS** | Design Tokens & Utility CSS | `#38BDF8` | SVG Onda Tailwind |

---

## 4. Engenharia de Interatividade & Física do Grid

O arquivo original do Inspira UI utiliza um algoritmo de vizinhança para elevar as cartas adjacentes ao item ativo:

```typescript
// Lógica de Vizinhança no Grid 4x4 (16 itens: 0 a 15)
function getAdjacentCardIndices(i: number): number[] {
  return [i - 1, i + 1, i - 4, i + 4].filter((index) => {
    if (index < 0 || index > 15) return false;
    // Borda esquerda não interage com borda direita da linha anterior
    if (i % 4 === 0 && index === i - 1) return false;
    // Borda direita não interage com borda esquerda da linha seguinte
    if (i % 4 === 3 && index === i + 1) return false;
    return true;
  });
}
```

### Estados de Elevação:
1. **Carta em Hover (`hoveredIndex === index`):**
   - Transform: `scale(1.15) translateZ(20px)`
   - Glow: Borda e drop-shadow iluminados na cor temática da tecnologia selecionada.
   - Z-Index: 30 (sobreposição prioritária).
2. **Cartas Adjacentes (`adjacentIndices.includes(index)`):**
   - Transform: `scale(1.05) translateZ(8px)`
   - Glow: Glow suave reduzido (30% da intensidade da carta foco).
   - Z-Index: 20.
3. **Cartas Neutras:**
   - Transform: `scale(1) translateZ(0)`
   - Opacidade e sombra discretas no tema dark.

---

## 5. Estrutura do Layout Proposto (2 Colunas)

```
+---------------------------------------------------------------------------------------+
|  SECTION: STACKS / TECNOLOGIAS                                                       |
|                                                                                       |
|  [LADO ESQUERDO: INFO DINÂMICA]               [LADO DIREITO: ANIMATE GRID 3D]         |
|  +-------------------------------------+      +-------------------------------------+ |
|  | // TECH STACK & FERRAMENTAS         |      |       Perspective: 600px            | |
|  | Competências Técnicas               |      |       RotateX: -2deg, RotateY: -12deg |
|  |                                     |      |                                     | |
|  | [Card de Detalhes da Tecnologia]    |      |   [HTML]   [CSS]    [JS]    [REACT] | |
|  | ----------------------------------  |      |   [NODE]   [GIT]    [POST]  [SUPA]  | |
|  | [TAG: FRAMEWORK FULL-STACK]         |      |   [VERCEL] [RENDER] [VITE]  [NEXT]  | |
|  | NEXT.JS                             |      |   [CLAUDE] [CODEX]  [AGY]   [TAILW] | |
|  |                                     |      |                                     | |
|  | "Aplicações corporativas full-stack |      +-------------------------------------+ |
|  | com SSR/SSG otimizados, Server      |                                              |
|  | Actions, App Router e SEO técnico." |      * Hover eleva a carta em destaque e    |
|  |                                     |        ilumina as cartas vizinhas           |
|  | [Indicadores de Proficiência/Tags]  |                                              |
|  +-------------------------------------+                                              |
+---------------------------------------------------------------------------------------+
```

---

## 6. Fases de Execução

### Fase 1: Criação do Componente `AnimateGrid` (React 19 / Tailwind v4)
- **Arquivo:** `src/components/ui/AnimateGrid.tsx` ou modularizado diretamente.
- Implementar container 3D (`perspective`, `transform-style: preserve-3d`).
- Implementar estado ativo de hover (`hoveredIndex`) e cálculo derivado de vizinhos (`adjacentIndices`).
- Adicionar estilos de transição fluida, drop-shadow dinâmico na cor da tecnologia e suporte a acessibilidade (`prefers-reduced-motion`).

### Fase 2: Mapeamento de Dados & Ícones dos 16 Itens
- Padronizar os 16 itens com: `name`, `categoryLabel`, `color`, `desc`, `icon`, `stats/tags`.
- Inserir SVGs vetoriais de alta fidelidade para as 5 novas ferramentas solicitadas:
  - Claude Code
  - Codex
  - Antigravity
  - Render
  - GitHub (reutilizando padrão)

### Fase 3: Refatoração do Componente Principal `Stacks.tsx`
- Remover sistema legado de abas (`TABS`: frontend, backend, database, devops).
- Implementar grid responsivo `lg:grid-cols-12`:
  - `lg:col-span-5`: Coluna da esquerda com Header institucional e Card de Tecnologia interativo.
  - `lg:col-span-7`: Coluna da direita com o AnimateGrid 3D.
- Configurar estado inicial padrão (ex: `Next.js` ou `React` pré-selecionado) para que o card esquerdo nunca fique vazio antes do primeiro hover.

### Fase 4: Adaptação Responsiva (Mobile & Tablet)
- Em telas menores que `768px`:
  - Suavizar a inclinação 3D para evitar corte lateral de viewport.
  - Ajustar o tamanho dos blocos para caber na grade 4x4 em telas pequenas (ex: `w-14 h-14` em mobile, `w-20 h-20` em desktop) ou permitir grid adaptativo 4x4 fluido.
  - Posicionar o card de informações logo abaixo ou acima da grade com suporte a toque (tap to view).

### Fase 5: Validação, Lint & Testes
- Executar linter (`npm run lint`).
- Testar comportamento no browser via dev server (`npm run dev`).
- Validar contraste, responsividade e ausência de layout shifts.

---

## 7. Critérios de Aceite

1. [ ] Ausência completa das sub-abas anteriores (Frontend, Backend, etc.).
2. [ ] Exibição exata dos 16 blocos solicitados em grade 4x4.
3. [ ] Efeito de elevação 3D fiel ao Inspira UI (carta principal elevada + cartas adjacentes levemente levantadas).
4. [ ] Efeito de iluminação (glow) dinâmico baseado na cor de cada tecnologia.
5. [ ] Painel à esquerda atualizando instantaneamente com animação suave de fade ao passar o mouse.
6. [ ] Zero erros de compilação no Next.js 16 e total compatibilidade com React 19.
