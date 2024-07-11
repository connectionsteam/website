export const languages = {
    "pt-BR": {
        home: {
            header: {
                documentation: "Documentação",
                support: "Suporte",
                menu: {
                    exit: "Sair",
                    dashboard: "Painel",
                }
            },
            description: "Connections é um bot projetado para facilitar conexões entre servidores, promovendo o engajamento e dinamismo em seu servidor.",
        },
        dashboard: {
            guilds: {
                title: "Servidores",
                description: "Selecione o servidor que deseja gerenciar",
                addServer: "Adicionar servidor",
                info: {
                    title: "Informações",
                    description: "Aqui ficará as informações do servidor",
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
                        locked: "Conexão bloqueada",
                        lockedDescription: "Conexão bloqueada por moderadores, a conexão não pode receber e nem enviar mensagens",
                        frozen: "Conexão congelada",
                        frozenDescription: "Conexão congelada por moderadores, A CONEXÃO NÃO PODE SER EDITADA NOVAMENTE",
                        allowFiles: "Permitir arquivos",
                        allowFilesDescription: "Permitir envio de arquivos",
                        allowInvites: "Permitir convites",
                        allowInvitesDescription: "Permitir convites de outros servidores",
                        allowLinks: "Permitir links",
                        allowLinksDescription: "Permitir links nas mensagens enviadas",
                        noIndentification: "Não identificar servidor",
                        noIndentificationDescription: "Não identificar nome do servidor",
                        allowOrigin: "Permitir origem",
                        allowOriginDescription: "Permitir aparecer informações do servidor da mensagem enviada, como nome e id",
                        allowEmojis: "Permitir emojis",
                        allowEmojisDescription: "Permitir somente emojis do discord",
                        compactModeEnabled: "Modo compacto ativado",
                        compactModeEnabledDescription: "Mensagem mais compacta a ser enviada",
                    },
                    channel: "Canal da conexão",
                    selectchannel: "Clique aqui e selecione um canal",
                    connectionName: "Nome da conexão",
                    connectionPlaceholder: "conexaolegal",
                    connecting: "Conectando...",
                    connect: "Conectar",
                    language: "Linguagem desejada",
                    searchForLanguage: "Procure por uma linguagem",
                },
                mods: {
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
                    title: "Casos do servidor",
                    description: "Aqui ficará o histórico de casos que ocorreram em seu servidor, como banimentos e timeouts.",
                    ban: "banido",
                    mute: "mutado",
                    by: "por",
                    reason: "Motivo",
                },
                channels: {
                    title: "Editar Canais bloqueados",
                    description: "Clique nos cadeados para bloquear e desbloquear o canal de cada conexão conectada em seu servidor",
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
                filterConnections: "Filtrar conexão",
                filterGuilds: "Filtrar servidor",
            }
        },
        plans: {
            basicpremium: {
                features: [
                    "+ Threads",
                    "Cooldown de mensagens diminuido",
                    "Congelar mensagens nas conexões conectadas",
                    "+ Conexões conectadas",
                    "Sistema de moderação melhorado",
                    "E muito mais!"
                ]
            },
            premium: {
                features: [
                    "Tudo do Basic Premium",
                    "Bot próprio e customizavel!",
                    "Máximo 5 servidores no bot"
                ]
            },
            buy: "Comprar",
            month: "mês",
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
            hours: "horas",
            voting: "Votando...",
            connect: "Conectar",
            promoted: "Promovida",
            search: "Procurar por uma conexão",
            tags: ["Gamer", "Bate-papo", "Comunidade", "Variado", "Minecraft"]
        }
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
            description: "Connections is a bot designed to facilitate connections between servers, enhancing engagement and dynamism in your server.",
        },
        dashboard: {
            guilds: {
                title: "Servers",
                description: "Select the server you want to manage",
                addServer: "Add server",
                info: {
                    title: "Informations",
                    description: "Here will be the informations of the guild",
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
                    },
                    channel: "Connection channel",
                    selectchannel: "Click here and select a channel",
                    connectionName: "Connection name",
                    connectionPlaceholder: "coolconnection",
                    connecting: "Connecting...",
                    connect: "Connect",
                    language: "Language desired",
                    searchForLanguage: "Search for a language",
                },
                mods: {
                    title: "Guild moderators",
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
                    title: "Guild cases",
                    description: "Here will be the history of cases that occurred in your guild, like bans and timeouts.",
                    ban: "banned",
                    mute: "muted",
                    by: "by",
                    reason: "Reason",
                },
                channels: {
                    title: "Edit locked channels",
                    description: "Click on the crosses to lock and unlock the channel of each connected connection in your server",
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
                filterConnections: "Filter connection",
                filterGuilds: "Filter guild",
            },
        },
        plans: {
            basicpremium: {
                features: [
                    "+ Threads",
                    "Reduced message cooldown",
                    "Freeze messages in connected connections",
                    "+ Connected connections",
                    "Improved moderation system",
                    "And much more!"
                ]
            },
            premium: {
                features: [
                    "Everything from Basic Premium",
                    "Own bot and customizable!",
                    "Max 5 servers in the bot"
                ]
            },
            buy: "Buy",
            month: "month",
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
            promoted: "Promoted",
            search: "Search for a connection",
            tags: ["Gamer", "Chat", "Community", "Varied", "Minecraft"]
        }
    }
}
