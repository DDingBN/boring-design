# Button 按钮

按钮用于触发一个即时操作。

## 核心设计理念

遵循 Boring Design 的设计规范：
- **HTML 优先**：像原生 `<button>` 一样使用属性传参。
- **无障碍与原生表单**：通过 `ElementInternals` API 接入原生 `<form>` 系统，支持 `type="submit"` 回车提交。
- **高内聚低耦合**：支持 `prefix` 和 `suffix` 插槽自定义图标内容，支持 `loading` 状态。
- **事件穿透**：物理点击事件（`click`）自然冒泡，无 `bd-click` 等冗余封装。

---

## 示例代码

### 基础用法

通过 `variant` 属性指定不同的按钮变体。

```html
<bd-button>Default</bd-button>
<bd-button variant="primary">Primary</bd-button>
<bd-button variant="danger">Danger</bd-button>
<bd-button variant="text">Text</bd-button>
```

### 尺寸

通过 `size` 属性指定按钮尺寸，支持 `small`, `medium` (默认), `large`。

```html
<bd-button size="small">Small</bd-button>
<bd-button size="medium">Medium</bd-button>
<bd-button size="large">Large</bd-button>
```

### 加载与禁用状态

使用 `loading` 和 `disabled` 属性。

```html
<bd-button disabled>Disabled</bd-button>
<bd-button loading>Loading...</bd-button>
```

### 包含图标 (使用插槽)

通过 `prefix` 和 `suffix` 插槽嵌入任意 HTML 或 SVG 图标，保持极大的灵活性。

```html
<bd-button>
  <svg slot="prefix" viewBox="0 0 24 24" width="16" height="16">...</svg>
  带前缀图标
</bd-button>

<bd-button>
  带后缀图标
  <span slot="suffix">➡️</span>
</bd-button>
```

### 在表单中使用

设置 `type="submit"` 或 `type="reset"`，结合原生 `<form>` 即可完成表单操作。

```html
<form action="/api/submit" method="post">
  <input name="username" />
  <bd-button type="submit" variant="primary">提交表单</bd-button>
  <bd-button type="reset">重置</bd-button>
</form>
```

---

## API 参考 (API Reference)

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
