const path = require('path');
const fs = require('fs');

const fallosFilePath = path.join(__dirname, 'fallos.json');
function cargarFallos() {
  try {
    const data = fs.readFileSync(fallosFilePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    return {};
  }
}

module.exports = {cargarFallos};