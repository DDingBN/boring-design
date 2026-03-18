# 🎨 Boring Design

> A pragmatic, native-first Web Components library built with [Lit](https://lit.dev/).
> 
> **极简、原生、拒绝过度工程化。**

## ✨ Features (核心特性)

- 🧱 **Native First**: 基于 Web Components 标准，在任何框架 (React, Vue, Svelte) 中都能无缝运行。
- ⚡ **Lightweight**: 零运行时依赖（除了 Lit），极致轻量。
- 🎨 **Themable**: 基于 CSS Variables 的 Design Tokens 系统，轻松定制主题。
- ♿ **Accessible**: 遵循 WAI-ARIA 标准，内置键盘导航支持。
- 🛠️ **Developer Experience**: TypeScript 编写，提供完整的类型定义。

## 📦 Installation (安装)

```bash
npm install boring-ui
# or
pnpm add boring-ui
```

## 🚀 Usage (使用)

### 1. 快速上手 (整包引入)

适合快速原型开发，一次性注册所有组件。

```javascript
import 'boring-ui';
```

```html
<bd-button>Button</bd-button>
<bd-input placeholder="Input..."></bd-input>
```

### 2. 按需引入 (推荐)

仅引入你需要的组件，以减小打包体积。

```javascript
import 'boring-ui/components/button.js';
import 'boring-ui/components/input.js';
```

### Framework Integration (框架集成)

Boring Design 组件是标准的 HTML 元素，你可以像使用 `<div>` 一样直接使用它们。

## 📖 Documentation (文档)

- [在线文档 (Coming Soon)](#)
- [Design System (设计规范)](./repo-standards/style-guide.md)
- [Component Guide (组件开发规范)](./repo-standards/lit-components-guide.md)

## ⌨️ Development (本地开发)

如果你想参与开发或自行构建，请参考我们的开发指南：

👉 **[Development Guide (开发手册)](./repo-standards/development.md)**

简要步骤：

```bash
# 1. Clone repo
git clone https://github.com/your-username/boring-design.git

# 2. Install dependencies
pnpm install

# 3. Start development server
pnpm dev
```

## 📄 License

MIT
