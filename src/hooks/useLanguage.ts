import { LanguageContext } from "../contexts/Language";
import { languages } from "../locale";
import { useContext } from "react";

export function useLanguage() {
	const { language } = useContext(LanguageContext);

	return {
		...languages[language],
		language,
	};
}
