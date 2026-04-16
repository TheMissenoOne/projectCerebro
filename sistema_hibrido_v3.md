# Sistema Híbrido de Ações, Tags, Condições e Efeitos
**Versão 2 — Revisado e Complementado**

---

## 1. Fundamento do Sistema

O sistema é estruturado em quatro camadas de resolução:

1. **Ações de Oposição**: há resistência ativa de outro objeto de jogo.
2. **Ações de Manifestação**: não há oposição direta, mas existe dificuldade de execução e de materialização do efeito.
3. **Ações Automáticas**: não exigem rolagem; servem para criar, reduzir ou remover efeitos e condições de forma simples.
4. **Reações**: ações automáticas executadas fora do turno do personagem, em resposta a um evento.

O sistema utiliza:
- **tags** como base de execução;
- **APs** como unidade de escala;
- **RAPs** como resultado mecânico;
- **condições** como estados anexados a objetos do jogo;
- **efeitos** como entidades independentes.

---

## 2. Terminologia

### 2.1 Grau das Tags

O grau total de uma ação é o somatório dos graus de todas as tags utilizadas nela.

> **Exemplo**: usar uma tag de grau 3 e uma de grau 2 resulta em grau total 5.

### 2.2 Objeto de Jogo

Qualquer entidade ou elemento relevante em mesa:
- personagem
- aliado
- inimigo
- construto
- estrutura
- área
- ambiente

### 2.3 Condição

Estado anexado a um objeto de jogo que impacta diretamente um ou mais atributos do alvo. Condições são sempre vinculadas a um objeto.

### 2.4 Efeito

Entidade com existência independente, capaz de afetar um ou mais objetos de jogo. Efeitos não pertencem a nenhum objeto específico — eles existem no espaço da cena.

### 2.5 Cena

Unidade narrativa de tempo que corresponde a um evento dramático contínuo: um combate, uma negociação, uma fuga. A cena termina quando o contexto dramático se resolve ou muda fundamentalmente. Para fins de duração, uma cena equivale a aproximadamente **8 APs de tempo** (15 minutos narrativos).

### 2.6 Turno

Unidade de resolução dentro de uma cena estruturada. Tags consumidas em um turno ficam indisponíveis até o início do próximo turno do mesmo personagem.

---

## 3. Tipos de Ação

### 3.1 Ações de Oposição

São ações em que existe resistência ativa de outro objeto de jogo ou força contrária.

- Usam **AV/EV** do agente.
- Usam **OV/RV** da oposição.
- Seguem a resolução normal por RAPs.
- São apropriadas para ataques, bloqueios, disputas, resistências e confrontos diretos.
- Geram primariamente **condições** no alvo.

### 3.2 Ações de Manifestação

São ações sem oposição direta, nas quais o desafio está na execução, na complexidade e na materialização do resultado.

- Iniciam em **OV/RV 1**.
- Recebem modificadores conforme a natureza da ação (ver Seção 10).
- São apropriadas para criar efeitos independentes, aplicar estados sem resistência ativa e produzir alterações relevantes no jogo.
- Geram primariamente **efeitos**.
- Podem também gerar **condições** em alvos que não oferecem resistência ativa.

### 3.3 Ações Automáticas

São ações sem rolagem.

- Podem criar novos efeitos ou condições.
- Podem reduzir efeitos ou condições existentes.
- **Não podem** aumentar o grau de um efeito ou condição já existente.
- Devem respeitar a trivialidade da ação no contexto ficcional.
- Tags usadas em ações automáticas ficam indisponíveis até o próximo turno.

### 3.4 Reações

São ações automáticas executadas fora do turno do personagem, em resposta direta a um evento.

- Seguem todas as regras de ações automáticas.
- Consomem tags normalmente — essas tags ficam indisponíveis até o próximo turno do personagem.
- Podem ser usadas para interromper, reduzir ou anular efeitos e condições antes que se estabeleçam.
- O grupo deve definir na calibração de mesa se reações são permitidas livremente ou com limitação por cena.

> **Atenção**: uma reação não pode ser usada para criar uma condição ou efeito novo de forma ofensiva — apenas para responder a algo que está acontecendo.

---

## 4. Sistema de Resolução

### 4.1 Ações de Oposição

A resolução segue a lógica:

- **AV/EV** = atributo base + grau total das tags utilizadas + bônus de condições favoráveis
- **OV/RV** = atributo de resistência do alvo + modificadores situacionais + condições desfavoráveis ao agente

O resultado gera **RAPs**. RAPs positivos indicam sucesso; RAPs negativos ou zero indicam falha.

### 4.2 Ações de Manifestação

A resolução segue a lógica:

- **AV/EV** = atributo base + grau total das tags utilizadas
- **OV/RV final** = 1 + modificadores da ação + modificadores de posicionamento + modificadores circunstanciais

Se a ação falhar (RAPs ≤ 0), o efeito não se estabelece ou apenas "pisca" sem se fixar.

### 4.3 Ações Automáticas e Reações

O valor do ajuste automático é igual ao **grau total das tags gastas**:

- 1 tag de grau 2 = 2 APs de ajuste
- 2 tags de grau 1 cada = 2 APs de ajuste
- 1 tag de grau 3 + 1 de grau 1 = 4 APs de ajuste

O ajuste pode criar, reduzir ou remover condições e efeitos cujo grau atual seja **igual ou menor** ao valor do ajuste.

---

## 5. Tags

### 5.1 Definição

Tags são descritores mecânicos vinculados a temas do personagem. Cada tag tem um **grau numérico** que representa sua potência.

### 5.2 Uso de Tags

Cada tag usada em uma ação é considerada **gasta** e não pode ser reutilizada até o próximo turno do personagem, independentemente do tipo de ação.

As tags podem ser usadas para:
- aumentar **AV/EV** em ações de oposição
- compor o **grau total** em manifestações e automáticas
- criar, reduzir ou remover estados em ações automáticas

### 5.3 Tags e AV/EV

Em qualquer ação que exija rolagem, o AV/EV é calculado como:

> **AV/EV = atributo base do personagem + grau total das tags utilizadas**

O jogador escolhe quais tags usa antes de rolar. Tags relevantes ao contexto ficcional podem ser usadas; tags sem relação narrativa não podem.

### 5.4 Limite de Uso

O sistema pode limitar o número de tags por ação conforme a estrutura da mesa, mas a regra central é:
- cada tag é consumida no uso
- nenhuma tag pode ser usada mais de uma vez no mesmo turno
- tags de diferentes temas podem ser combinadas na mesma ação, desde que haja justificativa narrativa

---

## 6. Condições

Condições são estados anexados a objetos de jogo e afetam diretamente um ou mais atributos do alvo.

### 6.1 Limiar de Condição

Toda condição possui um **limiar** definido pelo valor do atributo de resistência correspondente à sua natureza:

| Categoria | Atributo de Resistência |
|---|---|
| Dano físico / estrutural | Corpo |
| Dano mental / cognitivo | Mente |
| Dano emocional / espiritual | Espírito |

O **limiar** é o valor numérico em APs desse atributo no alvo.

> **Exemplo**: se o alvo tem Corpo 5, o limiar de condições físicas é 5. RAPs acima de 5 geram promoções.

### 6.2 Aplicação

Condições são normalmente geradas por **ações de oposição**, mas podem também ser criadas por manifestações (quando o alvo não oferece resistência ativa) ou por ações automáticas.

O **grau máximo** de uma condição criada em uma única ação é:

> **Grau máximo = EV + grau total das tags utilizadas**

RAPs acima desse limite não aumentam o grau da condição — eles podem ser convertidos em promoções.

### 6.3 Acúmulo de Condições

- Condições do **mesmo tipo** no mesmo alvo se **somam**: um Ferido-3 e um Ferido-4 resultam em Ferido-7.
- Condições de **tipos diferentes** coexistem e aplicam penalidades separadas.
- Quando o grau acumulado de uma condição excede o dobro do limiar do atributo, o alvo é **incapacitado** na categoria correspondente.

> **Exemplo**: limiar Corpo 5 → acumular 10 ou mais APs em condições físicas = incapacitado fisicamente.

### 6.4 Promoção por RAP

RAPs que excedem o **limiar do atributo** do alvo podem ser usados para adquirir promoções (ver Seção 9).

### 6.5 Duração

| Tipo | Duração |
|---|---|
| **Temporária** | dura um número de APs de tempo igual ao grau da condição |
| **Duradoura** | permanece até ser removida por uma ação apropriada |
| **Permanente** | altera a ficha do alvo de forma indefinida |

### 6.6 Modificadores de Duração na Criação

Ao criar uma condição com duração além do padrão temporário, aplica-se ao OV/RV da ação:

| Duração desejada | Modificador |
|---|---:|
| Temporária | +0 |
| Duradoura | +1 coluna |
| Permanente | +3 colunas |

### 6.7 Remoção de Condições

| Método | Regra |
|---|---|
| Ação automática | remove ou reduz condições em APs igual ao grau das tags gastas |
| Ação de manifestação | pode remover condições; OV/RV = grau atual da condição + modificadores de duração |
| Tempo | condições temporárias expiram naturalmente |
| Recuperação narrativa | a mesa pode permitir redução por repouso, cuidado ou contexto ficcional |

