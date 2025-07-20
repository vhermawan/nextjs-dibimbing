export default function Layout({children}: {children: React.ReactNode}){
	return (
		<div className="min-h-screen flex m-auto justify-center font-bold">
			{children}
		</div>
	)
}