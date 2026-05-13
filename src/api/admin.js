// API接口文件 - 人人猎管理后台
// 包含用户管理、资金管理、审核管理等API接口

const API_BASE_URL = 'http://localhost:3000/api';

// 用户管理API
export const userAPI = {
  getAllUsers: async (role, filters = {}) => {
    // 实际API调用将替换此模拟数据
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          data: mockUsers[role] || [],
          pagination: {
            page: 1,
            pageSize: 20,
            total: 100
          }
        });
      }, 1000);
    });
  },

  getUserById: async (id) => {
    // API调用
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          data: mockUsers.recommender.find(user => user.id === id)
        });
      }, 500);
    });
  },

  updateUserStatus: async (userId, status) => {
    // API调用
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          message: '用户状态更新成功'
        });
      }, 500);
    });
  }
};

// 资金管理API
export const financeAPI = {
  getTransactions: async (filters = {}) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          data: mockTransactions
        });
      }, 1000);
    });
  },

  getSettlementOrders: async (status = 'pending') => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          data: mockSettlements.filter(item => item.status === status)
        });
      }, 500);
    });
  },

  processSettlement: async (orderId) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          message: '结算处理成功'
        });
      }, 1000);
    });
  }
};

// 审核管理API
export const auditAPI = {
  getAuditTasks: async (status = 'pending') => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          data: mockAuditTasks.filter(item => item.status === status)
        });
      }, 500);
    });
  },

  approveAudit: async (taskId) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          message: '审核通过成功'
        });
      }, 500);
    });
  },

  rejectAudit: async (taskId, reason) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          message: '审核拒绝成功'
        });
      }, 500);
    });
  }
};

// 内容管理API
export const contentAPI = {
  getContentList: async (type, filters = {}) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          data: mockContentList
        });
      }, 500);
    });
  },

  publishContent: async (content) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          message: '内容发布成功'
        });
      }, 500);
    });
  },

  deleteContent: async (contentId) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          message: '内容删除成功'
        });
      }, 500);
    });
  }
};

// 系统管理API
export const systemAPI = {
  getSystemStats: async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          data: {
            totalUsers: 12345,
            totalJobs: 4567,
            totalRecommendations: 8901,
            totalTransactions: 2345678
          }
        });
      }, 500);
    });
  },

  getSystemLogs: async (filters = {}) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          data: mockSystemLogs
        });
      }, 500);
    });
  },

  updateSystemConfig: async (config) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          message: '系统配置更新成功'
        });
      }, 500);
    });
  }
};

// 数据分析API
export const dataAnalysisAPI = {
  getUserGrowthData: async (timeRange = '7d') => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          data: mockUserGrowthData
        });
      }, 500);
    });
  },

  getTransactionTrendData: async (timeRange = '30d') => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          data: mockTransactionTrendData
        });
      }, 500);
    });
  },

  getRecruitmentFunnelData: async (timeRange = '30d') => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          data: mockRecruitmentFunnelData
        });
      }, 500);
    });
  },

  exportDataReport: async (reportType, timeRange) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          data: {
            downloadUrl: 'https://example.com/report/download',
            fileName: `report_${Date.now()}.xlsx`
          }
        });
      }, 1000);
    });
  }
};

// 模拟数据（实际应用中应从API获取）
const mockUsers = {
  recommender: [
    { id: 1, name: '张三', role: '推荐人', company: 'ABC科技', status: 'active', level: 'S级', region: '北京' },
    { id: 2, name: '李四', role: '推荐人', company: 'XYZ互联网', status: 'pending', level: 'A级', region: '上海' },
    { id: 3, name: '王五', role: '推荐人', company: 'DEF金融', status: 'active', level: 'B级', region: '深圳' },
    { id: 4, name: '赵六', role: '推荐人', company: 'GHI制造', status: 'inactive', level: 'C级', region: '杭州' }
  ],
  candidate: [
    { id: 1, name: '小明', role: '候选人', status: 'active', region: '北京' },
    { id: 2, name: '小红', role: '候选人', status: 'pending', region: '上海' },
    { id: 3, name: '小刚', role: '候选人', status: 'active', region: '深圳' },
    { id: 4, name: '小丽', role: '候选人', status: 'inactive', region: '杭州' }
  ],
  employer: [
    { id: 1, name: '字节跳动', role: '企业HR', status: 'active', region: '北京' },
    { id: 2, name: '阿里巴巴', role: '企业HR', status: 'active', region: '杭州' },
    { id: 3, name: '腾讯', role: '企业HR', status: 'pending', region: '深圳' },
    { id: 4, name: '百度', role: '企业HR', status: 'active', region: '北京' }
  ]
};

