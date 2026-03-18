# 🎨 Boring Design 样式规范指南 (Style Guide)

> **核心理念**：实用主义优先，极佳的开发者体验 (DX)，拒绝过度工程化。
> 我们完全拥抱原生 CSS 能力（CSS Variables），不引入复杂的构建步骤或 JS 运行时。

---

## 1. Design Tokens 架构

我们采用**“极简 3 层架构”**。所有 Token 均定义在 `packages/tokens/tokens.css` 单一文件中。

### 1.1 基础层 (Global Tokens)
*   **定位**：客观物理量（调色板、间距尺、圆角、阴影）。**没有任何业务语义**。
*   **命名格式**：`--bd-{属性}-{刻度}`
*   **示例**：
    *   `--bd-blue-500` (颜色)
    *   `--bd-space-4` (间距)
    *   `--bd-radius-md` (圆角)

### 1.2 语义层 (Semantic Tokens) —— **核心层**
*   **定位**：赋予基础层业务意图。**这是处理暗黑模式的唯一场所**。
*   **原则**：组件开发应 99% 使用此层 Token。
*   **命名格式**：`--bd-{类别}-{意图}`
*   **示例**：
    *   `--bd-color-primary` (主色)
    *   `--bd-bg-base` (基础背景色)
    *   `--bd-text-muted` (次要文本色)
    *   `--bd-border-base` (基础边框色)

### 1.3 组件层 (Component Tokens) —— **按需且克制**
*   **定位**：仅用于“极大概率需要被外部使用者覆盖”的特定组件级样式。
*   **原则**：**非必要不创建**。严禁为组件的每一个 CSS 属性都硬性规定一个 Token。
*   **实现方式**：在组件 CSS 中定义，作为 CSS 变量的第一个参数（Fallback 为 Semantic Token）。
*   **示例**：
    *   `--bd-button-bg` (按钮背景定制位)

---

## 2. 组件样式开发指南

### 2.1 引用原则
在开发组件（如 `packages/components`）时，遵循以下优先级：

1.  **优先使用 Semantic Tokens**：
    ```css
    /* ✅ 正确 */
    color: var(--bd-text-primary);
    background: var(--bd-bg-base);
    border: 1px solid var(--bd-border-base);
    ```

2.  **物理量直接引用 Global Tokens**（仅限间距、圆角等通用属性）：
    ```css
    /* ✅ 正确 */
    padding: var(--bd-space-2) var(--bd-space-4);
    border-radius: var(--bd-radius-md);
    ```

3.  **暴露定制能力 (Component Tokens)**：
    仅在确信用户需要修改该值时，才暴露新的变量。
    ```css
    /* ✅ 正确：提供 Semantic Token 作为默认值 */
    background: var(--bd-button-primary-bg, var(--bd-color-primary));

    /* ❌ 错误：硬编码颜色 */
    background: #3b82f6; 

    /* ❌ 错误：过度设计，没有提供 Fallback 或默认值不合理 */
    background: var(--component-button-bg); 
    ```

### 2.2 完整示例 (Button)

```typescript
import { css } from "lit";

export const buttonStyles = css`
  :host {
    display: inline-block;
  }

  .button {
    /* 引用 Global Tokens */
    border-radius: var(--bd-button-radius, var(--bd-radius-md));
    padding: var(--bd-space-2) var(--bd-space-4);
    
    /* 引用 Semantic Tokens */
    border: 1px solid transparent;
    transition: all 0.2s ease-in-out;
  }

  /* Primary 变体 */
  .button--primary {
    /* 暴露组件级 Token，默认回退到 Semantic Token */
    background-color: var(--bd-button-primary-bg, var(--bd-color-primary));
    color: var(--bd-button-primary-text, var(--bd-color-on-primary));
  }

  .button--primary:hover {
    background-color: var(--bd-button-primary-bg-hover, var(--bd-color-primary-hover));
  }

  /* Default 变体 */
  .button--default {
    background-color: transparent;
    border-color: var(--bd-button-default-border, var(--bd-border-base));
    color: var(--bd-button-default-text, var(--bd-text-primary));
  }
`;
```

---

## 3. 暗黑模式 (Dark Mode)

我们采用原生 CSS 级联特性实现暗黑模式。

*   **机制**：`tokens.css` 中包含 `[data-theme="dark"]` 和 `.dark` 选择器。
*   **开发者职责**：
    *   **不要**在组件代码中编写 `media (prefers-color-scheme: dark)`。
    *   **不要**在组件代码中手动判断主题。
    *   **只需**使用 Semantic Tokens（如 `var(--bd-bg-base)`），浏览器会自动根据当前主题上下文计算出正确的值。

```css
/* tokens.css 内部实现示意 */
:root {
  --bd-bg-base: var(--bd-white); /* 浅色默认 */
}

[data-theme="dark"] {
  --bd-bg-base: var(--bd-neutral-900); /* 深色覆写 */
}
```

---

## 4. 通用规范索引

### 4.1 颜色 (Colors)
*   **Primary**: Blue (`--bd-blue-*`)
*   **Neutral**: Grays (`--bd-neutral-*`)
*   **Feedback**:
    *   Success: Green
    *   Warning: Yellow
    *   Error: Red
    *   Info: Blue

### 4.2 间距 (Spacing)
采用 4px 网格系统。
*   `--bd-space-1`: 4px
*   `--bd-space-2`: 8px
*   `--bd-space-3`: 12px
*   `--bd-space-4`: 16px (1rem)
*   ...

### 4.3 阴影 (Shadows)
*   `--bd-shadow-sm`: 微弱阴影
*   `--bd-shadow-base`: 默认组件阴影 (Semantic)
*   `--bd-shadow-overlay`: 浮层/模态框阴影 (Semantic)

### 4.4 Z-Index 层级
请严格遵循以下层级，禁止随意使用 `z-index: 9999`。

| 变量名 | 值 | 用途 |
| :--- | :--- | :--- |
| `--bd-z-hide` | -1 | 隐藏 |
| `--bd-z-base` | 0 | 基础内容 |
| `--bd-z-dock` | 10 | 停靠栏/侧边栏 |
| `--bd-z-dropdown` | 1000 | 下拉菜单 |
| `--bd-z-sticky` | 1100 | 粘性头部 |
| `--bd-z-banner` | 1200 | 全局通知条 |
| `--bd-z-overlay` | 1300 | 遮罩层 |
| `--bd-z-modal` | 1400 | 对话框 |
| `--bd-z-popover` | 1500 | 气泡卡片 |
| `--bd-z-toast` | 1600 | 全局提示 |
| `--bd-z-tooltip` | 1700 | 文字提示 |

---

## 5. 常见问题 (FAQ)

**Q: 我需要添加一个新的颜色怎么办？**
A: 首先检查 `Global Tokens` 是否已有类似颜色。如果有，考虑复用。如果没有，在 `tokens.css` 的 Global 区域添加新的色阶。

**Q: 为什么我的组件在暗黑模式下看不清？**
A: 检查你是否使用了硬编码的颜色（如 `#ffffff` 或 `black`）。请改为使用 Semantic Tokens（如 `--bd-bg-base` 或 `--bd-text-primary`）。

**Q: 什么时候应该创建 Component Token？**
A: 只有当你觉得用户**非常有必要**修改这个特定的属性，且 Semantic Token 无法满足其定制需求时。例如，用户可能想要把主按钮的背景色改为品牌色，而不是通用的 `--bd-color-primary`，这时提供 `--bd-button-primary-bg` 是合理的。
