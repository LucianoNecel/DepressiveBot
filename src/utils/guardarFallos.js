const fs = require('fs');
function guardarFallos(fallos) {
    fs.writeFileSync(fallosFilePath, JSON.stringify(fallos, null, 4));
}

module.exports = {guardarFallos};