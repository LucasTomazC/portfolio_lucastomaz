# Plano Crítico e Arquitetura de Implementação: Refatoração da Seção "Serviços" (Why Us Bento + 3D Typing Keyboard)

**Status:** Aprovado & Alinhado (Socratic Gate Concluído)  
**Data:** 25 de Setembro de 2026  
**Responsável:** `@[frontend-specialist]` (Senior Frontend Architect)  
**Decisões Validadas:**
- **Layout Desktop:** Asimétrico 65% (Bento Grid) / 35% (Teclado 3D em perspectiva).
- **Layout Mobile/Tablet:** Empilhamento vertical com o Teclado 3D no topo como vitrine interativa.
- **Card 03 do Bento:** Perfil de Lucas Tomaz com foto oficial (`/avatar.png`) e selo de Engenharia Direta.
- **Cores do Teclado 3D:** Ciano Elétrico (`#5DADE2`) e Esmeralda (`#3ECF8E`), eliminando 100% de roxo (Purple Ban).
- **Performance:** IntersectionObserver + `prefers-reduced-motion` para suspender o loop de 50ms fora do viewport.
**Arquivos de Impacto:**
- Criação: `src/components/Services.tsx` (Substituição de `src/components/Certificates.tsx`)
- Criação: `src/components/ui/WhyUsBento.tsx`
- Criação: `src/components/ui/TypingKeyboard.tsx`
- Criação: `src/components/ui/svgs/IsometricBox01.tsx` e `IsometricBoxes02.tsx`
- Atualização: `src/app/page.tsx` (Substituição de `<Certificates />` por `<Services />`)
- Atualização: `src/components/Header.tsx` (Link de navegação `#certificados` -> `#servicos`)

---

## 1. 🔍 Análise Crítica e Diagnóstico Técnico da Solicitação

Antes de qualquer linha de código, analisamos a viabilidade real, dependências e impacto visual da solicitação do usuário. Identificamos **3 bloqueios críticos** que precisam de solução arquitetural:

### 🚨 Bloqueio Crítico 1: O comando `npx shadcn` falhará (Erro 404 no Registry)
- O comando fornecido pelo usuário:
  ```bash
  npx shadcn@latest add https://raw.githubusercontent.com/Ashutoshx7/VengeanceUI/main/public/r/why-us-bento.json
  ```
  **Fato Técnico:** O arquivo `why-us-bento.json` **não existe** na pasta `public/r/` do repositório oficial do VengeanceUI (retorna erro HTTP 404). O autor da biblioteca criou o componente no código fonte (`src/components/ui/why-us-bento.tsx`), mas não o exportou para o bundle do registry.
- Já o `typing-keyboard.json` existe em `public/r/typing-keyboard.json`.
- **Solução de Engenharia:** Não dependeremos do CLI do shadcn que quebraria a execução. Faremos a **portabilidade direta e limpa do código-fonte TypeScript** de ambos os componentes, adaptando-os para a estrutura do projeto.

---

### 🚨 Bloqueio Crítico 2: Dependências Incompatíveis e Ausentes
1. **Biblioteca de Ícones (`@phosphor-icons/react`):**
   - O `why-us-bento` original depende de `@phosphor-icons/react`.
   - O projeto do portfólio já utiliza **`lucide-react` (v1.21.0)**.
   - **Decisão:** Não inflaremos o `package.json` com outra biblioteca pesada de ícones. Faremos o mapeamento 1:1 para ícones equivalentes do `lucide-react` (`Headphones`, `Compass`/`FileCode`, `Hammer`/`Cpu`, `Globe`, `Rocket`, `ChevronRight`).
2. **React 19 & Tailwind CSS v4:**
   - O código original do VengeanceUI possui classes e interpolações de sombra legadas (`shadow-[0_0_0_2px_rgba(...)]`, estilos inline de `color-mix`).
   - Vamos refinar tudo para os padrões modernos do Tailwind v4 e React 19 já consolidados no projeto.

