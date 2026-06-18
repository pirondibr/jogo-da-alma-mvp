# Soul HUD — Spec de Geração (v1)

## O que é

O Soul HUD é um relatório compacto e gamificado gerado **após** o sistema do Jogo da Alma rodar os 4 módulos (Espelho, Fórmula, Protocolo, Diagnóstico Externo) para um caso. Ele extrai o essencial do output e apresenta como um HUD de RPG — leve, visual, focado em ação.

**Não é um substituto do output completo.** É um complemento visual que a pessoa pode consultar rapidamente para lembrar onde está, o que está travado e o que fazer.

---

## Quando gerar

Sempre que o sistema completar a análise dos 4 módulos (ou pelo menos os módulos 1-3) para um caso. O Soul HUD é o último bloco da resposta — vem depois de todo o diagnóstico e prescrição.

---

## Estrutura do Soul HUD

O HUD tem 5 blocos, nesta ordem:

### Bloco 1 — Header

```
JOGO DA ALMA
Soul HUD
```

Simples. Identidade visual do sistema.

### Bloco 2 — Score de Consciência Geral

Um indicador geral de progresso. Mostra:

- **Percentual de consciência** (média dos XPs dos chakras ativos)
- **Quantidade de chakras ativos** no caso
- **Chakra foco** (o dominante identificado no Módulo 1)

**Como calcular o XP inicial de cada chakra:**

O XP representa o quanto a pessoa já tem de consciência sobre aquele chakra. Começa em 0% (totalmente inconsciente) e vai até 100% (padrão integrado). A estimativa é baseada no relato:

| Sinal no relato | XP estimado |
|---|---|
| Pessoa não percebe o padrão ("é assim que eu sou") | 10-20% |
| Pessoa percebe mas não entende ("sei que faço, não sei por quê") | 25-40% |
| Pessoa entende mas não consegue mudar ("entendo, mas não paro") | 45-60% |
| Pessoa já está trabalhando ativamente na mudança | 65-80% |
| Padrão já integrado na maioria das situações | 85-100% |

No caso exemplo: o rapaz percebe alguns padrões ("não sei se o problema sou eu") mas não entende a mecânica = faixa de 25-35%.

### Bloco 3 — Lembrete da Mente Nova

Uma frase curta extraída do Módulo 3 (Protocolo de Reprogramação), Etapa 2 — Lembrar, Parte 2. É a frase que ativa a Mente Nova. Deve ser a frase mais impactante e acionável do protocolo.

Formato: frase em itálico, entre aspas.

### Bloco 4 — Cards de Chakra (o coração do HUD)

Um card para **cada chakra ativo** identificado no Módulo 1. Ordenados por importância: Dominante → Secundário → Terciário.

Cada card contém:

#### 4.1 — Header do card

| Campo | Fonte | Exemplo |
|---|---|---|
| **Emoji** | Fixo por chakra (ver tabela abaixo) | ☀️ |
| **Nome** | Nome do chakra | Plexo Solar |
| **Estado** | Bloqueado, Excessivo ou Misto (do Módulo 1) | Bloqueado |
| **Papel** | ★ Principal, Secundário ou Apoio | ★ Principal |
| **Barra de XP** | Percentual estimado (ver tabela acima) | 25% |

**Emojis fixos por chakra:**

| Chakra | Emoji | Cor principal |
|---|---|---|
| Básico (Raiz) | 🔴 | #EF4444 |
| Sacral | 🟠 | #F97316 |
| Plexo Solar | ☀️ | #F59E0B |
| Cardíaco | 💚 | #10B981 |
| Laríngeo | 🔵 | #3B82F6 |
| Frontal (3º Olho) | 👁️ | #8B5CF6 |
| Coronário | 👑 | #A855F7 |

#### 4.2 — Tema do chakra

Uma linha curta com o tema. Ex: "Poder & Identidade", "Percepção & Clareza".

#### 4.3 — Duas colunas: Travado agora × Para desbloquear

Esta é a parte central. Duas colunas lado a lado:

**Coluna esquerda — 🔴 Travado agora**

Lista de 3-5 itens curtos que representam o que está negativo nesse chakra **para esse caso específico**. São extraídos do output dos Módulos 1 e 2. Cada item é um resumo de uma variável negativa identificada.

Regras para extrair:
- Priorize o que é mais relevante e reconhecível para a pessoa
- Misture tipos: pensamentos, emoções e ações (não precisa categorizar)
- Use a linguagem da pessoa quando possível, não a linguagem técnica dos documentos
- Se o pensamento é uma frase da pessoa, coloque entre aspas
- Máximo 5 itens, ideal 3-4
- Cada item em 1 linha curta (máximo ~8 palavras)