---

## 7. Efeitos

Efeitos são entidades com existência independente e podem influenciar objetos de jogo, personagens ou o ambiente.

### 7.1 Limiar de Efeito

O limiar de um efeito é igual ao **grau total das tags usadas** para criá-lo.

> **Exemplo**: criar um efeito com tags de grau 2 e 3 → limiar do efeito = 5.

### 7.2 Aplicação

Efeitos são normalmente gerados por **ações de manifestação**. O grau do efeito é determinado pelos RAPs obtidos na ação.

### 7.3 Promoção por RAP

RAPs que excedem o **limiar do efeito** podem ser usados para adquirir promoções (ver Seção 9).

### 7.4 Duração

| Tipo | Duração |
|---|---|
| **Temporária** | dura um número de APs de tempo igual ao grau do efeito |
| **Duradoura** | permanece até ser removida por uma ação apropriada |
| **Permanente** | altera o estado do jogo de forma indefinida |

### 7.5 Modificadores de Duração na Criação

| Duração desejada | Modificador ao OV/RV |
|---|---:|
| Temporária | +0 |
| Duradoura | +1 coluna |
| Permanente | +3 colunas |

### 7.6 Remoção de Efeitos

| Método | Regra |
|---|---|
| Ação automática | remove ou reduz o efeito em APs igual ao grau das tags gastas |
| Ação de manifestação | OV/RV = grau atual do efeito + modificadores de duração |
| Ação de oposição | possível se o efeito tiver um "agente" que pode ser contrariado |

---

## 8. Limiar de Manifestação e Promoções de Escopo

O sistema usa o **limiar de manifestação** para determinar quando um efeito ou condição atinge qualidade superior.

### 8.1 Limiar Base de Manifestação

> **Limiar base: 6**

Quando o RAP de uma manifestação atinge ou ultrapassa 6, o efeito recebe uma **promoção de escopo** — uma melhoria qualitativa no alcance, amplitude, controle ou complexidade do efeito.

### 8.2 Progressão de Promoções de Escopo

Cada limiar atingido concede uma nova promoção:

| Promoção | Limiar de RAP |
|---|---:|
| 1ª promoção | 6 |
| 2ª promoção | 10 |
| 3ª promoção | 15 |
| 4ª promoção | 21 |

A progressão segue incrementos crescentes (+4, +5, +6…), representando que efeitos de escala superior são cada vez mais difíceis de alcançar.

### 8.3 Categorias de Promoção de Escopo

Cada promoção de escopo pode melhorar uma das seguintes dimensões do efeito:

- **duração** (de temporária para duradoura, de duradoura para permanente)
- **amplitude** (de 1 alvo para área, de área pequena para ampla)
- **alcance** (de toque para curto, de curto para médio, etc.)
- **controle** (de bruto para preciso)
- **complexidade** (de simples para duplo, etc.)
- **ocultação** (de visível para discreto, etc.)
- **comportamento** (adiciona efeito secundário, encadeamento, etc.)

### 8.4 Regra de Identidade

A promoção **não altera o grau numérico** base do efeito. Ela altera a qualidade e a forma como o efeito se manifesta no jogo.

---

## 9. Promoções por RAP Excedente

Além das promoções de escopo por limiar de manifestação, RAPs excedentes ao limiar (de condição ou de efeito) podem comprar **promoções de duração e qualidade**.

### 9.1 Custo de Promoção

| Nível | Custo em RAPs excedentes | Efeito |
|---|---:|---|
| Básico | 3 RAPs | melhoria menor na dimensão escolhida |
| Intermediário | 5 RAPs | melhoria moderada |
| Avançado | 7 RAPs | melhoria significativa |

### 9.2 Dimensões Disponíveis para Promoção por RAP

Cada compra melhora uma dimensão independente:
- amplitude
- alcance
- controle
- complexidade
- ocultação
- duração

Cada dimensão deve ser comprada separadamente. Não é possível concentrar todos os RAPs em uma única dimensão além do nível avançado.

### 9.3 Relação com Promoções de Escopo

As promoções de escopo (Seção 8) são concedidas automaticamente ao atingir os limiares. As promoções por RAP (esta seção) são opcionais e exigem gasto deliberado de RAPs excedentes. Ambas podem coexistir na mesma ação.

---

## 10. Modificadores de Ações de Manifestação

Ações de manifestação começam em OV/RV 1 e recebem modificadores conforme a estrutura do efeito. Todos os modificadores variam de **+0 a +3**.

### 10.1 Especificidade

| Grau | Mod | Descrição |
|---|---:|---|
| Muito específico | +0 | Aplicação única e restrita |
| Moderado | +1 | Aplicação limitada, mas útil |
| Amplo | +2 | Aplicação geral |
| Universal | +3 | Resolve múltiplas situações |

### 10.2 Amplitude

| Grau | Mod | Descrição |
|---|---:|---|
| 1 alvo | +0 | Um único alvo |
| 2–3 alvos | +1 | Pequeno grupo |
| Área pequena | +2 | Vários alvos próximos |
| Área ampla | +3 | Muitos alvos ou zona extensa |

### 10.3 Alcance

| Grau | Mod | Descrição |
|---|---:|---|
| Toque | +0 | Contato direto |
| Curto | +1 | Pequena distância |
| Médio | +2 | Distância relevante |
| Longo | +3 | Grande distância |

### 10.4 Controle

| Grau | Mod | Descrição |
|---|---:|---|
| Bruto | +0 | Sem precisão |
| Direcionado | +1 | Escolha básica de direção ou alvo |
| Preciso | +2 | Controle refinado |
| Total | +3 | Controle completo |

### 10.5 Complexidade

| Grau | Mod | Descrição |
|---|---:|---|
| Simples | +0 | Um único efeito |
| Duplo | +1 | Dois efeitos combinados |
| Múltiplo | +2 | Três ou mais efeitos |
| Composto | +3 | Interdependência entre efeitos |

### 10.6 Ocultação

| Grau | Mod | Descrição |
|---|---:|---|
| Visível | +0 | Evidente |
| Discreto | +1 | Pouco chamativo |
| Oculto | +2 | Difícil de perceber |
| Indetectável | +3 | Praticamente impossível de notar |

### 10.7 Condição

| Grau | Mod | Descrição |
|---|---:|---|
| Simples | +0 | Estado direto |
| Estruturada | +1 | Estado com regra adicional |
| Complexa | +2 | Estado com múltiplas dependências |
| Multifacetada | +3 | Estado de várias camadas |

### 10.8 Duração

| Grau | Mod | Descrição |
|---|---:|---|
| Instantâneo | +0 | Sem duração relevante |
| Curto | +1 | Duração breve (1–3 turnos) |
| Cena | +2 | Dura a cena atual |
| Persistente | +3 | Permanece até ser removido ativamente |

### 10.9 Chain Effect

| Grau | Mod | Descrição |
|---|---:|---|
| Nenhum | +0 | Não se propaga |
| Limitado | +1 | Propagação restrita (1 alvo adicional) |
| Encadeado | +2 | Propaga entre alvos em cadeia |
| Contínuo | +3 | Propagação livre ou recorrente |

### 10.10 Usável em Outros

| Grau | Mod | Descrição |
|---|---:|---|
| Apenas si | +0 | Autoaplicado |
| Pode afetar outro | +1 | Pode ser direcionado a outro alvo |
| Transferível | +2 | Aplicação livre em outros |
| Livre | +3 | Uso amplo em terceiros sem restrição |

---

## 11. Modificadores de Posicionamento

Condições espaciais alteram a dificuldade da ação. Aplicam-se ao OV/RV de manifestações (e opcionalmente ao OV de oposições, a critério da mesa).

| Condição | Modificador |
|---|---:|
| Terreno alto a favor | -1 |
| Terreno alto contra | +1 |
| Linha de visão limpa | -1 |
| Sem visão do alvo | +1 |
| Fora de visão total | +2 |
| Cobertura parcial | +1 |
| Cobertura total | +2 |
| Alvo exposto | -1 |
| Alvo parcialmente oculto | +1 |
| Alvo totalmente oculto | +2 |
| Flanqueado | -1 |
| Alvo de costas | -2 |
| Área apertada | +1 |
| Área aberta | -1 |
| Contato direto | -1 |
| Fora de alcance de toque | +1 |
| Usuário instável | +1 |
| Usuário estável | -1 |
| Alvo caído (corpo a corpo) | -1 |

---

## 12. Modificadores Circunstanciais

Fatores de cena e contexto também alteram a dificuldade.

| Condição | Modificador |
|---|---:|
| Pressão / caos | +1 |
| Ambiente favorável | -1 |
| Ambiente hostil | +1 |
| Alvo cooperativo | -1 |
| Alvo resistente passivo | +1 |
| Foco total | -1 |
| Distração | +1 |
| Repetição da ação (sem variação) | +1 |
| Familiaridade alta com o contexto | -1 |

---

## 13. Fórmula Geral de Manifestação

