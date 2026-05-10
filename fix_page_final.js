const fs = require('fs');

// 读取文件内容
const content = fs.readFileSync('d:\\桌面\\网站\\新建文件夹\\2\\wo\\index.html', 'utf8');

// 修复各种显示问题
let fixedContent = content;

// 1. 修复导航文本中的HTML标签问题
fixedContent = fixedContent.replace(/主页\/div>/g, '主页</div>');

// 2. 修复搜索占位符末尾
fixedContent = fixedContent.replace(/如：金手指、招财神 oninput/g, '如：金手指、招财神】" oninput');

// 3. 修复专家页面的导航
fixedContent = fixedContent.replace(/主页\/div>/g, '主页</div>');

// 写回文件
fs.writeFileSync('d:\\桌面\\网站\\新建文件夹\\2\\wo\\index.html', fixedContent, 'utf8');

console.log('页面显示问题修复完成！');