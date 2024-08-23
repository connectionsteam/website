import DefaultLayout from "../../../components/Mixed/Layout";
import { ConnectionPayload } from "../../../types";
import { api } from "../../../utils/api";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { LuPenSquare } from "react-icons/lu";
import EditConnectionComponent from "./Edit";
import { useLanguage } from "../../../hooks/useLanguage";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { FaCheckCircle } from "react-icons/fa";
import ConnectionPrivateInvite from "./Settings/Invite";
import ConnectionPageSkeleton from "./Skeleton";
import Head from "next/head";
import Avatar from "../../Mixed/Avatar";
import DefaultTabs from "../../Mixed/Tabs";
import EditDashboardConnection from "./Edit/index";
import DashboardConnectionSettings from "./Settings";
import DefaultButton from "../../Mixed/Button";
import { IoMdArrowDropup } from "react-icons/io";
import { VscTriangleUp } from "react-icons/vsc";
import Confetti from "react-confetti";
import { Modal, ModalBody, ModalContent, ModalHeader, useDisclosure } from "@nextui-org/modal";
import ActivePromoted from "./Promoted";

export interface EditConnection {
    description: string;
    icon: string;
    tags: string[];
    private?: boolean;
    invite?: string;
}

export default function ConnectionPageComponent() {
    const { query: { name } } = useRouter();
    const l = useLanguage();
    const [connection, setConnection] = useState<ConnectionPayload>();
    const [editedConnection, setEditedConnection] = useState<Partial<ConnectionPayload>>({});
    const [changedTab, setChangedTab] = useState(false);
    const [modifications, setModifications] = useState(false);
    const [activeTab, setActiveTab] = useState("edit");
    const [showConfetti, setShowConfetti] = useState(false);
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const tabs = [
        {
            id: "edit",
            label: "Editar",
            component: connection && (
                <EditDashboardConnection
                    editedConnection={editedConnection}
                    setEditedConnection={setEditedConnection}
                    changedTab={changedTab}
                    connection={connection}
                    setConnection={setConnection}
                    modifications={modifications}
                    setModifications={setModifications}
                />
            )
        },
        {
            id: "settings",
            label: "Configurações",
            component: connection && (
                <DashboardConnectionSettings
                    editedConnection={editedConnection}
                    setEditedConnection={setEditedConnection}
                    connection={connection}
                    setConnection={setConnection}
                    modifications={modifications}
                    setModifications={setModifications}
                />
            )
        }
    ];

    useEffect(() => {
        if (!name) return;

        const fetchConnection = async () => {
            const { data } = await api.get(`/connections/${name}`);

            setConnection(data);
            setEditedConnection({
                name: data.name,
                description: data.description,
                icon: data.icon,
                tags: data.tags,
                private: data.private,
                hashInvite: data.hashInvite,
            });
        };

        fetchConnection();
    }, [name]);

    useEffect(() => {
        if (activeTab !== "edit" && modifications) {
            setChangedTab(true);

            setActiveTab("edit");

            setTimeout(() => {
                setChangedTab(false);
            }, 1000);
        }
    }, [activeTab, modifications]);

    return (
        <>
            <Head>
                <title>{connection ? connection.name : "loading"}</title>
                <meta name="description" content={connection ? connection.description : "loading"} />
                <meta property="og:title" content={connection ? connection.name : "loading"} />
                <meta property="og:description" content={connection ? connection.description : "loading"} />
                <meta property="og:image" content={connection ? connection.icon : "/default-icon.png"} />
            </Head>
            <DefaultLayout>
            {showConfetti && <Confetti
                className="absolute w-screen h-screen z-50"
                colors={[
                    "#F062AB",
                    "#FF94C4",
                    "#EC4899",
                    "#D91452",
                    "#F03A66",
                    "#BE123C"
                ]} />
            }
                {connection ? (
                    <div className="flex flex-col gap-2 w-full">
                        <div className="bg-neutral-800 p-3 rounded-lg w-full flex items-center">
                            <div className="flex gap-3 items-center flex-grow">
                                {connection.icon && (
                                    <div className="h-20 w-20">
                                        <Avatar className="w-20 h-20" src={connection.icon} />
                                    </div>
                                )}
                                <div className="flex flex-col gap-1">
                                    <h1 className="font-bold text-2xl">
                                        {connection.name}
                                    </h1>
                                </div>
                            </div>
                            <DefaultButton 
                                onClick={onOpen}
                                pink 
                                divclass="w-fit h-fit" 
                                className="px-6 p-3"
                            >
                                <VscTriangleUp size={18}/>
                                <span>Ativar Promoted</span>
                            </DefaultButton>
                        </div>
                        <div className="w-full relative flex items-center gap-2">
                            <DefaultTabs
                                activeTab={activeTab}
                                setActiveTab={setActiveTab}
                                cursor="bg-neutral-800"
                                tabs={tabs}
                            />
                        </div>
                        {tabs.find((t) => t.id === activeTab)?.component}
                        <Modal classNames={{
                    closeButton: "transition hover:bg-neutral-700",
                    wrapper: "overflow-y-hidden",
                    base: "max-h-screen overflow-y-auto",
                }} isOpen={isOpen} onOpenChange={onOpenChange}>
                    <ModalContent className="bg-neutral-800 text-white">
                        <ModalHeader className="flex flex-col gap-1 bg-neutral-800 pb-1">
                            Ativar Promoted
                        </ModalHeader>
                        <ModalBody>
                            <ActivePromoted
                                connection={connection}
                                setShowConfetti={setShowConfetti}
                                setConnection={setConnection}
                            />
                        </ModalBody>
                    </ModalContent>
                </Modal>
                    </div>
                ) : (
                    <ConnectionPageSkeleton />
                )}
            </DefaultLayout>
        </>
    );
}


