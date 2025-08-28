import React, { useEffect, useState } from "react";
import { client } from "../lib/sanityClient";
import { PortableText } from "@portabletext/react";

export default function SanityDataExample() {
    const [posts, setPosts] = useState<any[]>([]);

    useEffect(() => {
        client
            .fetch(`*[_type == "post"]{title, slug, body}`)
            .then(setPosts)
            .catch(console.error);
    }, []);

    return (
        <div>
            <h2>Sanity Posts</h2>
            <ul>
                {posts.map((p) => (
                    <li key={p.slug.current}>
                        <h3>{p.title}</h3>

                        {/* PortableText → 실제 HTML 태그로 렌더링됨 */}
                        <PortableText value={p.body} />
                    </li>
                ))}
            </ul>
        </div>
    );
}
