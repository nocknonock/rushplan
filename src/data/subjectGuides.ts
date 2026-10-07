import { SubjectTactics } from '../types/kaoyan';

export const SUBJECT_TACTICS: SubjectTactics[] = [
  {
    id: 'math2',
    name: '数学二',
    fullName: '全国硕士研究生统一考试 · 数学二 (工学门类)',
    scoreWeight: '150分 (占比 30%)',
    deadlineDate: '10月22日收口强化，10月23日正式开启近15年真题套卷',
    currentStatus: '高数下册多元微分/二重积分/方程 + 线性代数全家桶快速攻坚中',
    tacticalDirective: '舍弃冗长录播课，以讲义例题为骨架；遮住答案做例题，卡壳才看讲解；拒绝张宇1000题偏怪题；10.23准时开刷2010-2024真题！',
    keyFormulasAndTemplates: [
      {
        title: '多元函数偏微分方程化简代换 SOP',
        formulaOrConcept: '链式求导：∂z/∂x = (∂z/∂u)(∂u/∂x) + (∂z/∂v)(∂v/∂x)；二阶混合偏导需将中间项当复合函数再次链式展开',
        tips: '画树状图避免漏项；极坐标变换下注意 r 和 θ 的复合偏导公式',
      },
      {
        title: '二重积分对称性秒杀口诀',
        formulaOrConcept: '奇偶对称性：关于y轴对称，被积函数关于x奇函数则积分为0，偶函数则等于两倍半区域积分；轮换对称性：若区域关于 y=x 对称，则 ∬ f(x)dσ = ∬ f(y)dσ = 1/2 ∬ [f(x)+f(y)]dσ',
        tips: '看到复杂的对数或反三角被积函数，第一眼检查区域轮换对称性，往往瞬间化简',
      },
      {
        title: '二阶常系数非齐次线性微分方程特解设定对照表',
        formulaOrConcept: '① f(x)=e^(λx)Pm(x) -> y* = x^k Qm(x)e^(λx)（k为λ是特征根的重数：0, 1, 2）\n② f(x)=e^(αx)[Pcosβx + Qsinβx] -> y* = x^k e^(αx)[...cosβx + ...sinβx]（k为α±iβ是特征根重数：0, 1）',
        tips: 'k的判断是失分最高点，设定特解前必须先解出对应的齐次特征根',
      },
      {
        title: '伴随矩阵 A* 八大黄金恒等式',
        formulaOrConcept: '1. AA* = A*A = |A|E\n2. |A*| = |A|^(n-1)\n3. (A*)^(-1) = (A^(-1))* = A / |A|\n4. (A*)* = |A|^(n-2) A\n5. (kA)* = k^(n-1) A*\n6. (AB)* = B* A*\n7. (A^T)* = (A*)^T\n8. r(A*): 若r(A)=n则r(A*)=n；若r(A)=n-1则r(A*)=1；若r(A)<n-1则r(A*)=0',
        tips: '线代选择题压轴题常客，遇到 A* 优先联立 AA* = |A|E',
      },
      {
        title: '实对称矩阵相似对角化施密特正交化步骤',
        formulaOrConcept: '1. 求解特征方程 det(λE-A)=0 获得特征值\n2. 求解齐次方程组 (λE-A)x=0 获得特征向量\n3. 实对称矩阵不同特征值天然正交；对重根特征向量进行施密特正交化：β2 = α2 - [(α2,β1)/(β1,β1)] β1\n4. 单位化获得正交矩阵 P，满足 P^T A P = Λ',
        tips: '重根必须正交化，单根只需单位化，正交矩阵列向量必须与对角矩阵特征值顺序严格对应',
      },
    ],
    bannedTraps: [
      '禁忌1：坚决不碰“向量空间”和“线性方程组几何意义”，那是数一专属！',
      '禁忌2：严禁从头到尾被动看视频！只听概念不听例题等于扔掉西瓜捡芝麻！',
      '禁忌3：严禁花几小时死磕张宇1000题B组/C组怪题，讲义经典例题比它高贵十倍！',
    ],
    examBigQuestions: [
      {
        topic: '多元微分与偏微分方程化简/拉格朗日最值',
        typicalScore: '12分',
        breakthroughSteps: [
          '写出代换变量的偏导关系式',
          '准确代入原方程并消除交叉混杂项',
          '积分求解并反代原自变量，代入初始条件确定任意函数',
        ],
      },
      {
        topic: '微分方程几何/物理应用',
        typicalScore: '12分',
        breakthroughSteps: [
          '微元法建立 dy/dx 几何关系或牛顿第二定律 F=m(dv/dt)',
          '判断方程类型（一阶线性/可降阶）套公式求解',
          '根据初值条件确定常数 C',
        ],
      },
      {
        topic: '实对称矩阵正交对角化与二次型化标准形',
        typicalScore: '12分',
        breakthroughSteps: [
          '写出二次型矩阵 A',
          '求出特征值并求解对应特征向量',
          '施密特正交化并单位化得到正交变换矩阵 P',
          '写出标准形及可逆坐标变换 x = Py',
        ],
      },
    ],
  },
  {
    id: 'co',
    name: '计算机组成原理',
    fullName: '408 计算机学科专业基础综合 · 计算机组成原理',
    scoreWeight: '45分 (408第一大科)',
    deadlineDate: '10月20日彻底收工强化',
    currentStatus: '第2章收口中，重点攻坚第3章存储与第5章CPU',
    tacticalDirective: '王道课本基础知识不看录播；只做带年份的统考真题选择；大题死守第3章Cache容量与第5章数据通路/流水线两大王牌！',
    keyFormulasAndTemplates: [
      {
        title: 'Cache组相联主存地址划分与容量计算公式',
        formulaOrConcept: '块内偏移Offset = log2(块大小B)；组号Index = log2(Cache组数)；Tag = 主存物理地址位数 - Index - Offset\nCache总容量 = 行数 × (1位有效位 + 脏位(若写回法) + Tag位数 + LRU位 + 块大小×8位)',
        tips: '算总容量时切勿只算数据容量，标记阵列Tag、有效位和脏位必须全部算入！',
      },
      {
        title: 'IEEE 754 单精度浮点数格式',
        formulaOrConcept: '1位数符S + 8位阶码E(移码，偏置值127) + 23位尾数M(规格化隐藏最高位1)\n真值 = (-1)^S × (1.M) × 2^(E - 127)',
        tips: '阶码全0或全1有特殊含义（0表示非规格化数/零，全1表示无穷大/NaN）',
      },
      {
        title: '单周期/多周期数据通路控制信号读图法则',
        formulaOrConcept: '从指令寄存器 IR 译码 -> 判断指令类型 -> 沿总线追踪 ALU 两端操作数源 -> 确定 ALU 控制码 -> 判断访存信号 MemRead/MemWrite -> 结果写回目标寄存器 RegWrite',
        tips: '遇到复杂数据通路图，先看寄存器堆的输入选通器MUX受哪根控制线驱动',
      },
      {
        title: '指令流水线性能指标与冲突解决',
        formulaOrConcept: '吞吐率 TP = n / [(k + n - 1)Δt]；加速比 S = nkΔt / [(k + n - 1)Δt]\nRAW写后读数据冲突最有效硬件解法：数据旁路/转发技术(Bypassing/Forwarding)',
        tips: '数据转发直接从 ALU 输出或访存缓冲引回 ALU 输入，无需等待写回寄存器',
      },
    ],
    bannedTraps: [
      '禁忌1：严禁重做王道自编课后模拟题！那些抠硬件死角计算的题統考根本不考！',
      '禁忌2：严禁看全套计组录播！遇到数据通路大题卡壳只看单题专题课！',
    ],
    examBigQuestions: [
      {
        topic: 'Cache组相联映射与虚存地址划分综合大题',
        typicalScore: '13~15分',
        breakthroughSteps: [
          '根据编址单位（字节）确定地址总位数',
          '切分 Offset、Index、Tag 各占多少位',
          '根据十六进制访问序列判断命中/缺失，给出Cache组内行更新',
        ],
      },
      {
        topic: 'CPU数据通路与微操作控制信号分析大题',
        typicalScore: '13~15分',
        breakthroughSteps: [
          '顺着数据流向找到指令对应的数据流',
          '写出对应周期的寄存器传输级(RTL)微操作表达式',
          '将各部件控制信号标为 0 或 1',
        ],
      },
    ],
  },
  {
    id: 'os',
    name: '操作系统',
    fullName: '408 计算机学科专业基础综合 · 操作系统',
    scoreWeight: '35分 (408第二大科)',
    deadlineDate: '10月31日彻底收工强化',
    currentStatus: '10.21启动，11天精准打击',
    tacticalDirective: '第2章PV操作大题年年必考7-10分必须拿满模板分；第3章内存与计组联动；借力计组已学知识光速速通！',
    keyFormulasAndTemplates: [
      {
        title: 'PV操作标准四大步骤工作流',
        formulaOrConcept: '1. 确定进程类别与动作角色\n2. 寻找进程间的同步与互斥关系（谁等谁）\n3. 定义信号量初值（互斥mutex=1，资源empty=N, full=0）\n4. 圈定P/V位置（申请资源P在互斥P之前，互斥V紧挨着临界区，释放资源V在后）',
        tips: '改卷老师按步骤给分，只要初值和结构对，局部小漏洞也能拿90%分数！',
      },
      {
        title: '银行家算法安全性检查表',
        formulaOrConcept: 'Available(可用资源向量)；Need = Max - Allocation(尚需资源矩阵)；寻找 Need_i <= Work 的进程，执行完毕后释放资源 Work = Work + Allocation_i',
        tips: '只要找到一个合法安全序列（如 P1->P3->P0->P2）即可证明系统处于安全状态',
      },
      {
        title: 'TLB + 页表 + Cache 跨学科全链路寻址',
        formulaOrConcept: '虚拟地址 -> [VPN+PO] -> 查TLB快表 -> (若命中得PPN) / (若未命中查内存页表得PPN) -> 物理地址 [PPN+PO] -> 划分[Tag+Index+Offset] -> 查Cache -> (命中读数据) / (未命中读主存)',
        tips: 'TLB命中必不缺页；缺页必TLB未命中；页内偏移PO全程直接映射到物理地址块内偏移',
      },
    ],
    bannedTraps: [
      '禁忌1：PV操作千万不要把互斥P写在同步P前面！会导致死锁扣大分！',
      '禁忌2：不要花时间把非真题操作系统选择题重算，真题套路极其固定！',
    ],
    examBigQuestions: [
      {
        topic: 'PV操作同步互斥伪代码设计',
        typicalScore: '8~10分',
        breakthroughSteps: [
          '声明 semaphore 变量并赋初值',
          '写出各个进程的主循环过程 while(1)',
          '严格配对 P/V 操作',
        ],
      },
      {
        topic: '虚拟内存地址翻译与页面置换缺页计算',
        typicalScore: '7~8分',
        breakthroughSteps: [
          '计算虚页号与物理页号',
          '利用 FIFO / LRU / CLOCK 算法追踪内存物理块状态',
          '统计缺页中断次数并计算缺页率',
        ],
      },
    ],
  },
  {
    id: 'cn',
    name: '计算机网络',
    fullName: '408 计算机学科专业基础综合 · 计算机网络',
    scoreWeight: '25分 (性价比最高)',
    deadlineDate: '11月10日彻底收工强化',
    currentStatus: '11.01启动，10天精准速通',
    tacticalDirective: '两头快中间狠！第4章CIDR路由与第5章TCP拥塞控制两大阵地焊死大题，第1、2、6章只刷真题选择！',
    keyFormulasAndTemplates: [
      {
        title: '奈氏准则 vs 香农公式对比速查',
        formulaOrConcept: '奈氏准则(无噪信道)：极限数据率 = 2W log2 V [b/s]（W为带宽Hz，V为离散电平数）\n香农公式(有噪信道)：极限数据率 = W log2(1 + S/N) [b/s]（注意 SNR(dB) = 10 log10(S/N) 转换！）',
        tips: '若题目同时给两种条件，分别算出后取较小值！',
      },
      {
        title: 'CSMA/CD 最小帧长公式',
        formulaOrConcept: '最小帧长 = 争用期(2τ往返传播时延) × 数据传输速率 = 2 × (距离/传播速度) × 数据速率',
        tips: '帧长小于最小帧长的均为碰撞碎片/残帧，交换机或网卡直接丢弃！',
      },
      {
        title: 'TCP 拥塞控制四算法折线图法则',
        formulaOrConcept: '1. 慢开始：从 cwnd=1 开始指数增长，直到达到 ssthresh 门限\n2. 拥塞避免：到达 ssthresh 后转为线性加法增大(+1)\n3. 收到3个冗余ACK(快重传)：ssthresh减半，cwnd设为新ssthresh，转快恢复线性增长\n4. 超时Timeout：ssthresh减半，cwnd瞬间重置为1，重新进入慢开始',
        tips: '仔细审题是超时重传还是收到3个重复ACK，二者处理截然不同！',
      },
    ],
    bannedTraps: [
      '禁忌1：不要死背琐碎的冷门协议英文缩写，抓中文核心功能！',
      '禁忌2：发送时延(数据长/速率)与传播时延(距离/电磁波速)决不能混淆！',
    ],
    examBigQuestions: [
      {
        topic: 'CIDR子网划分、路由聚合与转发表查询',
        typicalScore: '8~9分',
        breakthroughSteps: [
          '写出各子网所需IP主机数并向上取整到 2^k',
          '分配子网前缀与子网掩码',
          '按最长前缀匹配原则确定下一跳转发端口',
        ],
      },
      {
        topic: 'TCP连接状态机与拥塞控制窗口计算',
        typicalScore: '8~9分',
        breakthroughSteps: [
          '画出三次握手序号 seq 与确认号 ack 变化',
          '按轮次列出 cwnd 增长数值',
          '准确标出发生拥塞后新的 ssthresh 与 cwnd 值',
        ],
      },
    ],
  },
  {
    id: 'ds',
    name: '数据结构',
    fullName: '408 计算机学科专业基础综合 · 数据结构',
    scoreWeight: '45分 (基石科目)',
    deadlineDate: '9月已完成强化！现处于周期性防遗忘维护模式',
    currentStatus: '最硬的盾已铸成，停止单科真题，留至11.11套卷检验',
    tacticalDirective: '9月死磕代码和错题已完成历史使命！每周只需花30分钟翻阅一次算法模板与错题，绝不再单刷数据结构真题！',
    keyFormulasAndTemplates: [
      {
        title: '408算法大题保底策略（暴力解法哲学）',
        formulaOrConcept: '考场上想不出最优解时：立刻写出双重循环或暴力枚举解法！\n设计思想写清楚时间复杂度O(n^2)、空间复杂度O(1)，代码逻辑规范，13-15分的大题稳拿9-11分基本分！',
        tips: '绝不要为了死磕最优算法浪费40分钟导致后面计组OS大题没时间写！',
      },
      {
        title: '二叉树与图遍历高频代码模板',
        formulaOrConcept: '二叉树递归遍历（先序/中序/后序）；层次遍历（队列辅助）；图的深度优先DFS（递归+visited数组）与广度优先BFS（队列+visited）',
        tips: '很多大题本质就是二叉树后序遍历或DFS的微调变种',
      },
    ],
    bannedTraps: [
      '禁忌1：坚决停止单科刷数据结构真题！真题必须留到套卷保持完整性！',
      '禁忌2：不要沉迷于最优算法的奇技淫巧，能拿分的代码就是好代码！',
    ],
    examBigQuestions: [
      {
        topic: '算法设计与分析大题',
        typicalScore: '13~15分',
        breakthroughSteps: [
          '第(1)问：用中文清晰陈述算法基本设计思想',
          '第(2)问：用 C/C++ 语言写出函数实现（变量名清晰，加简明注释）',
          '第(3)问：给出时间复杂度和空间复杂度分析',
        ],
      },
    ],
  },
  {
    id: 'english',
    name: '考研英语',
    fullName: '全国硕士研究生统一考试 · 英语二 / 英语一',
    scoreWeight: '100分 (稳定过线与提分)',
    deadlineDate: '每日严格限时维持，10.20加作文，11月中旬新题型',
    currentStatus: '每日1篇精做+1篇复盘，节奏健康，严控70分钟内',
    tacticalDirective: '得阅读者得天下，严控耗时在70分钟内；10月下旬启动个人专属作文模板；11月中旬新题型集中技巧攻坚；完型翻译后期扫尾！',
    keyFormulasAndTemplates: [
      {
        title: '70分钟阅读高效流水线',
        formulaOrConcept: '18分钟做题（抓题干定位词、看首末句、排除干扰项） -> 35分钟精读（挑出2-3个长难句拆分主谓宾、记录5个真题核心生词） -> 15分钟复盘昨日错题词汇',
        tips: '绝不要把一篇阅读做成语文翻译作业！耗时超过80分钟就是不及格的复习！',
      },
      {
        title: '大小作文三段式通用骨架',
        formulaOrConcept: '小作文（书信/告示）：第1段自我介绍+写作目的；第2段要点分条阐述(First, Furthermore, In addition)；第3段期待回复与客套致谢\n大作文：第1段图画/图表客观描述；第2段深层原因剖析与社会影响；第3段未来展望与个人见解倡议',
        tips: '10月下旬整理属于自己的功能句模板，避开所有人都在用的廉价模板句',
      },
    ],
    bannedTraps: [
      '禁忌1：现在坚决不要碰完形填空！20道题才10分，性价比最低！',
      '禁忌2：不要背几十篇范文死记硬背，脑容量留给408和政治！',
    ],
    examBigQuestions: [
      {
        topic: '传统阅读理解 Part A',
        typicalScore: '40分',
        breakthroughSteps: [
          '读题干不读选项，圈出段落定位词',
          '定位原文句子，精读上下文转折关系',
          '同义替换选出正确项，识别偷换概念/无中生有干扰项',
        ],
      },
      {
        topic: '大小作文写作',
        typicalScore: '25~30分',
        breakthroughSteps: [
          '审题明确信件类型或图表核心趋势',
          '套用预先准备好的功能句骨架填充细节词',
          '保持卷面极其工整，无低级主谓一致与时态语病',
        ],
      },
    ],
  },
  {
    id: 'politics',
    name: '考研政治',
    fullName: '全国硕士研究生统一考试 · 思想政治理论',
    scoreWeight: '100分 (保65-70分)',
    deadlineDate: '11月10日停刷1000题，转入肖八；12月狂背肖四',
    currentStatus: '小程序刷题+背诵手册，严格限时45-60分钟/天',
    tacticalDirective: '彻底放弃全套几十小时录播课！以背诵手册为锚，小程序刷500-600道核心选择；错题荧光笔回填手册；11.10肖八上市前严禁超标占用时间！',
    keyFormulasAndTemplates: [
      {
        title: '45分钟三步闭环作业法',
        formulaOrConcept: '15分钟读背诵手册对应小节粗体字与表格 -> 20分钟小程序刷该节真题/核心选择题20道 -> 10分钟看解析并将错题知识点在手册上用荧光笔划一道',
        tips: '手册就是你的终极错题集，后期只需翻画记号的手册！',
      },
      {
        title: '各科目减法优先级',
        formulaOrConcept: '马原（逻辑深，重点精刷） > 史纲（抓住会议和土地政策线索重点刷） > 思修（靠常识速刷单选） > 毛中特新思想（不刷老题，留给11月时政与肖八）',
        tips: '新思想紧跟今年最新重要会议精神，刷往年老题毫无意义！',
      },
    ],
    bannedTraps: [
      '禁忌1：严禁看全套徐涛录播课！60多个小时会直接抽干你复习数学和408的救命时间！',
      '禁忌2：严禁企图刷完1600题纸质书！错题率高是正常现象，不要焦虑内耗！',
      '禁忌3：10月和11月上旬绝不要碰主观分析题！主观题全部在12月肖四上解决！',
    ],
    examBigQuestions: [
      {
        topic: '多项选择题（政治拉开差距的核心）',
        typicalScore: '34分 (17题×2分)',
        breakthroughSteps: [
          '识别绝对化词汇（“彻底解决”、“完全消除”通常排除）',
          '对照提干主旨，答非所问即使陈述正确也不选',
          '利用小程序定期清空错题本，避免重复踩坑',
        ],
      },
      {
        topic: '五大主观分析题（12月冲刺）',
        typicalScore: '50分',
        breakthroughSteps: [
          '马原：抄材料找关键词，匹配对应哲学原理，原理+方法论+结合材料三段式',
          '毛中特/史纲/思修/当代：12月狂背肖四四套卷，分点分段工整默写',
        ],
      },
    ],
  },
];
