
async function getUsers(){
	const res = await fetch('https://jsonplaceholder.typicode.com/users', {
		cache: 'no-store',
	})
	return res.json()
}

type User = {
	id: number,
	name: string
	username: string
}

export default async function Page(){
	const users: User[] = await getUsers()
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