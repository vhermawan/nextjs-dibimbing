'use client';

import { useEffect, useState } from "react";

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
	const [users, setUsers] = useState<User[]>([])
	const [loading, setLoading] = useState(false)

	useEffect(() => {
		setLoading(true)
		const fetchUsers = async () => {
			const res = await fetch('https://jsonplaceholder.typicode.com/users')
			const data = await res.json()
			setUsers(data)
			setLoading(false)
		}

		fetchUsers()
	}, [])

	if(loading) return <p>Loading...</p>

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