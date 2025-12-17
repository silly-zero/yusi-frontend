# Yusi Frontend

> 基于 Vue 3 + TypeScript + Vite 构建的现代化前端应用

## 📖 项目简介

Yusi 是一个灵魂叙事平台，通过 AI 技术帮助用户探索真实自我与关系合拍度。本项目为 Yusi 的前端部分，提供了用户认证、日记记录、情景室创建与管理、AI 聊天等核心功能。

## ✨ 核心功能

- 🔐 **用户认证** - 完整的登录/注册系统，JWT 令牌管理
- 📝 **私密日记** - 端到端加密的日记记录功能
- 🏠 **情景室** - 创建/加入房间，多人协作叙事
- 🤖 **AI 助手** - 流式 AI 对话，实时响应
- 📊 **分析报告** - 个人速写与合拍度矩阵分析

## 🛠️ 技术栈

### 核心框架
- **Vue 3** - 渐进式 JavaScript 框架
- **TypeScript** - 类型安全的 JavaScript 超集
- **Vite 6** - 下一代前端构建工具

### 状态管理与路由
- **Vue Router 4** - 官方路由管理器
- **Pinia** - 轻量级状态管理库

### UI 与样式
- **Tailwind CSS 4** - 实用优先的 CSS 框架
- **Lucide Vue Next** - 精美的图标库
- **自定义 UI 组件** - 基于 Tailwind 的组件库

### 网络请求
- **Axios** - HTTP 客户端，支持拦截器与自动令牌刷新

## 📦 项目结构

```
frontend/
├── public/                # 静态资源
├── src/
│   ├── components/        # 组件目录
│   │   ├── ui/           # 基础 UI 组件
│   │   │   ├── Button.vue
│   │   │   ├── Input.vue
│   │   │   ├── Card.vue
│   │   │   └── ...
│   │   ├── room/         # 房间相关组件
│   │   │   ├── RoomCreate.vue
│   │   │   ├── RoomJoin.vue
│   │   │   ├── RoomSubmit.vue
│   │   │   └── RoomReport.vue
│   │   ├── ChatWidget.vue  # AI 聊天组件
│   │   ├── Diary.vue       # 日记组件
│   │   └── Layout.vue      # 布局组件
│   ├── pages/            # 页面组件
│   │   ├── Home.vue
│   │   ├── Login.vue
│   │   ├── Register.vue
│   │   ├── Diary.vue
│   │   └── Room.vue
│   ├── stores/           # Pinia 状态管理
│   │   ├── auth.ts       # 认证状态
│   │   └── room.ts       # 房间状态
│   ├── router/           # 路由配置
│   │   └── index.ts
│   ├── lib/              # 工具库
│   │   ├── api.ts        # Axios 配置与拦截器
│   │   └── room.ts       # 房间 API 与类型
│   ├── utils.ts          # 工具函数
│   ├── main.ts           # 应用入口
│   ├── App.vue           # 根组件
│   └── index.css         # 全局样式
├── index.html            # HTML 模板
├── vite.config.ts        # Vite 配置
├── tsconfig.json         # TypeScript 配置
├── tailwind.config.js    # Tailwind 配置
└── package.json          # 项目依赖
```

## 🚀 快速开始

### 环境要求

- **Node.js**: >= 18.0.0
- **npm**: >= 9.0.0

### 安装依赖

```bash
cd frontend
npm install
```

### 开发模式

启动开发服务器（支持热更新）：

```bash
npm run dev
```

服务器将在 `http://localhost:5173` 启动

### 生产构建

```bash
npm run build
```

构建产物将输出到 `dist/` 目录

### 预览生产构建

```bash
npm run preview
```

### 代码检查

```bash
npm run lint
```

## 🔧 配置说明

### API 代理配置

开发环境下，API 请求会自动代理到后端服务器。配置文件：`vite.config.ts`

```typescript
server: {
  port: 5173,
  proxy: {
    '/api': {
      target: 'http://localhost:8088',  // 后端服务地址
      changeOrigin: true,
    },
  },
}
```

### 环境变量

项目支持通过环境变量配置不同的运行环境，可在项目根目录创建：

- `.env` - 所有环境通用配置
- `.env.development` - 开发环境配置
- `.env.production` - 生产环境配置

## 📝 核心功能说明

### 1. 用户认证

