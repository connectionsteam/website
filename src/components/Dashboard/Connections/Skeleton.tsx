import { Input } from "@nextui-org/input";
import ConnectionsSkeleton from "../ConnectionsSkeleton";
import { useContext } from "react";
import { LanguageContext } from "../../../contexts/Language";
import { languages } from "../../../locale";
import DefaultLayout from "../../../components/Mixed/Layout";
import { Tab, Tabs } from "@nextui-org/tabs";

export default function ConnectionsProtectedSkeleton() {
    const { language } = useContext(LanguageContext);

    return (
        <DefaultLayout className="mt-24">
            <div className="flex w-full flex-col items-center">
                <Tabs classNames={{
                    cursor: "bg-neutral-700",
                    tabList: "bg-neutral-800"
                }} aria-label="Options">
                    <Tab className="flex items-start w-full" key="connections" title={languages[language].dashboard.connections.title}>
                        <Skeleton />
                    </Tab>
                    <Tab className="flex items-start w-full" key="guilds" title={languages[language].dashboard.guilds.title}>
                        <Skeleton />
                    </Tab>
                </Tabs>
            </div>
        </DefaultLayout>
    );
}

function Skeleton() {
    const { language } = useContext(LanguageContext);

    return (
        <div className="flex w-full items-start flex-col gap-4 z-10 tablet:px-3">
            <div className="flex flex-col gap-2">
                <div className="font-bold text-3xl">{languages[language].dashboard.connections.title}</div>
                <div className="text-neutral-300">{languages[language].dashboard.connections.description}</div>
            </div>
            <Input classNames={{
                inputWrapper: "rounded-lg bg-neutral-800 group-hover:bg-neutral-700",
            }} type="string" label={languages[language].dashboard.misc.filterConnections} />
            <div className="grid grid-cols-3 gap-3 w-full">
                <ConnectionsSkeleton />
            </div>
        </div>
    )
}