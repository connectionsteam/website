import type { NextApiRequest } from "next";
import { ImageResponse } from "@vercel/og";
import { parseQuery } from "../../utils/parseQuery";

export const config = {
	runtime: "experimental-edge",
};

const font = fetch(
	new URL("../../../public/Poppins-Bold.ttf", import.meta.url),
).then((res) => res.arrayBuffer());

interface Params {
	firstPlace: string;
	secondPlace: string;
	thirdPlace: string;
	firstUser: string;
	secondUser: string;
	thirdUser: string;
	yourPlace: string;
	firstUserMessages: string;
	secondUserMessages: string;
	thirdUserMessages: string;
}

export default async function handler(req: NextApiRequest) {
	const fontData = await font;
	const [, queryString] = (req.url || "").split("?");
	const params = parseQuery(queryString) as unknown as Params;

	const {
		firstPlace,
		secondPlace,
		thirdPlace,
		firstUser,
		secondUser,
		thirdUser,
		yourPlace,
		firstUserMessages,
		secondUserMessages,
		thirdUserMessages,
	} = params;

	const Image = (
		<div tw="bg-neutral-900 w-[800px] h-[400px] text-white flex relative">
			<div
				style={{
					boxShadow: "0px 0px 50px 1px #FCFCFC",
				}}
				tw="absolute left-[110px] top-[195px] w-[79px] h-[82px] rounded-full"
			/>
			<img
				src={secondPlace ?? ""}
				tw="left-[85px] top-[174px] h-[130px] w-[130px] absolute rounded-full"
			/>
			<div
				tw="left-[84px] top-[273px] w-[130px] h-[25px] absolute rounded-lg flex text-black 
                bg-[#A0A0A0]/60 items-center justify-center"
			>
				<span tw="text-[#EAEAEA] mt-1">{secondUser}</span>
			</div>
			<div
				tw="left-[60px] top-[310px] w-[180px] absolute flex items-center justify-center
				-translate-x-1/2 -translate-y-1/2 no-break text-sm"
			>
				<span>{secondUserMessages}</span>
			</div>
			<div
				style={{
					boxShadow: "0px 0px 50px 1px #FFC16B",
				}}
				tw="absolute left-[518px] top-[195px] w-[79px] h-[82px] rounded-full"
			/>
			<img
				src={thirdPlace ?? ""}
				tw="left-[493px] top-[174px] h-[130px] w-[130px] absolute rounded-full"
			/>
			<div
				tw="left-[493px] top-[273px] w-[130px] h-[25px] absolute rounded-lg flex text-black 
                bg-[#A0A0A0]/60 items-center justify-center"
			>
				<span tw="text-[#FFC387] mt-1">{thirdUser}</span>
			</div>
			<div
				tw="left-[263px] top-[260px] w-[180px] absolute flex items-center justify-center
				-translate-x-1/2 -translate-y-1/2 no-break text-sm"
			>
				<span>{firstUserMessages}</span>
			</div>
			<div
				style={{
					boxShadow: "0px 0px 40px 1px #FFF154",
				}}
				tw="absolute left-[272px] top-[80px] w-[160px] h-[160px] rounded-full"
			/>
			<img
				src={firstPlace ?? ""}
				tw="left-[257px] top-[60px] h-[190px] w-[190px] absolute rounded-full"
			/>
			<div
				tw="left-[270px] top-[215px] w-[165px] h-[30px] absolute rounded-lg flex text-black 
                bg-[#A0A0A0]/60 items-center justify-center"
			>
				<span tw="text-[#FFF1A5] mt-1 text-lg">{firstUser}</span>
			</div>
			<span tw="absolute left-[180px] top-[371px] text-[10px]">
				{yourPlace}
			</span>
			<div
				tw="left-[468px] top-[310px] w-[180px] absolute flex items-center justify-center
				-translate-x-1/2 -translate-y-1/2 no-break text-sm"
			>
				<span>{thirdUserMessages}</span>
			</div>
		</div>
	);

	return new ImageResponse(Image, {
		width: 700,
		height: 400,
		fonts: [
			{
				name: "Sans",
				data: fontData,
				weight: 700,
				style: "normal",
			},
		],
	});
}
