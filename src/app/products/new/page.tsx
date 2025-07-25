'use client';
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { useState } from "react";
import { createProduct } from "@/_actions/product";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function CreateProductPage(){
	const router = useRouter()
	const [product, setProduct] = useState({
		name: "",
		description: "",
	})
	const [loading, setLoading] = useState(false)

	const handleSubmit = async () => {
		setLoading(true)
		try {
			const formData = new FormData()
			formData.append('name', product.name)
			formData.append('description', product.description)
			const createdProduct = await createProduct(formData)
			if(createdProduct.success){
				toast.success('Produk berhasil dibuat')
				router.push('/products')
				router.refresh()
			} else {
				toast.error(createdProduct.error)
			}
		} catch (error) {
			toast.error(error instanceof Error ? error.message : 'Something went wrong')
		} finally {
			setLoading(false)
		}
	}

	return (
		<section className="w-1/2 m-auto">
			<Link href="/products">
				<Button>
					<ArrowLeft />
					Kembali
				</Button>
			</Link>
			<Card className="mt-5">
				<CardContent>
					<h1 className="text-2xl font-bold">Buat Produk</h1>

					<form action={handleSubmit} className="mt-5 flex gap-4 flex-col">
						<Input placeholder="Nama Produk" onChange={(e) => setProduct({...product, name: e.target.value})} />
						<Textarea placeholder="Deskripsi Produk" onChange={(e) => setProduct({...product, description: e.target.value})} />

						<Button type="submit" disabled={loading}>Simpan Produk</Button>
					</form>
				</CardContent>
			</Card>
		</section>
	)
}