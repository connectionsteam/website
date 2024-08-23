import { useContext, useEffect, useState } from "react";
import { ConnectionPayload } from "../../types";
import DefaultLayout from "../Mixed/Layout";
import { api } from "../../utils/api";
import Head from "next/head";
import { UserContext } from "../../contexts/User";
import DefaultButton from "../Mixed/Button";
import { LuGift, LuShoppingCart } from "react-icons/lu";
import { useLanguage } from "../../hooks/useLanguage";
import PromotedFunctionsCards from "./Cards";

export default function PromoteComponent() {
    const [connection, setConnection] = useState<ConnectionPayload>();
    const { user } = useContext(UserContext);
    const l = useLanguage();

    useEffect(() => {
        const fetchConnection = async () => {
            const { data } = await api.get("/users/@me/connections/random");

            setConnection(data);
        };

        fetchConnection();
    }, []);

    return (
        <DefaultLayout className="items-center justify-center flex">
            <Head>
                <title>{l.promote.title}</title>
            </Head>
            <div className="flex flex-col items-center justify-center gap-1">
                <span className="font-bold text-lg">{l.promote.title}</span>
                <h1 className="bg-clip-text text-transparent bg-gradient-to-r from-pink-600 
            to-rose-700 text-5xl font-bold">
                    Promoted
                </h1>
                <span className="font-bold text-xl">{l.promote.description}</span>
            </div>
            <div className="flex flex-col items-center justify-center gap-3">
                <span className="font-bold text-xl">{l.promote.benefits}</span>
                <div className="grid grid-cols-2 gap-4 max-w-[900px] tablet:grid-cols-1">
                    <PromotedFunctionsCards connection={connection} />
                </div>
                <div className="flex items-center justify-center gap-6 mt-4 flex-col">
                    <div className="flex flex-col gap-2 items-center justify-center">
                        <span className="font-bold text-lg">{l.promote.buy.description}</span>
                        <p className="bg-clip-text text-transparent bg-gradient-to-r from-pink-600 
                        to-rose-700 text-4xl font-bold">
                            {l.promote.buy.price}
                        </p>
                    </div>
                    <div className="flex justify-between items-center gap-2">
                        <DefaultButton pink className="w-40 flex items-center justify-center py-3 shadow-rose-700 shadow-[0_0px_20px_rgba(8,_112,_184,_0.7)]" divclass="w-fit">
                            <LuShoppingCart />
                            <span>{l.promote.buy.button}</span>
                        </DefaultButton>
                        <button className="w-40 flex items-center justify-center py-3 rounded-lg bg-neutral-800 hover:bg-neutral-700 transition gap-2">
                            <LuGift />
                            <span>{l.promote.buy.gift}</span>
                        </button>
                    </div>
                    <span className="text-neutral-300 max-w-[600px] text-center">{l.promote.expiration}</span>
                </div>
            </div>
        </DefaultLayout>
    )
}