**Coluna direita — 🟢 Para desbloquear**

Lista de 3-5 itens curtos que representam as capacidades, ferramentas ou pensamentos positivos que a pessoa precisa desenvolver. Extraídos do Módulo 2 (Passo 5 — Versão Atualizada) e dos bancos de dados de variáveis positivas dos chakras.

Regras para extrair:
- Priorize Capacidades e Ferramentas (são mais acionáveis)
- Inclua pelo menos 1 pensamento positivo entre aspas
- Formato: "Nome da capacidade — descrição curta" ou frase entre aspas
- Máximo 5 itens, ideal 3-4
- Cada item em 1 linha curta

**Exemplo:**

```
🔴 TRAVADO AGORA                    🟢 PARA DESBLOQUEAR
─────────────────                    ─────────────────
"Não sou bom o suficiente"           Autoconfiança — crença na
                                     própria competência
Paralisa ao ver vagas                
                                     Resiliência — se recuperar
Aceita o "vamos ver" sem             de fracassos
reagir                               
                                     Assertividade — comunicar
Confunde lacuna de skill             posição com firmeza
com identidade                       
                                     "Meu valor não depende do
                                     que sei hoje"
```

#### 4.4 — Missão Ativa

Uma ação concreta, prática e realizável que a pessoa pode fazer **esta semana**. Extraída do Módulo 3 (Etapa 3 — Praticar) ou criada com base na prescrição positiva.

Regras:
- Deve ser específica, não genérica ("abrir uma vaga e listar..." vs "trabalhe sua autoconfiança")
- Deve ser realizável em 1 ação (não um plano de 30 dias)
- Deve atacar diretamente o padrão travado principal desse chakra
- Começa com verbo no infinitivo
- Formato: frase de 1-2 linhas

**Exemplo:**

```
🎯 MISSÃO ATIVA
Abrir uma vaga e listar o que já tem vs. o que falta — sem fechar a aba.
```

### Bloco 5 — Footer

```
Jogo da Alma 2.0 · Soul HUD
```

---

## Como extrair os dados do output dos 4 módulos

### Passo 1 — Identificar chakras ativos

Do Módulo 1 (O Espelho), extraia:
- Quais chakras foram mencionados
- O estado de cada um (Bloqueado / Excessivo / Misto)
- Qual é o dominante e quais são secundários

### Passo 2 — Extrair "Travado agora"

Para cada chakra, reúna do output:
- **Módulo 1:** Os pensamentos, emoções e ações negativas identificadas
- **Módulo 2:** A descrição do padrão e da estratégia desatualizada

Resuma cada variável em 1 frase curta. Priorize o que a pessoa vai se reconhecer mais.

### Passo 3 — Extrair "Para desbloquear"

Para cada chakra, reúna do output:
- **Módulo 2, Passo 5:** As variáveis positivas prescritas como "versão atualizada"
- **Bancos de dados dos chakras:** As Capacidades e Ferramentas positivas correspondentes

Selecione 3-5 mais relevantes para o caso.

### Passo 4 — Extrair Missão Ativa

Do Módulo 3 (Etapa 3 — Praticar), extraia a ação concreta prescrita para aquele chakra. Se o módulo prescreveu uma ação para o caso geral, adapte para cada chakra individualmente.

Se não houver ação específica no Módulo 3 para um chakra secundário, crie uma baseada na prescrição positiva.

### Passo 5 — Extrair Lembrete

Do Módulo 3 (Etapa 2 — Lembrar), Parte 2, extraia a frase da Mente Nova. Use a mais impactante.

### Passo 6 — Estimar XP

Baseado nos sinais do relato da pessoa (ver tabela no Bloco 2), estime o XP de cada chakra.

---

## Regras gerais de tom e linguagem

1. **Curto.** Cada item é 1 linha. Sem parágrafos dentro do HUD.
2. **Humano.** Use a linguagem da pessoa, não jargão técnico. "Paralisa ao ver vagas" e não "Ação negativa bloqueada nº 8 do Plexo Solar".
3. **Sem julgamento.** O HUD mostra o mapa, não dá sermão. "Travado" não é "errado". "Para desbloquear" não é "você deveria".
4. **Gamificado mas não infantil.** XP, missões, desbloqueio — linguagem de jogo. Mas o conteúdo é sério e preciso.
5. **Acionável.** Cada missão deve ser algo que a pessoa pode fazer hoje/esta semana.

---

## Exemplo completo gerado (caso: analista de marketing)

