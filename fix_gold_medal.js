const fs = require('fs');

// 读取文件内容
const content = fs.readFileSync('d:\\桌面\\网站\\新建文件夹\\2\\wo\\index.html', 'utf8');

// 修复金牌图标
const fixedContent = content.replace(
    'if (index === 0) {\n                    rankClass = \'gold\';\n                } else',
    'if (index === 0) {\n                    rankClass = \'gold\';\n                    rankIcon = \'\\uD83E\\uDD47\';\n                } else'
);

// 写回文件
fs.writeFileSync('d:\\桌面\\网站\\新建文件夹\\2\\wo\\index.html', fixedContent, 'utf8');

console.log('金牌图标修复完成！');