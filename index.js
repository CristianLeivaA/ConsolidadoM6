const express = require("express")
const PORT = 3000;

let app = express()

app.get("/", (req, res) => {
    
})

let server = app.listen(PORT, () => {
    console.log('Servidor escuchando en el puerto: ${PORT}')
})