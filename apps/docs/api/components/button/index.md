# Button 按钮

常用的操作按钮。

## 核心设计理念

遵循 Boring Design 的设计规范：
- **HTML 优先**：像原生 `<button>` 一样使用属性传参。
- **无障碍与原生表单**：通过 `ElementInternals` API 接入原生 `<form>` 系统，支持 `type="submit"` 回车提交。
- **高内聚低耦合**：支持 `prefix` 和 `suffix` 插槽自定义图标内容，支持 `loading` 状态。
- **事件穿透**：物理点击事件（`click`）自然冒泡，无 `bd-click` 等冗余封装。

## 基础用法

使用 `variant` 属性来定义按钮的样式变体。

<div class="demo-block">
  <bd-button>Default</bd-button>
  <bd-button variant="primary">Primary</bd-button>
  <bd-button variant="danger">Danger</bd-button>
  <bd-button variant="text">Text</bd-button>
</div>

```html
<bd-button>Default</bd-button>
<bd-button variant="primary">Primary</bd-button>
<bd-button variant="danger">Danger</bd-button>
<bd-button variant="text">Text</bd-button>
```

## 尺寸

使用 `size` 属性来改变按钮的尺寸，支持 `small`、`medium`（默认）和 `large`。

<div class="demo-block">
  <bd-button size="small" variant="primary">Small</bd-button>
  <bd-button size="medium" variant="primary">Medium</bd-button>
  <bd-button size="large" variant="primary">Large</bd-button>
</div>

```html
<bd-button size="small" variant="primary">Small</bd-button>
<bd-button size="medium" variant="primary">Medium</bd-button>
<bd-button size="large" variant="primary">Large</bd-button>
```

## 禁用状态

使用 `disabled` 属性来禁用按钮。

<div class="demo-block">
  <bd-button disabled>Default Disabled</bd-button>
  <bd-button variant="primary" disabled>Primary Disabled</bd-button>
  <bd-button variant="danger" disabled>Danger Disabled</bd-button>
  <bd-button variant="text" disabled>Text Disabled</bd-button>
</div>

```html
<bd-button disabled>Default Disabled</bd-button>
<bd-button variant="primary" disabled>Primary Disabled</bd-button>
<bd-button variant="danger" disabled>Danger Disabled</bd-button>
<bd-button variant="text" disabled>Text Disabled</bd-button>
```

## 加载状态

点击按钮后进行数据加载操作，在按钮上显示加载状态。设置 `loading` 属性即可。处于加载状态的按钮会自动被禁用。

<div class="demo-block">
  <bd-button loading variant="primary">Loading</bd-button>
  <bd-button loading>Loading</bd-button>
</div>

```html
<bd-button loading variant="primary">Loading</bd-button>
<bd-button loading>Loading</bd-button>
```

## 图标按钮

你可以通过 `prefix` 或 `suffix` 插槽向按钮内添加图标。

<div class="demo-block">
  <bd-button variant="primary">
    <svg slot="prefix" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
    Search
  </bd-button>
  
  <bd-button>
    Next
    <svg slot="suffix" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
  </bd-button>

  <bd-button variant="default" aria-label="Settings">
    <svg slot="prefix" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>
  </bd-button>
</div>

```html
<bd-button variant="primary">
  <svg slot="prefix" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"></svg>
  Search
</bd-button>

<bd-button>
  Next
  <svg slot="suffix" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"></svg>
</bd-button>

<bd-button variant="default" aria-label="Settings">
  <svg slot="prefix" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"></svg>
</bd-button>
```

## 在表单中使用

设置 `type="submit"` 或 `type="reset"`，结合原生 `<form>` 即可完成表单操作。

<div class="demo-block">
  <form onsubmit="event.preventDefault(); alert('表单已提交');" style="display: flex; gap: 8px;">
    <input name="username" placeholder="输入内容..." style="padding: 4px 8px; border: 1px solid var(--vp-c-divider); border-radius: 4px;" />
    <bd-button type="submit" variant="primary">提交表单</bd-button>
    <bd-button type="reset">重置</bd-button>
  </form>
</div>

```html
<form action="/api/submit" method="post">
  <input name="username" />
  <bd-button type="submit" variant="primary">提交表单</bd-button>
  <bd-button type="reset">重置</bd-button>
</form>
```

---

## API 参考

### 属性 (Properties & Attributes)

| 属性名     | 类型      | 默认值   | 说明                                      | 映射 Attribute |
| :--------- | :-------- | :------- | :---------------------------------------- | :------------- |
| `variant`  | `string`  | `default`| 按钮变体，可选 `primary`, `default`, `text`, `danger` | ✅ (`reflect`) |
| `size`     | `string`  | `medium` | 按钮尺寸，可选 `small`, `medium`, `large` | ✅ (`reflect`) |
| `type`     | `string`  | `button` | 原生 `type` 属性，可选 `button`, `submit`, `reset` | ❌ |
| `disabled` | `boolean` | `false`  | 是否禁用按钮                              | ✅ (`reflect`) |
| `loading`  | `boolean` | `false`  | 是否处于加载状态（会同时禁用按钮）          | ✅ (`reflect`) |

### 插槽 (Slots)

| 插槽名称  | 说明                                      |
| :-------- | :---------------------------------------- |
| (default) | 默认插槽，用于放置按钮的文本内容          |
| `prefix`  | 前缀插槽，通常用于放置前置图标            |
| `suffix`  | 后缀插槽，通常用于放置后置图标            |
| `spinner` | 覆盖默认的加载图标 SVG 内容（需开启 loading）|

### CSS Parts

提供以下 `part` 供外部穿透覆盖样式：

| Part 名称 | 说明                                      |
| :-------- | :---------------------------------------- |
| `base`    | 原生 `<button>` 根元素                    |
| `label`   | 默认文本插槽的外层包裹节点                |
| `prefix`  | `prefix` 插槽包裹节点                     |
| `suffix`  | `suffix` 插槽包裹节点                     |
| `spinner` | 内部默认 loading 图标的包裹节点           |

### 事件 (Events)

遵循组件库规范，不额外封装 `bd-click`。使用原生 `@click` 监听物理点击事件即可。由于原生 `click` 自动冒泡，你可以在外层直接捕获。

<style>
.demo-block {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 24px;
  margin-top: 16px;
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  align-items: center;
}
</style>
