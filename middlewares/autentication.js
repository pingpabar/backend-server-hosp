var jwt = require('jsonwebtoken');

var SEED = require('../config/config').SEED;


// ===============================================
// Verificar token ( Middleware ) <-- el problema es q esto es poco flexible
// ===============================================
exports.verificaToken = function(req, res, next) {

    var token = req.query.token;

    jwt.verify(token, SEED, (err, decoded) => {
        if (err) {
            return res.status(401).json({
                ok: false,
                mensaje: 'Token incorrecto',
                errors: err
            });
        }

        req.usuario = decoded.usuario;

        next(); // Si ok -> que siga con la función que toca
    });
}