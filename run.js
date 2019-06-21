var shell = require('shelljs');

shell.exec('node server/index', () => { })
shell.exec('npm run start:web', () => { })
