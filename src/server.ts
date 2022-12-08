import app from "./app.js"

const POSTGRES_HOST = process.env.POSTGRES_HOST || "localhost"
const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    console.log(`server open in: ${POSTGRES_HOST}://${PORT}`)
})