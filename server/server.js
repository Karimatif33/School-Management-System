const http = require('http')
const app = require("./app/app")
const PORT = process.env.Port || 5000
// const dbConnect = require("./config/db")
















// server Run
const server = http.createServer(app)
server.listen(PORT, () => {
    console.log(`Server up an runing on http://localhost:${PORT}`);
    // dbConnect()
}) 