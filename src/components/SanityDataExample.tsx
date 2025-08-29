import React, { useEffect, useState } from "react";
import { client } from "../lib/sanityClient";
import { PortableText } from "@portabletext/react";

// Docusaurus 탭 컴포넌트
import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

import Prism from "prismjs";
import "prismjs/themes/prism.css";

import imageUrlBuilder from "@sanity/image-url";

export default function SanityDataExample() {
    const [posts, setPosts] = useState<any[]>([]);

    // Sanity 이미지 URL 빌더
    const builder = imageUrlBuilder(client);
    function urlFor(source: any) {
        return builder.image(source);
    }

    // Sanity 데이터 가져오기
    useEffect(() => {
        client
            .fetch('*[_type == "post"] | order(_createdAt asc){slug, body}')
            .then(setPosts)
            .catch(console.error);
    }, []);

    // 코드 하이라이트
    useEffect(() => {
        Prism.highlightAll();
    }, [posts]);

    // PortableText 컴포넌트 재사용용
    const portableTextComponents = {
        types: {
            code: ({ value }: any) => (
                <pre>
          <code className={`language-${value.language || "js"}`}>
            {value.code}
          </code>
        </pre>
            ),
            image: ({ value }: any) => {
                if (!value?.asset?._ref) return null;
                return (
                    <img
                        src={urlFor(value).width(800).url()}
                        alt={value.alt || ""}
                        style={{ maxWidth: "100%" }}
                    />
                );
            },
            tabSection: ({ value }: any) => (
                <Tabs>
                    {value.tabs.map((tab: any) => (
                        <TabItem key={tab._key} value={tab.label} label={tab.label}>
                            {/* 탭 안에서도 동일한 컴포넌트 재사용 */}
                            <PortableText value={tab.content} components={portableTextComponents} />
                        </TabItem>
                    ))}
                </Tabs>
            ),
        },
    };

    return (
        <div>
            {/*<h2>Sanity Posts</h2>*/}
            <ul>
                {posts.map((p) => (
                    <li key={p.slug.current}>
                        <h3>{p.title}</h3>
                        <PortableText
                            value={p.body}
                            components={portableTextComponents}
                        />
                    </li>
                ))}
            </ul>
        </div>
    );
}
