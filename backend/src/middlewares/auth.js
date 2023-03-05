const jwt = require('jsonwebtoken')


//===================================Authentication======================================================

const authentication = (req, res, next) => {
    try {
        let token = req.headers["authorization"].split(' ')
        token = token[1]
        if (!token) return res.status(400).send({ status: false, message: "Token must be present, choose bearer token" })

        jwt.verify(token, 'palnesto', function (err, decode) {
            if (err) {
                return res.status(401).send({ status: false, message: err.message })
            } else {

                req.decodedToken = decode;
                next()
            }
        })
    } catch (err) {
        res.status(500).send({ status: false, message: err.message })
    }
}

module.exports ={authentication}