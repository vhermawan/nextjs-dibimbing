import CardPortofolio from "./_components/card-portfolio";

export default async function PortofolioPage(){
	const portofolios = [
		{
			id: 1,
			title: "Portofolio 1",
			description: "Deskripsi portofolio 1"
		},
		{
			id: 2,
			title: "Portofolio 2",
			description: "Deskripsi portofolio 2"
		}
	]

	const data = await fetch('https://api.vercel.app/blog')
  const posts: {
		id: number,
		title: string,
		content: string,
		author: string,
		date: string,
		category: string
	}[] = await data.json()

	return (
		<section>
			Portofolio
			<div className="flex flex-col gap-10">
				{posts.map(portofolio => (
					<CardPortofolio 
						key={portofolio.id}
						id={portofolio.id}
						title={portofolio.title}
						description={portofolio.content}
					/>
				))}
			</div>
		</section>
	)
}