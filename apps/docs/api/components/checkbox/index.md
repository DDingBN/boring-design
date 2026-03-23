# Checkbox 复选框

用于二元选中场景，支持单项开关、半选态显示与原生表单提交。

## 核心设计理念

遵循 Boring Design 的设计规范：

- **HTML 优先**：属性语义对齐原生 `<input type="checkbox">`，直接用 Attributes 声明状态。
- **无障碍与原生表单**：基于 `ElementInternals` 接入原生 `<form>`，支持提交、重置与约束校验。
- **高内聚低耦合**：通过默认插槽、`description`、`error-text` 插槽组合文案结构，而非配置驱动 DOM。
- **事件穿透**：`click`、`focus`、`blur` 等物理事件保持原生；业务状态通过 `bd-input`、`bd-change` 输出。

## 基础用法

最基础的勾选能力，支持默认文案插槽。

<div class="demo-block">
  <bd-checkbox>默认选项</bd-checkbox>
  <bd-checkbox checked>默认选中</bd-checkbox>
</div>

```html
<bd-checkbox>默认选项</bd-checkbox>
<bd-checkbox checked>默认选中</bd-checkbox>
```

## 半选状态

`indeterminate` 用于展示“部分选中”，用户首次交互后会切换为 `checked=true` 且 `indeterminate=false`。

<div class="demo-block">
  <bd-checkbox indeterminate>部分选中</bd-checkbox>
</div>

```html
<bd-checkbox indeterminate>部分选中</bd-checkbox>
```

## 禁用与错误态

支持 `disabled` 禁用；支持外部 `invalid` 强制错误态。  
当 `required` 且未选中时，会参与原生校验并进入错误状态。

<div class="demo-block">
  <bd-checkbox disabled checked>禁用已选中</bd-checkbox>
  <bd-checkbox invalid>
    同意协议
    <span slot="error-text">请先同意协议后继续</span>
  </bd-checkbox>
</div>

```html
<bd-checkbox disabled checked>禁用已选中</bd-checkbox>

<bd-checkbox invalid>
  同意协议
  <span slot="error-text">请先同意协议后继续</span>
</bd-checkbox>
```

## 描述与错误文案插槽

通过 `description` 展示辅助说明，通过 `error-text` 展示错误提示。

<div class="demo-block">
  <bd-checkbox checked>
    订阅产品更新
    <span slot="description">我们每月发送 1~2 封产品动态邮件</span>
  </bd-checkbox>
</div>

```html
<bd-checkbox checked>
  订阅产品更新
  <span slot="description">我们每月发送 1~2 封产品动态邮件</span>
</bd-checkbox>
```

## 在表单中使用

`checked=true` 时参与提交，未选中不提交；支持原生 `form.reset()`。

<div class="demo-block">
  <form onsubmit="event.preventDefault(); alert('accept=' + (new FormData(event.target).get('accept') ?? '(未提交)'));" style="display: flex; flex-direction: column; gap: 8px;">
    <bd-checkbox name="accept" value="yes" required>
      我已阅读并同意用户协议
      <span slot="description">勾选后可继续提交</span>
      <span slot="error-text">这是必选项</span>
    </bd-checkbox>
    <div style="display: flex; gap: 8px;">
      <bd-button type="submit" variant="primary">提交</bd-button>
      <bd-button type="reset">重置</bd-button>
    </div>
  </form>
</div>

```html
<form action="/api/submit" method="post">
  <bd-checkbox name="accept" value="yes" required>
    我已阅读并同意用户协议
  </bd-checkbox>
  <bd-button type="submit" variant="primary">提交</bd-button>
  <bd-button type="reset">重置</bd-button>
</form>
```

---

## API 参考

### 属性 (Properties & Attributes)

| 属性名          | 类型                            | 默认值     | 说明                                              | 映射 Attribute |
| :-------------- | :------------------------------ | :--------- | :------------------------------------------------ | :------------- |
| `checked`       | `boolean`                       | `false`    | 是否选中                                          | ✅ (`reflect`) |
| `indeterminate` | `boolean`                       | `false`    | 是否半选（仅视觉与辅助状态）                      | ✅ (`reflect`) |
| `disabled`      | `boolean`                       | `false`    | 是否禁用                                          | ✅ (`reflect`) |
| `required`      | `boolean`                       | `false`    | 是否必填（原生约束校验）                          | ✅             |
| `name`          | `string`                        | `''`       | 提交字段名                                        | ✅             |
| `value`         | `string`                        | `on`       | 选中时的提交值                                    | ✅             |
| `invalid`       | `boolean`                       | `false`    | 外部强制错误态（与内部 validity 合并渲染）        | ✅ (`reflect`) |

### 插槽 (Slots)

| 插槽名称     | 说明                                                |
| :----------- | :-------------------------------------------------- |
| (default)    | 默认插槽，用于标签文本                              |
| `description`| 辅助说明文本插槽                                    |
| `error-text` | 错误提示文本插槽，仅在错误态时显示                  |

### CSS Parts

提供以下 `part` 供外部穿透覆盖样式：

| Part 名称      | 说明                                |
| :------------- | :---------------------------------- |
| `base`         | 组件主容器（label）                 |
| `control`      | 复选框可视控制区包裹节点            |
| `icon`         | 勾选图标容器                        |
| `label`        | 默认插槽文本包裹节点                |
| `description`  | `description` 插槽容器              |
| `error-text`   | `error-text` 插槽容器               |

### 事件 (Events)

| 事件名称      | 触发时机                        | 携带数据 (`e.detail`) |
| :------------ | :------------------------------ | :-------------------- |
| `bd-input`    | 用户交互导致即时状态变化时触发  | `{ checked: boolean, indeterminate: boolean, value: string }` |
| `bd-change`   | 用户交互导致确定性状态变化时触发| `{ checked: boolean, indeterminate: boolean, value: string }` |

> 💡 **提示**：`click`、`focus`、`blur`、`keydown` 等物理事件保持原生，不做拦截或重命名。

<style>
.demo-block {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 24px;
  margin-top: 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  align-items: flex-start;
}
</style>
