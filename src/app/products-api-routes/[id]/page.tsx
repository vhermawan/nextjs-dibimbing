import { Product } from "@/app/api/products/route"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { redirect } from "next/navigation"

interface DetailPageProps {
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

export default async function DetailPage({ params }: DetailPageProps){
	const { id } = await params

	const product = await getProduct(id)
		
	if(!product) {
		redirect('/products-api-routes')
	}

	return (
		<section className="w-full">
			<Card>
				<CardContent>
					<Link href="/products-api-routes">
						<Button>
							<ArrowLeft />
							Kembali
						</Button>
					</Link>
					<div className="flex justify-between mt-5">
						<h1 className="text-2xl font-bold">Detail Produk</h1>
					</div>
					<div className="flex flex-col gap-2 mt-4">
						<div>
							<p className="font-bold">Name</p>
							<p>{product.title}</p>
						</div>
						<div>
							<p className="font-bold">Category</p>
							<p>{product.category}</p>
						</div>
					</div>
				</CardContent>
			</Card>
		</section>
	)
}