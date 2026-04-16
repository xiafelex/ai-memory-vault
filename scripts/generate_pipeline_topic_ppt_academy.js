const PptxGenJS = require("pptxgenjs");
const SHAPE = new PptxGenJS().ShapeType;

const C = {
  ink: "1F2937",
  navy: "182838",
  steel: "35536B",
  blue: "4E6E8E",
  cream: "FBF8F3",
  sand: "F2ECE2",
  copper: "B97733",
  rust: "A5522A",
  sage: "5C7A63",
  mint: "E7F0EA",
  paleBlue: "EAF0F5",
  paleCopper: "F4E7D9",
  paleRed: "F7E7E1",
  paleGray: "EEF1F4",
  white: "FFFFFF",
  gray: "667085",
  lightLine: "D9D2C7",
};

function addTitle(slide, title, subtitle = "", dark = false) {
  slide.addText(title, {
    x: 0.58, y: 0.38, w: 8.85, h: 0.5,
    fontSize: dark ? 28 : 24,
    bold: true,
    color: dark ? C.white : C.navy,
    margin: 0
  });
  if (subtitle) {
    slide.addText(subtitle, {
      x: 0.6, y: 0.92, w: 8.6, h: 0.24,
      fontSize: 10.5,
      color: dark ? "D9E2EC" : C.gray,
      margin: 0
    });
  }
}

function addFooter(slide, page, dark = false) {
  slide.addText(String(page).padStart(2, "0"), {
    x: 9.3, y: 5.02, w: 0.35, h: 0.18,
    fontSize: 9,
    color: dark ? "C9D4DF" : "8B9299",
    align: "right",
    margin: 0,
  });
}

function addSectionLabel(slide, text, x, y, fill = C.navy, color = C.white) {
  slide.addShape(SHAPE.roundRect, {
    x, y, w: 1.18, h: 0.28,
    rectRadius: 0.08,
    line: { color: fill, transparency: 100 },
    fill: { color: fill }
  });
  slide.addText(text, {
    x, y: y + 0.04, w: 1.18, h: 0.15,
    fontSize: 9.5, bold: true, color, align: "center", margin: 0
  });
}

function addCard(slide, { x, y, w, h, title, body, fill = C.white, accent = C.copper, titleColor = C.navy }) {
  slide.addShape(SHAPE.roundRect, {
    x, y, w, h,
    rectRadius: 0.06,
    fill: { color: fill },
    line: { color: fill, transparency: 100 },
    shadow: { type: "outer", color: "000000", blur: 1, offset: 1, angle: 45, opacity: 0.08 }
  });
  slide.addShape(SHAPE.rect, {
    x: x + 0.14, y: y + 0.16, w: 0.08, h: h - 0.32,
    fill: { color: accent }, line: { color: accent, transparency: 100 }
  });
  slide.addText(title, {
    x: x + 0.32, y: y + 0.16, w: w - 0.45, h: 0.24,
    fontSize: 15, bold: true, color: titleColor, margin: 0
  });
  slide.addText(body, {
    x: x + 0.32, y: y + 0.48, w: w - 0.42, h: h - 0.58,
    fontSize: 10.6, color: C.ink, margin: 0, fit: "shrink"
  });
}

function addPill(slide, text, x, y, w, fill) {
  slide.addShape(SHAPE.roundRect, {
    x, y, w, h: 0.28,
    rectRadius: 0.08,
    fill: { color: fill }, line: { color: fill, transparency: 100 }
  });
  slide.addText(text, {
    x, y: y + 0.04, w, h: 0.14,
    fontSize: 9.3, color: C.white, bold: true, align: "center", margin: 0
  });
}

