
type DetailPageProps = {
  params: Promise<{ id: string }>
}

export default async function DetailPage({ params }: DetailPageProps){
	const { id } = await params

	return (
		<section>
			Detail Portofolio id: {id}
		</section>
	)
}