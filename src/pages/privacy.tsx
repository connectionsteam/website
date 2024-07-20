import DefaultLayout from "@/components/Mixed/Layout";

export default function PolicyPage() {
    return (
        <DefaultLayout>
            <h1 className="font-bold text-2xl">Política de Privacidade</h1>
            <div className="flex flex-col gap-2">
                <p>Nós da equipe Connections temos total cuidado e responsabilidade com todas as
                    informações pessoais dos usuários que são coletadas legalmente. Não temos
                    qualquer intenção de prejudicar qualquer um que utilize nossos serviços. Todas
                    as informações solicitadas são dados do próprio Discord, já que dependemos dele.
                    Não compartilhamos nem vendemos os dados e informações pessoais coletadas.
                    Não solicitamos informações externas ou dados sensíveis que possam prejudicar
                    o uso do usuário.
                </p>
                <ul className="flex flex-col gap-2 ml-2 list-disc">
                    <li>Todos os dados que solicitamos são os necessarios para o funcionamento da
                        aplicação. Todos os dados que coletamos estão citados abaixo:
                    </li>
                    <li>Nome de Usuário, ID e Avatar do Discord: Coletamos seu nome de usuário, ID e
                        avatar do Discord para identificar você em nossos sistemas, gerenciar sua conta
                        e personalizar sua experiência.
                    </li>
                    <li>Informações de Servidor: Coletamos dados sobre os servidores Discord onde você
                        utiliza o bot Connections, como nome do servidor e ID do servidor.
                    </li>
                    <li>Mensagens Enviadas ao Bot: Armazenamos apenas o ID da mensagem e o ID do canal
                        quando uma mensagem é enviada em alguma conexão.
                    </li>
                    <li>Atividades e Interações: Registramos suas atividades e interações com o bot para
                        oferecer uma experiência personalizada e melhorada.
                    </li>
                    <li>Não solicitamos quaisquer dados que possam prejudicar a experiência de quem
                        utiliza dos nossos serviços.
                    </li>
                    <li>Estamos comprometidos com a segurança dos dados e implementamos medidas
                        apropriadas para proteger suas informações contra acesso não autorizado,
                        alteração, divulgação ou destruição. O Connections não se responsabiliza por
                        qualquer dano direto, indireto, incidental, especial ou consequente resultante
                        do uso ou da incapacidade de usar nossos serviços. Os usuários têm o direito
                        de acessar, corrigir ou excluir suas informações pessoais a qualquer momento.
                        Para exercer esses direitos, entre em contato conosco via e-mail (
                        <a
                            href="mailto:connectionsteamoficial@gmail.com"
                            className="text-blue-500 underline hover:text-blue-400 transition"
                        >connectionsteamoficial@gmail.com</a>
                        )
                        e tentaremos responder o mais rápido possível.
                    </li>
                    <li>Alterações podem ser feitas em nossos Termos e Políticas a qualquer momento.
                        Deixaremos você ciente quando essas mudanças ocorrerem. Ao utilizar nossos
                        serviços, você consente com a coleta e uso de suas informações conforme descrito
                        nesta Política de Privacidade. Este Termo de Serviço será regido e interpretado
                        de acordo com as leis vigentes do país em que operamos.
                    </li>
                </ul>
                <p className="font-bold">Se você tiver alguma dúvida sobre a nossa Política de Privacidade, entre em
                    contato conosco via e-mail (
                    <a
                        href="mailto:connectionsteamoficial@gmail.com"
                        className="text-blue-500 underline hover:text-blue-400 transition"
                    >connectionsteamoficial@gmail.com</a>
                    ) e tentaremos responder o mais rápido possível.
                </p>
            </div>
        </DefaultLayout>
    )
}