---

### 🚨 Bloqueio Crítico 3: Problema Ergonômico do Layout "Bento à Esquerda (50%) + Teclado 3D à Direita (50%)"
Esta é a questão mais crítica em termos de UX e Design:
- O **Why Us Bento Grid** é originalmente um grid de **3 colunas** com 5 blocos densos de informação:
  - Card 01 (Span 2): Automações com texto e ilustração isométrica.
  - Card 02 (Span 1, Row 2): De Ideia à Produção com pilha de 4 cartas inclinadas.
  - Card 03 (Span 1): Engenharia sênior e avatar stack animado.
  - Card 04 (Span 1): Pipeline de 5 etapas com setas e badges.
  - Card 05 (Span 3): Engenharia profunda com ilustrações isométricas grandes.
- **O problema da divisão 50/50 em tela cheia:**
  - Se colocarmos o Bento Grid espremido em metade da tela (ex: ~600px em um monitor de 1366px ou 1440px), um grid de 3 colunas ficará **completamente ilegível e esmagado**. Os textos sofrerão quebras grotescas, os SVGs colidirão com os títulos e a experiência ficará amadora.
  - Por outro lado, o **TypingKeyboard** tem uma base isométrica volumosa (requer ~500px de largura e perspectiva 3D profunda de `rotateX(60deg) rotateZ(-35deg)` com uma tela terminal flutuante elevada a `translateZ(150px)`).
- **Solução Arquitetural de Layout Proposta:**
  - Em telas Desktop Grandes (`xl` / `>= 1280px`):
    - **Layout Asimétrico 65% / 35%**: O Bento Grid recebe 65% do container para manter suas 3 colunas arejadas e legíveis. O lado direito (35%) atua como uma **"Torre de Controle / Terminal Interativo"**, onde o `TypingKeyboard` fica posicionado em perspectiva otimizada (com `scale(0.7 - 0.85)` perfeitamente contido e centralizado).
  - Em telas Médias e Laptops (`md` / `lg` - `768px a 1279px`):
    - O Bento Grid reorganiza-se em 2 colunas fluidas e o Teclado 3D posiciona-se de forma elegante acima ou abaixo como peça central de destaque interativo.
  - Em Mobile (`< 768px`):
    - Empilhamento vertical total. O Teclado 3D recebe ajuste de escala (`scale(0.55 - 0.6)`) com container de overflow controlado, evitando scroll horizontal quebrado na tela do celular.

---

### 🚨 Bloqueio Crítico 4: Violação do "Purple Ban" do Projeto
- O `typing-keyboard.tsx` original utiliza por padrão:
  - `accentColor = "#3b82f6"`
  - `secondaryAccent = "#a855f7"` (Roxo / Violeta)
- **Regra Absoluta do GEMINI.md / Frontend Specialist:** "NEVER use purple, violet, indigo or magenta as a primary/brand color unless EXPLICITLY requested."
- **Ajuste Mandatório:**
  - Substituiremos o roxo pelas cores da identidade do Lucas:
    - `accentColor = "#5DADE2"` (Ciano / Ice Blue característico do Antigravity & portfólio)
    - `secondaryAccent = "#3ECF8E"` (Verde Supabase / Emerald) ou `#FFFFFF` (Monocromático cirúrgico)

---

## 2. 🎨 Compromisso de Design (Design Commitment)

```markdown
🎨 DESIGN COMMITMENT: CYBER-MECHANICAL COCKPIT & SERVICES BENTO

- **Topological Choice:** Rompemos a divisão simétrica ingênua (50/50) que destruiria a legibilidade do Bento. Aplicamos uma topologia assimétrica 65/35: uma "Matrix de Serviços" modular à esquerda equilibrada por um "Terminal Isométrico Vivo" à direita.
- **Risk Factor:** Renderização 3D contínua no DOM com CSS 3D (`transform-style: preserve-3d`) ao lado de um grid interativo com animações stagger por caractere no hover.
- **Readability Conflict:** Ajuste preciso do espaçamento dos cartões do bento para que a densidade de informações não dispute atenção com a digitação contínua do teclado mecânico.
- **Cliché Liquidation:**
  - ❌ Sem gradientes roxos neon genéricos (Purple Ban respeitado).
  - ❌ Sem avatares genéricos de anime desconectados de um desenvolvedor profissional.
  - ❌ Sem templates sem alma: cópias e microinterações focadas em valor de negócio real (automação, ROI, performance).
```

