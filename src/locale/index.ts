export const languages = {
	"pt-BR": {
		home: {
			file: "Arquivo legal",
			header: {
				documentation: "Documentação",
				support: "Suporte",
				menu: {
					exit: "Sair",
					dashboard: "Dashboard",
					subscriptions: "Inscrições",
				},
			},
			footer: {
				poweredBy: "Hospedado em",
				links: {
					title: "Links úteis",
					addConnections: "Adicionar Connections",
					panel: "Dashboard",
					connections: "Conexões",
				},
				legal: {
					title: "Legal",
					terms: "Termos de Uso",
					policy: "Política de Privacidade",
				},
				title: "Personalize a maneira como você fala, seja melhor.",
			},
			description:
				"Connections é um bot criado para facilitar conexões entre servidores, promovendo engajamento e dinamismo.",
			embeds: {
				fromSpyei: "de Servidor de spyei",
				fromUnreal: "de Servidor de unreal",
				hour: "Hoje às ",
			},
			addConnections: "Adicionar Connections",
			conversation: {
				spyei: {
					message: "Eae mano, como vai?",
					server: "Servidor de spyei",
				},
				unreal: {
					message: "Estou bem!",
					server: "Servidor de unreal",
					typing: " está digitando",
				},
				connectedChannel: "canal-conectado",
			},
			custom: {
				title: "Totalmente customizavel",
				description:
					"Connections é um bot totalmente personalizável, onde 99.9% dos recursos podem ser ajustados conforme suas preferências, permitindo que você o configure exatamente do seu jeito.",
				moreOptions: "E muito mais opções!",
			},
			addConnectionsEmbed: {
				title: "Adicione o Connections",
				description:
					"Um bot moderno e exclusivo de conexões para engajar seu servidor e torná-lo mais ativo",
			},
		},
		dashboard: {
			joinPrivateConnection: {
				title: "Entrar em uma conexão privada",
				description:
					"Você pode entrar em uma conexão privada usando o código abaixo",
				button: "Entrar",
				modal: {
					title: "Entrar em uma conexão privada",
				},
			},
			guilds: {
				noGuilds: "Você não tem servidores",
				noGuildsDescription: "Você pode adicionar o connections nos seus servidores clicando no botão",
				noGuildsFound: "Nenhum servidor encontrado",
				title: "Servidores",
				description: "Selecione o servidor que deseja gerenciar",
				addServer: "Adicionar servidor",
				info: {
					metadata: {
						title: "Caracteres por Mensagem",
						description: "Defina abaixo o número máximo de caracteres que irá aparecer nas mensagens recebidas do seu servidor"
					},
					logs: {
						reportMessage: "Logs de reportes são essenciais para os reportes, você tem certeza que deseja desativá-lo?",
						logsbuttons: {
							anyLog: {
								title: "Qualquer Log",
								description: "Todos os tipos de logs serão enviados"
							},
							bansLog: {
								title: "Logs de Banimentos",
								description: "Todos os banimentos feitos em conexões"
							},
							connectionsLog: {
								title: "Logs de Conexões",
								description: "Todos os logs de cada conexão conectada no servidor"
							},
							locksLog: {
								title: "Logs de Bloqueio",
								description: "Logs de quando alguém bloqueia um canal de uma conexão conectada"
							},
							notesLog: {
								title: "Logs de Notas",
								description: "Notas na conexão"
							},
							purgesLog: {
								title: "Logs de Punições",
								description: "Banimentos e timeouts em conexões"
							},
							reportsLog: {
								title: "Logs de Reportes",
								description: "Reportes de mensagens feitos pelos usuários"
							},
							timeoutsLog: {
								title: "Logs de Timeouts",
								description: "Todos os timeouts feitos em conexões"
							},
							messageDeleteLog: {
								title: "Logs de Mensagens Deletadas",
								description: "Todas as mensagens deletadas"
							},
						},
						title: "Canal de Logs",
						description: "Selecione o canal que receberá todos os logs selecionados",
						button: "Clique aqui e selecione um canal",
					},
					connections: {
						title: "Logs das Conexões Conectadas",
						description: "Selecione abaixo quais logs você deseja ter no canal de logs",
					},
					prefix: "Prefixo",
					prefixdescription:
						"Digite abaixo o prefixo que deseja usar para executar os comandos do Connections",
					save: "Salvar",
					title: "Informações",
					description: "Aqui ficará as informações do servidor",
					premiumexpires: "Expira em {date}",
				},
				guild: {
					title: "Servidor",
					connections: "Conexões",
				},
				tabs: {
					connections: "Conexões",
					guilds: "Servidores",
					channels: "Canais",
					infos: "Informações",
					cases: "Casos",
				},
				connections: {
					infos: {
						back: "Voltar",
						title: "Editar conexão",
						informations: "Informações",
						flags: "Flags",
						blockedWords: "Palavras bloqueadas",
						channel: "Canal",
						configure: "Configurar",
						none: "Nenhuma",
					},
					disconnect: {
						title: "Desconectar conexão",
						disconnect: "Desconectar",
						disconnectConfirm:
							"Você deseja mesmo desconectar de seu servidor a conexão",
					},
					blockedWords: {
						title: "Palavras bloqueadas",
						description:
							"Digite abaixo palavras que você deseja bloquear, separadas por vírgulas (supimpa, carambolas, etc)",
						type: "Digite aqui alguma palavra.",
						save: "Salvar",
					},
					flags: {
						title: "Flags",
						description:
							"Selecione abaixo quais flags você deseja ativar para a conexão, ou desabilite qualquer que desejar.",
						locked: "Conexão Bloqueada",
						lockedDescription:
							"Conexão bloqueada por moderadores, a conexão não pode receber e nem enviar mensagens",
						frozen: "Conexão Congelada",
						frozenDescription:
							"Conexão congelada por moderadores, A CONEXÃO NÃO PODE SER EDITADA NOVAMENTE",
						allowFiles: "Permitir Arquivos",
						allowFilesDescription: "Permitir envio de arquivos",
						allowInvites: "Permitir Convites",
						allowInvitesDescription: "Permitir convites de outros servidores",
						allowLinks: "Permitir Links",
						allowLinksDescription: "Permitir links nas mensagens enviadas",
						noIndentification: "Não Identificar servidor",
						noIndentificationDescription: "Não identificar nome do servidor",
						allowOrigin: "Permitir Origem",
						allowOriginDescription:
							"Permitir aparecer informações do servidor da mensagem enviada, como nome e id",
						allowEmojis: "Permitir Emojis",
						allowEmojisDescription: "Permitir somente emojis do discord",
						compactModeEnabled: "Modo Compacto",
						compactModeEnabledDescription:
							"Mensagem mais compacta a ser enviada",
						autoTranslate: "Auto Traduzir",
						autoTranslateDescription:
							"Traduzir automaticamente mensagens recebidas",
					},
					channel: "Canal da conexão",
					selectchannel: "Clique aqui e selecione um canal",
					connectionName: "Nome da conexão",
					connectionPlaceholder: "conexaolegal",
					connecting: "Conectando...",
					connect: "Conectar",
					language: "Linguagem desejada",
					searchForLanguage: "Procure por uma linguagem",
					languageTitle: "Linguagem",
					languageclick: "Clique aqui para selecionar a linguagem",
					hashLabel: "Código de hash",
					hashPlaceholder: "Digite o código de hash",
					public: "Pública",
					private: "Privada",
				},
				mods: {
					notfoundlabel:
						"Não encontrou o membro que queria? adicione-o pelo ID",
					notfoundplaceholder: "Digite o ID do usuário",
					placeholder: "Digite o nome do usuário ou ID",
					title: "Moderadores",
					addModerator: "Adicionar Moderador",
					moderator: "Moderador",
					delete: "Remover moderador",
					deleteConfirm: "Você deseja mesmo remover o moderador",
					deletetext: "Remover",
					label: "Procure por um usuário",
					description:
						"Aqui ficará os usuários que podem gerenciar as conexões deste servidor",
				},
				threads: {
					thread: {
						title: "Thread",
						originId: "Id de origem",
						creatorId: "Criador da thread",
						channels: "Canais da thread",
						created: "Criada em",
						delete: "Deletar thread",
						deleteConfirm: "Você deseja mesmo deletar a thread",
						deletetext: "Deletar",
						noThreads: "Não há threads",
						noThreadsDescription:
							"Não há threads nesse servidor, tente criar uma!",
					},
					description:
						"Aqui ficará as threads que você pode gerenciar neste servidor",
				},
				cases: {
					noCases: "Parece que não há nenhum caso registrado.",
					nocasesbruh:
						"Tente castigar os bananões do seu servidor utilizando o Connections",
					case: "Caso",
					was: "foi",
					title: "Casos do servidor",
					description:
						"Aqui ficará o histórico de casos que ocorreram em seu servidor, como banimentos e timeouts.",
					ban: "banido",
					mute: "mutado",
					by: "por",
					reason: "Motivo",
					filters: {
						guildban: "Banimento de servidor",
						type: "Tipo",
						user: "Usuário",
						moderator: "Moderador",
						ambos: "Qualquer",
						selectModerator: "Clique aqui e selecione um moderador",
						selectConnection: "Clique aqui e selecione uma conexão",
						userID: "ID do usuário que deseja filtrar",
					},
				},
				channels: {
					title: "Editar Canais bloqueados",
					description:
						"Clique nos cadeados para bloquear e desbloquear o canal de cada conexão conectada em seu servidor",
				},
				modifications: {
					changes: "Você tem alterações para serem salvas",
					reset: "Redefinir",
				},
			},
			connections: {
				noConnections: "Você não tem conexões",
				noConnectionsDescription: "Você pode criar conexões clicando no botão",
				noConnectionsFound: "Nenhuma conexão encontrada",
				activatePromoted: "Ativar Promoted",
				title: "Conexões",
				description: "Selecione a conexão que deseja gerenciar",
				addConnection: "Adicionar conexão",
				createConnection: "Criar conexão",
				createConnectionLoading: "Criando conexão...",
				connectToConnection: "Conectar a uma conexão",
				connection: {
					title: "Conexão",
					typetag:
						"Digite abaixo algumas tags separadas por um espaço (tag1 tag2 ...)",
					icon: "Icone da conexão",
					private: "Conexão privada",
					privateDescription:
						"Ao habilitar esta opção, a conexão não irá aparecer na lista de conexões públicas e será apenas conectável por pessoas com o link de convite abaixo.",
					form: {
						name: "Nome",
						description: "Descrição",
						icon: "Icone",
						maxConnections: "Conexões máximas",
						createConnection: "Criar conexão",
						placeholders: {
							name: "conexaolegal",
							description: "Essa conexão é supimpa de bom!",
						},
					},
				},
				metrics: {
					graphic: "Gráfico Detalhado",
					days: {
						seven: "7 dias atrás",
						fourteen: "14 dias atrás",
						month: "30 dias atrás",
						older: "Mais de 30 dias atrás",
					},
					feedbacks: {
						commingSoon: "Em breve...",
					},
					title: "Métricas",
					description:
						"Aqui você pode ver as métricas da sua conexão, recurso exclusivo para conexões promovidas",
					servers: {
						title: "Servidores",
						noServers: "Sua conexão não está conectada em nenhum servidor",
						servers: "Sua conexão está conectada em ",
						serv: "Servidor",
						connections: "Servidores conectados nos últimos 7 dias",
					},
					visualizations: {
						noViews: "Sua conexão não tem nenhuma visualização",
						title: "Visualizações",
						visu: "Visualização",
						has: "Sua conexão teve",
						lastseven: "nos últimos 7 dias",
						total: "no total",
					},
				},
				auditLog: {
					titles: "Registro de Auditoria das Conexões",
					descriptions: "Acompanhe todas as mudanças feitas nas suas conexões do time (somente conexões promovidas)",
					noPromoted: "Esse time não possui conexões promovidas",
					title: "Registro de Auditoria",
					description: "Acompanhe todas as mudanças feitas na sua conexão",
					logEntry: {
						updateIcon: " alterou o ícone de ",
						updateDescription: " alterou a descrição de ",
						for: " para ",
						none: "nenhum",
						updatedTags: " alterou as tags de ",
						addedTeam: " adicionou a conexão à equipe ",
						removedTeam: " removeu a conexão da equipe ",
						privatedConnection: " tornou a conexão privada",
					},
				},
				promotedRecurse: "Recurso Promoted",
				settings: {
					subscriptions: "Inscrições",
					promoted: "Você pode ver suas inscrições clicando no botão abaixo",
					title: "Configurar Conexão",
					description: "Aqui você pode configurar sua conexão",
				},
				delete: {
					title: "Deletar conexão",
					description: "Você deseja mesmo deletar a conexão",
					button: "Deletar",
					descriptionpage:
						"Ao deletar sua conexão, você irá perder todos os dados associados a ela como mensagens e guildas que se conectaram na sua conexão e outros dados.",
				},
				edit: {
					rules: {
						preview: "Pré-visualização",
						title: "Regras",
						description: "Digite abaixo as regras que irão aparecer após um usuário conectar na sua conexão (Discord Markdown permitido!!)",
					},
					title: "Editar conexão",
					description: "Aqui você pode editar sua conexão",
					condescription: "Descrição",
					condescriptionPlaceholder: "Descrição da conexão",
					icon: "Icone",
					iconPlaceholder: "Icone da conexão",
					placeholders: {
						name: "Nome",
						description: "Descrição",
						icon: "Icone",
						maxConnections: "Conexões máximas",
					},
				},
				edittab: "Editar",
				settingstab: "Configurações",
			},
			misc: {
				cancel: "Cancelar",
				filterConnections: "Filtrar conexões",
				filterGuilds: "Filtrar servidores",
				filterTeams: "Filtrar times",
			},
			teams: {
				tabs: {
					members: "Membros",
					connections: "Conexões",
					settings: "Configurações",
					auditLog: "Registro de Auditoria",
				},
				title: "Times",
				description: "Selecione o time que deseja gerenciar",
				createTeam: "Criar time",
				createTeamLoading: "Criando time...",
				noTeams: "Você não tem times",
				noTeamsDescription: "Você pode criar times clicando no botão",
				noTeamsFound: "Nenhum time encontrado",
				delete: {
					title: "Deletar time",
					description: "Você deseja mesmo deletar o time",
					descriptionpage:
						"Ao deletar seu time, você irá perder todos os dados associados a ele, incluindo mensagens e servidores que estão conectados ao seu time e outros dados.",
				},
				settings: {
					delete: {
						title: "Deletar time",
						description: "Você deseja mesmo deletar o time",
						descriptionpage:
							"Ao deletar seu time, você irá perder todos os dados associados a ele, incluindo mensagens e servidores que estão conectados ao seu time e outros dados.",
					},
					transfer: {
						title: "Transferir posse do time",
						description:
							"Após transferir a posse do time para outro usuário, todas as conexões do time serão removidas, e o dono será um membro do time",
						noMembers: "Seu time não possui membros",
						noMembersFound: "Nenhum membro encontrado",
						transferOwner:
							"Você deseja mesmo transferir a posse do time para o membro {member}?",
						button: "Transferir Posse",
						placeholder: "Digite aqui o nome do membro ou ID",
					},
				},
				members: {
					title: "Membros",
					description:
						"Aqui ficarão os membros do seu time, todos os membros podem adicionar e remover conexões do time",
					filterMembers: "Filtrar membros",
					placeholder: "Digite aqui um nome de usuário ou ID",
					noMembers: "Esse time não possui membros",
					noMembersDescription: "Você pode adicionar membros clicando no botão",
					noMembersFound: "Nenhum membro encontrado",
					manageMember: "Gerenciar Membro",
					modal: {
						title: "Gerenciar Membro",
						description: "O que você deseja fazer com o membro",
						choose: "Escolha uma das opções abaixo",
						kick: "Expulsar",
						transfer: "Transferir Posse",
					},
					invite: {
						success:
							"O usuário foi convidado com sucesso, para aceitar o convite, vá até as notificações, procure o time, e aceite o convite",
						title: "Convidar Membro",
						alreadyMember: "O membro já é membro desta equipe",
						placeholder: "Digite aqui o ID do membro que será convidado",
						memberId: "ID do membro",
						sendInvite: "Enviar Convite",
						maxMembers: "Este time atingiu o máximo de 3 membros",
					},
					delete: {
						title: "Remover Membro",
						description: "Você deseja mesmo remover o membro",
						remove: "Remover",
					},
				},
				connections: {
					title: "Conexões",
					description:
						"Aqui ficará as conexões que estão atreladas ao seu time, na aba da conexão, o seu time irá aparecer como dono da conexão",
					placeholder: "Digite aqui o nome ou descrição da conexão",
					filterConnections: "Filtrar conexões",
					noConnections: "Parece que não há conexões",
					noConnectionsDescription:
						"Você pode criar conexões clicando no botão",
					noConnectionsFound: "Nenhuma conexão encontrada",
					modal: {
						description: "Selecione abaixo a conexão que você deseja adicionar",
						title: "Adicionar conexão",
						label: "Nome da conexão",
						placeholder: "Digite aqui o nome da conexão",
						add: "Adicionar",
					},
				},
				team: {
					form: {
						name: "Nome",
						icon: "Icone",
						placeholder: "Digite aqui o nome do time",
					},
				},
			},
		},
		plans: {
			poppromoted: {
				title: "Como comprar Promoted?",
				fristimageDescription: "Para adquirir Promoted, acesse nosso",
				firstimageDescriptiontwo:
					" e vá até o canal # promoted, e nele terá uma mensagem do bot Zennify, basta clicar em comprar e efeturar a compra",
				secondImageDescription:
					"Após efetuar o pagamento pelo Zennify, você receberá um código de ativação do promoted, para ativar o código, basta ir na página da sua conexão desejada, e clicar no botão 'Ativar Promoted', como na imagem abaixo.",
			},
			seehow: "Veja como",
			buypopUp: {
				title: "Como comprar premium?",
				warning:
					"NO MOMENTO só estamos aceitando pagamentos SOMENTE em BRL (R$).",
				fristimageDescription: "Para adquirir premium, acesse nosso",
				firstimageDescriptiontwo:
					" e vá até o canal # premium e nele vai estar duas mensagens do bot Zennify, escolha qual plano você deseja e faça a compra do Premium.",
				discordServer: "servidor do Discord",
				secondImageDescription:
					"Após efetuar o pagamento pelo Zennify, você receberá um código de ativação do premium, para ativar o código, basta ir na página do seu servidor, e clicar no botão 'Ativar premium', como na imagem abaixo.",
				understand: "Entendido!",
			},
			pageDescription: "Acesse o melhor nível do Connections. Use premium.",
			basicpremium: {
				features: [
					"+ 5 Threads",
					"+ 10 Limite de moderadores",
					"+ 25 Conexões conectadas",
					"Cooldown de mensagens diminuido",
					"Congelar mensagens",
					"Sistema de moderação melhorado",
					"E muito mais!",
				],
			},
			premium: {
				features: [
					"+ 15 Threads",
					"+ 10 Limite de moderadores",
					"+ 50 Conexões conectadas",
					"Cooldown de mensagens diminuido",
					"Congelar mensagens",
					"Sistema de moderação melhorado",
					"Bot próprio e customizavel!",
					"Até 5 servidores premium",
					"E muito mais!",
				],
			},
			popUp: {
				title: "Comprar Premium",
				code: "Código de ativação",
				placeholder: "Digite aqui o código de ativação",
				activate: "Ativar Premium",
				premiumActivate: "Ativação de Premium",
				success: "Foi ativado em seu servidor com sucesso!",
				advantages: "Vantagens obtidas",
			},
			promoted:
				"Promova sua conexão favorita, e faça com que ela ganhe mais destaque entre as outras. Veja registro de auditoria da sua conexão, métricas avançadas e muito mais.",
			buy: "Comprar",
			month: "mês",
			seeplans: "Ver planos",
			description:
				"Obtenha recursos avançados, menor cooldown e controle aprimorado com o Premium. O Vip oferece tudo isso mais um bot customizável e suporte para até 5 servidores.",
		},
		login: {
			title: "Login no Connections",
			description:
				"Faça login no connections e desbloqueie o uso da dashboard e muito mais!",
			discord: "Entrar com discord",
		},
		connection: {
			team: "Time:",
			wantPromoted: "Quer sua conexão no topo?",
			wantpromotedDescription: "Junte-se ao Promoted clicando no botão abaixo!",
			promote: "Promover Conexão",
			joinPrivateConnection: "Entrar em uma conexão privada",
			title: "Conexões",
			creator: "Criador(a):",
			recommended: "Conexões recomendadas",
			description: "Descubra novas conexões!",
			vote: "Votar",
			return: "Volte daqui {hours} {hour}",
			returntwelve: "Volte daqui 12 {hour}",
			voted: "Votado",
			hour: "hora",
			connectionServer: "Servidor da conexão",
			connectionServerPlaceholder: "Selecione um servidor",
			hours: "horas",
			voting: "Votando...",
			connect: "Conectar",
			promoted: "Promovida",
			search: "Procurar por uma conexão",
			tags: ["Gamer", "Bate-papo", "Comunidade", "Variado", "Minecraft"],
			noConnections: "Ops... Parece que não encontramos nenhuma conexão",
			filters: {
				save: "Salvar",
				title: "Filtros",
				sort: "Ordenar por",
				tag: "Tag",
				query: "Pesquisar por",
				votes: "Top",
				creationDate: "Novo",
				typehere: "Digite aqui",
				reset: "Redefinir filtros",
			},
		},
		tos: {
			title: "Termos de serviço",
			intro1:
				"Ao acessar e utilizar o site Connections e o Bot Connections, você concorda com os seguintes termos e condições.",
			intro2:
				"Estes termos são projetados para assegurar que tanto o site quanto o bot sejam utilizados de maneira adequada e em conformidade com as leis aplicáveis.",
			intro3:
				"O seu acesso e uso de nossos serviços estão sujeitos a essas diretrizes, que visam proteger tanto a integridade dos nossos serviços quanto a segurança e os direitos dos nossos usuários. Ao utilizar o site ou o bot, você declara estar ciente de e aceitar todas as condições descritas a seguir. É sua responsabilidade ler e entender essas regras, e você concorda em cumprir todas as disposições estabelecidas aqui.",
			prohibited: {
				title: "É proibido:",
				item1: "Minerar ou coletar dados sem autorização.",
				item2:
					"Utilizar ferramentas ou técnicas que comprometam a integridade ou segurança do site ou do bot.",
				item3:
					"Remover, copiar ou reproduzir conteúdo protegido por direitos autorais do site ou do bot.",
				item4:
					"Emoldurar ou fazer reprodução não autorizada de qualquer parte do site ou do bot.",
				item5:
					"Utilizar o Conteúdo do Usuário sem nossa permissão e a permissão dos próprios usuários.",
				item6:
					"Usar o site ou o bot de maneira maliciosa, incluindo tentativas de comprometer seu funcionamento ou segurança.",
				item7:
					"Violação de direitos autorais relacionados ao site e ao bot, incluindo a utilização não autorizada de logotipos, emotes e outros materiais.",
				item8:
					"Tentar imitar ou copiar serviços e funcionalidades oferecidos pelo Connections.",
			},
			discordRules: {
				title:
					"Para garantir um funcionamento adequado e seguro do Bot Connections em seus servidores Discord, observe as seguintes regras:",
				item1:
					"Proibição de Exploração: É proibido tentar explorar o Bot Connections para obter vantagens injustas ou prejudicar outros usuários. Isso inclui qualquer tentativa de manipulação ou modificação não autorizada do bot.",
				item2:
					"Conformidade com Termos do Discord: O uso do Bot Connections deve estar em total conformidade com os Termos de Serviço do Discord. Qualquer violação desses termos será considerada uma infração das nossas políticas também.",
				item3:
					"Políticas do Connections: Todos os usos do Bot Connections devem respeitar as políticas e diretrizes estabelecidas no site Connections. Qualquer infração pode resultar em ações corretivas.",
			},
			limitations: {
				title:
					"Enquanto nos esforçamos para oferecer um serviço de alta qualidade, o site e o Bot Connections estão sujeitos a certas limitações:",
				item1:
					"Garantias: Não garantimos que o site ou o bot estejam livres de erros, bugs ou falhas. A disponibilidade contínua e a operação dos serviços não são garantidas.",
				item2:
					"Condições e Responsabilidades: Não oferecemos garantias específicas além das expressamente estabelecidas neste Termo de Serviço. O uso do site e do bot é por sua conta e risco.",
				item3:
					"Direitos Autorais: Comprometemo-nos a remover ou revogar imediatamente qualquer conteúdo que infrinja direitos autorais. Nosso objetivo é respeitar o trabalho de outros e corrigir prontamente quaisquer violações.",
			},
		},
		policy: {
			title: "Política de Privacidade",
			intro:
				"Nós da equipe Connections temos total cuidado e responsabilidade com todas as informações pessoais dos usuários que são coletadas legalmente. Não temos qualquer intenção de prejudicar qualquer um que utilize nossos serviços. Todas as informações solicitadas são dados do próprio Discord, já que dependemos dele. Não compartilhamos nem vendemos os dados e informações pessoais coletadas. Não solicitamos informações externas ou dados sensíveis que possam prejudicar o uso do usuário.",
			dataCollection:
				"Todos os dados que solicitamos são os necessários para o funcionamento da aplicação. Todos os dados que coletamos estão citados abaixo:",
			username:
				"Nome de Usuário, ID e Avatar do Discord: Coletamos seu nome de usuário, ID e avatar do Discord para identificar você em nossos sistemas, gerenciar sua conta e personalizar sua experiência.",
			serverInfo:
				"Informações de Servidor: Coletamos dados sobre os servidores Discord onde você utiliza o bot Connections, como nome do servidor e ID do servidor.",
			messages:
				"Mensagens Enviadas ao Bot: Armazenamos apenas o ID da mensagem e o ID do canal quando uma mensagem é enviada em alguma conexão.",
			activities:
				"Atividades e Interações: Registramos suas atividades e interações com o bot para oferecer uma experiência personalizada e melhorada.",
			noSensitiveData:
				"Não solicitamos quaisquer dados que possam prejudicar a experiência de quem utiliza os nossos serviços.",
			dataSecurity:
				"Estamos comprometidos com a segurança dos dados e implementamos medidas apropriadas para proteger suas informações contra acesso não autorizado, alteração, divulgação ou destruição. O Connections não se responsabiliza por qualquer dano direto, indireto, incidental, especial ou consequente resultante do uso ou da incapacidade de usar nossos serviços. Os usuários têm o direito de acessar, corrigir ou excluir suas informações pessoais a qualquer momento. Para exercer esses direitos, entre em contato conosco via e-mail (connectionsteamoficial@gmail.com) e tentaremos responder o mais rápido possível.",
			changes:
				"Alterações podem ser feitas em nossos Termos e Políticas a qualquer momento. Deixaremos você ciente quando essas mudanças ocorrerem. Ao utilizar nossos serviços, você consente com a coleta e uso de suas informações conforme descrito nesta Política de Privacidade. Este Termo de Serviço será regido e interpretado de acordo com as leis vigentes do país em que operamos.",
			contact:
				"Se você tiver alguma dúvida sobre a nossa Política de Privacidade, entre em contato conosco via e-mail (connectionsteamoficial@gmail.com) e tentaremos responder o mais rápido possível.",
		},
		notifications: {
			promotedCode: "Código Promoted",
			title: "Notificações",
			description:
				"Aqui ficarão suas notificações recebidas de backups, convites de time, respostas etc",
			filter: "Filtrar notificações",
			noNotifications: "Você não tem nenhuma notificação",
			skeleton: "Nenhuma notificação encontrada",
			seeMessage: "Ver mensagem",
			team: "Time do Connections",
			readAll: "Marcar tudo como lido",
			accept: "Aceitar",
			decline: "Recusar",
			inviteError: "Não foi possível aceitar o convite",
			goToBackup: "Ir para o backup",
		},
		promote: {
			gift: {
				title: "Presentear Promoted",
				inputs: {
					id: "ID do usuário",
					code: "Código do Promoted",
					button: "Enviar Presente",
					idplaceholder: "Digite o ID do usuário que deseja presentear",
					codeplaceholder: "Digite aqui o código que será enviado",
				},
				codeInvited: "Código enviado com sucesso!",
			},
			modal: {
				promoted: "Conexão Promovida!",
				success:
					"Sua conexão foi promovida com sucesso, veja os beneficios abaixo",
			},
			title: "Connections",
			description: "Eleve sua conexão ao topo!",
			benefits: "Benefícios",
			buy: {
				title: "Comprar",
				description: "Promova sua conexão por apenas",
				price: "R$ 4.99",
				button: "Comprar",
				gift: "Presentear",
				successMessage: "Sua conexão foi promovida com sucesso!",
			},
			auditLog: {
				title: "Registro De Auditoria",
				description: "Acompanhe todas as alterações feitas na sua conexão.",
				logEntry: {
					updatedIcon: " alterou o ícone para ",
				},
			},
			metrics: {
				title: "Métricas",
				description: "Visualize métricas detalhadas da sua conexão.",
				access: {
					title: "Acessos",
					recentAccesses: "+ acessos nos últimos 7 dias",
				},
				connections: {
					title: "Servidores Conectados",
					recentConnections: "+ conexões nos últimos 7 dias",
				},
			},
			priorityConnection: {
				placeholder: "Sua Conexão",
				title: "Conexão Prioritária",
				description:
					"Sua conexão sempre ficará no topo da lista de conexões, independentemente da quantidade de votos.",
				button: "Promovida",
			},
			cooldownReduction: {
				title: "Redução De Cooldown",
				description:
					"Reduza o tempo de cooldown para votar na sua conexão de 12 horas para 8 horas.",
				before: "12 Horas",
				after: "8 Horas",
				button: "Votar",
			},
			expiration:
				"Após fazer a compra, o plano será removido após 14 dias. Cancele quando quiser.",
		},
		subscriptions: {
			title: "Inscrições",
			description: "Aqui ficarão suas inscrições, como Promoted e Premium",
			youhave: "Você possui",
			promoted: {
				connection: "conexão promovida",
				connections: "conexões promovidas",
				search: "Procurar por alguma conexão",
				nopromoted: "Você não tem nenhuma conexão promovida",
				nosearch: "Nenhuma conexão encontrada",
			},
			plans: {
				title: "Planos",
				description: "Nós temos planos que encaixam no seu bolso",
			},
			premium: {
				connection: "servidor com Premium",
				connections: "servidores com Premium",
				search: "Procurar por um servidor",
				nopremium: "Você não possui nenhum servidor com Premium",
				nosearch: "Nenhum servidor encontrado",
			},
		},
		limits: {
			mods: "Você chegou no limite de moderadores de 10/10",
			modsText: "Parece que você chegou no seu limite de moderadores...",
			connections: "Você chegou no limite de conexões",
			connectionsText: "Parece que você chegou no seu limite de conexões...",
		},
		errors: {
			rules: "Verifique se as regras são menos de 700 caracteres e mais de 25",
			maxCharsPerMessage: "O número máximo de caracteres por mensagens permitidos é de 3 a 900",
			teamMaxConnections: "Limite de conexões por time atingido (5/5)",
			alreadyExists: "Já existe uma conexão com este nome",
			alreadyInvited: "Este usuário já foi convidado para este time",
			invalidUserID: "ID de usuário inválido",
			needChannel: "Você precisa escolher um canal para conectar",
			wrongTeamName: "Certifique-se que o nome da equipe é maior que 3 caracteres e menor que 20",
			chooseAnChannel: "Escolha um canal para conectar",
			wrongIcon: "O ícone não é válido, verifique se ele termina com .png ou .jpg, e se pertence ao Pinterest ou Imgur",
			wrongDesc: "Certifique-se que sua descrição seja maior que 20 caracteres e menor que 50",
			generic: "Algo deu errado, tente novamente mais tarde ou entre em contato conosco",
			invalidCode: "Código inválido",
			wrongGift: "ID de usuário ou código inválido",
			wrongConName: "Certifique-se do nome da conexão precisa de mais que 1 caractere",
			alreadyConnection: "Já existe uma conexão com este nome",
			maxConnections: "Você precisa colocar um número maior que 2, e menor que 100 no máximo de conexões",
			unknownConnection: "Conexão desconhecida",
			invalidConnectionName: "Nome da conexão inválido, não use caracteres especiais ou espaços",
		}
	},
	"en-US": {
		home: {
			file: "Cool File",
			header: {
				documentation: "Documentation",
				support: "Support",
				menu: {
					exit: "Exit",
					dashboard: "Dashboard",
					subscriptions: "Subscriptions",
				},
			},
			footer: {
				poweredBy: "Hosted in",
				links: {
					title: "Useful links",
					addConnections: "Add Connections",
					panel: "Panel",
					connections: "Connections",
				},
				legal: {
					title: "Legal",
					terms: "Terms of Use",
					policy: "Privacy Policy",
				},
				title: "Customize the way you talk, be better.",
			},
			description:
				"Connections is a bot designed to facilitate connections between servers, enhancing engagement and dynamism in your server.",
			embeds: {
				fromSpyei: "from Spyei's Server",
				fromUnreal: "from Unreal's Server",
				hour: "Today at ",
			},
			addConnections: "Invite Connections",
			conversation: {
				spyei: {
					message: "What's up bro?",
					server: "Spyei's Guild",
				},
				unreal: {
					message: "I'm fine!",
					server: "Unreal's Guild",
					typing: " is typing",
				},
				connectedChannel: "connected-channel",
			},
			custom: {
				title: "Fully customizable",
				description:
					"Connections is a fully customizable bot, where 99.9% of the resources can be adjusted according to your preferences, allowing you to configure it exactly the way you want.",
				moreOptions: "And much more options!",
			},
			addConnectionsEmbed: {
				title: "Add Connections",
				description:
					"A modern and exclusive bot for connecting your server and making it more active",
			},
		},
		dashboard: {
			joinPrivateConnection: {
				title: "Join a private connection",
				description:
					"You can join a private connection by using the code below",
				button: "Join",
				modal: {
					title: "Join a private connection",
				},
			},
			guilds: {
				noGuilds: "You don't have servers",
				noGuildsDescription: "You can add the connections to your servers by clicking on the button",
				noGuildsFound: "No servers found",
				title: "Servers",
				description: "Select the server you want to manage",
				addServer: "Add server",
				info: {
					metadata: {
						title: "Max Chars Per Message",
						description: "Define below the maximum number of characters that will appear in the messages received from your server"
					},
					logs: {
						reportMessage: "Report Logs are essential for reports, are you sure you want to disable it?",
						logsbuttons: {
							anyLog: {
								title: "Any Log",
								description: "All types of logs will be sent"
							},
							bansLog: {
								title: "Ban Logs",
								description: "All bans made in connections"
							},
							connectionsLog: {
								title: "Connection Logs",
								description: "All logs of each connection connected to the server"
							},
							locksLog: {
								title: "Lock Logs",
								description: "Logs when someone locks a channel of a connected connection"
							},
							notesLog: {
								title: "Note Logs",
								description: "Notes on the connection"
							},
							purgesLog: {
								title: "Purge Logs",
								description: "Bans and timeouts in connections"
							},
							reportsLog: {
								title: "Report Logs",
								description: "Message reports made by users"
							},
							timeoutsLog: {
								title: "Timeout Logs",
								description: "All timeouts made in connections"
							},
							messageDeleteLog: {
								title: "Deleted Message Logs",
								description: "All deleted messages"
							},
						},
						title: "Logs Channel",
						description: "Select the channel that will receive all the logs selected",
						button: "Click here and select a channel",
					},
					connections: {
						title: "Connected Connections Logs",
						description: "Select below which logs you want to have in the log channel",
					},
					prefix: "Prefix",
					prefixdescription:
						"Type below the prefix you want to use to run the Connections commands",
					save: "Save",
					title: "Informations",
					description: "Here will be the informations of the guild",
					premiumexpires: "Expires on {date}",
				},
				guild: {
					title: "Server",
					connections: "Connections",
				},
				tabs: {
					connections: "Connections",
					guilds: "Guilds",
					channels: "Channels",
					infos: "Informations",
					cases: "Cases",
				},
				connections: {
					infos: {
						back: "Back",
						title: "Edit connection",
						informations: "Informations",
						flags: "Flags",
						blockedWords: "Blocked words",
						channel: "Channel",
						configure: "Configure",
						none: "None",
					},
					disconnect: {
						title: "Disconnect connection",
						disconnect: "Disconnect",
						disconnectConfirm:
							"Are you sure you want to disconnect from your server the connection",
					},
					blockedWords: {
						title: "Blocked words",
						description:
							"Type below words that you want to block, separated by commas (spam, scam, etc)",
						type: "Type here some word.",
						save: "Save",
					},
					flags: {
						title: "Flags",
						description:
							"Select below which flags you want to enable for the connection, or disable any that you want.",
						locked: "Locked Connection",
						lockedDescription:
							"Connection locked by moderators, the connection cannot receive or send messages",
						frozen: "Frozen Connection",
						frozenDescription:
							"Connection frozen by moderators, THE CONNECTION CANNOT BE EDITED NOW",
						allowFiles: "Allow Files",
						allowFilesDescription: "Allow file uploads",
						allowInvites: "Allow Invites",
						allowInvitesDescription: "Allow invites from other servers",
						allowLinks: "Allow Links",
						allowLinksDescription: "Allow links in sent messages",
						noIndentification: "No Indentification",
						noIndentificationDescription: "Don't identify server name",
						allowOrigin: "Allow Origin",
						allowOriginDescription:
							"Allow to appear server information in sent messages, like name and id",
						allowEmojis: "Allow Emojis",
						allowEmojisDescription: "Allow only emojis from discord",
						compactModeEnabled: "Compact Mode",
						compactModeEnabledDescription: "More compact message to be sent",
						autoTranslate: "Auto Translate",
						autoTranslateDescription:
							"Translate automatically received messages",
					},
					channel: "Connection channel",
					selectchannel: "Click here and select a channel",
					connectionName: "Connection name",
					connectionPlaceholder: "coolconnection",
					connecting: "Connecting...",
					connect: "Connect",
					language: "Language desired",
					searchForLanguage: "Search for a language",
					languageTitle: "Language",
					languageclick: "Click here to select the language",
					hashLabel: "Hash code",
					hashPlaceholder: "Enter the hash code",
					public: "Public",
					private: "Private",
				},
				mods: {
					notfoundlabel:
						"Didn't find the member you were looking for? Add it by ID",
					notfoundplaceholder: "Type user ID",
					placeholder: "Type user name or ID",
					title: "Trusted Admins",
					addModerator: "Add Moderator",
					moderator: "Moderator",
					delete: "Delete moderator",
					deleteConfirm: "Are you sure you want to delete the moderator",
					deletetext: "Delete",
					label: "Search for a user",
					description:
						"Here will be the users that can manage the connections of this guild",
				},
				threads: {
					thread: {
						title: "Thread",
						originId: "Origin id",
						creatorId: "Creator id",
						channels: "Thread channels",
						created: "Created at",
						delete: "Delete thread",
						deleteConfirm: "Are you sure you want to delete the thread",
						deletetext: "Delete",
						noThreads: "No threads",
						noThreadsDescription:
							"There aren't any threads in this guild, try creating a new one!",
					},
					description:
						"Here will be displayed threads that you can manage",
				},
				cases: {
					noCases: "It seems there are no cases registered.",
					nocasesbruh:
						"Try punishing some goofies from your server using Connections",
					case: "Case",
					was: "was",
					title: "Guild cases",
					description:
						"Here will be the history of cases that occurred in your guild, like bans and timeouts.",
					ban: "banned",
					mute: "muted",
					by: "by",
					reason: "Reason",
					filters: {
						guildban: "Guild Ban",
						type: "Type",
						user: "User",
						moderator: "Moderator",
						ambos: "Any",
						selectModerator: "Click here and select a moderator",
						selectConnection: "Click here and select a connection",
						userID: "User ID to filter",
					},
				},
				channels: {
					title: "Edit locked channels",
					description:
						"Click on the crosses to lock and unlock the channel of each connected connection in your server",
				},
				modifications: {
					changes: "You have changes to be saved",
					reset: "Reset",
				},
			},
			connections: {
				noConnections: "You don't have connections",
				noConnectionsDescription: "You can create connections by clicking on the button",
				noConnectionsFound: "No connections found",
				activatePromoted: "Activate Promoted",
				title: "Connections",
				description: "Select the connection you want to manage",
				addConnection: "Add connection",
				createConnection: "Create connection",
				createConnectionLoading: "Creating connection...",
				connectToConnection: "Connect to a connection",
				connection: {
					title: "Connection",
					typetag: "Type here some tags separated by a space (tag1 tag2 ...)",
					icon: "Connection icon",
					private: "Private connection",
					privateDescription:
						"When enabled, the connection will not appear in the public connection list and will only be accessible to people with the invite link below.",
					form: {
						name: "Name",
						description: "Description",
						icon: "Icon",
						maxConnections: "Max connections",
						createConnection: "Create connection",
						placeholders: {
							name: "coolconnection",
							description: "This connection is super awesome!",
						},
					},
				},
				promotedRecurse: "Promoted Feature",
				metrics: {
					days: {
						seven: "7 Days Ago",
						fourteen: "14 Days Ago",
						month: "30 Days Ago",
						older: "More than 30 days ago",
					},
					graphic: "Detailed Graphic",
					feedbacks: {
						commingSoon: "Coming soon...",
					},
					title: "Metrics",
					description:
						"Here you can see the metrics of your connection, exclusive for promoted connections",
					servers: {
						title: "Servers",
						noServers: "Your connection is not connected to any server",
						servers: "Your connections is connected to ",
						serv: "Server",
						connections: "Servers connected in the last 7 days",
					},
					visualizations: {
						noViews: "Your connection has no views",
						title: "Views",
						visu: "View",
						has: "Your connection has",
						total: "in the total",
						lastseven: "in the last 7 days",
					},
				},
				auditLog: {
					titles: "Team Connections Audit Logs",
					descriptions: "Track all changes made to your team connections (only promoted connections)",
					noPromoted: "This team doesn't have any promoted connections",
					title: "Audit Log",
					description: "Track all changes made to your connection",
					logEntry: {
						updateIcon: " changed the icon from ",
						for: " to ",
						none: "none",
						updateDescription: " changed the description from ",
						updatedTags: " changed the tags from ",
						addedTeam: " added the connection to the team ",
						removedTeam: " removed the connection from the team ",
						privatedConnection: " made the connection private",
					},
				},
				delete: {
					title: "Delete connection",
					description: "Are you sure you want to delete the connection",
					button: "Delete",
					descriptionpage:
						"When you delete your connection, you will lose all the data associated with it, including messages and guilds that were connected to your connection and other data.",
				},
				settings: {
					subscriptions: "Subscriptions",
					promoted:
						"You can see your subscriptions by clicking the button below",
					title: "Configure Connection",
					description: "Here you can configure your connection",
				},
				edit: {
					rules: {
						preview: "Live Preview",
						title: "Rules",
						description: "Type below the rules that will appear after a user connects to your connection (Discord Markdown allowed!!)",
					},
					title: "Edit connection",
					description: "Here you can edit your connection",
					condescription: "Description",
					condescriptionPlaceholder: "Connection description",
					icon: "Icon",
					iconPlaceholder: "Connection's icon",
					placeholders: {
						name: "Name",
						description: "Description",
						icon: "Icon",
						maxConnections: "Max connections",
					},
				},
			},
			misc: {
				cancel: "Cancel",
				filterConnections: "Filter connections",
				filterGuilds: "Filter guilds",
				filterTeams: "Filter teams",
			},
			teams: {
				tabs: {
					members: "Members",
					connections: "Connections",
					settings: "Settings",
					auditLog: "Audit Log",
				},
				title: "Teams",
				description: "Select the team you want to manage",
				createTeam: "Create team",
				createTeamLoading: "Creating team...",
				noTeams: "You don't have teams",
				noTeamsDescription: "You can create teams by clicking on the button",
				noTeamsFound: "No teams found",
				settings: {
					delete: {
						title: "Delete team",
						description: "Are you sure you want to delete the team",
						descriptionpage:
							"When you delete your team, you will lose all the data associated with it, including messages and guilds that were connected to your team and other data.",
					},
					transfer: {
						title: "Transfer team owner",
						description:
							"After transferring the team owner to another user, all connections in the team will be removed, and the owner will be a member of the team",
						noMembers: "Your team doesn't have members",
						noMembersFound: "No members found",
						transferOwner:
							"Do you really want to transfer the team owner to the member {member}?",
						button: "Transfer Owner",
						placeholder: "Type here the member name or ID",
					},
				},
				team: {
					form: {
						name: "Name",
						icon: "Icon",
						placeholder: "Type here the team name",
					},
				},
				members: {
					title: "Members",
					description:
						"Here will be the members of your team, all members can add and remove connections from the team",
					filterMembers: "Filter members",
					placeholder: "Type here a username or ID",
					noMembers: "This team doesn't have members",
					noMembersDescription: "You can add members by clicking on the button",
					noMembersFound: "No members found",
					manageMember: "Manage Member",
					delete: {
						title: "Remove Member",
						description: "Are you sure you want to remove the member",
						remove: "Remove",
					},
					modal: {
						title: "Manage Member",
						description: "What do you want to do with the member",
						choose: "Choose one of the options below",
						kick: "Kick",
						transfer: "Transfer Owner",
					},
					invite: {
						success:
							"The member was invited successfully, to accept the invite, go to the notifications, search for the team, and accept the invite",
						title: "Invite Member",
						alreadyMember: "The member is already a member of this team",
						placeholder: "Type here the ID of the member you want to invite",
						memberId: "Member ID",
						sendInvite: "Send Invite",
						maxMembers: "This team has reached the maximum of 3 members",
					},
				},
				connections: {
					title: "Connections",
					description:
						"Here will be the connections that are related to your team, in the connection tab, your team will appear as the owner of the connection",
					placeholder: "Type here the name or description of the connection",
					filterConnections: "Filter connections",
					noConnections: "It seems that there are no connections",
					noConnectionsDescription:
						"You can create connections by clicking on the button",
					noConnectionsFound: "No connections found",
					modal: {
						description: "Select below the connection you want to add",
						title: "Add connection",
						label: "Connection name",
						placeholder: "Type here the name of the connection",
						add: "Add",
					},
				},
				delete: {
					title: "Delete team",
					description: "Are you sure you want to delete the team",
					descriptionpage:
						"When you delete your team, you will lose all the data associated with it, including messages and guilds that were connected to your team and other data",
				},
			},
		},
		plans: {
			poppromoted: {
				title: "How to buy Promoted?",
				fristimageDescription: "To buy Promoted, go to our",
				firstimageDescriptiontwo:
					" and go to the channel # promoted, and there will be a message from the Zennify bot, just click on buy and pay",
				secondImageDescription:
					"After paying the Zennify, you will receive an activation code for promoted, to activate the code, just go to your connection page, and click on the 'Activate Promoted' button, as shown below.",
			},
			seehow: "Veja como",
			buypopUp: {
				title: "How to buy premium?",
				warning: "NOW we only accept payments in BRL (R$).",
				fristimageDescription: "To buy premium, go to our",
				firstimageDescriptiontwo:
					" and go to the channel # premium and there will be two messages from the Zennify bot, choose the plan you want and make the purchase of premium.",
				discordServer: "discord server",
				secondImageDescription:
					"After paying the Zennify, you will receive an activation code for premium, to activate the code, just go to your server page, and click on the 'Activate premium' button, as shown below.",
				understand: "Understood!",
			},
			pageDescription: "Access the best level of Connections. Use premium.",
			basicpremium: {
				features: [
					"+ 5 Threads",
					"+ 10 Moderators limit",
					"+ 25 Connected connections",
					"Cooldown of messages reduced",
					"Freeze messages",
					"Moderation system improved",
					"And much more!",
				],
			},
			premium: {
				features: [
					"+ 15 Threads",
					"+ 10 Moderators limit",
					"+ 50 Connected connections",
					"Cooldown of messages reduced",
					"Freeze messages",
					"Moderation system improved",
					"Own bot and customizable!",
					"Max 5 servers in the bot",
					"And much more!",
				],
			},
			popUp: {
				title: "Buy Premium",
				code: "Activation code",
				placeholder: "Type here the activation code",
				activate: "Activate Premium",
				premiumActivate: "Premium activation",
				success: "Was activated on your server successfully!",
				advantages: "Advantages obtained",
			},
			promoted:
				"Promote your connection favorite, and make it gain more prominence among the others. See connection audit log, advanced metrics and much more.",
			buy: "Buy",
			month: "month",
			seeplans: "See plans",
			description:
				"Get advanced features, smaller cooldown and improved moderation with the Basic Premium. The Premium offers everything plus a customizable bot and support for up to 5 servers.",
		},
		login: {
			title: "Login",
			description: "Login to unlock the dashboard and much more!",
			discord: "Login with discord",
		},
		connection: {
			team: "Team:",
			wantPromoted: "Want your connection on top?",
			wantpromotedDescription:
				"Join the Promoted by clicking the button below!",
			promote: "Promote Connection",
			joinPrivateConnection: "Join a private connection",
			title: "Connections",
			recommended: "Recommended connections",
			description: "Discover new connections!",
			vote: "Vote",
			voted: "Voted",
			hour: "hour",
			hours: "hours",
			return: "Return in {hours} {hour}",
			returntwelve: "Return in 12 {hour}",
			voting: "Voting...",
			creator: "Creator:",
			connect: "Connect",
			connectionServer: "Connection guild",
			connectionServerPlaceholder: "Select a guild",
			promoted: "Promoted",
			search: "Search for a connection",
			tags: ["Gamer", "Chat", "Community", "Varied", "Minecraft"],
			noConnections: "Ops... It seems that we don't have any connections",
			filters: {
				save: "Save",
				title: "Filters",
				sort: "Sort by",
				tag: "Tag",
				query: "Search for",
				votes: "Top",
				creationDate: "New",
				typehere: "Type here",
				reset: "Reset filters",
			},
		},
		tos: {
			title: "Terms of Service",
			intro1:
				"By accessing and using the Connections website and the Connections Bot, you agree to the following terms and conditions.",
			intro2:
				"These terms are designed to ensure that both the website and the bot are used appropriately and in accordance with applicable laws.",
			intro3:
				"Your access and use of our services are subject to these guidelines, which aim to protect both the integrity of our services and the safety and rights of our users. By using the website or the bot, you acknowledge and accept all the conditions described below. It is your responsibility to read and understand these rules, and you agree to comply with all the provisions set forth herein.",
			prohibited: {
				title: "Prohibited Actions:",
				item1: "Mining or collecting data without authorization.",
				item2:
					"Using tools or techniques that compromise the integrity or security of the website or the bot.",
				item3:
					"Removing, copying, or reproducing copyrighted content from the website or the bot.",
				item4:
					"Framing or unauthorized reproduction of any part of the website or the bot.",
				item5:
					"Using User Content without our permission and the permission of the respective users.",
				item6:
					"Using the website or the bot maliciously, including attempts to compromise its functionality or security.",
				item7:
					"Violating copyright related to the website and the bot, including unauthorized use of logos, emotes, and other materials.",
				item8:
					"Attempting to imitate or copy services and features offered by Connections.",
			},
			discordRules: {
				title:
					"To ensure proper and secure operation of the Connections Bot in your Discord servers, please observe the following rules:",
				item1:
					"Exploitation Prohibition: It is forbidden to attempt to exploit the Connections Bot for unfair advantages or to harm other users. This includes any attempt to manipulate or modify the bot without authorization.",
				item2:
					"Compliance with Discord Terms: The use of the Connections Bot must fully comply with Discord's Terms of Service. Any violation of these terms will also be considered a breach of our policies.",
				item3:
					"Connections Policies: All uses of the Connections Bot must adhere to the policies and guidelines set forth on the Connections website. Any infraction may result in corrective actions.",
			},
			limitations: {
				title:
					"While we strive to provide a high-quality service, the Connections website and Bot are subject to certain limitations:",
				item1:
					"Warranties: We do not guarantee that the website or the bot will be free from errors, bugs, or failures. Continuous availability and operation of the services are not guaranteed.",
				item2:
					"Conditions and Responsibilities: We do not offer specific warranties beyond those expressly stated in these Terms of Service. Use of the website and the bot is at your own risk.",
				item3:
					"Copyright: We are committed to promptly removing or revoking any content that infringes on copyrights. Our goal is to respect the work of others and promptly correct any violations.",
			},
		},
		policy: {
			title: "Privacy Policy",
			intro:
				"At Connections, we are fully responsible for and take great care of all the personal information of users that is legally collected. We have no intention of harming anyone who uses our services. All requested information is from Discord itself, as we rely on it. We do not share or sell the collected personal data and information. We do not request external or sensitive information that may harm the user's experience.",
			dataCollection:
				"All the data we request is necessary for the application's operation. All the data we collect is listed below:",
			username:
				"Username, ID, and Discord Avatar: We collect your username, ID, and Discord avatar to identify you in our systems, manage your account, and personalize your experience.",
			serverInfo:
				"Server Information: We collect data about the Discord servers where you use the Connections bot, such as server name and server ID.",
			messages:
				"Messages Sent to the Bot: We only store the message ID and channel ID when a message is sent in any connection.",
			activities:
				"Activities and Interactions: We record your activities and interactions with the bot to provide a personalized and improved experience.",
			noSensitiveData:
				"We do not request any data that may harm the experience of those who use our services.",
			dataSecurity:
				"We are committed to data security and have implemented appropriate measures to protect your information from unauthorized access, alteration, disclosure, or destruction. Connections is not responsible for any direct, indirect, incidental, special, or consequential damage resulting from the use or inability to use our services. Users have the right to access, correct, or delete their personal information at any time. To exercise these rights, contact us via email (connectionsteamoficial@gmail.com), and we will try to respond as quickly as possible.",
			changes:
				"Changes can be made to our Terms and Policies at any time. We will notify you when these changes occur. By using our services, you consent to the collection and use of your information as described in this Privacy Policy. These Terms of Service will be governed and interpreted in accordance with the laws of the country in which we operate.",
			contact:
				"If you have any questions about our Privacy Policy, contact us via email (connectionsteamoficial@gmail.com), and we will try to respond as quickly as possible.",
		},
		notifications: {
			promotedCode: "Promoted Code",
			title: "Notifications",
			description:
				"Here will be the notifications you received from backups, team invites, responses, etc",
			filter: "Filter notifications",
			noNotifications: "You don't have any notifications",
			skeleton: "No notifications found",
			seeMessage: "Go to message",
			team: "Connections team",
			readAll: "Mark all as read",
			accept: "Aceitar",
			decline: "Recusar",
			inviteError: "Não foi possível aceitar o convite",
			goToBackup: "Go to backup",
		},
		promote: {
			gift: {
				title: "Gift Promoted",
				inputs: {
					id: "User ID",
					code: "Promoted Code",
					button: "Send Gift",
					idplaceholder: "Type here the user ID you want to gift",
					codeplaceholder: "Type here the code that will be sent",
				},
				codeInvited: "Code sent successfully!",
			},
			modal: {
				promoted: "Connection Promoted!",
				success:
					"Your connection was promoted successfully, see the benefits below",
			},
			title: "Connections",
			description: "Take your connection to the top!",
			benefits: "Benefits",
			buy: {
				title: "Buy",
				description: "Promote your connection for only",
				price: "R$ 4.99",
				button: "Buy",
				gift: "Gift",
				successMessage: "Your connection was promoted successfully!",
			},
			auditLog: {
				title: "Audit Log",
				description: "Track all changes made to your connection.",
				logEntry: {
					updatedIcon: " changed the icon to ",
				},
			},
			metrics: {
				title: "Metrics",
				description: "View detailed metrics of your connection.",
				access: {
					title: "Accesses",
					recentAccesses: " accesses in the last 7 days",
				},
				connections: {
					title: "Connected Servers",
					recentConnections: " connections in the last 7 days",
				},
			},
			priorityConnection: {
				placeholder: "Your Connnection",
				title: "Priority Connection",
				description:
					"Your connection will always be at the top of the connection list, regardless of the number of votes.",
				button: "Promoted",
			},
			cooldownReduction: {
				title: "Cooldown Reduction",
				description:
					"Reduce the cooldown time to vote on your connection from 12 hours to 8 hours.",
				before: "12 Hours",
				after: "8 Hours",
				button: "Vote",
			},
			expiration:
				"After making the purchase, the plan will be removed after 14 days. Cancel when you want.",
		},
		subscriptions: {
			title: "Subscriptions",
			description: "Here will be your subscriptions, like Promoted and Premium",
			youhave: "You have",
			promoted: {
				connection: "promoted connection",
				connections: "promoted connections",
				search: "Search for a connection",
				nopromoted: "You don't have any promoted connection",
				nosearch: "No connection found",
			},
			plans: {
				title: "Plans",
				description: "We have plans that fit your budget",
			},
			premium: {
				connection: "server with Premium",
				connections: "servers with Premium",
				search: "Search for a server",
				nopremium: "You don't have any server with Premium",
				nosearch: "No server found",
			},
		},
		limits: {
			mods: "You reached the limit of moderators of 10/10",
			modsText: "It seems that you reached your limit of moderators...",
			connections: "You reached the limit of connections",
			connectionsText: "It seems that you reached your limit of connections...",
		},
		errors: {
			rules: "Check if the rules are less than 700 characters and more than 25",
			maxCharsPerMessage: "The maximum number of characters per message allowed is 3 to 900",
			teamMaxConnections: "Team maximum connections reached (5/5)",
			alreadyExists: "There is already a connection with this name",
			needChannel: "You need to choose a channel to connect",
			wrongTeamName: "Check if the team name is longer than 3 characters and shorter than 20",
			chooseAnChannel: "Choose a channel to connect",
			generic: "Something went wrong, try again later, or contact us",
			wrongIcon: "The icon is not valid, check if it ends with .png or .jpg, and if it belongs to Pinterest or Imgur",
			wrongDesc: "Make sure your description is longer than 20 characters and shorter than 50",
			invalidCode: "Invalid code",
			wrongGift: "Invalid user ID or code",
			wrongConDesc: "Make sure the connection name is at least 16 characters",
			wrongConName: "Make sure the team name is at least 1 character",
			alreadyConnection: "There is already a connection with this name",
			maxConnections: "You need to put a number greater than 2, and less than 100 in the maximum of connections",
			unknownConnection: "Unknown connection",
			invalidUserID: "Invalid user ID",
			alreadyInvited: "This user is already invited to this team",
			invalidConnectionName: "Invalid connection name, do not use special characters or spaces",
		}
	}
};