```
═══════════════════════════════════════
           JOGO DA ALMA
            Soul HUD
═══════════════════════════════════════

┌─────────────────────────────────────┐
│  ◉ 33%  Consciência Geral          │
│  3 chakras ativos · Foco: Plexo    │
│  ████████░░░░░░░░░░░░░░░░░░ 33%    │
└─────────────────────────────────────┘

💡 LEMBRETE DA MENTE NOVA
"Não saber é temporário. Não agir é 
o que me mantém aqui."

───────────────────────────────────────

☀️ PLEXO SOLAR          ★ Principal
   Estado: Bloqueado
   XP: █████░░░░░░░░░░░░░░░ 25%
   Tema: Poder & Identidade

   🔴 TRAVADO AGORA         🟢 DESBLOQUEAR
   ─────────────────         ──────────────
   "Não sou bom o            Autoconfiança
   suficiente"               — crença na 
                              própria competência
   Paralisa ao ver           
   vagas                     Resiliência
                              — se recuperar 
   Aceita o "vamos ver"      de fracassos
   sem reagir                
                             Assertividade
   Confunde lacuna           — comunicar posição 
   com identidade            com firmeza
                             
                             "Meu valor não 
                             depende do que 
                             sei hoje"

   🎯 MISSÃO ATIVA
   Abrir uma vaga e listar o que já tem
   vs. o que falta — sem fechar a aba.

───────────────────────────────────────

👁️ FRONTAL              Secundário
   Estado: Excessivo
   XP: ███████░░░░░░░░░░░░░ 35%
   Tema: Percepção & Clareza

   🔴 TRAVADO AGORA         🟢 DESBLOQUEAR
   ─────────────────         ──────────────
   Comparação constante      Discernimento
   sem contexto              — separar fato 
                              de interpretação
   Loop de análise que       
   não vira ação             Lucidez
                              — ver sem distorção
   "Todo mundo tá            emocional
   ganhando mais"            
                             "Comparação sem 
                             contexto é 
                             distorção"

   🎯 MISSÃO ATIVA
   Quando vier a comparação, perguntar:
   "O que essa pessoa fez que eu posso
   aprender?"

───────────────────────────────────────

🔴 BÁSICO               Apoio
   Estado: Misto
   XP: ████████░░░░░░░░░░░░ 40%
   Tema: Segurança & Estabilidade

   🔴 TRAVADO AGORA         🟢 DESBLOQUEAR
   ─────────────────         ──────────────
   Medo de sair do           Adaptabilidade
   conhecido                 — ajustar-se a
                              mudanças
   Só avança com 100%       
   de certeza                Prudência
                              — avaliar riscos 
   Fica na zona de          sem paralisar
   conforto ruim             
                             "Segurança é saber
                             que me adapto"

   🎯 MISSÃO ATIVA
   Fazer uma coisa pequena fora da zona
   de conforto esta semana — sem esperar
   estar pronto.

═══════════════════════════════════════
         Jogo da Alma 2.0 · Soul HUD
═══════════════════════════════════════
```

---

## Referência rápida: de onde vem cada campo

| Campo do HUD | Fonte no output |
|---|---|
| Chakras ativos | Módulo 1 — diagnóstico |
| Estado (Bloqueado/Excessivo) | Módulo 1 — estado identificado |
| Papel (Principal/Secundário) | Módulo 1 — chakra dominante |
| XP | Estimativa baseada no relato |
| Travado agora | Módulos 1 e 2 — variáveis negativas |
| Para desbloquear | Módulo 2 Passo 5 + banco de dados dos chakras |
| Missão ativa | Módulo 3 Etapa 3 — ação concreta |
| Lembrete | Módulo 3 Etapa 2 — Parte 2 |

---

## Notas para a IA que vai gerar

1. **Sempre gere o Soul HUD como bloco final** após os 4 módulos. Não gere antes — depende do diagnóstico.
2. **Não invente variáveis.** Tudo deve sair do output dos módulos ou dos bancos de dados dos chakras.
3. **Mantenha compacto.** Se o output tem 5 chakras, o HUD tem 5 cards. Mas cada card continua tendo 3-5 itens por coluna, não mais.
4. **A missão é o item mais importante.** Se tiver que escolher entre um item "travado" a mais ou uma missão melhor, escolha a missão.
5. **O lembrete é único para todo o HUD.** Não crie um lembrete por chakra — use o mais forte do Módulo 3.
6. **O XP é uma estimativa, não uma ciência.** Erre para menos, não para mais. A pessoa prefere ver progresso subindo do que começar alto e sentir que não anda.
