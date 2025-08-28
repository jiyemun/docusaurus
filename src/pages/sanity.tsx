import React from "react"
import Layout from "@theme/Layout"
import SanityDataExample from "../components/SanityDataExample"

export default function SanityPage() {
    return (
        <Layout title="Sanity Data">
        <div className="container">
            <SanityDataExample />
            </div>
            </Layout>
    )
}
