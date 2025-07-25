'use client';
import { deleteProduct } from "@/_actions/product";
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

type DeleteButtonProps = {
	productId: string
}

export function DeleteButton({productId}: DeleteButtonProps){
	const router = useRouter()
	const [open, setOpen] = useState(false)

	const handleDelete = async (productId: string) => {
		const deletedProduct = await deleteProduct(productId)
		if(deletedProduct.success){
			toast.success('Produk berhasil dihapus')
			router.refresh()
		} else {
			toast.error(deletedProduct.error)
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
						<AlertDialogAction onClick={() => handleDelete(productId)}>Lanjutkan</AlertDialogAction>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
		</>
	)
}