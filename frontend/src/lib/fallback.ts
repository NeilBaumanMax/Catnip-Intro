export interface FallbackProduct {
  id: number
  name: string
  category: string
  summary: string
  description: string
  tags: string[]
  image: string
}

export const fallbackProducts: FallbackProduct[] = [
  {
    id: 1,
    name: '万物有灵 AI Agent 智能板卡',
    category: '本地 Agent 智能硬件',
    summary: '面向本地 Agent 运行、知识库调用、工具执行和硬件控制的智能算力板卡，支持将自然语言指令转化为本地可执行任务。',
    description: `万物有灵 AI Agent 智能板卡是科霓朋特面向端侧智能执行场景打造的核心硬件产品。它不是传统意义上的开发板，而是围绕本地 Agent Runtime、边缘 AI 推理、本地知识库、工具调用和硬件接口适配构建的软硬件一体化载体。

产品可用于学校资料管理、企业知识库、智能办公、工业设备控制和机器人控制等场景，让 AI 不再停留在云端问答，而是能够在客户现场长期运行、调用工具、处理任务并控制设备。`,
    tags: ['本地部署', 'Agent Runtime', '硬件控制', '私有化运行'],
    image: '/images/products/wanwu-agent-board.png',
  },
  {
    id: 2,
    name: '龙虾派端侧 AI 控制主板',
    category: '端侧 AI 控制主板',
    summary: '面向端侧大模型部署、设备控制和边缘推理的 AI 控制主板，适合智能硬件、工业控制和机器人场景。',
    description: `龙虾派端侧 AI 控制主板面向端侧 AI 计算与设备控制场景，围绕国产芯片路线、边缘推理、传感器接入、工业接口和控制任务执行展开设计。

它可以作为智能硬件、机器人、工业设备和本地 AI 终端的控制核心，承载模型推理、状态管理、任务调度和外设控制能力，帮助客户在本地环境中完成更安全、更稳定、更低延迟的智能化部署。`,
    tags: ['端侧 AI', '边缘推理', '设备控制', '工业接口'],
    image: '/images/products/lobsterpi-edge-ai-board.png',
  },
  {
    id: 3,
    name: 'OPC 智能员工盒子',
    category: '智能办公与私有化部署',
    summary: '面向企业、学校和园区的本地智能员工终端，支持知识库问答、文档处理、流程自动化和私有化部署。',
    description: `OPC 智能员工盒子是面向组织级办公场景的本地 AI 终端。它可以部署在企业、学校、园区或政企单位内部，结合本地知识库、文档处理、流程自动化和工具调用能力，为用户提供资料检索、文件管理、流程问答、任务执行和智能办公辅助。

相比纯云端工具，OPC 智能员工盒子更适合数据不能上云、网络环境复杂、需要长期稳定运行和本地化维护的客户场景。`,
    tags: ['智能办公', '本地知识库', '私有化部署', '文档处理'],
    image: '/images/products/opc-ai-employee-box.png',
  },
  {
    id: 4,
    name: 'Live2D 智能挂件',
    category: 'AI 交互硬件',
    summary: '结合 Live2D 形象、本地 Agent 能力和智能硬件交互的桌面级 AI 挂件，适合陪伴、展示、教学和品牌互动场景。',
    description: `Live2D 智能挂件是一款面向桌面交互、品牌展示、智能陪伴和创客教育场景的 AI 交互硬件。产品通过 Live2D 动态形象、本地语音交互、Agent 对话能力和轻量硬件终端结合，让 AI 具备更强的可视化表达和互动体验。

它可用于展台展示、教学实验、桌面助手、IP 互动和智能硬件体验场景，是科霓朋特在 AI+硬件交互方向的探索产品。`,
    tags: ['Live2D', 'AI 交互', '桌面助手', '创客教育'],
    image: '/images/products/live2d-smart-accessory.png',
  },
]
