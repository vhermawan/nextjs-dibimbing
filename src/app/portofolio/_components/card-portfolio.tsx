
// 'use client';
import ButtonAction from "@/_components/button-action";
import Link from "next/link";
// import { useRouter } from "next/navigation";

type CardPortofolioProps = {
	id: number;
	title: string;
	description: string;
}

export default function CardPortofolio({id, title, description}: CardPortofolioProps){
	// const router = useRouter()
	return (
		<div className="bg-white flex flex-col shadow-2xl rounded-3xl h-full w-[400px] p-10 text-black gap-2">
			<h1>{title}</h1>
			<p>{description}</p>
			<Link href={`/portofolio/${id}`} target="_blank">
				<ButtonAction 
					text="Detail"
				/>
			</Link>
			{/* <ButtonAction 
				text="Detail"
				onClick={() => router.push(`/portofolio/${id}`)}
			/> */}
		</div>
	)
}