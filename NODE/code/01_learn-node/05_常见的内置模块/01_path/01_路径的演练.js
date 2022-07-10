const path = require('path');

const basePath = '/User/why';
const filename = 'abc.txt';

// const path = basePath + "/" + filename;

const filepath = path.resolve(basePath, filename);
console.log(filepath);