> **OV/RV = 1 + modificadores da ação + modificadores de posicionamento + modificadores circunstanciais**

Se o valor final for muito alto, a ação se torna mais difícil, mais rara e mais sujeita a falha. A mesa pode definir um teto razoável para o total de modificadores (recomendado: máximo +8 em modificadores de ação, sem teto nos demais).

---

## 14. Ações Automáticas

Ações automáticas são ações sem rolagem e servem apenas para ajuste direto do estado do jogo.

### 14.1 O que Podem Fazer

- criar novos efeitos com grau igual ao total de tags gastas
- criar novas condições com grau igual ao total de tags gastas
- reduzir efeitos existentes em APs igual ao total de tags gastas
- reduzir condições existentes em APs igual ao total de tags gastas
- remover efeitos ou condições se o valor aplicado for maior ou igual ao grau atual

### 14.2 O que Não Podem Fazer

- **aumentar** o grau de uma condição ou efeito já existente
- substituir uma ação de oposição em situações que exigem resistência ativa
- ignorar a trivialidade ficcional da situação
- ser usadas para criar efeitos ofensivos fora do próprio turno (isso é exclusivo de reações defensivas)

### 14.3 Regras de Uso

- cada tag usada em ação automática é gasta até o próximo turno
- ações automáticas podem ocorrer fora do turno, como **reação**, seguindo as regras da Seção 3.4
- ações automáticas não usam rolagem

---

## 15. Reações — Detalhamento

### 15.1 Quando Ocorrem

Reações ocorrem **imediatamente** em resposta a um evento declarado, antes que ele se resolva completamente ou após sua resolução parcial (a critério da mesa).

### 15.2 Custo

- consomem tags normalmente
- as tags consumidas ficam indisponíveis até o próximo turno do personagem

### 15.3 Limitações

- não podem ser usadas para criar condições ou efeitos ofensivos
- só podem **responder** a algo que está acontecendo
- não interrompem ações de oposição já em resolução — apenas mitigam seus efeitos após os RAPs serem calculados

### 15.4 Cadeia de Reações

Se dois personagens tentam reagir ao mesmo evento, a ordem é determinada pelo **valor de iniciativa** ou pelo acordo narrativo da mesa.

---

## 16. Duração — Consolidação

### 16.1 Temporária

- Dura **APs de tempo** igual ao grau da condição ou efeito.
- Referência: 0 AP = 4 segundos, 5 AP = 2 minutos, 8 AP = 15 minutos.

### 16.2 Duradoura

- Permanece até ser removida por ação apropriada.
- Aplicar duradoura custa **+1 coluna em OV/RV** na criação.

### 16.3 Permanente

- Altera a ficha ou o estado do alvo de forma indefinida.
- Aplicar permanente custa **+3 colunas em OV/RV** na criação.
- Raramente deve surgir de ações automáticas simples.

---

## 17. Reutilização de Tags

Tags usadas em qualquer ação — de oposição, manifestação, automática ou reação — ficam **indisponíveis** até o início do próximo turno do personagem.

Esta regra se aplica sem exceção. Não existe "tag que retorna no mesmo turno".

---

## 18. Tabelas de Referência de APs

As tabelas seguem progressão aproximadamente exponencial e servem como base para velocidade, peso, tempo, energia, alcance de efeitos e escala de fenômenos.

### 18.1 Tempo

| APs | Equivalência |
|---:|---|
| 0 | 4 segundos |
| 1 | 8 segundos |
| 2 | 15 segundos |
| 3 | 30 segundos |
| 4 | 1 minuto |
| 5 | 2 minutos |
| 6 | 4 minutos |
| 7 | 8 minutos |
| 8 | 15 minutos (≈ 1 cena) |
| 9 | 30 minutos |
| 10 | 1 hora |
| 12 | 4 horas |
| 15 | 1 dia |
| 18 | 1 semana |
| 20 | 1 mês |
| 24 | 1 ano |

### 18.2 Distância e Velocidade

| Faixa | Exemplos de Escala |
|---|---|
| APs 0–4 | metros, velocidade humana, corrida, salto |
| APs 5–9 | centenas de metros, veículos, velocidade de carro/aeronave lenta |
| APs 10–15 | quilômetros, aeronaves rápidas, mísseis |
| APs 16–22 | escala continental a orbital |
| APs 23+ | escalas planetária, estelar, cósmica |

### 18.3 Peso

| Faixa | Exemplos de Escala |
|---|---|
| APs 0–3 | objetos pequenos, crianças, animais leves |
| APs 4–6 | adultos, equipamentos pesados |
| APs 7–10 | veículos, estruturas leves |
| APs 11–15 | construções, navios, aeronaves grandes |
| APs 16–22 | estruturas geológicas, montanhas |
| APs 23+ | massas planetárias |

### 18.4 Energia

| Faixa | Exemplos de Escala |
|---|---|
| APs 0–4 | impactos físicos simples, ferimentos leves |
| APs 5–8 | explosões localizadas, colapso estrutural |
| APs 9–13 | devastação de quarteirão, crateras |
| APs 14–18 | destruição regional, tsunamis, vulcões |
| APs 19+ | devastação continental a planetária |

---

## 19. Exemplo de Resolução Completo

**Situação**: Jean Grey tenta criar um campo de força telepático para proteger aliados em uma zona de combate.

**Tipo de ação**: Manifestação (não há oposição direta)

**Tags usadas**: *Telepatia* grau 4 + *Escudo Psiônico* grau 3 → **grau total = 7**

**AV/EV**: atributo mental base 8 + grau das tags 7 = **15**

**Modificadores ao OV/RV**:
- Amplitude: área pequena (+2)
- Alcance: curto (+1)
- Duração: cena (+2)
- Controle: preciso (+2)
- Ocultação: visível (+0)
- Posicionamento: usuário estável (-1)
- Circunstancial: foco total (-1)

**OV/RV final**: 1 + 2 + 1 + 2 + 2 + 0 + (-1) + (-1) = **6**

**Resultado**: rola e obtém RAPs 9.
- Grau do efeito = 9
- Limiar do efeito = 7 (grau total das tags)
- RAPs excedentes = 9 − 7 = **2 RAPs excedentes**
- Limiar de manifestação: 9 ≥ 6 → **1ª promoção de escopo** (Jean escolhe estender para duradoura)
- 2 RAPs excedentes: não suficientes para promoção por RAP (mínimo 3)

**Resultado final**: campo de força psiônico de grau 9, cobrindo área pequena, com duração duradoura, precisamente controlado.

---

## 20. Princípios Gerais

- O grau das tags define a **escala básica** da ação e o limiar de promoção.
- Condições são aplicadas a objetos de jogo e somam-se entre si.
- Efeitos existem de forma independente na cena.
- Ações de oposição resolvem **conflito direto**.
- Ações de manifestação resolvem **criação de efeitos** sem oposição ativa.
- Ações automáticas resolvem **ajustes simples** sem rolagem.
- Reações são automáticas, executadas fora do turno, apenas em resposta.
- RAPs excedentes compram duração e promoções.
- Promoções de escopo modificam **qualidade**, não apenas quantidade.
- Tags gastas só retornam no próximo turno.
- A trivialidade ficcional sempre prevalece sobre a mecânica.

---

## 21. Resumo Operacional

| Passo | Ação |
|---:|---|
| 1 | Identifique o tipo de ação (oposição / manifestação / automática / reação) |
| 2 | Escolha as tags; some o grau total |
| 3 | Calcule AV/EV: atributo base + grau total das tags |
| 4 | Determine OV/RV: resistência do alvo (oposição) ou 1 + modificadores (manifestação) |
| 5 | Resolva pela tabela AV/OV ou EV/RV |
| 6 | Converta RAPs em grau de condição ou efeito |
| 7 | Verifique se RAPs excedem o limiar → aplique promoções |
| 8 | Verifique se RAPs ≥ 6 em manifestação → aplique promoção de escopo |
| 9 | Declare duração e gaste tags utilizadas até o próximo turno |

---

## 22. Objetos de Jogo — Regras de Criação e Uso

Esta seção define as regras gerais para criar, adquirir, usar e destruir **objetos de jogo**: equipamentos, armas, armaduras, gadgets, artefatos, veículos, construtos e qualquer item com relevância mecânica.

---

### 22.1 O que é um Objeto de Jogo

Um objeto de jogo é qualquer item físico ou construto que:
- concede **tags** ao portador ou usuário;
- possui **atributos próprios** (Estrutura, Potência, Complexidade);
- pode receber **condições** (dano, degradação, sobrecarga);
- pode ser destruído, roubado, modificado ou aprimorado.

Objetos de jogo são distintos de **efeitos** (que existem independentemente e não podem ser carregados) e de **condições** (que são estados, não entidades).

---

### 22.2 Anatomia de um Objeto de Jogo

Todo objeto de jogo é definido por três elementos:

#### 22.2.1 Tags do Objeto

Tags são as capacidades concretas que o objeto oferece ao usuário. Cada tag tem um grau e um descritor narrativo.

> **Exemplo**: uma espada vibranium pode ter as tags *Corte Penetrante* grau 3, *Inquebrável* grau 4.

