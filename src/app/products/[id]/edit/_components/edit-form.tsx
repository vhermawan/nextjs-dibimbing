'use client';

import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card"
import type { Product } from "@prisma/client";
import { updateProduct } from "@/_actions/product";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

type EditFormProps = {
	selectedProduct: Product
}

export function EditForm({selectedProduct}: EditFormProps){
	const router = useRouter()
	const [product, setProduct] = useState({
		name: selectedProduct.name,
		description: selectedProduct.description,
	})
	const [loading, setLoading] = useState(false)

	const handleSubmit = async () => {
		setLoading(true)
		try {
			const formData = new FormData()
			formData.append('name', product.name)
			formData.append('description', product.description)

			const updatedProduct = await updateProduct(formData, selectedProduct.id)
			if(updatedProduct.success){
				toast.success('Produk berhasil diubah')
				router.push('/products')
				router.refresh()
			} else {
				toast.error(updatedProduct.error)
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
					<h1 className="text-2xl font-bold">Ubah Produk</h1>

					<form action={handleSubmit} className="mt-5 flex gap-4 flex-col">
						<Input value={product.name} placeholder="Nama Produk" onChange={(e) => setProduct({...product, name: e.target.value})} />
						<Textarea value={product.description} placeholder="Deskripsi Produk" onChange={(e) => setProduct({...product, description: e.target.value})} />

						<Button type="submit" disabled={loading}>Simpan Produk</Button>
					</form>
				</CardContent>
			</Card>
		</section>
	)
}