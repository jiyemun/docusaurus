import React, { useEffect, useState } from "react";
import { client } from "../lib/sanityClient";
import { PortableText } from "@portabletext/react";

// Docusaurus 탭 컴포넌트
import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

import Prism from "prismjs";
import "prismjs/themes/prism.css";

export default function SanityDataExample() {
    const [posts, setPosts] = useState<any[]>([]);

    useEffect(() => {
        client
            .fetch(`*[_type == "post"]{title, slug, body}`)
            .then(setPosts)
            .catch(console.error);
    }, []);

    useEffect(() => {
        Prism.highlightAll(); // 새 코드 들어올 때마다 실행
    }, [posts]);

    return (
        <div>
            <h2>Sanity Posts</h2>
            <ul>
                {posts.map((p) => (
                    <li key={p.slug.current}>
                        <h3>{p.title}</h3>

                        <PortableText
                            value={p.body}
                            components={{
                                types: {
                                    // Tab Section → Docusaurus Tabs로 변환
                                    tabSection: ({ value }) => (
                                        <Tabs>
                                            {value.tabs.map((tab: any) => (
                                                <TabItem key={tab._key} value={tab.label} label={tab.label}>
                                                    <PortableText value={tab.content} />
                                                </TabItem>
                                            ))}
                                        </Tabs>
                                    ),

                                    // Code Block → Docusaurus 코드 스타일
                                    code: ({ value }) => (
                                        <pre>
                      <code className={`language-${value.language || "js"}`}>
                        {value.code}
                      </code>
                    </pre>
                                    ),
                                },
                            }}
                        />
                    </li>
                ))}
            </ul>
        </div>
    );
}