async function main() {
  const pptx = new PptxGenJS();
  pptx.layout = "LAYOUT_16x9";
  pptx.author = "Codex for 夏斐";
  pptx.company = "AI Memory Vault";
  pptx.subject = "高校沟通版";
  pptx.title = "石化管道预制焊接排产系统研发与校企合作设想";
  pptx.lang = "zh-CN";

  // Slide 1
  {
    const s = pptx.addSlide();
    s.background = { color: C.navy };
    s.addShape(SHAPE.rect, {
      x: 0, y: 0, w: 10, h: 5.625,
      fill: { color: C.navy }, line: { color: C.navy, transparency: 100 }
    });
    s.addShape(SHAPE.rect, {
      x: 6.8, y: 0, w: 3.2, h: 5.625,
      fill: { color: C.steel, transparency: 14 }, line: { color: C.steel, transparency: 100 }
    });
    s.addShape(SHAPE.line, {
      x: 6.58, y: 0.52, w: 0, h: 4.6,
      line: { color: C.copper, width: 2.5 }
    });
    s.addText("石化管道预制焊接排产系统研发", {
      x: 0.64, y: 0.78, w: 5.6, h: 0.6,
      fontSize: 27, bold: true, color: C.white, margin: 0
    });
    s.addText("与高校合作交流的必要性、现状与演进设想", {
      x: 0.66, y: 1.5, w: 5.0, h: 0.28,
      fontSize: 14, color: "D9E2EC", margin: 0
    });
    addPill(s, "行业核心场景", 0.66, 2.14, 1.34, C.copper);
    addPill(s, "施工组织决策", 2.08, 2.14, 1.36, C.blue);
    addPill(s, "校企协同升级", 3.52, 2.14, 1.36, C.sage);
    s.addText("这不是单纯做一个排产软件，而是围绕石油化工建设中最核心、最复杂、最难标准化的管道场景，逐步把经验型施工组织、数据治理和动态决策能力沉淀成可复制的平台和未来可升级的智能系统。", {
      x: 0.68, y: 2.98, w: 5.5, h: 1.02,
      fontSize: 13, color: C.white, margin: 0, fit: "shrink"
    });
    s.addText("交流提要", {
      x: 7.05, y: 0.86, w: 1.6, h: 0.22,
      fontSize: 12, bold: true, color: C.white, margin: 0
    });
    [
      "为什么这个问题必须解决",
      "为什么选择管道排产作为切口",
      "我们当前已经具备哪些能力",
      "后续希望如何与高校合作"
    ].forEach((t, i) => {
      s.addShape(SHAPE.ellipse, {
        x: 7.06, y: 1.28 + i * 0.68, w: 0.22, h: 0.22,
        fill: { color: C.copper }, line: { color: C.copper, transparency: 100 }
      });
      s.addText(t, {
        x: 7.38, y: 1.23 + i * 0.68, w: 2.12, h: 0.24,
        fontSize: 11, color: C.white, margin: 0
      });
    });
    addFooter(s, 1, true);
  }

  // Slide 2
  {
    const s = pptx.addSlide();
    s.background = { color: C.cream };
    addTitle(s, "我们具体在做什么", "把现场施工组织中最关键的两个决策问题做成系统。");
    addSectionLabel(s, "课题定义", 0.58, 0.92, C.copper);
    s.addShape(SHAPE.roundRect, {
      x: 0.72, y: 1.28, w: 4.02, h: 1.08,
      rectRadius: 0.06, fill: { color: C.paleBlue }, line: { color: C.paleBlue, transparency: 100 }
    });
    s.addText("问题一", { x: 0.96, y: 1.5, w: 0.68, h: 0.16, fontSize: 10.5, bold: true, color: C.blue, margin: 0 });
    s.addText("明天已有若干组人，应该去哪里干活？", {
      x: 0.96, y: 1.76, w: 3.38, h: 0.32, fontSize: 17, bold: true, color: C.navy, margin: 0
    });
    s.addShape(SHAPE.roundRect, {
      x: 5.02, y: 1.28, w: 4.16, h: 1.08,
      rectRadius: 0.06, fill: { color: C.paleCopper }, line: { color: C.paleCopper, transparency: 100 }
    });
    s.addText("问题二", { x: 5.28, y: 1.5, w: 0.68, h: 0.16, fontSize: 10.5, bold: true, color: C.copper, margin: 0 });
    s.addText("基于现场状态，还需要投入多少组人？", {
      x: 5.28, y: 1.76, w: 3.5, h: 0.32, fontSize: 17, bold: true, color: C.navy, margin: 0
    });
    addCard(s, {
      x: 0.72, y: 2.72, w: 2.52, h: 1.52,
      title: "输入对象",
      body: "设计模型、材料状态、作业面交付条件、焊工能力、材质工艺和现场约束。",
      fill: C.white, accent: C.blue
    });
    addCard(s, {
      x: 3.74, y: 2.72, w: 2.52, h: 1.52,
      title: "核心处理",
      body: "数据治理、编码统一、预制/现场焊缝划分、可焊工作面判断、工作包与排产生成。",
      fill: C.white, accent: C.copper
    });
    addCard(s, {
      x: 6.76, y: 2.72, w: 2.42, h: 1.52,
      title: "直接输出",
      body: "第二天谁去哪里干、哪些区域可焊、哪些材料要提前备齐、哪些风险要前移处理。",
      fill: C.white, accent: C.sage
    });
    s.addShape(SHAPE.roundRect, {
      x: 0.72, y: 4.48, w: 8.46, h: 0.72,
      rectRadius: 0.06,
      fill: { color: C.paleBlue }, line: { color: C.paleBlue, transparency: 100 }
    });
    s.addText("一句话理解：这套系统不是做“报表”和“流转”，而是把原来靠项目经理、老板、队长临场拍板的施工组织决策，逐步变成可判断、可复用、可提前暴露问题的系统能力。", {
      x: 0.96, y: 4.73, w: 7.78, h: 0.22, fontSize: 12.4, color: C.ink, margin: 0, fit: "shrink"
    });
    addFooter(s, 2);
  }

  // Slide 3
  {
    const s = pptx.addSlide();
    s.background = { color: C.white };
    addTitle(s, "为什么这个课题必须做", "行业体量大、场景复杂、经营压力真实存在。");
    addSectionLabel(s, "必要性", 0.58, 0.92, C.navy);
    addCard(s, {
      x: 0.72, y: 1.36, w: 2.62, h: 1.72,
      title: "管道是核心业务场景",
      body: "它承接钢结构、设备安装、电仪等多个专业，又贯穿材料、防腐、焊接、检测、试压、吹扫等环节，天然牵动全局。",
      fill: C.paleBlue, accent: C.blue
    });
    addCard(s, {
      x: 3.66, y: 1.36, w: 2.68, h: 1.72,
      title: "行业体量大且计价逻辑清晰",
      body: "国内相关企业众多，大型企业年体量可达千万寸，中型企业约数百万寸。管道工程普遍按寸口计价，适合形成效率和成本改进模型。",
      fill: C.paleCopper, accent: C.copper
    });
    addCard(s, {
      x: 6.6, y: 1.36, w: 2.58, h: 1.72,
      title: "现实痛点是“不轻松也不赚钱”",
      body: "很多项目里，管道专业组织复杂、返工多、尾期赶工重，实际执行成本容易高于投标测算，甚至需要其他专业利润补贴。",
      fill: C.paleRed, accent: C.rust
    });
    s.addShape(SHAPE.roundRect, {
      x: 0.72, y: 3.42, w: 8.46, h: 1.34,
      rectRadius: 0.06,
      fill: { color: C.navy }, line: { color: C.navy, transparency: 100 }
    });
    s.addText("课题目标", {
      x: 0.98, y: 3.7, w: 1.1, h: 0.18, fontSize: 12, bold: true, color: C.white, margin: 0
    });
    s.addText("技术中心希望围绕这一核心场景，把“干管道轻松干、干管道赚钱”逐步做成现实：先让现场稳定出产量，再把成本、仓储、质量、试压和后续智能化能力串起来。", {
      x: 0.98, y: 4.02, w: 7.7, h: 0.42, fontSize: 12.4, color: C.white, margin: 0, fit: "shrink"
    });
    addFooter(s, 3);
  }

  // Slide 4
  {
    const s = pptx.addSlide();
    s.background = { color: C.cream };
    addTitle(s, "当前模式为什么容易在后期失控", "前期问题被掩盖，试压阶段集中暴露。");
    addSectionLabel(s, "原有模式", 0.58, 0.92, C.copper);
    addCard(s, {
      x: 0.72, y: 1.34, w: 4.04, h: 1.18,
      title: "第一个高峰：项目刚开始",
      body: "管理人员要集中处理图纸、关系、焊接数据库和前序条件，先把材料、焊材、班组和焊缝基础数据准备起来。",
      fill: C.white, accent: C.blue
    });
    addCard(s, {
      x: 0.72, y: 2.72, w: 4.04, h: 1.18,
      title: "第二个高峰：试压阶段",
      body: "试压包要求焊接结束、排片合格、尾项 punchlist 关闭、支架螺栓和严重质量问题消除，前期没解决的问题会在这一阶段集中暴露。",
      fill: C.white, accent: C.rust
    });
    addCard(s, {
      x: 0.72, y: 4.1, w: 4.04, h: 0.74,
      title: "典型结果",
      body: "每天检查、开会、补料、加人、赶工，连续一两个月高压推进。",
      fill: C.white, accent: C.sage
    });
    s.addShape(SHAPE.roundRect, {
      x: 5.05, y: 1.42, w: 4.1, h: 3.45,
      rectRadius: 0.08,
      fill: { color: C.navy }, line: { color: C.navy, transparency: 100 }
    });
    s.addText("为什么会失控", {
      x: 5.38, y: 1.74, w: 1.4, h: 0.22, fontSize: 12, bold: true, color: C.white, margin: 0
    });
    s.addText("很多项目当前采用“项目部协调外围条件、老板和队长组织现场干活”的模式。前期产量往往能掩盖问题，但材料缺口、前置交付、尾项关闭和质量风险并没有被前移管理；到了试压阶段，问题无法继续被掩盖，最终演变成工期、成本、疲劳、人才流失和项目声誉一起受损。", {
      x: 5.38, y: 2.08, w: 3.38, h: 1.54, fontSize: 12.4, color: C.white, margin: 0, fit: "shrink"
    });
    s.addText("这也是我们必须把问题从“事后追着跑”改成“前面就判断和组织起来”的原因。", {
      x: 5.38, y: 4.18, w: 3.14, h: 0.3, fontSize: 11.6, color: "D9E2EC", margin: 0, fit: "shrink"
    });
    addFooter(s, 4);
  }

  // Slide 5
  {
    const s = pptx.addSlide();
    s.background = { color: C.white };
    addTitle(s, "为什么选择“管道预制焊接排产”作为切口", "因为它是最能牵引全局、也最能形成核心竞争力的场景。");
    addSectionLabel(s, "切口逻辑", 0.58, 0.92, C.navy);
    s.addShape(SHAPE.roundRect, {
      x: 0.72, y: 1.32, w: 4.02, h: 1.08,
      rectRadius: 0.06, fill: { color: C.paleBlue }, line: { color: C.paleBlue, transparency: 100 }
    });
    s.addText("为什么不是仓储", { x: 0.96, y: 1.5, w: 1.2, h: 0.16, fontSize: 10.5, bold: true, color: C.blue, margin: 0 });
    s.addText("仓储是下游，材料怎么领、怎么匹配，最终仍取决于前端工单和排产逻辑。", {
      x: 0.96, y: 1.76, w: 3.45, h: 0.3, fontSize: 14.2, bold: true, color: C.navy, margin: 0, fit: "shrink"
    });
    s.addShape(SHAPE.roundRect, {
      x: 5.02, y: 1.32, w: 4.16, h: 1.08,
      rectRadius: 0.06, fill: { color: C.paleCopper }, line: { color: C.paleCopper, transparency: 100 }
    });
    s.addText("为什么不是自动焊", { x: 5.28, y: 1.5, w: 1.25, h: 0.16, fontSize: 10.5, bold: true, color: C.copper, margin: 0 });
    s.addText("自动焊重要，但投入高、适用范围有限、设备与工艺难点多，不适合作为当前第一突破口。", {
      x: 5.28, y: 1.76, w: 3.42, h: 0.3, fontSize: 14.2, bold: true, color: C.navy, margin: 0, fit: "shrink"
    });
    addCard(s, {
      x: 0.72, y: 2.78, w: 8.46, h: 1.58,
      title: "为什么是排产",
      body: "排产不是一个附属功能，而是连接设计、材料、焊接、试压、仓储、成本和现场组织的核心决策场景。只有先把这个场景做深，后续仓储、成本、自动焊和通用管理系统才有更可靠的业务基础。",
      fill: C.paleGray, accent: C.sage
    });
    s.addShape(SHAPE.roundRect, {
      x: 0.72, y: 4.56, w: 8.46, h: 0.5,
      rectRadius: 0.05, fill: { color: C.navy }, line: { color: C.navy, transparency: 100 }
    });
    s.addText("一句话：谁最能牵引全局，谁就适合作为第一切口。", {
      x: 0.98, y: 4.72, w: 7.6, h: 0.16, fontSize: 12.2, color: C.white, margin: 0
    });
    addFooter(s, 5);
  }

  // Slide 6
  {
    const s = pptx.addSlide();
    s.background = { color: C.cream };
    addTitle(s, "系统第一阶段重点解决什么", "先解决“出产量”，而不是一开始就追求复杂全局最优。");
    addSectionLabel(s, "核心逻辑", 0.58, 0.92, C.copper);
    addCard(s, {
      x: 0.72, y: 1.36, w: 2.62, h: 1.46,
      title: "先抓核心指标：寸口数",
      body: "评价产量不是简单看焊口数量，而是看寸口数。它更能反映不同管径焊缝的真实工作量。",
      fill: C.white, accent: C.blue
    });
    addCard(s, {
      x: 3.62, y: 1.36, w: 2.06, h: 1.46,
      title: "目标是减少焊工等待",
      body: "不是焊工焊不出来，而是前面没有把能焊的条件组织出来。",
      fill: C.white, accent: C.copper
    });
    addCard(s, {
      x: 5.96, y: 1.36, w: 1.02, h: 1.46,
      title: "先看工艺匹配",
      body: "碳钢、不锈钢、氩气保护、焊材、工装等都是硬约束。",
      fill: C.white, accent: C.sage
    });
    addCard(s, {
      x: 7.22, y: 1.36, w: 1.96, h: 1.46,
      title: "再看连续作业条件",
      body: "尽量同一区域、不跨楼层、少挪动，尽量用最少的配电箱和辅助资源。",
      fill: C.white, accent: C.rust
    });
    addCard(s, {
      x: 0.72, y: 3.1, w: 8.46, h: 1.5,
      title: "底层判断",
      body: "系统不是先算一个“漂亮计划”，而是先判断能否形成可焊工作面：材料是否到位并匹配，管工能否完成组对，作业面是否具备条件，是否适合连续集中作业，以及质量安全程序是否提前闭合。只有这些前置条件组织起来，产量才会真正释放。",
      fill: C.paleGray, accent: C.navy
    });
    addFooter(s, 6);
  }

  // Slide 7
  {
    const s = pptx.addSlide();
    s.background = { color: C.white };
    addTitle(s, "我们已经做到哪一步", "不是从零开始，而是已完成前两阶段关键验证。");
    addSectionLabel(s, "现有基础", 0.58, 0.92, C.navy);
    addCard(s, {
      x: 0.72, y: 1.36, w: 2.82, h: 2.85,
      title: "阶段一：基础数字化与平台建设",
      body: "获得江苏省科技进步三等奖、化工建设科技创新一等成果、国内先进成果鉴定、江苏省安装行业 BIM 竞赛二等奖，并获批江苏省企业技术中心、石化信息化工程研究中心、BIM 职工创新工作室、江苏省两化融合贯标先进单位。",
      fill: C.paleBlue, accent: C.blue
    });
    addCard(s, {
      x: 3.84, y: 1.36, w: 2.82, h: 2.85,
      title: "阶段二：核心能力突破与行业验证",
      body: "获得第六届工程建设 BIM 大赛特等奖、第九届建设工程 BIM 大赛一等奖、第九届型建香港 BIM 大赛金奖，连续三年江苏省安装行业优秀论文一等奖，并取得多项科技论文荣誉。",
      fill: C.paleCopper, accent: C.copper
    });
    addCard(s, {
      x: 6.96, y: 1.36, w: 2.22, h: 2.85,
      title: "阶段三：平台封装与业务服务",
      body: "已为江苏美思德新材料有限公司、中石化南京工程公司、中国化学工程第十四建设有限公司开展实际业务服务，并同步推进阶段三与阶段四的探索研究。",
      fill: C.mint, accent: C.sage
    });
    addFooter(s, 7);
  }

  // Slide 8
  {
    const s = pptx.addSlide();
    s.background = { color: C.cream };
    addTitle(s, "后续准备怎么演进，以及为什么希望和高校合作", "第三阶段做平台和服务，第四、第五阶段更需要外部协同。");
    addSectionLabel(s, "后续路线", 0.58, 0.92, C.copper);
    addCard(s, {
      x: 0.72, y: 1.36, w: 2.58, h: 1.5,
      title: "阶段三：平台封装与业务服务",
      body: "继续把焊接、质量、仓储等能力做成可复用平台，并通过外部项目服务增加样本和需求反馈。",
      fill: C.white, accent: C.sage
    });
    addCard(s, {
      x: 3.62, y: 1.36, w: 2.58, h: 1.5,
      title: "阶段四：工程框架升级",
      body: "学习 WorkPacks 等成熟框架，逐步把进度、成本、采购和更高阶算法接入现有体系。",
      fill: C.white, accent: C.copper
    });
    addCard(s, {
      x: 6.52, y: 1.36, w: 2.66, h: 1.5,
      title: "阶段五：AI 场景化与产学研协同",
      body: "把三维模型和管道工程逐步抽象成 AI 可学习场景，引入优化算法、强化学习和图模型等更高阶方法。",
      fill: C.white, accent: C.blue
    });
    addCard(s, {
      x: 0.72, y: 3.24, w: 4.06, h: 1.5,
      title: "为什么现在合作合适",
      body: "我们已经有真实项目、真实数据、真实业务服务和阶段性成果，下一步不是从零搭系统，而是把关键算法、平台能力和研究框架继续做深。",
      fill: C.paleGray, accent: C.navy
    });
    addCard(s, {
      x: 5.12, y: 3.24, w: 4.06, h: 1.5,
      title: "希望和高校一起做什么",
      body: "围绕排产优化、图论建模、强化学习、三维模型智能分析、研究生联合培养、联合申报和产学研平台建设形成长期合作。",
      fill: C.navy, accent: C.copper, titleColor: C.white
    });
    addFooter(s, 8);
  }

  // Slide 9
  {
    const s = pptx.addSlide();
    s.background = { color: C.navy };
    addTitle(s, "汇报结论", "问题导向明确，工程基础扎实，具备进一步合作的现实条件。", true);
    addPill(s, "结论", 0.66, 1.08, 0.92, C.copper);
    s.addText("我们真正想推动的，不是简单把一个工程环节软件化，而是围绕管道这一石油化工建设的核心业务场景，把依赖经验的施工组织问题，逐步沉淀成可复制、可推广、可持续升级的系统能力。", {
      x: 0.68, y: 1.62, w: 5.6, h: 1.02,
      fontSize: 17, color: C.white, margin: 0, fit: "shrink"
    });
    s.addText("也希望通过与高校合作，把这一真实工程场景进一步上升为可研究、可育人、可转化的产学研协同课题。", {
      x: 0.68, y: 2.92, w: 5.55, h: 0.45,
      fontSize: 14, color: "D9E2EC", margin: 0
    });
    const next = [
      "问题真实，且长期存在",
      "已有平台、奖项和服务基础",
      "下一阶段需要算法与AI协同",
      "具备校企联合攻关条件"
    ];
    next.forEach((t, i) => {
      s.addShape(SHAPE.roundRect, {
        x: 6.55, y: 1.3 + i * 0.78, w: 2.65, h: 0.54,
        rectRadius: 0.05,
        fill: { color: i % 2 === 0 ? C.steel : "2B3D50" },
        line: { color: "FFFFFF", transparency: 100 }
      });
      s.addText(t, {
        x: 6.78, y: 1.46 + i * 0.78, w: 2.14, h: 0.18,
        fontSize: 10.5, color: C.white, margin: 0, fit: "shrink"
      });
    });
    addFooter(s, 9, true);
  }

  await pptx.writeFile({ fileName: "outputs/石化管道预制焊接排产系统_高校沟通版.pptx" });
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
