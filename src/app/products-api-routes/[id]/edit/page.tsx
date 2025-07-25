import { redirect } from "next/navigation"
import { EditForm } from "./_components/edit-form"
import { Product } from "@/app/api/products/route"

type EditProductPageProps = {
  params: Promise<{ id: string }>
}

async function getProduct(id: string): Promise<Product> {
	try {
		const response = await fetch(`http://localhost:3000/api/products/${id}`)
		const data = await response.json()
		return data
	} catch (error) {
		throw error
	}
}

export default async function EditProductPage({ params }: EditProductPageProps){
	const { id } = await params
	const product = await getProduct(id)
	
	if(!product) {
		redirect('/products-api-routes')
	}

	return <EditForm selectedProduct={product} />
}