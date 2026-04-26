window.wikiPages = {
      index: `
        <h1>Bem-vindo à Wiki X-MEN TTRPG</h1>
        <p>Este é o sistema de regras para jogar X-Men usando o sistema City of Mist adaptado com mecânicas DC Heroes.</p>
        
        <h2>Sobre o Sistema</h2>
        <p>X-Men TTRPG usa uma versão híbrida do sistema City of Mist + DC Heroes para o universo X-Men.</p>
        
        <h2>Navegação — Sistema de Regras</h2>
        <div class="wiki-links">
          <h3>Ações e Resolução</h3>
          <ul>
            <li><a href="#acao" data-page="acoes">Ações</a> — Tipos de ação, resolução e terminologia</li>
            <li><a href="#tags" data-page="tags">Tags</a> — Uso e limites de tags</li>
            <li><a href="#condicoes" data-page="condicoes">Condições</a> — Aplicação, duração e remoção</li>
            <li><a href="#efeitos" data-page="efeitos">Efeitos</a> — Criação e gestão</li>
            <li><a href="#manifestacao" data-page="manifestacao">Manifestação</a> — Promoções de escopo e por RAP</li>
            <li><a href="#acoesautomaticas" data-page="acoesautomaticas">Ações Automáticas e Reações</a></li>
            <li><a href="#exemplo" data-page="exemplo_resolucao">Exemplo de Resolução</a></li>
            <li><a href="#principios" data-page="principios">Princípios e Resumo</a></li>
            <li><a href="#objetos" data-page="objetos">Objetos de Jogo</a></li>
          </ul>
          
          <h3>Referência</h3>
          <ul>
            <li><a href="#acao_resultado" data-page="acao_resultado">Tabela AV/OV e EV/RV</a></li>
            <li><a href="#modificadores" data-page="modificadores">Modificadores de Manifestação</a></li>
            <li><a href="#aps_distancia" data-page="aps_distancia">APs de Distância</a></li>
            <li><a href="#aps_tempo" data-page="aps_tempo">APs de Tempo</a></li>
            <li><a href="#aps_massa" data-page="aps_massa">APs de Massa</a></li>
            <li><a href="#aps_energia" data-page="aps_energia">APs de Energia</a></li>
          </ul>
        </div>
      `,
      temas: `
        <h1>Temas</h1>
        <p>Temas são a estrutura central de criação de personagens em City of Mist. Cada personagem tem dois tipos de Temas: um de Mist (poder místico/sobrenatural) e um de Histórias (humanidade/ Background).</p>
        
        <h2>Tipos de Temas</h2>
        
        <h3>Temas de Mist</h3>
        <p>Estes representam os poderes e a natureza sobrenatural do personagem:</p>
        <ul>
          <li><strong>Mutação:</strong> O poder mutante em si</li>
          <li><strong>Artefato:</strong> Um objeto com poderes</li>
          <li><strong>Pacto:</strong> Um acordo com alguma entidade</li>
          <li><strong>Influência:</strong> Uma conexão com o mundo místico</li>
        </ul>
        
        <h3>Temas de História</h3>
        <p>Estes representam a humanidade e o Background do personagem:</p>
        <ul>
          <li><strong>Passado:</strong> De onde você veio</li>
          <li><strong>Relacionamento:</strong> Conexões com outros</li>
          <li><strong>Ideologia:</strong> O que você acredita</li>
          <li><strong>Obrigação:</strong> Um dever ou responsabilidade</li>
        </ul>
        
        <h2>Criando Temas</h2>
        <p>Cada Tema tem um nome, um Status (número de Tags ativas), e um Flavor (descrição narrativa).</p>
        <p>Tags são poder concretizado - frases que descrevem o que seu Tema permite fazer.</p>
      `,
      tags: `
        <h1>Tags</h1>
        <p>Tags são a representação mecânica dos poderes, habilidades e fraquezas do seu personagem.</p>
        
        <h2>Estrutura das Tags</h2>
        <p>Uma Tag segue o formato: <code>[Descrição] [Grau]</code></p>
        <ul>
          <li><strong>Descrição:</strong> O que a Tag permite fazer</li>
          <li><strongGrau (1-6):</strong> O nível de poder (6 é Ômega)</li>
        </ul>
        
        <h2>Tags Positivas vs Negativas</h2>
        
        <h3>Tags Positivas</h3>
        <p>Representam poderes e habilidades:</p>
        <ul>
          <li><code>Telepatia 5</code> - Capacidade de ler mentes</li>
          <li><code>Força Sobre-Humana 4</code> - Capacidade de levantar carros</li>
        </ul>
        
        <h3>Tags Negativas (Fraquezas)</h3>
        <p>Representam vulnerabilidades:</p>
        <ul>
          <li><code>Prata Mortal -2</code> - Vulnerabilidade a prata</li>
          <li><code>Intoxicado pela Luz -3</code> - Não pode ficar sob luz solar</li>
        </ul>
        
        <h2>Usando Tags</h2>
        <p>Para usar uma Tag em um movimento, você deve ter o Status alto o suficiente para suportar o grau da Tag.</p>
        <p>O GM pode determinar que Tags específicas são relevantes para certain ações.</p>
      `,
      progressao: `
        <h1>Progressão</h1>
        <p>A progressão em City of Mist é driven por dois conceitos: Atenção e Dissipação.</p>
        
        <h2>Atenção</h2>
        <p>Quando você usa um Tema de Mist de forma dramática ou significativa, você ganha Atenção. Isso representa o mundo místico notando você.</p>
        <p>Quando a Atenção atinge 5, você pode "Virar Avatar" - um momento de poder máximo que pode mudar o jogo.</p>
        
        <h2>Dissipação</h2>
        <p>Quando você ignora sua natureza mística ou age de forma completamente humana, você ganha Dissipação.</p>
        <p>Quando a Dissipação atinge 5, você pode "Cair no Sono" - um momento de humanidade total que também pode ser poderoso.</p>
        
        <h2>Evolução de Temas</h2>
        <p>Between sessions, players can:</p>
        <ul>
          <li>Adicionar novas Tags aos Temas existentes</li>
          <li>Alterar a natureza de um Tema</li>
          <li>Criar novos Temas</li>
          <li>Remover Tags velhas</li>
        </ul>
        
        <h2>Condições e Recuperação</h2>
        <p>Condições são markers de trauma físico e emocional. Para se recuperar, você deve enfrentar o origen da condição através de roleplay significativo.</p>
      `,
      combate: `
        <h1>Combate</h1>
        <p>O combate em X-Men TTRPG é fluido e narrativo, focado em cinema e drama. As ações em combate seguem o sistema híbrido DC Heroes + City of Mist — consulte a página <strong>Tipos de Ação</strong> para a estrutura completa.</p>
        
        <h2>Iniciativa</h2>
        <p>O GM determina a ordem de iniciativa baseado na situação narrativa. Personagens com alta velocidade ou habilidades de combate podem ter vantagem.</p>
        
        <h2>Ações no Turno</h2>
        <p>Em cada turno, um personagem pode realizar ações de acordo com os quatro tipos do sistema. Consulte a página <strong>Sistema Híbrido</strong> para detalhes completos.</p>
        
        <h2>Condições em Combate</h2>
        <p>Durante o combate, personagens podem receber condições. O sistema de condições está detalhado em <strong>Sistema Híbrido</strong> Seção 6.</p>
        <p>Toda condição tem um <strong>grau em APs</strong> e um <strong>tipo de duração</strong> (temporária, duradoura ou permanente). Veja a seção de duração na página <strong>Tipos de Ação</strong>.</p>
        
        <h2>Dano</h2>
        <p>Dano é abstrato em City of Mist. Em vez de pontos de vida, usamos condições que representam o estado do personagem. O grau da condição é igual aos RAPs obtidos na ação que a gerou.</p>
        
        <h2>Recuperação</h2>
        <p>Entre cenas, personagens podem tentar recuperação através de descanso, itens ou outros meios narrativos. Condições temporárias expiram sozinhas; condições duradouras exigem ação ativa para remoção.</p>
      `,
      galera: `
        <h1>Tema de Galera</h1>
        <p>O Tema de Galera representa os relacionamentos e conexões entre personagens jogadores.</p>
        
        <h2>Estrutura</h2>
        <p>O Tema de Galera tem 6 slots que podem ser filled com diferentes tipos de conexão:</p>
        
        <h3>Conexões de Equipe</h3>
        <ul>
          <li>Companheiro de quarto</li>
          <li>Rival amigável</li>
          <li>Mentor/aprendiz</li>
        </ul>
        
        <h3>Conexões de História</h3>
        <ul>
          <li>Antigo aliado</li>
          <li>Segredo compartilhado</li>
          <li>Inimigo comum</li>
        </ul>
        
        <h2>Usando a Galera</h2>
        <p>As conexões do Tema de Galera podem ser usadas para:</p>
        <ul>
          <li>Obter ajuda em movimentos</li>
          <li>Justificar Tags de suporte</li>
          <li>Criar oportunidades narrativas</li>
        </ul>
      `,
      npcs: `
        <h1>NPCs & Cérebro</h1>
        <p>O Cérebro é o banco de dados de NPCs do jogo, contains 134 personagens pré-definidos do universo X-Men.</p>
        
        <h2>Níveis de Perigo</h2>
        <p>NPCs são categorizados por nível de perigo:</p>
        <ul>
          <li><strong>Baixo:</strong> Civis, NPCs secundários</li>
          <li><strong>Médio:</strong> Capangas, operativos de nível baixo</li>
          <li><strong>Alto:</strong> Vilões de categoria, heroes secundários</li>
          <li><strong>Extremo:</strong> Villains principais, Omega-level mutants</li>
        </ul>
        
        <h2>Frações</h2>
        <p>NPCs são associados a frações:</p>
        <ul>
          <li>X-Men</li>
          <li>Novatos/X-Men Iniciados</li>
          <li>Geração X</li>
          <li>Morlocks</li>
          <li>Irmandade</li>
          <li>Vilões</li>
          <li>Criminosos</li>
          <li>Neutros</li>
          <li>Humanos</li>
        </ul>
        
        <h2>Usando o Cérebro</h2>
        <p>O Cérebro é tool para GMs criarem encounters rapidamente. Cada NPC tem:</p>
        <ul>
          <li>Atributos (Destreza, Força, Corpo, etc.)</li>
          <li>Iniciativa</li>
          <li>Tags de poder</li>
          <li>Descrição narrativa</li>
        </ul>
        
        <p>Apenas o GM tem acesso completo ao Cérebro. Jogadores podem apenas ver NPCs que o GM permitir.</p>
      `,
      tipos_acao: `
        <h1>Tipos de Ação</h1>
        <p>O sistema híbrido DC Heroes + City of Mist define quatro categorias de ação. Cada categoria determina como AV/EV, OV/RV e RAPs funcionam — e como o resultado é convertido em condições ou efeitos.</p>

        <h2>1. Ações de Oposição</h2>
        <p>Usadas quando há resistência ativa de um alvo, personagem ou força consciente. É o tipo padrão de confronto direto.</p>
        <ul>
          <li><strong>AV/EV</strong> = atributos + tags + condições relevantes do atacante</li>
          <li><strong>OV/RV</strong> = atributos/valores da oposição + circunstâncias + condições</li>
          <li>O resultado gera <strong>RAPs</strong>, que determinam dano, criação de condições e intensidade do efeito</li>
        </ul>

        <h2>2. Ações de Manifestação</h2>
        <p>Usadas quando não há resistência ativa — apenas dificuldade de execução. O obstáculo é o ambiente, a complexidade ou a natureza do efeito desejado.</p>
        <h3>Regra base</h3>
        <p><code>OV/RV = 1 + modificadores</code></p>
        <p>O valor mínimo de 1 representa o limiar de existência de qualquer efeito. Uma falha indica que o efeito não se sustenta — "pisca" e some. Os modificadores são detalhados na página <strong>Modificadores</strong>.</p>
        <h3>Resultado</h3>
        <ul>
          <li>RAPs viram uma <strong>condição/tag</strong></li>
          <li>O valor em RAPs define o <strong>grau (APs)</strong> da condição</li>
          <li>A duração é escolhida conforme a intenção narrativa (ver abaixo)</li>
        </ul>

        <h2>3. Ações Automáticas</h2>
        <p>Ações sem rolagem. Representam o controle direto e deliberado do personagem sobre seus recursos narrativos.</p>
        <ul>
          <li>Cada tag só pode ser usada <strong>1 vez por turno</strong></li>
          <li>Cada tag usada vale <strong>1 AP</strong></li>
          <li><strong>AP do efeito = número de tags usadas</strong></li>
          <li><strong>Tags usadas não podem ser reutilizadas até o próximo turno</strong></li>
        </ul>
        <p>Ações automáticas podem: <strong>criar novos efeitos</strong> ou <strong>reduzir efeitos existentes</strong> considerando a <em>trivialidade</em> da ação (dificuldade baseada no valor do efeito atual). Não podem transferir, mover ou potencializar efeitos sem uma ação de Oposição ou Manifestação.</p>
        <p><strong>Limite:</strong> só podem afetar valores <em>iguais ou menores</em> que o número de tags usadas. Redução parcial é permitida.</p>

        <h2>4. Ações Automáticas como Reação</h2>
        <p>Versão das ações automáticas executada <em>fora do turno</em> do personagem — em resposta a algo que acontece.</p>
        <ul>
          <li>Consomem tags normalmente</li>
          <li>Seguem as mesmas regras das ações automáticas</li>
          <li>Podem ser usadas mesmo em ações com oposição em andamento</li>
        </ul>

        <h2>Duração de Tags e Condições</h2>
        <p>Toda condição criada possui um <strong>grau em APs</strong>, definido pelos RAPs ou pelo uso de tags.</p>

        <h3>APs de Tempo</h3>
        <p>Dura um número de <strong>turnos igual ao grau</strong>. Usada para efeitos rápidos e instáveis.</p>
        <p>Ex: <code>Atordoado-3</code> → dura 3 turnos</p>

        <h3>Indefinida</h3>
        <p>Dura um número de <strong>APs de tempo igual ao grau</strong>. Usada para efeitos sustentados além do combate.</p>
        <p>Ex: <code>Aura Protetora-5</code> → dura 5 APs de tempo</p>

        <h3>Permanente</h3>
        <p>Duração indefinida — só termina se algo intervir ativamente. Não deve ser criada por ação automática simples. Normalmente exige alta dificuldade, custo adicional ou justificativa narrativa forte.</p>

        <h2>Conversão de Resultado em Condição</h2>
        <p>RAPs gerados numa ação de manifestação ou oposição são convertidos em condições da seguinte forma:</p>
        <ul>
          <li><strong>RAPs = grau da condição</strong></li>
          <li>A condição recebe nome ficcional, valor em APs e tipo de duração</li>
        </ul>

        <h2>Resumo Operacional</h2>
        <table>
          <thead><tr><th>Tipo</th><th>Quando usar</th><th>Mecânica</th><th>Resultado</th></tr></thead>
          <tbody>
            <tr><td>Oposição</td><td>Resistência ativa</td><td>AV/EV vs OV/RV</td><td>RAPs → dano/condição</td></tr>
            <tr><td>Manifestação</td><td>Sem oposição, com dificuldade</td><td>EV vs 1 + mods</td><td>RAPs → condição/tag</td></tr>
            <tr><td>Automática</td><td>Controle direto via tags</td><td>Tags = APs</td><td>Efeito imediato</td></tr>
            <tr><td>Reação</td><td>Automáticas fora do turno</td><td>Tags = APs</td><td>Efeito imediato</td></tr>
          </tbody>
        </table>
      `,
      modificadores: `
        <h1>Modificadores de Manifestação</h1>
        <p>Modificadores são aplicados exclusivamente a <strong>Ações de Manifestação</strong>. Todos afetam <strong>OV e RV simultaneamente</strong>, tornando a ação mais ou menos difícil conforme a ambição do efeito.</p>
        <p><strong>Fórmula:</strong> <code>OV/RV = 1 + modificadores de manifestação + posicionamento + circunstância</code></p>

        <h2>1. Modificadores de Manifestação</h2>
        <p>Refletem a natureza e ambição do efeito que o personagem tenta criar.</p>
        <table>
          <thead><tr><th>Categoria</th><th>Grau</th><th>A favor</th><th>Contra</th></tr></thead>
          <tbody>
            <tr><td rowspan="4">Especificidade</td><td>Muito específico</td><td>—</td><td>—</td></tr>
            <tr><td>Moderado</td><td>+1</td><td>+2</td></tr>
            <tr><td>Amplo</td><td>+2</td><td>+3</td></tr>
            <tr><td>Universal</td><td>+3</td><td>+4</td></tr>
            <tr><td rowspan="4">Amplitude</td><td>1 alvo</td><td>—</td><td>—</td></tr>
            <tr><td>2–3 alvos</td><td>+1</td><td>+2</td></tr>
            <tr><td>Área pequena</td><td>+2</td><td>+3</td></tr>
            <tr><td>Área ampla</td><td>+3</td><td>+4</td></tr>
            <tr><td rowspan="4">Alcance</td><td>Toque</td><td>—</td><td>—</td></tr>
            <tr><td>Curto</td><td>+1</td><td>+2</td></tr>
            <tr><td>Médio</td><td>+2</td><td>+3</td></tr>
            <tr><td>Longo</td><td>+3</td><td>+4</td></tr>
            <tr><td rowspan="4">Controle</td><td>Bruto</td><td>—</td><td>—</td></tr>
            <tr><td>Direcionado</td><td>+1</td><td>+2</td></tr>
            <tr><td>Preciso</td><td>+2</td><td>+3</td></tr>
            <tr><td>Total</td><td>+3</td><td>+4</td></tr>
            <tr><td rowspan="4">Complexidade</td><td>Simples</td><td>—</td><td>—</td></tr>
            <tr><td>Duplo</td><td>+1</td><td>+2</td></tr>
            <tr><td>Múltiplo</td><td>+2</td><td>+3</td></tr>
            <tr><td>Composto</td><td>+3</td><td>+4</td></tr>
            <tr><td rowspan="4">Ocultação</td><td>Visível</td><td>—</td><td>—</td></tr>
            <tr><td>Discreto</td><td>+1</td><td>+2</td></tr>
            <tr><td>Oculto</td><td>+2</td><td>+3</td></tr>
            <tr><td>Indetectável</td><td>+3</td><td>+4</td></tr>
            <tr><td rowspan="4">Condição</td><td>Simples</td><td>—</td><td>—</td></tr>
            <tr><td>Estruturada</td><td>+1</td><td>+2</td></tr>
            <tr><td>Complexa</td><td>+2</td><td>+3</td></tr>
            <tr><td>Multifacetada</td><td>+3</td><td>+4</td></tr>
            <tr><td rowspan="4">Duração</td><td>Instantâneo</td><td>—</td><td>—</td></tr>
            <tr><td>Curto</td><td>+1</td><td>+2</td></tr>
            <tr><td>Cena</td><td>+2</td><td>+3</td></tr>
            <tr><td>Persistente</td><td>+3</td><td>+4</td></tr>
            <tr><td rowspan="4">Chain Effect</td><td>Nenhum</td><td>—</td><td>—</td></tr>
            <tr><td>Limitado</td><td>+1</td><td>+2</td></tr>
            <tr><td>Encadeado</td><td>+2</td><td>+3</td></tr>
            <tr><td>Contínuo</td><td>+3</td><td>+4</td></tr>
            <tr><td rowspan="4">Usável em outros</td><td>Apenas si</td><td>—</td><td>—</td></tr>
            <tr><td>Pode afetar outro</td><td>+1</td><td>+2</td></tr>
            <tr><td>Transferível</td><td>+2</td><td>+3</td></tr>
            <tr><td>Livre</td><td>+3</td><td>+4</td></tr>
          </tbody>
        </table>
        <p style="font-size:0.7rem; color:var(--muted); margin-top:8px;">Coluna "A favor" = modificador padrão. Coluna "Contra" = modificador quando a ação é realizada contra a vontade de um alvo passivo (sem resistência ativa, mas com oposição implícita).</p>

        <h2>2. Modificadores de Posicionamento</h2>
        <p>Refletem vantagens e desvantagens táticas do terreno e posição relativa.</p>
        <table>
          <thead><tr><th>Condição</th><th>Mod</th></tr></thead>
          <tbody>
            <tr><td>Terreno alto a favor</td><td>-1</td></tr>
            <tr><td>Terreno alto contra</td><td>+1</td></tr>
            <tr><td>Linha de visão limpa</td><td>-1</td></tr>
            <tr><td>Sem visão do alvo</td><td>+1</td></tr>
            <tr><td>Fora de visão total</td><td>+2</td></tr>
            <tr><td>Cobertura parcial</td><td>+1</td></tr>
            <tr><td>Cobertura total</td><td>+2</td></tr>
            <tr><td>Alvo exposto</td><td>-1</td></tr>
            <tr><td>Alvo parcialmente oculto</td><td>+1</td></tr>
            <tr><td>Alvo totalmente oculto</td><td>+2</td></tr>
            <tr><td>Flanqueado</td><td>-1</td></tr>
            <tr><td>Alvo de costas</td><td>-2</td></tr>
            <tr><td>Área apertada</td><td>+1</td></tr>
            <tr><td>Área aberta</td><td>-1</td></tr>
            <tr><td>Contato direto</td><td>-1</td></tr>
            <tr><td>Fora de alcance de toque</td><td>+1</td></tr>
            <tr><td>Usuário instável</td><td>+1</td></tr>
            <tr><td>Usuário estável</td><td>-1</td></tr>
            <tr><td>Alvo caído (corpo a corpo)</td><td>-1</td></tr>
          </tbody>
        </table>

        <h2>3. Modificadores Circunstanciais</h2>
        <p>Refletem o contexto emocional, ambiental e de foco do momento.</p>
        <table>
          <thead><tr><th>Condição</th><th>Mod</th></tr></thead>
          <tbody>
            <tr><td>Pressão / caos</td><td>+1</td></tr>
            <tr><td>Ambiente favorável</td><td>-1</td></tr>
            <tr><td>Ambiente hostil</td><td>+1</td></tr>
            <tr><td>Alvo cooperativo</td><td>-1</td></tr>
            <tr><td>Alvo resistente passivo</td><td>+1</td></tr>
            <tr><td>Foco total</td><td>-1</td></tr>
            <tr><td>Distração</td><td>+1</td></tr>
            <tr><td>Repetição da ação</td><td>+1</td></tr>
            <tr><td>Familiaridade alta</td><td>-1</td></tr>
          </tbody>
        </table>

        <h2>Notas de Equilíbrio</h2>
        <ul>
          <li>Modificadores positivos aumentam OV/RV (mais difícil). Modificadores negativos reduzem (mais fácil).</li>
          <li>O GM pode limitar categorias de ação combinadas para evitar stacking excessivo — recomendado cap de <strong>+8</strong> total em modificadores de ação por efeito.</li>
          <li>Modificadores de posicionamento e circunstanciais não têm cap, mas são situacionais e não cumulativos entre si se representarem a mesma condição.</li>
          <li>Ações automáticas <strong>não usam modificadores</strong> — seu limite é o número de tags investidas.</li>
        </ul>
`,
      aps_distancia: `
        <h1>Tabela de Ação e Resultado</h1>
        <p>Use a tabela apropriada para determinar o resultado de ações. Selecione o <strong>valor de atuação</strong> (linha) e o <strong>valor de obstáculo</strong> (coluna):</p>
        
        <h2>Action Table</h2>
        <p>Para ações de <strong>Ação de Atuação (AA)</strong> —iha dificuldade como <strong>Valor de Obstáculo (OV)</strong>.</p>
        <div class="table-container">
        <table class="ar-table">
          <thead>
            <tr><th>AV\\OV</th><th>0</th><th>1–2</th><th>3–4</th><th>5–6</th><th>7–8</th><th>9–10</th><th>11–12</th><th>13–15</th><th>16–18</th><th>19–21</th><th>22–24</th><th>25–27</th><th>28–30</th><th>31–35</th><th>36–40</th><th>41–45</th><th>46–50</th><th>51–55</th><th>56–60</th><th>+5</th></tr>
          </thead>
          <tbody>
            <tr><td>1–2</td><td>6</td><td>11</td><td>13</td><td>15</td><td>18</td><td>21</td><td>24</td><td>28</td><td>32</td><td>36</td><td>40</td><td>45</td><td>50</td><td>55</td><td>60</td><td>65</td><td>70</td><td>75</td><td>80</td><td>+5</td></tr>
            <tr><td>3–4</td><td>5</td><td>9</td><td>11</td><td>13</td><td>15</td><td>18</td><td>21</td><td>24</td><td>28</td><td>32</td><td>36</td><td>40</td><td>45</td><td>50</td><td>55</td><td>60</td><td>65</td><td>70</td><td>75</td><td>80</td><td></td></tr>
            <tr><td>5–6</td><td>4</td><td>7</td><td>9</td><td>11</td><td>13</td><td>15</td><td>18</td><td>21</td><td>24</td><td>28</td><td>32</td><td>36</td><td>40</td><td>45</td><td>50</td><td>55</td><td>60</td><td>65</td><td>70</td><td></td></tr>
            <tr><td>7–8</td><td>4</td><td>5</td><td>7</td><td>9</td><td>11</td><td>13</td><td>15</td><td>18</td><td>21</td><td>24</td><td>28</td><td>32</td><td>36</td><td>40</td><td>45</td><td>50</td><td>55</td><td>60</td><td>65</td><td></td></tr>
            <tr><td>9–10</td><td>3</td><td>4</td><td>5</td><td>7</td><td>9</td><td>11</td><td>13</td><td>15</td><td>18</td><td>21</td><td>24</td><td>28</td><td>32</td><td>36</td><td>40</td><td>45</td><td>50</td><td>55</td><td>60</td><td></td></tr>
            <tr><td>11–12</td><td>3</td><td>3</td><td>4</td><td>5</td><td>7</td><td>9</td><td>11</td><td>13</td><td>15</td><td>18</td><td>21</td><td>24</td><td>28</td><td>32</td><td>36</td><td>40</td><td>45</td><td>50</td><td>55</td><td>60</td><td></td></tr>
            <tr><td>13–15</td><td>3</td><td>3</td><td>3</td><td>4</td><td>5</td><td>7</td><td>9</td><td>11</td><td>13</td><td>15</td><td>18</td><td>21</td><td>24</td><td>28</td><td>32</td><td>36</td><td>40</td><td>45</td><td>50</td><td></td></tr>
            <tr><td>16–18</td><td>3</td><td>3</td><td>3</td><td>3</td><td>4</td><td>5</td><td>7</td><td>9</td><td>11</td><td>13</td><td>15</td><td>18</td><td>21</td><td>24</td><td>28</td><td>32</td><td>36</td><td>40</td><td>45</td><td></td></tr>
            <tr><td>19–21</td><td>3</td><td>3</td><td>3</td><td>3</td><td>3</td><td>4</td><td>5</td><td>7</td><td>9</td><td>11</td><td>13</td><td>15</td><td>18</td><td>21</td><td>24</td><td>28</td><td>32</td><td>36</td><td>40</td><td></td></tr>
            <tr><td>22–24</td><td>3</td><td>3</td><td>3</td><td>3</td><td>3</td><td>3</td><td>4</td><td>5</td><td>7</td><td>9</td><td>11</td><td>13</td><td>15</td><td>18</td><td>21</td><td>24</td><td>28</td><td>32</td><td>36</td><td></td></tr>
            <tr><td>25–27</td><td>3</td><td>3</td><td>3</td><td>3</td><td>3</td><td>3</td><td>3</td><td>4</td><td>5</td><td>7</td><td>9</td><td>11</td><td>13</td><td>15</td><td>18</td><td>21</td><td>24</td><td>28</td><td>32</td><td></td></tr>
            <tr><td>28–30</td><td>3</td><td>3</td><td>3</td><td>3</td><td>3</td><td>3</td><td>3</td><td>3</td><td>4</td><td>5</td><td>7</td><td>9</td><td>11</td><td>13</td><td>15</td><td>18</td><td>21</td><td>24</td><td>28</td><td></td></tr>
            <tr><td>31–35</td><td>3</td><td>3</td><td>3</td><td>3</td><td>3</td><td>3</td><td>3</td><td>3</td><td>3</td><td>4</td><td>5</td><td>7</td><td>9</td><td>11</td><td>13</td><td>15</td><td>18</td><td>21</td><td>24</td><td>28</td><td></td></tr>
            <tr><td>36–40</td><td>3</td><td>3</td><td>3</td><td>3</td><td>3</td><td>3</td><td>3</td><td>3</td><td>3</td><td>3</td><td>4</td><td>5</td><td>7</td><td>9</td><td>11</td><td>13</td><td>15</td><td>18</td><td>21</td><td></td></tr>
            <tr><td>41–45</td><td>3</td><td>3</td><td>3</td><td>3</td><td>3</td><td>3</td><td>3</td><td>3</td><td>3</td><td>3</td><td>3</td><td>4</td><td>5</td><td>7</td><td>9</td><td>11</td><td>13</td><td>15</td><td>18</td><td></td></tr>
            <tr><td>46–50</td><td>3</td><td>3</td><td>3</td><td>3</td><td>3</td><td>3</td><td>3</td><td>3</td><td>3</td><td>3</td><td>3</td><td>3</td><td>4</td><td>5</td><td>7</td><td>9</td><td>11</td><td>13</td><td>15</td><td></td></tr>
            <tr><td>51–55</td><td>3</td><td>3</td><td>3</td><td>3</td><td>3</td><td>3</td><td>3</td><td>3</td><td>3</td><td>3</td><td>3</td><td>3</td><td>3</td><td>4</td><td>5</td><td>7</td><td>9</td><td>11</td><td>13</td><td></td></tr>
            <tr><td>56–60</td><td>3</td><td>3</td><td>3</td><td>3</td><td>3</td><td>3</td><td>3</td><td>3</td><td>3</td><td>3</td><td>3</td><td>3</td><td>3</td><td>3</td><td>4</td><td>5</td><td>7</td><td>9</td><td>11</td><td></td></tr>
          </tbody>
        </table>
        </div>
        
        <h2>Result Table</h2>
        <p>Para ações de <strong>Evento de Resolução (ER)</strong> —iha dificuldade como <strong>Valor de Resultado (RV)</strong>.</p>
        <div class="table-container">
        <table class="ar-table">
          <thead>
            <tr><th>EV\\RV</th><th>x</th><th>0</th><th>1–2</th><th>3–4</th><th>5–6</th><th>7–8</th><th>9–10</th><th>11–12</th><th>13–15</th><th>16–18</th><th>19–21</th><th>22–24</th><th>25–27</th><th>28–30</th><th>31–35</th><th>36–40</th><th>41–45</th><th>46–50</th><th>51–55</th><th>56–60</th><th>+5</th></tr>
          </thead>
          <tbody>
            <tr><td>1–2</td><td>+1</td><td>A</td><td>1</td><td>N</td><td>N</td><td>N</td><td>N</td><td>N</td><td>N</td><td>N</td><td>N</td><td>N</td><td>N</td><td>N</td><td>N</td><td>N</td><td>N</td><td>N</td><td>N</td><td>*</td></tr>
            <tr><td>3–4</td><td>+1</td><td>A</td><td>2</td><td>1</td><td>N</td><td>N</td><td>N</td><td>N</td><td>N</td><td>N</td><td>N</td><td>N</td><td>N</td><td>N</td><td>N</td><td>N</td><td>N</td><td>N</td><td>N</td><td>*</td></tr>
            <tr><td>5–6</td><td>+1</td><td>A</td><td>3</td><td>2</td><td>1</td><td>N</td><td>N</td><td>N</td><td>N</td><td>N</td><td>N</td><td>N</td><td>N</td><td>N</td><td>N</td><td>N</td><td>N</td><td>N</td><td>N</td><td>*</td></tr>
            <tr><td>7–8</td><td>+1</td><td>A</td><td>5</td><td>4</td><td>3</td><td>2</td><td>N</td><td>N</td><td>N</td><td>N</td><td>N</td><td>N</td><td>N</td><td>N</td><td>N</td><td>N</td><td>N</td><td>N</td><td>N</td><td>*</td></tr>
            <tr><td>9–10</td><td>+1</td><td>A</td><td>8</td><td>6</td><td>4</td><td>3</td><td>2</td><td>N</td><td>N</td><td>N</td><td>N</td><td>N</td><td>N</td><td>N</td><td>N</td><td>N</td><td>N</td><td>N</td><td>N</td><td>N</td><td>*</td></tr>
            <tr><td>11–12</td><td>+1</td><td>A</td><td>10</td><td>9</td><td>7</td><td>6</td><td>4</td><td>3</td><td>N</td><td>N</td><td>N</td><td>N</td><td>N</td><td>N</td><td>N</td><td>N</td><td>N</td><td>N</td><td>N</td><td>N</td><td>*</td></tr>
            <tr><td>13–15</td><td>+1</td><td>A</td><td>12</td><td>11</td><td>9</td><td>8</td><td>7</td><td>5</td><td>3</td><td>N</td><td>N</td><td>N</td><td>N</td><td>N</td><td>N</td><td>N</td><td>N</td><td>N</td><td>N</td><td>N</td><td>*</td></tr>
            <tr><td>16–18</td><td>+1</td><td>A</td><td>14</td><td>13</td><td>11</td><td>10</td><td>9</td><td>8</td><td>6</td><td>4</td><td>N</td><td>N</td><td>N</td><td>N</td><td>N</td><td>N</td><td>N</td><td>N</td><td>N</td><td>N</td><td>*</td></tr>
            <tr><td>19–21</td><td>+1</td><td>A</td><td>18</td><td>17</td><td>16</td><td>14</td><td>12</td><td>10</td><td>8</td><td>6</td><td>4</td><td>N</td><td>N</td><td>N</td><td>N</td><td>N</td><td>N</td><td>N</td><td>N</td><td>N</td><td>*</td></tr>
            <tr><td>22–24</td><td>+1</td><td>A</td><td>21</td><td>20</td><td>19</td><td>17</td><td>15</td><td>13</td><td>11</td><td>9</td><td>7</td><td>5</td><td>N</td><td>N</td><td>N</td><td>N</td><td>N</td><td>N</td><td>N</td><td>N</td><td>*</td></tr>
            <tr><td>25–27</td><td>+1</td><td>A</td><td>24</td><td>23</td><td>22</td><td>20</td><td>18</td><td>16</td><td>14</td><td>12</td><td>10</td><td>8</td><td>6</td><td>N</td><td>N</td><td>N</td><td>N</td><td>N</td><td>N</td><td>N</td><td>*</td></tr>
            <tr><td>28–30</td><td>+1</td><td>A</td><td>27</td><td>26</td><td>25</td><td>23</td><td>21</td><td>19</td><td>17</td><td>15</td><td>13</td><td>11</td><td>9</td><td>7</td><td>N</td><td>N</td><td>N</td><td>N</td><td>N</td><td>N</td><td>N</td><td>*</td></tr>
            <tr><td>31–35</td><td>+1</td><td>A</td><td>30</td><td>29</td><td>28</td><td>26</td><td>24</td><td>22</td><td>20</td><td>18</td><td>16</td><td>14</td><td>12</td><td>10</td><td>8</td><td>N</td><td>N</td><td>N</td><td>N</td><td>N</td><td>*</td></tr>
            <tr><td>36–40</td><td>+1</td><td>A</td><td>35</td><td>34</td><td>33</td><td>31</td><td>29</td><td>27</td><td>25</td><td>23</td><td>21</td><td>19</td><td>17</td><td>14</td><td>12</td><td>9</td><td>N</td><td>N</td><td>N</td><td>N</td><td>*</td></tr>
            <tr><td>41–45</td><td>+1</td><td>A</td><td>40</td><td>38</td><td>36</td><td>34</td><td>32</td><td>30</td><td>28</td><td>26</td><td>24</td><td>22</td><td>20</td><td>18</td><td>16</td><td>13</td><td>10</td><td>N</td><td>N</td><td>*</td></tr>
            <tr><td>46–50</td><td>+1</td><td>A</td><td>45</td><td>43</td><td>41</td><td>40</td><td>38</td><td>36</td><td>34</td><td>31</td><td>28</td><td>26</td><td>24</td><td>22</td><td>20</td><td>17</td><td>14</td><td>11</td><td>N</td><td>N</td><td>*</td></tr>
            <tr><td>51–55</td><td>+1</td><td>A</td><td>50</td><td>48</td><td>46</td><td>44</td><td>42</td><td>40</td><td>38</td><td>36</td><td>34</td><td>32</td><td>30</td><td>27</td><td>24</td><td>21</td><td>18</td><td>15</td><td>12</td><td>N</td><td>*</td></tr>
            <tr><td>56–60</td><td>+1</td><td>A</td><td>55</td><td>53</td><td>51</td><td>49</td><td>47</td><td>45</td><td>43</td><td>41</td><td>39</td><td>36</td><td>33</td><td>30</td><td>27</td><td>24</td><td>21</td><td>18</td><td>15</td><td>13</td><td>*</td></tr>
            <tr><td>+5</td><td></td><td>A</td><td>0</td><td>0</td><td>0</td><td>0</td><td>0</td><td>0</td><td>0</td><td>0</td><td>0</td><td>0</td><td>0</td><td>0</td><td>0</td><td>0</td><td>0</td><td>0</td><td>0</td><td>0</td><td>C</td></tr>
          </tbody>
        </table>
        </div>
        
        <h3>Legenda</h3>
        <ul>
          <li><strong>A</strong> = All (sucesso total)</li>
          <li><strong>C</strong> = Cancel (cancela o efeito)</li>
          <li><strong>N</strong> = No Effect (sem efeito)</li>
          <li><strong>*</strong> = regra especial</li>
          <li><strong>+5</strong> = deslocamento de uma coluna por cada +5</li>
        </ul>
        
        <p style="font-size: 0.7rem; color: var(--muted); margin-top: 10px;">Nota: Linha = seu valor (AV/EV), Coluna = dificuldade (OV/RV). Quanto MAIOR o número da coluna, MAIOR a dificuldade. Clique em uma célula para destacar linha e coluna.</p>
      `,
      acoes: `
        <h1>Ações — Tipos e Resolução</h1>
        <p>O sistema é estruturado em quatro camadas de resolução:</p>
        <ul>
          <li><strong>Ações de Oposição:</strong> há resistência ativa de outro objeto de jogo.</li>
          <li><strong>Ações de Manifestação:</strong> não há oposição direta, mas existe dificuldade de execução e de materialização do efeito.</li>
          <li><strong>Ações Automáticas:</strong> não exigem rolagem; servem para criar, reduzir ou remover efeitos e condições de forma simples.</li>
          <li><strong>Reações:</strong> ações automáticas executadas fora do turno do personagem, em resposta a um evento.</li>
        </ul>
        
        <h2>Terminologia</h2>
        <h3>Grau das Tags</h3>
        <p>O grau total de uma ação é o somatório dos graus de todas as tags utilizadas nela.</p>
        <p><strong>Exemplo:</strong> usar uma tag de grau 3 e uma de grau 2 resulta em grau total 5.</p>
        
        <h3>Objeto de Jogo</h3>
        <p>Qualquer entidade ou elemento relevante em mesa: personagem, aliado, inimigo, construto, estrutura, área, ambiente.</p>
        
        <h3>Cena</h3>
        <p>Unidade narrativa de tempo que corresponde a um evento dramático contínuo: um combate, uma negociação, uma fuga. A cena termina quando o contexto dramático se resolve ou muda fundamentalmente. Para fins de duração, uma cena equivale a aproximadamente <strong>8 APs de tempo</strong> (15 minutos narrativos).</p>
        
        <h3>Turno</h3>
        <p>Unidade de resolução dentro de uma cena estruturada. Tags consumidas em um turno ficam indisponíveis até o início do próximo turno do mesmo personagem.</p>
        
        <h2>Tipos de Ação</h2>
        <h3>Ações de Oposição</h3>
        <p>São ações em que existe resistência ativa de outro objeto de jogo ou força contrária.</p>
        <ul>
          <li>Usam <strong>AV/EV</strong> do agente.</li>
          <li>Usam <strong>OV/RV</strong> da oposição.</li>
          <li>Seguem a resolução normal por RAPs.</li>
          <li>Apropriadas para ataques, bloqueios, disputas, resistências e confrontos diretos.</li>
          <li>Geram primariamente <strong>condições</strong> no alvo.</li>
        </ul>
        
        <h3>Ações de Manifestação</h3>
        <p>São ações sem oposição direta, nas quais o desafio está na execução, na complexidade e na materialização do resultado.</p>
        <ul>
          <li>Iniciam em <strong>OV/RV 1</strong>.</li>
          <li>Recebem modificadores conforme a natureza da ação (ver <a href="#modificadores" data-page="modificadores">Modificadores</a>).</li>
          <li>Apropriadas para criar efeitos independentes, aplicar estados sem resistência ativa e produzir alterações relevantes no jogo.</li>
          <li>Geram primariamente <strong>efeitos</strong>.</li>
          <li>Podem também gerar <strong>condições</strong> em alvos que não oferecem resistência ativa.</li>
        </ul>
        
        <h3>Ações Automáticas</h3>
        <p>São ações sem rolagem.</p>
        <ul>
          <li>Podem criar novos efeitos ou condições.</li>
          <li>Podem reduzir efeitos ou condições existentes.</li>
          <li><strong>Não podem</strong> aumentar o grau de um efeito ou condição já existente.</li>
          <li>Devem respeitar a trivialidade da ação no contexto ficcional.</li>
          <li>Tags usadas em ações automáticas ficam indisponíveis até o próximo turno.</li>
        </ul>
        
        <h3>Reações</h3>
        <p>São ações automáticas executadas fora do turno do personagem, em resposta direta a um evento.</p>
        <ul>
          <li>Seguem todas as regras de ações automáticas.</li>
          <li>Consomem tags normalmente — essas tags ficam indisponíveis até o próximo turno do personagem.</li>
          <li>Podem ser usadas para interromper, reduzir ou anular efeitos e condições antes que se estabeleçam.</li>
        </ul>
        <p><strong>Atenção:</strong> uma reação não pode ser usada para criar uma condição ou efeito novo de forma ofensiva — apenas para responder a algo que está acontecendo.</p>
        
        <h2>Sistema de Resolução</h2>
        <h3>Ações de Oposição</h3>
        <p><strong>AV/EV</strong> = atributo base + grau total das tags utilizadas + bônus de condições favoráveis</p>
        <p><strong>OV/RV</strong> = atributo de resistência do alvo + modificadores situacionais + condições desfavoráveis ao agente</p>
        <p>O resultado gera <strong>RAPs</strong>. RAPs positivos indicam sucesso; RAPs negativos ou zero indicam falha.</p>
        
        <h3>Ações de Manifestação</h3>
        <p><strong>AV/EV</strong> = atributo base + grau total das tags utilizadas</p>
        <p><strong>OV/RV final</strong> = 1 + modificadores da ação + modificadores de posicionamento + modificadores circunstanciais</p>
        <p>Se a ação falhar (RAPs ≤ 0), o efeito não se estabelece ou apenas "pisca" sem se fixar.</p>
        
        <h3>Ações Automáticas e Reações</h3>
        <p>O valor do ajuste automático é igual ao <strong>grau total das tags gastas</strong>:</p>
        <ul>
          <li>1 tag de grau 2 = 2 APs de ajuste</li>
          <li>2 tags de grau 1 cada = 2 APs de ajuste</li>
          <li>1 tag de grau 3 + 1 de grau 1 = 4 APs de ajuste</li>
        </ul>
        <p>O ajuste pode criar, reduzir ou remover condições e efeitos cujo grau atual seja <strong>igual ou menor</strong> ao valor do ajuste.</p>
      `,
      tags: `
        <h1>Tags</h1>
        <h2>Definição</h2>
        <p>Tags são descritores mecânicos vinculados a temas do personagem. Cada tag tem um <strong>grau numérico</strong> que representa sua potência.</p>
        
        <h2>Uso de Tags</h2>
        <p>Cada tag usada em uma ação é considerada <strong>gasta</strong> e não pode ser reutilizada até o próximo turno do personagem, independentemente do tipo de ação.</p>
        <p>As tags podem ser usadas para:</p>
        <ul>
          <li>aumentar <strong>AV/EV</strong> em ações de oposição</li>
          <li>compor o <strong>grau total</strong> em manifestações e automáticas</li>
          <li>criar, reduzir ou remover estados em ações automáticas</li>
        </ul>
        
        <h2>Tags e AV/EV</h2>
        <p>Em qualquer ação que exija rolagem, o AV/EV é calculado como:</p>
        <p><strong>AV/EV = atributo base do personagem + grau total das tags utilizadas</strong></p>
        <p>O jogador escolhe quais tags usa antes de rolar. Tags relevantes ao contexto ficcional podem ser usadas; tags sem relação narrativa não podem.</p>
        
        <h2>Limite de Uso</h2>
        <p>Cada tag é consumida no uso. Nenhuma tag pode ser usada mais de uma vez no mesmo turno. Tags de diferentes temas podem ser combinadas na mesma ação, desde que haja justificativa narrativa.</p>
      `,
      condicoes: `
        <h1>Condições</h1>
        <h2>Limiar de Condição</h2>
        <p>Toda condição possui um <strong>limiar</strong> definido pelo valor do atributo de resistência correspondente à sua natureza:</p>
        <table>
          <thead><tr><th>Categoria</th><th>Atributo de Resistência</th></tr></thead>
          <tbody>
            <tr><td>Dano físico / estrutural</td><td>Corpo</td></tr>
            <tr><td>Dano mental / cognitivo</td><td>Mente</td></tr>
            <tr><td>Dano emocional / espiritual</td><td>Espírito</td></tr>
          </tbody>
        </table>
        <p>O <strong>limiar</strong> é o valor numérico em APs desse atributo no alvo.</p>
        <p><strong>Exemplo:</strong> se o alvo tem Corpo 5, o limiar de condições físicas é 5. RAPs acima de 5 geram promoções.</p>
        
        <h2>Aplicação</h2>
        <p>Condições são normalmente geradas por <strong>ações de oposição</strong>, mas podem também ser criadas por manifestações (quando o alvo não oferece resistência ativa) ou por ações automáticas.</p>
        <p>O <strong>grau máximo</strong> de uma condição criada em uma única ação é:</p>
        <p><strong>Grau máximo = EV + grau total das tags utilizadas</strong></p>
        <p>RAPs acima desse limite não aumentam o grau da condição — eles podem ser convertidos em promoções.</p>
        
        <h2>Acúmulo de Condições</h2>
        <ul>
          <li>Condições do <strong>mesmo tipo</strong> no mesmo alvo se <strong>somam</strong>: um Ferido-3 e um Ferido-4 resultam em Ferido-7.</li>
          <li>Condições de <strong>tipos diferentes</strong> coexistem e aplicam penalidades separadas.</li>
          <li>Quando o grau acumulado de uma condição excede o dobro do limiar do atributo, o alvo é <strong>incapacitado</strong> na categoria correspondente.</li>
        </ul>
        <p><strong>Exemplo:</strong> limiar Corpo 5 → acumular 10 ou mais APs em condições físicas = incapacitado fisicamente.</p>
        
        <h2>Duração</h2>
        <table>
          <thead><tr><th>Tipo</th><th>Descrição</th></tr></thead>
          <tbody>
            <tr><td>Temporária</td><td>dura um número de APs de tempo igual ao grau da condição</td></tr>
            <tr><td>Indefinida</td><td>permanece até ser removida por uma ação apropriada</td></tr>
            <tr><td>Permanente</td><td>altera a ficha do alvo de forma indefinida</td></tr>
          </tbody>
        </table>
        
        <h2>Modificadores de Duração na Criação</h2>
        <table>
          <thead><tr><th>Duração desejada</th><th>Modificador</th></tr></thead>
          <tbody>
            <tr><td>Temporária</td><td>+0</td></tr>
            <tr><td>Indefinida</td><td>+1 coluna</td></tr>
            <tr><td>Permanente</td><td>+3 colunas</td></tr>
          </tbody>
        </table>
        
        <h2>Remoção de Condições</h2>
        <ul>
          <li><strong>Ação automática:</strong> remove ou reduz condições em APs igual ao grau das tags gastas</li>
          <li><strong>Ação de manifestação:</strong> pode remover condições; OV/RV = grau atual da condição + modificadores de duração</li>
          <li><strong>Tempo:</strong> condições temporárias expiram naturalmente</li>
          <li><strong>Recuperação narrativa:</strong> a mesa pode permitir redução por repouso, cuidado ou contexto ficcional</li>
        </ul>
      `,
      efeitos: `
        <h1>Efeitos</h1>
        <h2>Limiar de Efeito</h2>
        <p>O limiar de um efeito é igual ao <strong>grau total das tags usadas</strong> para criá-lo.</p>
        <p><strong>Exemplo:</strong> criar um efeito com tags de grau 2 e 3 → limiar do efeito = 5.</p>
        
        <h2>Aplicação</h2>
        <p>Efeitos são normalmente gerados por <strong>ações de manifestação</strong>. O grau do efeito é determinado pelos RAPs obtidos na ação.</p>
        
        <h2>Duração</h2>
        <table>
          <thead><tr><th>Tipo</th><th>Descrição</th></tr></thead>
          <tbody>
            <tr><td>Temporária</td><td>dura um número de APs de tempo igual ao grau do efeito</td></tr>
            <tr><td>Indefinida</td><td>permanece até ser removida por uma ação apropriada</td></tr>
            <tr><td>Permanente</td><td>altera o estado do jogo de forma indefinida</td></tr>
          </tbody>
        </table>
        
        <h2>Remoção de Efeitos</h2>
        <ul>
          <li><strong>Ação automática:</strong> remove ou reduz o efeito em APs igual ao grau das tags gastas</li>
          <li><strong>Ação de manifestação:</strong> OV/RV = grau atual do efeito + modificadores de duração</li>
          <li><strong>Ação de oposição:</strong> possível se o efeito tiver um "agente" que pode ser contrariado</li>
        </ul>
      `,
      manifestacao: `
        <h1>Manifestação — Promoções e Fórmula</h1>
        <h2>Limiar de Manifestação e Promoções de Escopo</h2>
        <h3>Limiar Base de Manifestação</h3>
        <p><strong>Limiar base: 6</strong></p>
        <p>Quando o RAP de uma manifestação atinge ou ultrapassa 6, o efeito recebe uma <strong>promoção de escopo</strong> — uma melhoria qualitativa no alcance, amplitude, controle ou complexidade do efeito.</p>
        
        <h3>Progressão de Promoções de Escopo</h3>
        <table>
          <thead><tr><th>Promoção</th><th>Limiar de RAP</th></tr></thead>
          <tbody>
            <tr><td>1ª promoção</td><td>6</td></tr>
            <tr><td>2ª promoção</td><td>10</td></tr>
            <tr><td>3ª promoção</td><td>15</td></tr>
            <tr><td>4ª promoção</td><td>21</td></tr>
          </tbody>
        </table>
        <p>A progressão segue incrementos crescentes (+4, +5, +6…), representando que efeitos de escala superior são cada vez mais difíceis de alcançar.</p>
        
        <h3>Categorias de Promoção de Escopo</h3>
        <p>Cada promoção de escopo pode melhorar uma das seguintes dimensões do efeito:</p>
        <ul>
          <li><strong>duração</strong> (de temporária para indefinida, de indefinida para permanente)</li>
          <li><strong>amplitude</strong> (de 1 alvo para área, de área pequena para ampla)</li>
          <li><strong>alcance</strong> (de toque para curto, de curto para médio, etc.)</li>
          <li><strong>controle</strong> (de bruto para preciso)</li>
          <li><strong>complexidade</strong> (de simples para duplo, etc.)</li>
          <li><strong>ocultação</strong> (de visível para discreto, etc.)</li>
          <li><strong>comportamento</strong> (adiciona efeito secundário, encadeamento, etc.)</li>
        </ul>
        
        <h3>Regra de Identidade</h3>
        <p>A promoção <strong>não altera o grau numérico</strong> base do efeito. Ela altera a qualidade e a forma como o efeito se manifesta no jogo.</p>
        
        <h2>Promoções por RAP Excedente</h2>
        <h3>Custo de Promoção</h3>
        <table>
          <thead><tr><th>Nível</th><th>Custo em RAPs excedentes</th><th>Efeito</th></tr></thead>
          <tbody>
            <tr><td>Básico</td><td>3 RAPs</td><td>melhoria menor na dimensão escolhida</td></tr>
            <tr><td>Intermediário</td><td>5 RAPs</td><td>melhoria moderada</td></tr>
            <tr><td>Avançado</td><td>7 RAPs</td><td>melhoria significativa</td></tr>
          </tbody>
        </table>
        
        <h3>Dimensões Disponíveis para Promoção por RAP</h3>
        <p>Cada compra melhora uma dimensão independente: amplitude, alcance, controle, complexidade, ocultação, duração.</p>
        <p>Cada dimensão deve ser comprada separadamente. Não é possível concentrar todos os RAPs em uma única dimensão além do nível avançado.</p>
        
        <h3>Relação com Promoções de Escopo</h3>
        <p>As promoções de escopo são concedidas automaticamente ao atingir os limiares. As promoções por RAP são opcionais e exigem gasto deliberado de RAPs excedentes. Ambas podem coexistir na mesma ação.</p>
        
        <h2>Fórmula Geral de Manifestação</h2>
        <p><strong>OV/RV = 1 + modificadores da ação + modificadores de posicionamento + modificadores circunstanciais</strong></p>
        <p>Se o valor final for muito alto, a ação se torna mais difícil, mais rara e mais sujeita a falha. A mesa pode definir um teto razoável para o total de modificadores (recomendado: máximo +8 em modificadores de ação, sem teto nos demais).</p>
      `,
      acoesautomaticas: `
        <h1>Ações Automáticas e Reações</h1>
        <h2>Ações Automáticas</h2>
        <h3>O que Podem Fazer</h3>
        <ul>
          <li>criar novos efeitos com grau igual ao total de tags gastas</li>
          <li>criar novas condições com grau igual ao total de tags gastas</li>
          <li>reduzir efeitos existentes em APs igual ao total de tags gastas</li>
          <li>reduzir condições existentes em APs igual ao total de tags gastas</li>
          <li>remover efeitos ou condições se o valor aplicado for maior ou igual ao grau atual</li>
        </ul>
        
        <h3>O que Não Podem Fazer</h3>
        <ul>
          <li><strong>aumentar</strong> o grau de uma condição ou efeito já existente</li>
          <li>substituir uma ação de oposição em situações que exigem resistência ativa</li>
          <li>ignorar a trivialidade ficcional da situação</li>
          <li>ser usadas para criar efeitos ofensivos fora do próprio turno (isso é exclusivo de reações defensivas)</li>
        </ul>
        
        <h3>Regras de Uso</h3>
        <ul>
          <li>cada tag usada em ação automática é gasta até o próximo turno</li>
          <li>ações automáticas podem ocorrer fora do turno, como <strong>reação</strong></li>
          <li>ações automáticas não usam rolagem</li>
        </ul>
        
        <h2>Reações</h2>
        <h3>Quando Ocorrem</h3>
        <p>Reações ocorrem <strong>imediatamente</strong> em resposta a um evento declarado, antes que ele se resolva completamente ou após sua resolução parcial (a critério da mesa).</p>
        
        <h3>Custo</h3>
        <ul>
          <li>consomem tags normalmente</li>
          <li>as tags consumidas ficam indisponíveis até o próximo turno do personagem</li>
        </ul>
        
        <h3>Limitações</h3>
        <ul>
          <li>não podem ser usadas para criar condições ou efeitos ofensivos</li>
          <li>só podem <strong>responder</strong> a algo que está acontecendo</li>
          <li>não interrompem ações de oposição já em resolução — apenas mitigam seus efeitos após os RAPs serem calculados</li>
        </ul>
        
        <h3>Cadeia de Reações</h3>
        <p>Se dois personagens tentam reagir ao mesmo evento, a ordem é determinada pelo <strong>valor de iniciativa</strong> ou pelo acordo narrativo da mesa.</p>
        
        <h2>Reutilização de Tags</h2>
        <p>Tags usadas em qualquer ação — de oposição, manifestação, automática ou reação — ficam <strong>indisponíveis</strong> até o início do próximo turno do personagem.</p>
        <p>Esta regra se aplica sem exceção. Não existe "tag que retorna no mesmo turno".</p>
      `,
      exemplo_resolucao: `
        <h1>Exemplo de Resolução Completo</h1>
        <p><strong>Situação:</strong> Jean Grey tenta criar um campo de força telepático para proteger aliados em uma zona de combate.</p>
        <p><strong>Tipo de ação:</strong> Manifestação (não há oposição direta)</p>
        <p><strong>Tags usadas:</strong> <em>Telepatia</em> grau 4 + <em>Escudo Psiônico</em> grau 3 → <strong>grau total = 7</strong></p>
        <p><strong>AV/EV:</strong> atributo mental base 8 + grau das tags 7 = <strong>15</strong></p>
        <p><strong>Modificadores ao OV/RV:</strong></p>
        <ul>
          <li>Amplitude: área pequena (+2)</li>
          <li>Alcance: curto (+1)</li>
          <li>Duração: cena (+2)</li>
          <li>Controle: preciso (+2)</li>
          <li>Ocultação: visível (+0)</li>
          <li>Posicionamento: usuário estável (-1)</li>
          <li>Circunstancial: foco total (-1)</li>
        </ul>
        <p><strong>OV/RV final:</strong> 1 + 2 + 1 + 2 + 2 + 0 + (-1) + (-1) = <strong>6</strong></p>
        <p><strong>Resultado:</strong> rola e obtém RAPs 9.</p>
        <ul>
          <li>Grau do efeito = 9</li>
          <li>Limiar do efeito = 7 (grau total das tags)</li>
          <li>RAPs excedentes = 9 − 7 = <strong>2 RAPs excedentes</strong></li>
          <li>Limiar de manifestação: 9 ≥ 6 → <strong>1ª promoção de escopo</strong> (Jean escolhe estender para duradoura)</li>
          <li>2 RAPs excedentes: não suficientes para promoção por RAP (mínimo 3)</li>
        </ul>
        <p><strong>Resultado final:</strong> campo de força psiônico de grau 9, cobrindo área pequena, com duração duradoura, precisamente controlado.</p>
      `,
      principios: `
        <h1>Princípios Gerais e Resumo</h1>
        <h2>Princípios Gerais</h2>
        <ul>
          <li>O grau das tags define a <strong>escala básica</strong> da ação e o limiar de promoção.</li>
          <li>Condições são aplicadas a objetos de jogo e somam-se entre si.</li>
          <li>Efeitos existem de forma independente na cena.</li>
          <li>Ações de oposição resolvem <strong>conflito direto</strong>.</li>
          <li>Ações de manifestação resolvem <strong>criação de efeitos</strong> sem oposição ativa.</li>
          <li>Ações automáticas resolvem <strong>ajustes simples</strong> sem rolagem.</li>
          <li>Reações são automáticas, executadas fora do turno, apenas em resposta.</li>
          <li>RAPs excedentes compram duração e promoções.</li>
          <li>Promoções de escopo modificam <strong>qualidade</strong>, não apenas quantidade.</li>
          <li>Tags gastas só retornam no próximo turno.</li>
          <li>A trivialidade ficcional sempre prevalece sobre a mecânica.</li>
        </ul>
        
        <h2>Resumo Operacional</h2>
        <ol>
          <li>Identifique o tipo de ação (oposição / manifestação / automática / reação)</li>
          <li>Escolha as tags; some o grau total</li>
          <li>Calcule AV/EV: atributo base + grau total das tags</li>
          <li>Determine OV/RV: resistência do alvo (oposição) ou 1 + modificadores (manifestação)</li>
          <li>Resolva pela tabela AV/OV ou EV/RV</li>
          <li>Converta RAPs em grau de condição ou efeito</li>
          <li>Verifique se RAPs excedem o limiar → aplique promoções</li>
          <li>Verifique se RAPs ≥ 6 em manifestação → aplique promoção de escopo</li>
          <li>Declare duração e gaste tags utilizadas até o próximo turno</li>
        </ol>
        
        <h2>Intenção do Sistema</h2>
        <p>Este sistema foi desenhado para:</p>
        <ul>
          <li>preservar a <strong>leitura narrativa</strong> do jogo;</li>
          <li>dar <strong>peso mecânico real</strong> às tags;</li>
          <li>separar claramente <strong>criação, resistência e manutenção</strong> de efeitos;</li>
          <li>permitir efeitos simples e complexos <strong>sem mudar a estrutura central</strong>;</li>
          <li>tornar as <strong>promoções</strong> uma ferramenta de expressão narrativa, não apenas numérica;</li>
          <li>manter o jogo rápido, mas com espaço para <strong>alta escala</strong> de poder.</li>
        </ul>
      `,
      objetos: `
        <h1>Objetos de Jogo — Regras de Criação e Uso</h1>
        <p>Esta seção define as regras gerais para criar, adquirir, usar e <strong>destruir objetos de jogo</strong>: equipamentos, armas, armaduras, gadgets, artefatos, veículos, construtos e qualquer item com relevância mecânica.</p>
        
        <h2>O que é um Objeto de Jogo</h2>
        <p>Um objeto de jogo é qualquer item físico ou construto que:</p>
        <ul>
          <li>concede <strong>tags</strong> ao portador ou usuário;</li>
          <li>possui <strong>atributos próprios</strong> (Estrutura, Potência, Complexidade);</li>
          <li>pode receber <strong>condições</strong> (dano, degradação, sobrecarga);</li>
          <li>pode ser destruído, roubado, modificado ou aprimorado.</li>
        </ul>
        
        <h2>Anatomia de um Objeto</h2>
        <p>Todo objeto é definido por três elementos:</p>
        <ul>
          <li><strong>Tags do Objeto</strong> — capacidades concretas que o objeto oferece (cada tag tem grau e descritor narrativo).</li>
          <li><strong>Atributos do Objeto</strong> — Estrutura (resistência física), Potência (escala máx de efeito), Complexidade (número de tags).</li>
          <li><strong>Limiar de Dano</strong> — igual ao valor de Estrutura.</li>
        </ul>
        
        <h2>Categorias de Objetos</h2>
        <table>
          <thead><tr><th>Grau Total</th><th>Categoria</th><th>Exemplos</th></tr></thead>
          <tbody>
            <tr><td>1–4</td><td>Comum</td><td>faca, escudo improvisado, kit médico</td></tr>
            <tr><td>5–9</td><td>Profissional</td><td>armadura tática, arma de fogo, equipamento especializado</td></tr>
            <tr><td>10–15</td><td>Excepcional</td><td>armadura experimental, gadget de alta tecnologia</td></tr>
            <tr><td>16–22</td><td>Raro</td><td>equipamento de nível mundial, relíquia de poder</td></tr>
            <tr><td>23+</td><td>Lendário</td><td>item de escala cósmica, construto Ômega</td></tr>
          </tbody>
        </table>
        
        <h2>Criação de Objetos</h2>
        <p>Criar um objeto é uma <strong>ação de manifestação</strong> com:</p>
        <ul>
          <li><strong>OV/RV base = grau total desejado do objeto</strong></li>
          <li><strong>Modificadores:</strong> Complexidade (+0 a +3), Material (+0 a +3), Ferramentas (+0 a +2), Tempo (+0 a +3), Simplificações (−1)</li>
        </ul>
        <p><strong>Tempo de criação:</strong> minutos (1–4), horas (5–9), dias (10–15), semanas (16–22), meses+ (23+).</p>
        
        <h2>Uso de Objetos em Ações</h2>
        <p>Tags do objeto contribuem ao AV/EV do usuário: <code>AV/EV = atributo base + tags do personagem + tags do objeto</code>. Tags do objeto são gastas até o próximo turno.</p>
        
        <h2>Dano e Destruição</h2>
        <p>Objetos podem receber condições. Categorias:</p>
        <ul>
          <li><strong>Grau 1–3:</strong> redução de −1 no grau de todas as tags</li>
          <li><strong>Grau 4–6:</strong> redução de −2 nas tags; uma tag pode ser desativada</li>
          <li><strong>Grau 7–9:</strong> metade das tags desativadas; objeto opera com dificuldade</li>
          <li><strong>≥ limiar Estrutura:</strong> objeto <strong>destruído</strong></li>
        </ul>
        
        <h2>Reparo de Objetos</h2>
        <p>Reparo é ação de manifestação: <code>OV/RV = grau atual da condição + modificadores</code>. RAPs do reparo reduzem o grau da condição.</p>
        
        <h2>Aprimoramento</h2>
        <ul>
          <li><strong>Aumentar tag:</strong> OV/RV = grau atual da tag + 2</li>
          <li><strong>Adicionar nova tag:</strong> OV/RV = grau total atual + grau desejado da nova tag</li>
        </ul>
        
        <h2>Objetos Especiais</h2>
        <ul>
          <li><strong>Objetos Únicos:</strong> relíquias e artefatos — destruição permanente, tag de Identidade intransferível.</li>
          <li><strong>Construtos:</strong> objetos com autonomia (robôs, golens, IA) — possuem atributo de Autonomia.</li>
          <li><strong>Veículos:</strong> escala maior — tag Velocidade (grau em APs), tag Carga.</li>
        </ul>
      `,
      aps_distancia: `
        <h1>APs de Referência — Distância</h1>
        <table>
          <thead><tr><th>APs</th><th>Exemplo</th><th>Velocidade (km/h)</th><th>Comparativo</th></tr></thead>
          <tbody>
            <tr><td>-9</td><td>5 mm</td><td>—</td><td>espessura de um grão</td></tr>
            <tr><td>-5</td><td>7,6 cm</td><td>—</td><td>velocidade de um caramujo</td></tr>
            <tr><td>-4</td><td>15 cm</td><td>—</td><td>preguiça se movendo</td></tr>
            <tr><td>-3</td><td>30 cm</td><td>—</td><td>jabuti andando</td></tr>
            <tr><td>-2</td><td>76 cm</td><td>—</td><td>passo muito curto</td></tr>
            <tr><td>-1</td><td>1,5 m</td><td>1,25</td><td>caminhada lenta</td></tr>
            <tr><td>0</td><td>3 m</td><td>2,5</td><td>deslocamento casual</td></tr>
            <tr><td>1</td><td>6 m</td><td>5</td><td>caminhada humana</td></tr>
            <tr><td>2</td><td>12 m</td><td>10</td><td>corrida leve</td></tr>
            <tr><td>3</td><td>24 m</td><td>20</td><td>natação rápida</td></tr>
            <tr><td>4</td><td>45 m</td><td>40</td><td>corrida máxima humana</td></tr>
            <tr><td>5</td><td>91 m</td><td>80</td><td>veículo leve / animal veloz</td></tr>
            <tr><td>6</td><td>183 m</td><td>160</td><td>animal mais rápido em terra</td></tr>
            <tr><td>7</td><td>380 m</td><td>320</td><td>veículo de alta performance</td></tr>
            <tr><td>8</td><td>760 m</td><td>640</td><td>aeronave leve</td></tr>
            <tr><td>9</td><td>1,5 km</td><td>1.200</td><td>velocidade do som</td></tr>
            <tr><td>10</td><td>3 km</td><td>2.400</td><td>projétil de alta velocidade</td></tr>
            <tr><td>11</td><td>5 km</td><td>4.800</td><td>aeronave supersônica</td></tr>
            <tr><td>12</td><td>11 km</td><td>10.000</td><td>míssil moderno</td></tr>
            <tr><td>13</td><td>24 km</td><td>20.000</td><td>saída da atmosfera</td></tr>
            <tr><td>14</td><td>45 km</td><td>40.000</td><td>velocidade de escape</td></tr>
            <tr><td>15</td><td>90 km</td><td>80.000</td><td>voo orbital baixo</td></tr>
            <tr><td>16</td><td>180 km</td><td>160.000</td><td>deslocamento orbital</td></tr>
            <tr><td>17</td><td>360 km</td><td>—</td><td>viagem entre cidades</td></tr>
            <tr><td>18</td><td>700 km</td><td>—</td><td>escala regional</td></tr>
            <tr><td>19</td><td>1.400 km</td><td>—</td><td>viagem entre estados</td></tr>
            <tr><td>20</td><td>2.800 km</td><td>—</td><td>atravessar país</td></tr>
            <tr><td>21</td><td>5.600 km</td><td>—</td><td>viagem transcontinental</td></tr>
            <tr><td>22</td><td>11.000 km</td><td>—</td><td>atravessar oceano</td></tr>
            <tr><td>23</td><td>22.000 km</td><td>—</td><td>metade do planeta</td></tr>
            <tr><td>24</td><td>44.000 km</td><td>—</td><td>circunferência da Terra</td></tr>
            <tr><td>25</td><td>88.000 km</td><td>—</td><td>órbita alta</td></tr>
            <tr><td>26</td><td>176.000 km</td><td>—</td><td>espaço próximo</td></tr>
            <tr><td>27</td><td>350.000 km</td><td>—</td><td>escala lunar parcial</td></tr>
            <tr><td>28</td><td>700.000 km</td><td>—</td><td>distância Terra–Lua</td></tr>
            <tr><td>29</td><td>1,4 milhão km</td><td>—</td><td>velocidade da luz (escala abstrata)</td></tr>
            <tr><td>30</td><td>3 milhões km</td><td>—</td><td>espaço profundo próximo</td></tr>
            <tr><td>31</td><td>6 milhões km</td><td>—</td><td>órbita planetária larga</td></tr>
            <tr><td>32</td><td>12 milhões km</td><td>—</td><td>escala interplanetária</td></tr>
            <tr><td>33</td><td>25 milhões km</td><td>—</td><td>órbita de planeta interno</td></tr>
            <tr><td>34</td><td>50 milhões km</td><td>—</td><td>distância entre planetas</td></tr>
            <tr><td>35</td><td>100 milhões km</td><td>—</td><td>escala solar interna</td></tr>
            <tr><td>36</td><td>200 milhões km</td><td>—</td><td>órbita planetária média</td></tr>
            <tr><td>37</td><td>400 milhões km</td><td>—</td><td>escala sistema solar</td></tr>
            <tr><td>38</td><td>800 milhões km</td><td>—</td><td>além de órbitas internas</td></tr>
            <tr><td>39</td><td>1,6 bilhão km</td><td>—</td><td>sistema solar externo</td></tr>
            <tr><td>40</td><td>3 bilhões km</td><td>—</td><td>limite do sistema solar</td></tr>
            <tr><td>41</td><td>6 bilhões km</td><td>—</td><td>espaço interestelar próximo</td></tr>
            <tr><td>42</td><td>12 bilhões km</td><td>—</td><td>borda do sistema</td></tr>
            <tr><td>43</td><td>25 bilhões km</td><td>—</td><td>espaço profundo</td></tr>
            <tr><td>44</td><td>50 bilhões km</td><td>—</td><td>escala interestelar</td></tr>
            <tr><td>45</td><td>100 bilhões km</td><td>—</td><td>viagem interestelar inicial</td></tr>
            <tr><td>46</td><td>200 bilhões km</td><td>—</td><td>distâncias entre estrelas próximas</td></tr>
            <tr><td>47</td><td>400 bilhões km</td><td>—</td><td>escala estelar</td></tr>
            <tr><td>48</td><td>800 bilhões km</td><td>—</td><td>múltiplos sistemas</td></tr>
            <tr><td>49</td><td>1,6 trilhão km</td><td>—</td><td>braço galáctico</td></tr>
            <tr><td>50</td><td>3 trilhões km</td><td>—</td><td>sistema estelar distante</td></tr>
            <tr><td>51</td><td>—</td><td>—</td><td>1 ano-luz</td></tr>
            <tr><td>52+</td><td>—</td><td>—</td><td>escala interestelar avançada</td></tr>
            <tr><td>60+</td><td>—</td><td>—</td><td>escala galáctica</td></tr>
            <tr><td>70+</td><td>—</td><td>—</td><td>extensão de uma galáxia</td></tr>
          </tbody>
        </table>
      `,
      aps_mass: `
        <h1>APs de Referência — Massa</h1>
        <table>
          <thead><tr><th>APs</th><th>Exemplo</th><th>Comparativo</th></tr></thead>
          <tbody>
            <tr><td>-13</td><td>~2 g</td><td>inseto muito leve</td></tr>
            <tr><td>-9</td><td>~30 g</td><td>pequeno roedor / objeto leve</td></tr>
            <tr><td>-7</td><td>~125 g</td><td>celular / fruta</td></tr>
            <tr><td>-5</td><td>~450 g</td><td>pacote pequeno</td></tr>
            <tr><td>-4</td><td>1 kg</td><td>litro de água</td></tr>
            <tr><td>-2</td><td>~4,5 kg</td><td>animal pequeno / equipamento leve</td></tr>
            <tr><td>-1</td><td>~8 kg</td><td>gato</td></tr>
            <tr><td>0</td><td>~22 kg</td><td>saco pesado / cão médio</td></tr>
            <tr><td>1</td><td>~45 kg</td><td>criança</td></tr>
            <tr><td>2</td><td>~90 kg</td><td>humano adulto</td></tr>
            <tr><td>3</td><td>~180 kg</td><td>grande animal</td></tr>
            <tr><td>4</td><td>~340 kg</td><td>objeto pesado / estrutura leve</td></tr>
            <tr><td>5</td><td>~680 kg</td><td>grande animal / carga pesada</td></tr>
            <tr><td>6</td><td>~1,5 t</td><td>veículo pequeno</td></tr>
            <tr><td>7</td><td>~3 t</td><td>animal muito grande</td></tr>
            <tr><td>8</td><td>~6 t</td><td>veículo pesado</td></tr>
            <tr><td>9</td><td>~13 t</td><td>máquina industrial</td></tr>
            <tr><td>10</td><td>~25 t</td><td>veículo blindado leve</td></tr>
            <tr><td>11</td><td>~50 t</td><td>caminhão carregado</td></tr>
            <tr><td>12</td><td>~100 t</td><td>aeronave pequena</td></tr>
            <tr><td>13</td><td>~200 t</td><td>aeronave grande</td></tr>
            <tr><td>14</td><td>~400 t</td><td>transporte pesado</td></tr>
            <tr><td>15</td><td>~800 t</td><td>estrutura massiva</td></tr>
            <tr><td>16</td><td>~1.500 t</td><td>árvore gigante / estrutura natural</td></tr>
            <tr><td>17</td><td>~3.000 t</td><td>pequena construção</td></tr>
            <tr><td>18</td><td>~6.000 t</td><td>edifício pequeno</td></tr>
            <tr><td>19</td><td>~12.000 t</td><td>grande estrutura metálica</td></tr>
            <tr><td>20</td><td>~25.000 t</td><td>monumento pesado</td></tr>
            <tr><td>21</td><td>~50.000 t</td><td>navio médio</td></tr>
            <tr><td>22</td><td>~100.000 t</td><td>trem de carga</td></tr>
            <tr><td>23</td><td>~200.000 t</td><td>grande estrutura urbana</td></tr>
            <tr><td>24</td><td>~400.000 t</td><td>arranha-céu</td></tr>
            <tr><td>25</td><td>~800.000 t</td><td>megaestrutura</td></tr>
            <tr><td>26</td><td>~1,5 milhão t</td><td>grande volume de água</td></tr>
            <tr><td>27</td><td>~3 milhões t</td><td>formação rochosa</td></tr>
            <tr><td>28</td><td>~6 milhões t</td><td>pirâmide ou estrutura maciça</td></tr>
            <tr><td>29</td><td>~10 milhões t</td><td>massa industrial acumulada</td></tr>
            <tr><td>30</td><td>~13 milhões t</td><td>pequena montanha</td></tr>
            <tr><td>31</td><td>~26 milhões t</td><td>colina grande</td></tr>
            <tr><td>32</td><td>~52 milhões t</td><td>estrutura continental</td></tr>
            <tr><td>33</td><td>~100 milhões t</td><td>massa geológica</td></tr>
            <tr><td>34</td><td>~200 milhões t</td><td>crosta terrestre localizada</td></tr>
            <tr><td>35</td><td>~400 milhões t</td><td>população global (ordem de grandeza)</td></tr>
            <tr><td>36</td><td>~800 milhões t</td><td>biomassa global parcial</td></tr>
            <tr><td>37</td><td>~1,6 bilhões t</td><td>biomassa oceânica</td></tr>
            <tr><td>38</td><td>~3 bilhões t</td><td>produção global anual</td></tr>
            <tr><td>39</td><td>~6 bilhões t</td><td>escala industrial global</td></tr>
            <tr><td>40</td><td>~12 bilhões t</td><td>massa regional massiva</td></tr>
            <tr><td>41</td><td>~25 bilhões t</td><td>estrutura continental grande</td></tr>
            <tr><td>42</td><td>~50 bilhões t</td><td>montanha massiva</td></tr>
            <tr><td>43</td><td>~100 bilhões t</td><td>grande formação geológica</td></tr>
            <tr><td>44</td><td>~200 bilhões t</td><td>crosta terrestre ampla</td></tr>
            <tr><td>45</td><td>~400 bilhões t</td><td>placa tectônica parcial</td></tr>
            <tr><td>46</td><td>~800 bilhões t</td><td>asteroide pequeno</td></tr>
            <tr><td>47</td><td>~1,6 trilhões t</td><td>asteroide médio</td></tr>
            <tr><td>48</td><td>~3 trilhões t</td><td>corpo celeste pequeno</td></tr>
            <tr><td>49</td><td>~6 trilhões t</td><td>lua pequena</td></tr>
            <tr><td>50</td><td>~12 trilhões t</td><td>satélite natural</td></tr>
            <tr><td>60+</td><td>—</td><td>escala planetária</td></tr>
            <tr><td>70+</td><td>—</td><td>planeta</td></tr>
            <tr><td>90+</td><td>—</td><td>estrela</td></tr>
          </tbody>
        </table>
      `,
      aps_tempo: `
        <h1>APs de Referência — Tempo</h1>
        <table>
          <thead><tr><th>APs</th><th>Tempo</th><th>Exemplo</th></tr></thead>
          <tbody>
            <tr><td>-2</td><td>1 segundo</td><td>reação instantânea</td></tr>
            <tr><td>-1</td><td>2 segundos</td><td>ação muito rápida</td></tr>
            <tr><td>0</td><td>4 segundos</td><td>um turno básico</td></tr>
            <tr><td>1</td><td>8 segundos</td><td>troca rápida de ação</td></tr>
            <tr><td>2</td><td>15 segundos</td><td>interação breve</td></tr>
            <tr><td>3</td><td>30 segundos</td><td>pequena tarefa</td></tr>
            <tr><td>4</td><td>1 minuto</td><td>ação sustentada curta</td></tr>
            <tr><td>5</td><td>2 minutos</td><td>preparação simples</td></tr>
            <tr><td>6</td><td>4 minutos</td><td>tarefa breve</td></tr>
            <tr><td>7</td><td>8 minutos</td><td>cena rápida</td></tr>
            <tr><td>8</td><td>15 minutos</td><td>interação social ou planejamento curto</td></tr>
            <tr><td>9</td><td>30 minutos</td><td>exploração limitada</td></tr>
            <tr><td>10</td><td>1 hora</td><td>tarefa significativa</td></tr>
            <tr><td>11</td><td>2 horas</td><td>operação curta</td></tr>
            <tr><td>12</td><td>4 horas</td><td>metade de um turno de trabalho</td></tr>
            <tr><td>13</td><td>8 horas</td><td>um período completo de atividade</td></tr>
            <tr><td>14</td><td>15 horas</td><td>esforço prolongado</td></tr>
            <tr><td>15</td><td>1 dia</td><td>ciclo completo</td></tr>
            <tr><td>16</td><td>2 dias</td><td>sobrevivencia sem recursos</td></tr>
            <tr><td>17</td><td>4 dias</td><td>limite físico prolongado</td></tr>
            <tr><td>18</td><td>1 semana</td><td>projeto simples</td></tr>
            <tr><td>19</td><td>2 semanas</td><td>tarefa estruturada</td></tr>
            <tr><td>20</td><td>1 mês</td><td>atividade contínua</td></tr>
            <tr><td>21</td><td>2 meses</td><td>processo longo</td></tr>
            <tr><td>22</td><td>4 meses</td><td>mudança significativa</td></tr>
            <tr><td>23</td><td>8 meses</td><td>ciclo biológico</td></tr>
            <tr><td>24</td><td>1 ano</td><td>período anual</td></tr>
            <tr><td>25</td><td>2 anos</td><td>desenvolvimento médio</td></tr>
            <tr><td>26</td><td>4 anos</td><td>ciclo de formação</td></tr>
            <tr><td>27</td><td>8 anos</td><td>crescimento prolongado</td></tr>
            <tr><td>28</td><td>15 anos</td><td>geração curta</td></tr>
            <tr><td>29</td><td>30 anos</td><td>geração humana</td></tr>
            <tr><td>30</td><td>60 anos</td><td>vida humana média</td></tr>
            <tr><td>31</td><td>120 anos</td><td>longevidade extrema</td></tr>
            <tr><td>32</td><td>250 anos</td><td>escala histórica</td></tr>
            <tr><td>33</td><td>500 anos</td><td>mudança cultural</td></tr>
            <tr><td>34</td><td>1.000 anos</td><td>civilizações</td></tr>
            <tr><td>35</td><td>2.000 anos</td><td>eras históricas</td></tr>
            <tr><td>36</td><td>4.000 anos</td><td>antiguidade</td></tr>
            <tr><td>37</td><td>8.000 anos</td><td>pré-história recente</td></tr>
            <tr><td>38</td><td>16.000 anos</td><td>mudanças climáticas antigas</td></tr>
            <tr><td>39</td><td>32.000 anos</td><td>evolução cultural</td></tr>
            <tr><td>40</td><td>64.000 anos</td><td>humanidade primitiva</td></tr>
            <tr><td>41</td><td>128.000 anos</td><td>espécie moderna</td></tr>
            <tr><td>42</td><td>256.000 anos</td><td>evolução humana</td></tr>
            <tr><td>43</td><td>500.000 anos</td><td>escala evolutiva</td></tr>
            <tr><td>44</td><td>1 milhão de anos</td><td>espécies</td></tr>
            <tr><td>45</td><td>2 milhões de anos</td><td>eras biológicas</td></tr>
            <tr><td>46</td><td>4 milhões de anos</td><td>evolução animal</td></tr>
            <tr><td>47</td><td>8 milhões de anos</td><td>linhagens</td></tr>
            <tr><td>48</td><td>16 milhões de anos</td><td>mudanças planetárias</td></tr>
            <tr><td>49</td><td>32 milhões de anos</td><td>eras geológicas</td></tr>
            <tr><td>50</td><td>64 milhões de anos</td><td>extinções em massa</td></tr>
            <tr><td>51</td><td>128 milhões de anos</td><td>evolução de ecossistemas</td></tr>
            <tr><td>52</td><td>256 milhões de anos</td><td>eras geológicas profundas</td></tr>
            <tr><td>53</td><td>500 milhões de anos</td><td>vida complexa</td></tr>
            <tr><td>54</td><td>1 bilhão de anos</td><td>evolução planetária</td></tr>
            <tr><td>55</td><td>2 bilhões de anos</td><td>formação de sistemas</td></tr>
            <tr><td>56</td><td>4 bilhões de anos</td><td>idade planetária</td></tr>
            <tr><td>57</td><td>8 bilhões de anos</td><td>escala cósmica</td></tr>
            <tr><td>58</td><td>16 bilhões de anos</td><td>idade do universo (ordem de grandeza)</td></tr>
            <tr><td>60+</td><td>—</td><td>escalas cosmológicas</td></tr>
            <tr><td>70+</td><td>—</td><td>ciclos universais</td></tr>
          </tbody>
        </table>
      `,
      aps_energia: `
        <h1>APs de Referência — Energia</h1>
        <table>
          <thead><tr><th>APs</th><th>Energia (J)</th><th>Exemplo</th></tr></thead>
          <tbody>
            <tr><td>-10</td><td>~1 J</td><td>impacto mínimo</td></tr>
            <tr><td>-9</td><td>~2 J</td><td>toque leve</td></tr>
            <tr><td>-8</td><td>~4 J</td><td>pequeno impacto</td></tr>
            <tr><td>-7</td><td>~8 J</td><td>batida fraca</td></tr>
            <tr><td>-6</td><td>~16 J</td><td>golpe leve</td></tr>
            <tr><td>-5</td><td>~32 J</td><td>esforço físico pequeno</td></tr>
            <tr><td>-4</td><td>~64 J</td><td>empurrão</td></tr>
            <tr><td>-3</td><td>~125 J</td><td>soco fraco</td></tr>
            <tr><td>-2</td><td>~250 J</td><td>impacto moderado</td></tr>
            <tr><td>-1</td><td>~500 J</td><td>soco forte</td></tr>
            <tr><td>0</td><td>~1.000 J</td><td>impacto humano significativo</td></tr>
            <tr><td>1</td><td>~2.000 J</td><td>golpe potente</td></tr>
            <tr><td>2</td><td>~4.000 J</td><td>impacto de arma leve</td></tr>
            <tr><td>3</td><td>~8.000 J</td><td>colisão leve</td></tr>
            <tr><td>4</td><td>~16.000 J</td><td>veículo em baixa velocidade</td></tr>
            <tr><td>5</td><td>~32.000 J</td><td>impacto forte</td></tr>
            <tr><td>6</td><td>~64.000 J</td><td>colisão severa</td></tr>
            <tr><td>7</td><td>~125.000 J</td><td>dano estrutural leve</td></tr>
            <tr><td>8</td><td>~250.000 J</td><td>destruição localizada</td></tr>
            <tr><td>9</td><td>~500.000 J</td><td>explosão pequena</td></tr>
            <tr><td>10</td><td>~1 MJ</td><td>granada</td></tr>
            <tr><td>11</td><td>~2 MJ</td><td>explosão forte</td></tr>
            <tr><td>12</td><td>~4 MJ</td><td>destruição de sala</td></tr>
            <tr><td>13</td><td>~8 MJ</td><td>colapso estrutural parcial</td></tr>
            <tr><td>14</td><td>~16 MJ</td><td>destruição de prédio pequeno</td></tr>
            <tr><td>15</td><td>~32 MJ</td><td>explosão massiva</td></tr>
            <tr><td>16</td><td>~64 MJ</td><td>destruição de quarteirão</td></tr>
            <tr><td>17</td><td>~125 MJ</td><td>devastação urbana</td></tr>
            <tr><td>18</td><td>~250 MJ</td><td>grande explosão</td></tr>
            <tr><td>19</td><td>~500 MJ</td><td>destruição extensa</td></tr>
            <tr><td>20</td><td>~1 GJ</td><td>devastação de larga escala</td></tr>
            <tr><td>21</td><td>~2 GJ</td><td>explosão massiva</td></tr>
            <tr><td>22</td><td>~4 GJ</td><td>destruição urbana pesada</td></tr>
            <tr><td>23</td><td>~8 GJ</td><td>múltiplos quarteirões</td></tr>
            <tr><td>24</td><td>~16 GJ</td><td>impacto massivo</td></tr>
            <tr><td>25</td><td>~32 GJ</td><td>destruição de distrito</td></tr>
            <tr><td>26</td><td>~64 GJ</td><td>devastação regional</td></tr>
            <tr><td>27</td><td>~125 GJ</td><td>impacto extremo</td></tr>
            <tr><td>28</td><td>~250 GJ</td><td>destruição massiva</td></tr>
            <tr><td>29</td><td>~500 GJ</td><td>impacto de grande escala</td></tr>
            <tr><td>30</td><td>~1 TJ</td><td>impacto catastrófico</td></tr>
            <tr><td>31</td><td>~2 TJ</td><td>devastação ampla</td></tr>
            <tr><td>32</td><td>~4 TJ</td><td>impacto geológico</td></tr>
            <tr><td>33</td><td>~8 TJ</td><td>ruptura massiva</td></tr>
            <tr><td>34</td><td>~16 TJ</td><td>destruição de área extensa</td></tr>
            <tr><td>35</td><td>~32 TJ</td><td>impacto sísmico</td></tr>
            <tr><td>36</td><td>~64 TJ</td><td>evento natural severo</td></tr>
            <tr><td>37</td><td>~125 TJ</td><td>desastre massivo</td></tr>
            <tr><td>38</td><td>~250 TJ</td><td>impacto continental leve</td></tr>
            <tr><td>39</td><td>~500 TJ</td><td>evento extremo</td></tr>
            <tr><td>40</td><td>~1 PJ</td><td>escala continental</td></tr>
            <tr><td>41</td><td>~2 PJ</td><td>impacto gigantesco</td></tr>
            <tr><td>42</td><td>~4 PJ</td><td>destruição continental</td></tr>
            <tr><td>43</td><td>~8 PJ</td><td>evento planetário leve</td></tr>
            <tr><td>44</td><td>~16 PJ</td><td>impacto planetário</td></tr>
            <tr><td>45</td><td>~32 PJ</td><td>devastação planetária</td></tr>
            <tr><td>46</td><td>~64 PJ</td><td>ruptura de crosta</td></tr>
            <tr><td>47</td><td>~125 PJ</td><td>impacto massivo global</td></tr>
            <tr><td>48</td><td>~250 PJ</td><td>evento de extinção</td></tr>
            <tr><td>49</td><td>~500 PJ</td><td>cataclismo global</td></tr>
            <tr><td>50</td><td>~1 EJ</td><td>escala planetária total</td></tr>
            <tr><td>55</td><td>~32 EJ</td><td>alteração global</td></tr>
            <tr><td>60</td><td>~1 ZJ</td><td>escala estelar inicial</td></tr>
            <tr><td>65</td><td>~32 ZJ</td><td>energia estelar</td></tr>
            <tr><td>70</td><td>~1 YJ</td><td>escala estelar massiva</td></tr>
          </tbody>
        </table>
      `,
      sistema_hibrido: `
        <h1>Sistema Híbrido — Ações, Tags, Condições e Efeitos</h1>
        <h2>Fundamento do Sistema</h2>
        <p>O sistema é estruturado em quatro camadas de resolução:</p>
        <ul>
          <li><strong>Ações de Oposição:</strong> há resistência ativa de outro objeto de jogo.</li>
          <li><strong>Ações de Manifestação:</strong> não há oposição direta, mas existe dificuldade de execução e de materialização do efeito.</li>
          <li><strong>Ações Automáticas:</strong> não exigem rolagem; servem para criar, reduzir ou remover efeitos e condições de forma simples.</li>
          <li><strong>Reações:</strong> ações automáticas executadas fora do turno do personagem, em resposta a um evento.</li>
        </ul>
        
        <h2>Terminologia</h2>
        <h3>Grau das Tags</h3>
        <p>O grau total de uma ação é o somatório dos graus de todas as tags utilizadas nela.</p>
        <p><strong>Exemplo:</strong> usar uma tag de grau 3 e uma de grau 2 resulta em grau total 5.</p>
        
        <h3>Objeto de Jogo</h3>
        <p>Qualquer entidade ou elemento relevante em mesa: personagem, aliado, inimigo, construto, estrutura, área, ambiente.</p>
        
        <h3>Condição</h3>
        <p>Estado anexado a um objeto de jogo que impacta diretamente um ou mais atributos do alvo. Condições são sempre vinculadas a um objeto.</p>
        
        <h3>Efeito</h3>
        <p>Entidade com existência independente, capaz de afetar um ou mais objetos de jogo. Efeitos não pertencem a nenhum objeto específico — eles existem no espaço da cena.</p>
        
        <h3>Cena</h3>
        <p>Unidade narrativa de tempo que corresponde a um evento dramático contínuo: um combate, uma negociação, uma fuga. A cena termina quando o contexto dramático se resolve ou muda fundamentalmente. Para fins de duração, uma cena equivale a aproximadamente <strong>8 APs de tempo</strong> (15 minutos narrativos).</p>
        
        <h3>Turno</h3>
        <p>Unidade de resolução dentro de uma cena estruturada. Tags consumidas em um turno ficam indisponíveis até o início do próximo turno do mesmo personagem.</p>
        
        <h2>Tipos de Ação</h2>
        <h3>Ações de Oposição</h3>
        <p>São ações em que existe resistência ativa de outro objeto de jogo ou força contrária.</p>
        <ul>
          <li>Usam <strong>AV/EV</strong> do agente.</li>
          <li>Usam <strong>OV/RV</strong> da oposição.</li>
          <li>Seguem a resolução normal por RAPs.</li>
          <li>Apropriadas para ataques, bloqueios, disputas, resistências e confrontos diretos.</li>
          <li>Geram primariamente <strong>condições</strong> no alvo.</li>
        </ul>
        
        <h3>Ações de Manifestação</h3>
        <p>São ações sem oposição direta, nas quais o desafio está na execução, na complexidade e na materialização do resultado.</p>
        <ul>
          <li>Iniciam em <strong>OV/RV 1</strong>.</li>
          <li>Recebem modificadores conforme a natureza da ação.</li>
          <li>Apropriadas para criar efeitos independentes, aplicar estados sem resistência ativa e produzir alterações relevantes no jogo.</li>
          <li>Geram primariamente <strong>efeitos</strong>.</li>
          <li>Podem também gerar <strong>condições</strong> em alvos que não oferecem resistência ativa.</li>
        </ul>
        
        <h3>Ações Automáticas</h3>
        <p>São ações sem rolagem.</p>
        <ul>
          <li>Podem criar novos efeitos ou condições.</li>
          <li>Podem reduzir efeitos ou condições existentes.</li>
          <li><strong>Não podem</strong> aumentar o grau de um efeito ou condição já existente.</li>
          <li>Devem respeitar a trivialidade da ação no contexto ficcional.</li>
          <li>Tags usadas em ações automáticas ficam indisponíveis até o próximo turno.</li>
        </ul>
        
        <h3>Reações</h3>
        <p>São ações automáticas executadas fora do turno do personagem, em resposta direta a um evento.</p>
        <ul>
          <li>Seguem todas as regras de ações automáticas.</li>
          <li>Consomem tags normalmente — essas tags ficam indisponíveis até o próximo turno do personagem.</li>
          <li>Podem ser usadas para interromper, reduzir ou anular efeitos e condições antes que se estabeleçam.</li>
        </ul>
        <p><strong>Atenção:</strong> uma reação não pode ser usada para criar uma condição ou efeito novo de forma ofensiva — apenas para responder a algo que está acontecendo.</p>
        
        <h2>Sistema de Resolução</h2>
        <h3>Ações de Oposição</h3>
        <p><strong>AV/EV</strong> = atributo base + grau total das tags utilizadas + bônus de condições favoráveis</p>
        <p><strong>OV/RV</strong> = atributo de resistência do alvo + modificadores situacionais + condições desfavoráveis ao agente</p>
        <p>O resultado gera <strong>RAPs</strong>. RAPs positivos indicam sucesso; RAPs negativos ou zero indicam falha.</p>
        
        <h3>Ações de Manifestação</h3>
        <p><strong>AV/EV</strong> = atributo base + grau total das tags utilizadas</p>
        <p><strong>OV/RV final</strong> = 1 + modificadores da ação + modificadores de posicionamento + modificadores circunstanciais</p>
        <p>Se a ação falhar (RAPs ≤ 0), o efeito não se estabelece ou apenas "pisca" sem se fixar.</p>
        
        <h3>Ações Automáticas e Reações</h3>
        <p>O valor do ajuste automático é igual ao <strong>grau total das tags gastas</strong>:</p>
        <ul>
          <li>1 tag de grau 2 = 2 APs de ajuste</li>
          <li>2 tags de grau 1 cada = 2 APs de ajuste</li>
          <li>1 tag de grau 3 + 1 de grau 1 = 4 APs de ajuste</li>
        </ul>
        <p>O ajuste pode criar, reduzir ou remover condições e efeitos cujo grau atual seja <strong>igual ou menor</strong> ao valor do ajuste.</p>
        
        <h2>Condições</h2>
        <h3>Limiar de Condição</h3>
        <table>
          <thead><tr><th>Categoria</th><th>Atributo de Resistência</th></tr></thead>
          <tbody>
            <tr><td>Dano físico / estrutural</td><td>Corpo</td></tr>
            <tr><td>Dano mental / cognitivo</td><td>Mente</td></tr>
            <tr><td>Dano emocional / espiritual</td><td>Espírito</td></tr>
          </tbody>
        </table>
        
        <h3>Aplicação</h3>
        <p>O <strong>grau máximo</strong> de uma condição criada em uma única ação é:</p>
        <p><strong>Grau máximo = EV + grau total das tags utilizadas</strong></p>
        
        <h3>Acúmulo de Condições</h3>
        <ul>
          <li>Condições do <strong>mesmo tipo</strong> no mesmo alvo se <strong>somam</strong>.</li>
          <li>Condições de <strong>tipos diferentes</strong> coexistem e aplicam penalidades separadas.</li>
          <li>Quando o grau acumulado de uma condição excede o dobro do limiar do atributo, o alvo é <strong>incapacitado</strong>.</li>
        </ul>
        
        <h3>Duração</h3>
        <table>
          <thead><tr><th>Tipo</th><th>Descrição</th></tr></thead>
          <tbody>
            <tr><td>Temporária</td><td>dura um número de APs de tempo igual ao grau da condição</td></tr>
            <tr><td>Duradoura</td><td>permanece até ser removida por uma ação apropriada</td></tr>
            <tr><td>Permanente</td><td>altera a ficha do alvo de forma indefinida</td></tr>
          </tbody>
        </table>
        
        <h2>Efeitos</h2>
        <h3>Limiar de Efeito</h3>
        <p>O limiar de um efeito é igual ao <strong>grau total das tags usadas</strong> para criá-lo.</p>
        
        <h3>Promoção de Escopo</h3>
        <table>
          <thead><tr><th>Promoção</th><th>Limiar de RAP</th></tr></thead>
          <tbody>
            <tr><td>1ª promoção</td><td>6</td></tr>
            <tr><td>2ª promoção</td><td>10</td></tr>
            <tr><td>3ª promoção</td><td>15</td></tr>
            <tr><td>4ª promoção</td><td>21</td></tr>
          </tbody>
        </table>
        
        <h3>Dimensões de Promoção</h3>
        <ul>
          <li><strong>duração</strong> (de temporária para duradoura, de duradoura para permanente)</li>
          <li><strong>amplitude</strong> (de 1 alvo para área, de área pequena para ampla)</li>
          <li><strong>alcance</strong> (de toque para curto, de curto para médio, etc.)</li>
          <li><strong>controle</strong> (de bruto para preciso)</li>
          <li><strong>complexidade</strong> (de simples para duplo, etc.)</li>
          <li><strong>ocultação</strong> (de visível para discreto, etc.)</li>
          <li><strong>comportamento</strong> (adiciona efeito secundário, encadeamento, etc.)</li>
        </ul>
        
        <h2>Atributos dos Personagens</h2>
        <h3>Atributos Físicos</h3>
        <table>
          <thead><tr><th>Atributo</th><th>Função</th></tr></thead>
          <tbody>
            <tr><td><strong>Força</strong></td><td>peso que pode mover, dano físico em corpo a corpo, destruição de estruturas</td></tr>
            <tr><td><strong>Destreza</strong></td><td>precisão, velocidade de ação, evasão, equilíbrio</td></tr>
            <tr><td><strong>Corpo</strong></td><td>resistência a dano físico, fadiga, veneno, doença</td></tr>
          </tbody>
        </table>
        
        <h3>Atributos Mentais</h3>
        <table>
          <thead><tr><th>Atributo</th><th>Função</th></tr></thead>
          <tbody>
            <tr><td><strong>Intelecto</strong></td><td>raciocínio, análise, conhecimento técnico, planejamento</td></tr>
            <tr><td><strong>Intuição</strong></td><td>percepção, leitura de situação, reação a surpresas</td></tr>
            <tr><td><strong>Mente</strong></td><td>resistência a dano mental, influência, ilusão, controle</td></tr>
          </tbody>
        </table>
        
        <h3>Atributos de Influência</h3>
        <table>
          <thead><tr><th>Atributo</th><th>Função</th></tr></thead>
          <tbody>
            <tr><td><strong>Presença</strong></td><td>carisma, liderança, intimidação, negociação</td></tr>
            <tr><td><strong>Espírito</strong></td><td>resistência emocional, força de vontade, senso de identidade</td></tr>
          </tbody>
        </table>
        
        <h2>Escala de Atributos</h2>
        <table>
          <thead><tr><th>Valor</th><th>Nível</th><th>Referência</th></tr></thead>
          <tbody>
            <tr><td>1–2</td><td>Abaixo da média</td><td>criança, idoso frágil</td></tr>
            <tr><td>3–4</td><td>Humano médio</td><td>adulto saudável</td></tr>
            <tr><td>5–6</td><td>Humano excepcional</td><td>atleta olímpico, gênio</td></tr>
            <tr><td>7–8</td><td>Pico humano</td><td>limite absoluto do humano sem aprimoramento</td></tr>
            <tr><td>9–11</td><td>Super-humano baixo</td><td>capacidades que excedem qualquer humano</td></tr>
            <tr><td>12–15</td><td>Super-humano médio</td><td>equivalente a Homem-Aranha, Wolverine</td></tr>
            <tr><td>16–20</td><td>Super-humano elevado</td><td>Colossus, Tempestade em plena força</td></tr>
            <tr><td>21–25</td><td>Classe de Poder</td><td>Hulk, Thor, Phoenix</td></tr>
            <tr><td>26+</td><td>Cósmico</td><td>Entidades, Omega absoluto</td></tr>
          </tbody>
        </table>
        
        <h2>Temas</h2>
        <p>Temas são a estrutura narrativa e mecânica central de cada personagem. Cada personagem possui <strong>dois a quatro temas</strong>.</p>
        
        <h3>Tipos de Tema</h3>
        <table>
          <thead><tr><th>Categoria</th><th>Descrição</th></tr></thead>
          <tbody>
            <tr><td><strong>Mutação</strong></td><td>poderes, capacidades sobrenaturais, origem genética</td></tr>
            <tr><td><strong>Humanidade</strong></td><td>identidade, relações, missão, passado, posses, conflito</td></tr>
          </tbody>
        </table>
        
        <p>Cada personagem deve ter <strong>ao menos um tema de cada categoria</strong>.</p>
        
        <h3>Subcategorias de Tema de Mutação</h3>
        <ul>
          <li><strong>Adaptação</strong> — capacidade de responder e mudar em situação de risco</li>
          <li><strong>Bastião</strong> — proteção, resistência, capacidade defensiva</li>
          <li><strong>Conjuração</strong> — criação de efeitos, entidades ou materiais do nada</li>
          <li><strong>Destino</strong> — ligação com forças maiores, profecia, inevitabilidade</li>
          <li><strong>Adivinhação</strong> — percepção expandida, visão além do presente</li>
          <li><strong>Enclave</strong> — vínculo com grupo, espaço sagrado, rede mutante</li>
          <li><strong>Expressão</strong> — manifestação criativa do poder, estilo único</li>
          <li><strong>Familiar</strong> — conexão com um ser ligado ao mutante</li>
          <li><strong>Mobilidade</strong> — movimento, deslocamento, velocidade</li>
          <li><strong>Relíquia</strong> — objeto carregado que amplifica ou ancora o poder</li>
          <li><strong>Subversão</strong> — inversão de regras, quebra de padrões, disrupção</li>
        </ul>
        
        <h3>Subcategorias de Tema de Humanidade</h3>
        <ul>
          <li><strong>Evento Marcante</strong> — algo que aconteceu e moldou o personagem</li>
          <li><strong>Relação Marcante</strong> — um vínculo com outra pessoa ou grupo</li>
          <li><strong>Missão</strong> — um objetivo ou propósito que guia o personagem</li>
          <li><strong>Personalidade</strong> — traços de caráter, comportamento, forma de ser</li>
          <li><strong>Posses</strong> — objetos significativos, recursos, conexões materiais</li>
          <li><strong>Rotina</strong> — hábitos, práticas, estrutura cotidiana</li>
          <li><strong>Conflito / Dificuldade</strong> — um problema interno ou externo recorrente</li>
          <li><strong>Treinamento</strong> — habilidade adquirida por esforço e disciplina</li>
          <li><strong>Território</strong> — um lugar de pertencimento, proteção ou relevância</li>
        </ul>
        
        <h2>Iniciativa e Ordem de Ação</h2>
        <p>O sistema não usa iniciativa numérica por padrão. A ordem de ação é determinada por <strong>contexto narrativo e consenso de mesa</strong>.</p>
        
        <h3>Critérios de Ordem</h3>
        <table>
          <thead><tr><th>Situação</th><th>Quem age primeiro</th></tr></thead>
          <tbody>
            <tr><td>Emboscada ou surpresa total</td><td>atacante age antes</td></tr>
            <tr><td>Combate iniciado naturalmente</td><td>Destreza mais alta</td></tr>
            <tr><td>Personagem com poder de velocidade</td><td>age antes de qualquer ação normal</td></tr>
            <tr><td>Reação declarada</td><td>ocorre imediatamente após o evento gatilho</td></tr>
          </tbody>
        </table>
        
        <h3>Estrutura do Turno</h3>
        <ol>
          <li><strong>Declaração:</strong> todos declaram suas intenções em ordem reversa de Destreza</li>
          <li><strong>Resolução:</strong> ações se resolvem em ordem de Destreza (maior para menor)</li>
          <li><strong>Reações:</strong> podem ocorrer em qualquer ponto durante a resolução</li>
          <li><strong>Atualização de estado:</strong> condições e efeitos temporários têm seu grau reduzido ou expiram</li>
        </ol>
        
        <h2>Ações Estendidas e Atividades de Intervalo</h2>
        <p>Entre cenas ou arcos narrativos, os personagens têm a oportunidade de realizar <strong>atividades de intervalo</strong>.</p>
        
        <h3>Modificador de Ritmo</h3>
        <table>
          <thead><tr><th>Ritmo</th><th>Tempo</th><th>Modificador</th></tr></thead>
          <tbody>
            <tr><td>Urgência extrema</td><td>1 turno</td><td>+5</td></tr>
            <tr><td>Pressão alta</td><td>1 cena</td><td>+3</td></tr>
            <tr><td>Pressão moderada</td><td>hora</td><td>+1</td></tr>
            <tr><td>Calma relativa</td><td>horas</td><td>+0</td></tr>
            <tr><td>Foco total</td><td>dia</td><td>-1</td></tr>
            <tr><td>Trabalho estendido</td><td>dias</td><td>-2</td></tr>
            <tr><td>Projeto longo</td><td>semanas+</td><td>-3</td></tr>
          </tbody>
        </table>
        
        <h3>Atividades de Intervalo</h3>
        <ul>
          <li><strong>Recuperar</strong> — descanso, tratamento, cuidado pessoal</li>
          <li><strong>Investigar</strong> — pesquisar tema, pessoa, local ou situação</li>
          <li><strong>Preparar</strong> — criar, modificar ou organizar recursos</li>
          <li><strong>Treinar</strong> — desenvolver habilidade ou poder (acumula pontos de progresso)</li>
          <li><strong>Conectar</strong> — cultivar, reparar ou aprofundar vínculos</li>
          <li><strong>Criar Obra</strong> — produzir algo de valor narrativo ou expressivo</li>
        </ul>
        
        <h2>Princípios Gerais</h2>
        <ul>
          <li>O grau das tags define a <strong>escala básica</strong> da ação e o limiar de promoção.</li>
          <li>Condições são aplicadas a objetos de jogo e somam-se entre si.</li>
          <li>Efeitos existem de forma independente na cena.</li>
          <li>Ações de oposição resolvem <strong>conflito direto</strong>.</li>
          <li>Ações de manifestação resolvem <strong>criação de efeitos</strong> sem oposição ativa.</li>
          <li>Ações automáticas resolvem <strong>ajustes simples</strong> sem rolagem.</li>
          <li>Reações são automáticas, executadas fora do turno, apenas em resposta.</li>
          <li>RAPs excedentes compram duração e promoções.</li>
          <li>Promoções de escopo modificam <strong>qualidade</strong>, não apenas quantidade.</li>
          <li>Tags gastas só retornam no próximo turno.</li>
          <li>A trivialidade ficcional sempre prevalece sobre a mecânica.</li>
        </ul>
      `,
      timeline: `
        <h1>Cronologia do Cenário — Universo X-Men RPG</h1>
        <p>Os X-Men não surgiram em manchete. Surgiram em silêncio, numa mansão em Westchester, com cinco adolescentes que não sabiam exatamente o que estavam construindo — mas sabiam que estavam construindo algo.</p>
        <p>Os jogadores entram nessa história como <strong>estudantes do Instituto Xavier</strong>, por volta de 2005–2006, com 14 a 16 anos. Eles não são heróis ainda. São pessoas tentando entender o que são — num mundo que ainda não decidiu o que fazer com elas.</p>
        
        <h2>Leitura da Tabela</h2>
        <p>A tabela registra cada período com:</p>
        <ul>
          <li><strong>o que estava acontecendo no mundo</strong></li>
          <li><strong>quem estava no campo</strong></li>
          <li><strong>onde os PJs estavam nisso tudo</strong></li>
        </ul>
        
        <h2>Cronologia Narrativa</h2>
        
        <h3>🕵️ 1988–1991 — A Era do Segredo</h3>
        <p><em>Tom: conspirativo, íntimo, de coisas ditas em voz baixa</em></p>
        <p>Xavier não queria um exército. Queria uma prova. Cinco jovens reunidos numa mansão que parecia escola mas funcionava como laboratório de um ideal: que mutantes e humanos podiam coexistir, se alguém estivesse disposto a pagar o preço do exemplo.</p>
        <p>Eles não tinham uniforme no início. Tinham dúvida, e treino, e Xavier olhando para cada um como se visse algo que eles mesmos ainda não sabiam que carregavam.</p>
        <p>Nesse mesmo período, em algum bunker governamental, o <strong>Programa Sentinela</strong> era rabiscado em papel que ninguém deveria ver. <strong>Magneto</strong> observava de longe — não com raiva, ainda. Com ceticismo. <strong>Mística</strong> já movia peças na sombra. <strong>Sinistro</strong> registrava DNA como quem cataloga espécies raras antes da extinção.</p>
        <p>E em 1989, longe desse mundo mutante em formação, <strong>Steve Rogers foi descongelado</strong>. O mundo ganhou de volta um símbolo que não sabia que precisava — e os mutantes ganharam um espelho: o que significa ser extraordinário num mundo de ordinários?</p>
        <p><strong>X-Men ativos:</strong> Ciclope, Jean Grey, Homem de Gelo, Fera, Anjo</p>
        
        <h3>🌍 1992–1994 — A Era da Expansão</h3>
        <p><em>Tom: épico, colorido, de rostos novos e horizontes maiores</em></p>
        <p>Krakoa quase os matou a todos. O que sobrou foi reorganização forçada — e com ela, uma ideia que Xavier relutou em admitir: que o mundo era grande demais para cinco pessoas.</p>
        <p>O <strong>Time Dourado</strong> emergiu como contrapartida ao <strong>Time Azul</strong>: Tempestade, Colossus, Noturno, Wolverine, Gambit. Mutantes de origens tão diferentes que sua coesão parecia improvável — e justamente por isso, funcionava. Enquanto isso, os <strong>Vingadores</strong> tornavam-se públicos nos EUA, equipe humana de elite, e o contraste não escapou a ninguém.</p>
        <p><strong>Legião</strong> manifestava instabilidade crescente, como uma pergunta que Xavier ainda não sabia como responder. <strong>Sinistro</strong> intensificava manipulações que ninguém ainda conseguia mapear completamente.</p>
        <p><strong>X-Men ativos:</strong> Time Azul + Time Dourado (estrutura dupla)</p>
        
        <h3>💔 1994–1996 — A Era da Fênix</h3>
        <p><em>Tom: dramático, íntimo, de amor e destruição</em></p>
        <p>Jean Grey estava mudando. Ninguém falava sobre isso diretamente — esse era o problema. O <strong>Clube do Inferno</strong> soube explorar o silêncio.</p>
        <p>O que veio depois não tem nome limpo. A <strong>Fênix Negra</strong> não era Jean e era Jean ao mesmo tempo — poder demais para um corpo que ainda amava, ainda lembrava, ainda tentava escolher. O julgamento Shi'ar não foi sobre culpa. Foi sobre medo.</p>
        <p>Scott voltou sem ela. Encontrou seu pai — <strong>Corsário</strong>, entre estrelas, comandando pirates. Descobriu que herança cósmica não é privilégio: é peso. Conheceu <strong>Madelyne Pryor</strong> num aeroporto chuvoso, e ela tinha o jeito de Jean de inclinar a cabeça quando pensava.</p>
        <p><strong>X-Men ativos:</strong> Times Azul e Dourado desestabilizados</p>
        
        <h3>🏛️ 1997 — A Era da Exposição</h3>
        <p><em>Tom: político, de revelação e desconforto</em></p>
        <p>Xavier foi ferido. E então aconteceu algo que ninguém tinha previsto: <strong>Magneto assumiu a liderança dos X-Men</strong>. Não por conquista. Por protocolo. Porque Xavier, antes de cair, tinha deixado instruções — e Magneto, por razões que nunca explicou completamente, honrou-as.</p>
        <p>Foi Magneto quem os tornou públicos pela primeira vez. Foi Magneto quem se entregou para mostrar boa-fé. O gesto foi real, o risco foi real — e o governo os tratou como cúmplices de um terrorista que acabava de se render.</p>
        <p><strong>X-Men ativos:</strong> estrutura instável; Magneto no centro</p>
        
        <h3>🌊 1998–2000 — A Era de Genosha</h3>
        <p><em>Tom: bélico, de soberania e ruptura</em></p>
        <p>Magneto foi preso. As Sentinelas foram ativadas. Os X-Men desapareceram — o mundo acreditou que estavam mortos.</p>
        <p>Na Europa, <strong>Noturno</strong> não acreditou. Fundou a <strong>Excalibur</strong> como ato de recusa: a resistência mutante não morreria enquanto houvesse alguém em pé para carregá-la.</p>
        <p>Quando Magneto voltou, voltou diferente. Genosha não era projeto político — era declaração. O <strong>Asteroide M</strong> desceu em órbita, soberano e incontestável. Wanda e Pietro dividiram lealdades entre pai e convicção.</p>
        <p><strong>Sinistro</strong> coletava material genético nos bastidores. Sempre nos bastidores.</p>
        <p><strong>X-Men ativos:</strong> em reconstrução</p>
        <p><strong>Times paralelos:</strong> Excalibur (Europa, fundada por Noturno)</p>
        
        <h3>⏳ 2001–2004 — A Era dos Paradoxos</h3>
        <p><em>Tom: filosófico, de paradoxos e escolhas impossíveis</em></p>
        <p>Scott voltou. A fase <strong>New X-Men</strong> começou com a sensação de que algo havia mudado fundamentalmente — não nos poderes, mas nas perguntas. Os ecos de <strong>Days of Future Past</strong> chegavam em missões como pesadelos de alguém que ainda não nasceu.</p>
        <p><strong>Legião</strong> manifestou nova personalidade dominante. A mente de um filho é o arquivo dos pecados do pai.</p>
        <p>Em 2003, a crise com Xavier abriu espaço para o <strong>X-Factor</strong> — equipe paralela com mandato diferente, mais político, menos messiânico. <strong>Apocalipse</strong> chegou ao presente, recrutou Cavaleiros, fez Anjo em Arcanjo de novo.</p>
        <p><strong>Nathan nasce. Madelyne descobre ser clone.</strong> O plano de <strong>Sinistro</strong> emergiu parcialmente — parcialmente, porque Sinistro nunca revela tudo de uma vez.</p>
        <p><strong>X-Men ativos:</strong> Scott no centro; X-Factor integrado a partir de 2004</p>
        
        <h3>🎒 2005–2006 — A Era dos Estudantes</h3>
        <p><em>Tom: juvenil, de descoberta, de primeiros erros e primeiras lealdades</em></p>
        <p><strong>Os PJs entram aqui.</strong></p>
        <p>Com 14 a 16 anos. Num mundo que já passou por tudo isso acima e ainda não se resolveu. O Instituto Xavier é escola e trincheira ao mesmo tempo — e para novos alunos, parece mais escola do que trincheira, até que deixa de parecer.</p>
        <p><strong>Rachel Summers</strong> chegou do futuro sem dizer tudo sobre si mesma. Juntou-se à Excalibur. Carregava o peso de uma linha temporal que os PJs nem sabem que existe.</p>
        <p>Em 2006, a <strong>Guerra Civil</strong> dividiu heróis com identidade secreta de heróis sem. Os veteranos se dividiram. Os PJs assistiram — porque ainda não tinham permissão de fazer outra coisa.</p>
        <p><strong>X-Men ativos:</strong> Scott, Kitty, Tempestade, Wolverine, Gambit, Psylocke; Emma Frost chegando</p>
        <p><strong>PJs:</strong> estudantes do Instituto (14–16 anos); sem missões de campo</p>
        
        <h3>⚡ 2007–2009 — A Era das Forças Paralelas</h3>
        <p><em>Tom: fragmentado, de múltiplas frentes e identidades em conflito</em></p>
        <p><strong>Cable chegou do futuro</strong> com a lembrança de guerras que os PJs ainda não travaram. Recrutou veteranos dos Novos Mutantes para a <strong>X-Force</strong> — unidade que faz o que os X-Men decidem não fazer, porque alguém tem que fazer.</p>
        <p>Os PJs não foram recrutados. Eram jovens demais, ou não tinham o perfil, ou Cable simplesmente viu algo diferente neles. A saída dos veteranos deixou espaço — e responsabilidade.</p>
        <p><strong>Emma e Scott</strong> consolidaram a liderança conjunta dos X-Men em 2008: fria precisão e fervor controlado, dois estilos que funcionavam juntos exatamente porque não eram iguais.</p>
        <p>Em 2009, o Instituto reabriu publicamente como escola. Tempestade dividia tempo entre Wakanda e Westchester. Os Novos Mutantes tornaram-se ativos — missões de suporte, sempre com supervisão, mas missões reais.</p>
        <p><strong>X-Men ativos:</strong> Scott + Emma co-lideram; Kitty, Wolverine (escola), Tempestade em trânsito</p>
        <p><strong>Times paralelos:</strong> X-Force (Cable); Excalibur (Rachel + Noturno)</p>
        <p><strong>PJs:</strong> treinamento avançado (2008); Novos Mutantes ativos com supervisão (2009)</p>
        
        <h3>🌐 2010± — A Era da Exposição Total</h3>
        <p><em>Tom: institucional, midiático, de dilemas sem resposta limpa</em></p>
        <p>Os X-Men são instituição agora. Têm escola, têm imprensa, têm debates no Congresso. Têm inimigos que usam advogados antes de usar exércitos.</p>
        <p><strong>Sinistro</strong> permanece nas sombras — sempre nas sombras. <strong>Mística</strong> muda de forma, literalmente. <strong>Magneto</strong> tornou-se figura filosófica: não mais general, mas voz que ainda ecoa em qualquer sala onde mutantes e humanos discutem o futuro. <strong>Legião</strong> é variável imprevisível. <strong>Apocalipse</strong> é ameaça latente.</p>
        <p>Os PJs têm 18–20 anos. Sobreviveram ao Instituto. Estão a um passo de se tornarem X-Men — e talvez já sejam, sem que alguém tenha dito isso oficialmente ainda.</p>
        <p><strong>X-Men ativos:</strong> Scott, Emma, Kitty, núcleo central; Tempestade entre Wakanda e Instituto</p>
        <p><strong>Times paralelos:</strong> X-Factor; X-Force; Excalibur</p>
        <p><strong>PJs:</strong> Novos Mutantes plenamente ativos; podem operar como equipe própria</p>
        
        <h2>Times Paralelos</h2>
        <table>
          <thead><tr><th>Time</th><th>Fundação</th><th>Origem</th><th>Papel</th><th>Relação com PJs</th></tr></thead>
          <tbody>
            <tr><td><strong>Excalibur</strong></td><td>1998–1999</td><td>X-Men parecem mortos; Noturno recusa o luto</td><td>Resistência mutante europeia</td><td>Equipe irmã distante; Rachel é figura de mistério</td></tr>
            <tr><td><strong>X-Factor</strong></td><td>2003</td><td>Vácuo ideológico; crise com Xavier</td><td>Mandato político e investigativo</td><td>Referência institucional; veteranos conhecidos</td></tr>
            <tr><td><strong>X-Force</strong></td><td>2007</td><td>Cable chega do futuro</td><td>Faz o que os X-Men decidem não fazer</td><td>A razão pela qual os PJs avançam</td></tr>
          </tbody>
        </table>
        
        <h2>Trajetória dos PJs</h2>
        <table>
          <thead><tr><th>Período</th><th>O que os PJs são</th><th>O que podem fazer</th></tr></thead>
          <tbody>
            <tr><td>2005–2006</td><td>Estudantes novos, 14–16 anos</td><td>Aulas, treinamento, vínculos no Instituto</td></tr>
            <tr><td>2006</td><td>Estudantes durante a Guerra Civil</td><td>Observam; não participam de decisões</td></tr>
            <tr><td>2007</td><td>Estudantes que perdem colegas para a X-Force</td><td>Sentem o vazio; treinamento torna-se mais sério</td></tr>
            <tr><td>2008</td><td>Novos Mutantes em formação avançada</td><td>Primeiras missões menores com supervisão</td></tr>
            <tr><td>2009</td><td>Novos Mutantes ativos</td><td>Missões reais de suporte; alguma autonomia</td></tr>
            <tr><td>2010±</td><td>Agentes em formação, 18–20 anos</td><td>Operam como equipe; a um passo de X-Men oficiais</td></tr>
          </tbody>
        </table>
        
        <blockquote style="margin-top: 20px; padding: 15px; border-left: 3px solid var(--accent); background: rgba(0,0,0,0.3);">
          <p>Os PJs não foram para a X-Force porque Cable viu algo diferente — ou porque eram jovens demais. Isso é tensão narrativa viva: o que acontece quando os veteranos que os PJs admiravam partiram para fazer o trabalho duro, e agora o Instituto precisa que <em>eles</em> cresçam?</p>
        </blockquote>
      `,
      
      relatorios: `
        <h1>Relatórios de Missão</h1>
        <p>Crônicas de operações e missões conduzidas pelos X-Men.</p>
        
        <div class="relatorios-container">
          <div class="relatorio-card" style="border-left: 3px solid var(--red);">
            <div class="relatorio-header" onclick="this.parentElement.classList.toggle('expanded')">
              <span class="relatorio-title">Relatório de Missão — Avaliação, Resgate e Contenção Mutante</span>
              <span class="relatorio-leader">Líder: Ishan Patel (Atalho)</span>
            </div>
            <div class="relatorio-body">
              <p><strong>Responsável:</strong> Ishan Patel (Atalho)<br>
              <strong>Codinome:</strong> Líder Vermelho<br>
              <strong>Designação:</strong> X-Men Vermelho (liderança temporária)</p>
              
              <hr style="border-color: var(--b2); margin: 15px 0;">
              
              <h3>1. Objetivo Inicial</h3>
              <p>Avaliar e identificar possível despertar mutante na região indicada por Emma Frost, no Líbano.</p>
              
              <h3>2. Fase 1 — Investigação (Líbano)</h3>
              <p>Após período de observação, localizamos a escola suspeita. Em coordenação com a direção, realizamos triagem comportamental entre os alunos. Apenas um apresentou sinais claros de estresse elevado.</p>
              <p>Identificamos sua residência e, após diálogo com o garoto e seus pais, descobrimos que seu irmão, Hanmza, havia sido sequestrado. A partir das descrições, solicitamos a Emma Frost a identificação do possível local de cativeiro.</p>
              
              <h3>3. Fase 2 — Operação de Resgate</h3>
              <p><strong>Local:</strong> Prédio isolado de 3 andares</p>
              <p><strong>Equipe:</strong> Atalho (Líder Vermelho), Maestro, Nemesis</p>
              <p><strong>Execução:</strong> Maestro concedeu a Atalho habilidades de invisibilidade e resistência. Sob esses efeitos, infiltramo-nos no prédio e localizamos Hanmza no 3º andar.</p>
              <p>Ao estabelecer contato, iniciamos extração via portal. Um dos sequestradores percebeu movimentação estranha e passou a bater na porta.</p>
              <p>Maestro e Nemesis avançaram para suporte, neutralizando os 5 sequestradores — Nemesis utilizou uma explosão elétrica. No 3º andar, enfrento um sequestrador extremamente habilidoso em batalha, sendo necessário eliminá-lo para garantir a missão.</p>
              <p><strong>Resultado:</strong> Hanmza resgatado com sucesso.</p>
              
              <h3>4. Revelação Crítica</h3>
              <p>Durante o debriefing, Hanmza revelou que o mutante real não era ele, mas Soraya Cadir.</p>
              <p><strong>Informações coletadas:</strong></p>
              <ul>
                <li><strong>Nome:</strong> Soraya Cadir, 15 anos</li>
                <li><strong>Origem:</strong> Afeganistão</li>
                <li><strong>Grupo:</strong> Homens de Omar — operação de tráfico de mutantes</li>
                <li><strong>Histórico:</strong> Família tentou defendê-la e foi morta; ela escapou</li>
                <li><strong>Poder:</strong> recientemente estabilizado; uso permanente</li>
                <li><strong>Motivação do sequestro:</strong> Usar Hanmza para atrair Soraya</li>
              </ul>
              
              <h3>5. Fase 3 — Localização de Soraya</h3>
              <p>Utilizando magia de detecção concedida por Maestro, criei múltiplos portais pela cidade para triangular a localização de Soraya. Identificamos que ela estava em uma zona rural.</p>
              <p>Atravessamos o portal: Nemesis, Atalho e Hanmza. Nemesis tentou aproximar-se, mas sem sucesso. Achei a solução: pedi a Hanmza que chamasse Soraya, pois ela confiava nele. Estratégia bem-sucedida.</p>
              <p>Soraya cooperou após explicação da situação. O restante da equipe chegou de tuk-tuk e a apresentação foi feita.</p>
              
              <h3>6. Extração e Recrutamento</h3>
              <p>Acionamos o Pássaro Negro para evacuação.<br>
              Soraya foi integrada sob proteção dos X-Men, com promessa de futuras operações de resgate.</p>
              
              <h3>7. Ponto de Atenção Operacional</h3>
              <p><em><strong>Alerta:</strong> Maestro precisa informar intentiones antes de imbuir poder. Na operação do prédio e na identificação da mutante, ele apenas concedeu poderes ao Atalho e falou depois. Não houve planejamento adequado.</em></p>
              
              <h3>8. Fase 4 — Operação Afeganistão</h3>
              <p><strong>Objetivo:</strong> Identificar e desmantelar operação liderada por Omar.</p>
              <p>Após reconhecimento aéreo (Signar), identificamos uma pequena cidade com pontos estratégicos.</p>
              
              <h4>Divisão de Equipes</h4>
              <table>
                <thead><tr><th>Equipe</th><th>Membros</th><th>Resultado</th></tr></thead>
                <tbody>
                  <tr><td>MESQUITA</td><td>Maestro, Nemesis</td><td>Identificação de mutantes e humanos encarcerados</td></tr>
                  <tr><td>ARMAZÉM</td><td>Atalho, Fusion</td><td>Estrutura abandonada; caminhão adaptado para transporte</td></tr>
                  <tr><td>CAMINHÃO</td><td>Signar, Kaleb</td><td>Motorista capturado e interrogado</td></tr>
                  <tr><td>TRILHA</td><td>Texugo</td><td>Reconhecimento de terreno e busca por rotas</td></tr>
                </tbody>
              </table>
              
              <p><strong>Resultado Final:</strong></p>
              <ul>
                <li>Civis e mutantes resgatados</li>
                <li>Dispositivos móveis apreendidos</li>
                <li>Informações coletadas sobre a rede de Omar</li>
                <li>Intervenção policial ao final da operação</li>
              </ul>
              
              <h3>9. Avaliação de Liderança</h3>
              <p>A divisão estratégica da equipe foi intencional, visando:</p>
              <ul>
                <li>Estimular autonomia</li>
                <li>Explorar sinergia de habilidades</li>
                <li>Desenvolver tomada de decisão em campo</li>
              </ul>
              <p><strong>Resultado:</strong> A equipe respondeu de forma eficiente e coordenada.</p>
              
              <h3>10. Conclusão</h3>
              <p>A missão evoluiu de investigação local para desmantelamento parcial de uma rede internacional de tráfico mutante.</p>
              <p>Soraya Cadir encontra-se sob nossa proteção.</p>
              <p>A ameaça ligada a Omar permanece ativa e organizada.</p>
            </div>
          </div>
        </div>
        
        <style>
          .relatorios-container {
            display: flex;
            flex-direction: column;
            gap: 10px;
            max-height: 70vh;
            overflow-y: auto;
            padding-right: 10px;
          }
          .relatorio-card {
            background: var(--p2);
            border: 1px solid var(--b2);
            border-radius: 4px;
            overflow: hidden;
          }
          .relatorio-header {
            padding: 12px 15px;
            background: var(--p1);
            cursor: pointer;
            display: flex;
            justify-content: space-between;
            align-items: center;
            flex-wrap: wrap;
            gap: 8px;
          }
          .relatorio-header:hover {
            background: var(--p0);
          }
          .relatorio-title {
            font-weight: bold;
            color: var(--text);
          }
          .relatorio-leader {
            font-size: 0.85rem;
            color: var(--muted);
          }
          .relatorio-body {
            padding: 15px;
            display: none;
            max-height: 400px;
            overflow-y: auto;
          }
          .relatorio-card.expanded .relatorio-body {
            display: block;
          }
        </style>
      `
    };