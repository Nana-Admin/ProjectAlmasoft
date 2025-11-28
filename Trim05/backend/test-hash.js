const bcrypt = require('bcryptjs');

// Pegá aquí el hash EXACTO que tenés en tu base de datos
const hashEnDB = "$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/1R9Y8p5e2c8y.";

const password = "123456";

console.log("Hash en DB:     ", hashEnDB);
console.log("¿Coincide con '123456': ", bcrypt.compareSync(password, hashEnDB));
console.log("Longitud del hash:", hashEnDB.length);