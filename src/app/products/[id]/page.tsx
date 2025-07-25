import { getProduct } from "@/_actions/product"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { redirect } from "next/navigation"

interface DetailPageProps {
  params: Promise<{ id: string }>
}

export default async function DetailPage({ params }: DetailPageProps){
	const { id } = await params

	const product = await getProduct(id)
		
	if(!product) {
		redirect('/products')
	}

	return (
		<section className="w-full">
			<Card>
				<CardContent>
					<Link href="/products">
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
							<p>{product.name}</p>
						</div>
						<div>
							<p className="font-bold">Description</p>
							<p>{product.description}</p>
						</div>
					</div>
				</CardContent>
			</Card>
		</section>
	)
}