Tags de objeto seguem as mesmas regras de uso que tags de personagem:
- são gastas quando usadas em uma ação;
- ficam indisponíveis até o próximo turno do usuário;
- podem ser combinadas com tags do próprio personagem na mesma ação.

#### 22.2.2 Atributos do Objeto

Todo objeto possui três atributos que definem sua escala:

| Atributo | Descrição |
|---|---|
| **Estrutura** | resistência física — quanto dano o objeto pode absorver antes de ser destruído |
| **Potência** | escala de efeito máximo que o objeto pode produzir |
| **Complexidade** | número de tags independentes que o objeto possui |

Cada atributo é expresso em **APs**, na mesma escala do restante do sistema.

#### 22.2.3 Limiar de Dano

O limiar de dano de um objeto é igual ao seu valor de **Estrutura**. Condições que excedem esse limiar degradam o objeto (ver Seção 22.7).

---

### 22.3 Grau e Qualidade dos Objetos

O grau geral de um objeto é determinado pela **soma dos graus de todas as suas tags**. Esse valor orienta a dificuldade de criação e o impacto narrativo do item.

| Grau Total do Objeto | Categoria | Exemplos |
|---:|---|---|
| 1–4 | **Comum** | faca, escudo improvisado, kit de primeiros socorros |
| 5–9 | **Profissional** | armadura tática, arma de fogo modificada, equipamento especializado |
| 10–15 | **Excepcional** | armadura experimental, gadget de alta tecnologia, artefato local |
| 16–22 | **Raro** | equipamento de nível mundial, relíquia de poder real |
| 23+ | **Lendário** | item de escala cósmica, construto de poder Ômega |

---

### 22.4 Criação de Objetos

Criar um objeto de jogo é uma **ação de manifestação** cujo OV/RV é determinado pelo grau total desejado do objeto.

#### 22.4.1 OV/RV Base de Criação

> **OV/RV base = grau total desejado do objeto**

Diferentemente da fórmula padrão de manifestação (que começa em 1), a criação de objetos parte diretamente do grau do objeto como piso mínimo.

#### 22.4.2 Modificadores de Criação

Os modificadores de criação são adicionados ao OV/RV base:

| Fator | Modificador |
|---|---:|
| Complexidade: 1 tag | +0 |
| Complexidade: 2–3 tags | +1 |
| Complexidade: 4–6 tags | +2 |
| Complexidade: 7+ tags | +3 |
| Material comum disponível | +0 |
| Material escasso ou especializado | +1 |
| Material raro ou exótico | +2 |
| Material único ou impossível | +3 |
| Ferramentas adequadas disponíveis | +0 |
| Ferramentas improvisadas | +1 |
| Sem ferramentas | +2 |
| Tempo adequado | +0 |
| Tempo reduzido (metade) | +1 |
| Tempo mínimo (cena) | +2 |
| Criação imediata (turno) | +3 |
| Objeto mundano (sem função de combate) | -1 |
| Objeto para uso único | -1 |
| Réplica de objeto existente (modelo disponível) | -1 |

#### 22.4.3 Tags Necessárias para Criação

O criador precisa possuir tags narrativamente relevantes ao processo de criação. Não é possível criar um objeto que exige conhecimento técnico sem possuir tags que representem esse conhecimento.

> **Exemplo**: criar um gadget eletrônico exige tags como *Engenharia* ou *Tecnopatia*. Criar uma poção exige *Alquimia* ou *Herbologia*. Forjar uma arma exige *Ferraria* ou *Habilidade Marcial* (em contextos onde o herói forja suas próprias armas).

As tags usadas na criação são **gastas** normalmente até o próximo turno — ou, em criações longas, até o fim do processo de criação.

#### 22.4.4 Tempo de Criação

O tempo padrão de criação é determinado pelo grau total do objeto:

| Grau Total | Tempo Base de Criação |
|---:|---|
| 1–4 | minutos (APs 4–7) |
| 5–9 | horas (APs 10–12) |
| 10–15 | dias (APs 15–17) |
| 16–22 | semanas a meses (APs 18–20) |
| 23+ | meses a anos (APs 20–24) |

Reduzir o tempo aplica os modificadores da tabela 22.4.2.

#### 22.4.5 Resultado da Criação

| RAPs obtidos | Resultado |
|---|---|
| RAPs < 0 | falha: objeto não é criado; materiais podem ser desperdiçados |
| RAPs = 0 | criação parcial: objeto existe, mas com uma tag ausente ou com Estrutura reduzida em 2 |
| RAPs 1–4 | sucesso padrão: objeto criado com grau total igual ao RAP |
| RAPs 5+ | sucesso ampliado: objeto criado; RAPs excedentes podem comprar +1 em uma tag ou +1 em Estrutura (1 RAP por melhoria) |

> **Nota**: o grau de cada tag individual não é determinado pelo criador de forma livre — é proporcional ao grau total do objeto e ao número de tags. Um objeto de grau 9 com 3 tags tem, em média, grau 3 por tag.

---

### 22.5 Aquisição Narrativa de Objetos

Nem todo objeto precisa ser criado mecanicamente. Objetos podem ser adquiridos por:

| Método | Regra |
|---|---|
| **Compra / troca** | sem mecânica, desde que narrativamente justificado |
| **Recompensa / presente** | GM define grau e tags; sem ação de criação |
| **Saque / pilhagem** | objeto tem grau proporcional ao inimigo derrotado |
| **Tema de Posses** | objetos definidos na ficha do personagem têm presença garantida |
| **Conjuração / manifestação** | objetos temporários criados por poder; seguem regras de efeito (Seção 7) |

Objetos adquiridos narrativamente não exigem rolagem, mas seguem todas as outras regras de uso, degradação e destruição.

---

### 22.6 Uso de Objetos em Ações

#### 22.6.1 Contribuição do Objeto ao AV/EV

Ao usar um objeto em uma ação, o usuário pode somar as tags relevantes do objeto ao seu AV/EV, da mesma forma que soma suas próprias tags:

> **AV/EV = atributo base + tags do personagem + tags do objeto**

Tags do objeto seguem as mesmas regras de consumo: gastas até o próximo turno.

#### 22.6.2 Restrições de Uso

- O usuário precisa **portar ou operar** o objeto ativamente.
- Objetos de alta Complexidade podem exigir tags de habilidade mínima para operar (a critério da mesa).
- Objetos danificados operam com penalidade (ver 22.7).
- Um mesmo objeto não pode ser usado por dois personagens no mesmo turno.

#### 22.6.3 Objetos como Alvo

Objetos podem ser alvo de ações de oposição. Quando atacado diretamente, o objeto usa sua **Estrutura** como RV.

---

### 22.7 Dano, Degradação e Destruição de Objetos

Objetos podem receber condições da mesma forma que personagens, mas sua categoria de resistência é sempre **Estrutura**.

#### 22.7.1 Condições de Objeto

| Grau da Condição | Penalidade ao Objeto |
|---|---|
| 1–3 | redução de -1 no grau de todas as tags do objeto |
| 4–6 | redução de -2 no grau de todas as tags; uma tag pode ser desativada |
| 7–9 | metade das tags desativadas; objeto opera com dificuldade |
| ≥ limiar de Estrutura | objeto **destruído**: todas as tags são perdidas |

#### 22.7.2 Destruição Parcial

Se uma condição exceder o limiar de Estrutura mas os RAPs ainda forem inferiores ao dobro da Estrutura, o objeto é **inutilizável mas reparável**.

Se os RAPs excederem o dobro da Estrutura, o objeto é **destruído permanentemente**.

#### 22.7.3 Reparo de Objetos

Reparar um objeto é uma **ação de manifestação** com:

> **OV/RV = grau atual da condição + modificadores de material e ferramenta**

Os modificadores de reparo seguem a mesma tabela de criação (22.4.2), com foco em material e ferramentas.

RAPs do reparo reduzem o grau da condição aplicada ao objeto. Se a condição for totalmente removida, o objeto retorna ao funcionamento normal.

---

### 22.8 Modificação e Aprimoramento de Objetos

É possível aprimorar um objeto existente para aumentar o grau de suas tags ou adicionar novas tags.

#### 22.8.1 Aprimoramento de Tag Existente

Aumentar o grau de uma tag existente em +1 é uma ação de manifestação com:

> **OV/RV = grau atual da tag + 2**

#### 22.8.2 Adição de Nova Tag

Adicionar uma nova tag a um objeto existente é uma ação de manifestação com:

> **OV/RV = grau total atual do objeto + grau desejado da nova tag**

A adição de tags aumenta a Complexidade do objeto. Se a Complexidade superar o valor de Estrutura, o objeto se torna instável: há risco de falha em uso intenso (a critério da mesa, pode exigir ação de manutenção entre cenas).

#### 22.8.3 Modificação Narrativa

Objetos podem ter suas tags **renomeadas** ou **recontextualizadas** sem ação mecânica, desde que o grau não mude e a mudança faça sentido narrativo.

> **Exemplo**: a tag *Lâmina Afiada* grau 3 pode ser renomeada para *Fio Molecular* grau 3 após o objeto ser aprimorado com tecnologia avançada — sem rolagem necessária.

