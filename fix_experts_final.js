const fs = require('fs');

// 读取文件内容
const content = fs.readFileSync('d:\\桌面\\网站\\新建文件夹\\2\\wo\\index.html', 'utf8');

// 创建完整的函数内容
const newFunction = `        // 渲染专家列表
        function renderExperts() {
            const container = document.getElementById('expertList');
            let html = '';
            
            experts = generateExperts();
            
            experts.forEach(function(expert, index) {
                var rankClass = 'normal';
                var rankIcon = index + 1;
                if (index === 0) {
                    rankClass = 'gold';
                    rankIcon = '\\uD83E\\uDD47';
                } else if (index === 1) {
                    rankClass = 'silver';
                    rankIcon = '\\uD83E\\uDD48';
                } else if (index === 2) {
                    rankClass = 'bronze';
                    rankIcon = '\\uD83E\\uDD49';
                }
                
                html += '<div class="expert-card">' +
                    '<div class="rank-badge ' + rankClass + '">' + rankIcon + '</div>' +
                    '<div class="expert-avatar">' +
                        '<img src="https://cdn.jsdelivr.net/gh/uhhdjk/phone@main/微信图片_20260503232606_1087_130.jpg" alt="Logo">' +
                        '<span class="cert-badge">证</span>' +
                    '</div>' +
                    '<div class="expert-info">' +
                        '<div class="expert-name">' + expert.name + '</div>' +
                        '<div class="expert-cert">认证专家</div>' +
                    '</div>' +
                    '<div style="text-align: right;">' +
                        '<div class="hit-count">' + expert.hits + '</div>' +
                        '<div class="hit-label">连中</div>' +
                    '</div>' +
                '</div>';
            });
            container.innerHTML = html;
        }`;

// 使用正则表达式替换整个函数
const regex = /\/\/ 渲染专家列表[\s\S]*?function renderExperts\(\)[\s\S]*?container\.innerHTML = html;\s*?\}/;
const fixedContent = content.replace(regex, newFunction);

// 写回文件
fs.writeFileSync('d:\\桌面\\网站\\新建文件夹\\2\\wo\\index.html', fixedContent, 'utf8');

console.log('修复完成！');