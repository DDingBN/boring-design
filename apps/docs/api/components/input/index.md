# Input 输入框

常用的单行文本输入框。

## 核心设计理念

遵循 Boring Design 的设计规范：

- **HTML 优先**：最大程度对齐原生 `<input>` 属性，保持 API 表面积最小。
- **无障碍与原生表单**：通过 `ElementInternals` API 接入原生 `<form>` 系统，完整支持表单的重置与提交。
- **高内聚低耦合**：利用 `prefix` 和 `suffix` 插槽组合图标，配合 `HasSlotController` 动态管理内部布局。
- **单向同步策略**：通过 `live()` 指令绑定 value，实现“内部立即响应物理输入，外部框架可随时强制覆盖 DOM”的非受控同步策略。
- **事件穿透**：物理事件自然冒泡，重塑带 `bd-` 前缀的业务状态事件（如 `bd-input`、`bd-change`）。

## 基础用法

最基础的文本输入框。

<div class="demo-block">
  <bd-input placeholder="请输入内容..."></bd-input>
  <bd-input value="默认文本"></bd-input>
</div>

```html
<bd-input placeholder="请输入内容..."></bd-input>
<bd-input value="默认文本"></bd-input>
```

## 尺寸

使用 `size` 属性来改变输入框的尺寸，支持 `small`、`medium`（默认）和 `large`。

<div class="demo-block">
  <bd-input size="small" placeholder="Small"></bd-input>
  <bd-input size="medium" placeholder="Medium"></bd-input>
  <bd-input size="large" placeholder="Large"></bd-input>
</div>

```html
<bd-input size="small" placeholder="Small"></bd-input>
<bd-input size="medium" placeholder="Medium"></bd-input>
<bd-input size="large" placeholder="Large"></bd-input>
```

## 禁用与只读

使用 `disabled` 属性来禁用输入框，使用 `readonly` 设置只读状态。

<div class="demo-block">
  <bd-input disabled value="禁用的输入框"></bd-input>
  <bd-input readonly value="只读的输入框"></bd-input>
</div>

```html
<bd-input disabled value="禁用的输入框"></bd-input>
<bd-input readonly value="只读的输入框"></bd-input>
```

## 可清除

设置 `clearable` 属性后，当输入框有值且不为禁用或只读状态时，会显示一个清除按钮。

<div class="demo-block">
  <bd-input clearable placeholder="输入内容后可清除..."></bd-input>
  <bd-input clearable value="点击右侧按钮清除"></bd-input>
</div>

```html
<bd-input clearable placeholder="输入内容后可清除..."></bd-input>
<bd-input clearable value="点击右侧按钮清除"></bd-input>
```

## 密码输入框

设置 `type="password"` 并且开启 `password-toggle` 属性后，会显示一个切换密码可见性的按钮。

<div class="demo-block">
  <bd-input type="password" password-toggle placeholder="请输入密码"></bd-input>
</div>

```html
<bd-input type="password" password-toggle placeholder="请输入密码"></bd-input>
```

## 前后缀插槽

你可以通过 `prefix` 或 `suffix` 插槽向输入框内添加前置图标或后置文本。

<div class="demo-block">
  <bd-input placeholder="搜索...">
    <svg slot="prefix" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
  </bd-input>

  <bd-input placeholder="请输入金额">
    <span slot="prefix">¥</span>
    <span slot="suffix">RMB</span>
  </bd-input>
</div>

```html
<bd-input placeholder="搜索...">
  <svg slot="prefix" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"></svg>
</bd-input>

<bd-input placeholder="请输入金额">
  <span slot="prefix">¥</span>
  <span slot="suffix">RMB</span>
</bd-input>
```

## 在表单中使用

完全兼容原生表单，支持 required、pattern、minlength、maxlength 等校验属性。

