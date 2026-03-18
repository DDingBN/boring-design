# 🛠️ Boring Design 开发指南 (Development Guide)

> 本文档旨在帮助开发者快速上手 Boring Design 的开发、调试与发布流程。

## 1. 环境准备 (Prerequisites)

确保你的开发环境满足以下要求：

- **Node.js**: v20+ (推荐使用 LTS 版本)
- **Package Manager**: [pnpm](https://pnpm.io/) v9+ (本项目强制使用 pnpm)
- **Editor**: VS Code (推荐安装以下插件)
  - **Lit Plugin**: 提供 Lit 模板字符串的语法高亮和类型检查
  - **ESLint**: 代码质量检查
  - **Prettier**: 代码格式化
  - **Tailwind CSS IntelliSense**: (如果项目使用了 Tailwind)

## 2. 常用命令 (Scripts)

在项目根目录下运行以下命令：

| 命令 | 描述 |
| :--- | :--- |
| `pnpm i` | 安装所有依赖 (Install dependencies) |
| `pnpm dev` | 启动开发服务器 (通常是 Storybook 或文档站) |
| `pnpm build` | 构建所有包和应用 (Packages + Apps) |
| `pnpm test` | 运行单元测试 (Web Test Runner / Vitest) |
| `pnpm lint` | 运行 ESLint 和 Prettier 检查 |
| `pnpm typecheck` | 运行 TypeScript 类型检查 |
| `pnpm clean` | 清理构建产物 (`dist`, `node_modules` 等) |
| `pnpm changeset` | 生成变更日志 (发布前必做) |

## 3. 创建新组件流程 (Create a Component)

当你需要添加一个新的组件（例如 `bd-tag`）时，请遵循以下步骤：

1.  **目录结构**：
    在 `packages/components` 下新建组件文件夹 `tag`。
    ```text
    packages/components/tag/
    ├── src/
    │   ├── tag.ts           # 组件逻辑 (LitElement)
    │   ├── tag.styles.ts    # 组件样式 (css tagged template)
    │   └── index.ts         # 导出文件
    ├── test/
    │   └── tag.test.ts      # 单元测试
    ├── package.json         # 包定义
    └── README.md            # 组件说明
    ```

2.  **核心文件模板**：
    - `src/tag.ts`: 使用 `@customElement('bd-tag')` 装饰器。
    - `src/tag.styles.ts`: 引入 `tokens.css` 变量。

3.  **注册与导出**：
    确保在主包入口（如 `packages/boring-ui/src/index.ts`）中导出该组件，以便用户可以 `import { BdTag } from 'boring-ui'`。

4.  **编写文档**：
    在 `apps/docs` 或 Storybook 中添加 `tag.stories.ts` 或 `tag.md`，展示组件用法。

## 4. Git 工作流 (Git Workflow)

- **分支策略**：
  - `main`: 主分支，对应 npm 发行版代码。
  - `feat/xxx`: 新功能开发分支。
  - `fix/xxx`: Bug 修复分支。

- **Commit 规范**：
  请遵循 [Conventional Commits](https://www.conventionalcommits.org/) 规范：
  - `feat(button): add size property`
  - `fix(input): resolve focus outline issue`
  - `docs: update readme`
  - `chore: update dependencies`

## 5. 版本发布 (Release)

本项目使用 [Changesets](https://github.com/changesets/changesets) 管理版本和发布日志。

1.  **开发完成后**：
    运行 `pnpm changeset`。
    - 选择发生了变更的包（空格键选择）。
    - 选择变更类型（major/minor/patch）。
    - 填写变更描述（这将出现在 Changelog 中）。

2.  **提交变更文件**：
    Changesets 会在 `.changeset` 目录下生成一个 Markdown 文件。将此文件随代码一起提交。

3.  **发布 (CI/CD)**：
    当代码合并到 `main` 分支时，CI 流程会自动消耗 `.changeset` 文件，更新 `package.json` 版本号，生成 `CHANGELOG.md`，并发布到 npm。

## 6. 常见问题 (FAQ)

**Q: 依赖安装报错或幽灵依赖问题？**
A: 尝试运行 `pnpm store prune` 清理缓存，或删除 `node_modules` 和 `pnpm-lock.yaml` 后重新 `pnpm i`。

**Q: 样式不生效？**
A: 检查组件是否正确引入了 Shadow DOM 样式，以及 `tokens.css` 是否在全局被加载。

**Q: VS Code 中 Lit 模板没有高亮？**
A: 请确保已安装 "Lit Plugin" 扩展。
