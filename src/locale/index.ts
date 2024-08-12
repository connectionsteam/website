export const languages = {
    "pt-BR": {
        home: {
            header: {
                documentation: "Documentação",
                support: "Suporte",
                menu: {
                    exit: "Sair",
                    dashboard: "Dashboard",
                }
            },
            footer: {
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
                title: "Inove a maneira de como você conversa",
            },
            description: "Connections é um bot criado para facilitar conexões entre servidores, promovendo engajamento e dinamismo.",
            embeds: {
                hour: "Hoje às 16:28",
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
                    typing: "Unreal está digitando",
                },
                connectedChannel: "canal-conectado",
            },
            custom: {
                title: "Totalmente customizavel",
                description: "Connections é um bot totalmente personalizável, onde 99.9% dos recursos podem ser ajustados conforme suas preferências, permitindo que você o configure exatamente do seu jeito.",
                moreOptions: "E muito mais opções!",
            },
            addConnectionsEmbed: {
                title: "Adicione o Connections",
                description: "Um bot moderno e exclusivo de conexões para engajar seu servidor e torná-lo mais ativo",
            }
        },
        dashboard: {
            joinPrivateConnection: {
                title: "Entrar em uma conexão privada",
                description: "Você pode entrar em uma conexão privada usando o código abaixo",
                button: "Entrar",
                modal: {
                    title: "Entrar em uma conexão privada",
                }
            },
            guilds: {
                title: "Servidores",
                description: "Selecione o servidor que deseja gerenciar",
                addServer: "Adicionar servidor",
                info: {
                    prefix: "Prefixo",
                    prefixdescription: "Digite abaixo o prefixo que deseja usar para executar os comandos do Connections",
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
                    cases: "Casos"
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
                        disconnectConfirm: "Você deseja mesmo desconectar de seu servidor a conexão",
                    },
                    blockedWords: {
                        title: "Palavras bloqueadas",
                        description: "Digite abaixo palavras que você deseja bloquear, separadas por vírgulas (supimpa, carambolas, etc)",
                        type: "Digite aqui alguma palavra.",
                        save: "Salvar",
                    },
                    flags: {
                        title: "Flags",
                        description: "Selecione abaixo quais flags você deseja ativar para a conexão, ou desabilite qualquer que desejar.",
                        locked: "Conexão Bloqueada",
                        lockedDescription: "Conexão bloqueada por moderadores, a conexão não pode receber e nem enviar mensagens",
                        frozen: "Conexão Congelada",
                        frozenDescription: "Conexão congelada por moderadores, A CONEXÃO NÃO PODE SER EDITADA NOVAMENTE",
                        allowFiles: "Permitir Arquivos",
                        allowFilesDescription: "Permitir envio de arquivos",
                        allowInvites: "Permitir Convites",
                        allowInvitesDescription: "Permitir convites de outros servidores",
                        allowLinks: "Permitir Links",
                        allowLinksDescription: "Permitir links nas mensagens enviadas",
                        noIndentification: "Não Identificar servidor",
                        noIndentificationDescription: "Não identificar nome do servidor",
                        allowOrigin: "Permitir Origem",
                        allowOriginDescription: "Permitir aparecer informações do servidor da mensagem enviada, como nome e id",
                        allowEmojis: "Permitir Emojis",
                        allowEmojisDescription: "Permitir somente emojis do discord",
                        compactModeEnabled: "Modo Compacto",
                        compactModeEnabledDescription: "Mensagem mais compacta a ser enviada",
                        autoTranslate: "Auto Traduzir",
                        autoTranslateDescription: "Traduzir automaticamente mensagens recebidas",
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
                    notfoundlabel: "Não encontrou o membro que queria? adicione-o pelo ID",
                    notfoundplaceholder: "Digite o ID do usuário",
                    placeholder: "Digite o nome do usuário ou ID",
                    title: "Moderadores",
                    addModerator: "Adicionar Moderador",
                    moderator: "Moderador",
                    delete: "Remover moderador",
                    deleteConfirm: "Você deseja mesmo remover o moderador",
                    deletetext: "Remover",
                    label: "Procure por um usuário",
                    description: "Aqui ficará os usuários que podem gerenciar as conexões deste servidor",
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
                        noThreadsDescription: "Não há threads nesse servidor, tente criar uma!"
                    },
                    description: "Aqui ficará as threads que você pode gerenciar neste servidor",
                },
                cases: {
                    noCases: "Parece que não há nenhum caso registrado.",
                    nocasesbruh: "Tente castigar os bananões do seu servidor utilizando o Connections",
                    case: "Caso",
                    was: "foi",
                    title: "Casos do servidor",
                    description: "Aqui ficará o histórico de casos que ocorreram em seu servidor, como banimentos e timeouts.",
                    ban: "banido",
                    mute: "mutado",
                    by: "por",
                    reason: "Motivo",
                    filters: {
                        guildban: "Banimento de servidor",
                        type: "Tipo",
                        user: "Usuário",
                        moderator: "Moderador",
                        ambos: "Ambos",
                        selectModerator: "Clique aqui e selecione um moderador",
                        selectConnection: "Clique aqui e selecione uma conexão",
                        userID: "ID do usuário que deseja filtrar",
                    }
                },
                channels: {
                    title: "Editar Canais bloqueados",
                    description: "Clique nos cadeados para bloquear e desbloquear o canal de cada conexão conectada em seu servidor",
                },
                modifications: {
                    changes: "Você tem alterações para serem salvas",
                    reset: "Redefinir alterações",
                }
            },
            connections: {
                title: "Conexões",
                description: "Selecione a conexão que deseja gerenciar",
                addConnection: "Adicionar conexão",
                createConnection: "Criar conexão",
                createConnectionLoading: "Criando conexão...",
                connectToConnection: "Conectar a uma conexão",
                connection: {
                    title: "Conexão",
                    typetag: "Digite abaixo algumas tags separadas por um espaço (tag1 tag2 ...)",
                    icon: "Icone da conexão",
                    private: "Conexão privada",
                    privateDescription: "Ao habilitar esta opção, a conexão não irá aparecer na lista de conexões públicas e será apenas conectável por pessoas com o link de convite abaixo.",
                    form: {
                        name: "Nome",
                        description: "Descrição",
                        icon: "Icone",
                        maxConnections: "Conexões máximas",
                        createConnection: "Criar conexão",
                        placeholders: {
                            name: "conexaolegal",
                            description: "Essa conexão é supimpa de bom!",
                        }
                    }
                },
                delete: {
                    title: "Deletar conexão",
                    description: "Você deseja mesmo deletar a conexão",
                    button: "Deletar",
                    descriptionpage: "Ao deletar sua conexão, você irá perder todos os dados associados a ela como mensagens e guildas que se conectaram na sua conexão e outros dados.",
                },
                edit: {
                    title: "Editar conexão",
                    description: "Editar conexão",
                    button: "Editar",
                    success: "Salvo com sucesso!",
                    saving: "Salvando...",
                    save: "Salvar",
                    redefine: "Redefinir",
                    placeholders: {
                        name: "Nome",
                        description: "Descrição",
                        icon: "Icone",
                        maxConnections: "Conexões máximas",
                    }
                }
            },
            misc: {
                cancel: "Cancelar",
                filterConnections: "Filtrar conexão",
                filterGuilds: "Filtrar servidor",
            }
        },
        plans: {
            buypopUp: {
                title: "Como comprar premium?",
                warning: "NO MOMENTO só estamos aceitando pagamentos SOMENTE em BRL (R$).",
                fristimageDescription: "Para adquirir premium, acesse nosso",
                firstimageDescriptiontwo: " e vá até o canal # premium e nele vai estar duas mensagens do bot Zennify, escolha qual plano você deseja e faça a compra do Premium.",
                discordServer: "servidor do Discord",
                secondImageDescription: "Após efetuar o pagamento pelo Zennify, você receberá um código de ativação do premium, para ativar o código, basta ir na página do seu servidor, e clicar no botão 'Ativar premium', como na imagem abaixo.",
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
                    "E muito mais!"
                ]
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
                    "E muito mais!"
                ]
            },
            popUp: {
                title: "Comprar Premium",
                code: "Código de ativação",
                placeholder: "Digite aqui o código de ativação",
                activate: "Ativar Premium",
                premiumActivate: "Ativação de Premium",
                success: "Foi ativado em seu servidor com sucesso!",
                advantages: "Vantagens obtidas"
            },
            buy: "Comprar",
            month: "mês",
            seeplans: "Ver planos",
            description: "Obtenha recursos avançados, menor cooldown e controle aprimorado com o Basic Premium. O Premium oferece tudo isso mais um bot customizável e suporte para até 5 servidores."
        },
        login: {
            title: "Login no Connections",
            description: "Faça login no connections e desbloqueie o uso da dashboard e muito mais!",
            discord: "Entrar com discord",
        },
        connection: {
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
            }
        },
        tos: {
            title: "Termos de serviço",
            intro1: "Ao acessar e utilizar o site Connections e o Bot Connections, você concorda com os seguintes termos e condições.",
            intro2: "Estes termos são projetados para assegurar que tanto o site quanto o bot sejam utilizados de maneira adequada e em conformidade com as leis aplicáveis.",
            intro3: "O seu acesso e uso de nossos serviços estão sujeitos a essas diretrizes, que visam proteger tanto a integridade dos nossos serviços quanto a segurança e os direitos dos nossos usuários. Ao utilizar o site ou o bot, você declara estar ciente de e aceitar todas as condições descritas a seguir. É sua responsabilidade ler e entender essas regras, e você concorda em cumprir todas as disposições estabelecidas aqui.",
            prohibited: {
                title: "É proibido:",
                item1: "Minerar ou coletar dados sem autorização.",
                item2: "Utilizar ferramentas ou técnicas que comprometam a integridade ou segurança do site ou do bot.",
                item3: "Remover, copiar ou reproduzir conteúdo protegido por direitos autorais do site ou do bot.",
                item4: "Emoldurar ou fazer reprodução não autorizada de qualquer parte do site ou do bot.",
                item5: "Utilizar o Conteúdo do Usuário sem nossa permissão e a permissão dos próprios usuários.",
                item6: "Usar o site ou o bot de maneira maliciosa, incluindo tentativas de comprometer seu funcionamento ou segurança.",
                item7: "Violação de direitos autorais relacionados ao site e ao bot, incluindo a utilização não autorizada de logotipos, emotes e outros materiais.",
                item8: "Tentar imitar ou copiar serviços e funcionalidades oferecidos pelo Connections."
            },
            discordRules: {
                title: "Para garantir um funcionamento adequado e seguro do Bot Connections em seus servidores Discord, observe as seguintes regras:",
                item1: "Proibição de Exploração: É proibido tentar explorar o Bot Connections para obter vantagens injustas ou prejudicar outros usuários. Isso inclui qualquer tentativa de manipulação ou modificação não autorizada do bot.",
                item2: "Conformidade com Termos do Discord: O uso do Bot Connections deve estar em total conformidade com os Termos de Serviço do Discord. Qualquer violação desses termos será considerada uma infração das nossas políticas também.",
                item3: "Políticas do Connections: Todos os usos do Bot Connections devem respeitar as políticas e diretrizes estabelecidas no site Connections. Qualquer infração pode resultar em ações corretivas."
            },
            limitations: {
                title: "Enquanto nos esforçamos para oferecer um serviço de alta qualidade, o site e o Bot Connections estão sujeitos a certas limitações:",
                item1: "Garantias: Não garantimos que o site ou o bot estejam livres de erros, bugs ou falhas. A disponibilidade contínua e a operação dos serviços não são garantidas.",
                item2: "Condições e Responsabilidades: Não oferecemos garantias específicas além das expressamente estabelecidas neste Termo de Serviço. O uso do site e do bot é por sua conta e risco.",
                item3: "Direitos Autorais: Comprometemo-nos a remover ou revogar imediatamente qualquer conteúdo que infrinja direitos autorais. Nosso objetivo é respeitar o trabalho de outros e corrigir prontamente quaisquer violações."
            }
        },
        policy: {
            title: "Política de Privacidade",
            intro: "Nós da equipe Connections temos total cuidado e responsabilidade com todas as informações pessoais dos usuários que são coletadas legalmente. Não temos qualquer intenção de prejudicar qualquer um que utilize nossos serviços. Todas as informações solicitadas são dados do próprio Discord, já que dependemos dele. Não compartilhamos nem vendemos os dados e informações pessoais coletadas. Não solicitamos informações externas ou dados sensíveis que possam prejudicar o uso do usuário.",
            dataCollection: "Todos os dados que solicitamos são os necessários para o funcionamento da aplicação. Todos os dados que coletamos estão citados abaixo:",
            username: "Nome de Usuário, ID e Avatar do Discord: Coletamos seu nome de usuário, ID e avatar do Discord para identificar você em nossos sistemas, gerenciar sua conta e personalizar sua experiência.",
            serverInfo: "Informações de Servidor: Coletamos dados sobre os servidores Discord onde você utiliza o bot Connections, como nome do servidor e ID do servidor.",
            messages: "Mensagens Enviadas ao Bot: Armazenamos apenas o ID da mensagem e o ID do canal quando uma mensagem é enviada em alguma conexão.",
            activities: "Atividades e Interações: Registramos suas atividades e interações com o bot para oferecer uma experiência personalizada e melhorada.",
            noSensitiveData: "Não solicitamos quaisquer dados que possam prejudicar a experiência de quem utiliza os nossos serviços.",
            dataSecurity: "Estamos comprometidos com a segurança dos dados e implementamos medidas apropriadas para proteger suas informações contra acesso não autorizado, alteração, divulgação ou destruição. O Connections não se responsabiliza por qualquer dano direto, indireto, incidental, especial ou consequente resultante do uso ou da incapacidade de usar nossos serviços. Os usuários têm o direito de acessar, corrigir ou excluir suas informações pessoais a qualquer momento. Para exercer esses direitos, entre em contato conosco via e-mail (connectionsteamoficial@gmail.com) e tentaremos responder o mais rápido possível.",
            changes: "Alterações podem ser feitas em nossos Termos e Políticas a qualquer momento. Deixaremos você ciente quando essas mudanças ocorrerem. Ao utilizar nossos serviços, você consente com a coleta e uso de suas informações conforme descrito nesta Política de Privacidade. Este Termo de Serviço será regido e interpretado de acordo com as leis vigentes do país em que operamos.",
            contact: "Se você tiver alguma dúvida sobre a nossa Política de Privacidade, entre em contato conosco via e-mail (connectionsteamoficial@gmail.com) e tentaremos responder o mais rápido possível."
        },
    },
    "en-US": {
        home: {
            header: {
                documentation: "Documentation",
                support: "Support",
                menu: {
                    exit: "Exit",
                    dashboard: "Dashboard",
                }
            },
            footer: {
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
                title: "Innovate the way you talk",
            },
            description: "Connections is a bot designed to facilitate connections between servers, enhancing engagement and dynamism in your server.",
            embeds: {
                hour: "Today at 4:28",
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
                    typing: "Unreal is typing",
                },
                connectedChannel: "connected-channel",
            },
            custom: {
                title: "Fully customizable",
                description: "Connections is a fully customizable bot, where 99.9% of the resources can be adjusted according to your preferences, allowing you to configure it exactly the way you want.",
                moreOptions: "And much more options!",
            },
            addConnectionsEmbed: {
                title: "Add Connections",
                description: "A modern and exclusive bot for connecting your server and making it more active",
            }
        },
        dashboard: {
            joinPrivateConnection: {
                title: "Join a private connection",
                description: "You can join a private connection by using the code below",
                button: "Join",
                modal: {
                    title: "Join a private connection",
                }
            },
            guilds: {
                title: "Servers",
                description: "Select the server you want to manage",
                addServer: "Add server",
                info: {
                    prefix: "Prefix",
                    prefixdescription: "Type below the prefix you want to use to run the Connections commands",
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
                    cases: "Cases"
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
                        disconnectConfirm: "Are you sure you want to disconnect from your server the connection",
                    },
                    blockedWords: {
                        title: "Blocked words",
                        description: "Type below words that you want to block, separated by commas (spam, scam, etc)",
                        type: "Type here some word.",
                        save: "Save",
                    },
                    flags: {
                        title: "Flags",
                        description: "Select below which flags you want to enable for the connection, or disable any that you want.",
                        locked: "Locked connection",
                        lockedDescription: "Connection locked by moderators, the connection cannot receive or send messages",
                        frozen: "Frozen connection",
                        frozenDescription: "Connection frozen by moderators, THE CONNECTION CANNOT BE EDITED NOW",
                        allowFiles: "Allow files",
                        allowFilesDescription: "Allow file uploads",
                        allowInvites: "Allow invites",
                        allowInvitesDescription: "Allow invites from other servers",
                        allowLinks: "Allow links",
                        allowLinksDescription: "Allow links in sent messages",
                        noIndentification: "No indentification",
                        noIndentificationDescription: "Don't identify server name",
                        allowOrigin: "Allow origin",
                        allowOriginDescription: "Allow to appear server information in sent messages, like name and id",
                        allowEmojis: "Allow emojis",
                        allowEmojisDescription: "Allow only emojis from discord",
                        compactModeEnabled: "Compact mode enabled",
                        compactModeEnabledDescription: "More compact message to be sent",
                        autoTranslate: "Auto Translate",
                        autoTranslateDescription: "Translate automatically received messages",
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
                    notfoundlabel: "Didn't find the member you were looking for? Add it by ID",
                    notfoundplaceholder: "Type user ID",
                    placeholder: "Type user name or ID",
                    title: "Trusted Admins",
                    addModerator: "Add Moderator",
                    moderator: "Moderator",
                    delete: "Delete moderator",
                    deleteConfirm: "Are you sure you want to delete the moderator",
                    deletetext: "Delete",
                    label: "Search for a user",
                    description: "Here will be the users that can manage the connections of this guild",
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
                        noThreadsDescription: "There are no threads in this guild, try to create one!",
                    },
                    description: "Here will be the threads that you can manage in this guild",
                },
                cases: {
                    noCases: "It seems that there are no cases registered.",
                    nocasesbruh: "Try punishing some goofies from your server using Connections",
                    case: "Case",
                    was: "was",
                    title: "Guild cases",
                    description: "Here will be the history of cases that occurred in your guild, like bans and timeouts.",
                    ban: "banned",
                    mute: "muted",
                    by: "by",
                    reason: "Reason",
                    filters: {
                        guildban: "Guild Ban",
                        type: "Type",
                        user: "User",
                        moderator: "Moderator",
                        ambos: "Both",
                        selectModerator: "Click here and select a moderator",
                        selectConnection: "Click here and select a connection",
                        userID: "User ID to filter",
                    }
                },
                channels: {
                    title: "Edit locked channels",
                    description: "Click on the crosses to lock and unlock the channel of each connected connection in your server",
                },
                modifications: {
                    changes: "You have changes to be saved",
                    reset: "Reset changes",
                }
            },
            connections: {
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
                    privateDescription: "When enabled, the connection will not appear in the public connection list and will only be accessible to people with the invite link below.",
                    form: {
                        name: "Name",
                        description: "Description",
                        icon: "Icon",
                        maxConnections: "Max connections",
                        createConnection: "Create connection",
                        placeholders: {
                            name: "coolconnection",
                            description: "This connection is super awesome!",
                        }
                    }
                },
                delete: {
                    title: "Delete connection",
                    description: "Are you sure you want to delete the connection",
                    button: "Delete",
                    descriptionpage: "When you delete your connection, you will lose all the data associated with it, including messages and guilds that were connected to your connection and other data.",
                },
                edit: {
                    title: "Edit connection",
                    description: "Edit connection",
                    button: "Edit",
                    success: "Saved successfully!",
                    saving: "Saving...",
                    save: "Save",
                    redefine: "Redefine",
                    placeholders: {
                        name: "Name",
                        description: "Description",
                        icon: "Icon",
                        maxConnections: "Max connections",
                    }
                }
            },
            misc: {
                cancel: "Cancel",
                filterConnections: "Filter connection",
                filterGuilds: "Filter guild",
            },
        },
        plans: {
            buypopUp: {
                title: "How to buy premium?",
                warning: "NOW we only accept payments in BRL (R$).",
                fristimageDescription: "To buy premium, go to our",
                firstimageDescriptiontwo: " and go to the channel # premium and there will be two messages from the Zennify bot, choose the plan you want and make the purchase of premium.",
                discordServer: "discord server",
                secondImageDescription: "After paying the Zennify, you will receive an activation code for premium, to activate the code, just go to your server page, and click on the 'Activate premium' button, as shown below.",
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
                ]
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
                ]
            },
            popUp: {
                title: "Buy Premium",
                code: "Activation code",
                placeholder: "Type here the activation code",
                activate: "Activate Premium",
                premiumActivate: "Premium activation",
                success: "Was activated on your server successfully!",
                advantages: "Advantages obtained"
            },
            buy: "Buy",
            month: "month",
            seeplans: "See plans",
            description: "Get advanced features, smaller cooldown and improved moderation with the Basic Premium. The Premium offers everything plus a customizable bot and support for up to 5 servers."
        },
        login: {
            title: "Login",
            description: "Login to unlock the dashboard and much more!",
            discord: "Login with discord",
        },
        connection: {
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
            }
        }, tos: {
            title: "Terms of Service",
            intro1: "By accessing and using the Connections website and the Connections Bot, you agree to the following terms and conditions.",
            intro2: "These terms are designed to ensure that both the website and the bot are used appropriately and in accordance with applicable laws.",
            intro3: "Your access and use of our services are subject to these guidelines, which aim to protect both the integrity of our services and the safety and rights of our users. By using the website or the bot, you acknowledge and accept all the conditions described below. It is your responsibility to read and understand these rules, and you agree to comply with all the provisions set forth herein.",
            prohibited: {
                title: "Prohibited Actions:",
                item1: "Mining or collecting data without authorization.",
                item2: "Using tools or techniques that compromise the integrity or security of the website or the bot.",
                item3: "Removing, copying, or reproducing copyrighted content from the website or the bot.",
                item4: "Framing or unauthorized reproduction of any part of the website or the bot.",
                item5: "Using User Content without our permission and the permission of the respective users.",
                item6: "Using the website or the bot maliciously, including attempts to compromise its functionality or security.",
                item7: "Violating copyright related to the website and the bot, including unauthorized use of logos, emotes, and other materials.",
                item8: "Attempting to imitate or copy services and features offered by Connections."
            },
            discordRules: {
                title: "To ensure proper and secure operation of the Connections Bot in your Discord servers, please observe the following rules:",
                item1: "Exploitation Prohibition: It is forbidden to attempt to exploit the Connections Bot for unfair advantages or to harm other users. This includes any attempt to manipulate or modify the bot without authorization.",
                item2: "Compliance with Discord Terms: The use of the Connections Bot must fully comply with Discord's Terms of Service. Any violation of these terms will also be considered a breach of our policies.",
                item3: "Connections Policies: All uses of the Connections Bot must adhere to the policies and guidelines set forth on the Connections website. Any infraction may result in corrective actions."
            },
            limitations: {
                title: "While we strive to provide a high-quality service, the Connections website and Bot are subject to certain limitations:",
                item1: "Warranties: We do not guarantee that the website or the bot will be free from errors, bugs, or failures. Continuous availability and operation of the services are not guaranteed.",
                item2: "Conditions and Responsibilities: We do not offer specific warranties beyond those expressly stated in these Terms of Service. Use of the website and the bot is at your own risk.",
                item3: "Copyright: We are committed to promptly removing or revoking any content that infringes on copyrights. Our goal is to respect the work of others and promptly correct any violations."
            }
        },
        policy: {
            title: "Privacy Policy",
            intro: "At Connections, we are fully responsible for and take great care of all the personal information of users that is legally collected. We have no intention of harming anyone who uses our services. All requested information is from Discord itself, as we rely on it. We do not share or sell the collected personal data and information. We do not request external or sensitive information that may harm the user's experience.",
            dataCollection: "All the data we request is necessary for the application's operation. All the data we collect is listed below:",
            username: "Username, ID, and Discord Avatar: We collect your username, ID, and Discord avatar to identify you in our systems, manage your account, and personalize your experience.",
            serverInfo: "Server Information: We collect data about the Discord servers where you use the Connections bot, such as server name and server ID.",
            messages: "Messages Sent to the Bot: We only store the message ID and channel ID when a message is sent in any connection.",
            activities: "Activities and Interactions: We record your activities and interactions with the bot to provide a personalized and improved experience.",
            noSensitiveData: "We do not request any data that may harm the experience of those who use our services.",
            dataSecurity: "We are committed to data security and have implemented appropriate measures to protect your information from unauthorized access, alteration, disclosure, or destruction. Connections is not responsible for any direct, indirect, incidental, special, or consequential damage resulting from the use or inability to use our services. Users have the right to access, correct, or delete their personal information at any time. To exercise these rights, contact us via email (connectionsteamoficial@gmail.com), and we will try to respond as quickly as possible.",
            changes: "Changes can be made to our Terms and Policies at any time. We will notify you when these changes occur. By using our services, you consent to the collection and use of your information as described in this Privacy Policy. These Terms of Service will be governed and interpreted in accordance with the laws of the country in which we operate.",
            contact: "If you have any questions about our Privacy Policy, contact us via email (connectionsteamoficial@gmail.com), and we will try to respond as quickly as possible."
        },
    }
}