---

## 3. ✍️ Reescrita e Adaptação dos Textos para o Universo de Lucas Tomaz

Adaptamos os 5 blocos do Bento para representar as capacidades reais de Lucas Tomaz:

| Card | Título Original | Título em Português (Lucas Tomaz) | Descrição Adaptada | Visual / Animação |
| :--- | :--- | :--- | :--- | :--- |
| **01** (Wide) | *AI & Automation* | **Automação & Agentes IA** | *"Construção de fluxos inteligentes, scripts e integrações que eliminam tarefas repetitivas, conectando APIs, bancos de dados e sistemas para acelerar processos de ponta a ponta."* | Título com efeito Stagger Reveal em vermelho/ciano no hover + SVG Isométrico Tech. |
| **02** (Tall) | *From Idea to Production* | **Do Briefing ao Deploy** | *"Alinhamento estratégico rigoroso antes da primeira linha de código. Mapeamos arquitetura, requisitos e entregamos soluções prontas para produção sem ruído de comunicação."* | Pilha de cartões em cascata 3D com a frase: `Briefing.` `Arquitetura.` `Produção.` `> PRONTO PARA ESCALAR_` |
| **03** (Box) | *Built by Experienced Engineers* | **Desenvolvimento Direto** | *"Sem intermediários ou gerentes de telefone sem-fio. Você trata diretamente com quem arquiteta, programa e publica a sua aplicação."* | Badge do Lucas com Avatar oficial (`/avatar.png`), status de disponibilidade e stack tags. |
| **04** (Box) | *No Handoffs* | **Esteira de Entrega Ágil** | *"Processo fluido em 5 fases contínuas: Briefing → Planejamento → Construção → Validação → Lançamento Oficial."* | Pipeline interativo com ícones Lucide: `Headphones` (Briefing) → `Compass` (Plano) → `Cpu` (Build) → `CheckCircle2` (Validação) → `Rocket` (Deploy). |
| **05** (Wide) | *Deep Engineering* | **Aplicações Web Modernas** | *"Engenharia full-stack de alto padrão: Next.js, React, Node.js e bancos SQL. Interfaces rápidas, reativas, focadas em conversão, SEO técnico e experiência do usuário."* | Ilustração isométrica vetorial de camadas de software com profundidade de perspectiva. |

---

## 4. ⌨️ Especificação do Terminal 3D (`TypingKeyboard`)

- **Texto em Digitação Automática:**
  > `"Faço soluções úteis para automatizar processos e escalar produtos web.        "`
  *(Loop suave: digita caractere a caractere, teclas 3D afundam fisicamente em sincronia com o pressionamento, pausa de 2s e reinicia com animação de cursor)*
- **Cores & Efeitos Visuais:**
  - Base do teclado: Alumínio espacial / grafite fosco (`#18181b` e `#27272a`).
  - Teclas normais: Acabamento em resina dark com backlight discreto.
  - Teclas especiais (Modifiers / Space / Enter): Acentos em Ciano Elétrico (`#5DADE2`) e Esmeralda (`#3ECF8E`).
  - Tela Terminal flutuante: Display OLED curvo ou plano com glow suave em `#5DADE2`, scanlines sutis e animação de digitação em tempo real.
- **Interatividade Extra:**
  - O usuário pode passar o mouse ou até clicar nas teclas para sentir o relevo háptico visual (classe `.tk-key--down`).

---

## 5. 🧱 Arquitetura de Componentes e Estrutura de Pastas