---

### 22.9 Objetos Especiais

#### 22.9.1 Objetos Únicos (Relíquias e Artefatos)

Objetos únicos são itens de importância narrativa singular — relíquias de poder, artefatos históricos, equipamentos personalizados de heróis icônicos. Eles seguem as mesmas regras, mas com as seguintes adições:

- possuem uma tag de **Identidade** que não pode ser removida ou copiada;
- sua destruição é sempre permanente (não reparável);
- podem possuir tags com efeitos narrativos que vão além dos mecânicos (a ser definido pelo GM);
- são tratados como personagens para fins de condições: possuem Corpo, Mente e Espírito próprios se a ficção justificar.

#### 22.9.2 Construtos

Construtos são objetos com autonomia parcial ou total: robôs, drones, golens, IA, animais mecânicos. Eles seguem as regras de criação de objetos, mas adicionam:

- um atributo de **Autonomia** (em APs), que define o grau de operação independente;
- tags de **comportamento** que definem como o construto age sem supervisão;
- podem ser alvos de ações de oposição e de manifestação como qualquer objeto de jogo.

Construtos com Autonomia ≥ 5 podem ser tratados como NPCs para fins de iniciativa e ação.

#### 22.9.3 Veículos

Veículos são objetos de escala maior, com atributos de movimento e capacidade de transportar outros objetos de jogo. Para além das regras padrão:

- possuem uma tag de **Velocidade** com grau em APs (ver tabela 18.2);
- possuem uma tag de **Carga** que define quantos objetos ou personagens transportam;
- dano recebido pelo veículo pode se propagar como condição a seus ocupantes (a critério da mesa: RAPs excedentes à Estrutura do veículo são aplicados aos ocupantes).

---

### 22.10 Exemplo de Criação de Objeto

**Situação**: Beast tenta criar um neutralizador de mutação portátil em um laboratório improvisado, em poucas horas, usando peças disponíveis.

**Objeto desejado**: neutralizador com tags *Supressão de Mutação* grau 4, *Pulso de Área Curta* grau 2, *Uso Único* grau 1 → **grau total = 7**

**OV/RV base**: 7 (grau total do objeto)

**Modificadores**:
- Complexidade: 3 tags → +1
- Material escasso (peças de laboratório adaptadas) → +1
- Ferramentas adequadas disponíveis → +0
- Tempo reduzido (horas em vez de dias) → +1
- Objeto para uso único → -1

**OV/RV final**: 7 + 1 + 1 + 0 + 1 − 1 = **9**

**Tags do Beast usadas**: *Engenharia Genética* grau 5 + *Inteligência Excepcional* grau 4 → grau total = 9
**Atributo base**: 8
**AV/EV**: 8 + 9 = **17**

**Resultado**: rola e obtém RAPs 5.
- Grau total criado = 5 (inferior ao desejado de 7)
- Beast cria o objeto, mas com grau reduzido: *Supressão de Mutação* grau 3, *Pulso de Área Curta* grau 1, *Uso Único* grau 1 → total 5.
- Estrutura do objeto = 3 (proporcional ao grau).
- Para obter o grau 7 original, Beast precisaria de mais tempo ou melhores recursos.

---

## 23. Atributos dos Personagens

Os atributos de um personagem são valores numéricos em APs que representam suas capacidades intrínsecas — independentemente de qualquer poder mutante ou equipamento. Eles funcionam como AV/EV base quando não há tags disponíveis ou relevantes, e como OV/RV em situações de resistência passiva.

---

### 23.1 Atributos Físicos

| Atributo | Função |
|---|---|
| **Força** | peso que pode mover, dano físico em corpo a corpo, destruição de estruturas |
| **Destreza** | precisão, velocidade de ação, evasão, equilíbrio |
| **Corpo** | resistência a dano físico, fadiga, veneno, doença |

### 23.2 Atributos Mentais

| Atributo | Função |
|---|---|
| **Intelecto** | raciocínio, análise, conhecimento técnico, planejamento |
| **Intuição** | percepção, leitura de situação, reação a surpresas |
| **Mente** | resistência a dano mental, influência, ilusão, controle |

### 23.3 Atributos de Influência

| Atributo | Função |
|---|---|
| **Presença** | carisma, liderança, intimidação, negociação |
| **Espírito** | resistência emocional, força de vontade, senso de identidade |

> **Nota**: Corpo, Mente e Espírito são os três **atributos de resistência** usados como limiar de condições (ver Seção 6.1). Os demais atributos atuam como AV/EV em ações específicas.

---

### 23.4 Escala de Atributos

Todos os atributos seguem a escala de APs:

| Valor | Nível | Referência humana |
|---:|---|---|
| 1–2 | Abaixo da média | criança, idoso frágil |
| 3–4 | Humano médio | adulto saudável |
| 5–6 | Humano excepcional | atleta olímpico, gênio |
| 7–8 | Pico humano | limite absoluto do humano sem aprimoramento |
| 9–11 | Super-humano baixo | capacidades que excedem qualquer humano |
| 12–15 | Super-humano médio | equivalente a Homem-Aranha, Wolverine em combate físico |
| 16–20 | Super-humano elevado | Colossus, Tempestade em plena força |
| 21–25 | Classe de Poder | Hulk, Thor, Phoenix |
| 26+ | Cósmico | Entidades, Omega absoluto |

---

### 23.5 Atributos Iniciais dos Jogadores

Personagens jogadores começam como **estudantes do Instituto Xavier (Novos Mutantes)**. Os valores iniciais refletem adolescentes talentosos, não agentes de campo formados.

| Fase | Atributos físicos/mentais | Atributos de resistência | Tags por tema |
|---|---|---|---|
| Estudante (início) | 3–6 | 4–6 | grau 1–3 por tag |
| Novo Mutante ativo | 5–8 | 5–8 | grau 2–4 por tag |
| X-Man em formação | 7–10 | 7–10 | grau 3–6 por tag |

---

### 23.6 Atributos de NPCs e Antagonistas

NPCs seguem a mesma estrutura. O GM pode definir apenas os atributos relevantes ao papel do NPC:

- **Inimigos menores**: 2 atributos + 1–2 tags, grau 3–5.
- **Inimigos recorrentes**: 4–6 atributos + 2–4 tags, grau 5–10.
- **Vilões principais**: conjunto completo de atributos + 4–8 tags, grau 8–18.
- **Ameaças cósmicas**: atributos 20+, tags ilimitadas.

---

## 24. Temas

Temas são a estrutura narrativa e mecânica central de cada personagem. Cada personagem possui **dois a quatro temas**, e cada tema agrupa tags relacionadas a uma faceta da identidade do personagem.

---

### 24.1 O que é um Tema

Um tema é um conjunto coerente de tags agrupadas em torno de um conceito narrativo. Temas definem **quem o personagem é**, não apenas o que ele pode fazer.

> **Exemplo**: Wolverine pode ter os temas *Fator de Cura e Adamantium* (mutação) e *Berserker Controlado* (humanidade/conflito interno).

### 24.2 Tipos de Tema

Os temas se dividem em duas categorias:

| Categoria | Descrição |
|---|---|
| **Mutação** | poderes, capacidades sobrenaturais, origem genética |
| **Humanidade** | identidade, relações, missão, passado, posses, conflito |

Cada personagem deve ter **ao menos um tema de cada categoria**. A proporção entre eles define a tensão narrativa central do personagem.

### 24.3 Estrutura de um Tema

Cada tema possui:
- **Nome**: o conceito central (ex.: *Telepatia Ômega*, *Sobrevivente de Genosha*)
- **Descrição narrativa**: 1–3 frases que definem o tema ficcionalmente
- **Tags**: 2–6 tags com graus individuais
- **Questão de identidade**: uma pergunta que o personagem carrega sobre aquele tema

### 24.4 Tags dentro de um Tema

As tags de um tema devem ser **narrativamente coerentes** com o conceito do tema. Uma tag de *Força Sobre-Humana* não pode estar no tema *Telepatia*, mesmo que ambos sejam de mutação.

O grau total de um tema é a soma de todas as suas tags. Esse valor orienta a escala do personagem em situações relacionadas ao tema.

### 24.5 Subcategorias de Tema de Humanidade

Os temas de humanidade se enquadram nas seguintes subcategorias (usadas para orientar criação e progressão):

| Subcategoria | O que representa |
|---|---|
| Evento Marcante | algo que aconteceu e moldou o personagem |
| Relação Marcante | um vínculo com outra pessoa ou grupo |
| Missão | um objetivo ou propósito que guia o personagem |
| Personalidade | traços de caráter, comportamento, forma de ser |
| Posses | objetos significativos, recursos, conexões materiais |
| Rotina | hábitos, práticas, estrutura cotidiana |
| Conflito / Dificuldade | um problema interno ou externo recorrente |
| Treinamento | habilidade adquirida por esforço e disciplina |
| Território | um lugar de pertencimento, proteção ou relevância |

### 24.6 Subcategorias de Tema de Mutação

