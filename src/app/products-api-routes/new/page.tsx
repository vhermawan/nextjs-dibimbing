'use client';

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

// Define the Product type to match your API
type Product = {
	id: number
	title: string
	price: number
	description: string
	category: string
	image: string
	rating: {
		rate: number
		count: number
	}
}

// API function to create product
async function createProduct(productData: {
	title: string
	price: number
	description: string
	category: string
	image: string
}): Promise<Product> {
	try {
		const response = await fetch('/api/products', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(productData)
		})

		if (!response.ok) {
			const errorData = await response.json()
			throw new Error(errorData.error || 'Failed to create product')
		}

		return response.json()
	} catch (error) {
		throw error
	}
}

export default function CreateProductPage() {
	const router = useRouter()
	const [product, setProduct] = useState({
		title: "",
		price: 0,
		description: "",
		category: "",
		image: ""
	})
	const [loading, setLoading] = useState(false)

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		setLoading(true)
		
		try {
			// Basic validation
			if (!product.title.trim()) {
				toast.error('Product title is required')
				return
			}
			if (product.price <= 0) {
				toast.error('Product price must be greater than 0')
				return
			}
			if (!product.category.trim()) {
				toast.error('Product category is required')
				return
			}
			if (!product.description.trim()) {
				toast.error('Product description is required')
				return
			}

			await createProduct(product)
			toast.success('Produk berhasil dibuat')
			router.push('/products-api-routes')
			router.refresh()
		} catch (error) {
			console.error('Create error:', error)
			toast.error(error instanceof Error ? error.message : 'Something went wrong')
		} finally {
			setLoading(false)
		}
	}

	const handleInputChange = (field: keyof typeof product, value: string | number) => {
		setProduct(prev => ({
			...prev,
			[field]: value
		}))
	}

	return (
		<section className="w-full max-w-2xl mx-auto px-4">
			<div className="mb-6">
				<Link href="/products-api-routes">
					<Button variant="outline" className="flex items-center gap-2">
						<ArrowLeft size={16} />
						Kembali
					</Button>
				</Link>
			</div>

			<Card>
				<CardContent className="p-6">
					<h1 className="text-2xl font-bold mb-6">Buat Produk Baru</h1>

					<form onSubmit={handleSubmit} className="space-y-4">
						<div>
							<label htmlFor="title" className="block text-sm font-medium mb-2">
								Nama Produk
							</label>
							<Input
								id="title"
								value={product.title}
								placeholder="Masukkan nama produk"
								onChange={(e) => handleInputChange('title', e.target.value)}
								disabled={loading}
								required
							/>
						</div>

						<div>
							<label htmlFor="price" className="block text-sm font-medium mb-2">
								Harga Produk
							</label>
							<Input
								id="price"
								value={product.price || ''}
								type="number"
								step="0.01"
								min="0"
								placeholder="Masukkan harga produk"
								onChange={(e) => handleInputChange('price', Number(e.target.value))}
								disabled={loading}
								required
							/>
						</div>

						<div>
							<label htmlFor="category" className="block text-sm font-medium mb-2">
								Kategori Produk
							</label>
							<Input
								id="category"
								value={product.category}
								placeholder="Masukkan kategori produk"
								onChange={(e) => handleInputChange('category', e.target.value)}
								disabled={loading}
								required
							/>
						</div>

						<div>
							<label htmlFor="image" className="block text-sm font-medium mb-2">
								URL Gambar Produk
							</label>
							<Input
								id="image"
								value={product.image}
								type="url"
								placeholder="https://example.com/image.jpg"
								onChange={(e) => handleInputChange('image', e.target.value)}
								disabled={loading}
							/>
						</div>

						<div>
							<label htmlFor="description" className="block text-sm font-medium mb-2">
								Deskripsi Produk
							</label>
							<Textarea
								id="description"
								value={product.description}
								placeholder="Masukkan deskripsi produk"
								onChange={(e) => handleInputChange('description', e.target.value)}
								disabled={loading}
								rows={4}
								required
							/>
						</div>

						<div className="flex gap-3 pt-4">
							<Button 
								type="submit" 
								disabled={loading}
								className="flex-1"
							>
								{loading ? 'Menyimpan...' : 'Simpan Produk'}
							</Button>
							<Link href="/products-api-routes">
								<Button 
									type="button" 
									variant="outline"
									disabled={loading}
								>
									Batal
								</Button>
							</Link>
						</div>
					</form>
				</CardContent>
			</Card>
		</section>
	)
}