```
src/
├── components/
│   ├── Services.tsx                      # Componente mestre da Seção (substitui Certificates.tsx)
│   ├── Header.tsx                        # Atualização do link #servicos
│   └── ui/
│       ├── WhyUsBento.tsx                # Bento Grid completo portado em React 19 + Lucide
│       ├── TypingKeyboard.tsx            # Teclado 3D Isométrico com terminal de texto
│       └── svgs/
│           ├── IsometricBox01.tsx        # Ilustração isométrica 01 (Tech Box)
│           └── IsometricBoxes02.tsx      # Ilustração isométrica 02 (Layered Boxes)
```

---

## 6. 🚀 Roteiro de Implementação em Fases

### Fase 1: Criação dos Componentes Base (UI & SVGs)
1. Criar os componentes vetoriais em `src/components/ui/svgs/IsometricBox01.tsx` e `IsometricBoxes02.tsx`.
2. Portar `TypingKeyboard.tsx` em `src/components/ui/TypingKeyboard.tsx`:
   - Configurar o texto customizado de digitação do Lucas.
   - Ajustar a paleta (eliminar `#a855f7` e usar `#5DADE2` / `#3ECF8E`).
   - Otimizar o estilo CSS encapsulado e isolar a perspectiva 3D para evitar layout shifts.
3. Portar e customizar `WhyUsBento.tsx` em `src/components/ui/WhyUsBento.tsx`:
   - Substituir `@phosphor-icons/react` por `lucide-react`.
   - Inserir os textos em português sobre automações, briefing, web apps e esteira.
   - Ajustar o Card 03 para refletir o Lucas Tomaz (`avatar.png` e tags profissionais).

### Fase 2: Construção da Seção Mestre `Services.tsx`
1. Criar `src/components/Services.tsx`:
   - Cabeçalho padronizado da seção usando o `StaggerText` existente (`"O que eu faço"` / `"Serviços & Soluções Sob Medida"`).
   - Container responsivo com layout inteligente:
     - Telas `xl`: Bento Grid (60-65%) + 3D Keyboard (35-40%).
     - Telas `< xl`: Teclado destacado em topo/card acompanhado do Bento Grid fluido.
   - Atribuir `id="servicos"` na tag `<section>`.

### Fase 3: Integração & Navegação
1. Atualizar `src/app/page.tsx`:
   - Substituir a importação de `Certificates` por `Services`.
   - Renderizar `<Services />` no fluxo principal da página.
2. Atualizar `src/components/Header.tsx`:
   - Trocar o item do menu: `{ id: "servicos", label: "Serviços" }`.

### Fase 4: Validação, Lint & Responsividade
1. Executar verificação de tipos e linter (`npm run lint`).
2. Testar comportamento visual no servidor de desenvolvimento ativo (`localhost:3000`).
3. Validar se não há transbordamento horizontal (horizontal scroll) em resoluções mobile (`360px`, `390px`, `414px`) e desktop (`1080p`, `1440p`).

---

## 7. 🎯 Critérios de Aceite

- [ ] A seção "Certificados" foi substituída com sucesso por "Serviços" (`#servicos`).
- [ ] O menu do `Header` direciona corretamente para a nova seção via smooth scroll.
- [ ] Os 5 cards do Bento Grid estão em português fluente e contextualizados com automações, desenvolvimento web, briefing e engenharia de software do Lucas.
- [ ] O componente `TypingKeyboard` está ativo, digitando o texto do Lucas com efeito de teclas físicas afundando e tela com glow temático.
- [ ] Nenhuma tonalidade de roxo/violeta no teclado (Purple Ban 100% cumprido).
- [ ] O layout não quebra em dispositivos móveis nem espreme as cartas ilegivelmente em desktop.
- [ ] Zero dependências externas quebradas (zero Phosphor Icons instalados; tudo via `lucide-react` nativo).
- [ ] Zero erros de compilação no Next.js 16 e React 19.
