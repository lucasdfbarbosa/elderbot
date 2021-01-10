export const investigadorBase = {
  naent: true, // está na Entrada?
  ativo: false, // está em jogo?
  devor: false, // foi devorado?
  nobar: true, // está no baralho?
  itens: [], // itens atuais durante o jogo, iniciados com itens iniciais
  pista: 0, // pistas atuais durante o jogo
  trof: [], // troféus
}

export const INVESTIGADORES = [
  {
    ...investigadorBase,
    nome: 'Amanda Sharpe', // nome e
    id: 'ama', // identificador e
    desc: 'A Estudante', // ocupação do investigador
    sanid: [{ max: 5, atual: 5 }], // máximo de sanidade e sanidade atual durante o jogo
    resist: [{ max: 5, atual: 5 }], // máximo de resistência e resistência atual durante o jogo
    //habesp:						// efeito da habilidade especial do investigador
    imag:
      'https://media.discordapp.net/attachments/785721643393351700/785726472923906078/Amanda_Sharpe.jpeg', // link da imagem
    aimag: 'https://cdn.discordapp.com/emojis/785687006335205413.png?v=1', // link da imagem do emoji
    murl:
      'https://discord.com/channels/785627856251781182/785721643393351700/785726473277145128',
  }, // link da mensagem no canal #investigadores

  {
    ...investigadorBase,
    nome: 'Bob Jenkins',
    id: 'bob',
    desc: 'O Vendedor', // ocupação do investigador
    sanid: [{ max: 4, atual: 4 }], // máximo de sanidade e sanidade atual durante o jogo
    resist: [{ max: 6, atual: 6 }], // máximo de resistência e resistência atual durante o jogo
    //habesp:						// efeito da habilidade especial do investigador
    imag:
      'https://media.discordapp.net/attachments/785721643393351700/785726618068582411/Bob_Jenkins.jpeg',
    aimag: 'https://cdn.discordapp.com/emojis/785682649917947936.png?v=1',
    murl:
      'https://discord.com/channels/785627856251781182/785721643393351700/785726618340819004',
  },

  {
    ...investigadorBase,
    nome: 'Carolyn Fern',
    id: 'car',
    desc: 'A Psicóloga', // ocupação do investigador
    sanid: [{ max: 6, atual: 6 }], // máximo de sanidade e sanidade atual durante o jogo
    resist: [{ max: 4, atual: 4 }], // máximo de resistência e resistência atual durante o jogo
    //habesp:						// efeito da habilidade especial do investigador
    imag:
      'https://media.discordapp.net/attachments/785721643393351700/785726708098924594/Carolyn_Fern.jpeg',
    aimag: 'https://cdn.discordapp.com/emojis/785687020827049994.png?v=1',
    murl:
      'https://discord.com/channels/785627856251781182/785721643393351700/785726708116488233',
  },

  {
    ...investigadorBase,
    nome: 'Darrell Simmons',
    id: 'dar',
    desc: 'O Fotógrafo',
    sanid: [{ max: 4, atual: 4 }], // máximo de sanidade e sanidade atual durante o jogo
    resist: [{ max: 6, atual: 6 }], // máximo de resistência e resistência atual durante o jogo
    //habesp:
    imag:
      'https://media.discordapp.net/attachments/785721643393351700/785726807868833822/Darrell_Simmons.jpeg',
    aimag: 'https://cdn.discordapp.com/emojis/785687032030035979.png?v=1',
    murl:
      'https://discord.com/channels/785627856251781182/785721643393351700/785726808057839626',
  },

  {
    ...investigadorBase,
    nome: 'Dexter Drake',
    id: 'dex',
    desc: 'O Mágico',
    sanid: [{ max: 5, atual: 5 }], // máximo de sanidade e sanidade atual durante o jogo
    resist: [{ max: 5, atual: 5 }], // máximo de resistência e resistência atual durante o jogo
    //habesp:
    imag:
      'https://media.discordapp.net/attachments/785721643393351700/785726895902818304/Dexter_Drake.jpeg',
    aimag: 'https://cdn.discordapp.com/emojis/785687088807936050.png?v=1',
    murl:
      'https://discord.com/channels/785627856251781182/785721643393351700/785726896138616862',
  },

  {
    ...investigadorBase,
    nome: 'Gloria Goldberg',
    id: 'glo',
    desc: 'A Autora',
    sanid: [{ max: 6, atual: 6 }], // máximo de sanidade e sanidade atual durante o jogo
    resist: [{ max: 4, atual: 4 }], // máximo de resistência e resistência atual durante o jogo
    //habesp:
    imag:
      'https://media.discordapp.net/attachments/785721643393351700/785726977876426752/Gloria_Goldberg.jpeg',
    aimag: 'https://cdn.discordapp.com/emojis/785687102108467230.png?v=1',
    murl:
      'https://discord.com/channels/785627856251781182/785721643393351700/785726978094923776',
  },

  {
    ...investigadorBase,
    nome: 'Harvey Walters',
    id: 'har',
    desc: 'O Professor',
    sanid: [{ max: 7, atual: 7 }], // máximo de sanidade e sanidade atual durante o jogo
    resist: [{ max: 3, atual: 3 }], // máximo de resistência e resistência atual durante o jogo
    //habesp:

    imag:
      'https://media.discordapp.net/attachments/785721643393351700/785727063155802162/Harvey_Walters.jpeg',
    aimag: 'https://cdn.discordapp.com/emojis/785687114020945930.png?v=1',
    murl:
      'https://discord.com/channels/785627856251781182/785721643393351700/785727063415324722',
  },

  {
    ...investigadorBase,
    nome: 'Irmã Mary',
    id: 'irm',
    desc: 'A Freira',
    sanid: [{ max: 7, atual: 7 }], // máximo de sanidade e sanidade atual durante o jogo
    resist: [{ max: 3, atual: 3 }], // máximo de resistência e resistência atual durante o jogo
    //habesp:

    imag:
      'https://media.discordapp.net/attachments/785721643393351700/785727160585420800/Irma_Mary.jpeg',
    aimag: 'https://cdn.discordapp.com/emojis/785687212384845865.png?v=1',
    murl:
      'https://discord.com/channels/785627856251781182/785721643393351700/785727160882692127',
  },

  {
    ...investigadorBase,
    nome: 'Jenny Barnes',
    id: 'jen',
    desc: 'A Diletante',
    sanid: [{ max: 6, atual: 6 }], // máximo de sanidade e sanidade atual durante o jogo
    resist: [{ max: 4, atual: 4 }], // máximo de resistência e resistência atual durante o jogo
    //habesp:

    imag:
      'https://media.discordapp.net/attachments/785721643393351700/785727232537526303/Jenny_Barnes.jpeg',
    aimag: 'https://cdn.discordapp.com/emojis/785687145754132490.png?v=1',
    murl:
      'https://discord.com/channels/785627856251781182/785721643393351700/785727232462422017',
  },

  {
    ...investigadorBase,
    nome: 'Joe Diamond',
    id: 'joe',
    desc: 'O Detetive Particular',
    sanid: [{ max: 4, atual: 4 }], // máximo de sanidade e sanidade atual durante o jogo
    resist: [{ max: 6, atual: 6 }], // máximo de resistência e resistência atual durante o jogo
    //habesp:
    pista: 1,
    imag:
      'https://media.discordapp.net/attachments/785721643393351700/785727318672408626/Joe_Diamond.jpeg',
    aimag: 'https://cdn.discordapp.com/emojis/785687170718761000.png?v=1',
    murl:
      'https://discord.com/channels/785627856251781182/785721643393351700/785727318915285032',
  },

  {
    ...investigadorBase,
    nome: 'Kate Winthrop',
    id: 'kat',
    desc: 'A Cientista',
    sanid: [{ max: 6, atual: 6 }], // máximo de sanidade e sanidade atual durante o jogo
    resist: [{ max: 4, atual: 4 }], // máximo de resistência e resistência atual durante o jogo
    //habesp:
    imag:
      'https://media.discordapp.net/attachments/785721643393351700/785727416457756712/Kate_Winthrop.jpeg',
    aimag: 'https://cdn.discordapp.com/emojis/785687184266625024.png?v=1',
    murl:
      'https://discord.com/channels/785627856251781182/785721643393351700/785727416672190464',
  },

  {
    ...investigadorBase,
    nome: 'Mandy Thompson',
    id: 'man',
    desc: 'A Pesquisadora',
    sanid: [{ max: 5, atual: 5 }], // máximo de sanidade e sanidade atual durante o jogo
    resist: [{ max: 5, atual: 5 }], // máximo de resistência e resistência atual durante o jogo
    //habesp:
    pista: 1,
    imag:
      'https://media.discordapp.net/attachments/785721643393351700/785727501154123836/Mandy_Thompson.jpeg',
    aimag: 'https://cdn.discordapp.com/emojis/785687199277907978.png?v=1',
    murl:
      'https://discord.com/channels/785627856251781182/785721643393351700/785727501350862848',
  },

  {
    ...investigadorBase,
    nome: 'Michael McGlen',
    id: 'mic',
    desc: 'O Gângster',
    sanid: [{ max: 3, atual: 3 }], // máximo de sanidade e sanidade atual durante o jogo
    resist: [{ max: 7, atual: 7 }], // máximo de resistência e resistência atual durante o jogo
    //habesp:

    imag:
      'https://media.discordapp.net/attachments/785721643393351700/785727585639596062/Michael_McGlen.jpeg',
    aimag: 'https://cdn.discordapp.com/emojis/785687227614625822.png?v=1',
    murl:
      'https://discord.com/channels/785627856251781182/785721643393351700/785727585648246785',
  },

  {
    ...investigadorBase,
    nome: 'Monterey Jack',
    id: 'mon',
    desc: 'O Arqueólogo',
    sanid: [{ max: 3, atual: 3 }], // máximo de sanidade e sanidade atual durante o jogo
    resist: [{ max: 7, atual: 7 }], // máximo de resistência e resistência atual durante o jogo
    //habesp:
    imag:
      'https://media.discordapp.net/attachments/785721643393351700/785727689910124564/Monterey_Jack.jpeg',
    aimag: 'https://cdn.discordapp.com/emojis/785687130071367691.png?v=1',
    murl:
      'https://discord.com/channels/785627856251781182/785721643393351700/785727690111320094',
  },

  {
    ...investigadorBase,
    nome: 'Pete "Chaminé"',
    id: 'pet',
    desc: 'O Andarilho',
    sanid: { max: 4, atual: 4 }, // máximo de sanidade e sanidade atual durante o jogo
    resist: { max: 6, atual: 6 }, // máximo de resistência e resistência atual durante o jogo
    //habesp:
    imag:
      'https://media.discordapp.net/attachments/785721643393351700/785727819518967818/Pete_Chamine.jpeg',
    aimag: 'https://cdn.discordapp.com/emojis/785687243427676231.png?v=1',
    murl:
      'https://discord.com/channels/785627856251781182/785721643393351700/785727819858575360',
  },

  {
    ...investigadorBase,
    nome: 'Vincent Lee',
    id: 'vin',
    desc: 'O Doutor',
    sanid: { max: 5, atual: 5 }, // máximo de sanidade e sanidade atual durante o jogo
    resist: { max: 5, atual: 5 }, // máximo de resistência e resistência atual durante o jogo
    //habesp:
    imag:
      'https://media.discordapp.net/attachments/785721643393351700/785727914548789248/Vincent_Lee.jpeg',
    aimag: 'https://cdn.discordapp.com/emojis/785687261433823262.png?v=1',
    murl:
      'https://discord.com/channels/785627856251781182/785721643393351700/785727914749591552',
  },
]

export const idInvestigadores = INVESTIGADORES.map(i => i.id)

// export const tiraUmSinanidade = INVESTIGADORES.map(i => {
//   return {
//     ...i,
//     sanid: { max: 5, atual: i.sanid[0].atual - 1 }
//   }
// })