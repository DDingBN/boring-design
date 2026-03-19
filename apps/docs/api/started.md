# 快速入手 (Getting Started)

欢迎使用 **Boring Design**！这是一个基于 Web Components 和 Lit 构建的实用主义组件库。它框架无关、完全拥抱 Web 标准，并提供极佳的开发者体验。

## 1. 安装

Boring Design 支持通过 npm/pnpm/yarn 进行安装。

```bash
# 使用 pnpm (推荐)
pnpm add boring-ui

# 使用 npm
npm install boring-ui

# 使用 yarn
yarn add boring-ui
```

## 2. 引入样式

Boring Design 采用原生 CSS 变量驱动的极简 3 层 Design Tokens 架构。在使用组件前，你需要全局引入基础的 Token 样式文件。

在你的应用入口文件（如 `main.ts`、`App.vue` 或 `index.html`）中引入：

```javascript
// main.ts
import 'boring-ui/tokens.css';
```

或者在 CSS/SCSS 文件中：

```css
@import 'boring-ui/tokens.css';
```

## 3. 使用组件

Boring Design 是框架无关的，你可以像使用原生 HTML 标签一样使用它。

### 在纯 HTML 中使用

直接在 HTML 文件中引入对应的组件模块，然后像普通标签一样使用。

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <link rel="stylesheet" href="node_modules/boring-ui/tokens.css">
  <!-- 引入按钮组件 -->
  <script type="module">
    import 'boring-ui/components/button';
  </script>
</head>
<body>
  <!-- 使用自定义标签 -->
  <bd-button>默认按钮</bd-button>
  <bd-button disabled>禁用按钮</bd-button>
</body>
</html>
```

### 在 Vue / React / Angular 中使用

现代前端框架对 Web Components 有着良好的支持（React 19 已经完全原生支持）。

**Vue 示例：**

```vue
<script setup>
// 引入需要使用的组件
import 'boring-ui/components/button';
</script>

<template>
  <div class="app-container">
    <!-- 物理事件保持原生，状态事件如 change 会带有 bd- 前缀 -->
    <bd-button @click="handleClick">主要按钮</bd-button>
  </div>
</template>
```

*(注意：物理交互事件如 click 保持原生名称；但对于组件的业务状态变更事件，由于 Boring Design 规范带有 `bd-` 前缀，如 `@bd-change`，在框架中监听时请使用对应的前缀语法)*

## 4. 暗黑模式

Boring Design 开箱即用支持暗黑模式。你无需在组件级别做任何处理，只需在应用的根节点（通常是 `<html>` 或 `<body>`）添加 `data-theme="dark"` 属性即可自动切换所有组件的主题。

```html
<!-- 切换到暗黑模式 -->
<html data-theme="dark">
...
</html>
```

## 5. 核心理念提示

- **HTML 优先**：尽量使用属性 (Attributes) 传递基础数据。
- **插槽驱动**：对于复杂的组件内部结构，优先使用 `<slot>` 而不是传递复杂的 JSON 配置。
- **拥抱原生**：表单组件已无缝接入原生 `<form>` 系统，支持原生回车提交和表单验证。

现在，去 [分类导航](./navigation.md) 看看有哪些可用的组件吧！
