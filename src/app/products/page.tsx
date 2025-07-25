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
import { getProducts } from "@/_actions/product"
import { Eye, Pencil } from "lucide-react"
import { DeleteButton } from "./_components/delete-button"

export default async function Page(){
	const products = await getProducts()
	return (
		<section className="w-full">
			<Card>
				<CardContent>
					<div className="flex justify-between">
						<h1 className="text-2xl font-bold">Products</h1>
						<Link href="/products/new">
							<Button>Tambah Produk</Button>
						</Link>
					</div>
					<Table className="mt-5">
						<TableCaption>A list of your products</TableCaption>
						<TableHeader>
							<TableRow>
								<TableHead>Name</TableHead>
								<TableHead>Description</TableHead>
								<TableHead>Action</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{products.map(product => (
								<TableRow key={product.id}>
									<TableCell className="font-medium">{product.name}</TableCell>
									<TableCell>{product.description}</TableCell>
									<TableCell className="flex gap-2">
										<Link href={`/products/${product.id}/edit`}>
											<Button className="bg-blue-600"><Pencil/></Button>
										</Link>
										<Link href={`/products/${product.id}`}>
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
