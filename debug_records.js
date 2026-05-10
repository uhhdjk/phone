const fs = require('fs');

// 读取 index.html 文件
const content = fs.readFileSync('d:\\桌面\\网站\\新建文件夹\\2\\wo\\index.html', 'utf8');

// 检查关键函数是否存在
const hasSaveFunction = content.includes('saveUnlockedRecords');
const hasGetFunction = content.includes('getUnlockedRecords');
const hasRenderFunction = content.includes('renderRecords');
const hasGenerateUserId = content.includes('generateUserId');

console.log('=== 代码检查结果 ===');
console.log('saveUnlockedRecords 函数存在:', hasSaveFunction);
console.log('getUnlockedRecords 函数存在:', hasGetFunction);
console.log('renderRecords 函数存在:', hasRenderFunction);
console.log('generateUserId 函数存在:', hasGenerateUserId);

// 检查 localStorage 存储键名
const hasUnlockedRecordsKey = content.includes("localStorage.setItem('unlockedRecords'");
const hasUserIdKey = content.includes("localStorage.setItem('userId'");

console.log('');
console.log('=== localStorage 键名检查 ===');
console.log('unlockedRecords 键存在:', hasUnlockedRecordsKey);
console.log('userId 键存在:', hasUserIdKey);

// 检查记录保存逻辑
const saveLogic = content.match(/unlockedRecords\.push\(\{[\s\S]*?\}\)/);
console.log('');
console.log('=== 记录保存逻辑 ===');
if (saveLogic) {
    console.log('保存记录的代码块存在');
} else {
    console.log('保存记录的代码块不存在');
}

// 检查记录渲染逻辑中的用户ID匹配
const userIdMatch = content.match(/record\.userId === userId/);
console.log('');
console.log('=== 用户ID匹配检查 ===');
if (userIdMatch) {
    console.log('用户ID匹配逻辑存在');
} else {
    console.log('用户ID匹配逻辑不存在');
}

console.log('');
console.log('=== 可能的问题分析 ===');
console.log('1. 检查 localStorage 是否已被清除');
console.log('2. 检查用户ID在保存和读取时是否一致');
console.log('3. 检查 courseId 的类型是否一致（数字 vs 字符串）');
console.log('4. 检查 recordList 元素是否存在');

// 检查 recordList 元素
const hasRecordList = content.includes('<div class="record-list" id="recordList">');
console.log('');
console.log('=== DOM 元素检查 ===');
console.log('recordList 元素存在:', hasRecordList);