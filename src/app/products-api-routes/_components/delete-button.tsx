'use client';
import { Product } from "@/app/api/products/route";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

async function deleteProduct(productId: number): Promise<{ message: string; data: Product }> {
	try {
		const response = await fetch(`/api/products/${productId}`, {
			method: 'DELETE',
		})

		if (!response.ok) {
			const errorData = await response.json()
			throw new Error(errorData.error || 'Failed to delete product')
		}

		return response.json()
	} catch (error) {
		throw error
	}
}

type DeleteButtonProps = {
	productId: number
}

export function DeleteButton({productId}: DeleteButtonProps){
	const router = useRouter()
	const [open, setOpen] = useState(false)
	const [loading, setLoading] = useState(false)

	const handleDelete = async (productId: number) => {
		setLoading(true)
		try {
			await deleteProduct(productId)
			toast.success('Produk berhasil dihapus')
			
			setOpen(false)
			
			router.refresh()
		} catch (error) {
			console.error('Delete error:', error)
			toast.error(error instanceof Error ? error.message : 'Gagal menghapus produk')
		} finally {
			setLoading(false)
		}
	}

	return (
		<>
			<Button className="bg-red-400" onClick={() => setOpen(true)}>
				<Trash />
			</Button>
			<AlertDialog open={open} onOpenChange={setOpen}>
				<AlertDialogContent>
					<AlertDialogHeader>
						<AlertDialogTitle>Anda yakin ingin menghapus produk?</AlertDialogTitle>
						<AlertDialogDescription>
							Tindakan ini tidak dapat dibatalkan. Ini akan menghapus produk Anda secara permanen
							dan menghapus data Anda dari server kami.
						</AlertDialogDescription>
					</AlertDialogHeader>
					<AlertDialogFooter>
						<AlertDialogCancel>Batal</AlertDialogCancel>
						<AlertDialogAction onClick={() => handleDelete(productId)}>{loading ? 'Menghapus...' : 'Lanjutkan'}</AlertDialogAction>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
		</>
	)
}