# Alert 提示

## 基础用法

<bd-alert variant="info" tone="soft">这是一个信息提示</bd-alert>

## 可关闭

<bd-alert variant="success" tone="soft" closable>
  <span slot="title">保存成功</span>
  数据已提交
</bd-alert>

## 错误态

<bd-alert variant="error" tone="soft" closable>
  <span slot="title">请求失败</span>
  请稍后重试
</bd-alert>

## API

- `variant`: `'info' | 'success' | 'warning' | 'error'`
- `tone`: `'solid' | 'soft' | 'outline'`
- `closable`: `boolean`
- `open`: `boolean`
- `bd-close`: `CustomEvent<{ reason: 'close-button' | 'api' }>`
