# 图片压缩工具

一个简洁优雅的在线图片压缩工具，采用现代设计风格，帮助用户轻松压缩图片文件。

## 在线体验

访问 [图片压缩工具](https://raze98.github.io/yasuotupian/) 立即使用

## 功能特点

- ✨ 简洁现代的界面设计
- 📱 完美支持移动端
- 🖼️ 支持多种图片格式（PNG、JPG、JPEG、WebP）
- 🎚️ 可自定义压缩质量（1-100%）
- 👀 实时预览压缩效果
- 📊 显示压缩前后的文件大小
- 📥 支持单张/批量下载
- 🖱️ 支持拖拽上传
- 🚀 使用 WebWorker 实现，不阻塞主线程

## 使用方法

1. 打开网页
2. 点击上传区域或拖拽图片到上传区域
3. 调整压缩质量滑块（默认80%）
4. 查看压缩效果和文件大小变化
5. 点击下载按钮保存压缩后的图片

## 技术栈

- HTML5
- CSS3 
- JavaScript ES6+
- [browser-image-compression](https://www.npmjs.com/package/browser-image-compression)
- [FileSaver.js](https://github.com/eligrey/FileSaver.js/)

## 本地开发

1. 克隆项目
```bash
git clone https://github.com/你的用户名/yasuotupian.git
cd yasuotupian
```

2. 使用 VSCode 或其他编辑器打开项目

3. 在浏览器中打开 index.html 即可预览

## 项目结构

```
yasuotupian/
├── index.html          # 主页面
├── css/               
│   └── style.css      # 样式文件
├── js/
│   └── main.js        # 交互逻辑
└── README.md          # 项目说明
```

## 浏览器支持

- Chrome (最新版本)
- Firefox (最新版本)
- Safari (最新版本)
- Edge (最新版本)

## 贡献指南

1. Fork 本仓库
2. 创建你的特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交你的更改 (`git commit -m '添加一些特性'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启一个 Pull Request

## 更新日志

### v1.0.0 (2024-03-xx)
- 🎉 首次发布
- ✨ 基础图片压缩功能
- 🎨 现代化界面设计

## 开源协议

本项目采用 MIT 协议开源，详情请参阅 [LICENSE](LICENSE) 文件。

## 作者

- GitHub: [@你的GitHub用户名](https://github.com/你的用户名)

## 致谢

- [browser-image-compression](https://www.npmjs.com/package/browser-image-compression) - 提供图片压缩功能
- [FileSaver.js](https://github.com/eligrey/FileSaver.js/) - 提供文件保存功能
