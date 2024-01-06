export async function POST(req) {
    
    if (req.method === "POST") {
        const body = await req.json()
        const user = users.find(user => user.name)
		try {

		} catch (error) {}
	} else {
		redirect("/signup")
	}

	console.log(users)

	return Response.json(users)
}