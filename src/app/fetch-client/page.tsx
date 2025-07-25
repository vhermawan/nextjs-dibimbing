'use client';

import { useQuery } from "@tanstack/react-query";

type User = {
	id: number,
	name: string
	username: string
	address: {
		street: string
		suite: string
		city: string
		zipcode: string
		geo: {
			lat: string
			lng: string
		}
	}
}

export default function Page(){
	const fetchUsers = async (): Promise<User[]> => {
		const res = await fetch('https://jsonplaceholder.typicode.com/users')
		if (!res.ok) {
			throw new Error('Failed to fetch users')
		}
		const data = await res.json()
		return data
	}

	const { data: users = [], isLoading, error } = useQuery({
		queryKey: ['users'],
		queryFn: fetchUsers,
	})

	if (isLoading) return <p>Loading...</p>
	if (error) return <p>Error: {error.message}</p>

	return (
		<section>
			<h1>Users</h1>
			<ul>
				{users.map(user => (
					<li key={user.id}>{user.name}</li>
				))}
			</ul>
		</section>
	)
}