'use server';

import prisma from '@/lib/prisma'
import { Product } from '@prisma/client';

export async function getProducts(): Promise<Product[]> {
	try {
    return await prisma.product.findMany({
      where: {
        deletedAt: null
      },
      orderBy: {
        createdAt: 'desc'
      }
    })
    
  } catch (error) {
   throw error
  }
}

export async function getProduct(id: string): Promise<Product | null> {
	try {
		const product = await prisma.product.findUnique({
			where: {
				id
			}
		})

		return product
	} catch (error) {
		throw error
	}
}

type ProductResponse = {
  success: boolean
  data?: Product
  error?: string
}

export async function createProduct(formData: FormData): Promise<ProductResponse> {
	try {
		const formDataObject = {
      name: formData.get('name'),
      description: formData.get('description'),
		}

		const product = await prisma.product.create({
			data: {
				name: formDataObject.name as string,
				description: formDataObject.description as string
			}
		})

		return { success: true, data: product }
	} catch (error) {
		return { success: false, error: error instanceof Error ? error.message : 'Something went wrong' }
	}
}

export async function updateProduct(formData: FormData, productId: string): Promise<ProductResponse> {
	try {
		const formDataObject = {
      name: formData.get('name'),
      description: formData.get('description'),
		}

		const product = await prisma.product.update({
			where: {
				id: productId
			},
			data: {
				name: formDataObject.name as string,
				description: formDataObject.description as string
			}
		})

		return { success: true, data: product }
	} catch (error) {
		return { success: false, error: error instanceof Error ? error.message : 'Something went wrong' }
	}
}

export async function deleteProduct(productId: string): Promise<ProductResponse> {
	try {
		const product = await prisma.product.update({
			where: {
				id: productId
			},
			data: {
				deletedAt: new Date()
			}
		})

		return { success: true, data: product }
	} catch (error) {
		return {
      success: false,
      error: error instanceof Error ? error.message : 'Something went wrong',
    }
	}
}