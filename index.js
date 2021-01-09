//paranauês pra conectar e config bot
const Discord = require("discord.js");
const config = require("./config.json");

const client = new Discord.Client();


// ######## ######## ######## ######## ######## ######## ########
// ######## ########       BANCOS DE DADOS      ######## ########
// ######## ######## ######## ######## ######## ######## ########
// ######## ########    BD ESTRUTURA DO JOGO    ######## ########
// ######## ########       BD VAR CONTROLE      ######## ########
var jogo = {  id: 0,
			  //atv: false,										// possui jogo em andamento?
			  modo: "-",										// modo de jogo
			  ancord: [],										// ordem dos anciões
			  ancatv: 0,										// posição do ancord[] que está ativo
			  invord: [],										// ordem dos turnos dos investigadores
			  incatv: 0,										// posição do ancord[] que está ativo
			  devord: [],										// ordem dos investigadores devorados
			  mitoatv: -1,										// índice da carta do mito ativa
			  maxv: 6,											// define qtd máxima de dados verdes que pode ser rolada

// ######## ######## ######## ######## ######## ########
// ######## ########	BD ANCIÕES     ######## ########
			maxanc: 8,
			canc: [{nome: "Azathoth", id: "aza", desc: "Destruição Total", simb: 14,
					perd: [{ativo: false, nmo: false}, {ativo: false, nmo: true}, {ativo: false, nmo: false}, {ativo: false, nmo: false}, {ativo: false, nmo: true}, {ativo: false, nmo: false}, {ativo: false, nmo: false}, {ativo: false, nmo: true}, {ativo: false, nmo: false}, {ativo: false, nmo: false}, {ativo: false, nmo: true}, {ativo: false, nmo: false}],
					poder: ` :earth_asia::boom: **O fim chegou!**   :earth_americas::boom: ***Azathoth* destruiu o mundo.**  :earth_africa::boom:`,			// o jogo acaba. simples assim
					nobar: true,							// está no baralho?
					ativo: false,							// é o ancião em desafio?
					destr: false,							// foi destruído?
					imag: "https://media.discordapp.net/attachments/785724975520415787/785725195835015188/Azathoth.jpeg"},								// link da imagem			

				{nome:"Cthulhu",							// nome
					id: "cth",								// canc.id vai fazer muita coisa, eu acho...
					desc: "Sonhos de Loucura",
					simb: 13,								// limite de Símbolos Ancestrais
					perd: [{ativo: false, nmo: false},		// indicador da Perdição
						   {ativo: false, nmo: false},		// nOVO moNSTRO?
						   {ativo: false, nmo: true},
						   {ativo: false, nmo: false},
						   {ativo: false, nmo: true},
						   {ativo: false, nmo: false},
						   {ativo: false, nmo: true},
						   {ativo: false, nmo: false},
						   {ativo: false, nmo: true},
						   {ativo: false, nmo: false},
						   {ativo: false, nmo: false}],
					bat: [{d: "T"},							// desafio da Batalha
						  {d: "C"},							// N = qntd de lupas; C = conhecimento; P = perigo; T = terror
						  {d: "P"}],
					// poder:								// habilidade especial durante o jogo
					// ataq:								// ataque durante a Batalha
					nobar: true,
					ativo: false,
					destr: false,
					imag: "https://media.discordapp.net/attachments/785724975520415787/785725313417478184/Cthulhu.jpeg"},
				
				{nome:"Hastur",
					id: "has",
					desc: "O Rei de Amarelo",
					simb: 13,
					perd: [{ativo: false, nmo: false}, {ativo: false, nmo: false}, {ativo: false, nmo: true}, {ativo: false, nmo: false}, {ativo: false, nmo: false}, {ativo: false, nmo: true}, {ativo: false, nmo: true}, {ativo: false, nmo: false}, {ativo: false, nmo: true}, {ativo: false, nmo: true}, {ativo: false, nmo: false}],
					bat: [{d: 0}, // <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<  igual ao número de Monstros no jogo <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
						  {d: "C"},
						  {d: "T"}],
					// poder:
					// ataq:
					nobar: true,
					ativo: false,
					destr: false,
					imag: "https://media.discordapp.net/attachments/785724975520415787/785725454119338024/Hastur.jpeg"},

				{nome:"Ithaqua",
					id: "ith",
					desc: "Ventos Congelantes",
					simb: 11,
					perd: [{ativo: false, nmo: false}, {ativo: false, nmo: false}, {ativo: false, nmo: true}, {ativo: false, nmo: false}, {ativo: false, nmo: true}, {ativo: false, nmo: false}, {ativo: false, nmo: false}, {ativo: false, nmo: true}, {ativo: false, nmo: false}],
					bat: [{d: 3},
						  {d: "T"},
						  {d: "P"}],
					// poder:
					// ataq:
					nobar: true,
					ativo: false,
					destr: false,
					imag: "https://media.discordapp.net/attachments/785724975520415787/785725556813201426/Ithaqua.jpeg"},

				{nome:"Nyarlathotep",
					id: "nya",
					desc: "As Mil Máscaras",
					simb: 11,
					perd: [{ativo: false, nmo: true}, {ativo: false, nmo: false}, {ativo: false, nmo: true}, {ativo: false, nmo: false}, {ativo: false, nmo: true}, {ativo: false, nmo: false}, {ativo: false, nmo: true}, {ativo: false, nmo: false}, {ativo: false, nmo: false}],
					bat: [{d: "T"},
						  {d: "T"}],
					// poder:
					// ataq:
					nobar: true,
					ativo: false,
					destr: false,
					imag: 'https://media.discordapp.net/attachments/785724975520415787/785725690753712168/Nyarlathotep.jpeg'},

				{nome:"Shub-Niggurath",
					id: "shu",
					desc: "A Cabra Negra do Bosque",
					simb: 12,
					bat: [{ativo: false, mo: true}, {ativo: false, nmo: false}, {ativo: false, nmo: true}, {ativo: false, nmo: true}, {ativo: false, nmo: true}, {ativo: false, nmo: false}, {ativo: false, nmo: true}, {ativo: false, nmo: true}, {ativo: false, nmo: true}, {ativo: false, nmo: false}],
					bat: [{d: "C"},
						  {d: "C"},
						  {d: "T"}],
					// poder:
					// ataq:
					nobar: true,
					ativo: false,
					destr: false,
					imag: 'https://media.discordapp.net/attachments/785724975520415787/785725801840377866/Shub-Niggurath.jpeg'},

				{nome:"Yig",
					id: "yig",
					desc: "A Fúria de Yig",
					simb: 10,
					perd: [{ativo: false, nmo: true}, {ativo: false, nmo: false}, {ativo: false, nmo: true}, {ativo: false, nmo: true}, {ativo: false, nmo: true}, {ativo: false, nmo: false}, {ativo: false, nmo: true}, {ativo: false, nmo: false}],
					bat: [{d: "P"},
						  {d: "P"}],
					// poder:
					// ataq:
					nobar: true,
					ativo: false,
					destr: false,
					imag: 'https://media.discordapp.net/attachments/785724975520415787/785725890113437696/Yig.jpeg'},

				{nome:"Yog-Sothoth",
					id: "yog",
					desc: "A Chave e o Portal",
					simb: 12,
					perd: [{ativo: false, nmo: false}, {ativo: false, nmo: false}, {ativo: false, nmo: true}, {ativo: false, nmo: false}, {ativo: false, nmo: false}, {ativo: false, nmo: true}, {ativo: false, nmo: false}, {ativo: false, nmo: true}, {ativo: false, nmo: true}, {ativo: false, nmo: false}],
					bat: [{d: 3},
						  {d: "C"},
						  {d: "C"}],
					// poder:
					// ataq:
					nobar: true,
					ativo: false,
					destr: false,
					imag: 'https://media.discordapp.net/attachments/785724975520415787/785725989787140106/Yog-Sothoth.jpeg'}],

// ######## ######## ######## ######## ######## ######## ########
// ######## ########  	 BD INVESTIGADORES  	######## ########			
			maxinv: 16,
			cinvs: [{nome:"Amanda Sharpe",				// nome e
						id: "ama",						// identificador e
						desc: "A Estudante",			// ocupação do investigador
						sanid:  [{max: 5, atual: 5}],	// máximo de sanidade e sanidade atual durante o jogo
						resist: [{max: 5, atual: 5}],	// máximo de resistência e resistência atual durante o jogo
						//habesp:						// efeito da habilidade especial do investigador
						itens: [],						// itens atuais durante o jogo, iniciados com itens iniciais
						pista: 0,						// pistas atuais durante o jogo
						trof: [],						// troféus
						naent: 	true,					// está na Entrada?
						ativo:  false,					// está em jogo?
						devor:  false,					// foi devorado?
						nobar: true,					// está no baralho?
						imag: "https://media.discordapp.net/attachments/785721643393351700/785726472923906078/Amanda_Sharpe.jpeg",		// link da imagem
						aimag: "https://cdn.discordapp.com/emojis/785687006335205413.png?v=1",											// link da imagem do emoji
						murl: "https://discord.com/channels/785627856251781182/785721643393351700/785726473277145128"},																										// link da mensagem no canal #investigadores		
					
					{nome:"Bob Jenkins",
						id: "bob",
						desc: "O Vendedor",				// ocupação do investigador
						sanid:  [{max: 4, atual: 4}],	// máximo de sanidade e sanidade atual durante o jogo
						resist: [{max: 6, atual: 6}],	// máximo de resistência e resistência atual durante o jogo
						//habesp:						// efeito da habilidade especial do investigador
						itens: [],						// itens atuais durante o jogo, iniciados com itens iniciais
						pista: 0,						// pistas atuais durante o jogo
						trof: [],
						naent: 	true,					// está na Entrada?
						ativo:  false,
						devor:  false,					// foi devorado?
						nobar: true,					// está no baralho?
						imag: 'https://media.discordapp.net/attachments/785721643393351700/785726618068582411/Bob_Jenkins.jpeg',
						aimag: "https://cdn.discordapp.com/emojis/785682649917947936.png?v=1",
						murl: "https://discord.com/channels/785627856251781182/785721643393351700/785726618340819004"},
						
					{nome:"Carolyn Fern",
						id: "car",
						desc: "A Psicóloga",			// ocupação do investigador
						sanid:  [{max: 6, atual: 6}],	// máximo de sanidade e sanidade atual durante o jogo
						resist: [{max: 4, atual: 4}],	// máximo de resistência e resistência atual durante o jogo
						//habesp:						// efeito da habilidade especial do investigador
						itens: [],						// itens atuais durante o jogo, iniciados com itens iniciais
						pista: 0,						// pistas atuais durante o jogo
						trof: [],
						naent:  true,					// está na Entrada?
						ativo:  false,
						devor:  false,					// foi devorado?
						nobar: true,					// está no baralho?
						imag: 'https://media.discordapp.net/attachments/785721643393351700/785726708098924594/Carolyn_Fern.jpeg',
						aimag: "https://cdn.discordapp.com/emojis/785687020827049994.png?v=1",
						murl: "https://discord.com/channels/785627856251781182/785721643393351700/785726708116488233"},
						
					{nome:"Darrell Simmons",
						id: "dar",
						desc: "O Fotógrafo",
						sanid:  [{max: 4, atual: 4}],	// máximo de sanidade e sanidade atual durante o jogo
						resist: [{max: 6, atual: 6}],	// máximo de resistência e resistência atual durante o jogo
						//habesp:
						itens: [],
						pista: 0,
						trof: [],
						naent:  true,
						ativo:  false,
						devor:  false,					// foi devorado?
						nobar: true,
						imag: 'https://media.discordapp.net/attachments/785721643393351700/785726807868833822/Darrell_Simmons.jpeg',
						aimag: "https://cdn.discordapp.com/emojis/785687032030035979.png?v=1",
						murl: "https://discord.com/channels/785627856251781182/785721643393351700/785726808057839626"},
						
					{nome:"Dexter Drake",
						id: "dex",
						desc: "O Mágico",
						sanid:  [{max: 5, atual: 5}],	// máximo de sanidade e sanidade atual durante o jogo
						resist: [{max: 5, atual: 5}],	// máximo de resistência e resistência atual durante o jogo
						//habesp:
						itens: [],
						pista: 0,
						trof: [],
						naent:  true,
						ativo:  false,
						devor:  false,					// foi devorado?
						nobar: true,
						imag: 'https://media.discordapp.net/attachments/785721643393351700/785726895902818304/Dexter_Drake.jpeg',
						aimag: "https://cdn.discordapp.com/emojis/785687088807936050.png?v=1",
						murl: "https://discord.com/channels/785627856251781182/785721643393351700/785726896138616862"},
						
					{nome:"Gloria Goldberg",
						id: "glo",
						desc: "A Autora",
						sanid:  [{max: 6, atual: 6}],	// máximo de sanidade e sanidade atual durante o jogo
						resist: [{max: 4, atual: 4}],	// máximo de resistência e resistência atual durante o jogo
						//habesp:
						itens: [],
						pista: 0,
						trof: [],
						naent: 	true,
						ativo:  false,
						devor:  false,					// foi devorado?
						nobar: true,
						imag: 'https://media.discordapp.net/attachments/785721643393351700/785726977876426752/Gloria_Goldberg.jpeg',
						aimag: "https://cdn.discordapp.com/emojis/785687102108467230.png?v=1",
						murl: "https://discord.com/channels/785627856251781182/785721643393351700/785726978094923776"},
						
					{nome:"Harvey Walters",
						id: "har",
						desc: "O Professor",
						sanid:  [{max: 7, atual: 7}],	// máximo de sanidade e sanidade atual durante o jogo
						resist: [{max: 3, atual: 3}],	// máximo de resistência e resistência atual durante o jogo
						//habesp:
						itens: [],
						pista: 0,
						trof: [],
						naent:  true,
						ativo:  false,
						devor:  false,					// foi devorado?
						nobar: true,
						imag: 'https://media.discordapp.net/attachments/785721643393351700/785727063155802162/Harvey_Walters.jpeg',
						aimag: "https://cdn.discordapp.com/emojis/785687114020945930.png?v=1",
						murl: "https://discord.com/channels/785627856251781182/785721643393351700/785727063415324722"},
						
					{nome:"Irmã Mary",
						id: "irm",
						desc: "A Freira",
						sanid:  [{max: 7, atual: 7}],	// máximo de sanidade e sanidade atual durante o jogo
						resist: [{max: 3, atual: 3}],	// máximo de resistência e resistência atual durante o jogo
						//habesp:
						itens: [],
						pista: 0,
						trof: [],
						naent: 	true,
						ativo:  false,
						devor:  false,			// foi devorado?
						nobar: true,
						imag: 'https://media.discordapp.net/attachments/785721643393351700/785727160585420800/Irma_Mary.jpeg',
						aimag: "https://cdn.discordapp.com/emojis/785687212384845865.png?v=1",
						murl: "https://discord.com/channels/785627856251781182/785721643393351700/785727160882692127"},
						
					{nome:"Jenny Barnes",
						id: "jen",
						desc: "A Diletante",
						sanid:  [{max: 6, atual: 6}],	// máximo de sanidade e sanidade atual durante o jogo
						resist: [{max: 4, atual: 4}],	// máximo de resistência e resistência atual durante o jogo
						//habesp:
						itens: [],
						pista: 0,
						trof: [],
						naent: 	true,
						ativo:  false,
						devor:  false,					// foi devorado?
						nobar: true,
						imag: 'https://media.discordapp.net/attachments/785721643393351700/785727232537526303/Jenny_Barnes.jpeg',
						aimag: "https://cdn.discordapp.com/emojis/785687145754132490.png?v=1",
						murl: "https://discord.com/channels/785627856251781182/785721643393351700/785727232462422017"},
						
					{nome:"Joe Diamond",
						id: "joe",
						desc: "O Detetive Particular",
						sanid:  [{max: 4, atual: 4}],	// máximo de sanidade e sanidade atual durante o jogo
						resist: [{max: 6, atual: 6}],	// máximo de resistência e resistência atual durante o jogo
						//habesp:
						itens: [],
						pista: 1,
						trof: [],
						naent: 	true,
						ativo:  false,
						devor:  false,					// foi devorado?
						nobar: true,
						imag: 'https://media.discordapp.net/attachments/785721643393351700/785727318672408626/Joe_Diamond.jpeg',
						aimag: "https://cdn.discordapp.com/emojis/785687170718761000.png?v=1",
						murl: "https://discord.com/channels/785627856251781182/785721643393351700/785727318915285032"},
						
					{nome:"Kate Winthrop",
						id: "kat",
						desc: "A Cientista",
						sanid:  [{max: 6, atual: 6}],	// máximo de sanidade e sanidade atual durante o jogo
						resist: [{max: 4, atual: 4}],	// máximo de resistência e resistência atual durante o jogo
						//habesp:
						itens: [],
						pista: 0,
						trof: [],
						naent: 	true,
						ativo:  false,
						devor:  false,			// foi devorado?
						nobar: true,
						imag: 'https://media.discordapp.net/attachments/785721643393351700/785727416457756712/Kate_Winthrop.jpeg',
						aimag: "https://cdn.discordapp.com/emojis/785687184266625024.png?v=1",
						murl: "https://discord.com/channels/785627856251781182/785721643393351700/785727416672190464"},
						
					{nome:"Mandy Thompson",
						id: "man",
						desc: "A Pesquisadora",
						sanid:  [{max: 5, atual: 5}],	// máximo de sanidade e sanidade atual durante o jogo
						resist: [{max: 5, atual: 5}],	// máximo de resistência e resistência atual durante o jogo
						//habesp:
						itens: [],
						pista: 1,
						trof: [],
						naent: 	true,
						ativo:  false,
						devor:  false,			// foi devorado?
						nobar: true,
						imag: 'https://media.discordapp.net/attachments/785721643393351700/785727501154123836/Mandy_Thompson.jpeg',
						aimag: "https://cdn.discordapp.com/emojis/785687199277907978.png?v=1",
						murl: "https://discord.com/channels/785627856251781182/785721643393351700/785727501350862848"},
						
					{nome:"Michael McGlen",
						id: "mic",
						desc: "O Gângster",
						sanid:  [{max: 3, atual: 3}],	// máximo de sanidade e sanidade atual durante o jogo
						resist: [{max: 7, atual: 7}],	// máximo de resistência e resistência atual durante o jogo
						//habesp:
						itens: [],
						pista: 0,
						trof: [],
						naent:	true,
						ativo:  false,
						devor:  false,			// foi devorado?
						nobar: true,
						imag: 'https://media.discordapp.net/attachments/785721643393351700/785727585639596062/Michael_McGlen.jpeg',
						aimag: "https://cdn.discordapp.com/emojis/785687227614625822.png?v=1",
						murl: "https://discord.com/channels/785627856251781182/785721643393351700/785727585648246785"},
						
					{nome:"Monterey Jack",
						id: "mon",
						desc: "O Arqueólogo",
						sanid:  [{max: 3, atual: 3}],	// máximo de sanidade e sanidade atual durante o jogo
						resist: [{max: 7, atual: 7}],	// máximo de resistência e resistência atual durante o jogo
						//habesp:
						itens: [],
						pista: 0,
						trof: [],
						naent: 	true,
						ativo:  false,
						devor:  false,			// foi devorado?
						nobar: true,
						imag: 'https://media.discordapp.net/attachments/785721643393351700/785727689910124564/Monterey_Jack.jpeg',
						aimag: "https://cdn.discordapp.com/emojis/785687130071367691.png?v=1",
						murl: "https://discord.com/channels/785627856251781182/785721643393351700/785727690111320094"},
						
					{nome:"Pete \"Chaminé\"",
						id: "pet",
						desc: "O Andarilho",
						sanid:  [{max: 4, atual: 4}],	// máximo de sanidade e sanidade atual durante o jogo
						resist: [{max: 6, atual: 6}],	// máximo de resistência e resistência atual durante o jogo
						//habesp:
						itens: [],		// Pete começa com o Aliado Duke
						pista: 0,
						trof: [],
						naent: 	true,
						ativo:  false,
						devor:  false,			// foi devorado?
						nobar: true,
						imag: 'https://media.discordapp.net/attachments/785721643393351700/785727819518967818/Pete_Chamine.jpeg',
						aimag: "https://cdn.discordapp.com/emojis/785687243427676231.png?v=1",
						murl: "https://discord.com/channels/785627856251781182/785721643393351700/785727819858575360"},

					{nome:"Vincent Lee",
						id: "vin",
						desc: "O Doutor",
						sanid:  [{max: 5, atual: 5}],	// máximo de sanidade e sanidade atual durante o jogo
						resist: [{max: 5, atual: 5}],	// máximo de resistência e resistência atual durante o jogo
						//habesp:
						itens: [],
						pista: 0,
						trof: [],
						naent: 	true,
						ativo:  false,
						devor:  false,			// foi devorado?
						nobar: true,
						imag: 'https://media.discordapp.net/attachments/785721643393351700/785727914548789248/Vincent_Lee.jpeg',
						aimag: "https://cdn.discordapp.com/emojis/785687261433823262.png?v=1",
						murl: "https://discord.com/channels/785627856251781182/785721643393351700/785727914749591552"}],

// ######## ######## ######## ######## ######## ########
// ######## ########    BD AVENTURAS   ######## ########
			maxavnt: 48,
			cavnt: [{nome:"A Chave para o Além", tipo: "avent", disp: true, nobar: true, trof: 0},
				  {nome:"A Inscrição na Parede", tipo: "avent", disp: true, nobar: true},
				  {nome:"A Loja de Lembranças", tipo: "avent", disp: true, nobar: true},
				  {nome:"A Passagem Secreta", tipo: "avent", disp: true, nobar: true},
				  {nome:"Alguma Coisa Escapou", tipo: "avent", disp: true, nobar: true},
				  {nome:"Ao Cair da Noite", tipo: "avent", disp: true, nobar: true},
				  {nome:"Arrombamento na Madrugada", tipo: "avent", disp: true, nobar: true},
				  {nome:"Assombrado por uma Figura Sombria", tipo: "avent", disp: true, nobar: true},
				  {nome:"Baile de Gala no Salão Principal", tipo: "avent", disp: true, nobar: true},
				  {nome:"Conhecimento Esquecido", tipo: "avent", disp: true, nobar: true},
				  {nome:"Corredor em Chamas", tipo: "avent", disp: true, nobar: true},
				  {nome:"Exposição da Medusa", tipo: "avent", disp: true, nobar: true},
				  {nome:"Fiquem Longe das Janelas", tipo: "avent", disp: true, nobar: true},
				  {nome:"Há Algo no Porão", tipo: "avent", disp: true, nobar: true},
				  {nome:"Hábitat Sobrenatural", tipo: "avent", disp: true, nobar: true},
				  {nome:"Lagoa de Carpas Ornamentais", tipo: "avent", disp: true, nobar: true},
				  {nome:"Não Durma", tipo: "avent", disp: true, nobar: true},
				  {nome:"Não Toque nos Objetos", tipo: "avent", disp: true, nobar: true},
				  {nome:"O Cemitério", tipo: "avent", disp: true, nobar: true},
				  {nome:"O Curador", tipo: "avent", disp: true, nobar: true},
				  {nome:"O Gabinete de Armazenamento", tipo: "avent", disp: true, nobar: true},
				  {nome:"O Labirinto", tipo: "avent", disp: true, nobar: true},
				  {nome:"O Salão dos Mortos", tipo: "avent", disp: true, nobar: true},
				  {nome:"O Setor de Carga", tipo: "avent", disp: true, nobar: true},
				  {nome:"O Símbolo Ancestral", tipo: "avent", disp: true, nobar: true},
				  {nome:"Os Arquivos", tipo: "avent", disp: true, nobar: true},
				  {nome:"Os Registros Perdidos", tipo: "avent", disp: true, nobar: true},
				  {nome:"Portal para Outro Lugar", tipo: "avent", disp: true, nobar: true},
				  {nome:"Precisamos de Ajuda", tipo: "avent", disp: true, nobar: true},
				  {nome:"Ratos no Encanamento", tipo: "avent", disp: true, nobar: true},
				  {nome:"Relíquias Antigas", tipo: "avent", disp: true, nobar: true},
				  {nome:"Restos do Sumo Sacerdote", tipo: "avent", disp: true, nobar: true},
				  {nome:"Revolta nas Ruas", tipo: "avent", disp: true, nobar: true},
				  {nome:"Sala da Segurança", tipo: "avent", disp: true, nobar: true},
				  {nome:"Sala de Administração", tipo: "avent", disp: true, nobar: true},
				  {nome:"Sangue no Chão", tipo: "avent", disp: true, nobar: true},
				  {nome:"Sanitário Público", tipo: "avent", disp: true, nobar: true},
				  {nome:"Sem Luz", tipo: "avent", disp: true, nobar: true},
				  {nome:"Tempestade em Copo D'Água", tipo: "avent", disp: true, nobar: true},
				  {nome:"Tomo Misterioso", tipo: "avent", disp: true, nobar: true},
				  {nome:"Tour Guiado", tipo: "avent", disp: true, nobar: true},
				  {nome:"Transportado por Mágica", tipo: "avent", disp: true, nobar: true},
				  {nome:"Um Espécime Peculiar", tipo: "avent", disp: true, nobar: true},
				  {nome:"Uma Descoberta Terrível", tipo: "avent", disp: true, nobar: true},
				  {nome:"Uma Reunião Secreta", tipo: "avent", disp: true, nobar: true},
				  {nome:"Visões Horríveis", tipo: "avent", disp: true, nobar: true},
				  {nome:"Você Ouviu Isso?", tipo: "avent", disp: true, nobar: true},
				  {nome:"Você se Transforma Naquilo que Mais Teme", tipo: "avent", disp: true, nobar: true}],

// ######## ######## ######## ######## ######## ########
// ######## ########   BD OUTRO MUNDO  ######## ########
			maxom: 8,
			com: [{nome:"As Terras Oníricas", tipo: "omund", disp: true, nobar: true,
				  imag: "https://media.discordapp.net/attachments/792380732513058816/792380915086786570/As_Terras_Oniricas.jpeg?width=385&height=655"},
				   {nome:"Cidade da Grande Raça", tipo: "omund", disp: true, nobar: true,
				  imag: "https://media.discordapp.net/attachments/792380974595964948/792381097987407912/Cidade_da_Grande_Raca.jpeg?width=389&height=655"},
				   {nome:"Grande Salão de Celeno", tipo: "omund", disp: true, nobar: true,
				  imag: "https://media.discordapp.net/attachments/792399514903379998/792399579966472252/Grande_Salao_de_Celeno.jpeg?width=389&height=655"},
				   {nome:"O Abismo", tipo: "omund", disp: true, nobar: true,
				  imag: "https://media.discordapp.net/attachments/792399638795386880/792399693844840448/O_Abismo.jpeg?width=389&height=655"},
				   {nome:"Outra Dimensão", tipo: "omund", disp: true, nobar: true,
				  imag: "https://media.discordapp.net/attachments/792399734122741810/792399784849833984/Outra_Dimensao.jpeg?width=384&height=655"},
				   {nome:"Planalto de Leng", tipo: "omund", disp: true, nobar: true,
				  imag: "https://media.discordapp.net/attachments/792399825529602099/792399914079617074/Planalto_de_Leng.jpeg?width=379&height=655"},
				   {nome:"R'lyeh", tipo: "omund", disp: true, nobar: true,
				  imag: "https://media.discordapp.net/attachments/792400039108280340/792400130321940491/Rlyeh.jpeg?width=386&height=655"},
				   {nome:"Yuggoth", tipo: "omund", disp: true, nobar: true,
				  imag: "https://media.discordapp.net/attachments/792400189418897418/792400284768141332/Yuggoth.jpeg?width=386&height=655"}],

// ######## ######## ######## ######## ######## ######## ########
// ######## ########  	 BD CARTAS DO MITO  	######## ########
			maxmito: 32,
			cmito: [{nome:"A Loucura Toma Conta... Para Trazer Horrores", tipo: "mito", disp: true, nobar: true,
						imag: "https://media.discordapp.net/attachments/793971900883402764/793972330443440138/A_Loucura_Toma_Conta_Para_Trazer_Horrores.jpeg?width=424&height=654"},
				  {nome:"Aparelhos Esotéricos... Revelam uma Pista Falsa", tipo: "mito", disp: true, nobar: true,
					imag: "https://media.discordapp.net/attachments/793972531999670322/793972602552975420/Aparelhos_Esotericos_Revelam_uma_Pista_Falsa.jpeg?width=420&height=655"},
				  {nome:"As Artes Arcanas... Fecham as Portas", tipo: "mito", disp: true, nobar: true,
					imag: "https://media.discordapp.net/attachments/793972825287294996/793972880030695424/As_Artes_Arcanas_Fecham_as_Portas.jpeg?width=423&height=654"},
				  {nome:"As Estrelas se Alinham... Acima das Nuvens Negras", tipo: "mito", disp: true, nobar: true,
					imag: "https://media.discordapp.net/attachments/793973049363529728/793973124269473843/As_Estrelas_se_Alinham_Acima_das_Nuvens_Negras.jpeg?width=422&height=654"},
				  {nome:"As Estrelas se Alinham... Antes de a Razão Perecer", tipo: "mito", disp: true, nobar: true,
					imag: "https://media.discordapp.net/attachments/793973248999030854/793973326858813450/As_Estrelas_se_Alinham_Antes_de_a_Razao_Perecer.jpeg?width=421&height=654"},
				  {nome:"As Estrelas se Alinham... Em Meio à Calmaria", tipo: "mito", disp: true, nobar: true,
					imag: "https://media.discordapp.net/attachments/793974029237092362/793974085784043590/As_Estrelas_se_Alinham_Em_Meio_a_Calmaria.jpeg?width=424&height=655"},
				  {nome:"As Estrelas se Alinham... Em Meio à Calmaria", tipo: "mito", disp: true, nobar: true,
					imag: "https://media.discordapp.net/attachments/793974029237092362/793974085784043590/As_Estrelas_se_Alinham_Em_Meio_a_Calmaria.jpeg?width=424&height=655"},
				  {nome:"As Estrelas se Alinham... Em Meio à Calmaria", tipo: "mito", disp: true, nobar: true,
					imag: "https://media.discordapp.net/attachments/793974029237092362/793974085784043590/As_Estrelas_se_Alinham_Em_Meio_a_Calmaria.jpeg?width=424&height=655"},
				  {nome:"As Estrelas se Alinham... Em Meio à Calmaria", tipo: "mito", disp: true, nobar: true,
					imag: "https://media.discordapp.net/attachments/793974029237092362/793974085784043590/As_Estrelas_se_Alinham_Em_Meio_a_Calmaria.jpeg?width=424&height=655"},
				  {nome:"As Estrelas se Alinham... Para Trazer Horrores", tipo: "mito", disp: true, nobar: true,
					imag: "https://media.discordapp.net/attachments/793974166457942117/793974221373440020/As_Estrelas_se_Alinham_Para_Trazer_Horrores.jpeg?width=425&height=655"},
				  {nome:"As Estrelas se Alinham... Sobre uma Porta Aberta", tipo: "mito", disp: true, nobar: true,
					imag: "https://media.discordapp.net/attachments/793974525536632882/793974591231492116/As_Estrelas_se_Alinham_Sobre_uma_Porta_Aberta.jpeg?width=427&height=655"},
				  {nome:"As Ferramentas Certas... Criam uma Fenda", tipo: "mito", disp: true, nobar: true,
					imag: "https://media.discordapp.net/attachments/793974653810507837/793974801663655937/As_Ferramentas_Certas_Criam_uma_Fenda.jpeg?width=423&height=655"},
				  {nome:"Bens Pessoais... Trazem Boa Sorte", tipo: "mito", disp: true, nobar: true,
					imag: "https://media.discordapp.net/attachments/793974870877667409/793974933306736640/Bens_Pessoais_Trazem_Boa_Sorte.jpeg?width=425&height=655"},
				  {nome:"Conhecimento Tétrico... Numa Mente Perturbada", tipo: "mito", disp: true, nobar: true,
					imag: "https://media.discordapp.net/attachments/793976888669241375/793976948745043988/Conhecimento_Tetrico_Numa_Mente_Perturbada.jpeg?width=427&height=654"},
				  {nome:"Entidades Sombrias... Em Meio à Calmaria", tipo: "mito", disp: true, nobar: true,
					imag: "https://media.discordapp.net/attachments/793977000460419112/793977060821303426/Entidades_Sombrias_Em_Meio_a_Calmaria.jpeg?width=422&height=655"},
				  {nome:"Esteja Preparado... Para Pesadelos Reais", tipo: "mito", disp: true, nobar: true,
					imag: "https://media.discordapp.net/attachments/793977120040419348/793977184392970260/Esteja_Preparado_Para_Pesadelos_Reais.jpeg?width=422&height=655"},
				  {nome:"Fraqueza Exposta... Em Meio à Calmaria", tipo: "mito", disp: true, nobar: true,
					imag: "https://media.discordapp.net/attachments/793977360738156554/793977429369552976/Fraqueza_Exposta_Em_Meio_a_Calmaria.jpeg?width=423&height=655"},
				  {nome:"Mantenha os Amigos Próximos... Quando as Memórias Desvanecerem", tipo: "mito", disp: true, nobar: true,
					imag: "https://media.discordapp.net/attachments/793977485397721118/793977570046902332/Mantenha_os_Amigos_Proximos_Quando_as_Memorias_Desvanecerem.jpeg?width=425&height=654"},
				  {nome:"Monstros Horríveis... Revelam um Segredo", tipo: "mito", disp: true, nobar: true,
					imag: "https://media.discordapp.net/attachments/793977711567044621/793977771566694440/Monstros_Horriveis_Revelam_um_Segredo.jpeg?width=417&height=655"},
				  {nome:"Terror Repentino... Em Meio à Calmaria", tipo: "mito", disp: true, nobar: true,
					imag: "https://media.discordapp.net/attachments/793977842765529148/793977894744752169/Terror_Repentino_Em_Meio_a_Calmaria.jpeg?width=423&height=654"},
				  {nome:"Um Aviso... De Pesadelos Reais", tipo: "mito", disp: true, nobar: true,
					imag: "https://media.discordapp.net/attachments/793977959961853954/793978015860260904/Um_Aviso_De_Pesadelos_Reais.jpeg?width=426&height=654"},
				  {nome:"Um Aviso... De uma Conspiração", tipo: "mito", disp: true, nobar: true,
					imag: "https://media.discordapp.net/attachments/793978064324919308/793978128539582464/Um_Aviso_De_uma_Conspiracao.jpeg?width=424&height=655"},
				  {nome:"Um Aviso... De uma Maldição", tipo: "mito", disp: true, nobar: true,
					imag: "https://media.discordapp.net/attachments/793978201935577088/793978275768565800/Um_Aviso_De_uma_Maldicao.jpeg?width=426&height=655"},
				  {nome:"Um Aviso... De uma Prisão Obscura", tipo: "mito", disp: true, nobar: true,
					imag: "https://media.discordapp.net/attachments/793978327891312670/793978436321411072/Um_Aviso_De_uma_Prisao_Obscura.jpeg?width=429&height=655"},
				  {nome:"Um Caminho Tortuoso... Para Trazer Horrores", tipo: "mito", disp: true, nobar: true,
					imag: "https://media.discordapp.net/attachments/793978515951321148/793978564688609330/Um_Caminho_Tortuoso_Para_Trazer_Horrores.jpeg?width=427&height=655"},
				  {nome:"Um Fardo Pesado... Em Meio à Calmaria", tipo: "mito", disp: true, nobar: true,
					imag: "https://media.discordapp.net/attachments/793978730821320744/793978781466886235/Um_Fardo_Pesado_Em_Meio_a_Calmaria.jpeg?width=423&height=655"},
				  {nome:"Um Preço Alto Demais... Para Trazer Horrores", tipo: "mito", disp: true, nobar: true,
					imag: "https://media.discordapp.net/attachments/793984737546731540/793984789422145606/Um_Preco_Alto_Demais_Para_Trazer_Horrores.jpeg?width=430&height=655"},
				  {nome:"Visões Estranhas... Antes da Tempestade", tipo: "mito", disp: true, nobar: true,
					imag: "https://media.discordapp.net/attachments/793984851500859413/793984918463578142/Visoes_Estranhas_Antes_da_Tempestade.jpeg?width=422&height=655"},
				  {nome:"Visões Estranhas... De uma Armadilha Venenosa", tipo: "mito", disp: true, nobar: true,
					imag: "https://media.discordapp.net/attachments/793984999732805685/793985048583471104/Visoes_Estranhas_De_uma_Armadilha_Venenosa.jpeg?width=424&height=655"},
				  {nome:"Visões Estranhas... Em Meio à Calmaria", tipo: "mito", disp: true, nobar: true,
					imag: "https://media.discordapp.net/attachments/793985217785233409/793985287553548328/Visoes_Estranhas_Em_Meio_a_Calmaria.jpeg?width=425&height=655"},
				  {nome:"Visões Estranhas... Em Meio à Calmaria", tipo: "mito", disp: true, nobar: true,
					imag: "https://media.discordapp.net/attachments/793985217785233409/793985287553548328/Visoes_Estranhas_Em_Meio_a_Calmaria.jpeg?width=425&height=655"},
				  {nome:"Visões Estranhas... Nas Sombras à Espreita", tipo: "mito", disp: true, nobar: true,
					imag: "https://media.discordapp.net/attachments/793985348194664508/793985451949424700/Visoes_Estranhas_nas_Sombras_a_Espreita.jpeg?width=423&height=655"}],

// ######## ######## ######## ######## ######## ########
// ######## ########  BD ITENS COMUNS  ######## ########
			maxcom: 12,
			ccom: [{nome:"Cigarreira da Sorte",						// nome do item
					  id: "cig",									// id do item
					tipo: "comum",									// tipo do item
				   invst: "-",										// id de quem está com o item. se "-", item está com ninguém (ainda no baralho (nobar == 1) ou usado (nobar == 0 && disp == 1))
					disp: true,										// disponível para reembaralho? (item foi usado?)
				  nobar: true,										// está no baralho?
					imag: "https://media.discordapp.net/attachments/792431832171937792/792431879525630002/Cigarreira_da_Sorte.jpeg?width=426&height=655"},				// link da imagem do item
				{nome:"Comida", id: "com", tipo: "comum", invst:"-", disp: true, nobar: true,
				imag: "https://media.discordapp.net/attachments/792432321323991100/792432391456817152/Comida.jpeg?width=419&height=655"},
				{nome:"Diário Antigo", id: "dia", tipo: "comum", invst: "-", disp: true, nobar: true,
				imag: "https://media.discordapp.net/attachments/792432425350856735/792432478551146506/Diario_Antigo.jpeg?width=430&height=655"},
				{nome:"Dinamite", id: "din", tipo: "comum", invst: "-", disp: true, nobar: true,
				imag: "https://media.discordapp.net/attachments/792432516509466674/792432583006093332/Dinamite.jpeg?width=431&height=655"},
				{nome:"Espingarda", id: "esg", tipo: "comum", invst: "-", disp: true, nobar: true,
				imag: "https://media.discordapp.net/attachments/792432620758630451/792432668360310794/Espingarda.jpeg?width=423&height=655"},
				{nome:"Faca", id: "fac", tipo: "comum", invst: "-", disp: true, nobar: true,
				imag: "https://media.discordapp.net/attachments/792432700421963796/792432743945338930/Faca.jpeg?width=424&height=654"},
				{nome:"Lanterna", id: "lan", tipo: "comum", invst: "-", disp: true, nobar: true,
				imag: "https://media.discordapp.net/attachments/792432773922553897/792432825222692924/Lanterna.jpeg?width=427&height=654"},
				{nome:"Machado", id: "mac", tipo: "comum", invst: "-", disp: true, nobar: true,
				imag: "https://media.discordapp.net/attachments/792432856156602388/792432940649807882/Machado.jpeg?width=432&height=655"},
				{nome:"Pistola Automática .45", id: "pis", tipo: "comum", invst: "-", disp: true, nobar: true,
				imag: "https://media.discordapp.net/attachments/792433018416529414/792433094568575036/Pistola_Automatica_45.jpeg?width=429&height=655"},
				{nome:"Revólver .38", id: "rev", tipo: "comum", invst: "-", disp: true, nobar: true,
				imag: "https://media.discordapp.net/attachments/792433134603206668/792433194292084736/Revolver_38.jpeg?width=431&height=655"},
				{nome:"Tommy Gun", id: "tom", tipo: "comum", invst: "-", disp: true, nobar: true,
				imag: "https://media.discordapp.net/attachments/792433213016113182/792433264412590120/Tommy_Gun.jpeg?width=431&height=654"},
				{nome:"Uísque", id: "uis", tipo: "comum", invst: "-", disp: true, nobar: true,
				imag: "https://media.discordapp.net/attachments/792433329386291231/792433371396571187/Uisque.jpeg?width=434&height=655"}],

// ######## ######## ######## ######## ######## ######## ########
// ######## ########  	BD ITENS ESPECIAIS  	######## ########
			maxesp: 12,
			cesp: [{nome:"Cultes des Goules", id: "cel", tipo: "especial", invst: "-", disp: true, nobar: true,										// ver descrição dos campos em ITENS COMUNS
					imag: "https://media.discordapp.net/attachments/792434831932784680/792434887365230602/Cultes_des_Goules.jpeg?width=427&height=654"},
					 {nome:"Cultos Inomináveis", id: "col", tipo: "especial", invst: "-", disp: true, nobar: true,
					 imag: "https://media.discordapp.net/attachments/792434916218241024/792434981338742785/Cultos_Inominaveis.jpeg?width=430&height=655"},
					 {nome:"Espada de Glória", id: "esp", tipo: "especial", invst: "-", disp: true, nobar: true,
					 imag: "https://media.discordapp.net/attachments/792435012305813584/792435051999789116/Espada_de_Gloria.jpeg?width=428&height=655"},
					 {nome:"Estátua Alienígena", id: "est", tipo: "especial", invst: "-", disp: true, nobar: true,
					 imag: "https://media.discordapp.net/attachments/792435081880403968/792435124577763358/Estatua_Alienigena.jpeg?width=427&height=655"},
					 {nome:"Flauta dos Deuses Exteriores", id: "fla", tipo: "especial", invst: "-", disp: true, nobar: true,
					 imag: "https://media.discordapp.net/attachments/792435171181854750/792435229846405130/Flauta_dos_Deuses_Exteriores.jpeg?width=423&height=655"},
					 {nome:"Lâmpada de Alhazred", id: "lam", tipo: "especial", invst: "-", disp: true, nobar: true,
					 imag: "https://media.discordapp.net/attachments/792435270837469215/792435318682419200/Lampada_de_Alhazred.jpeg?width=428&height=655"},
					 {nome:"Livro de Dzyan", id: "liv", tipo: "especial", invst: "-", disp: true, nobar: true,
					 imag: "https://media.discordapp.net/attachments/792435358729371678/792435403243651122/Livro_de_Dzyan.jpeg?width=430&height=654"},
					 {nome:"Necronomicon", id: "nec", tipo: "especial", invst: "-", disp: true, nobar: true,
					 imag: "https://media.discordapp.net/attachments/792435425867595806/792435493765775360/Necronomicon.jpeg?width=426&height=655"},
					 {nome:"O Rei de Amarelo", id: "rei", tipo: "especial", invst: "-", disp: true, nobar: true,
					 imag: "https://media.discordapp.net/attachments/792435524241195088/792435560265416714/O_Rei_de_Amarelo.jpeg?width=423&height=655"},
					 {nome:"Pedra de Cura", id: "ped", tipo: "especial", invst: "-", disp: true, nobar: true,
					 imag: "https://media.discordapp.net/attachments/792435614032199710/792435658521706546/Pedra_de_Cura.jpeg?width=428&height=655"},
					 {nome:"Rubi de R'lyeh", id: "rub", tipo: "especial", invst: "-", disp: true, nobar: true,
					 imag: "https://media.discordapp.net/attachments/792482014983880714/792482086887358465/Rubi_de_Rlyeh.jpeg?width=405&height=619"},
					 {nome:"Vigia Azul da Pirâmide", id: "vig", tipo: "especial", invst: "-", disp: true, nobar: true,
					 imag: "https://media.discordapp.net/attachments/792435681690910810/792435722476716062/Vigia_Azul_da_Piramide.jpeg?width=426&height=655"}],

// ######## ######## ######## ######## ######## ########
// ######## ########  	BD FEITIÇOS    ######## ########
			maxfeit: 12,
			cfeit: [{nome:"Aprisionar Monstro", id: "apr", tipo: "feitiço", invst: "-", ddisp: true, nobar: true,						// ver descrição dos campos em ITENS COMUNS
					imag: "https://media.discordapp.net/attachments/792408150589571081/792408252264218634/Aprisionar_Monstro.jpeg?width=427&height=655"},
				  {nome:"Bloquear Memória", id: "blo", tipo: "feitiço", invst: "-", disp: true, nobar: true,
				  imag: "https://media.discordapp.net/attachments/792408359181484032/792408408547655700/Bloquear_Memoria.jpeg?width=427&height=654"},
				  {nome:"Cura", id: "cur", invst: "-", tipo: "feitiço", disp: true, nobar: true,
				  imag: "https://media.discordapp.net/attachments/792408549698437150/792408592228941885/Cura.jpeg?width=426&height=655"},
				  {nome:"Encantar Arma", id: "ena", tipo: "feitiço", invst: "-", disp: true, nobar: true,
				  imag: "https://media.discordapp.net/attachments/792408622830190604/792408663339958282/Encantar_Arma.jpeg?width=429&height=654"},
				  {nome:"Encontrar Portal", id: "eno", tipo: "feitiço", invst: "-", disp: true, nobar: true,
				  imag: "https://media.discordapp.net/attachments/792408697695371264/792408752598417438/Encontrar_Portal.jpeg?width=424&height=655"},
				  {nome:"Maldição Terrível de Azathoth", tipo: "feitiço", id: "mal", invst: "-", disp: true, nobar: true,
				  imag: "https://media.discordapp.net/attachments/792408781283000344/792408822320201778/Maldicao_Terrivel_de_Azathoth.jpeg?width=427&height=655"},
				  {nome:"Névoas de Releh", id: "nev", tipo: "feitiço", invst: "-", disp: true, nobar: true,
				  imag: "https://media.discordapp.net/attachments/792408925671784488/792409017325977630/Nevoas_de_Releh.jpeg?width=432&height=655"},
				  {nome:"Perda de Vigor", id: "per", tipo: "feitiço", invst: "-", disp: true, nobar: true,
				  imag: "https://media.discordapp.net/attachments/792409141587083274/792409190378897408/Perda_de_Vigor.jpeg?width=427&height=655"},
				  {nome:"Proteção da Pele", id: "pro", tipo: "feitiço", invst: "-", disp: true, nobar: true,
				  imag: "https://media.discordapp.net/attachments/792409339407237160/792409397874786304/Protecao_da_Pele.jpeg?width=423&height=655"},
				  {nome:"Secagem", id: "sec", tipo: "feitiço", invst: "-", disp: true, nobar: true,
				  imag: "https://media.discordapp.net/attachments/792409813837152316/792409857860829205/Secagem.jpeg?width=421&height=655"},
				  {nome:"Símbolo Vermelho de Shudde M'ell", id: "sim", tipo: "feitiço", invst: "-", disp: true, nobar: true,
				  imag: "https://media.discordapp.net/attachments/792409929856188447/792409994171252756/Simbolo_Vermelho_de_Shudde_Mell.jpeg?width=426&height=655"},
				  {nome:"Voz de Rá", id: "voz", tipo: "feitiço", invst: "-", disp: true, nobar: true,
				  imag: "https://media.discordapp.net/attachments/792410075116994609/792410116531814410/Voz_de_Ra.jpeg?width=427&height=654"}],

// ######## ######## ######## ######## ######## ########
// ######## ########  	 BD ALIADOS    ######## ########
			maxaliado: 8,
			caliado: [{nome:"Anna Kaslow", id: "ann", tipo: "aliado", invst: "-", disp: true, nobar: true,
					  imag: "https://media.discordapp.net/attachments/792450979730554920/792451021049561158/Anna_Kaslow.jpeg?width=406&height=618"},									// ver descrição dos campos em ITENS COMUNS
					  {nome:"Duke", id: "duk", tipo: "aliado", invst: "-", disp: true, nobar: true,
					  imag: "https://media.discordapp.net/attachments/792451042830843965/792451119200075786/Duke.jpeg?width=411&height=618"},
					  {nome:"Eric Colt", id: "eri", tipo: "aliado", invst: "-", disp: true, nobar: true,
					  imag: "https://media.discordapp.net/attachments/792451135771246622/792451173844123648/Eric_Colt.jpeg?width=405&height=618"},
					  {nome:"Professor Armitage", id: "arm", tipo: "aliado", invst: "-", disp: true, nobar: true,
					  imag: "https://media.discordapp.net/attachments/792451193984122920/792451230835408926/Professor_Armitage.jpeg?width=407&height=618"},
					  {nome:"Richard Upton Pickman", id: "ric", tipo: "aliado", invst: "-", disp: true, nobar: true,
					  imag: "https://media.discordapp.net/attachments/792451252356120586/792451288817991690/Richard_Upton_Pickman.jpeg?width=408&height=618"},
					  {nome:"Ruby Standish", id: "sta", tipo: "aliado", invst: "-", disp: true, nobar: true,
					  imag: "https://media.discordapp.net/attachments/792451309097713666/792451354333413436/Ruby_Standish.jpeg?width=407&height=618"},
					  {nome:"Thomas F. Malone", id: "tho", tipo: "aliado", invst: "-", disp: true, nobar: true,
					  imag: "https://media.discordapp.net/attachments/792451382321872897/792451446367846420/Thomas_F_Malone.jpeg?width=405&height=618"},
					  {nome:"Tom \"Montanha\" Murphy", id: "mur", tipo: "aliado", invst: "-", disp: true, nobar: true,
					  imag: "https://media.discordapp.net/attachments/792451498877386752/792451560881782824/Tom_Montanha_Murphy.jpeg?width=405&height=618"}],

// ######## ######## ######## ######## ######## ########
// ######## ########  	BD MONSTROS    ######## ########
			maxmonst: 27,
			cmonst: [{nome: "", id: "", tipo: "monst", trof: 0}]};

