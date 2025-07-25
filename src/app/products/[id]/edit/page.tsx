import { getProduct } from "@/_actions/product"
import { redirect } from "next/navigation"
import { EditForm } from "./_components/edit-form"

type EditProductPageProps = {
  params: Promise<{ id: string }>
}

export default async function EditProductPage({ params }: EditProductPageProps){
	const { id } = await params
	const product = await getProduct(id)
	
	if(!product) {
		redirect('/products')
	}

	return <EditForm selectedProduct={product} />
}