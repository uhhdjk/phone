const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

// 允许跨域请求
app.use(cors());
app.use(express.json());

// 密码生成算法（与前端相同）
// 使用当天日期 + 课程ID生成6位密码
function generatePassword(courseId) {
    const now = new Date();
    const dateStr = `${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, '0')}${String(now.getDate()).padStart(2, '0')}`;
    // 使用日期哈希 + 课程ID生成6位密码
    const hash = parseInt(dateStr) * 1000 + courseId * 7 + 123456;
    return String(hash).slice(-6);
}

// 获取当天结束时间（23:59:59）
function getTodayEndTime() {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59).getTime();
}

// 密码过期时间（每天23:59:59过期）
let passwordExpireTime = getTodayEndTime();

// 定时检查是否需要更新过期时间（每分钟检查一次）
setInterval(() => {
    const now = Date.now();
    if (now > passwordExpireTime) {
        // 更新过期时间到第二天
        passwordExpireTime = getTodayEndTime();
        console.log('🔄 日期已更新，密码已自动刷新');
    }
}, 60000);

// 1. 服务器状态接口
app.get('/api/status', (req, res) => {
    res.json({ 
        success: true, 
        expireTime: passwordExpireTime,
        expireTimeFormatted: new Date(passwordExpireTime).toLocaleString('zh-CN')
    });
});

// 2. 获取单门课程密码
app.get('/api/password', (req, res) => {
    const courseId = parseInt(req.query.courseId);
    const password = generatePassword(courseId);
    res.json({ success: true, password: password });
});

// 3. 获取所有课程密码（作者管理用）
app.get('/api/passwords', (req, res) => {
    const result = [];
    for (let i = 1; i <= 37; i++) {
        result.push({
            id: i,
            password: generatePassword(i)
        });
    }
    res.json({ success: true, courses: result, expireTime: passwordExpireTime });
});

// 3.1 获取课程密码和名称列表（包含课程名称）
app.post('/api/passwords-with-names', (req, res) => {
    const courseNames = req.body.courseNames || {};
    const result = [];
    // 动态获取课程数量，确保与前端同步
    const maxCourseId = Math.max(...Object.keys(courseNames).map(Number), 37);
    for (let i = 1; i <= maxCourseId; i++) {
        result.push({
            id: i,
            name: courseNames[i] || `课程 ${i}`,
            password: generatePassword(i)
        });
    }
    res.json({ success: true, courses: result, expireTime: passwordExpireTime });
});

// 4. 批量生成新密码（其实不需要，因为密码是算法生成的）
app.post('/api/generate-all', (req, res) => {
    // 密码由算法生成，无需重新生成
    res.json({ success: true, message: "密码由日期算法自动生成，无需手动刷新" });
});

// 5. 生成单个课程新密码
app.post('/api/generate', (req, res) => {
    const courseId = parseInt(req.body.courseId);
    if (isNaN(courseId)) {
        return res.json({ success: false, message: "课程ID无效" });
    }
    const password = generatePassword(courseId);
    res.json({ success: true, password: password });
});

// 6. 学员验证接口
app.post('/api/verify', (req, res) => {
    const { courseId, password } = req.body;
    
    // 检查密码是否过期
    if (Date.now() > passwordExpireTime) {
        res.json({ success: false, isExpired: true, message: "密码已过期" });
        return;
    }
    
    const expectedPassword = generatePassword(courseId);
    
    if (password === expectedPassword) {
        res.json({ success: true, message: "验证成功", expireTime: passwordExpireTime });
    } else {
        res.json({ success: false, isExpired: false, message: "密码错误" });
    }
});

// 7. 重置过期时间（手动触发，用于测试）
app.post('/api/reset-expire', (req, res) => {
    passwordExpireTime = getTodayEndTime();
    res.json({ success: true, message: "过期时间已重置", expireTime: passwordExpireTime });
});

// 启动服务器
app.listen(port, () => {
    console.log("==================================");
    console.log("✅ 服务器已启动 | 使用日期算法生成密码");
    console.log("地址: http://localhost:" + port);
    console.log("密码过期时间: " + new Date(passwordExpireTime).toLocaleString('zh-CN'));
    console.log("今日密码示例: 课程ID 1 → " + generatePassword(1));
    console.log("==================================");
});