// ######## ######## ######## ######## ######## ########
// ######## ########      BD MESAS     ######## ########
var mesa = [];


// RECURSIVE FUNCTION FOR DEEP CLONE
const deepCopyFunction = (inObject) => {
  let outObject, value, key

  if (typeof inObject !== "object" || inObject === null) {
    return inObject // Return the value if inObject is not an object
  }

  // Create an array or object to hold the values
  outObject = Array.isArray(inObject) ? [] : {}

  for (key in inObject) {
    value = inObject[key]

    // Recursively (deep) copy for nested objects, including arrays
    outObject[key] = deepCopyFunction(value)
  }

  return outObject
}


/*//  OUTRA FUNCTION PARA CLONAR OBJETO
function clone(obj) {
    var copy;

    // Handle the 3 simple types, and null or undefined
    if (null == obj || "object" != typeof obj) return obj;

    // Handle Date
    if (obj instanceof Date) {
        copy = new Date();
        copy.setTime(obj.getTime());
        return copy;
    }

    // Handle Array
    if (obj instanceof Array) {
        copy = [];
        for (var i = 0, len = obj.length; i < len; i++) {
            copy[i] = clone(obj[i]);
        }
        return copy;
    }

    // Handle Object
    if (obj instanceof Object) {
        copy = {};
        for (var attr in obj) {
            if (obj.hasOwnProperty(attr)) copy[attr] = clone(obj[attr]);
        }
        return copy;
    }

    throw new Error("Unable to copy obj! Its type isn't supported.");
}
*/