<div class="demo-block">
  <form onsubmit="event.preventDefault(); alert('表单已提交，值为: ' + new FormData(event.target).get('username'));" style="display: flex; gap: 8px; width: 100%;">
    <bd-input name="username" required placeholder="必填项..." style="flex: 1;"></bd-input>
    <bd-button type="submit" variant="primary">提交表单</bd-button>
    <bd-button type="reset">重置</bd-button>
  </form>
</div>

```html
<form action="/api/submit" method="post">
  <bd-input name="username" required placeholder="必填项..."></bd-input>
  <bd-button type="submit" variant="primary">提交表单</bd-button>
  <bd-button type="reset">重置</bd-button>
</form>
```

***

## API 参考

### 属性 (Properties & Attributes)

| 属性名               | 类型        | 默认值      | 说明                                  | 映射 Attribute  |
| :---------------- | :-------- | :------- | :---------------------------------- | :------------ |
| `type`            | `string`  | `text`   | 原生输入框类型（`text`, `password` 等）       | ❌             |
| `value`           | `string`  | `''`     | 输入框的值                               | ❌             |
| `size`            | `string`  | `medium` | 输入框尺寸，可选 `small`, `medium`, `large` | ✅ (`reflect`) |
| `placeholder`     | `string`  | `''`     | 占位符文本                               | ❌             |
| `disabled`        | `boolean` | `false`  | 是否禁用输入框                             | ✅ (`reflect`) |
| `readonly`        | `boolean` | `false`  | 是否只读                                | ✅ (`reflect`) |
| `clearable`       | `boolean` | `false`  | 是否显示清除按钮（需有值且非禁用/只读）                | ❌             |
| `password-toggle` | `boolean` | `false`  | 是否显示密码切换按钮（仅 `type="password"`）     | ✅             |
| `required`        | `boolean` | `false`  | 是否必填（原生表单校验）                        | ❌             |
| `pattern`         | `string`  | `-`      | 正则校验规则                              | ❌             |
| `minlength`       | `number`  | `-`      | 最小长度限制                              | ❌             |
| `maxlength`       | `number`  | `-`      | 最大长度限制                              | ❌             |
| `autofocus`       | `boolean` | `false`  | 自动获取焦点                              | ❌             |
| `autocomplete`    | `string`  | `-`      | 自动完成属性                              | ❌             |

### 插槽 (Slots)

| 插槽名称     | 说明                  |
| :------- | :------------------ |
| `prefix` | 前缀插槽，通常用于放置前置图标、标签等 |
| `suffix` | 后缀插槽，通常用于放置后置图标、单位等 |

### CSS Parts

提供以下 `part` 供外部穿透覆盖样式：

| Part 名称                  | 说明                        |
| :----------------------- | :------------------------ |
| `base`                   | 组件最外层的包裹容器（用于实现边框、背景、焦点环） |
| `input`                  | 内部真实的 `<input>` 元素        |
| `prefix`                 | 包裹 `prefix` 插槽的容器         |
| `suffix`                 | 包裹 `suffix` 插槽的容器         |
| `clear-button`           | 清除按钮的容器/图标                |
| `password-toggle-button` | 密码显示/隐藏按钮的容器/图标           |

### 事件 (Events)

| 事件名称        | 说明                      | 携带数据 (`e.detail`)   |
| :---------- | :---------------------- | :------------------ |
| `bd-input`  | 当用户输入导致内容变化时触发          | `{ value: string }` |
| `bd-change` | 当用户完成输入并提交更改时（如失去焦点、回车） | `{ value: string }` |
| `bd-clear`  | 当用户点击清除按钮时触发            | `{ value: '' }`     |

> 💡 **提示**：对于 `click`, `focus`, `blur`, `keydown` 等物理事件，组件不进行任何拦截或阻止冒泡。你可以直接监听原生事件（如 `@focus`）。

<style>
.demo-block {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 24px;
  margin-top: 16px;
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
  align-items: center;
}
.demo-block bd-input {
  max-width: 300px;
}
</style>
