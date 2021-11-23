const mongoose = require("mongoose")
require("dotenv").config()// confg variables de entorno
mongoose.connect(process.env.MONGODB_URL)
const express = require("express")// cargar libreria express
const app = express()// inicializar la app express
const port = 4001//puerto de iniializado
const gameRouter = require("./src/game")
const playerRouter = require("./src/player")
const cors = require("cors")
app.use(express.json())// que el servidor acepte peticiones json
app.use(cors())
app.use(gameRouter)
app.use(playerRouter)
app.listen(port,()=>{
    console.log("servidor iniciado en el puerto: ",port)
})


