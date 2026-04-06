# 发表论文-石化管道IDF文件架构解析与数据模型应用探索.pdf

- Source: `/Users/felex/Documents/Codex/Git 个人仓库/Felex 资料/带个人语言风格的论文和政策文件/发表论文-石化管道IDF文件架构解析与数据模型应用探索.pdf`

## Extracted Text

===== PAGE 1 =====
装置与安装
石化管道IDF文件架构解析与
数据模型应用探索
夏斐徐正玲刘念
南京南化建设有限公司江苏南京210044
摘要对国际主流石油化工管道3D设计软件生成的IDF格式文件架构进行详细解析，基于Numpy/Matplotlib
等Python模块和Deap遗传算法对文件中的元件物理数据和空间数据进行数据清洗和分析，编写了材料统
计、焊口数据、模型复现和派工排程等算法，并在多个项目数据准备中进行应用实践，解决了石油化工项目
管道BIM数字化用缺乏底层数据交互文件支持的问题，为探索中小型石化数字化施工提供了应用思路
借鉴。
关键词IDF石油化工管道模型数据分析遗传算法
中图分类号TE682 文献标志码B 文章编号1672-9323(2024)01-0045-06
IDF （Isogen Data File 或 Intermediate Data
File)[]和PCF(Piping Component File)[2]是由英国
Alias公司在20世纪开发的Isogen（Isometric Drawing
Generation），其工作流程如图1所示。管道轴测图生成
模块输出的两种关键中间文件格式。这些文件格式包含
了管道3D模型的关键信息，如材料和物理属性，用于生成
管线、管段和轴测图纸。IDF文件主要适用于
IntergraphPDS、PDMS、PASCE和Tribon等管道设计
软件，而PCF文件则被广泛应用于AutoPlant、Plant4D、
CADWorx、CATIA,Pro-Inventor和 CAESAR II等设
计软件中。这些文件格式具有以下特点：
（1)标准稳定：该文件架构沿用至今已经超过25年，
在全球石化领域设计、制造、施工各环节主流软件通用。
(2)施工导向：包括材质、尺寸、坐标等物理属性，可
以直接转换成施工适用的采购、计划、生产各环节信息。
(3保密性强：不包括压力、介质、温度等流程工艺属
性，有效保护化工流程的专利和技术秘密。
（4)扩展性高：预设超过25%的自定义项，提供了清晰
的解释文档集，便于进行二次开发和构建专属库文件。
以下将深人探讨IDF文件的架构和模块功能，并结合
过往项目中的管道施工数据准备、数据分析和算法设计
经验，详细阐述其特点及应用前景。
3D管道设计
IDF
PCF
Isogen
报告
图1Isogen工作流程
1IDF文件框架结构及模块说明
以南京南化建设有限公司某项目IDF文件为例，文件
架构各部分对应的区域如图2和图3所示。
2 2.0 5
===== PAGE 2 =====
quipment & installation
装置与安装
IDF文件构成
Option Switch
选项设置
MessageFile
文件信息
Component Data
元件数据
Material Control
材料控制数据
Report and Symbol
报表和符号设置
Unit Data
文件单元数据
Pipeline StartConnection
管线起始连接点
ItemCode
材料代码
Cut Pipe
切管表定义
Drawing Frame
图纸框架
Component Data
元件数据
ItemDescription
材料描述
Supports Summary
支架汇总
Pipeline Header
管线号信息
PipelineEnd Connection
管线末端连接点
End of FileMarker
文件标记终止符
Bolt Report
螺栓报告
图2IDF文件架构
12594
10 158
238A1TB52
11
100
600 2
Pipeline End Connection
29
7035920
108
2GB/T81
6080
1111 16111
63 BESH/T3
485
48
2038
101
8
1N15e,5-5TDSMLS
176
100
-28 135374967
-219 98度长半径寓头，
28
AVEVAPDMS
GB/T8163,
BE
tMk12.1 odraft
.SP4.54
Unit Data
-101Amy0150%/UND
Option Switch
SH/T3408,
MLS DN150, 5-STD
-1/HYA
-28
135376484
-102
/E:\IS0/plot
-21
等径三通，28GB/T
103
/APOMSEXEV/1S
-1
dsymbol.txt
T3408,
ItemCodeandDescription
105/E:IS0/mess
-1
108 /matt
-119
APOMSEXEN/TO
DrawingFrame
-28 11563
354616
-21
带平焊法兰，
ASTM
890111901
-1
-119
OMSEXE%/f1
-1
708 38948
DN150 -20115717332
42008
300
-21
-702 4580
1500 25
NBR,
8800
一
10106
1-158-A1TB52-
一
Pipeline Header
THK DN158 1.5
1858532B-PD-变更P
-28L2TCCAC2ANZZZ
D85-07
A1TB52-11
-21 118全操纹端柱6.2
1
NULL
1MOA/30CHoA, 厚型六角娱母，35CF
18/88/2022
5H/T3484
9180
-250~A1TB52-
PipelineStartConnection
1
-281142479893
-21
198422808253768080
1477755 198422088253760800
1477755 .BW
-1216-MCB,Z-1
Z48H
149
198422808 8253768088
1506634
-11-150C2,DN15
EndofFileMarker
108
198422808
8253768088
1477755
198422088253760008 1535514
1 ,NONE,
39HSTU_13423597
HGXeDBS
8/1
35
422008253760080
1535514 198422080253760000
1558414
150 2, _20
e,ELBW, 9e0e
999
39
134235978/136
27
POMSEXE/ippformat.txt
198422808253768080
1558414
198422820253782908
1558414
158 198422800258250080
1558414
158 m20
..ELBW, 900
eepcSVFil
f
Createformattedeportr."an"
E1-8-134-3 37
22 853SUPP-1029
6 ComponentData
AppvareData","off
Pipe Cut Definition
12
"onm."68","Page"
105 198422808275824088
1587714 190422086,275824800
1588614
15AS
O,FLSO,
134235978/826
138
275824080 1588764 198422080275824808
1615464
150 9，_AS
0,VTFL,
482ader
nrsierayof cut pipe Llengths for projet nuber -"Date'
ojectNunber
39 134235978/826
"pipelist" "on
4
nFor Pipeline References" "(metres)
118 198422800275824000
1615464 190422080275824800
1615614
1507
0NONE,
engths"
"bores"
perial"."le
134235978/826
95
btotal "itemcode.itler"."itemw."Titte2"."code"."width"."12"."space"
115
8,
118
Descr ription","Titlei""ItenDescription_andSpecitication
Title2",","width","3B","Space","3"
107
198422888275824880
1615614 198422008275824808
1618204
18,
AS
134235978/826
Lengcut Length "Title2
"<Units> "width-
"Space"2
96
"TruLengthn.Titlew"Length" iTitie2nits iwidthi.i1erisp
-33
Specreq" "Titlel
47 190422880275824088 198422882769878845
1558414 198422080275838380
1558414
TEBW, 9008
"pieceno" "Titleln."Piece"."Title2"."
'Special" 'Title2' "Req: NO.
width Space
1558414 19842200027610508
1558414
4 20
.TEBW.
pe it1
Batchrefri:Titer-Batchin nTite2crReferencens
"Reference cawidthatia-"spaceace
"widt "Space"."2"
图3某项目IDF文件框架示例
1.1文件选项开关
(1)Option Switch 2=1,生成切管表和切管标记；
文件选项开关(OptionSwitch)功能由1~140编号
(2)Option Switch 4/8=250/11,字体高度2.4mm,
的14列数字列表组成，负责控制生成的轴测图的图面、外
宽度2.0mm，标注偏移间距为6/12/18mm；
观、信息和报告内容。每个开关都包含一系列二级属性
(3) Option Switch 10/11/12/13=25/10/10/10,
定义，用于精确控制2D配管和3D管道设计产生的图纸和
图纸左侧页边距为25mm，其余边距为10mm。
报告。这些选项开关被分为七大类，包括制图管理器设
1.2文档信息
置、轴测图纸配置、标记和标注设置、材料属性设定、焊缝
文档信息（MessageFile)部分由三个主要组成部分
细节设定、管段特性设置以及切管操作相关的配置。以
构成：文件单元数据（UnitData）、图纸框架设计
示例第一排中序号为2/4/8/10/11/12/13的赋值为例，
其分别代表：
46石油化工建设2024.01
(Drawing Frame)和管线号信息(Pipeline Header)。这
些部分共同提供了关于设计文件的全面背景信息，包括
===== PAGE 3 =====
装置与安装
软件版本、图框定义、自定义符号文件位置、管线号、版 Records来标识的,这些标记指明了IDF文件中轴测图管
次、装置区域等关键数据，这些信息对于理解和操作设计 道的起始和终止连接点。一个典型的连接点示例是，管
文件至关重要。 线号053-LN1-10100-11-250-A1TB52-N的管道开始
1.2.1 Unit Data 于特定位置,并与另一管线053-LN1-10100-11-100-
Unit Data为2列数字列表，包括PDMS版本号。自 A1TB52-N连接。
定义符号文件位置，输出的图纸前缀和材料表信息，字体 ComponentData部分细分为三个关键部分：
文件设置信息。示例部分的Unit Data解析信息如下。 Component Records、Special Type Records 和 IDF
(1)-5:软件版本，AVEVA PDMS Isodraft Mk Component Structure。其中Component Records 涵盖
12.1.SP4.54; 了从管道到弯头等各种常用元件的标准代码；Special
(2)-101：图框定义文件的读取路径，/%hygiso%/ Type Records专用于图纸上的特殊标记，例如位置标记
UND/HYA; 和分图点；IDFComponentStructure则提供了元件的
（3）-103：自定义符号输人文件读取路径，/%PDM 详细物理和空间属性，包括元件的坐标位置、管径大小、
SEXE%/is-1dsymbo 1.txt。 材料特性等，为管道设计提供了精确的细节信息。
1.2.2 Drawing Frame 1.3.1 Component Records
DrawingFrame为16列数字列表，包括5列标准列 Component Records是由编号30～150的正数代码
(BasicTextPos）、3列数据列（TableData)和6列扩展列 组成，主要代表了常用各种元件的名称，例如管道、弯头，
(Extended TextPos)。以示例首列为“3"的多行数据赋 螺栓、垫片等。
值为例，其分别代表： 1.3.2 Special Type Records
(1)TextPos=-6/-700,管线名和指北针的坐标分别 SpecialType Records主要应用在图纸的标注上，
为42000/389402300/40000，高度为300/210mm； 例如Locationrecords，148与-38组合代表分图点，149
(2)TextPos=-702/-703,当前图纸页和图纸总页数 和-74组合代表菱形坐标标记，300代表公制坐标偏移量。
的位置为45800/48800、1500，高度为250mm； 1.3.3 IDF Component Structure
1.2.3 Pipeline Header IDFComponent Structure为14列字符，标记了元
PipelineHeader为2列数字列表，包括管线号、版 件字符串索引，包括起始点和终点坐标、管径、材料字符
次、装置区域、管道等级、压力等级、系统时间、保温类型 串和描述、重量、损耗、弯头角度、螺栓长度、保温、流向等
等信息。以示例首列为“-6/-8/-10～-14/”的四行数 信息。
据赋值为例，其分别代表： 主要的 Special Type Record、Component Data和
(1)-6/-8,管线号为 053-LN1-10100-11-150- Component Structure 如表1 所示。
A1TB52-N,版次为1; 以示例结构中表示的前五行信息，可以根据索引概
(2）-10/-11/-12/-13/-14，批次为S0532B- 括如下：项目坐标无初始偏移量；坐标（190422000，
PD85-07,材料等级为A1TB52,出图时间为2022.8.10。 253760000，1477755）处与前段管线对焊连接，焊口尺寸
1.3元件数据 DN150；坐标（190422000,253760000，1506634)处标记了
元件数据（ComponentData）部分是IDF文件的核 一个流向箭头；直径DN150直管由坐标（190422000，
心，其结合了MessageFile，包括管线起始和终端连接点 253760000，1477755）至坐标（190422000，253760000，
(PipelineStart/End Connection）和元件数据。这部分 1535514)与90°弯头相连，对应MaterialControl中的序
详细记录了管线的起始和终点连接信息，以及所有主要 号1和序号2属性；坐标（190422000，258250000，
管道构件的物理和空间属性，为管道设计提供了全面的 1558414)位置布置一根型号为E1-B-134-2，编号为
数据支持。Pipeline Start Connection和Pipeline End “053-SUPP-102912”的支架，对应Material Control中
Connection是通过-30至-36索引的Negative Text 的序号3材料属性。
油化 建设 24.1 1 4 7
===== PAGE 4 =====
Eauioment& intalation 装置与安装
序号 Record
1 100
2 105
3 115
4 120
5 150
7 -39
8 148
10 8
11
12
表1主要的Special Type Record，Component Data和Component Structure
300
序号注释
Pipe
Flange
Bolt
Weld
Pipe Support
Large Co-ordinate
offset-Medtric Units
Connection to another Pipeline
(1)Spool Identifier Position(-28 record)
(2)Positioned Comment(-37record)
(3)Drawing Split Point (-38 record)
中文注释
直管
法兰
螺栓
焊缝
支架
公制
偏移量
管线与管线连接点
(1)管段标记-148与-28
(2)坐标标记148与-37
(3)分图标记148与-38
2~7
Start Point and End point Co-Ordinate
起始
坐标点
Pipe Bore 管径
材料代码和描述
ItemCode/Description point
索引
12 Symbol Skey
元件符号
符号类型
Component Records
Component Records
Component Records
Component Records
Component Records
Special Type Records
Special Type Records
Special Type Records
Component Structure
Component Structure
Component Structure
Component Structure
1.4材料编码及描述
材料编码及描述(Item Code and Description)即材
料定义，是通过-20(Component Material Item Code)
和-21(Component Material Description)标记的多行
字符串来构成的。这些字符串的顺序与Component
Code 中的第九列（即 Item Code/Description Pointer)
直接相关。例如，文件中第三次出现的一20标记对应于
Pointer值为3的条目。材料代码和描述详细列出了管道
息，包括材料代码、尺寸、长度和数量等自定义信息。由
于这部分设置主要影响报表展示而非元件的基础数据，
因此不再进行详细讨论。
系统所用材料的规格和类型，如‘170359200：管子，
20 GB/T8163,BE,SH/405,SMLS,DN150,S-STD'或
'135374967:90°长半径弯头，20GB/T8163，BE，
SH/T3408,SMLS,DN150,S-STD'。
文件的结束由特定的End of File Marker标记,这
是以'999字符开头的一系列代码行。这个标记指示文
件读取过程中IDF文件内容的终点，标志着数据解析的
完成。
1.5报表符号设置文件
2数据分析与程序设计
综合上述数据分析,IDF文件的架构在功能上与民用
建筑BIM中广泛使用的IFC（IndustryFoundation
Classes)文件格式有诸多相似之处,特别是在文件管理、
数据解析和属性管理方面。这使得IDF文件成为石油化
工BIM数据交换的理想底层交互格式。尽管国际领先的
石化管道3D设计软件提供商，如AVEVA、Intergraph、
Bentley等供了如Spoolgen、Spool等施工图[3]和预制加
工模块[4],其在与上游设计数据的集成方面表现出色。但
同时也存在一些限制，如软件的封闭性、高昂的部署成本
和较高的操作难度。这些因素限制了石化行业在深化设
计和BIM应用领域的软件部署和二次开发，尤其与民用
建筑和轻工业机电安装领域（基于软件如Revit和Tekla
报表符号设置文件(Report and Symbol File)部分
涵盖了 CutPipe List,Support Summary和Bolt Report
等关键部分，这些部分专门定义了切管、支架和螺栓等项
目的相关信息。这些定义通常由PDMS等设计软件中的
Material List Column Definition 和 Cut Pipe Report
File Format模块控制，决定了输出报表中各列的显示信
4 化工建设 202.1 )
Structure)相比，数字化施工的普及和应用发展较为缓
慢。鉴于此，南京南化建设有限公司近年来一方面加强
与中科辅龙、北京高佳等国内软件公司的合作，另一方面
深入探索基于IDF文件特性的多种算法设计和应用。以
材料与焊接量快速统计、3D工区划分及派工排程为例，简
要阐述程序设计和实现过程。
===== PAGE 5 =====
装置与安装
2.1材料与焊接量快速统计 据分析的效率，而且为工区划分和资源配置提供了直观
利用JSON格式定义IDF文件的索引字符串和数据 的依据。基于IDF数据生成的工区焊缝密度3D图如图4
结构，创建idf_negative_records、idf_component_ 所示。
structure，idf_special_type_records 和 idf_component_
records等四个关键映射关系。这些JSON文件专门设计
用于辅助解析IDF文件的复杂结构，实现元件数据的高效
分类和提取。这一过程涉及数据模型的抽象和模式匹配
技术，确保解析的准确性和效率。
设定offsets字典以存储并管理IDF文件中各空间坐
标的初始偏移量。通过编写computeLjoint辅助函数，实
现对焊接点(joints)数量的自动化计算。进一步地，开发
extract_item_data函数，用于从IDF文件中提取关键元
件代码（如-20，一21），并将其解构为包含Pointer、Item
Code和Description的结构化列表，从而提高数据处理的
准确性和效率。
开发parse_idf_line函数，专门用于遍历和解析IDF
文件的每一行，从而获取关键tokens。该函数能够精确
计算元件的起始点(S_X，S_Y，S_Z)和终点（E_X,
E_Y，E_Z)坐标。其生成一个包含序号、元件类型、空间
坐标、长度、代码、连接点等信息的详细列表。为了便于
结果展示,使用tabulate库对解析后的数据进行格式化和
排序，从而有效地进行焊缝和材料数量的统计分析。这
一过程不仅提高了数据处理的效率，而且增强了结果的
可读性和可用性。
2.23D工区与作业密度分析
使用NumPy这一高级科学计算库,对从IDF文件中
提取的焊缝数据进行深入分析。焊缝的直径、x坐标、y坐
标、z坐标等信息被存储于相应的数组（diameters,
x_coords,y_coords,z_coords）中。采用类似于有限元分
析的方法，将工程项目空间划分为多个作业工区。对这
些工区进行遍历，使用迭代方法计算每个区域内的焊缝
密度，从而实现作业分布的优化。
为了更直观地分析和展示焊缝数据，利用Matplotlib
图形库及其3D绘图扩展包mpl_toolkits.mplot3d,通过
创建3D散点图和绘制3D立方体，简化了数据分析模型的
构建和理解。特别地,对工区内的焊点密度进行了标准
化处理，将其映射到一个预设的颜色范围内。这种空间
数据的3D可视化使得焊点的分布特征一目了然，高密度
区域通过颜色编码在视觉上更加明显。这不仅提高了数
17500
15000
12500
10000
7500
5000
2500
150000
175 -30000
-40000
-500
-60000Y
275000
30000
70000
-80000
图4基于IDF数据生成的工区焊缝密度3D图
2.3基于遗传算法焊工排程
在焊工排程的初始化阶段，首先根据焊缝的3D坐标
数据建立详细的工区基础数据。每个焊接作业点根据其
空间坐标被分配到对应的工区，并赋予唯一的索引标识。
接着，使用Python脚本对每个工区的初始焊接作业数量
进行计算，并将这些数据存储在名为initial_welds_count
的字典中，为后续的排程优化提供必要的输入数据。
在遗传算法的实现中，核心部分是适应度函数
(Fitness Function)的设计[5]。此函数模拟了焊工分配过
程，计算不同排程方案下完成所有焊接作业所需的天数。
利用Python的DEAP库，创建表示不同焊工工区分配的
个体（Individuals)和种群（Gruppen），以便于算法的执行
和优化。
遗传算法的关键操作包括两点交叉（Two-Point
Crossover）、随机变异（Mutation）和锦标赛选择
（Tournament Selection）。首先随机选取两个个体，并在
其基因序列（即工区分配索引）中进行交叉操作；随后，对
这些个体的基因序列施加随机变异，以引入遗传多样性；
通过锦标赛选择方法从当前种群中挑选个体，形成下一
代种群。该过程重复进行多次迭代，每一代都进行交叉、
变异和选择操作，同时评估每个后代个体的适应度，以寻
找最优的焊工排程方案。
油化 建设 24.1 1 4 9
===== PAGE 6 =====
quipment & installation
装置与安装
在遗传算法的每次迭代后，从种群中筛选出适应度
最高的个体，作为当前的最优焊工排程方案。此过程中，
系统将逐日输出每位焊工的工区分配情况，并同步更新
剩余的焊接作业数量。如果在某次迭代中所有焊接作业
都已被分配，则算法会提前终止迭代。在确保作业质量
的前提下，通过优化焊工资源分配，实现所有焊接作业在
最短可能时间内完成。基于工区的焊工排程演示如图5
所示。
90000
100000
110000
X
120000
IDLEShell3.10.11
3D Distribution of Weld Points with Density Blocks
Zone2, 37 Joints
Day.70: 焊工1：分配至工区36，当日后该工区剩余焊缝：0 焊工2：分配至工区38,当日后该工区剩余焊缝：2
Zone18, 32 Joints
Zone10,21 Joints
17ots Zone4,17 Joints
焊工3：分配至工区40当日后该工区剩余焊缝：
Zone7,14 Joints
焊工4：分配至工区 41，当日后该工区剩余焊缝：3
Zone3, 13 Joints
焊工5：分配至工区42，当日后该工区剩余焊缝：1
Zone16, 12 Joints Zone11, 11 Joints
70天后剩余总焊缝：13
Zone5,10 Joints
Zone12,10 Joints
Day.71: 焊工1：分配至工区 38，当日后该工区剩余焊缝：1
Zone14,9 Joints
焊工2：分配至工区40，当日后该工区剩余焊缝：0
Zone20.9J0int13000 Zone19,8Joints
焊工3：分配至工区41, 当日后该工区剩余焊缝：2 焊工4:分配至工区42，兰 当日后该工区剩余焊缝：0
Zone9, 4 Joints
焊工5：分配至工区43，当 当日后该工区剩余焊缝：0
Zone13,4Joints Zone6.3 Joints16000
Zone15,2 Joints
71天后剩余总焊缝：8 Day,72: 焊工1：分配至工区38，当日后该工区剩余焊缝：0 焊工2：分配至工区 41，当日后该工区剩余焊缝：1
Zone17,2 Joints
Zone8, 1 joints140
Z
焊工3：分配至工区44,当日后该工区剩余焊缝：1
焊工4：分配至工区45，当日后该工区剩余焊缝：1
12000
焊工5：分配至工区46，当日后该工区剩余焊缝：0
72天后剩余总焊缝：3
10000
当日后该工区剩余焊缝：0
Day.73: 焊工1：分配至工区41，兰 焊工2：分配至工区44,当日后该工区剩余焊缝：0
焊工3：分配至工区45，当日后该工区剩余焊缝：0
73天后剩余总焊缝：0
-8000
90000
>>>
-100000
Ln: 1771Col: 0
图5基于工区的焊工排程演示
3项目应用效果与未来展望
以南京南化建设有限公司承接的广西华谊钦州化工
新材料一体化基地年产30万t烧碱、40万t聚氯乙烯项目
的聚氯乙烯装置工程为例,基于IDF文件完成了材料基础
库、焊缝基础库的生成，以及ISO图纸焊缝标记、数据清洗
和分析共232061条，图纸数据处理量效率达1265张/d，
是传统方式的12.2倍，不但节约了39.85万元的技术人
工成本，同时为项目赢得了宝贵的前期准备时间，为项目
焊接数字化实施奠定了基础。在实施过程中，对高峰期
80多组焊工进行排程优化，日焊接效率高峰期超过
80in/人?d，成为全厂生产流程最末端却实现首个交付的
核心装置,项目焊缝一次合格率达99.3%。此外，对于基
于IDF进行模型重建过程中，团队也掌握了包括Skey映
射失败、管径不匹配、未定义材料编码、管径数据错误等
IDF识别问题，具备自主检查修改原文件数据的能力，累
计改进文件163份，进一步节约技术服务费用5.7万元，
取得了良好的经济和社会应用效果。
展望未来,研究团队将进一步扩展基于IDF文件的应
用范围，加强RPA(Robotic Process Automation）技术
在自动数据清洗和分析中的应用。持续优化材料匹配算
法，并完善派工排程的大数据模型及其训练参数，提升项
目管理精细化水平，推动焊接数据驱动的石化行业数字
化转型向更高效、智能化的发展方向迈进。
参考文献
[1] Asian oil and Gas Group.Alias for 3D piping[J].Asian
oil and Gas,2006,(7/8).
[2] Chemical Engineering World Group. Piping component
file[J].Chemical Engineering World,2015,(6).
[3]］张高尉，葛楚琳，基于Spoolgen的管道专业焊口信息提取技术
[J].石油和化工设备,2019,(6):35-37.
[4]张高尉，孙德光,吴涛，等，基于Spoolgen的海洋工程管道专业
图纸材料信息提取技术[J].石油和化工设备，2016，（2)：46-48
[5］谢存仁，徐峰，阮敏浩.基于BIM与遗传算法的建筑工程施工
进度多目标优化研究[J].工程管理学报,2021，（3)：117-122.
(收稿日期：2023-11-16)
501 石油化工建设2024.01
