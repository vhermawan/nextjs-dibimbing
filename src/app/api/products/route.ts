import { NextRequest, NextResponse } from 'next/server'

const BASE_API = 'https://fakestoreapi.com/products'

export type Product = {
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

// GET - Fetch all products
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const limit = searchParams.get('limit')
    const sort = searchParams.get('sort')
    
    // Build URL with query parameters
    let url = BASE_API
    const params = new URLSearchParams()
    
    if (limit) params.append('limit', limit)
    if (sort) params.append('sort', sort)
    
    if (params.toString()) {
      url += `?${params.toString()}`
    }

    const res = await fetch(url, {
      next: { revalidate: 60 } // Cache for 60 seconds
    })

    if (!res.ok) {
      return NextResponse.json(
        { error: 'Failed to fetch products' },
        { status: res.status }
      )
    }

    const data: Product[] = await res.json()
    
    return NextResponse.json(data, {
      status: 200,
      headers: {
        'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300'
      }
    })
  } catch (error) {
    console.error('Error fetching products:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// POST - Create a new product (for testing purposes)
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    const res = await fetch(BASE_API, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body)
    })

    if (!res.ok) {
      return NextResponse.json(
        { error: 'Failed to create product' },
        { status: res.status }
      )
    }

    const data = await res.json()
    return NextResponse.json(data, { status: 201 })
  } catch (error) {
    console.error('Error creating product:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// DELETE - Delete a product
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    
    if (!id) {
      return NextResponse.json(
        { error: 'Product ID is required' },
        { status: 400 }
      )
    }

    const res = await fetch(`${BASE_API}/${id}`, {
      method: 'DELETE'
    })

    if (!res.ok) {
      return NextResponse.json(
        { error: 'Failed to delete product' },
        { status: res.status }
      )
    }

    const data = await res.json()
    return NextResponse.json(
      { message: 'Product deleted successfully', data },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error deleting product:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}