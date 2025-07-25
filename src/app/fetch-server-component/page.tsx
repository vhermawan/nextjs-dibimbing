
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

async function getUsers(): Promise<User[]> {
	const res = await fetch('https://jsonplaceholder.typicode.com/users')
	return res.json()
}

export default async function Page(){
	const users = await getUsers()
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