| Subcategoria | O que representa |
|---|---|
| Adaptação | capacidade de responder e mudar em situação de risco |
| Bastião | proteção, resistência, capacidade defensiva |
| Conjuração | criação de efeitos, entidades ou materiais do nada |
| Destino | ligação com forças maiores, profecia, inevitabilidade |
| Adivinhação | percepção expandida, visão além do presente |
| Enclave | vínculo com grupo, espaço sagrado, rede mutante |
| Expressão | manifestação criativa do poder, estilo único |
| Familiar | conexão com um ser ligado ao mutante |
| Mobilidade | movimento, deslocamento, velocidade |
| Relíquia | objeto carregado pelo mutante que amplifica ou ancora seu poder |
| Subversão | inversão de regras, quebra de padrões, disrupção |

---

### 24.7 Progressão de Temas

Ao longo da campanha, personagens evoluem seus temas. A progressão pode ocorrer por:

| Gatilho | Tipo de evolução |
|---|---|
| Momento dramático relevante | aumentar o grau de uma tag em +1 |
| Resolução de conflito de identidade | criar uma nova tag no tema |
| Perda significativa de um vínculo | remover ou alterar uma tag de humanidade |
| Superação de limite pessoal | aumentar um atributo em +1 |
| Arco de progressão completado | criar um novo tema |

A mesa deve definir a frequência dessas evoluções. Recomenda-se **1 evolução por arco narrativo** (3–5 sessões).

---

## 25. Iniciativa e Ordem de Ação

O sistema não usa iniciativa numérica por padrão. A ordem de ação é determinada por **contexto narrativo e consenso de mesa**, com os seguintes critérios como referência:

### 25.1 Critérios de Ordem

| Situação | Quem age primeiro |
|---|---|
| Emboscada ou surpresa total | atacante age antes, alvo não pode reagir no primeiro turno |
| Combate iniciado naturalmente | Destreza mais alta age primeiro; empates resolvidos por Intuição |
| Personagem com poder de velocidade | age antes de qualquer ação normal, independentemente de empates |
| Reação declarada | ocorre imediatamente após o evento gatilho, antes do efeito se resolver completamente |

### 25.2 Estrutura do Turno

Cada turno é composto de:
1. **Declaração**: todos os personagens (jogadores e GM) declaram suas intenções em ordem reversa de Destreza — quem age por último declara primeiro.
2. **Resolução**: ações se resolvem em ordem de Destreza (maior para menor).
3. **Reações**: podem ocorrer em qualquer ponto durante a resolução.
4. **Atualização de estado**: condições e efeitos temporários têm seu grau reduzido ou expiram.

### 25.3 Ação Completa vs. Ação Parcial

Por padrão, cada personagem realiza **uma ação principal** por turno. Algumas situações permitem ações adicionais:

| Situação | Regra |
|---|---|
| Usando apenas ações automáticas | pode realizar quantas automáticas quiser, limitado pelas tags disponíveis |
| Dividir ação principal | pode fazer duas ações menores; cada uma usa apenas metade das tags disponíveis |
| Poderes de velocidade | a critério do GM, personagens de alta velocidade podem receber ações adicionais proporcional ao AP de velocidade |

---

## 26. Intenção do Sistema

Este sistema foi desenhado para:
- preservar a **leitura narrativa** do jogo;
- dar **peso mecânico real** às tags;
- separar claramente **criação, resistência e manutenção** de efeitos;
- permitir efeitos simples e complexos **sem mudar a estrutura central**;
- tornar as **promoções** uma ferramenta de expressão narrativa, não apenas numérica;
- manter o jogo rápido, mas com espaço para **alta escala** de poder.

---

## 27. Ações Estendidas e Atividades de Intervalo

Nem toda ação acontece em meio a uma cena de pressão. Muitas das coisas mais importantes — tratar um ferimento a sério, construir um dispositivo, investigar uma pista, recuperar a mente de alguém — exigem **tempo, foco e contexto adequado**. Esta seção define como o sistema diferencia uma ação de combate de uma ação fora de combate, e como estruturar atividades de intervalo entre cenas.

---

### 27.1 O Eixo Tempo–Qualidade

A premissa central é simples: **mais tempo disponível significa menor dificuldade e resultados mais completos**. O mesmo conjunto de tags e o mesmo atributo produzem resultados radicalmente diferentes dependendo de quanto tempo e atenção o personagem pode dedicar à tarefa.

O sistema formaliza isso através de um **modificador de ritmo** aplicado ao OV/RV de qualquer ação de manifestação ou criação.

---

### 27.2 Modificador de Ritmo

O modificador de ritmo é aplicado diretamente ao OV/RV base da ação. Quanto menos tempo disponível, maior a dificuldade:

| Ritmo | Tempo disponível | Modificador ao OV/RV | Contexto típico |
|---|---|---:|---|
| **Urgência extrema** | 1 turno (4–8 seg) | +5 | combate ativo, sob ataque, caos total |
| **Pressão alta** | 1 cena (15 min) | +3 | operação em andamento, relógio correndo |
| **Pressão moderada** | hora (APs 10) | +1 | missão encerrada, mas ambiente instável |
| **Calma relativa** | horas (APs 10–12) | +0 | referência — sem modificador |
| **Foco total** | dia (APs 15) | -1 | instalação adequada, sem distrações |
| **Trabalho estendido** | dias (APs 15–17) | -2 | laboratório, acesso a recursos completos |
| **Projeto longo** | semanas ou mais (APs 18+) | -3 | condições ideais, equipe de apoio, pesquisa aprofundada |

> A referência neutra é **horas de trabalho focado** — sem pressão, mas sem luxo. Abaixo disso, a dificuldade cai. Acima (urgência), a dificuldade sobe.

---

### 27.3 O que Muda com o Ritmo

O modificador de ritmo afeta não apenas a dificuldade, mas também o **teto do que é possível alcançar**:

| Ritmo | Resultado máximo possível |
|---|---|
| Urgência extrema | estabilização temporária; efeitos de grau ≤ 3 |
| Pressão alta | contenção ou efeito funcional; grau ≤ 6 |
| Pressão moderada | solução real, mas incompleta; grau ≤ 9 |
| Calma relativa | solução completa; grau irrestrito |
| Foco total ou maior | solução completa + possibilidade de promoções de escopo adicionais |

Ações sob urgência extrema nunca podem produzir efeitos duradouros ou permanentes. No máximo, **compram tempo**.

---

### 27.4 Exemplos por Domínio

#### Medicina

| Situação | Ritmo | O que é possível |
|---|---|---|
| Estancar hemorragia em combate | Urgência extrema | reduz condição física em até 3; não cura, apenas estabiliza |
| Tratar ferimento ao fim da missão | Pressão alta | remove condição temporária de grau ≤ 6 |
| Tratamento em enfermaria equipada | Calma relativa | remove condição de qualquer grau; possibilidade de cura total |
| Cirurgia especializada + recuperação | Trabalho estendido | remove condições duradouras; pode reverter início de permanente |

#### Investigação

| Situação | Ritmo | O que é possível |
|---|---|---|
| Varrer uma sala durante combate | Urgência extrema | encontra apenas o óbvio; pistas superficiais |
| Investigar local recém-esvaziado | Pressão alta | pistas funcionais; lacunas na informação |
| Investigação tranquila no local | Calma relativa | quadro completo da cena |
| Pesquisa em arquivo + campo | Trabalho estendido | contexto histórico, padrões, conexões ocultas |

#### Construção e Criação

| Situação | Ritmo | O que é possível |
|---|---|---|
| Improvisar solução em campo | Urgência extrema | objeto de uso único, grau ≤ 3, sem refinamento |
| Montagem rápida pós-missão | Pressão alta | objeto funcional, grau ≤ 6 |
| Oficina improvisada por horas | Calma relativa | objeto completo, grau irrestrito |
| Laboratório + dias de trabalho | Trabalho estendido | objeto otimizado + possibilidade de tags adicionais |

#### Suporte Psicológico / Espiritual

| Situação | Ritmo | O que é possível |
|---|---|---|
| Acalmar alguém em pânico durante combate | Urgência extrema | reduz condição mental em até 3 |
| Conversa ao fim da cena | Pressão alta | remove condição mental temporária de grau ≤ 6 |
| Sessão longa de apoio | Calma relativa | remove condição mental ou emocional de qualquer grau |
| Acompanhamento ao longo de dias | Trabalho estendido | pode enfrentar condições duradouras ou de raiz profunda |

---

### 27.5 Atividades de Intervalo

Entre cenas ou arcos narrativos, os personagens têm a oportunidade de realizar **atividades de intervalo** — ações que não cabem dentro de uma cena de jogo, mas que têm impacto real sobre o próximo arco. Cada personagem pode realizar **uma atividade de intervalo** por sessão de descanso narrativo, salvo se o grupo decidir de forma diferente.

As atividades de intervalo seguem as regras de ações de manifestação com o modificador de ritmo de **foco total (-1)** ou **trabalho estendido (-2)**, conforme o tempo narrativo disponível.

---

#### Recuperar

O personagem dedica o intervalo a descanso, tratamento ou cuidado pessoal.

