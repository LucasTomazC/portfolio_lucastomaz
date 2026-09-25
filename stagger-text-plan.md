# Plano de Implementação: Texto com Efeito Stagger (VengeanceUI)

**Status:** Aprovado / Pronto para Execução  
**Data:** 25 de Setembro de 2026  
**Responsáveis:** `@[project-planner]` & `@[frontend-specialist]`  
**Componente Base:** VengeanceUI `stagger-text` (`https://raw.githubusercontent.com/Ashutoshx7/VengeanceUI/main/public/r/stagger-text.json`)  
**Arquivo Alvo Principal:** [`src/components/ui/StaggerText.tsx`](file:///c:/Users/Corpvs/Documents/lucas-tomaz-portfolio/portfolio_lucastomaz/src/components/ui/StaggerText.tsx)

---

## 1. Decisões Estratégicas Confirmadas

1. **Escopo de Aplicação:**  
   * **Foco em Títulos & Subtítulos:** Hero, Stacks, Projetos, Certificados e Rodapé.  
   * Preserva parágrafos longos estáticos para garantir leitura rápida e sem fricção.
2. **Granularidade Híbrida:**  
   * **Por Letra (`divideBy="letter"`):** Título principal do Hero (`JOÃO LUCAS`) para máximo impacto visual cinematográfico na abertura.  
   * **Por Palavra (`divideBy="word"`):** Todos os demais títulos e subtítulos de seções (entrada fluida e ágil).
3. **Acessibilidade & Edge Cases:**  
   * Tag `aria-label` contendo a frase completa para que leitores de tela não soletrem pedaço por pedaço.  
   * Integração total com `AnimationContext` (`animationsEnabled` / `prefers-reduced-motion`).  
   * Preservação correta de quebra de linhas responsivas com espaçamento `\u00A0` e suporte à prop `as` (`h1`, `h2`, `h3`, `p`, `span`).

### O Efeito Visual:
- Cada palavra (ou letra) fica envolvida em um contêiner com corte de máscara (`overflow-hidden`).
- O texto sobe de `translateY(110%)` para `translateY(0%)` com curva `cubic-bezier(0.22, 1, 0.36, 1)`.
- Aplicação de `staggerChildren` sequencial com delay configurável.
- Acionamento automático e suave quando a seção entra no campo de visão da tela (`whileInView`, `viewport: { once: true }`).

---

## 2. Análise Técnica do Componente Base (VengeanceUI)

O schema do VengeanceUI define a seguinte estrutura:

```typescript
const EASE = [0.22, 1, 0.36, 1] as const;

const container = (stagger: number, delay: number) => ({
  hidden: {},
  show: {
    transition: {
      staggerChildren: stagger,
      delayChildren: delay,
    },
  },
});

const item = {
  hidden: { y: "110%" },
  show: {
    y: "0%",
    transition: { duration: 0.6, ease: EASE },
  },
};
```

### Oportunidades de Evolução e Refinamento para o Nosso Portfólio:
1. **Integração com `AnimationContext`:**
   - Respeitar a preferência do usuário e a flag `animationsEnabled` (`prefers-reduced-motion`). Se desativado, o texto renderiza de forma estática instantânea, sem atraso de leitura.
2. **Polimorfismo Semântico (`as` prop):**
   - Permitir renderizar como `h1`, `h2`, `h3`, `p`, ou `span` preservando a hierarquia semântica e SEO do Next.js.
3. **Suporte a `className` customizado:**
   - Aplicar classes de tipografia do Tailwind (`font-display`, gradientes de cor, tamanhos responsivos).
4. **Controle de Visualização (`once`, `margin`, `threshold`):**
   - Evitar reanimações desnecessárias que possam cansar o usuário ao rolar a página para cima e para baixo.

---

## 3. Mapeamento dos Textos do Portfólio

| Seção | Elemento | Texto Alvo | Granularidade Recomendada |
| :--- | :--- | :--- | :---: |
| **Hero** | Badge de Status | `DISPONÍVEL PARA NOVOS PROJETOS` | `word` |
| **Hero** | Título Principal | `JOÃO LUCAS` | `letter` (impacto cinematográfico) |
| **Hero** | Subtítulo / Cargo | `DESENVOLVEDOR WEB FULL-STACK` | `word` |
| **Hero** | Descrição Breve | Parágrafo de introdução institucional | `word` (delay 0.3s) |
| **Stacks** | Eyebrow | `// TECH STACK` | `letter` |
| **Stacks** | Título da Seção | `HABILIDADE & TECNOLOGIAS` | `word` |
| **Stacks** | Card Ativo | Nome da ferramenta em foco | `word` / fade dinâmico |
| **Projects** | Eyebrow & Título | `PROJETOS SELECIONADOS` | `word` |
| **Certificates** | Título | `CERTIFICAÇÕES & FORMAÇÃO` | `word` |
| **Footer** | Chamada Final | `VAMOS CONSTRUIR ALGO EXTRAORDINÁRIO?` | `word` |

---

## 4. Fases de Execução

### Fase 1: Criação do Componente Otimizado [`src/components/ui/StaggerText.tsx`](file:///c:/Users/Corpvs/Documents/lucas-tomaz-portfolio/portfolio_lucastomaz/src/components/ui/StaggerText.tsx)
- Portabilidade do código fonte do VengeanceUI.
- Inclusão do hook `useAnimation()` para desabilitar animações quando `animationsEnabled === false`.
- Suporte a tags semânticas (`as="h1" | "h2" | "p" | "span"`).
- Otimização para não quebrar pontuações ou espaços não-separáveis (`\u00A0`).

### Fase 2: Aplicação na Seção Hero ([`src/components/Hero.tsx`](file:///c:/Users/Corpvs/Documents/lucas-tomaz-portfolio/portfolio_lucastomaz/src/components/Hero.tsx))
- Animação do nome e cargo na primeira carga da página.
- Configuração de delay escalonado para criar uma entrada harmônica (Badge -> Nome -> Cargo -> Descrição).

### Fase 3: Aplicação nos Títulos das Seções (Stacks, Projects, Certificates, Footer)
- Substituição dos títulos estáticos pelo `<StaggerText>`.
- Acionamento via `whileInView` com viewport trigger configurado em `-10%` para iniciar assim que o usuário rolar próximo à seção.

### Fase 4: Validação, Acessibilidade e Performance
- Verificação de layout shift (CLS zero).
- Teste com leitor de tela (garantir que `aria-label` ou o texto puro não seja fragmentado de forma inacessível).
- Teste de redução de movimento (`Motion: OFF`).
- Execução de `npm run lint` e checagem de tipos TypeScript.

---

## 5. Critérios de Aceite

1. [x] Componente `StaggerText` criado sem dependências extras além de `framer-motion` (já instalada).
2. [x] Suporte a divisão por palavra (`divideBy="word"`) e letra (`divideBy="letter"`).
3. [x] Total integração com `AnimationContext` (`prefers-reduced-motion`).
4. [x] Sem impacto negativo no SEO (marcação HTML semântica preservada e `aria-label`).
5. [x] Passar no linter com 0 erros (`npm run lint`) e build de produção (`npm run build`).
