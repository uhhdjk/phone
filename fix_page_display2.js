const fs = require('fs');

// 读取文件内容
const content = fs.readFileSync('d:\\桌面\\网站\\新建文件夹\\2\\wo\\index.html', 'utf8');

// 修复各种显示问题
let fixedContent = content;

// 1. 修复导航文本
fixedContent = fixedContent.replace(/主页面\?/g, '主页');

// 2. 修复在线人数
fixedContent = fixedContent.replace(/在线人数据/g, '在线人数');

// 3. 修复搜索占位符
fixedContent = fixedContent.replace(/输入入关键字/g, '输入关键字');
fixedContent = fixedContent.replace(/招财神\?/g, '招财神');

// 4. 修复注释
fixedContent = fixedContent.replace(/<!-- 详情\?-->/g, '<!-- 详情页 -->');

// 5. 修复其他乱码
fixedContent = fixedContent.replace(/\?<\/div>/g, '</div>');
fixedContent = fixedContent.replace(/页\?<\/div>/g, '页</div>');

// 6. 修复课程数据中的乱码
fixedContent = fixedContent.replace(/122期 新&奥新【/g, '122期 新&奥新[');
fixedContent = fixedContent.replace(/】一肖一码中特/g, ']一肖一码中特');
fixedContent = fixedContent.replace(/】一码中特/g, ']一码中特');

// 写回文件
fs.writeFileSync('d:\\桌面\\网站\\新建文件夹\\2\\wo\\index.html', fixedContent, 'utf8');

console.log('页面显示问题修复完成！');