import DefaultLayout from "@/components/Mixed/Layout";

export default function TosPage() {
    return (
        <DefaultLayout>
            <div className="flex flex-col gap-2">
                <h1 className="font-bold text-2xl">Termos de serviço</h1>
                <div>
                    Ao acessar e utilizar o site Connections e o Bot Connections, você concorda com os
                    seguintes termos e condições.
                    <p>Estes termos são projetados para assegurar que tanto o
                        site quanto o bot sejam utilizados de maneira adequada e em conformidade com as leis
                        aplicáveis.</p>
                    <p>O seu acesso e uso de nossos serviços estão sujeitos a essas diretrizes,
                        que visam proteger tanto a integridade dos nossos serviços quanto a segurança e os
                        direitos dos nossos usuários. Ao utilizar o site ou o bot, você declara estar ciente
                        de e aceitar todas as condições descritas a seguir.</p>
                    <p>É sua responsabilidade ler e entender
                        essas regras, e você concorda em cumprir todas as disposições estabelecidas aqui.</p>
                </div>
                <div className="flex flex-col gap-4">
                    <div className="flex flex-col gap-2">
                        <h2 className="font-bold text-lg">É proibido:</h2>
                        <ul className="list-disc ml-4 flex flex-col gap-2">
                            <li>Minerar ou coletar dados sem autorização.</li>
                            <li>Utilizar ferramentas ou técnicas que comprometam a integridade ou
                                segurança do site ou do bot.</li>
                            <li>Remover, copiar ou reproduzir conteúdo protegido por direitos
                                autorais do site ou do bot.</li>
                            <li>Emoldurar ou fazer reprodução não autorizada de qualquer parte do
                                site ou do bot.</li>
                            <li>Utilizar o Conteúdo do Usuário sem nossa permissão e a permissão
                                dos próprios usuários.</li>
                            <li>Usar o site ou o bot de maneira maliciosa, incluindo tentativas de
                                comprometer seu funcionamento ou segurança.</li>
                            <li>Violação de direitos autorais relacionados ao site e ao bot,
                                incluindo a utilização não autorizada de logotipos, emotes e
                                outros materiais.</li>
                            <li>Tentar imitar ou copiar serviços e funcionalidades oferecidos
                                pelo Connections.</li>
                        </ul>
                    </div>
                    <div className="flex flex-col gap-2">
                        <h2 className="font-bold text-lg">Para garantir um funcionamento adequado e
                            seguro do Bot Connections em seus servidores Discord,
                            observe as seguintes regras:</h2>
                        <ul className="list-disc ml-4 flex flex-col gap-2">
                            <li>Proibição de Exploração: É proibido tentar explorar o Bot Connections
                                para obter vantagens injustas ou prejudicar outros usuários. Isso
                                inclui qualquer tentativa de manipulação ou modificação não
                                autorizada do bot.</li>
                            <li>Conformidade com Termos do Discord: O uso do Bot Connections deve
                                estar em total conformidade com os Termos de Serviço do Discord.
                                Qualquer violação desses termos será considerada uma infração das
                                nossas políticas também.</li>
                            <li>Políticas do Connections: Todos os usos do Bot Connections devem
                                respeitar as políticas e diretrizes estabelecidas no site
                                Connections. Qualquer infração pode resultar em ações corretivas.</li>
                        </ul>
                    </div>
                    <div className="flex flex-col gap-2">
                        <h2 className="font-bold text-lg">Enquanto nos esforçamos para oferecer um
                            serviço de alta qualidade, o site e o Bot Connections estão sujeitos a
                            certas limitações:</h2>
                        <ul className="list-disc ml-4 flex flex-col gap-2">
                            <li>Garantias: Não garantimos que o site ou o bot estejam livres de erros,
                                bugs ou falhas. A disponibilidade contínua e a operação dos serviços
                                não são garantidas.</li>
                            <li>Condições e Responsabilidades: Não oferecemos garantias específicas
                                além das expressamente estabelecidas neste Termo de Serviço. O uso do
                                site e do bot é por sua conta e risco.</li>
                            <li>Direitos Autorais: Comprometemo-nos a remover ou revogar imediatamente
                                qualquer conteúdo que infrinja direitos autorais. Nosso objetivo é
                                respeitar o trabalho de outros e corrigir prontamente quaisquer violações.
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </DefaultLayout>
    )
}