- Remove condições físicas, mentais ou espirituais de grau ≤ Estrutura de resistência do personagem (Corpo, Mente ou Espírito).
- Sem rolagem necessária para condições temporárias de grau baixo (≤ 3): elas simplesmente expiram.
- Para condições duradouras: ação de manifestação com OV/RV = grau da condição + modificador de duração − modificador de ritmo.

> **Narrativa**: não é apenas descanso. É o personagem processando o que aconteceu — treinando mais devagar, dormindo, conversando, cuidando de si.

---

#### Investigar

O personagem pesquisa ativamente um tema, pessoa, local ou situação.

- Tipo de ação: manifestação.
- OV/RV = complexidade da informação desejada (GM define: 1 para pública, até 8 para altamente secreta) + modificadores circunstanciais − modificador de ritmo.
- RAPs determinam a profundidade da informação obtida.

| RAPs | Resultado da investigação |
|---:|---|
| 1–3 | confirmação de algo já suspeitado; nada surpreendente |
| 4–6 | pista concreta; nome, local ou vínculo novo |
| 7–10 | quadro claro de conexões; pode revelar o próximo arco |
| 11+ | informação rara ou protegida; acesso ao núcleo do mistério |

---

#### Preparar

O personagem cria, modifica ou organiza recursos para o próximo conflito.

- Pode criar objetos (seguindo a Seção 22), aprimorar equipamentos ou posicionar recursos em locais estratégicos.
- Também pode ser usado para **criar uma vantagem narrativa**: o personagem toma medidas cujo efeito será relevante em uma cena futura.
- A vantagem narrativa funciona como uma tag temporária de grau = RAPs obtidos, disponível uma vez na próxima cena aplicável.

> **Exemplo**: Forge passa o intervalo preparando jammers de Sentinela. Se obtiver RAPs 5, cria a tag *Jammers Preparados* grau 5, utilizável uma vez na próxima missão que envolva Sentinelas.

---

#### Treinar

O personagem trabalha ativamente no desenvolvimento de uma habilidade ou poder.

- Não gera resultado imediato: acumula **pontos de progresso**.
- A cada atividade de intervalo dedicada a treinar, o personagem acumula 1 ponto de progresso em uma tag ou atributo específico.
- Quando o número de pontos acumulados atingir o **grau atual + 1** da tag ou atributo, ele aumenta em +1.

> **Exemplo**: a tag *Controle Psiônico* grau 3 exige 4 pontos de progresso para chegar ao grau 4. O personagem dedica 4 intervalos a treinar essa tag especificamente.

Esta regra pode coexistir ou substituir a progressão narrativa da Seção 24.7, conforme a preferência da mesa.

---

#### Conectar

O personagem cultiva, repara ou aprofunda um vínculo com outro personagem, NPC ou organização.

- Sem rolagem para vínculos existentes: apenas roleplaying e confirmação narrativa.
- Para estabelecer vínculo novo com NPC relutante ou organização fechada: manifestação com OV/RV definido pelo GM.
- Resultado de sucesso: o personagem obtém acesso a uma **fonte** — um NPC ou recurso que pode ser acionado uma vez por arco para obter informação, apoio ou objeto relevante.

---

#### Criar Obra

O personagem produz algo de valor narrativo ou expressivo: arte, escrita, tecnologia, ritual, plano detalhado.

- Segue as regras de criação de objetos (Seção 22) ou manifestação, com modificador de ritmo de trabalho estendido.
- O resultado pode ser:
  - um **objeto de jogo** com tags definidas pelos RAPs;
  - uma **condição positiva** para o próprio personagem ou aliado (inspiração, clareza, propósito);
  - um **documento** com valor narrativo que afeta futuras cenas de investigação ou diplomacia.

---

### 27.6 Limites das Atividades de Intervalo

- Um personagem com condições de grau alto (≥ 7) em qualquer categoria **não pode realizar atividades de intervalo** nessa mesma categoria sem antes se recuperar.
- Atividades que envolvem outros personagens (Conectar, suporte psicológico) exigem que o outro personagem aceite ou esteja disponível.
- O GM pode declarar que o intervalo narrativo é muito curto para certas atividades — em arcos de urgência extrema, o intervalo pode ser apenas de pressão alta, limitando o teto de resultados.

---

### 27.7 Atividades de Intervalo para Estudantes (PJs em fase inicial)

Durante a fase em que os PJs são estudantes (2005–2008), as atividades de intervalo têm um sabor diferente — são moldadas pelo contexto do Instituto:

| Atividade | Equivalente estudantil |
|---|---|
| Recuperar | descanso no dormitório; enfermaria do Instituto; conversa com mentor |
| Investigar | pesquisa na biblioteca do Instituto; acesso limitado aos arquivos do Cérebro |
| Preparar | aula prática na Sala X; montagem de equipamento básico com supervisão |
| Treinar | sessões na Sala X; mentoria de veterano; prática de poderes com controle |
| Conectar | vínculos com colegas, professores, primeiros aliados externos |
| Criar Obra | projetos para aula; experimentos pessoais; diário, sketchbook, código |

---

## 28. Cronologia do Cenário — Universo X-Men RPG

Os X-Men não surgiram em manchete. Surgiram em silêncio, numa mansão em Westchester, com cinco adolescentes que não sabiam exatamente o que estavam construindo — mas sabiam que estavam construindo algo. O que se segue é a história desse algo: como cresceu, rachou, sangrou, e ainda assim permaneceu.

Os jogadores entram nessa história como **estudantes do Instituto Xavier**, por volta de 2005–2006, com 14 a 16 anos. Eles não são heróis ainda. São pessoas tentando entender o que são — num mundo que ainda não decidiu o que fazer com elas.

---

### 28.1 Leitura da Tabela

A tabela que segue registra cada período com:
- **o que estava acontecendo no mundo**;
- **quem estava no campo**;
- **onde os PJs estavam nisso tudo**.

Ela não é exaustiva — é uma âncora. O que acontece entre as linhas é o que importa.

---

### 28.2 Cronologia Narrativa

---

#### 🕵️ 1988–1991 — *A Era do Segredo*
*Tom: conspirativo, íntimo, de coisas ditas em voz baixa*

Xavier não queria um exército. Queria uma prova. Cinco jovens reunidos numa mansão que parecia escola mas funcionava como laboratório de um ideal: que mutantes e humanos podiam coexistir, se alguém estivesse disposto a pagar o preço do exemplo.

Eles não tinham uniforme no início. Tinham dúvida, e treino, e Xavier olhando para cada um como se visse algo que eles mesmos ainda não sabiam que carregavam.

Nesse mesmo período, em algum bunker governamental, o **Programa Sentinela** era rabiscado em papel que ninguém deveria ver. Magneto observava de longe — não com raiva, ainda. Com ceticismo. **Mística** já movia peças na sombra. **Sinistro** registrava DNA como quem cataloga espécies raras antes da extinção.

E em 1989, longe desse mundo mutante em formação, **Steve Rogers foi descongelado**. O mundo ganhou de volta um símbolo que não sabia que precisava — e os mutantes ganharam um espelho: o que significa ser extraordinário num mundo de ordinários?

**X-Men ativos:** Ciclope, Jean Grey, Homem de Gelo, Fera, Anjo  
**Times paralelos:** nenhum  
**PJs:** ainda não existem

---

#### 🌍 1992–1994 — *A Era da Expansão*
*Tom: épico, colorido, de rostos novos e horizontes maiores*

Krakoa quase os matou a todos. O que sobrou foi reorganização forçada — e com ela, uma ideia que Xavier relutou em admitir: que o mundo era grande demais para cinco pessoas.

O **Time Dourado** emergiu como contrapartida ao **Time Azul**: Tempestade, Colossus, Noturno, Wolverine, Gambit. Mutantes de origens tão diferentes que sua coesão parecia improvável — e justamente por isso, funcionava. Enquanto isso, os **Vingadores** tornavam-se públicos nos EUA, equipe humana de elite, e o contraste não escapou a ninguém: heróis com aprovação pública vs. mutantes que ainda operavam nas margens da legalidade.

**Legião** manifestava instabilidade crescente, como uma pergunta que Xavier ainda não sabia como responder. **Sinistro** intensificava manipulações que ninguém ainda conseguia mapear completamente.

**X-Men ativos:** Time Azul + Time Dourado (estrutura dupla)  
**Times paralelos:** nenhum  
**PJs:** ainda não existem

---

#### 💔 1994–1996 — *A Era da Fênix*
*Tom: dramático, íntimo, de amor e destruição*

Jean Grey estava mudando. Ninguém falava sobre isso diretamente — esse era o problema. O **Clube do Inferno** soube explorar o silêncio.

O que veio depois não tem nome limpo. A **Fênix Negra** não era Jean e era Jean ao mesmo tempo — poder demais para um corpo que ainda amava, ainda lembrava, ainda tentava escolher. O julgamento Shi'ar não foi sobre culpa. Foi sobre medo. E Jean fez o que fez no espaço não por dever, mas porque era a única forma de dizer *eu não me perderei em você*.

