'use client'

type ButtonActionProps = {
	onClick?: () => void
	text: string
}

export default function ButtonAction({
	text,
	onClick
}: ButtonActionProps){
	return (
		<button 
			className="bg-blue-500 w-full hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
			onClick={onClick}
		>
			{text}
		</button>
	);
}