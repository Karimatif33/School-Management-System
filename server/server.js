require('dotenv').config()
const http = require('http')
const app = require("./app/app")
require('./config/dbConnect')
const PORT = process.env.Port || 5000





// server Run
const server = http.createServer(app)
server.listen(PORT, () => {
    console.log(`Server up an runing on http://localhost:${PORT}`); 
}) 