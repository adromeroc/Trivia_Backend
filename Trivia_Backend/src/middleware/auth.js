const jwt = require("jsonwebtoken")

const verifyToken = (req, res, next) => {
    try {
        const user = req.headers["user"]
        const token = req.headers["access-token"]
        if (user == null) {
            throw new Error("DEBES ENVIAR UN USUARIO")
        }
        if (token == null) {
            throw new Error("DEBES ENVIAR UN TOKEN")
        }
        const userName = jwt.verify(token, process.env.AUTH_PASSWORD)
        console.log(userName)
        if (userName._id != user) {
            throw new Error("EL TOKEN NO ES REAL")
        }
        return next()
    } catch (error) {
        return res.status(200).send({ data: { error: error.toString() }, status: false, menssage: "ERROR DE AUTENTICACIÓN" })
    }


}
module.exports = verifyToken