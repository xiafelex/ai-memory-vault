const pptxgen = require("pptxgenjs");
const SHAPE = new pptxgen().ShapeType;

const C = {
  ink: "1F2937",
  navy: "1E2A39",
  steel: "3B536B",
  blue: "4C6A88",
  sand: "F4F0E8",
  cream: "FBF8F3",
  copper: "C57B39",
  rust: "A9542A",
  sage: "5F7A61",
  mist: "DCE4EA",
  white: "FFFFFF",
  gray: "6B7280",
  lightLine: "D7D2C8",
  paleBlue: "EAF0F5",
  paleCopper: "F3E5D6",
  paleGreen: "E6EFE8",
  paleRed: "F6E7E0",
};

function addTitle(slide, title, subtitle = "", dark = false) {
  slide.addText(title, {
    x: 0.55, y: 0.38, w: 8.8, h: 0.55,
    fontSize: dark ? 28 : 24,
    bold: true,
    color: dark ? C.white : C.navy,
    margin: 0,
  });
  if (subtitle) {
    slide.addText(subtitle, {
      x: 0.58, y: 0.95, w: 8.5, h: 0.3,
      fontSize: 10.5,
      color: dark ? "DCE4EA" : C.gray,
      margin: 0,
    });
  }
}

function addFooter(slide, page, dark = false) {
  slide.addText(String(page).padStart(2, "0"), {
    x: 9.35, y: 5.05, w: 0.35, h: 0.22,
    fontSize: 9,
    color: dark ? "C9D2DB" : "8A9199",
    align: "right",
    margin: 0,
  });
}

function addPill(slide, text, x, y, w, fill, color = C.white) {
  slide.addShape(SHAPE.roundRect, {
    x, y, w, h: 0.28,
    rectRadius: 0.08,
    line: { color: fill, transparency: 100 },
    fill: { color: fill },
  });
  slide.addText(text, {
    x: x + 0.1, y: y + 0.04, w: w - 0.2, h: 0.16,
    fontSize: 9.5,
    color,
    align: "center",
    margin: 0,
  });
}

function addCard(slide, { x, y, w, h, title, body, fill = C.white, titleColor = C.navy, bodyColor = C.ink, accent = C.copper }) {
  slide.addShape(SHAPE.roundRect, {
    x, y, w, h,
    rectRadius: 0.06,
    line: { color: fill, transparency: 100 },
    fill: { color: fill },
    shadow: { type: "outer", color: "000000", blur: 1, offset: 1, angle: 45, opacity: 0.08 },
  });
  slide.addShape(SHAPE.rect, {
    x: x + 0.14, y: y + 0.18, w: 0.08, h: h - 0.36,
    line: { color: accent, transparency: 100 },
    fill: { color: accent },
  });
  slide.addText(title, {
    x: x + 0.32, y: y + 0.16, w: w - 0.45, h: 0.28,
    fontSize: 15,
    bold: true,
    color: titleColor,
    margin: 0,
  });
  slide.addText(body, {
    x: x + 0.32, y: y + 0.5, w: w - 0.42, h: h - 0.62,
    fontSize: 10.5,
    color: bodyColor,
    breakLine: false,
    fit: "shrink",
    margin: 0,
    valign: "top",
  });
}

function addSectionLabel(slide, text, x, y, fill = C.navy, color = C.white) {
  slide.addShape(SHAPE.roundRect, {
    x, y, w: 1.15, h: 0.28,
    rectRadius: 0.08,
    line: { color: fill, transparency: 100 },
    fill: { color: fill },
  });
  slide.addText(text, {
    x, y: y + 0.04, w: 1.15, h: 0.16,
    fontSize: 9.5, color, bold: true, align: "center", margin: 0,
  });
}

