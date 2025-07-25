import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Eye, Pencil } from "lucide-react"
import { Product } from "../api/products/route"
import { DeleteButton } from "./_components/delete-button"

async function getProducts(): Promise<Product[]> {
	try {
		const response = await fetch('http://localhost:3000/api/products')
		const data = await response.json()
		return data
	} catch (error) {
		throw error
	}
}

export default async function Page(){
	const products = await getProducts()
	return (
		<section className="w-full">
			<Card>
				<CardContent>
					<div className="flex justify-between">
						<h1 className="text-2xl font-bold">Products</h1>
						<Link href="/products-api-routes/new">
							<Button>Tambah Produk</Button>
						</Link>
					</div>
					<Table className="mt-5">
						<TableCaption>A list of your products</TableCaption>
						<TableHeader>
							<TableRow>
								<TableHead>Name</TableHead>
								<TableHead>Category</TableHead>
								<TableHead>Action</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{products.map(product => (
								<TableRow key={product.id}>
									<TableCell className="font-medium">{product.title}</TableCell>
									<TableCell>{product.category}</TableCell>
									<TableCell className="flex gap-2">
										<Link href={`/products-api-routes/${product.id}/edit`}>
											<Button className="bg-blue-600"><Pencil/></Button>
										</Link>
										<Link href={`/products-api-routes/${product.id}`}>
											<Button className="bg-green-600"><Eye /></Button>
										</Link>
										<DeleteButton productId={product.id} />
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</CardContent>
			</Card>
		</section>
	)
}
