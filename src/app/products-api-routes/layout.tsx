export default function Layout({children}: {children: React.ReactNode}){
	return (
		<div className="flex container text-black p-10 h-full rounded-2xl bg-white m-auto">
			{children}
		</div>
	)
}