import { createClient } from "@sanity/client"

export const client = createClient({
    projectId: "n4lkkx59",
    dataset: "production",
    useCdn: true,
    apiVersion: "2025-02-06",
    token:'skRX08uDCRq4RFtTCaOk1xtWpwqUxrQfLMkCBaGrtJJhAmdZcq73jJz2ZdTj6WCYTKmiHs1EZSrpQcO4mhG0yfvfQnviaO0Un3j5opzB0kizGtphuAkduGNjKyptdt27D6OLr1qaioMQYyTeQMO6jymAVxenkumelOpGGlaZ2F8SDYn211ON'
})