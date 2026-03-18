# 🧱 Boring Design 组件开发规范指南 (Lit & Web Components)

> **核心理念**：尊重 Web 标准，保持最小 API 表面积。实用主义优先，拒绝为了“完美模拟原生”而陷入过度工程化的泥潭。

## 1. 核心设计原则 (Core Principles)

1. **HTML 优先 (HTML First)**：组件的 API 应该像原生 HTML 一样工作。优先使用 Attributes 传参，支持声明式渲染。
2. **框架无关 (Framework Agnostic)**：组件必须能在 React, Vue, Angular 或纯原生 JS 中无缝使用，不依赖特定框架的上下文。
3. **高内聚，低耦合 (High Cohesion, Low Coupling)**：优先通过 `Slot`（插槽）进行组件组合，而不是通过传入庞大的 JSON 配置对象来渲染复杂结构。
4. **无障碍原生化 (Native a11y)**：尽量不破坏原生语义，拥抱 `ElementInternals` 参与原生表单。

---

## 2. 命名与文件结构

### 2.1 命名约定
* **HTML 标签名**：必须以 `bd-` 为前缀，全小写，短划线分隔（kebab-case）。例如：`<bd-button>`。
* **JS 类名**：使用大驼峰（PascalCase），无需前缀。例如：`class Button extends LitElement`。
* **文件名**：使用 kebab-case。例如：`button.ts`, `button.styles.ts`。

### 2.2 目录结构
每个组件是一个独立的微模块：
```text
packages/components/button/
├── src/
│   ├── button.ts           # 组件核心逻辑
│   ├── button.styles.ts    # 提取的 CSS 样式 (基于 Tokens)
│   └── index.ts            # 导出定义
└── README.md               # 组件文档
```

---

## 3. 属性与状态 (Properties & Attributes)

### 3.1 属性类型映射
* **优先使用基础类型**：`String`, `Number`, `Boolean`，完美映射到 HTML Attributes。
* **布尔值属性 (Boolean)**：**禁止**使用 `is-` 或 `has-` 前缀。使用 `<bd-dialog open>` 而不是 `<bd-dialog is-open="true">`。
* **复杂类型 (Object/Array)**：仅作为 JS Property 使用，禁止映射到 HTML（设置 `attribute: false`）。

```typescript
// ✅ 正确示例
@property({ type: Boolean, reflect: true }) disabled = false;
@property({ type: Array, attribute: false }) items = []; 
```

### 3.2 Reflect (反射) 的克制使用
仅在属性**需要作为 CSS 选择器**（如 `[disabled]`, `[size="large"]`）或对**无障碍 (a11y)** 至关重要时，才使用 `reflect: true`。内部高频变动的值绝不反射。

---

## 4. 事件机制 (Event Handling) —— **核心规范**

Boring Design 采用**“透明传递物理交互，接管并重塑业务状态，拥抱前缀”**的务实策略。

### 4.1 物理交互事件 (如 click, focus)：顺其自然
* **不阻断**内部原生事件，让其自然冒泡穿透 Shadow DOM（利用 `composed: true` 或 `delegatesFocus`）。
* **不要**多此一举地封装 `bd-click`。

### 4.2 状态变更事件 (如 change, input)：加前缀的自定义事件
为了避免与浏览器原生底层机制（如 IME 输入法合成、自动填充）发生冲突，我们**绝不拦截和模拟同名的原生状态事件**。

* 当组件的“业务值”发生确定性改变时，抛出带有 `bd-` 前缀的自定义事件（如 `bd-change`, `bd-input`）。
* 将最新的值存放在 `e.detail` 中。

```typescript
// ✅ 最佳实践：抛出带有前缀的明确业务事件
private _handleChange(e: Event) {
  // 注意：我们不 e.stopPropagation() 拦截原生 input/change，让它去处理复杂的 IME 逻辑
  
  const target = e.target as HTMLInputElement;
  this.value = target.value;

  // 抛出干净的、明确的组件级变更事件
  this.dispatchEvent(
    new CustomEvent('bd-change', {
      bubbles: true,
      composed: true,
      detail: { value: this.value }
    })
  );
}
```

---

## 5. DOM 与 Shadow DOM

### 5.1 插槽驱动 (Slot-Driven)
拒绝“配置驱动”（传 JSON 渲染 DOM）。将 DOM 控制权还给开发者，利用 `<slot>` 组合。

```html
<!-- ✅ 正确：插槽驱动，极度灵活 -->
<bd-card>
  <h3 slot="header">标题</h3>
  <bd-button slot="extra">操作</bd-button>
  <p>主体内容</p>
</bd-card>
```

### 5.2 样式穿透 (CSS Parts)
组件内部的关键节点，必须使用 `part` 属性暴露，提供“逃生舱”。
```html
<div part="base" class="wrapper">
  <span part="label">${this.label}</span>
</div>
<!-- 外部可用 bd-button::part(label) 覆盖样式 -->
```

---

## 6. 表单与可访问性 (Forms)

拥抱 `ElementInternals` API。所有作为表单输入的组件（Input, Checkbox, Select 等），必须通过 `attachInternals()` 接入原生 `<form>` 系统，实现原生回车提交和表单验证，而不是用 JS 强行模拟。

```typescript
class BdInput extends LitElement {
  static formAssociated = true;
  private _internals: ElementInternals;

  constructor() {
    super();
    this._internals = this.attachInternals();
  }
}
```

---

## 7. 受控与非受控模式 (Controlled vs Uncontrolled)

在 Web Components 中强行实现类似 React 的严格受控模式会导致输入法 (IME) 异常和光标跳动。Boring Design 采用**“内部立即响应，外部强行覆盖”**的务实单向同步策略。

### 7.1 实现策略
1. **内部永远非受控**：用户交互时，组件**立即**更新内部的 `value` 状态并抛出事件。绝不拦截用户的物理输入过程。
2. **外部属性作为“覆盖指令”**：如果外部框架（如 React/Vue）想要受控，它们会通过属性绑定传入新的（或旧的）`value`。Lit 会比较内部状态，如果外部传入的值与当前值不同，则强制覆盖原生 DOM。
3. **拥抱 `live()` 指令**：在将值绑定给内部原生表单元素时，必须使用 Lit 的 `live()` 指令，防止 DOM 状态与 Lit 内部状态脱节。

### 7.2 标准模板代码
```typescript
import { LitElement, html } from 'lit';
import { property } from 'lit/decorators.js';
import { live } from 'lit/directives/live.js';

export class BdInput extends LitElement {
  // 🚫 禁止使用 reflect: true，以保留原生的 defaultValue 表单重置特性
  @property({ type: String }) value = '';

  private _handleInput(e: Event) {
    const target = e.target as HTMLInputElement;
    
    // 1. 内部立即更新状态
    this.value = target.value;

    // 2. 抛出带前缀的事件通知外部
    this.dispatchEvent(
      new CustomEvent('bd-input', {
        detail: { value: this.value },
        bubbles: true,
        composed: true
      })
    );
  }

  render() {
    return html`
      <!-- 使用 live() 确保外部强制覆盖时 DOM 能够正确回滚 -->
      <input 
        .value=${live(this.value)} 
        @input=${this._handleInput}
      />
    `;
  }
}
```