Scott voltou sem ela. Encontrou seu pai — **Corsário**, entre estrelas, comandando piratas. Descobriu que herança cósmica não é privilégio: é peso. Conheceu **Madelyne Pryor** num aeroporto chuvoso, e ela tinha o jeito de Jean de inclinar a cabeça quando pensava. Casou-se com ela depressa demais. Madelyne começou a acreditar que era Jean reencarnada — e talvez estivesse mais certa do que qualquer um sabia.

**X-Men ativos:** Times Azul e Dourado desestabilizados  
**Times paralelos:** nenhum  
**PJs:** ainda não existem

---

#### 🏛️ 1997 — *A Era da Exposição*
*Tom: político, de revelação e desconforto*

Xavier foi ferido. E então aconteceu algo que ninguém tinha previsto: **Magneto assumiu a liderança dos X-Men**. Não por conquista. Por protocolo. Porque Xavier, antes de cair, tinha deixado instruções — e Magneto, por razões que nunca explicou completamente, honrou-as.

Foi Magneto quem os tornou públicos pela primeira vez. Foi Magneto quem se entregou para mostrar boa-fé. O gesto foi real, o risco foi real — e o governo os tratou como cúmplices de um terrorista que acabava de se render. A ironia era cruel o suficiente para ser ficção.

Os X-Men existiam agora para o mundo saber. E o mundo não sabia bem o que fazer com essa informação.

**X-Men ativos:** estrutura instável; Magneto no centro  
**Times paralelos:** nenhum  
**PJs:** ainda não existem

---

#### 🌊 1998–2000 — *A Era de Genosha*
*Tom: bélico, de soberania e ruptura*

Magneto foi preso. As Sentinelas foram ativadas. Os X-Men desapareceram — o mundo acreditou que estavam mortos.

Na Europa, **Noturno** não acreditou. Fundou a **Excalibur** como ato de recusa: a resistência mutante não morreria enquanto houvesse alguém em pé para carregá-la.

Quando Magneto voltou, voltou diferente. Genosha não era projeto político — era declaração. O **Asteroide M** desceu em órbita, soberano e incontestável. Wanda e Pietro dividiram lealdades entre pai e convicção. Os **Vingadores** intervieram porque era o que faziam — e Genosha resistiu porque era o que Magneto havia decidido que faria.

**Sinistro** coletava material genético nos bastidores. Sempre nos bastidores.

**X-Men ativos:** em reconstrução  
**Times paralelos:** Excalibur (Europa, fundada por Noturno)  
**PJs:** ainda não existem

---

#### ⏳ 2001–2004 — *A Era dos Paradoxos*
*Tom: filosófico, de paradoxos e escolhas impossíveis*

Scott voltou. A fase **New X-Men** começou com a sensação de que algo havia mudado fundamentalmente — não nos poderes, mas nas perguntas. Os ecos de **Days of Future Past** chegavam em missões como pesadelos de alguém que ainda não nasceu.

**Legião** manifestou nova personalidade dominante. A mente de um filho é o arquivo dos pecados do pai.

Em 2003, a crise com Xavier abriu espaço para o **X-Factor** — equipe paralela com mandato diferente, mais político, menos messiânico. **Apocalipse** chegou ao presente, recrutou Cavaleiros, fez Anjo em Arcanjo de novo. O X-Factor o enfrentou; ele os considerou dignos e foi embora, como quem decide adiar um veredicto.

**Nathan nasce. Madelyne descobre ser clone.** O plano de **Sinistro** emergiu parcialmente — parcialmente, porque Sinistro nunca revela tudo de uma vez. Xavier desapareceu. O X-Factor se fundiu aos X-Men por necessidade.

**X-Men ativos:** Scott no centro; X-Factor integrado a partir de 2004  
**Times paralelos:** Excalibur ativa  
**PJs:** ainda não existem

---

#### 🎒 2005–2006 — *A Era dos Estudantes*
*Tom: juvenil, de descoberta, de primeiros erros e primeiras lealdades*

**Os PJs entram aqui.**

Com 14 a 16 anos. Num mundo que já passou por tudo isso acima e ainda não se resolveu. O Instituto Xavier é escola e trincheira ao mesmo tempo — e para novos alunos, parece mais escola do que trincheira, até que deixa de parecer.

**Rachel Summers** chegou do futuro sem dizer tudo sobre si mesma. Juntou-se à Excalibur. Carregava o peso de uma linha temporal que os PJs nem sabem que existe.

Em 2006, a **Guerra Civil** dividiu heróis com identidade secreta de heróis sem. Os veteranos se dividiram. Os PJs assistiram — porque ainda não tinham permissão de fazer outra coisa.

**X-Men ativos:** Scott, Kitty, Tempestade, Wolverine, Gambit, Psylocke; Emma Frost chegando  
**Times paralelos:** Excalibur; X-Factor em paralelo  
**PJs:** estudantes do Instituto (14–16 anos); sem missões de campo

---

#### ⚡ 2007–2009 — *A Era das Forças Paralelas*
*Tom: fragmentado, de múltiplas frentes e identidades em conflito*

**Cable chegou do futuro** com a lembrança de guerras que os PJs ainda não travaram. Recrutou veteranos dos Novos Mutantes para a **X-Force** — unidade que faz o que os X-Men decidem não fazer, porque alguém tem que fazer.

Os PJs não foram recrutados. Eram jovens demais, ou não tinham o perfil, ou Cable simplesmente viu algo diferente neles. A saída dos veteranos deixou espaço — e responsabilidade.

**Emma e Scott** consolidaram a liderança conjunta dos X-Men em 2008: fria precisão e fervor controlado, dois estilos que funcionavam juntos exatamente porque não eram iguais. **Deadpool** orbitava a X-Force como fenômeno inexplicável.

Em 2009, o Instituto reabriu publicamente como escola. Tempestade dividia tempo entre Wakanda e Westchester. Os Novos Mutantes tornaram-se ativos — missões de suporte, sempre com supervisão, mas missões reais.

**X-Men ativos:** Scott + Emma co-lideram; Kitty, Wolverine (escola), Tempestade em trânsito  
**Times paralelos:** X-Force (Cable); Excalibur (Rachel + Noturno)  
**PJs:** treinamento avançado (2008); Novos Mutantes ativos com supervisão (2009)

---

#### 🌐 2010± — *A Era da Exposição Total*
*Tom: institucional, midiático, de dilemas sem resposta limpa*

Os X-Men são instituição agora. Têm escola, têm imprensa, têm debates no Congresso. Têm inimigos que usam advogados antes de usar exércitos.

**Sinistro** permanece nas sombras — sempre nas sombras. **Mística** muda de forma, literalmente. **Magneto** tornou-se figura filosófica: não mais general, mas voz que ainda ecoa em qualquer sala onde mutantes e humanos discutem o futuro. **Legião** é variável imprevisível. **Apocalipse** é ameaça latente. **Juggernaut** e **Stryker** são tipos diferentes do mesmo medo transformado em violência.

Os PJs têm 18–20 anos. Sobreviveram ao Instituto. Estão a um passo de se tornarem X-Men — e talvez já sejam, sem que alguém tenha dito isso oficialmente ainda.

**X-Men ativos:** Scott, Emma, Kitty, núcleo central; Tempestade entre Wakanda e Instituto  
**Times paralelos:** X-Factor; X-Force; Excalibur  
**PJs:** Novos Mutantes plenamente ativos; podem operar como equipe própria

---

### 28.3 Times Paralelos — Quem São e Por Que Existem

| Time | Fundação | Origem | Papel no cenário | Relação com PJs |
|---|---|---|---|---|
| **Excalibur** | 1998–1999, Europa | X-Men parecem mortos; Noturno recusa o luto | Resistência mutante europeia; operações independentes | Equipe irmã distante; Rachel é figura de mistério |
| **X-Factor** | 2003, EUA | Vácuo ideológico; crise com Xavier | Mandato político e investigativo; integrado aos X-Men em 2004 | Referência institucional; veteranos que os PJs conhecem de nome |
| **X-Force** | 2007, operacional | Cable chega do futuro; recruta Novos Mutantes veteranos | Faz o que os X-Men decidem não fazer | A razão pela qual os PJs avançam — os veteranos saíram |

---

### 28.4 Trajetória dos PJs

| Período | O que os PJs são | O que podem fazer |
|---|---|---|
| 2005–2006 | Estudantes novos, 14–16 anos | Aulas, treinamento, vínculos no Instituto |
| 2006 | Estudantes durante a Guerra Civil | Observam; não participam de decisões |
| 2007 | Estudantes que perdem colegas para a X-Force | Sentem o vazio; treinamento torna-se mais sério |
| 2008 | Novos Mutantes em formação avançada | Primeiras missões menores com supervisão próxima |
| 2009 | Novos Mutantes ativos | Missões reais de suporte; alguma autonomia |
| 2010± | Agentes em formação, 18–20 anos | Operam como equipe; a um passo de X-Men oficiais |

> Os PJs não foram para a X-Force porque Cable viu algo diferente — ou porque eram jovens demais. Isso é tensão narrativa viva: o que acontece quando os veteranos que os PJs admiravam partiram para fazer o trabalho duro, e agora o Instituto precisa que *eles* cresçam?
