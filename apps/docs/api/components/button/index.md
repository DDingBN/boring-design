# Button 按钮

常用的操作按钮。

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
  <svg slot="prefix" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
    <!-- 搜索图标 path -->
  </svg>
  Search
</bd-button>

<bd-button>
  Next
  <svg slot="suffix" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
    <!-- 箭头图标 path -->
  </svg>
</bd-button>

<!-- 仅图标按钮 -->
<bd-button variant="default" aria-label="Settings">
  <svg slot="prefix" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
    <!-- 设置图标 path -->
  </svg>
</bd-button>
```

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
