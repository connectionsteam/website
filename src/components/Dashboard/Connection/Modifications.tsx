import { IoIosWarning } from "react-icons/io";
import { useLanguage } from "../../../hooks/useLanguage";
import { useEffect, useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { FaCheckCircle } from "react-icons/fa";
import type { ConnectionPayload } from "../../../types";
import { api } from "../../../utils/api";
import { useRouter } from "next/router";

interface Props {
	setModifications: (modifications: boolean) => void;
	editedConnection: Partial<ConnectionPayload>;
	setEditedConnection: (editedConnection: Partial<ConnectionPayload>) => void;
	connection: ConnectionPayload;
	setConnection: (connection: ConnectionPayload) => void;
	changedTab: boolean;
}

export default function ConnectionModifications({
	setModifications,
	editedConnection,
	setEditedConnection,
	connection,
	setConnection,
	changedTab,
}: Props) {
	const l = useLanguage();
	const [loading, setLoading] = useState({ loading: false, check: false });
	const [errors, setErrors] = useState<string[]>([]);
	const router = useRouter();

	const patchChanges = async () => {
		setLoading({ loading: true, check: false });

		const { description, icon, tags, name } = editedConnection;

		const areTagsEgual = (tags1: string[], tags2: string[]) => {
			if (tags1.length !== tags2.length) return false;

			return tags1.every((tag) => tags2.includes(tag));
		};

		const body = {
			description:
				description?.trim() === ""
					? null
					: description === connection.description
						? ""
						: description,
			icon: connection.icon === icon ? "" : icon,
			name: connection.name === name ? "" : name,
			tags: areTagsEgual(connection.tags, tags || []) ? "" : tags,
		};

		for (const i in body) {
			if (body[i as keyof typeof body] === "") {
				delete body[i as keyof typeof body];
			}
		}

		try {
			const { data } = await api.patch(`/connections/${connection.name}`, body);

			setEditedConnection(data);
			setConnection(data);

			setLoading({ loading: false, check: true });

			if (body.name) {
				router.push(`/dashboard/connection/${data.name}`);
			}

			setTimeout(() => {
				setLoading({ ...loading, check: false });
				setModifications(false);
			}, 1000);
		} catch (error: any) {
			setLoading({ loading: false, check: false });

			const filterError = (errorS: string) =>
				errors.filter((error) => error !== errorS);

			if (error.response?.data?.code === 2005)
				return setErrors([
					...filterError(l.errors.alreadyConnection),
					l.errors.alreadyConnection,
				]);

			const path = error.response.data?.extra?.path;

			if (path.includes("icon"))
				return setErrors([
					...filterError(l.errors.wrongIcon),
					l.errors.wrongIcon,
				]);

			if (path.includes("name"))
				return setErrors([
					...filterError(l.errors.invalidConnectionName),
					l.errors.invalidConnectionName,
				]);

			if (path.includes("description"))
				return setErrors([
					...filterError(l.errors.wrongDesc),
					l.errors.wrongDesc,
				]);

			return setErrors([...filterError(l.errors.generic), l.errors.generic]);
		}
	};

	const resetChanges = () => {
		setEditedConnection(connection);
		setModifications(false);
	};

	useEffect(() => {
		const handleKeyDown = (event: KeyboardEvent) => {
			const { key, ctrlKey } = event;

			if (ctrlKey && key === "s") {
				event.preventDefault();
				patchChanges();
			}
		};
	
		document.addEventListener("keydown", handleKeyDown);
	
		return () => document.removeEventListener("keydown", handleKeyDown);
	}, []);

	return (
		<div
			className={`p-3 bg-neutral-800 transition border-2 border-neutral-700 
            rounded-lg justify-center flex gap-2 items-center ${changedTab ? "border-red-500" : ""} px-4 w-full max-w-[1100px] 
          shadow-neutral-700 shadow-md tablet:w-[98vw] flex-col`}
		>
			<div className="flex gap-2 items-center w-full">
				<div className="flex flex-grow gap-2 items-center mobile:text-center">
					<IoIosWarning className="fill-yellow-300 size-8" />
					<span>{l.dashboard.guilds.modifications.changes}</span>
				</div>
				<div className="flex gap-3 items-center mobile:flex-col-reverse">
					<button
						className="transition hover:underline mobile:text-sm"
						onClick={resetChanges}
					>
						<span>{l.dashboard.guilds.modifications.reset}</span>
					</button>
					<button
						disabled={loading.check || loading.loading}
						className="flex gap-2 items-center bg-green-500 rounded-lg transition 
                    hover:bg-green-600 px-4 p-2 disabled:hover:bg-green-500 mobile:text-sm 
                    mobile:w-full text-center mobile:justify-center"
						onClick={patchChanges}
					>
						<span>{l.dashboard.guilds.info.save}</span>
						{loading.loading && (
							<AiOutlineLoading3Quarters className="animate-spin" size={18} />
						)}
						{loading.check && (
							<FaCheckCircle className="text-white" size={18} />
						)}
					</button>
				</div>
			</div>
			{errors.length > 0 ? (
				<div className="text-red-500">{errors.join(", ")}</div>
			) : null}
		</div>
	);
}