async function main() {
const pptx = new pptxgen();
pptx.layout = "LAYOUT_16x9";
pptx.author = "Codex for 夏斐";
pptx.company = "AI Memory Vault";
pptx.subject = "石化管道预制焊接排产系统";
pptx.title = "石化管道预制焊接排产系统研发的必要性与演进路径";
pptx.lang = "zh-CN";
pptx.theme = {
  headFontFace: "Aptos",
  bodyFontFace: "Aptos",
  lang: "zh-CN",
};

// Slide 1
{
  const s = pptx.addSlide();
  s.background = { color: C.navy };
  s.addShape(SHAPE.rect, {
    x: 0, y: 0, w: 10, h: 5.625,
    line: { color: C.navy, transparency: 100 },
    fill: { color: C.navy },
  });
  s.addShape(SHAPE.rect, {
    x: 6.85, y: 0, w: 3.15, h: 5.625,
    line: { color: C.steel, transparency: 100 },
    fill: { color: C.steel, transparency: 12 },
  });
  s.addShape(SHAPE.line, {
    x: 6.65, y: 0.55, w: 0, h: 4.55,
    line: { color: C.copper, width: 2.5 },
  });
  s.addText("石化管道预制焊接排产系统研发", {
    x: 0.62, y: 0.72, w: 5.6, h: 0.72,
    fontSize: 28,
    bold: true,
    color: C.white,
    margin: 0,
  });
  s.addText("必要性与演进路径汇报框架（讨论稿）", {
    x: 0.66, y: 1.58, w: 4.8, h: 0.3,
    fontSize: 14,
    color: "D8E2EC",
    margin: 0,
  });
  addPill(s, "核心业务场景", 0.66, 2.2, 1.38, C.copper);
  addPill(s, "施工组织决策", 2.12, 2.2, 1.42, C.blue);
  addPill(s, "平台化演进", 3.62, 2.2, 1.18, C.sage);
  s.addText("这不是单纯做一个排产软件，而是围绕石化管道这一核心业务场景，逐步把施工组织经验、数据治理、预制边界判断和动态排产能力沉淀成可复制的方法、平台和未来可持续升级的智能系统。", {
    x: 0.68, y: 3.05, w: 5.45, h: 1.05,
    fontSize: 13,
    color: C.white,
    margin: 0,
    fit: "shrink",
  });
  s.addText("汇报主线", {
    x: 7.05, y: 0.82, w: 1.5, h: 0.24,
    fontSize: 12,
    bold: true,
    color: C.white,
    margin: 0,
  });
  const points = [
    "为什么必须做",
    "为什么选排产为切口",
    "当前模式的问题",
    "市场与竞争格局",
    "演进阶段与下一步"
  ];
  points.forEach((p, i) => {
    s.addShape(SHAPE.ellipse, {
      x: 7.05, y: 1.25 + i * 0.62, w: 0.22, h: 0.22,
      line: { color: C.copper, transparency: 100 },
      fill: { color: C.copper },
    });
    s.addText(p, {
      x: 7.37, y: 1.2 + i * 0.62, w: 2.2, h: 0.25,
      fontSize: 11,
      color: C.white,
      margin: 0,
    });
  });
  addFooter(s, 1, true);
}

// Slide 2
{
  const s = pptx.addSlide();
  s.background = { color: C.cream };
  addTitle(s, "为什么必须做这个课题", "先讲必要性，而不是先讲技术词。");
  addSectionLabel(s, "必要性", 0.58, 0.92, C.copper);
  addCard(s, {
    x: 0.58, y: 1.38, w: 2.15, h: 1.47,
    title: "核心专业",
    body: "管道承接钢结构、设备安装、电仪等多个专业，是石油化工建设中间的关键环节。",
    fill: C.white, accent: C.copper
  });
  addCard(s, {
    x: 2.92, y: 1.38, w: 2.15, h: 1.47,
    title: "高复杂度",
    body: "项目差异大、重复性低，高温高压与有毒有害介质又带来更高质量与过程控制要求。",
    fill: C.white, accent: C.blue
  });
  addCard(s, {
    x: 5.26, y: 1.38, w: 2.15, h: 1.47,
    title: "高组织成本",
    body: "涉及材料、防腐、焊接、检测、试压、吹扫、保温防腐等多个环节，天然需要系统组织。",
    fill: C.white, accent: C.sage
  });
  addCard(s, {
    x: 7.6, y: 1.38, w: 1.82, h: 1.47,
    title: "经营压力",
    body: "现实里很多项目管道专业既不轻松，也不赚钱。",
    fill: C.white, accent: C.rust
  });
  s.addShape(SHAPE.roundRect, {
    x: 0.58, y: 3.25, w: 8.84, h: 1.5,
    rectRadius: 0.06,
    fill: { color: C.paleBlue }, line: { color: C.paleBlue, transparency: 100 }
  });
  s.addText("一句话理解", {
    x: 0.82, y: 3.48, w: 1.3, h: 0.22, fontSize: 12, bold: true, color: C.navy, margin: 0
  });
  s.addText("这不是一个容易标准化、却又不得不做好的核心业务场景。课题的价值，不只是提升一项施工效率，而是要把原本依赖经验和高强度协调的管道组织方式，逐步变成可判断、可安排、可复制的系统能力。", {
    x: 0.82, y: 3.82, w: 8.22, h: 0.65,
    fontSize: 13, color: C.ink, margin: 0, fit: "shrink"
  });
  addFooter(s, 2);
}

// Slide 3
{
  const s = pptx.addSlide();
  s.background = { color: C.white };
  addTitle(s, "原有管理模式的核心问题", "不是没有人干，而是缺少系统性方法。");
  addSectionLabel(s, "现状", 0.58, 0.92, C.navy);
  s.addShape(SHAPE.line, {
    x: 1.0, y: 2.3, w: 7.8, h: 0,
    line: { color: C.lightLine, width: 2 },
  });
  const peaks = [
    { x: 1.25, title: "项目启动高峰", note: "图纸、关系、数据库、前序条件准备" },
    { x: 6.0, title: "试压阶段高峰", note: "前期问题集中暴露、每日检查开会补救" }
  ];
  peaks.forEach((p, i) => {
    s.addShape(SHAPE.ellipse, {
      x: p.x, y: 1.95, w: 0.42, h: 0.42,
      fill: { color: i === 0 ? C.blue : C.rust }, line: { color: "FFFFFF", transparency: 100 }
    });
    s.addText(p.title, {
      x: p.x - 0.25, y: 1.43, w: 1.55, h: 0.3,
      fontSize: 13, bold: true, color: C.navy, align: "center", margin: 0
    });
    s.addText(p.note, {
      x: p.x - 0.55, y: 2.55, w: 1.95, h: 0.55,
      fontSize: 10.2, color: C.gray, align: "center", margin: 0, fit: "shrink"
    });
  });
  addCard(s, {
    x: 0.82, y: 3.45, w: 2.1, h: 1.25,
    title: "前期靠人硬撑",
    body: "图纸、材料、数据库、前序交付靠管理层高强度推进。",
    fill: C.paleBlue, accent: C.blue
  });
  addCard(s, {
    x: 3.16, y: 3.45, w: 2.1, h: 1.25,
    title: "后期集中爆雷",
    body: "缺材料、尾项未关、试压受阻、产量上不去，问题在后期集中冒出。",
    fill: C.paleCopper, accent: C.copper
  });
  addCard(s, {
    x: 5.5, y: 3.45, w: 2.1, h: 1.25,
    title: "成本与疲劳叠加",
    body: "临时补料、加班加人、连续高压，成本和组织疲劳同时上升。",
    fill: C.paleGreen, accent: C.sage
  });
  addCard(s, {
    x: 7.84, y: 3.45, w: 1.4, h: 1.25,
    title: "声誉受损",
    body: "试压数据真实，后期最能暴露真实管理水平。",
    fill: C.paleRed, accent: C.rust
  });
  addFooter(s, 3);
}

// Slide 4
{
  const s = pptx.addSlide();
  s.background = { color: C.cream };
  addTitle(s, "为什么选“管道预制焊接排产”作为切口", "核心不是功能多少，而是谁最能牵引全局。");
  addSectionLabel(s, "切口", 0.58, 0.92, C.copper);
  const left = [
    ["不是先做仓储", "仓储偏下游和被动管理，材料怎么领、怎么分配，最终还是由前端工单和排产逻辑决定。"],
    ["不是先做自动焊", "自动焊是生产力方向，但投入高、工艺和设备难点多，且不是所有项目都适用。"],
    ["不是先做成本系统", "成本管理需要真实作业组织和资源消耗逻辑作为基础，排产没做实，成本管理难做深。"],
    ["不是先做普通项目管理系统", "通用系统供应商很多，不是核心业务突破口，必须先在管道核心场景形成突破。"],
  ];
  left.forEach((item, i) => {
    addCard(s, {
      x: 0.7, y: 1.35 + i * 0.88, w: 4.0, h: 0.72,
      title: item[0], body: item[1], fill: C.white,
      accent: [C.blue, C.rust, C.sage, C.copper][i]
    });
  });
  s.addShape(SHAPE.roundRect, {
    x: 5.1, y: 1.5, w: 4.12, h: 2.95, rectRadius: 0.08,
    fill: { color: C.navy }, line: { color: C.navy, transparency: 100 }
  });
  s.addText("真正的切口判断", {
    x: 5.45, y: 1.82, w: 2.8, h: 0.3,
    fontSize: 16, bold: true, color: C.white, margin: 0
  });
  s.addText("排产不是一个附属功能，而是连接设计、材料、焊接、试压、仓储、成本和现场组织的核心决策场景。先把这个场景做深，后续仓储、成本、自动焊和项目管理系统才有更可靠的业务基础。", {
    x: 5.45, y: 2.28, w: 3.38, h: 1.25,
    fontSize: 13, color: C.white, margin: 0, fit: "shrink"
  });
  s.addShape(SHAPE.line, {
    x: 5.45, y: 3.88, w: 2.95, h: 0,
    line: { color: C.copper, width: 2.5 }
  });
  s.addText("判断标准：谁最能牵引全局，谁就适合作为第一切口。", {
    x: 5.45, y: 4.02, w: 3.3, h: 0.42,
    fontSize: 11.5, color: "D8E2EC", margin: 0
  });
  addFooter(s, 4);
}

// Slide 5
{
  const s = pptx.addSlide();
  s.background = { color: C.white };
  addTitle(s, "这个课题到底要解决什么问题", "先回答现场组织问题，再谈算法。");
  addSectionLabel(s, "问题", 0.58, 0.92, C.navy);
  s.addShape(SHAPE.roundRect, {
    x: 0.72, y: 1.34, w: 4.05, h: 1.15,
    rectRadius: 0.06, fill: { color: C.paleBlue }, line: { color: C.paleBlue, transparency: 100 }
  });
  s.addText("问题一", { x: 0.98, y: 1.58, w: 0.7, h: 0.2, fontSize: 11, bold: true, color: C.blue, margin: 0 });
  s.addText("现在有若干组人，去哪里干活是更优解？", {
    x: 0.98, y: 1.85, w: 3.4, h: 0.36, fontSize: 17, bold: true, color: C.navy, margin: 0
  });
  s.addShape(SHAPE.roundRect, {
    x: 5.05, y: 1.34, w: 4.05, h: 1.15,
    rectRadius: 0.06, fill: { color: C.paleCopper }, line: { color: C.paleCopper, transparency: 100 }
  });
  s.addText("问题二", { x: 5.32, y: 1.58, w: 0.7, h: 0.2, fontSize: 11, bold: true, color: C.copper, margin: 0 });
  s.addText("基于现场当前状态，还需要投入多少人？", {
    x: 5.32, y: 1.85, w: 3.35, h: 0.36, fontSize: 17, bold: true, color: C.navy, margin: 0
  });
  const chain = [
    ["焊工等待", C.rust],
    ["管工组不出来", C.blue],
    ["材料未到/未匹配", C.sage],
    ["作业面未准备好", C.copper],
    ["质量安全程序未闭合", C.gray],
  ];
  chain.forEach((item, i) => {
    const y = 3.05 + i * 0.38;
    s.addShape(SHAPE.roundRect, {
      x: 1.05 + i * 0.15, y, w: 3.0 - i * 0.1, h: 0.26,
      rectRadius: 0.06, fill: { color: item[1] }, line: { color: item[1], transparency: 100 }
    });
    s.addText(item[0], {
      x: 1.15 + i * 0.15, y: y + 0.055, w: 2.65, h: 0.14,
      fontSize: 10, color: C.white, margin: 0
    });
  });
  s.addText("关键理解：系统不是只排“焊工”，而是要把可焊工作面形成所需的前置条件组织出来。", {
    x: 5.1, y: 3.15, w: 3.8, h: 0.72,
    fontSize: 13, color: C.ink, bold: true, margin: 0, fit: "shrink"
  });
  s.addText("材料是否到位并匹配、管工能否组对、作业面是否具备条件、是否适合连续集中作业，以及质量安全程序是否提前闭合，才是排产真正的决策对象。", {
    x: 5.1, y: 3.95, w: 3.8, h: 0.8,
    fontSize: 11.5, color: C.gray, margin: 0, fit: "shrink"
  });
  addFooter(s, 5);
}

// Slide 6
{
  const s = pptx.addSlide();
  s.background = { color: C.cream };
  addTitle(s, "第一阶段先解决什么", "先解决“出产量”，不急着追求复杂全局最优。");
  addSectionLabel(s, "阶段一", 0.58, 0.92, C.copper);
  addCard(s, {
    x: 0.72, y: 1.38, w: 4.2, h: 3.2,
    title: "第一阶段的判断逻辑",
    body: "第一优先级是减少焊工等待时间。核心不是单纯给焊工排班，而是先形成稳定可焊工作面。\n\n要先匹配：\n- 焊工能力与材质\n- 焊接工艺与辅助资源\n- 同一区域连续作业条件\n- 钢结构/设备等前置专业交付条件",
    fill: C.white, accent: C.blue
  });
  s.addShape(SHAPE.roundRect, {
    x: 5.18, y: 1.38, w: 4.08, h: 1.38,
    rectRadius: 0.06, fill: { color: C.navy }, line: { color: C.navy, transparency: 100 }
  });
  s.addText("核心指标：寸口数", {
    x: 5.46, y: 1.66, w: 2.2, h: 0.24, fontSize: 16, bold: true, color: C.white, margin: 0
  });
  s.addText("不是看焊口数量，而是看每个焊缝寸径的求和数，更接近真实工作量。", {
    x: 5.46, y: 2.02, w: 3.35, h: 0.32, fontSize: 11.5, color: "D8E2EC", margin: 0
  });
  addCard(s, {
    x: 5.18, y: 2.98, w: 1.88, h: 1.55,
    title: "普通项目",
    body: "预制\n70 寸/天/焊工\n\n安装\n40 寸/天/焊工",
    fill: C.paleBlue, accent: C.blue
  });
  addCard(s, {
    x: 7.38, y: 2.98, w: 1.88, h: 1.55,
    title: "标准严格项目",
    body: "预制\n45 寸/天/焊工\n\n安装\n15 寸/天/焊工",
    fill: C.paleCopper, accent: C.copper
  });
  addFooter(s, 6);
}

// Slide 7
{
  const s = pptx.addSlide();
  s.background = { color: C.white };
  addTitle(s, "市场必要性与经营背景", "这是一个大市场，但当前效率和利润都不理想。");
  addSectionLabel(s, "市场", 0.58, 0.92, C.navy);
  addCard(s, {
    x: 0.72, y: 1.38, w: 2.2, h: 1.45,
    title: "行业容量",
    body: "大型企业约 1000 万寸/年\n中型企业约 300 万寸/年\n小型企业也有几十万寸",
    fill: C.paleBlue, accent: C.blue
  });
  addCard(s, {
    x: 3.1, y: 1.38, w: 2.2, h: 1.45,
    title: "计价基础",
    body: "管道工程大多按寸口计价，天然适合形成效率与成本改进模型。",
    fill: C.paleGreen, accent: C.sage
  });
  addCard(s, {
    x: 5.48, y: 1.38, w: 1.72, h: 1.45,
    title: "碳钢价格",
    body: "60-180 元/寸口\n（标准壁厚）",
    fill: C.paleCopper, accent: C.copper
  });
  addCard(s, {
    x: 7.38, y: 1.38, w: 1.72, h: 1.45,
    title: "不锈钢价格",
    body: "通常再高约 10 元\n并随复杂度波动",
    fill: C.paleRed, accent: C.rust
  });
  s.addShape(SHAPE.roundRect, {
    x: 0.72, y: 3.18, w: 8.38, h: 1.38,
    rectRadius: 0.06, fill: { color: C.navy }, line: { color: C.navy, transparency: 100 }
  });
  s.addText("经营判断", {
    x: 1.0, y: 3.48, w: 1.0, h: 0.2, fontSize: 12, bold: true, color: C.white, margin: 0
  });
  s.addText("投标价格并不等于真实执行成本。现实里很多项目管道专业并不赚钱，甚至要靠其他专业利润补贴。技术中心在这个课题上的一个经营目标，是推动“干管道轻松干、干管道赚钱”。", {
    x: 1.0, y: 3.82, w: 7.55, h: 0.48, fontSize: 13, color: C.white, margin: 0, fit: "shrink"
  });
  addFooter(s, 7);
}

// Slide 8
{
  const s = pptx.addSlide();
  s.background = { color: C.cream };
  addTitle(s, "组织层与国际化层面的意义", "系统不仅要解决技术问题，也要沉淀方法论。");
  addSectionLabel(s, "组织", 0.58, 0.92, C.copper);
  addCard(s, {
    x: 0.72, y: 1.36, w: 4.02, h: 3.15,
    title: "国内组织层面",
    body: "工程建设是多利益体参与的小社会。关系型队伍、老板型组织、层层转包普遍存在。\n\n问题不只是“谁来干”，而是即使有人想干好，也未必能系统性地解决协调、材料、质量、工人组织和施工节奏问题。\n\n系统的价值，是给不完美组织提供可执行的方法论。",
    fill: C.white, accent: C.blue
  });
  addCard(s, {
    x: 5.0, y: 1.36, w: 4.02, h: 3.15,
    title: "海外场景层面",
    body: "如果大量依赖中国工人，成本高、风险高；如果更多依赖当地外劳，虽然成本低，但会面临素质、语言、文化和执行习惯差异。\n\n因此必须把中国队伍的隐性经验沉淀成规则、工单、路径和系统指导能力，让别人照着也能干。",
    fill: C.white, accent: C.copper
  });
  addFooter(s, 8);
}

// Slide 9
{
  const s = pptx.addSlide();
  s.background = { color: C.white };
  addTitle(s, "课题演进现状：不是设想，而是已经走出来", "从基础数字化到业务服务，再到更高阶框架与 AI 场景。");
  addSectionLabel(s, "阶段", 0.58, 0.92, C.navy);
  const stages = [
    ["01", "基础数字化与平台建设", "已完成", C.blue],
    ["02", "核心能力突破与行业验证", "已完成", C.copper],
    ["03", "平台封装与业务服务", "进行中", C.sage],
    ["04", "工程框架升级与高级算法探索", "同步推进", C.rust],
    ["05", "AI 场景化与产学研协同", "下一阶段", C.gray],
  ];
  stages.forEach((st, i) => {
    const x = 0.8 + i * 1.84;
    s.addShape(SHAPE.ellipse, {
      x, y: 1.72, w: 0.44, h: 0.44,
      fill: { color: st[3] }, line: { color: st[3], transparency: 100 }
    });
    s.addText(st[0], {
      x, y: 1.83, w: 0.44, h: 0.14,
      fontSize: 9, color: C.white, bold: true, align: "center", margin: 0
    });
    if (i < stages.length - 1) {
      s.addShape(SHAPE.line, {
        x: x + 0.44, y: 1.94, w: 1.3, h: 0,
        line: { color: C.lightLine, width: 1.5 }
      });
    }
    s.addText(st[1], {
      x: x - 0.22, y: 2.38, w: 1.58, h: 0.55,
      fontSize: 11.5, bold: true, color: C.navy, align: "center", margin: 0, fit: "shrink"
    });
    addPill(s, st[2], x - 0.08, 3.0, 0.96, st[3], C.white);
  });
  s.addText("当前判断：阶段三与阶段四已开始并行推进，一边做平台封装和业务服务，一边向更完整的工程框架和高级算法升级。", {
    x: 0.82, y: 4.15, w: 8.4, h: 0.42, fontSize: 12.5, color: C.gray, margin: 0, fit: "shrink"
  });
  addFooter(s, 9);
}

// Slide 10
{
  const s = pptx.addSlide();
  s.background = { color: C.cream };
  addTitle(s, "阶段成果验证", "阶段一、阶段二已形成外部认可，阶段三已经进入真实服务。");
  addSectionLabel(s, "验证", 0.58, 0.92, C.copper);
  addCard(s, {
    x: 0.72, y: 1.36, w: 2.85, h: 2.9,
    title: "阶段一：基础数字化与平台建设",
    body: "• 江苏省科技进步三等奖\n• 化工建设科技创新一等成果\n• 国内先进成果鉴定\n• 江苏省安装行业 BIM 竞赛二等奖\n• 江苏省企业技术中心\n• 石化信息化工程研究中心\n• BIM 职工创新工作室\n• 江苏省两化融合贯标先进单位",
    fill: C.white, accent: C.blue
  });
  addCard(s, {
    x: 3.83, y: 1.36, w: 2.85, h: 2.9,
    title: "阶段二：核心能力突破与行业验证",
    body: "• 第六届工程建设 BIM 大赛特等奖\n• 第九届建设工程 BIM 大赛一等奖\n• 第九届型建香港 BIM 大赛金奖\n• 连续三年江苏省安装行业优秀论文一等奖\n• 化工建设科技论文二等奖等多项荣誉",
    fill: C.white, accent: C.copper
  });
  addCard(s, {
    x: 6.94, y: 1.36, w: 2.28, h: 2.9,
    title: "阶段三：真实业务服务",
    body: "当前已为以下单位开展实际业务服务：\n\n• 江苏美思德新材料有限公司\n• 中石化南京工程公司\n• 中国化学工程第十四建设有限公司\n\n说明课题已从技术成果转向真实业务场景检验。",
    fill: C.white, accent: C.sage
  });
  addFooter(s, 10);
}

// Slide 11
{
  const s = pptx.addSlide();
  s.background = { color: C.white };
  addTitle(s, "当前竞争格局与差异化方向", "竞品判断先作为工作版本，后续继续修正。");
  addSectionLabel(s, "竞争", 0.58, 0.92, C.navy);
  addCard(s, {
    x: 0.72, y: 1.36, w: 4.1, h: 3.35,
    title: "当前市场上已有的能力",
    body: "• WorkPacks：AWP、数字线程、三维工作包\n• EPCPROMAN：端到端管理、齐套检查、图纸生成\n• 奥特：车间执行、二维码追溯\n• 绥通 PCMS：全流程在线流转、轻量化三维展示\n\n这些能力并不弱，但多数更偏数据贯通、流程流转、扫码追踪或图形交互。",
    fill: C.paleBlue, accent: C.blue
  });
  addCard(s, {
    x: 5.02, y: 1.36, w: 4.2, h: 3.35,
    title: "我们想做的差异化方向",
    body: "• 更重视非标准工程环境下的数据治理与映射\n• 更重视预制/现场安装边界的前置判断\n• 更重视事前决策，而不是事后记录\n• 更重视基于现场动态状态持续输出工作包\n• 更聚焦“如何持续形成可焊工作面”这一核心施工组织决策问题",
    fill: C.paleCopper, accent: C.copper
  });
  addFooter(s, 11);
}

// Slide 12
{
  const s = pptx.addSlide();
  s.background = { color: C.navy };
  addTitle(s, "结论与下一步", "先形成稳定汇报框架，再继续补充信息与修正判断。", true);
  addPill(s, "结论", 0.64, 1.08, 0.92, C.copper);
  s.addText("这个课题的意义，不只是提升某一项施工效率，而是围绕管道这一核心业务场景，逐步形成从数据治理、施工组织到经营改善都可落地、可复制、可持续升级的系统能力。", {
    x: 0.68, y: 1.62, w: 5.55, h: 0.92,
    fontSize: 17, color: C.white, margin: 0, fit: "shrink"
  });
  const next = [
    "继续补“必要性”的真实案例和数据",
    "把五阶段路线压成“目标-任务-标志-前提”",
    "进一步校准竞品判断和差异化表述",
    "再拆成正式 PPT 讲稿与项目路演版本"
  ];
  next.forEach((t, i) => {
    s.addShape(SHAPE.roundRect, {
      x: 6.55, y: 1.25 + i * 0.78, w: 2.65, h: 0.54,
      rectRadius: 0.05,
      fill: { color: i % 2 === 0 ? C.steel : "2A3A4D" },
      line: { color: "FFFFFF", transparency: 100 }
    });
    s.addText(t, {
      x: 6.78, y: 1.4 + i * 0.78, w: 2.15, h: 0.22,
      fontSize: 10.5, color: C.white, margin: 0, fit: "shrink"
    });
  });
  addFooter(s, 12, true);
}

await pptx.writeFile({ fileName: "outputs/石化管道预制焊接排产系统_必要性与演进路径_讨论稿.pptx" });
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
