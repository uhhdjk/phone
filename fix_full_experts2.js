const fs = require('fs');

// 读取文件内容
const content = fs.readFileSync('d:\\桌面\\网站\\新建文件夹\\2\\wo\\index.html', 'utf8');

// 找到函数的开始位置（包括前面的空行）
const startPattern = /\n{2,}\s{8}// 渲染专家列表/;
const startMatch = content.match(startPattern);
const startIndex = content.indexOf(startMatch[0]);

// 找到函数的结束位置
const endPattern = /container\.innerHTML = html;\s*?}\s*?\n\n\s{8}// 渲染解锁记录/;
const endMatch = content.match(endPattern);
const endIndex = content.indexOf(endMatch[0]);

if (startIndex === -1 || endIndex === -1) {
    console.log('无法找到函数位置');
    process.exit(1);
}

// 创建完整的函数内容
const newFunction = '\n\n        // 渲染专家列表\n        function renderExperts() {\n            const container = document.getElementById(\'expertList\');\n            let html = \'\';\n            \n            experts = generateExperts();\n            \n            experts.forEach(function(expert, index) {\n                var rankClass = \'normal\';\n                var rankIcon = index + 1;\n                if (index === 0) {\n                    rankClass = \'gold\';\n                    rankIcon = \'\\uD83E\\uDD47\';\n                } else if (index === 1) {\n                    rankClass = \'silver\';\n                    rankIcon = \'\\uD83E\\uDD48\';\n                } else if (index === 2) {\n                    rankClass = \'bronze\';\n                    rankIcon = \'\\uD83E\\uDD49\';\n                }\n                \n                html += \'<div class="expert-card">\';\n                html += \'    <div class="rank-badge \' + rankClass + \'">\' + rankIcon + \'</div>\';\n                html += \'    <div class="expert-avatar">\';\n                html += \'        <img src="https://cdn.jsdelivr.net/gh/uhhdjk/phone@main/微信图片_20260503232606_1087_130.jpg" alt="Logo">\';\n                html += \'        <span class="cert-badge">证</span>\';\n                html += \'    </div>\';\n                html += \'    <div class="expert-info">\';\n                html += \'        <div class="expert-name">\'+ expert.name + \'</div>\';\n                html += \'        <div class="expert-cert">认证专家</div>\';\n                html += \'    </div>\';\n                html += \'    <div style="text-align: right;">\';\n                html += \'        <div class="hit-count">\'+ expert.hits + \'</div>\';\n                html += \'        <div class="hit-label">连中</div>\';\n                html += \'    </div>\';\n                html += \'</div>\';\n            });\n            container.innerHTML = html;\n        }\n';

// 构建新内容
const fixedContent = content.substring(0, startIndex) + newFunction + '        // 渲染解锁记录' + content.substring(endIndex + 'container.innerHTML = html;\s*?}\s*?\n\n        // 渲染解锁记录'.length);

// 写回文件
fs.writeFileSync('d:\\桌面\\网站\\新建文件夹\\2\\wo\\index.html', fixedContent, 'utf8');

console.log('专家列表函数修复完成！');