// <div className="w-full p-6 rounded-lg bg-neutral-800 text-white">
                    //     <div className="flex items-start relative">
                    //         <div className="flex flex-col gap-8 w-full">
                    //             <div className="flex flex-col gap-4">
                    //                 <EditConnectionComponent
                    //                     connection={connection}
                    //                     editedConnection={editedConnection}
                    //                     setEditedConnection={setEditedConnection}
                    //                     edit={edit}
                    //                 />
                    //                 {edit && (
                    //                     <div className="flex gap-2">
                    //                         <button
                    //                             onClick={saveEditedConnection}
                    //                             className="rounded-lg hover:bg-green-500 text-white transition
                    //                         p-2 px-4 border-green-500 border-2 flex gap-1 items-center"
                    //                         >
                    //                             <span>
                    //                                 {l.dashboard.guilds.connections.blockedWords.save}
                    //                             </span>
                    //                             {(loading.loading && loading.loader === "connection") &&
                    //                                 <AiOutlineLoading3Quarters
                    //                                     className="animate-spin"
                    //                                     size={18}
                    //                                 />
                    //                             }
                    //                             {(loading.check && loading.loader === "connection")
                    //                                 && <FaCheckCircle size={18} />
                    //                             }
                    //                         </button>
                    //                         <button
                    //                             onClick={resetEditedConnection}
                    //                             className="rounded-lg hover:bg-blue-500 text-white 
                    //                         transition p-2 px-4 border-blue-500 border-2"
                    //                         >
                    //                             {l.dashboard.connections.edit.redefine}
                    //                         </button>
                    //                     </div>
                    //                 )}
                    //             </div>
                    //             <ConnectionPrivateInvite
                    //                 setConnection={setConnection}
                    //                 setLoading={setLoading}
                    //                 connection={connection}
                    //                 editedConnection={editedConnection}
                    //                 setEditedConnection={setEditedConnection}
                    //                 loading={loading}
                    //             />
                    //             <DeleteConnectionPage id={connection.name} />
                    //         </div>
                    //         <button
                    //             className="absolute right-0"
                    //             onClick={() => setEdit(!edit)}
                    //         >
                    //             <LuPenSquare size={25} />
                    //         </button>
                    //     </div>
                    // </div>