const mockTransactions = [
  { id: 1, type: '充值', amount: 1000, status: 'success', createdAt: '2023-05-13 10:30' },
  { id: 2, type: '提现', amount: 500, status: 'pending', createdAt: '2023-05-13 11:45' },
  { id: 3, type: '佣金', amount: 2500, status: 'success', createdAt: '2023-05-13 09:20' }
];

const mockSettlements = [
  { id: 1, name: '王经理', amount: '¥25,000', status: 'pending', time: '待处理' },
  { id: 2, name: '李总监', amount: '¥18,000', status: 'processing', time: '处理中' },
  { id: 3, name: '张主管', amount: '¥12,500', status: 'completed', time: '已完成' }
];

const mockAuditTasks = [
  { id: 1, type: '用户认证', name: '刘小强', role: '推荐人', status: 'pending', priority: 'high' },
  { id: 2, type: '职位审核', name: '高级前端架构师', company: '字节跳动', status: 'pending', priority: 'medium' },
  { id: 3, type: '佣金结算', name: '王经理', amount: '¥25,000', status: 'pending', priority: 'medium' }
];

const mockContentList = [
  { id: 1, title: '招聘技巧分享', type: 'article', status: 'published', views: 1234 },
  { id: 2, title: '企业如何吸引人才', type: 'video', status: 'draft', views: 0 },
  { id: 3, title: '简历优化指南', type: 'infographic', status: 'published', views: 5678 }
];

const mockSystemLogs = [
  { id: 1, module: '用户管理', action: '用户登录', user: 'admin', time: '2分钟前', ip: '192.168.1.100' },
  { id: 2, module: '审核管理', action: '审核通过', user: 'operator', time: '1小时前', ip: '192.168.1.101' },
  { id: 3, module: '系统管理', action: '配置更新', user: 'admin', time: '3小时前', ip: '192.168.1.102' }
];

const mockUserGrowthData = [
  { month: '1月', count: 1200 },
  { month: '2月', count: 1500 },
  { month: '3月', count: 1800 },
  { month: '4月', count: 2200 },
  { month: '5月', count: 2800 }
];

const mockTransactionTrendData = [
  { month: '1月', amount: 50000 },
  { month: '2月', amount: 65000 },
  { month: '3月', amount: 80000 },
  { month: '4月', amount: 95000 },
  { month: '5月', amount: 120000 }
];

const mockRecruitmentFunnelData = [
  { stage: '简历筛选', count: 1000 },
  { stage: '面试', count: 300 },
  { stage: 'Offer发放', count: 100 },
  { stage: '入职', count: 80 }
];

// 通用API请求函数
export const apiRequest = async (url, options = {}) => {
  try {
    const response = await fetch(`${API_BASE_URL}${url}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers
      },
      ...options
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || '请求失败');
    }

    return data;
  } catch (error) {
    console.error('API请求失败:', error);
    throw error;
  }
};

// 统一的API错误处理
export const handleApiError = (error) => {
  console.error('API错误:', error);

  // 可以根据错误类型显示不同的错误提示
  if (error.message.includes('401')) {
    // 未授权，跳转到登录页
    console.log('用户未登录，需要重新登录');
  } else if (error.message.includes('403')) {
    // 权限不足
    console.log('您没有权限执行此操作');
  } else {
    // 其他错误
    console.log('请求失败，请稍后重试');
  }
};
