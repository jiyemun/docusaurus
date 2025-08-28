import React, { useEffect, useState } from "react"
import { client } from "../lib/sanityClient"

export default function SanityDataExample() {
    const [posts, setPosts] = useState<any[]>([])

    useEffect(() => {
        client.fetch(`*[_type == "post"]{title, slug}`)
            .then(setPosts)
            .catch(console.error)
    }, [])

    return (
        <div>
            <h2>Sanity Posts</h2>
            <ul>
                {posts.map((p) => (
                    <li key={p.slug.current}>{p.title}</li>
                ))}
            </ul>
        </div>
    )
}