// ######## ######## ######## ######## ######## ######## ######## ######## ######## ######## 
// ######## ########    AQUI COMEÇA A FUNÇÃO PARA O BOT LER A MENSAGEM     ######## ########
// ######## ######## ######## ######## ######## ######## ######## ######## ######## ######## 


const prefix = "!";												// define prefixo

client.on("message", function(message) {
	if (message.author.bot) return;								// verifica se msg nao é de bot (autor da msg)
	if (!message.content.startsWith(prefix)) return;			// verifica se msg começa com prefixo (!)

	const commandBody = message.content.slice(prefix.length);	// tira prefixo do corpo de comando
	const args = commandBody.split(' ');						// separa os argumentos (comando incluso)
	const command = args.shift().toLowerCase();					// separa comando dos argumentos. deixa comando em caixa baixa

	const result = new Discord.MessageEmbed();					// imprime embedded resultado aleatório de ANCIÃO, INVESTIGADOR, AVENTURA, OUTRO MUNDO, MITO, ITEM COMUM, ITEM ESPECIAL, FEITIÇO, ALIADO, MONSTRO


// ######## ######## ######## ######## ######## ######## ######## ######## ########
  // ######## ########    AQUI COMEÇA AS PARADAS DE VERDADE    ######## ########
// ######## ######## ######## ######## ######## ######## ######## ######## ########


// ######## ########  !oi    -   teste "oi"  ######## ########
	if (command === "oi") {message.reply(`oi você! :sunglasses:`);}

// ######## ########  !status investigador.id    -   mostra STATUS do investigador  ######## ########
	if (command === "status") {
		if ((imatv = mesa.findIndex(element => element.id == message.channel.parentID))<0) {
			if (!["jogo", "preparação"].includes(message.channel.name)) {
				message.reply("não há MESA para este canal\nCrie uma MESA em <#785827646344265779>");
			}
		} else if (!["ama","bob","car","dar","dex","glo","har","irm","jen","joe","kat","man","mic","mon","pet","vin"].includes(args[0])) {
			message.reply("não há <#785721643393351700> com ID informada\nDigite comando novamente");
			} else {
				var x = mesa[imatv].cinvs.findIndex(x => x.id === args[0]);
				result.setColor('#fffdd0');
				result.setAuthor("STATUS: "+mesa[imatv].cinvs[x].nome, mesa[imatv].cinvs[x].aimag);
				result.addFields(
					{ name: '\u200B', value: '\u200B' },
					{ name: 'Sanidade', value: '**'+mesa[imatv].cinvs[x].sanid.atual+'**  <:sanidade:785894917398200321>', inline: true },
					{ name: 'Resistência', value: '**'+mesa[imatv].cinvs[x].resist.atual+'**  <:resistencia:785894901837070406>', inline: true },
					{ name: '\u200B', value: '\u200B' },
					{ name: 'Pistas', value: '**'+mesa[imatv].cinvs[x].pista+'**  <:pista:785894888725151745>'},);
				if (mesa[imatv].cinvs[x].trof.length > 0) {
					var t = "";
					for (i = 0; i < mesa[imatv].cinvs[x].trof.length; i++) {
						var y = mesa[imatv].cinvs[x].trof[i].ind;
						switch (mesa[imatv].cinvs[x].trof[i].tipo) {
							case "avent":
								t += "• **"+mesa[imatv].cinvs[x].trof[i].valor+"** "+mesa[imatv].cavnt[y].nome+" *(aventura)*\n";
							break; case "omund":
								t += "• **"+mesa[imatv].cinvs[x].trof[i].valor+"** "+mesa[imatv].com[y].nome+" *(outro mundo)*\n";
							break; case "monst":
								t += "• **"+mesa[imatv].cinvs[x].trof[i].valor+"** "+mesa[imatv].cmonst[y].nome+" *(monstro)*\n";
							break;}}
					result.addField({name: 'Troféus', value: t});}
				result.setImage(mesa[imatv].cinvs[x].imag);
				message.channel.send(result);
			}
	}

// ######## ########  !itens investigador.id    -   mostra ITENS do investigador  ######## ########
	if (command === "itens") {
		if ((imatv = mesa.findIndex(element => element.id == message.channel.parentID))<0) {
			if (!["jogo", "preparação"].includes(message.channel.name)) {
				message.reply("não há MESA para este canal\nCrie uma MESA em <#785827646344265779>");
			}
		} else if (!["ama","bob","car","dar","dex","glo","har","irm","jen","joe","kat","man","mic","mon","pet","vin"].includes(args[0])){
			message.reply("não há <#785721643393351700> com ID informada\nDigite comando novamente");
			} else {
				var x = mesa[imatv].cinvs.findIndex(x => x.id === args[0]);
				if (mesa[imatv].cinvs[x].itens.length > 0) {
					for (i = 0; i < mesa[imatv].cinvs[x].itens.length; i++) {
						result.setColor('#fffdd0');
						result.setAuthor(mesa[imatv].cinvs[x].nome+" possui", mesa[imatv].cinvs[x].aimag, mesa[imatv].cinvs[x].murl);
						switch (mesa[imatv].cinvs[x].itens[i].item) {
								case "cig": case "com": case "dia": case "din": case "esg": case "fac": case "lan": case "mac": case "pis": case "rev": case "tom": case "uis":
									var y = mesa[imatv].ccom.findIndex(y => y.id ===  mesa[imatv].cinvs[x].itens[i].item);
									result.setTitle(mesa[imatv].ccom[y].nome);
									result.setDescription("*"+mesa[imatv].ccom[y].tipo+"*");
									result.setThumbnail('https://cdn.discordapp.com/emojis/786001424529883147.png?v=1');
									result.setImage(mesa[imatv].ccom[y].imag); break;
								case "cel": case "col": case "esp": case "est": case "fla": case "lam": case "liv": case "nec": case "rei": case "ped": case "rly": case "vig":
									var y = mesa[imatv].cesp.findIndex(y => y.id ===  mesa[imatv].cinvs[x].itens[i].item);
									result.setTitle(mesa[imatv].cesp[y].nome);
									result.setDescription("*"+mesa[imatv].cesp[y].tipo+"*");
									result.setThumbnail('https://cdn.discordapp.com/emojis/786001446129631243.png?v=1');
									result.setImage(mesa[imatv].cesp[y].imag); break;
								case "apr": case "blo": case "cur": case "ena": case "eno": case "mal": case "nev": case "per": case "pro": case "sec": case "sim": case "voz":
									var y = mesa[imatv].cfeit.findIndex(y => y.id ===  mesa[imatv].cinvs[x].itens[i].item);
									result.setTitle(mesa[imatv].cfeit[y].nome);
									result.setDescription("*"+mesa[imatv].cfeit[y].tipo+"*");
									result.setThumbnail('https://cdn.discordapp.com/emojis/786001402475708486.png?v=1');
									result.setImage(mesa[imatv].cfeit[y].imag); break;
								case "ann": case "duk": case "eri": case "arm": case "ric": case "sta": case "tho": case "mur":
									var y = mesa[imatv].caliado.findIndex(y => y.id ===  mesa[imatv].cinvs[x].itens[i].item);
									result.setTitle(mesa[imatv].caliado[y].nome);
									result.setDescription("*"+mesa[imatv].caliado[y].tipo+"*");
									result.setThumbnail('https://cdn.discordapp.com/emojis/786001382796034079.png?v=1');
									result.setImage(mesa[imatv].caliado[y].imag); break;}
						message.channel.send(result);}
				} else {
					message.reply(mesa[imatv].cinvs[x].nome+" não possui itens no momento");}}}

// ######## ########  !encerrar    -   ENCERRAR jogo ativo  ######## ######## 	NÃO IMPLEMENTADO!!!!!!!!!
	if (command ==+ "encerrar") { 
		if ((imatv = mesa.findIndex(element => element.id == message.channel.parentID))<0) {									// seleciona ÍNDICE da mesa ativa
			message.reply("MODO DE JOGO não selecionado\nDigite o comando `!modo -op` para selecionar um modo esta MESA");
		} else {
			if (!mesa[imatv].atv) { message.reply("esta MESA não possui jogo ativo");
			} else {
				mesa[imatv].atv = false;}}}

// ######## ########  !id_carta    -   imprime CARTA referente  ######## ########
	if (["aza", "cth", "has", "ith", "nya", "shu", "yig", "yog", "ama", "bob", "car", "dar", "dex", "glo", "har", "irm", "jen", "joe", "kat", "man", "mic", "mon", "pet", "vin"].includes(command)) {
		switch(command) {
			case "aza": case "cth": case "has": case "ith": case "nya": case "shu": case "yig": case "yog": 
				var x = jogo.canc.findIndex(x => x.id == command);
				result.setColor('#8c000f');
				result.setTitle(jogo.canc[x].nome);
				result.setDescription("*"+jogo.canc[x].desc+"*");
				result.setImage(jogo.canc[x].imag); break;
			case "ama": case "bob": case "car": case "dar": case "dex": case "glo": case "har": case "irm": case "jen": case "joe": case "kat": case "man": case "mic": case "mon": case "pet": case "vin":
				var x = jogo.cinvs.findIndex(x => x.id == command);
				result.setColor('#fffdd0');
				result.setTitle(jogo.cinvs[x].nome);
				result.setDescription("*"+jogo.cinvs[x].desc+"*");
				result.setImage(jogo.cinvs[x].imag); break;}
		message.channel.send(result);}

// ######## ########  !mesa nome da mesa    - 	  comando para SOLICITAR MESA / cria categoria com o nome da mesa  ######## ########
	if (command === "mesa") {
		if ((message.channel.id != 790943019758649374) && (message.channel.id != 785827646344265779)) message.reply("por favor, faça a solicitação de mesa em <#785827646344265779>");
		else {
			var nome_mesa = "Mesa";
			for (var i = 0; i < args.length; i++){
				nome_mesa += args[i];}
			message.guild.channels.create(nome_mesa, {			// create new category
			type: 'category',
			permissionOverwrites: [{ id: message.guild.roles.everyone.id,
									deny: ['VIEW_CHANNEL']},
									{ id: message.author.id,
									 allow: ['VIEW_CHANNEL']}]			
			}).then(cat => { 
				message.guild.channels.create('jogo', {			// create new channel in new category
				type: 'voice',
				parent: cat});
				//message.channel.overwritePermissions('user_id', { SEND_MESSAGES: true, ADD_REACTIONS: false});
			    message.guild.channels.create('preparação', {
			    type: 'text',
			    parent: cat,
			  }).then(channel => {
				  channel.send("<@"+message.author.id+">, prepare aqui sua mesa");
				  channel.send("```  PREPARAÇÃO DO JOGO   ```\n**Convide** os outros jogadores e siga com as mensagens abaixo\n\n"+		// send message to new channel
					//"\|\|*convidar* ainda não está automatizado, **mencione <@392823505869340682> e os jogadores na mesma mensagem** para que eles sejam \"adicionados\" na mesa\|\|\n\n"+
					"Você pode escolher os <#785724975520415787> e <#785721643393351700> para a partida, ou gerar aleatório\n"+
					"As regras oficiais dizem *para 1-8 jogadores* ~~mas isso pode ser alterado~~\n"+
					"O número de <#785721643393351700> não precisa ser o mesmo de jogadores da mesa, não há limite de jogadores\n\n"+
					"**MODO DE JOGO**\n"+
				 "``` • partida [simples] - selecione até 8 Investigadores ativos para jogar contra um Ancião\n"+
					" • [sobr]evivência - destrua TODOS os Anciões antes que TODOS os Investigadores sejam devorados (até 8 Investigadores ativos)\n"+
					" • [solo] - boa sorte\n"+
					" • [custom]izado - selecione a quantidade de Anciões a serem destruídos e a quantidade de Investigadores ativos ```\n**SELECIONE MODO DE JOGO**\n\n"+
				"> Digite o comando `!modo -op`\n> onde `-op` é o [texto entre parênteses] *(ex: `!modo solo`)*",{files: ["https://cdn.discordapp.com/attachments/727097227759058994/727436900876681236/line.png"]});});
		message.reply(`sua mesa foi criada. Bom jogo!`);})}}

// ######## ########  !modo modo     - 	  comando para SELECIONAR MODO DE JOGO  ######## ########
	if (command == "modo") {
		if (((imatv = mesa.findIndex(element => element.id == message.channel.parentID))<0) && (message.channel.name != "preparação")) {			// seleciona ÍNDICE da mesa ativa
			message.reply("não há MESA para este canal\nCrie uma MESA em <#785827646344265779>");
		} else if (!["simples", "sobr", "solo", "custom"].includes(args[0])) { message.reply("você digitou um comando com um argumento inválido.\nDigite o comando novamente.");
			} else {
				var matv = deepCopyFunction(jogo);
				matv.id = message.channel.parentID;
				matv.modo = args[0];
				//message.channel.send("\|\|<@392823505869340682>, quantidade de mesas antes de verificar se tem mesa e adicionar caso não tenha: "+mesa.length+"\|\|");
				if ((imatv = mesa.findIndex(element => element.id == message.channel.parentID))<0) {									// retorna ÍNDICE da mesa ativa
					mesa[mesa.length] = matv; var imatv = mesa.findIndex(element => element.id == message.channel.parentID);
				} else {
					for (i = 0; i < mesa.length; i++) {
					if (mesa[i].id == message.channel.parentID) {
						if (mesa[i].modo != "-") { mesa[i] = matv;
						} else { mesa[i].modo = args[0]; break;}
					} else if (i == mesa.length-1){
						mesa[mesa.length] = matv;}}}
					
				//message.channel.send("\|\|<@392823505869340682>, quantidade de mesas após verificações : "+mesa.length+"\|\|");
				for (i = 0; i < 16; i++) {													// reseta baralho de anciões e investigadores qndo modo é selecionado
					if (i < 8) { mesa[imatv].canc[i].nobar = true;}
					mesa[imatv].cinvs[i].nobar = true;}
				var gtxt = "**SELECIONE ANCIÕES**"+
						"``` • aleató[r]io\n • [aza]thoth, Destruição Total\n • [cth]ulhu, Sonhos de Loucura\n • [has]tur, O Rei de Amarelo\n • [ith]aqua, Ventos Congelantes\n • [nya]rlathotep, As Mil Máscaras\n • [shu]b-Niggurath, A Cabra Negra do Bosque\n • [yig], A Fúria de Yig\n • [yog]-Sothoth, A Chave e o Portal  ```";
				switch (mesa[imatv].modo){
					case "simples":						// modo SIMPLES
						message.channel.send("``` PARTIDA SIMPLES ```\n");
						message.channel.send(gtxt);
						message.channel.send("> - Digite o comando `!an -op`\n"+
											 "> onde `-op` é o [texto entre parênteses], as 3 primeiras letras (minúsculas) do nome do ancião escolhido *(ex: `!an cth`)*\n"+
											 "> - Se `-op` for `r`, então será aleatorizado um ancião\n"+
											 "> - Digite o comando `!id_anciao` para ver a carta do ancião");
					break; case "sobr":						// modo SOBREVIVÊNCIA
							message.channel.send("``` MODO SOBREVIVÊNCIA ATIVADO ```\n");
							message.channel.send(gtxt);
							message.channel.send("> - Digite o comando `!an -op1 -op2 -op3 ... -op8`\n"+
												 "> onde `-opN` é o [texto entre parênteses], as 3 primeiras letras (minúsculas) do nome do ancião escolhido para a posição N *(ex: `!an aza cth`)*\n"+
												 "> - Se `-opN` for `r`, então será aleatorizado um ancião para a posição N *(ex: `!an aza r r r nya r shu cth`)*\n\n"+
												 "Para **aleatorizar todos**, digite o comando `!an r`\n"+
												 "> - Digite o comando `!id_anciao` para ver a carta do ancião");
					break; case "solo":						// modo SOLO
						message.channel.send("``` MODO SOLO ATIVADO ```\n");
						message.channel.send(gtxt);
						message.channel.send("> - Digite o comando `!an -op1..-opN`\n"+
											 "> onde `-opN` é o [texto entre parênteses], as 3 primeiras letras (minúsculas) do nome do ancião escolhido *(ex: `!an aza cth`)*\n"+
											 "> - Se `-opN` for `r`, então será aleatorizado um ancião para a posição N *(ex: !an aza r r r nya r shu cth)*\n\n"+
											 "Para **aleatorizar todos**, digite o comando `!an N r` *(diferente do modo Sobrevivência, o comando `!an r` neste modo gera 1 ancião aleatório (N = 1))*\n"+
											 "> - Digite o comando `!id_anciao` para ver a carta do ancião");
					break; case "custom":						// modo CUSTOMIZADO
						message.channel.send("``` MODO CUSTOMIZADO ```\n");
						message.channel.send(gtxt);
						message.channel.send("> - Digite o comando `!an -op1..-opN`\n"+
											 "> onde `-opN` é o [texto entre parênteses], as 3 primeiras letras (minúsculas) do nome do ancião escolhido *(ex: `!an aza cth`)*\n"+
											 "> - Se `-opN` for `r`, então será aleatorizado um ancião para a posição `N` *(ex: `!an aza r r r nya r shu cth`)*\n\n"+
											 "Para **aleatorizar todos**, digite o comando `!an N r` *(diferente do modo Sobrevivência, o comando `!an r` neste modo gera 1 ancião aleatório (N = 1))*\n"+
											 "> - Digite o comando `!id_anciao` para ver a carta do ancião");}
				message.channel.send('',{files: ["https://cdn.discordapp.com/attachments/727097227759058994/727436900876681236/line.png"]});}}

// ######## ########  !modojogo    -   imprime MODO DE JOGO selecionado  ######## ########
	if (command == "modojogo") {
		if ((imatv = mesa.findIndex(element => element.id == message.channel.parentID))<0) {			// seleciona ÍNDICE da mesa ativa
			if (message.channel.name != "preparação") { message.reply("não há MESA para este canal\nCrie uma MESA em <#785827646344265779>");
			} else { message.reply("MODO DE JOGO não selecionado\nDigite o comando `!modo -op` para selecionar um modo esta MESA");}
		} else {
			msg = `essa é a Mesa #${imatv+1} no modo`
			switch (mesa[imatv].modo){
				case "simples": message.reply(msg+"``` PARTIDA SIMPLES ```"); break;
				case "sobr": message.reply(msg+"``` SOBREVIVÊNCIA ```"); break;
				case "solo": message.reply(msg+"``` JOGO SOLO ```"); break;
				case "custom": message.reply(msg+"``` PARTIDA CUSTOMIZADA ```");break;
				default: message.reply(msg+"\n :warning:  MODO DE JOGO não definido");}}}

// ######## ########  !an anciao.id/r (1..8)    - 	  comando para SELECIONAR ANCIÃO para a partida  ######## ########
	if (command === "an") {
		if ((imatv = mesa.findIndex(element => element.id == message.channel.parentID))<0) {									// seleciona ÍNDICE da mesa ativa
			if (message.channel.name != "preparação") { message.reply("não há MESA para este canal\nCrie uma MESA em <#785827646344265779>");
			} else { message.reply("MODO DE JOGO não selecionado\nDigite o comando `!modo -op` para selecionar um modo para esta MESA");}
		} else {
			mesa[imatv].ancord.length = 0;
			for (i = 0; i < 8; i++) { mesa[imatv].canc[i].nobar = true;}			// volta todas as cartas para o baralho (para permitir nova seleção de anciões sem que entre em loop)
			var argsvale = true;
			if (args.length > 1){
				for (i = 0; i < args.length; i++) {
					if (!["r", "aza", "cth", "has", "ith", "nya", "shu", "yig", "yog"].includes(args[i]) && (parseInt(args[0]) < 1 || parseInt(args[0] > 8))){			// valida argumentos
						argsvale = false; break;}}
				if (!argsvale) { message.reply("você digitou um comando com argumentos inválidos.\nDigite comando novamente.");
				} else {
					if (args.length == 2 && (parseInt(args[0]) > 0 && parseInt(args[0]) < 9) && args[1] == "r") {				// se comando for !an N r ; para N = [1..8]
						var N = parseInt(args[0]);
						if (N > 1 && mesa[imatv].modo == "simples") {
							message.reply("você digitou um comando para gerar "+args[0]+" <#785724975520415787> aleatórios\nPorém, em uma **PARTIDA SIMPLES** apenas um ancião é enfrentado");
							N = 1;}
						for (i = 0; i < N; i++) {
							do { var roll = Math.floor(Math.random() * (8));
							} while (!mesa[imatv].canc[roll].nobar);
							mesa[imatv].ancord[i] = mesa[imatv].canc[roll].id;
							mesa[imatv].canc[roll].nobar = false;}
					} else {
						for (i = 0; i < args.length; i++) {
							if (args[i] == "r") {
								do { var roll = Math.floor(Math.random() * (8));
								} while (!mesa[imatv].canc[roll].nobar);
								mesa[imatv].ancord[i] = mesa[imatv].canc[roll].id;
								mesa[imatv].canc[roll].nobar = false;
							} else if (["aza", "cth", "has", "ith", "nya", "shu", "yig", "yog"].includes(args[i])) {
									var x = mesa[imatv].canc.findIndex(x => x.id === args[i]);
									mesa[imatv].ancord[i] = mesa[imatv].canc[x].id;
									mesa[imatv].canc[x].nobar = false;}}}}
			} else {	//desta linha pra baixo args.length <= 1
				if (mesa[imatv].modo == "sobr") {
					if (args[0] != "r") { argsvale = false;
					} else {
						for (i = 0; i < 8; i++) {
						do { var roll = Math.floor(Math.random() * (8));
						} while (!mesa[imatv].canc[roll].nobar);
						mesa[imatv].ancord[i] = mesa[imatv].canc[roll].id;
						mesa[imatv].canc[roll].nobar = false;}}
				} else {
					if (!["r", "aza", "cth", "has", "ith", "nya", "shu", "yig", "yog"].includes(args[0])) { argsvale = false;							 // valida argumentos
					} else {
						if (args[0] == "r") {
							do { var roll = Math.floor(Math.random() * (8));
							} while (!mesa[imatv].canc[roll].nobar);
							mesa[imatv].ancord[0] = mesa[imatv].canc[roll].id;
							mesa[imatv].canc[roll].nobar = false;
						} else {
							var x = mesa[imatv].canc.findIndex(x => x.id === args[0]);
							mesa[imatv].ancord[0] = mesa[imatv].canc[x].id;
							mesa[imatv].canc[x].nobar = false;}}}}

			if (!argsvale) { message.reply("você digitou um comando com argumentos inválidos\nDigite comando novamente");
			} else {
				var posaam = mesa[imatv].ancatv;																// posição do ancião ativo no mesa[imatv].ancord
				var iaam = mesa[imatv].canc.findIndex(iaam => iaam.id === mesa[imatv].ancord[posaam]);			// index do anciao ativo da mesa
				mesa[imatv].canc[iaam].ativo = true;
				message.reply(mesa[imatv].canc[iaam].nome+" está ativo!");
				if (mesa[imatv].ancord.length == 1) {
					var anctxt = "``` Ancião Ativo:\n ";
				} else { var anctxt = "``` Ordem dos Anciões:\n ";}
				for (i = 0; i < mesa[imatv].ancord.length; i++) {
					var x = mesa[imatv].canc.findIndex(x => x.id === mesa[imatv].ancord[i]);
					if (i == mesa[imatv].ancord.length-1) { 
						var anctxt = (anctxt+(i+1)+". "+mesa[imatv].canc[x].nome);
					} else if (mesa[imatv].canc[x].id === mesa[imatv].ancord[posaam]) {
						var anctxt = (anctxt+(i+1)+". "+mesa[imatv].canc[x].nome+"		<--- ativo\n ");
					} else { var anctxt = (anctxt+(i+1)+". "+mesa[imatv].canc[x].nome+"\n ");}} anctxt = (anctxt+"```");
				result.setColor('#8c000f');
				result.setTitle(mesa[imatv].canc[iaam].nome);
				//result.setDescription(matv.canc.anc[iaam].desc.slice(1,-1));
				result.setDescription("*"+mesa[imatv].canc[iaam].desc+"*");
				result.setImage(mesa[imatv].canc[iaam].imag);
				message.channel.send(result);
				if (mesa[imatv].modo == "solo")	{ message.channel.send(anctxt+"\n**SELECIONE INVESTIGADOR**");
				} else { message.channel.send(anctxt+"\n**SELECIONE INVESTIGADORES**");}
				message.channel.send("``` • [ama]nda Sharpe  	• [jen]ny Barnes\n"+
										" • [bob] Jenkins    	• [joe] Diamond\n"+
										" • [car]olyn Fern   	• [kat]e Winthrop\n"+
										" • [dar]rell Simmons	• [man]dy Thompson\n"+
										" • [dex]ter Drake   	• [mic]hael McGlen\n"+
										" • [glo]ria Goldberg	• [mon]terey Jack\n"+
										" • [har]vey Walters 	• [pet]e \"Chaminé\"\n"+
										" • [irm]ã Mary      	• [vin]cent Lee  ```\n"+
										"> - Digite o comando `!in -op1..-opN`\n"+
										"> onde `-opN` é o [texto entre parênteses], as 3 primeiras letras (minúsculas) do nome do investigador escolhido *(ex: `!in bob man`)*\n"+
										"> - Se `-opN` for `r`, então será aleatorizado um investigador *(ex: `!in glo r r vin joe r mon r`)*\n"+
										"> - Digite o comando `!id_invest` para ver a carta do investigador\n"+
										"\nPara **aleatorizar todos**, digite o comando `!in N r`\n"+
										"sendo `N` a quantidade de <#785721643393351700> ativos (max de 8 para os modos *Simples* e *Sobrevivência*)",{files: ["https://cdn.discordapp.com/attachments/727097227759058994/727436900876681236/line.png"]});}}}

// ######## ########  !in    - 	  comando para SELECIONAR INVESTIGADOR para a partida  ######## ########
	if (command === "in") {
		if ((imatv = mesa.findIndex(element => element.id == message.channel.parentID))<0) {			// seleciona ÍNDICE da mesa ativa
			if (message.channel.name != "preparação") {
				message.reply("não há MESA para este canal\nCrie uma MESA em <#785827646344265779>");
			} else { message.reply("MODO DE JOGO não selecionado\nDigite o comando `!modo -op` para selecionar um modo esta MESA");}
		} else {
			mesa[imatv].invord.length = 0;
			for (i = 0; i < 16; i++) { mesa[imatv].cinvs[i].nobar = true; }
			var argsvale = true;
			if (args.length > 1) {
				for (i = 0; i < args.length; i++) {
					if ((!["r", "ama", "bob", "car", "dar", "dex", "glo", "har", "irm", "jen", "joe", "kat", "man", "mic", "mon", "pet", "vin"].includes(args[i])) && ((parseInt(args[0]) < 1) || (parseInt(args[0] > 16)))) {	// valida argumentos
						argsvale = false; break;}}
				if (!argsvale) { message.reply("você digitou um comando com argumentos inválidos\nDigite comando novamente");
				} else {
					if (args.length == 2 && (parseInt(args[0]) > 0 && parseInt(args[0]) < 17) && args[1] == "r") {				// se comando for !an N r ; para N = [1..8/16]
						var N = parseInt(args[0]);
						if (mesa[imatv].modo != "custom" && N > 8) {
							if (mesa[imatv].modo == "simples") { var msgmd = "**MODO SIMPLES**";
							} else { var msgmd = "**MODO SOBREVIVÊNCIA**";}
							message.reply("você digitou um comando para "+args[0]+" investigadores ativos\nPorém, no "+msgmd+" o máximo de investigadores ativos é 8\nJogue no **MODO CUSTOMIZADO** para mais investigadores ativos");
							N = 8;}
						for (i = 0; i < N; i++) {
							do { var roll = Math.floor(Math.random() * (16));
							} while (!mesa[imatv].cinvs[roll].nobar);
							if (roll == 14) {
								mesa[imatv].cinvs[roll].itens.push({item: "duk"});
								mesa[imatv].caliado[1].nobar = false;
								mesa[imatv].caliado[1].disp = false;
								mesa[imatv].caliado[1].invst = "pet";}
							mesa[imatv].invord[i] = mesa[imatv].cinvs[roll].id;
							mesa[imatv].cinvs[roll].ativo = true;
							mesa[imatv].cinvs[roll].nobar = false;}
					} else {
						for (i = 0; i < args.length; i++) {
							if (args[i] == "r") {
								do { var roll = Math.floor(Math.random() * (8));
								} while (!mesa[imatv].cinvs[roll].nobar);
								if (roll == 14) {
									mesa[imatv].cinvs[roll].itens.push({item: "duk"});
									mesa[imatv].caliado[1].nobar = false;
									mesa[imatv].caliado[1].disp = false;
									mesa[imatv].caliado[1].invst = "pet";}
								mesa[imatv].invord[i] = mesa[imatv].cinvs[roll].id;
								mesa[imatv].cinvs[roll].nobar = false;
							} else {
								var x = mesa[imatv].cinvs.findIndex(x => x.id === args[i]);
								if (args[i] == "pet") {
									mesa[imatv].cinvs[x].itens.push({item: "duk"});
									mesa[imatv].caliado[1].nobar = false;
									mesa[imatv].caliado[1].disp = false;
									mesa[imatv].caliado[1].invst = "pet";}
								mesa[imatv].invord[i] = mesa[imatv].cinvs[x].id;
								mesa[imatv].cinvs[x].ativo = true;
								mesa[imatv].cinvs[x].nobar = false;}}}}
			} else {   //desta linha pra baixo args.length <= 1
				if (!["r", "ama", "bob", "car", "dar", "dex", "glo", "har", "irm", "jen", "joe", "kat", "man", "mic", "mon", "pet", "vin"].includes(args[0])) { argsvale = false;							 // valida argumentos
				} else {
					if (mesa[imatv].modo == "solo") {
						if (args[0] == "r") {
							var roll = Math.floor(Math.random() * (16));
							if (roll == 14) {
								mesa[imatv].cinvs[roll].itens.push({item: "duk"});
								mesa[imatv].caliado[1].nobar = false;
								mesa[imatv].caliado[1].disp = false;
								mesa[imatv].caliado[1].invst = "pet";}
							mesa[imatv].invord[0] = mesa[imatv].cinvs[roll].id;
							mesa[imatv].cinvs[roll].ativo = true;
							mesa[imatv].cinvs[roll].nobar = false;
						} else {
							var iiam = mesa[imatv].cinvs.findIndex(iiam => iiam.id === args[0]);
							if (args[0] == "pet") {
								mesa[imatv].cinvs[roll].itens.push({item: "duk"});
								mesa[imatv].caliado[1].nobar = false;
								mesa[imatv].caliado[1].disp = false;
								mesa[imatv].caliado[1].invst = "pet";}
							mesa[imatv].invord[0] = mesa[imatv].cinvs[iiam].id;
							mesa[imatv].cinvs[iiam].ativo = true;
							mesa[imatv].cinvs[iiam].nobar = true;}
					} else {
						if (args[0] == "r") {
							var roll = Math.floor(Math.random() * (16));
							if (roll == 14) {
								mesa[imatv].cinvs[roll].itens.push({item: "duk"});
								mesa[imatv].caliado[1].nobar = false;
								mesa[imatv].caliado[1].disp = false;
								mesa[imatv].caliado[1].invst = "pet";}
							mesa[imatv].invord[0] = mesa[imatv].cinvs[roll].id;
							mesa[imatv].cinvs[roll].ativo = true;
							mesa[imatv].cinvs[roll].nobar = false;
						} else {
							var x = mesa[imatv].cinvs.findIndex(x => x.id === args[0]);
							if (args[0] == "pet") {
								mesa[imatv].cinvs[x].itens.push({item: "duk"});
								mesa[imatv].caliado[1].nobar = false;
								mesa[imatv].caliado[1].disp = false;
								mesa[imatv].caliado[1].invst = "pet";}
							mesa[imatv].invord[0] = mesa[imatv].cinvs[x].id;
							mesa[imatv].cinvs[x].ativo = true;
							mesa[imatv].cinvs[x].nobar = false;}}}}
		if (mesa[imatv].invord.length == 1) {
			var invtxt = "``` Investigador Ativo:";
		} else {
			var invtxt = "``` Investigadores Ativos: "+mesa[imatv].invord.length;
		}
		for (i = 0; i < mesa[imatv].invord.length; i++) {
			var x = mesa[imatv].cinvs.findIndex(x => x.id === mesa[imatv].invord[i]);
			invtxt = (invtxt+"\n • "+mesa[imatv].cinvs[x].nome);}
			message.channel.send(invtxt+"```\n**DISTRIBUIÇÃO DE ITENS INICIAIS**\n*(em jogos com 10+ investigadores, pode ocorrer de não haver item disponível)*\n\n"+
										"> - Digite o comando `!-op id_invest` conforme a quantidade de itens iniciais indicados na carta do investigador\n"+
										"> onde `-op` é:\n>  • `c` para Itens Comuns    <:item_com:786001424529883147>"+
													   "\n>  • `e` para Itens Especiais   <:item_esp:786001446129631243>"+
													   "\n>  • `f` para Feitiços                <:feitico:786001402475708486>\n"+
										"> - Digite o comando `!id_invest` para ver a carta do investigador");
			if (mesa[imatv].cinvs[9].ativo && mesa[imatv].cinvs[11].ativo) {
				message.channel.send("\n*Joe Diamond*  <:joe:785687170718761000> e *Mandy Thompson*  <:mandy:785687199277907978> começam com 01 *pista*  <:pista:785894888725151745>");
			} else if (mesa[imatv].cinvs[9].ativo && !mesa[imatv].cinvs[11].ativo) {
				message.channel.send("\n*Joe Diamond*  <:joe:785687170718761000> começa com 01 *pista*  <:pista:785894888725151745>");
			} else if (!mesa[imatv].cinvs[9].ativo && mesa[imatv].cinvs[11].ativo) {
				message.channel.send("\n*Mandy Thompson*  <:mandy:785687199277907978> começa com 01 *pista*  <:pista:785894888725151745>");}
			if (mesa[imatv].cinvs[14].ativo) { message.channel.send("\nPara *Pete \"Chaminé\"* <:pete:785687243427676231> já foi atribuído o Aliado *Duke* a ele");}
	message.reply("você pode ver os itens de um investigador com o comando `!itens id_invest`\n**Após a distribuição dos itens iniciais**, digite o comando `!jogar` para começar o jogo\nBOM JOGO! :sunglasses:");}
	message.channel.send('',{files: ["https://cdn.discordapp.com/attachments/727097227759058994/727436900876681236/line.png"]});}

// ######## ########  !jogar    - 	  comando para INCIAR a partida  ######## ########
	if (command === "jogar") {
		if ((imatv = mesa.findIndex(element => element.id == message.channel.parentID))<0) {									// seleciona ÍNDICE da mesa ativa
			if (message.channel.name != "preparação") { message.reply("não há MESA para este canal\nCrie uma MESA em <#785827646344265779>");
			} else if (mesa[imatv].modo == "-") { message.reply("MODO DE JOGO não selecionado\nDigite o comando `!modo -op` para selecionar um modo esta MESA");
				} else if (mesa[imatv].ancord.length < 1) { message.reply("ANCIÃO não selecionado\nDigite o comando `!an -op` para selecionar os <#785724975520415787>\n\n*\>>> digite `!id_anciao` para ver a carta do ancião*");
					} else if (mesa[imatv].invord.length < 1) { message.reply("INVESTIGADOR não selecionado\nDigite o comando `!in -op` para selecionar os <#785721643393351700>\n\n*\>>> digite `!id_invest` para ver a carta do investigador*");}
		} else {
			//mesa[imatv].atv = true;		atributo comentado na struct jogo
			message.reply("partida criada\nVolte neste canal para selecionar novo modo (ou o mesmo) e reiniciar a partida");
			message.guild.channels.create('mesa', {
				type: 'text',
				topic: 'Evolução da mesa durante a partida.',
				parent: message.channel.parentID,
			}).then(channel => {
						var b = "```Modo de jogo: ";
						switch (mesa[imatv].modo) {
							case "simples": b += "Simples\n\n";
							break; case "sobr": b += "Sobrevivência\n\n";
							break; case "solo": b += "Solo\n\n";
							break; case "custom": b += "Customizado\n\n";
							break; default: b = "Verifique MODO DE JOGO com o comando `!modojogo`"
						}
						if (mesa[imatv].invord.length > 1) {
							if (mesa[imatv].devord.length > 0) {
								if (mesa[imatv].devord.length == 1) {
									b += "Investigadores ativos: "+(mesa[imatv].invord.length+1)+"         Investigador devorado:\n";
									for (i = 0 ; i < mesa[imatv].invord.length; i++) {
										x = mesa[imatv].cinvs.findIndex(x => x.id === mesa[imatv].invord[i]);
										if (i == 0) {
											y = mesa[imatv].cinvs.findIndex(y => y.id === mesa[imatv].devord[0]);
											b += " • "+mesa[imatv].cinvs[x].nome+"          • "+mesa[imatv].cinvs[y].nome+"\n";
										} else {
											b += " • "+mesa[imatv].cinvs[x].nome+"\n";
										}
									}
								} else {
									b += "Investigadores ativos: "+(mesa[imatv].invord.length+1)+"         Investigadores devorados: "+(mesa[imatv].devord.length+1)+"\n";
									for (i = 0 ; i < mesa[imatv].invord.length; i++) {
										x = mesa[imatv].cinvs.findIndex(x => x.id === mesa[imatv].invord[i]);
										if (i < mesa[imatv].devord.length) {
											y = mesa[imatv].cinvs.findIndex(y => y.id === mesa[imatv].devord[i]);
											b += " • "+mesa[imatv].cinvs[x].nome+"          • "+mesa[imatv].cinvs[y].nome+"\n";
										} else {
											b += " • "+mesa[imatv].cinvs[x].nome+"\n";
										}
									}
									if (mesa[imatv].invord.length < mesa[imatv].devord.length) {
										for (i = mesa[imatv].invord.length; i < mesa[imatv].devord.length; i++) {
											y = mesa[imatv].cinvs.findIndex(y => y.id === mesa[imatv].devord[i]);
											b += "                            • "+mesa[imatv].cinvs[y].nome+"\n";
										}
									}
								}
							} else {
								b += "Investigadores ativos: "+(mesa[imatv].invord.length+1)+"\n";
								for (i = 0 ; i < mesa[imatv].invord.length; i++) {
									x = mesa[imatv].cinvs.findIndex(x => x.id === mesa[imatv].invord[i]);
									b += " • "+mesa[imatv].cinvs[x].nome+"\n";
								}
							}
						} else {
							if (mesa[imatv].devord.length > 0) {
								if (mesa[imatv].devord.length == 1) {
									b += "Investigador ativo:                     Investigador devorado:\n";
									x = mesa[imatv].cinvs.findIndex(x => x.id === mesa[imatv].invord[0]);
									y = mesa[imatv].cinvs.findIndex(y => y.id === mesa[imatv].devord[0]);
									b += " • "+mesa[imatv].cinvs[x].nome+"          • "+mesa[imatv].cinvs[y].nome+"\n";
								} else {
									b += "Investigador ativo:          Investigadores devorados: "+(mesa[imatv].devord.length+1)+"\n";
									x = mesa[imatv].cinvs.findIndex(x => x.id === mesa[imatv].invord[0]);
									for (i = 0 ; i < mesa[imatv].devord.length; i++) {
										y = mesa[imatv].cinvs.findIndex(y => y.id === mesa[imatv].devord[i]);
										b += " • "+mesa[imatv].cinvs[x].nome+"          • "+mesa[imatv].cinvs[y].nome+"\n";
									}
								}
							} else {
								b += "Investigador ativo:\n"
								x = mesa[imatv].cinvs.findIndex(x => x.id === mesa[imatv].invord[0]);
								b += " • "+mesa[imatv].cinvs[x].nome+"\n";
							}
						}
								
						switch (mesa[imatv].modo) {
							case "simples": 
								b += "\nAncião ativo:\n";
								let x = mesa[imatv].canc.findIndex(x => x.id === mesa[imatv].ancord[0]);
								b += " > "+mesa[imatv].canc[x].nome;
							break; case "sobr": 
								b += "\nOrdem dos Anciões:\n";
								for (i = 0; i < mesa[imatv].ancord.length; i++) {
									let x = mesa[imatv].canc.findIndex(x => x.id === mesa[imatv].ancord[i]);
									b += "> "+mesa[imatv].canc[x].nome+"\n";}
							break; case "solo": case "custom": 
								if (mesa[imatv].ancord.length == 1) {
									b += "\nAncião ativo:\n";
									let x = mesa[imatv].canc.findIndex(x => x.id === mesa[imatv].ancord[0]);
									b += " > "+mesa[imatv].canc[x].nome;
								} else {
									b += "\nOrdem dos Anciões:\n";
									for (i = 0; i < mesa[imatv].ancord.length; i++) {
										let x = mesa[imatv].canc.findIndex(x => x.id === mesa[imatv].ancord[i]);
										b += "> "+mesa[imatv].canc[x].nome+"\n";}}
							break; default: b = "Verifique MODO DE JOGO com o comando `!modojogo`"
						} 
						b += "```";
						channel.send(b);
			});
			message.guild.channels.create('jogo', {
			    type: 'text',
				topic: 'Canal destinado a discutir estratégias da partida. As rolagens de dados e passagem do tempo com resolução das cartas Mito também serão neste canal.',
			    parent: message.channel.parentID,
			  }).then(channel => {
						channel.send("``` PARTIDA INICIADA ```");
			  });
		}
	}

// ######## ########  !r N v a m    -   rolar N dados vERDES, dado aMARELO e dado VERmELHO  ######## ########
	if (command === "r") {
		if ((imatv = mesa.findIndex(element => element.id == message.channel.parentID))<0) {			// seleciona ÍNDICE da mesa ativa
			if (message.channel.name != "preparação") { message.reply("não há MESA para este canal\nCrie uma MESA em <#785827646344265779>");
			} else {
				if (!((args[0]-1) * (args[0]-6) <= 0)) { message.reply("\no primeiro argumento (`N`) do comando `!r N v a m` deve ser a quantidade *(entre 1 e 6)* de **DADOS VERDES** a ser rolada.");
				} else {
					if (args[0] > mesa[imatv].maxv){ args[0] = mesa[imatv].maxv;
						message.reply(`você digitou uma quantidade maior que o limite de ${mesa[idmesa].maxv} dados verdes. Foi rolado a quantidade máxima.`);}

					var v = 0;		// rolou todos os verdes? (evita rolar mais um dado verde para cada v que for digitado)
					var a = 0;		// já rolou dado amarelo?
					var m = 0;		// já rolou dado vermelho?
					var r = "você rolou: ";

					for (var i = 1; i < args.length; i++){
						var arg = args[i];
						switch (arg) {
							case 'v': 
								if (v == 1) {
									message.reply("você digitou *v* mais de uma vez.");
								} else {
									var v = 1;
									for (var j = 0; j < args[0]; j++){ 								// roll green dice args[0] times (max maxv.value)
										var roll = Math.floor(Math.random() * (6));    				// This JavaScript function always returns a random number between min and max (both included) -- Math.floor(Math.random() * (max - min + 1) ) + min;
										switch (roll){ 
											case 0: r += " <:1v:786453340505767957> "; break;
											case 1: r += " <:2v:786453350873956363> "; break;
											case 2: r += " <:3v:786453361355784202> "; break;
											case 3: r += " <:cv:786453375977914398> "; break;
											case 4: r += " <:pv:786453432998953011> "; break;
											case 5: r += " <:tv:786453449592012832> "; break;}}}
							break;
							
							case 'a':															// roll yellow die
								if (a == 1) {
									message.reply(`você tentou rolar o dado amarelo mais de uma vez. Porém, foi rolado apenas uma única vez.`);
								} else { a = 1;			
									var roll = Math.floor(Math.random() * (6)); 		// This JavaScript function always returns a random number between min and max (both included) -- Math.floor(Math.random() * (max - min + 1) ) + min;
									switch (roll){ case 0: r += " <:1a:786456678840401930> "; break;
												   case 1: r += " <:2a:786456689909825616> "; break;
												   case 2: r += " <:3a:786456715133714462> "; break;
												   case 3: r += " <:4a:786457589763670048> "; break;
												   case 4: r += " <:ca:786456745089695754> "; break;
												   case 5: r += " <:pa:786456850022400061> "; break;}}
							break;
							
							case 'm':															// roll red die
								if (m == 1) {
									message.reply(`você tentou rolar o dado vermelho mais de uma vez. Porém, foi rolado apenas uma única vez.`);
								} else { m = 1;
									var roll = Math.floor(Math.random() * (6)); 		// This JavaScript function always returns a random number between min and max (both included) -- Math.floor(Math.random() * (max - min + 1) ) + min;
									switch (roll){ case 0: r += " <:2m:786456701129719808> "; break;
												   case 1: r += " <:3m:786458650964656158> "; break;
												   case 2: r += " <:4m:786456730393247784> "; break;
												   case 3: r += " <:cm:786456756087291964> "; break;
												   case 4: r += " <:pm:786457764569677844> "; break;
												   case 5: r += " <:crm:786456766904926208> "; break;}}
						break; default: message.reply("Não há rolagem para o argumento `"+arg+"` digitado");}
				} message.reply(`${r}`);
				message.channel.send('',{files: ["https://cdn.discordapp.com/attachments/727097227759058994/727436900876681236/line.png"]});}}}}

// ######## ########  !av    - 	  comando para abrir AVENTURA aleatória  ######## ########
	if (command === "av") {
		if ((imatv = mesa.findIndex(element => element.id == message.channel.parentID))<0) {			// seleciona ÍNDICE da mesa ativa
			message.reply("não há MESA para este canal\nCrie uma MESA em <#785827646344265779>");
		} else {
			if (mesa[imatv].maxavnt < 1) {
				message.channel.send("*O baralho de **Aventuras** `[inserir emoji da aventura]` foi reembaralhado*");
				for (i = 0; i < mesa[imatv].cavnt.length; i++) {mesa[imatv].cavnt[i].nobar = true;}
				mesa[imatv].maxavnt = 48;}
			if (mesa[imatv].maxavnt < 0) message.channel.send("<@392823505869340682>, o contador de cartas está NEGATIVO! Verifica issaê.");				// <<<<<<< isso NUNCA é pra acontecer
			do { var roll = Math.floor(Math.random() * (48));  // This JavaScript function always returns a random number between min and max (both included) -- Math.floor(Math.random() * (max - min + 1) ) + min;
			} while (!mesa[imatv].cavnt[roll].nobar);
			mesa[imatv].cavnt[roll].disp = false;
			mesa[imatv].cavnt[roll].nobar = false;
			mesa[imatv].maxavnt--;
			result.setColor('#281e5d');
			result.setTitle(mesa[imatv].cavnt[roll].nome);
			result.setDescription("*"+mesa[imatv].cavnt[roll].desc+"*");
			result.setImage(mesa[imatv].cavnt[roll].imag);
			message.channel.send(result);}
		message.channel.send('',{files: ["https://cdn.discordapp.com/attachments/727097227759058994/727436900876681236/line.png"]});}
	
// ######## ########  !om    - 	  comando para abrir OUTRO MUNDO aleatório  ######## ########
	if (command === "om") {
		if ((imatv = mesa.findIndex(element => element.id == message.channel.parentID))<0) {			// seleciona ÍNDICE da mesa ativa
			message.reply("não há MESA para este canal\nCrie uma MESA em <#785827646344265779>");
		} else {
			if (mesa[imatv].maxom < 1) {
					message.channel.send("*O baralho de **Outro Mundo** `[inserir emoji de outro mundo ~~oloko~~]` foi reembaralhado*");
					for (i = 0; i < mesa[imatv].com.length; i++) {mesa[imatv].com[i].nobar = true;}
					mesa[imatv].maxom = 8;}
				if (mesa[imatv].maxom < 0) message.channel.send("<@392823505869340682>, o contador de cartas está NEGATIVO! Verifica issaê.");				// <<<<<<< isso NUNCA é pra acontecer
				do { var roll = Math.floor(Math.random() * (8));  // This JavaScript function always returns a random number between min and max (both included) -- Math.floor(Math.random() * (max - min + 1) ) + min;
				} while (!mesa[imatv].com[roll].nobar);
				mesa[imatv].com[roll].disp = false;
				mesa[imatv].com[roll].nobar = false;
				maxom--;
				//result.setColor('#281e5d'); <<< essa cor é das AVENTURAS
				result.setTitle(mesa[imatv].com[roll].nome);
				result.setDescription("*"+mesa[imatv].com[roll].desc+"*");
				result.setImage(mesa[imatv].com[roll].imag);
				message.channel.send(result);}
			message.channel.send('',{files: ["https://cdn.discordapp.com/attachments/727097227759058994/727436900876681236/line.png"]});}
	
// ######## ########  !c investigador.id    - 	  comando para gerar ITEM COMUM aleatório  ######## ########
	if (command === "c") {
		if ((imatv = mesa.findIndex(element => element.id == message.channel.parentID))<0) {			// seleciona ÍNDICE da mesa ativa
			message.reply("não há MESA para este canal\nCrie uma MESA em <#785827646344265779>");
		} else {
			var reemb = 0;		
			if (!["ama","bob","car","dar","dex","glo","har","irm","jen","joe","kat","man","mic","mon","pet","vin"].includes(args[0])) {
				message.reply("não há <#785721643393351700> com ID informada\nDigite comando novamente");
			} else if (mesa[imatv].maxcom < 1) {
				for (i = 0; i < 12; i++) {
					if (mesa[imatv].ccom[i].disp) {
						mesa[imatv].ccom[i].nobar = true;
						mesa[imatv].maxcom++;
						reemb = 1;}}
				if (mesa[imatv].maxcom == 0) {
					message.channel.send(":warning:  *O baralho de **ITENS COMUNS** <:item_com:786001424529883147> está vazio\ne não há cartas disponíveis para reembaralhar*  :warning:"+
									  "\n\nTodos os **ITENS COMUNS** <:item_com:786001424529883147> estão nas mãos dos <#785721643393351700>");
					message.reply("nenhum <:item_com:786001424529883147> disponível");}}
			
			if (mesa[imatv].maxcom > 0) {
				if (mesa[imatv].maxcom < 0) message.channel.send(":warning:   <@392823505869340682>, o contador de cartas está NEGATIVO! Verifica issaê.   :warning:");				// só pra mencionar a mim se e qndo isto ficar negativo, coisa que NÃO É pra acontecer
				if (reemb == 1) message.channel.send(`*O baralho de **ITENS COMUNS**  <:item_com:786001424529883147> estava vazio e foi reembaralhado com ${mesa[imatv].maxcom}/12 cartas*`);
				do { var roll = Math.floor(Math.random() * (12));  // This JavaScript function always returns a random number between min and max (both included) -- Math.floor(Math.random() * (max - min + 1) ) + min;
				} while (!mesa[imatv].ccom[roll].nobar);
				mesa[imatv].maxccom--;
				mesa[imatv].ccom[roll].invst = args[0];
				mesa[imatv].ccom[roll].disp = false;
				mesa[imatv].ccom[roll].nobar = false;
				var x = mesa[imatv].cinvs.findIndex(x => x.id === args[0]);
				mesa[imatv].cinvs[x].itens.push({item: mesa[imatv].ccom[roll].id});
				result.setColor('#eaaa00');
				result.setAuthor(mesa[imatv].cinvs[x].nome+" encontrou", mesa[imatv].cinvs[x].aimag, );
				//result.setTitle(mesa[imatv].ccom[roll].nome);
				result.setDescription("*"+mesa[imatv].ccom[roll].nome+"*");
				result.setThumbnail('https://cdn.discordapp.com/emojis/786001424529883147.png?v=1');
				result.setImage(mesa[imatv].ccom[roll].imag);
				message.channel.send(result);}}
			message.channel.send('',{files: ["https://cdn.discordapp.com/attachments/727097227759058994/727436900876681236/line.png"]});}

// ######## ########  !e investigador.id    - 	  comando para gerar ITEM ESPECIAL aleatório  ######## ########
	if (command === "e") {
		if ((imatv = mesa.findIndex(element => element.id == message.channel.parentID))<0) {			// seleciona ÍNDICE da mesa ativa
			message.reply("não há MESA para este canal\nCrie uma MESA em <#785827646344265779>");
		} else {
			var reemb = 0;		
			if (!["ama","bob","car","dar","dex","glo","har","irm","jen","joe","kat","man","mic","mon","pet","vin"].includes(args[0])){
				message.reply("não há <#785721643393351700> com ID informada\n Digite comando novamente");
			} else if (mesa[imatv].maxesp < 1) {
				for (i = 0; i < 12; i++){
					if (mesa[imatv].cesp[i].disp) {
						mesa[imatv].cesp[i].nobar = true;
						mesa[imatv].maxesp++;
						reemb = 1;}}
				if (mesa[imatv].maxesp == 0) {
					message.channel.send(":warning:  *O baralho de **ITENS ESPECIAIS** <:item_esp:786001446129631243> está vazio\ne não há cartas disponíveis para reembaralhar*  :warning:"+
									  "\n\nTodos os **ITENS ESPECIAIS** <:item_esp:786001446129631243> estão nas mãos dos <#785721643393351700>");
					message.reply("nenhum <:item_esp:786001446129631243> disponível");}}
			if (mesa[imatv].maxesp > 0) {
				if (mesa[imatv].maxesp < 0) message.channel.send("<@392823505869340682>, o contador de cartas está NEGATIVO! Verifica issaê.");				// só pra mencionar a mim se e qndo isto ficar negativo, coisa que NÃO É pra acontecer
				if (reemb == 1) message.channel.send("*O baralho de **ITENS ESPECIAIS** <:item_esp:786001446129631243> estava vazio e foi reembaralhado com "+mesa[imatv].maxesp+"/12 cartas*");
				do { var roll = Math.floor(Math.random() * (12));  // This JavaScript function always returns a random number between min and max (both included) -- Math.floor(Math.random() * (max - min + 1) ) + min;
				} while (!mesa[imatv].cesp[roll].nobar);
				mesa[imatv].maxesp--;
				mesa[imatv].cesp[roll].invst = args[0];
				mesa[imatv].cesp[roll].disp = false;
				mesa[imatv].cesp[roll].nobar = false;
				var x = mesa[imatv].cinvs.findIndex(x => x.id === args[0]);
				mesa[imatv].cinvs[x].itens.push({item: mesa[imatv].cesp[roll].id});
				result.setColor('#dc0005');
				result.setAuthor(mesa[imatv].cinvs[x].nome+" encontrou", mesa[imatv].cinvs[x].aimag, );
				//result.setTitle(mesa[imatv].cinvs[x].nome+" encontrou");
				result.setDescription("*"+mesa[imatv].cesp[roll].nome+"*");
				result.setThumbnail('https://cdn.discordapp.com/emojis/786001446129631243.png?v=1');
				result.setImage(mesa[imatv].cesp[roll].imag);
			message.channel.send(result);}
			message.channel.send('',{files: ["https://cdn.discordapp.com/attachments/727097227759058994/727436900876681236/line.png"]});}}

// ######## ########  !f investigador.id   - 	  comando para gerar FEITIÇO aleatório  ######## ########
	if (command === "f") {
		if ((imatv = mesa.findIndex(element => element.id == message.channel.parentID))<0) {			// seleciona ÍNDICE da mesa ativa
			message.reply("não há MESA para este canal\nCrie uma MESA em <#785827646344265779>");
		} else {
		var reemb = 0;		
		if (!["ama","bob","car","dar","dex","glo","har","irm","jen","joe","kat","man","mic","mon","pet","vin"].includes(args[0])){
			message.reply("não há <#785721643393351700> com ID informada\nDigite comando novamente");
		} else if (mesa[imatv].maxfeit < 1) {
			for (i = 0; i < 12; i++){
				if (mesa[imatv].cfeit[i].disp){
					mesa[imatv].cfeit[i].nobar = true;
					mesa[imatv].maxfeit++;
					reemb = 1;}}
			if (mesa[imatv].maxfeit == 0){
				message.channel.send(":warning:  *O baralho de **FEITIÇOS** <:feitico:786001402475708486> está vazio\ne não há cartas disponíveis para reembaralhar*  :warning:"+
								  "\n\nTodos os **FEITIÇOS** <:feitico:786001402475708486> estão nas mãos dos <#785721643393351700>");
				message.reply("nenhum <:feitico:786001402475708486> disponível");}}
		if (mesa[imatv].maxfeit > 0) {
			if (mesa[imatv].maxfeit < 0) { message.channel.send("<@392823505869340682>, o contador de cartas está NEGATIVO! Verifica issaê.");}				// só pra mencionar a mim se e qndo isto ficar negativo, coisa que NÃO É pra acontecer
			if (reemb == 1) message.channel.send("*O baralho de **FEITIÇOS** <:feitico:786001402475708486> estava vazio e foi reembaralhado com "+mesa[imatv].maxfeit+"/12 cartas*");
			do {
				var roll = Math.floor(Math.random() * (12));  // This JavaScript function always returns a random number between min and max (both included) -- Math.floor(Math.random() * (max - min + 1) ) + min;
			} while (!mesa[imatv].cfeit[roll].nobar);
			mesa[imatv].maxfeit--;
			mesa[imatv].cfeit[roll].invst = args[0];
			mesa[imatv].cfeit[roll].disp = false;
			mesa[imatv].cfeit[roll].nobar = false;
			var x = mesa[imatv].cinvs.findIndex(x => x.id === args[0]);
			mesa[imatv].cinvs[x].itens.push({item: mesa[imatv].cfeit[roll].id});
			result.setColor('#d94496');
			result.setAuthor(mesa[imatv].cinvs[x].nome+" encontrou", mesa[imatv].cinvs[x].aimag, );
			//result.setTitle(mesa[imatv].cinvs[x].nome+" encontrou");
			result.setDescription("*"+mesa[imatv].cfeit[roll].nome+"*");
			result.setThumbnail('https://cdn.discordapp.com/emojis/786001402475708486.png?v=1');
			result.setImage(mesa[imatv].cfeit[roll].imag);
			message.channel.send(result);}}
		message.channel.send('',{files: ["https://cdn.discordapp.com/attachments/727097227759058994/727436900876681236/line.png"]});}
	
// ######## ########  !a investigador.id    - 	  comando para gerar ALIADO aleatório  ######## ########
	if (command === "a") {
		if ((imatv = mesa.findIndex(element => element.id == message.channel.parentID))<0) {			// seleciona ÍNDICE da mesa ativa
			message.reply("não há MESA para este canal\nCrie uma MESA em <#785827646344265779>");
		} else {
		var reemb = 0;		
		if (!["ama","bob","car","dar","dex","glo","har","irm","jen","joe","kat","man","mic","mon","pet","vin"].includes(args[0])){
			message.reply("não há <#785721643393351700> com ID informada\nDigite comando novamente");
		} else if (mesa[imatv].maxaliado < 1) {
			for (i = 0; i < 8; i++){
				if (mesa[imatv].caliado[i].disp){
					mesa[imatv].caliado[i].nobar = true;
					mesa[imatv].maxaliado++;
					reemb = 1;}}
			if (mesa[imatv].maxaliado == 0){
				message.channel.send(":warning:  *O baralho de **ALIADOS** <:aliado:786001382796034079> está vazio\ne não há cartas disponíveis para reembaralhar*  :warning:"+
								  "\n\nTodos os **ALIADOS** <:aliado:786001382796034079> estão nas mãos dos <#785721643393351700>");
				message.reply("nenhum <:aliado:786001382796034079> disponível");}}
		if (mesa[imatv].maxaliado > 0) {
			if (mesa[imatv].maxaliado < 0) message.channel.send("<@392823505869340682>, o contador de cartas está NEGATIVO! Verifica issaê.");				// só pra mencionar a mim se e qndo isto ficar negativo, coisa que NÃO É pra acontecer
			if (reemb == 1) message.channel.send("*O baralho de **ALIADOS** <:aliado:786001382796034079> estava vazio e foi reembaralhado com "+mesa[imatv].maxaliado+"/8 cartas.");
			do {
				var roll = Math.floor(Math.random() * (8));  // This JavaScript function always returns a random number between min and max (both included) -- Math.floor(Math.random() * (max - min + 1) ) + min;
			} while (!mesa[imatv].caliado[roll].nobar);
			mesa[imatv].maxaliado--;
			mesa[imatv].caliado[roll].invst = args[0];
			mesa[imatv].caliado[roll].disp = false;
			mesa[imatv].caliado[roll].nobar = false;
			var x = mesa[imatv].cinvs.findIndex(x => x.id === args[0]);
			mesa[imatv].cinvs[x].itens.push({item: mesa[imatv].caliado[roll].id});
			result.setColor('#a34100');
			result.setAuthor(mesa[imatv].cinvs[x].nome+" encontrou", mesa[imatv].cinvs[x].aimag, );
			//result.setTitle(mesa[imatv].cinvs[x].nome+" encontrou");
			result.setDescription("*"+mesa[imatv].caliado[roll].nome+"*");
			result.setThumbnail('https://cdn.discordapp.com/emojis/786001382796034079.png?v=1');
			result.setImage(mesa[imatv].caliado[roll].imag);
			message.channel.send(result);}}
		message.channel.send('',{files: ["https://cdn.discordapp.com/attachments/727097227759058994/727436900876681236/line.png"]});}
	
// ######## ########  !mito    - 	  comando para abrir CARTAS MITO aleatória  ######## ########
	if (command === "mito") {
		if ((imatv = mesa.findIndex(element => element.id == message.channel.parentID))<0) {			// seleciona ÍNDICE da mesa ativa
			message.reply("não há MESA para este canal\nCrie uma MESA em <#785827646344265779>");
		} else {
			if (mesa[imatv].maxmito < 1) {
				message.channel.send("*O baralho de **Cartas do Mito** <:mito:787335941827330049> foi reembaralhado*");
				for (i = 0; i < mesa[imatv].cmito.length; i++) mesa[imatv].cmito[i].nobar = true;
				mesa[imatv].maxmito = 32;}
			if (mesa[imatv].maxmito < 0) message.channel.send("<@392823505869340682>, o contador de cartas está NEGATIVO! Verifica issaê.");
			do { var roll = Math.floor(Math.random() * (32));  // This JavaScript function always returns a random number between min and max (both included) -- Math.floor(Math.random() * (max - min + 1) ) + min;
			} while (!mesa[imatv].cmito[roll].nobar);
			mesa[imatv].cmito[roll].disp = false;
			mesa[imatv].cmito[roll].nobar = false;
			mesa[imatv].maxmito--;
			result.setColor('#2b1d0e');
			result.setTitle(mesa[imatv].cmito[roll].nome);
			result.setThumbnail('https://cdn.discordapp.com/emojis/787335941827330049.png?v=1');
			result.setImage(mesa[imatv].cmito[roll].imag);
		} message.channel.send(result);
		message.channel.send('',{files: ["https://cdn.discordapp.com/attachments/727097227759058994/727436900876681236/line.png"]});}
	
// ######## ########  !monst    - 	  comando para abrir MONSTRO aleatório  ######## ########
	if (command === "monst") {
		if ((imatv = mesa.findIndex(element => element.id == message.channel.parentID))<0) {			// seleciona ÍNDICE da mesa ativa
			message.reply("não há MESA para este canal\nCrie uma MESA em <#785827646344265779>");
		} else {
			var roll = Math.floor(Math.random() * (27));  // This JavaScript function always returns a random number between min and max (both included) -- Math.floor(Math.random() * (max - min + 1) ) + min;
			switch (roll) {
				case 0:
					result.setTitle('')
					result.setURL('')
					result.setImage('');
				break; case 1:
					result.setTitle('')
					result.setURL('')
					result.setImage('');
				break; case 2:
					result.setTitle('')
					result.setURL('')
					result.setImage('');
				break; case 3:
					result.setTitle('')
					result.setURL('')
					result.setImage('');
				break; case 4:
					result.setTitle('')
					result.setURL('')
					result.setImage('');
				break; case 5:
					result.setTitle('')
					result.setURL('')
					result.setImage('');
				break; case 6:
					result.setTitle('')
					result.setURL('')
					result.setImage('');
				break; case 7:
					result.setTitle('')
					result.setURL('')
					result.setImage('');
				break;
			} message.channel.send(result);
		message.channel.send('',{files: ["https://cdn.discordapp.com/attachments/727097227759058994/727436900876681236/line.png"]});}}

// ######## ########  !usar investigador.id item.id    - 	  comando para USAR ITENS (usar investigador item)  ######## ########
	if (command === "usar") {
		if ((imatv = mesa.findIndex(element => element.id == message.channel.parentID))<0) {			// seleciona ÍNDICE da mesa ativa
			message.reply("não há MESA para este canal\nCrie uma MESA em <#785827646344265779>");
		} else {
			if (!["ama","bob","car","dar","dex","glo","har","irm","jen","joe","kat","man","mic","mon","pet","vin"].includes(args[0])){
				message.reply("não há <#785721643393351700> com ID informada.");
			} else if (!["cig","com","dia","din","esg","fac","lan","mac","pis","rev","tom","uis",
						 "cel","col","esp","est","fla","lam","liv","nec","rei","ped","rly","vig",
						 "apr","blo","cur","ena","eno","mal","nev","per","pro","sec","sim","voz",
						 "ann","duk","eri","arm","ric","sta","tho","mur","p"].includes(args[1])){
				message.reply("não há ITEM com ID informada\nDigite comando novamente");
			} else {
				var x = mesa[imatv].cinvs.findIndex(x => x.id === args[0]);																			// investigador x
				if (args[1] === "p" && mesa[imatv].cinvs[x].pista <= 0) {																			// investigador tenta usar pista sem possuir
						if (mesa[imatv].cinvs[x].pista < 0) message.channel.send("<@392823505869340682>, o contador de pistas está NEGATIVO! Verifica issaê.");				// só pra mencionar a mim se e qndo isto ficar negativo, coisa que NÃO É pra acontecer
						result.setColor('ffcc00');
						result.setAuthor(mesa[imatv].cinvs[x].nome+" não possui <:pista:785894888725151745> para usar", mesa[imatv].cinvs[x].aimag);
						//result.setTitle(mesa[imatv].cinvs[x].nome + " não possui <:pista:785894888725151745> para usar");
						result.setDescription(":warning: AÇÃO NÃO REALIZADA");
						result.setImage('https://discord.com/assets/289673858e06dfa2e0e3a7ee610c3a30.svg');}

				if (args[1] === "p" && cinvs[x].pista > 0){																			// investigador usa pista
					mesa[imatv].cinvs[x].pista--;
					result.setAuthor(mesa[imatv].cinvs[x].nome+" gastou uma <:pista:785894888725151745>", mesa[imatv].cinvs[x].aimag);
					//result.setTitle(mesa[imatv].cinvs[x].nome + " gastou uma <:pista:785894888725151745>");
					if (mesa[imatv].cinvs[x].pista > 1) result.setDescription("Restam "+ mesa[imatv].cinvs[x].pista + " <:pista:785894888725151745>");
					else if (mesa[imatv].cinvs[x].pista < 1) result.setDescription("Acabaram as <:pista:785894888725151745>");				
					else result.setDescription("Resta "+ mesa[imatv].cinvs[x].pista + " <:pista:785894888725151745>");
					result.setThumbnail('https://cdn.discordapp.com/emojis/785894888725151745.png?v=1');}
				
				if (["cig","com","dia","din","esg","fac","lan","mac","pis","rev","tom","uis"].includes(args[1])){
					var y = mesa[imatv].ccom.findIndex(y => y.id === args[1]);																		// item comum y
					if (mesa[imatv].ccom[y].invst != mesa[imatv].cinvs[x].id){
						result.setColor('ffcc00');
						result.setAuthor(mesa[imatv].cinvs[x].nome+" não possui este item", mesa[imatv].cinvs[x].aimag, );
						//result.setTitle(mesa[imatv].cinvs[x].nome + " não possui este item");
						result.setDescription(":warning: "+mesa[imatv].ccom[y].nome);
						result.setThumbnail('https://discord.com/assets/289673858e06dfa2e0e3a7ee610c3a30.svg');
					} else {
						mesa[imatv].ccom[y].invst = "-"
						mesa[imatv].ccom[y].disp = true
						result.setAuthor(mesa[imatv].cinvs[x].nome+" usou ", mesa[imatv].cinvs[x].aimag);
						result.setDescription("*"+mesa[imatv].ccom[y].nome+"*");}
						//result.setTitle(mesa[imatv].cinvs[x].nome+ " usou "+ mesa[imatv].ccom[y].nome)}
					result.setThumbnail('https://cdn.discordapp.com/emojis/786001424529883147.png?v=1')
					result.setImage(esa[imatv].ccom[y].imag);}

				if (["cel","col","esp","est","fla","lam","liv","nec","rei","ped","rly","vig"].includes(args[1])){
					var y = mesa[imatv].cesp.findIndex(y => y.id === args[1]);																		// item especial y
					if (mesa[imatv].cesp[y].invst != mesa[imatv].cinvs[x].id){
						result.setColor('ffcc00');
						result.setAuthor(mesa[imatv].cinvs[x].nome+" não possui este item", mesa[imatv].cinvs[x].aimag);
						//result.setTitle(mesa[imatv].cinvs[x].nome + " não possui este item");
						result.setDescription(":warning: "+mesa[imatv].cesp[y].nome);
						result.setThumbnail('https://discord.com/assets/289673858e06dfa2e0e3a7ee610c3a30.svg');
					} else {
						mesa[imatv].cesp[y].invst = "-"
						mesa[imatv].cesp[y].disp = true
						result.setAuthor(mesa[imatv].cinvs[x].nome+" usou ", mesa[imatv].cinvs[x].aimag);
						result.setDescription("*"+mesa[imatv].cesp[y].nome+"*");}
						//result.setTitle(mesa[imatv].cinvs[x].nome+ " usou "+ mesa[imatv].cesp[y].nome)}
					result.setThumbnail('https://cdn.discordapp.com/emojis/786001446129631243.png?v=1')
					result.setImage(esa[imatv].cesp[x].imag);}
				
				if (["apr","blo","cur","ena","eno","mal","nev","per","pro","sec","sim","voz"].includes(args[1])){
					var y = mesa[imatv].cfeit.findIndex(y => y.id === args[1]);																	// feitiço y
					if (mesa[imatv].cfeit[y].invst != mesa[imatv].cinvs[x].id){
						result.setColor('ffcc00');
						result.setAuthor(mesa[imatv].cinvs[x].nome+" não possui este item", mesa[imatv].cinvs[x].aimag);
						//result.setTitle(mesa[imatv].cinvs[x].nome + " não possui este item");
						result.setDescription(":warning: "+mesa[imatv].cfeit[y].nome);
						result.setThumbnail('https://discord.com/assets/289673858e06dfa2e0e3a7ee610c3a30.svg');
					} else {
						mesa[imatv].cfeit[y].invst = "-"
						mesa[imatv].cfeit[y].disp = true
						result.setAuthor(mesa[imatv].cinvs[x].nome+" usou ", mesa[imatv].cinvs[x].aimag);
						result.setDescription("*"+mesa[imatv].cfeit[y].nome+"*");}
						//result.setTitle(mesa[imatv].cinvs[x].nome+ " usou "+ mesa[imatv].cfeit[y].nome)}
					result.setThumbnail('https://cdn.discordapp.com/emojis/786001402475708486.png?v=1')
					result.setImage(mesa[imatv].cfeit[y].imag);}
					
				if (["ann","duk","eri","arm","ric","sta","tho","mur"].includes(args[1])){
					var y = mesa[imatv].caliado.findIndex(y => y.id === args[1]);																	// aliado y
					if (mesa[imatv].caliado[y].invst != mesa[imatv].cinvs[x].id){
						result.setColor('ffcc00');
						result.setAuthor(mesa[imatv].cinvs[x].nome+" não possui este item", mesa[imatv].cinvs[x].aimag);
						//result.setTitle(cinvs[x].nome + " não possui este item");
						result.setDescription(":warning: "+mesa[imatv].caliado[y].nome);
						result.setThumbnail('https://discord.com/assets/289673858e06dfa2e0e3a7ee610c3a30.svg');
					} else {
						mesa[imatv].caliado[y].invst = "-"
						mesa[imatv].caliado[y].disp = true
						result.setAuthor(mesa[imatv].cinvs[x].nome+" usou ", mesa[imatv].cinvs[x].aimag);
						result.setDescription("*"+mesa[imatv].caliado[y].nome+"*");}
						//result.setTitle(mesa[imatv].cinvs[x].nome+ " usou "+ mesa[imatv].caliado[y].nome)}
					result.setThumbnail('https://cdn.discordapp.com/emojis/786001382796034079.png?v=1');
					result.setImage(mesa[imatv].caliado[y].imag);}
				message.channel.send(result);
				message.channel.send('',{files: ["https://cdn.discordapp.com/attachments/727097227759058994/727436900876681236/line.png"]});}}}

});

client.login(config.BOT_TOKEN);