- **登录** - `/login`
- **注册** - `/register`
- **自动令牌刷新** - 通过响应头自动更新 Access Token
- **认证拦截器** - 自动在请求头添加 Authorization

### 2. 日记系统

- 创建和保存私密日记
- 端到端加密（仅用于 AI 分析）
- 支持标题和内容字段

### 3. 情景室

**创建房间**
- 设置最大成员数（2-8 人）
- 生成 6 位邀请码

**加入房间**
- 输入邀请码快速加入
- 查看房间成员列表

**提交叙事**
- 在房间内提交个人叙事（最多 1000 字符）
- 实时字符统计

**查看报告**
- 个人速写分析
- 成员间合拍度矩阵

### 4. AI 聊天

- 流式响应，实时展示
- 支持对话历史
- 自动滚动到最新消息
- 加载状态提示

## 🎨 UI 组件库

项目内置了一套基于 Tailwind CSS 的 UI 组件库：

| 组件 | 说明 |
|------|------|
| `Button` | 按钮组件，支持多种变体和尺寸 |
| `Input` | 输入框组件，支持受控模式 |
| `Textarea` | 多行文本输入 |
| `Card` | 卡片容器及其子组件 |
| `Badge` | 标签组件 |

### 使用示例

```vue
<template>
  <Card>
    <CardHeader>
      <CardTitle>标题</CardTitle>
      <CardDescription>描述信息</CardDescription>
    </CardHeader>
    <CardContent>
      <Input v-model="value" placeholder="请输入..." />
    </CardContent>
    <CardFooter>
      <Button @click="handleSubmit">提交</Button>
    </CardFooter>
  </Card>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Button, Input, Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui'

const value = ref('')
const handleSubmit = () => {
  console.log(value.value)
}
</script>
```

## 🔌 API 集成

### API 模块

**认证 API** (`authApi`)
```typescript
authApi.login({ userName, password })
authApi.register({ userName, password, email })
authApi.logout()
```

**日记 API** (`diaryApi`)
```typescript
diaryApi.list(params)
diaryApi.get(id)
diaryApi.create({ userId, title, content })
diaryApi.update(data)
diaryApi.delete(id)
```

**房间 API** (`roomApi`)
```typescript
roomApi.create({ ownerId, maxMembers })
roomApi.join({ code, userId })
roomApi.start({ code })
roomApi.submit({ code, userId, content })
roomApi.getReport(code)
```

**AI API** (`aiApi`)
```typescript
aiApi.chat({ userId, message }) // 流式响应
```

### 请求拦截器

所有 API 请求都会自动：
1. 添加 `Authorization` 请求头
2. 添加 `X-Refresh-Token` 请求头
3. 处理 401 错误（自动登出）
4. 捕获并显示错误信息

## 📱 响应式设计

项目采用移动优先的响应式设计：

- **移动端** - 优化的单列布局
- **平板** - 适配的双列布局
- **桌面端** - 宽屏多列布局

## 🧪 开发建议

### 代码风格

- 使用 Vue 3 Composition API
- TypeScript 严格模式
- ESLint 代码检查
- 组件使用 `<script setup>` 语法

### 命名规范

- **组件文件** - PascalCase（如 `UserProfile.vue`）
- **组合式函数** - camelCase，以 `use` 开头（如 `useAuth.ts`）
- **常量** - UPPER_SNAKE_CASE
- **普通变量/函数** - camelCase

### Git 提交规范

```
feat: 新功能
fix: 修复 bug
docs: 文档更新
style: 代码格式调整
refactor: 重构
test: 测试相关
chore: 构建/工具链相关
```

## 🐛 常见问题

### Q: 端口被占用怎么办？

A: Vite 会自动尝试下一个可用端口，或者修改 `vite.config.ts` 中的 `server.port` 配置。

### Q: API 请求失败？

A: 检查后端服务是否启动，以及 `vite.config.ts` 中的代理配置是否正确。

### Q: TypeScript 报错？

A: 确保运行了 `npm install` 安装所有依赖，并重启 IDE 的 TypeScript 服务。

### Q: 样式不生效？

A: 确认 Tailwind CSS 配置正确，并且 `index.css` 已在 `main.ts` 中导入。

## 📄 许可证

本项目仅供学习和研究使用。

## 👥 贡献者

- 开发团队：Yusi Team

## 📮 联系方式

如有问题或建议，请联系项目维护者。

---

**Happy Coding! 🎉**
