// 赋值的操作是在顶层的
// module.exports = exports;

// exports = 123;

const fs = require('fs');
const path = require('path');

const srcDir = process.argv[2];
const destDir = process.argv[3];

let i = 0;

while (i < 30) {
  i++;
  const num = 'day' + (i + '').padStart(2, 0);
  const srcPath = path.resolve(srcDir, num);
  const destPath = path.resolve(destDir, num);
  if (fs.existsSync(destPath)) continue;
  fs.mkdir(destPath, (err) => {
    if (!err) console.log("文件创建成功开始拷贝:", num);

    // 遍历目录下所有的文件
    const srcFiles = fs.readdirSync(srcPath);
    for (const file of srcFiles) {
      if (file.endsWith('.mp4')) {
        const srcFile = path.resolve(srcPath, file);
        const destFile = path.resolve(destPath, file);
        fs.copyFileSync(srcFile, destFile);
        console.log(file, "拷贝成功");
      }
    }
  })
}

