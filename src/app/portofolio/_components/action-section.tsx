'use client';

import ButtonAction from "@/_components/button-action";

export default function ActionSection(){
	return (
		<>
			<ButtonAction 
				text="Tambah Portofolio"
				onClick={() => alert("Tambah Portofolio")}
			/>
			<input type="text" className="w-full bg-white" onChange={(e) => console.log(e.target.value)} />
		</>
	)
}