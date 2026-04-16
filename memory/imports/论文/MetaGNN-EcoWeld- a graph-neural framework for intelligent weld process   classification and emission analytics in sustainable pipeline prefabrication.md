# MetaGNN-EcoWeld- a graph-neural framework for intelligent weld process   classification and emission analytics in sustainable pipeline prefabrication.pdf

- Source: `/Users/felex/Documents/Codex/Git 个人仓库/Felex 资料/管道数字化课题/论文/MetaGNN-EcoWeld- a graph-neural framework for intelligent weld process   classification and emission analytics in sustainable pipeline prefabrication.pdf`

## Extracted Text

===== PAGE 1 =====
Microchemical Journal 220 (2026) 116541
Contents lists available at ScienceDirect
Microchemical Journal
journal homepage: www.elsevier.com/locate/microc
MetaGNN-EcoWeld: a graph-neural framework for intelligent weld process
classification and emission analytics in sustainable pipeline prefabrication
*
Fei Xia a
, Zheng Ling Xu a,
, Zhe Hui Chenga
, Nian Liu a
, Shu Zhi Sun a
, Ru Ming Donga
,
Jian Donga
, Guo Xi Xia a
, Yue Yanga
a Technology Innovation Center, Nanjing Chemical Construction Co., Ltd, 229 YangXin Road, LuHe District, Nanjing, Jiangsu Province, China
A R T I C L E I N F O
Keywords:
Microchemical signature analysis
Graph neural network (GNN)
Meta-learning framework
Weld material classification
Pipeline prefabrication
Chemical composition analytics
Intelligent manufacturing
Sustainable engineering processes
A B S T R A C T
To achieve sustainable petrochemical pipeline prefabrication, weld-level intelligence must be incorporated that
accounts for the interaction between the behavior of materials, dynamic processes, and environmental performance
at multiple scales. Traditional methods for assessing welding utilizing rules generally fail to adequately
represent the multi-dimensional chemical-mechanical interactions and the emissions produced during welding.
These limitations can be remedied by using an Artificial Intelligence Graph Neural Network called MetaGNN-
EcoWeld, which brings together process classification with the computation of emissions during the welding
process into a unified framework. Multi-relational graphs of pipeline systems will serve as frameworks for
modeling welding processes; each node in the graph represents individual welds, and includes data related to
metallurgical compositions, alloys, thermal cycles and other process attributes, while edges in the graph indicate
the proximity and relations between each weld. Additionally, MetaGNN-EcoWeld provides a method to facilitate
the development of dynamically adaptive weld classifications based on changes in material characteristics across
heterogeneous fabrication conditions; thus making it easier to use in wide-ranging fabrication environments.
Lastly, MetaGNN-EcoWeld uses an eco-analytics layer on top of the welding classifiers that calculates environmentally
sustainable indicators such as equivalent CO₂ emissions, energy usage during heat cycles and the
compliance of the fabrication process regarding ecological standards, and includes these indicators within the
weld classification algorithm. An interpretability module for graph attention identifies additional significant
microchemistry, geometry, and emissions that impact how well the model predicts. Tests conducted on 0.8 M
weld samples from various industrial data sets have proven that MetaGNN-EcoWeld is superior to eight advanced
comparative algorithms with respect to all three of Accuracy, F1-Score, and Sustainability Consistency. The
suggested framework provides an open-source, diversified, and ecologically conscious AI platform for next-gen
advanced/green pipeline prefabrication.
1. Introduction
In the case of petrochemical projects with large scale pipeline systems,
making decisions regarding prefabrication has a significant impact
on a project’s cost effectiveness and scheduling performance. The
identification of the locations of each type of weld (shop vs. field) is a
crucial determinant in how efficiently a pipeline project can proceed. In
the past, much of the decision-making regarding prefabrication was
based on the use of rules (rule-based) or on the experience of experienced
individuals (expert-driven). This type of method could only
assume that previous experience would remain relevant for future projects,
therefore leaving engineers with limited means of adapting their
models to the particular spatial layout and material characteristics of the
actual construction site. In addition, the use of manual means to evaluate
the thousands of drawings associated with a pipeline project was
both labour-intensive and often led to inconsistencies in how individual
engineers evaluated the same drawings and how they classified welds
for prefabrication purposes. Therefore, a model to facilitate the classification
of welds at the weld level based on available data and capabilities
to be aware of both material characteristics and spatial layouts
* Corresponding author.
E-mail addresses: xiafei@njncc.com (F. Xia), lynn.zhenglingxu@gmail.com (Z.L. Xu), chengzhehui@njncc.com (Z.H. Cheng), liunian@njncc.com (N. Liu),
sunshuzhi@njncc.com (S.Z. Sun), dongruming@njncc.com (R.M. Dong), dongjian@njncc.com (J. Dong), xiaguoxi@njncc.com (G.X. Xia), yangyue@njncc.com
(Y. Yang).
https://doi.org/10.1016/j.microc.2025.116541
Received 8 November 2025; Received in revised form 5 December 2025; Accepted 9 December 2025
Available online 11 December 2025
0026-265X/© 2025 Published by Elsevier B.V.
===== PAGE 2 =====
F. Xia et al. would be the desired goal.
Recent advances in graph neural networks (GNNs) have provided
new opportunities for representing and reasoning about structural and
relational data in engineering systems. In the context of pipeline prefabrication,
the system can naturally be modeled as a graph, where
nodes represent welds and edges represent material connections (pipes,
elbows, tees, or flanges) linking adjacent welds. This representation
captures both spatial topology and material attributes, allowing the
model to learn how the networked relationships among welds influence
prefabrication feasibility. GNN-based models can therefore provide a
powerful foundation for intelligent weld-level decision-making. Nonetheless,
a major limitation remains: existing GNN models often lack
adaptability when facing data shifts between different projects, fabrication
shops, or construction environments [1]. Once trained on a specific
dataset, their performance tends to degrade in unseen projects due
to domain heterogeneity and topology variation.
To address this limitation, meta-learning, often referred to as
“learning to learn,” has emerged as a powerful paradigm that enables
models to adapt quickly to new tasks with limited data [2]. It has
demonstrated significant success in domains such as robotics and
personalized recommendation, where rapid adaptation and cross-
domain generalization are essential. In pipeline prefabrication, each
project can be regarded as a distinct task characterized by unique topology,
material composition, and construction constraints. Integrating
meta-learning with GNNs therefore offers an effective solution to achieve
cross-project adaptability and knowledge transfer, allowing the
model to generalize from historical projects and fine-tune efficiently for
new ones. Motivated by these observations, this paper proposes
MetaGNN-EcoWeld, a Graph Neural Network and Meta-Learning
framework for intelligent weld-level prefabrication decision-making.
With this design architecture, the proposed MetaGNN-EcoWeld
framework combines graph-based structural reasoning, meta-
parameter optimizing techniques, and interpretable decision-making
processes in one robust end-to-end system, allowing for ease of integration
across projects. The MetaGNN-EcoWeld utilizes a structural topology
graph to represent the spatial and material relationships between
multiple welds; uses meta-learning controllers that can optimize model
parameters over numerous project datasets, enabling quick adaptation
to new datasets with minimal retraining; contains a decision reasoning
module, which provides explanations regarding the specific welds and
connections that are influencing the S/F classification. In this manner,
the overall design of the MetaGNN-EcoWeld links intelligent systems
with engineered domain-specific knowledge, thus providing a means of
achieving scalable and understandable prefabrication decision intelligence
in the petrochemical sector.
The main contributions of this work are summarized as follows:
1. A unified GNN–meta-learning architecture (MetaGNN-EcoWeld) that
enables adaptive, cross-project weld-level prefabrication decision-
making in complex petrochemical environments.
2. A novel structural graph modeling strategy that represents welds as
nodes and materials as edges, effectively capturing spatial topology
and material attributes without relying on process-related
parameters.
3. A meta-optimization mechanism that supports fast adaptation and
knowledge transfer across different pipeline projects, improving
generalization under limited data scenarios.
4. An interpretable decision reasoning module that visualizes weld-
level attention distributions and identifies critical spatial and material
factors influencing prefabrication classification.
2. Related work
2.1. Graph neural networks in petrochemical systems
During the past few years, the use of graph neural networks (GNNs)
Microchemical Journal 220 (2026) 116541
has exploded as a viable option for representing and working with
structured and relational data in numerous different industrial applications.
Some of the Early examples of how GNNs could be used to
model topological dependencies through message passing; included
GCN (Graph Convolutional Networks) and GAT (Graph Attention Networks).
In industry, many use cases for GNNs, including creating assembly
sequences, process planning, and performing fault diagnosis,
require the ability to easily represent the elements of an assembly system
and their interconnections in a graphical form. Some researchers in
engineering design and manufacturing also have taken the approach of
using GNN-based models as a means of optimizing assembly structures
and ensuring that assembly processes follow consistent relational
structures. An example of this type of approach is demonstrated by Liu
and colleagues, who created a graph-embedding approach to model
mechanical interaction, which enabled them to improve the design
consistencies of assemblies and by improving the processes involved in
the assembly [3]. However, almost all prior approaches use a static and
homogeneous graph topology to represent their processes. As a result,
these models struggle to adapt to substantial shifts in domain and
therefore have limited applicability when applied to large, complex
pipeline systems that consist of a wide variety of geometric attributes,
material codes, and spatial relationships. These substantial domain
shifts in the existing graph-learning techniques indicate the need for a
new adaptive, transferable GNN learning paradigm to enable reasoning
over heterogeneous structural data and provide for sufficient generalization
across numerous projects.
2.2. Meta-learning and cross-domain adaptation
Meta-learning, or “learning to learn,” aims to enable rapid model
adaptation to new tasks with limited data. Classical gradient-based
frameworks such as Model-Agnostic Meta-Learning (MAML) [4] and
Reptile [5] learn an initialization that can be fine-tuned with minimal
gradient steps. Later extensions introduced task-conditioned adaptation
[6] and meta-regularization [7], improving cross-domain generalization
and convergence stability. In industrial contexts, meta-learning has been
successfully used in predictive maintenance [8], adaptive control [9],
and quality prediction [10]. These works demonstrate that meta-
learning can efficiently transfer knowledge among similar yet distinct
manufacturing processes. However, most studies focus on temporal or
tabular data, overlooking the structural dependencies and spatial relations
inherent in many engineering systems. Integrating meta-learning
with GNNs remains a challenging yet promising direction, particularly
for cross-project graph adaptation, where structural topologies differ but
decision objectives remain consistent.
2.3. Intelligent prefabrication and decision systems
Prefabrication methods in the petrochemical industry have moved
from manual Rule Based Decision Making to Data Driven and Topology
Aware Systems. Traditional prefabrication practices have relied on
expert systems and Heuristic Optimization [11]. The limitations of these
systems, which were defined through manually generated rules and
their limited scalability, have driven the rapid advancement of digital
twin and data analytics technologies [12] that have allowed researchers
to explore a Learning Based Prefabrication Planning framework. In their
research studies, Li et al. combined the use of Neural Models with the
Digital Construction Data to predict assembly feasibility [13] and Cheng
et al. developed a Data Driven Assessment Framework for Quality in
Prefabrication [14]. While advancements in Intelligent Prefabrication
have progressed significantly, two primary limitations remain: Prefabrication
is primarily studied at the Component Level (Pipes, Elbows and
Equipment Connections) as opposed to at the Weld Level (actual Prefabrication
Decisions), and the majority of Intelligent Prefabrication
Models are developed exclusively for single projects and lack the capability
to generalize across multiple projects. Thus, the need for an
2
===== PAGE 3 =====
F. Xia et al. Integrated Framework utilizing Structural Graph Nodes and the Spatial
and Material relationships of the relevant Welds, with the ability to
adapt across multiple projects and create an Intelligent Decision-Making
Environment in Prefabrication, is quite significant.
Microchemical Journal 220 (2026) 116541
2.4. Summary and research gap
In summary, GNN-based models excel at representing relational
structures, and meta-learning enables rapid adaptation across heterogeneous
tasks. However, their integration for weld-level prefabrication
remains largely unexplored. Existing works either focus on static
structure learning without cross-project adaptation or apply meta-
learning to non-graph data, failing to capture the structural and material
couplings critical for prefabrication reasoning [15]. To bridge this
gap, this study proposes MetaGNN-EcoWeld, a graph–meta hybrid
framework that unifies structural reasoning, meta-adaptation, and
interpretability for intelligent weld-level prefabrication decision-
making [16].
3. Methodology
3.1. Overall architecture
The MetaGNN-EcoWeld Framework is intended to enable intelligent,
adaptable, and automated weld-level prefabrication decisions for
complicated petrochemical pipelines. Fig. 1 shows that this architecture
combines meta-learning-based cross-project adaptability, engineering-
informed decision-making, and graph-based structural reasoning into
one complete system. It contains four major modules:
1. Graph Representation Layer – constructs a multi-relational weld
graph that encodes spatial, geometric, and material connections
among welds.
2. Graph Neural Encoder – extracts topological and semantic embeddings
through hierarchical message passing with attention
weighting.
3. Meta-Learning Controller – optimizes model parameters across
multiple projects, enabling rapid adaptation to new construction
datasets using only a few labeled welds.
4. Decision Reasoning and Attribution Module – predicts feasible S/
F decisions while providing interpretability via weld-level attention
visualization and constraint consistency analysis.
Formally, each pipeline project is regarded as a learning task Ti =
(Gi,Yi), where Gi is the weld-level graph and Yi denotes the corresponding
S/F labels. MetaGNN-EcoWeld learns a parameterized mapping
fθ that generalizes across tasks project Tnew with limited data [17].
Following the Model-Agnostic Meta-Learning (MAML) paradigm, the
framework alternates between:
•Inner Loop Adaptation: task-specific updates of the GNN encoder
and decision head using a few gradient steps on each project’s support
set;
•Outer Loop Optimization: aggregation of gradients from multiple
tasks to update the meta-parameters θ for generalizable
initialization.
This bi-level training strategy allows the model to capture cross-
project knowledge while retaining flexibility for new layouts and material
configurations. The reasoning layer enforces domain-specific
fabrication constraints—transport length limitations, installation space
accessibility, flange alignment requirements, and construction workability—ensuring
that predictions remain physically feasible and
compliant with engineering practice [18].
A graph-attention attribution mechanism highlights influential
welds and material connections, enhancing transparency and verifiability
for industrial deployment [19].
3.2. Graph representation of pipeline systems
A key component of MetaGNN-EcoWeld lies in the graph-based
abstraction of petrochemical pipeline systems, which enables learning
from both structural topology and material attributes. Each pipeline
project is modeled as a weld-level structural graph
G=(V,E,Av,Ae)
where V and E denote the sets of nodes and edges, and Av,Ae are their
associated attribute matrices. Each node v ∈V represents a weld joint,
which is the basic decision unit in prefabrication planning. Each weld
node aggregates multiple attribute categories:
•Material Properties: material types and codes on both sides (e.g.,
304L, 20#), nominal diameter (DN), and wall thickness;
•Spatial Attributes: 3-D coordinates (x,y,z), elevation difference, and
welding orientation (5G/2G/6G);
•Topological Attributes: degree, boundary flag, and pipeline zone
identifier;
•Rule Indicators: optional weak-label tags derived from empirical S/F
rules for regularization.
These attributes jointly describe both the material semantics and
spatial configuration of each weld, enabling fine-grained reasoning at
the weld level [20].
Each edge e =(vi,vj)represents a material connection (pipe, elbow,
tee, or flange) linking two adjacent welds, encoding both spatial adjacency
and material continuity between them. Edges encode physical and
Fig. 1. Overall framework of the proposed MetaGNN-EcoWeld model.
3
===== PAGE 4 =====
F. Xia et al. geometric relationships between welds through material connections
under different relation types:
•Physical Adjacency Edges: represent neighboring welds connected
by the same material segment; features: material type (pipe, elbow,
flange, tee), length, and diameter.
•Pipeline-Chain Edges: capture sequential order along a single pipeline;
features: index distance and total segment length.
•Branch/Tee Edges: link welds belonging to intersecting pipelines;
features: branch angle and tee type.
•Spatial-Proximity Edges: connect spatially close welds to represent
installation and geometric constraints; features: Euclidean distance
and height difference.
The multi-relational graph structure removes the need for a separate
processing layer and instead highlights the core geometric, material, and
spatial dependencies that dictate the potential for prefabrication processes.
Node attributes include geometric and material information such
as:
•Nominal diameter (DN),
•Wall thickness,
•Material code (e.g., 304L, 16mnr), and
•Connection type (straight, elbow, reducer, etc.). Edge attributesAe
capture spatial relationships and material correlations, including:
•Euclidean distance between welds,
•Elevation difference, and
•Material compatibility index.
Formally, the information propagation within the weld-level graph is
performed through an attention-based message-passing mechanism
[21].
For each node v, the embedding at the (l +1)-th layer is updated as:
h(l+1)
v
=σ!(∑u∈N (v)α(l)
vuW(l)h(l)
u +b(l))(1)
where N (v)denotes the neighbors of node v, α(l)
vu is the graph attention
coefficient representing the relative importance of neighbor u, W(l) is a
learnable transformation matrix, b(l) is a bias term, and σ(⋅) is a
nonlinear activation. The attention coefficient is computed as:
α(l)
vu
=
exp(LeakyReLU(a⊤[W(l)h(l)
v |W(l)h(l)
u ]))
∑k∈N (v)exp(LeakyReLU(a⊤[W(l)h(l)
v |W(l)h(l)
k ])) (2)
where a is a learnable attention vector and ‖denotes concatenation. This
single-layer structural graph formulation enables the framework to
reason jointly over topological connectivity, spatial relations, and material
attributes without relying on additional process parameters. By
learning attention-weighted inter-weld dependencies, MetaGNN-
EcoWeld captures the localized geometric context and global structural
coherence that determine weld-level prefabrication feasibility.
3.3. Meta-learning optimization
MetaGNN-EcoWeld uses MAML as the basis for a meta-learning
optimisation strategy which allows for leveraging the information content
across several different project pipelines via a small amount of
training data. For this purpose, each pipeline project contains its own
unique topology and material distribution (T_i) and therefore is treated
as its own individual learning task, resulting in a set of learning tasks T_i
\in(p(T)). The purpose of meta-learning is to learn a common initialisation
of the model parameters, θ, which can be adjusted (fine-tuned)
using only a few adaptation or fine-tuning steps to perform well on
T_new.
Microchemical Journal 220 (2026) 116541
3.3.1. Task formulation and training procedure
For each task Ti, the available dataset Di is divided into two subsets: a
support set Ds
i used for task-specific adaptation, and a query set Dq
i used
for meta-level evaluation [22]. During meta-training, MetaGNN-EcoWeld
alternates between two optimization phases:
1. Inner-loop adaptation:
For each task Ti, the GNN encoder and decision head are updated
with respect to the task’s support set by performing K gradient descent
steps
θʹ
i =θ− α∇θLTs
(fθ) (3)
i
where α is the inner-loop learning rate, and LTs
denotes the loss function
i
on the support set (typically a cross-entropy loss for prefabrication
feasibility classification). This step yields task-specific adapted parameters
θʹ
i.
2. Outer-loop meta-update:
The meta-controller aggregates the performance of all adapted
models on their corresponding query sets and updates the global
initialization θ by minimizing the meta-objective
min
θ ∑Ti∼p(T)LTq
i (fθʹ
i ) (4)
The gradient of this meta-objective is computed via backpropagation
through the adaptation step, and the parameters are updated using a
meta-learning rate β:
θ←θ− β∇
θ∑i
LTq
i (fθʹ
i ) (5)
The model is able to learn how to learn through bi-level optimisation,
capturing both the task-specific variability (inner loop) and the structural/process
level generality across multiple projects (outer loop) [23].
3.3.2. Meta-feature regularization and stability
To enhance stability during meta-optimization and prevent overfitting
to specific projects, MetaGNN-EcoWeld introduces a meta-feature
regularization term that constrains the distance between task-specific
embeddings and the meta-initialization manifold. Let Hʹ
i denote the
latent graph embeddings generated by fθʹ
for task Ti. The regularization
i
term is defined as:
L reg =λ⃒⃒Hʹ
i− Hmeta⃒⃒
2
2 (6)
where Hmetarepresents the averaged meta-level representation
aggregated across all tasks, and λ is a weighting factor controlling the
balance between adaptability and stability. The final meta-objective
function thus becomes:
L meta =∑i
L Tq
i (fθʹ
i )+L reg (7)
This constraint ensures that the adapted representations remain
consistent with global prefabrication semantics, thereby improving both
convergence and generalization under limited data conditions.
3.3.3. Adaptation to new projects
During deployment, when the model encounters a new project Tnew
(e.g., a pipeline layout unseen during training), it uses the learned
initialization θ* as the starting point and performs a few gradient updates
on its local data Ds
new:
θʹ
new
=θ*
− α∇θ* L Ts
new (fθ* ) (8)
Because the initialization already encodes generalizable spatial and
4
===== PAGE 5 =====
F. Xia et al. structural patterns, only minimal fine-tuning is required to achieve high
accuracy on Tnew. In the case of petrochemical opportunities, this feature
is particularly useful, as each project typically presents its own unique
geometrical setup, constraints when constructing, and various environmental
limitations that make traditional re-training methods
impractical.
3.3.4. Optimization objective and implementation notes
The overall optimization objective of MetaGNN-EcoWeld can be
summarized as:
min
θ
ETi∼p(T)[L Tq
i (fθʹ
i )+λ⃦ ⃦Hʹ
i− Hmeta⃦ ⃦
2
2 ] (9)
In practice, stochastic gradient-based meta-optimization (e.g., Adam
or RMSProp) is adopted for both inner and outer loops, and the framework
supports both first-order and second-order MAML variants for
computational efficiency. The number of gradient steps K, learning rates
α,β and regularization coefficient λ are tuned via cross-validation on
validation tasks.
3.4. Decision reasoning and interpretability
The importance of predictive accuracy in ai-based intelligent prefabricated
modules cannot be understated; however, as much as predictive
accuracy is essential for producing an intelligent prefabrication
module for such complex projects as the construction of a petrochemical
pipeline, interpretability and engineering transparency must also be
factored into the design of such an intelligent prefabrication system. For
that reason, the decision reasoning module in MetaGNN-EcoWeld has
been developed to produce feasible decisions for prefabrication planning,
considering a range of restrictive conditions, and to provide an
insight into how decisions are reached by detailing the key elements,
interconnections, and process considerations that affect the success of a
decision. By building this dual-functioning approach, the model’s outputs
can be accepted as technically accurate and verifiable by humans
involved in the petrochemical industry.
3.4.1. Decision reasoning layer
The decision reasoning layer builds upon the graph embeddings
produced by the meta-adapted GNN encoder. After the message-passing
process in the dual-graph representation, each node v obtains a context-
aware embedding hv that encapsulates both structural (e.g., connectivity,
material strength) and spatial or material information. To infer
prefabrication feasibility, the model performs a global graph pooling
operation followed by a feed-forward prediction head:
z =READOUT({hv|v ∈V })=∑v∈V γvhv (10)
̂
y=Softmax(Wdz +bd) (11)
where γv is a learnable attention weight indicating the relative importance
of node v, and Wd, bd are trainable parameters of the decision
layer. The output ̂
y represents the predicted decision category S/F binary
classification. To align with practical engineering standards,
additional construction workability constraints (e.g., on-site workspace
limitations, prefabricated component transport size constraints, installation
operation accessibility, and construction sequence rationality) are
integrated into the reasoning layer through a rule-informed penalty
function:
L con =∑c∈C
δc⋅max(0,gc(x)− τc ) (12)
where gc(x)represents a constraint function (e.g., construction workspace
constraint, transport size constraint), τc denotes the permissible
threshold, and δc is a penalty weight. This term ensures that decisions
violating construction feasibility or operation workability constraints
Microchemical Journal 220 (2026) 116541
are automatically penalized during training. The final decision loss thus
combines the classification and constraint terms:
L dec =L cls +ηL con (13)
where η controls the strength of constructability constraint
enforcement.
With its hybrid reasoning approach, the MetaGNN-EcoWeld model is
able to leverage both data-driven learning and real-world fabrication
concerns when making decisions, which leads to the creation of a model
that predicts not only the accuracy of the fabrication and installation of a
part but also whether construction is actually executable in the field. By
creating a model that optimizes work distribution between shop fabrication
and field fabrication, the MetaGNN-EcoWeld provides an optimal
way to allocate resources when constructing petrochemical pipelines.
3.4.2. Graph-based attribution and interpretability
To enhance transparency and enable engineering verification,
MetaGNN-EcoWeld incorporates a graph attention attribution mechanism
to explain the model’s decision behavior. For each edge (u,v), the
attention coefficient αuv reflects the relative importance of the message
transmitted from node u to node v. The cumulative node-level importance
score is then computed as:
Iv =∑u∈N (v)αuv⋅|hu− hv|2 (14)
where a higher Iv value indicates a greater influence of component v on
the decision outcome. By normalizing these scores across the graph, the
model produces an attribution heatmap that highlights key structural or
process-critical nodes (e.g., a pressure valve or joint with abnormal
stress coupling).
4. Experimental evaluation
4.1. Dataset description
To assess the prediction accuracy and the generalization capability of
the proposed MetaGNN-EcoWeld approach, several experiments were
conducted on actual pipeline fabrication datasets that were collected
from multiple pipeline fabrication projects that occurred between 2018
and 2024. In addition to being collected over time, the datasets were
able to represent pipelines built under varying conditions (i.e., different
manufacturing processes, produces, and pipe weld layouts). Table 1
summarizes the key characteristics of the datasets. Each project dataset
consists of weld joints (nodes) and material connections (edges), along
with corresponding S/F prefabrication labels manually annotated by
domain experts. The graph data were derived from engineering drawings,
3D design models, and digital-twin reconstructions provided by
collaborating industrial plants. When historical records were incomplete,
additional synthetic 3D piping models from pcf or idf files
exported from PDMS or SP3D were generated to ensure balanced task
distribution and structural diversity across different project types. Each
Table 1
Key dataset characteristics.
Attribute Description
Number of projects (tasks) Average number of welds per
project
Average number of material
connections
Material types Structural attributes Labels Data source Number of projects (tasks) 25 (training), 5 (testing)
50,000–100,000
100,000–200,000
Carbon steel, stainless steel, alloy steel
Pipe diameter (DN), wall thickness, elevation
difference
Shop Weld (S)/Field Weld (F)
Historical as-built records and 3D model
25 (training), 5 (testing)
5
===== PAGE 6 =====
F. Xia et al. training epoch involved approximately 8–10 projects (50,000–100,000
welds each), resulting in a total of over 800,000 labeled samples used for
large-scale performance evaluation.
Each project task Ti is represented as a single-layer structural graph,
as described in Section 3.2, where nodes correspond to welds and edges
represent material connections between them. Node attributes include
material code, nominal diameter, and weld type, while edge attributes
encode geometric distance and elevation difference. The training set
includes projects from various refineries and chemical plants, while
testing is performed on unseen projects to evaluate cross-project
adaptability. To simulate few-shot learning conditions, only 10 % of
labeled welds from each new project were used for adaptation, while the
remaining data were reserved for performance evaluation. All data were
normalized using standardized material codes and pipe-class mappings
to ensure consistency across projects.
4.2. Baseline models
A comparison of the proposed MetaGNN-EcoWeld model with eight
different baseline predictive models was completed to provide an
extensive understanding of how well the MetaGNN-EcoWeld model
performs in comparison to traditional machine learning techniques,
meta-learning techniques, and other conventional engineering techniques
[24].
The graph-based baselines include:
(1) GCN [25], a classical spectral graph convolutional model that
aggregates neighbor information;
(2) GAT [26], which introduces attention coefficients to adaptively
weigh neighboring nodes;
(3) GraphSAGE [27], an inductive model capable of sampling and
aggregating neighborhood features for large-scale graphs;
(4) GIN (Graph Isomorphism Network) [28], which enhances structural
discriminability in graph representations.
The meta-learning baselines include:
(5) MAML [29], a model-agnostic meta-learning algorithm that
learns task-invariant initializations;
(6) META-SGCN [30], a simplified meta-learning variant of GCN
designed for few-shot graph classification tasks.
In addition, two non-neural baselines were included for
completeness:
(7) KGML [31], which relies on predefined engineering constraints
and empirical compatibility rules widely used in industrial
practice;
(8) GTN Hybrid (GTN) [32], which combines Transformer attention
with graph message passing, representing a modern hybrid
baseline with strong generalization capability.
Before model training, a lightweight rule-based preprocessing step
was applied to remove geometrically invalid weld pairs and inconsistent
material records based on standardized CAD constraints (e.g., diameter
mismatch, spatial overlap). This pruning ensured that the model
training focused on feasible structural configurations, improving
convergence and stability. All baseline models were trained under
identical experimental conditions using PyTorch Geometric. Hyperparameters
such as learning rate, batch size, and dropout rate were
independently tuned to ensure optimal performance. For the meta-
learning approaches (MAML, META-SGCN, and MetaGNN-EcoWeld),
the meta-training stage included four training tasks and one validation
task per iteration, and few-shot adaptation was performed with five
gradient steps on each task [33].
Microchemical Journal 220 (2026) 116541
4.3. Evaluation metrics and experimental setup
A set of quantitative evaluation metrics and experimental evaluation
procedures were developed to evaluate the performance of the proposed
MetaGNN-EcoWeld model with regard to prediction accuracy, adaptability,
and engineering reliability across varying pipeline projects for
the petrochemical industry.
4.3.1. Evaluation metrics
Four key metrics were employed to evaluate model performance:
1. Accuracy (ACC):
Measures the overall correctness of prefabrication decision predictions
ACC=
TP +TN
TP +TN +FP +FN (15)
where TP, TN, FP, and FN denote true positive, true negative, false
positive, and false negative counts, respectively.
2. F1-score (F1):
Balances precision and recall to provide a robust measure of performance
under class imbalance
F1=2 ×
Precision ×Recall
Precision +Recall (16)
3. Adaptation speed (AS):
Indicates how quickly a model adapts to a new project during meta-
testing. It is computed as the number of gradient update steps required
for convergence or achieving 95 % of the best performance
AS= min{k |ACCk ≥0.95 ×ACCmax} (17)
4. Feasibility compliance rate (FCR):
A domain-specific metric representing the proportion of predicted S/
F configurations that satisfy all construction workability constraints (e.
g., prefabricated component transport size limitations, on-site workspace
accessibility, installation operation feasibility, welding sequence
rationality)
Number of compliant feasible predictions
FCR=
Total feasible predictions (18)
4.3.2. Experimental setup
All experiments were conducted on a high-performance computing
server equipped with an NVIDIA A100 GPU (40 GB memory), Intel Xeon
Gold 6330 CPU (32 cores, 2.0 GHz), and 512 GB RAM, running Ubuntu
22.04 LTS. The framework was implemented in PyTorch 2.0.1 with the
PyTorch Geometric 2.3.1 library, and all meta-learning components
were integrated using a customized optimization pipeline. For baseline
comparison, training a conventional GNN from scratch on a single
project (approximately 75,000 welds) required 3–4 h. In contrast, the
proposed meta-learning framework completed meta-training across
8–10 projects within approximately 1.5–2 h (200 meta-epochs), and
adaptation to new unseen projects required approximately 5–8 min
using 10 % labeled data [34].
Training configuration:
•Optimizer: Adam with initial learning rate 2 ×10− 4
•Batch size: 32 subgraphs per iteration (sampled using NeighborLoader
with 1024 nodes and 2-hop neighborhood)
6
===== PAGE 7 =====
F. Xia et al. •Inner-loop learning rate (α): 1 ×10− 3
•Meta-learning rate (β): 5 ×10− 4
•Regularization weights: λ =0.1, η =0.05
•Dropout rate: 0.3
•Training epochs: 200 (with early stopping on validation loss)
For meta-learning models (MAML, META-SGCN, MetaGNN-EcoWeld),
meta-batches were constructed with 4 training tasks and 1 validation
task per iteration. Each task was adapted using 5 inner-loop
gradient updates with a small sample size (10–20 labeled graphs). To
ensure fairness, all graph-based models shared the same embedding
dimension (128) and used identical data splits for training, validation,
and testing.
Microchemical Journal 220 (2026) 116541
Table 2
Overall performance comparison of different models.
Model ACC (%) F1 (%) AS (Steps) FCR (%)
GCN 84.5 82.7 7.2 83.1
GAT 85.3 83.6 6.8 84.0
GraphSAGE 86.1 84.9 6.3 85.2
GIN 87.5 85.8 5.9 86.4
MAML 88.2 86.6 5.1 87.8
META-SGCN 89.3 87.4 4.5 89.0
GTN 90.1 88.5 4.2 89.8
KGML 69.8 70.2– 72.4
MetaGNN-EcoWeld 92.8 91.5 3.1 94.2
4.4. Experimental results and analysis
4.4.1. Overall performance comparison
The experimental work was conducted using large datasets of
welding as they best represent a realistic environment for computing
and were also large enough numbers to ensure validity of the comparisons.
As shown in Fig. 2, the comparison of results between the
MetaGNN-EcoWeld model and the other baseline models demonstrates
that MetaGNN-EcoWeld produced superior performance (ACC, F1 Score,
FCR) relative to all baseline models over time. Even though Traditional
GNN Methods (GCNs, GATs) can help with transferring knowledge to
unfamiliar S/F patterns, they do have difficulties adapting because they
encode features in a static manner. By comparison, Meta Learning Approaches
such as MAML and META-SGCN demonstrate better transferability
with respect to data but still remain relatively coarse in g-
factor gradient adjustment. In contrast, by implementing Graph Context-
Fusion along with Meta Adaptation in MetaGNN-EcoWeld allows for
rapid optimization of training and demonstrates more accurate prediction
abilities with lower amounts of training examples providing an
average of 2.5–3.1 % gain in performance across all three metrics.
Table 2 lists the overall results of all tested models using the Petrochemical
Pipeline S/F Classification study. Results indicate that the
proposed MetaGNN-EcoWeld approach consistently outperformed all
models in every metric tested. MetagGNN-SFWeld achieved a higher
level of accuracy for baseline models as well as achieved the highest F1
scores representing the FCR value of 94.2 %. In addition, the lowest
number of adaptation steps to stabilize the model were approximately
3.1 steps. Compared with conventional GNN models (GCN, GAT,
GraphSAGE, GIN), MetaGNN-EcoWeld demonstrated an average
improvement of 7.6 % in ACC and 10.2 % in FCR, showing superior
capability in handling large-scale, constraint-driven pipeline graphs.
Compared to meta-learning baselines (MAML, META-SGCN), it achieved
faster convergence and higher generalization under limited data conditions,
confirming the advantage of integrating graph representation
learning with meta-adaptation. The KGML model exhibited stable but
limited performance (ACC <70 %), highlighting the limitations of static
rule-based systems when facing complex multi-variable conditions. The
GTN hybrid model performed competitively but was less stable under
few-shot scenarios, likely due to overfitting on small adaptation samples.
These results demonstrate that MetaGNN-EcoWeld achieves a
balanced trade-off between predictive accuracy, adaptability, and
robustness, making it well-suited for dynamic petrochemical pipeline
environments [35].
4.4.2. Few-shot adaptation performance
The visualization presented in Fig. 3 illustrates how the MetaGNN-
EcoWeld framework learned embeddings that are able to discriminate
features. It produces tight and well clustered embeddings; indicating a
very consistent representation, which enables the framework to learn
features related to S/F classification that are similar across domains (for
example material transition, weld type and adjacency attributes between
geometries). Therefore, it can enhance the robustness of the
pipeline; by having higher consistency of classification between projects.
Cross-project adaptability testing was done with few-shot learning
where each new project had only 10 % of the labeled data available for
the framework to adapt to. Looking at Fig. 4, within 3 adaptation
Fig. 2. Comparative performance of MetaGNN-EcoWeld and baseline models.
7
===== PAGE 8 =====
F. Xia et al. Microchemical Journal 220 (2026) 116541
Fig. 3. 3D t-SNE visualization of cross-domain embedding distributions learned by MetaGNN-EcoWeld.
Fig. 4. Few-shot adaptation performance of different models.
updates, the framework was able to reach over 90 % accuracy of what it
will ultimately be able to represent accurately. It took the MAML and
META-SGCN frameworks five to seven updates to achieve similar accuracy
levels, while the commonly used GNNs (GCN and GraphSAGE)
were unable to adapt well to new projects, resulting in an approximate
15–20 % loss in their average performance. This demonstrates the superior
meta transfer ability of MetaGNN-EcoWeld, making predictions of
new pipeline geometries and material configurations without requiring
extensive further training to achieve acceptable performance.
Furthermore, the stability of adaptation was analyzed by plotting
accuracy variance across different random seeds. MetaGNN-EcoWeld
showed the smallest standard deviation (±0.6 %), confirming its consistency
and robustness under diverse task distributions (Table 3) [36].
4.4.3. Ablation study
As summarized in Table 4, removing the meta-learning controller
caused the largest performance drop (− 6.8 % ACC, − 8.4 % FCR),
indicating that cross-project adaptability is primarily driven by meta-
8
===== PAGE 9 =====
F. Xia et al. Table 3
Few-shot adaptation results on unseen projects.
Model 5 % Data
(ACC/F1/
mm/s)
10 % Data
(ACC/F1)
20 % Data
(ACC/F1)
GCN 69.4/67.9 74.8/73.2 79.1/78.0 7
GraphSAGE 71.0/69.8 77.6/75.9 82.0/80.4 6
MAML 78.3/76.5 84.6/82.7 87.3/85.2 5
META-SGCN 81.2/79.8 87.9/85.7 90.0/88.1 4
GTN 83.0/80.9 88.7/86.2 91.0/89.0 4
MetaGNN-
EcoWeld 86.5/84.3 91.2/89.4 93.0/91.7 3
Adaptation
Steps
Table 4
Ablation Study on Key Components of MetaGNN-EcoWeld.
Model Variant ACC
(%)
F1
(%)
FCR
(%)
ΔACC ΔFCR
w/o Meta-Learning Controller 86.0 84.7 85.8− 6.8− 8.4
w/o Dual-Layer Graph
Representation 87.9 86.1 89.1− 4.9− 5.1
w/o Constraint-Aware
Reasoning 90.3 89.2 91.0− 2.5− 3.2
Full Model (MetaGNN-
EcoWeld) 92.8 91.5 94.2– –
Microchemical Journal 220 (2026) 116541
and interpretability, a case study was conducted using real project data
from a large petrochemical pipeline facility in Henan Province, China,
where multi-material and spatially constrained pipelines were fabricated
under complex layout conditions. This case represents a typical
large-scale engineering scenario in which intelligent S/F weld classification
is critical for optimizing off-site prefabrication planning. The
selected project contains approximately 82,050 weld joints and 38,724
pieces of component materials, including carbon steel, stainless steel,
and nickel alloy pipes with varied diameters and elevation levels. The
classification task determines whether each weld joint should be fabricated
off-site (Shop Weld) or on site (Field Weld), comprehensively
considering construction workspace accessibility, prefabricated
component transport limitations, and on-site installation workability.
Ground-truth S/F labels were annotated by experienced engineers based
on design drawings and 3D layout analysis to ensure data consistency
across pipeline modules. MetaGNN-EcoWeld was adapted to this project
using only 10 % labeled samples (few-shot setting) and then tested on
the remaining unseen welds. Table 5 presents the results compared with
representative baselines under the same few-shot configuration.
MetaGNN-EcoWeld achieved the highest accuracy (91.7 %) and FCR
(93.8 %), surpassing META-SGCN and GTN by a clear margin while
maintaining stable convergence within three adaptation steps. These
results confirm that the proposed framework effectively generalizes to
new fabrication environments with limited supervision, providing reliable
and interpretable decisions for complex industrial systems [38].
level parameter optimization. Excluding the structural material fusion
module reduced performance by approximately 5 %, confirming that
jointly embedding spatial and material semantics is essential for realistic
weld-level classification. The absence of constraint-aware reasoning
slightly decreased fabrication consistency but had a moderate impact on
F1-score, showing that this module mainly contributes to engineering
correctness and layout feasibility [37].
4.5. Case study and visualization analysis
The scatter distribution in Fig. 5 shows a strong linear correlation (r
=0.98) between the model’s attention-based risk inference and expert
assessments. This alignment confirms that MetaGNN-EcoWeld’s attention
mechanisms are both predictive and interpretable, offering insight
into which spatial and material factors drive misclassifications or potential
assembly conflicts. Such consistency underscores the framework’s
trustworthiness in real-world decision support for pipeline
prefabrication planning. To further demonstrate practical applicability
4.6. Visualization and interpretability
Fig. 6 presents a heatmap visualization of the learned node-feature
attention distribution in MetaGNN-EcoWeld. Each row represents a
weld node, and each column corresponds to a structural or material
feature dimension (e.g., material code, diameter, wall thickness, elevation
difference, spatial distance, weld orientation). The color intensity
indicates the relative attention weight assigned by the model, where
Table 5
Case Study Results on Jiangsu Petrochemical Project.
Model ACC (%) F1 (%) FCR (%) AS (Steps)
GCN 78.9 76.3 80.5 6
GraphSAGE 82.0 79.8 83.4 5
META-SGCN 88.4 86.5 89.9 4
GTN 89.6 87.1 90.8 4
MetaGNN-EcoWeld 91.7 89.9 93.8 3
Fig. 5. Correlation between model attention scores and expert-assessed risk indices.
9
===== PAGE 10 =====
F. Xia et al. Microchemical Journal 220 (2026) 116541
darker colors denote higher importance [39].
Breakdown of weld joints show that weld connections exhibit the
greatest concentration of attention around geometric and spatial characteristics
(diameter, wall thickness, and direction of weld). Because of
their extreme impact on shop/field (S/F) classification of welds. Elbows
and reducers exhibit higher attention for multiple features than welds in
general indicating a proven ability for the model to capture patterns of
spatial dependencies and assembly difficulty that are consistent with
engineering intuition. The model has sufficient evidence to confirm that
the way in which it reached its conclusions would align with the practical
experiences of those persons fabricating the actual products [40].
To further demonstrate the few-shot adaptation capability and
convergence behavior of the proposed framework, Fig. 7 presents a
comparative visualization of S/F classification results across seven
adaptation steps on a new unseen project [41]. This visualization
directly corresponds to the quantitative performance curves shown in
Fig. 4 [42]. Three algorithms—the proposed MetaGNN-EcoWeld (Column
A), META-SGCN (Column B), and GraphSAGE (Column C)—were
adapted to the same complex pipeline configuration using only 10 %
labeled data, and their classification outputs at each adaptation checkpoint
(Steps 1–7) are visualized [43].
At the beginning of adaptation, all three models start from their
meta-trained initializations and begin learning the specific characteristics
of the new project. As shown in both Fig. 4 and Fig. 7, GraphSAGE
(Column C) and META-SGCN (Column B) exhibit scattered and inconsistent
Field weld placements in geometrically complex regions such as
equipment joints, elbows, and multi-bend transitions. Their accuracy
remains low (72–80 %, Fig. 4), and the visual results show fragmented
segmentation patterns [44].
In contrast, MetaGNN-EcoWeld (column A) begins with a much
higher performance level (80 % accuracy) than baseline models because
it starts with a meta-learned initialization that has incorporated
knowledge about the reasoning related to structure and material from
many previous projects. As the adaptation continues the gap between
the performance of the baseline models and the performance of the
MetaGNN-EcoWeld model becomes larger, as baseline models continue
to improve at a decreasing rate with respect to their rate of improvement,
and exhibit challenges when performing rational segmentations,
especially at structural boundaries (elbows, reducers, and tees). Accuracy
of baseline models improves very slowly (GraphSAGE: 78–85 %,
META-SGCN: 80–87 %), and visual results still indicate over-
segmentation or under-segmentation issues and errors in segmentation
performance [45].
MetaGNN-EcoWeld, leveraging its meta-learning controller and
Fig. 6. Node–feature attention heatmap.
dual-layer structural-material fusion mechanism, rapidly converges to
accurate and spatially coherent S/F distributions. By Step 4, it achieves
90 % accuracy—surpassing the final converged performance of both
baseline models (Fig. 4). The visualization confirms this: Field weld
placements become increasingly rational, correctly positioned at major
structural transitions such as: (1) before/after elbows to minimize on-
site welding difficulty; (2) at tee junctions for modular assembly; and
(3) in multi-directional bends with balanced segment lengths.
By Steps 6–7, MetaGNN-EcoWeld reaches stable performance
(92–93 % accuracy) with spatially continuous and engineering-realistic
S/F distributions that closely align with expert-annotated ground truth.
The model produces uniform segment partitions that optimize fabrication
feasibility, transport logistics, and installation workability.
In contrast, baseline models show slower convergence and continue
to exhibit localized misclassifications even after 7 adaptation steps (final
accuracy: GraphSAGE 86.8 %, META-SGCN 88.9 %), indicating their
limited structural reasoning and adaptation efficiency.
Table 6 quantifies the progressive adaptation behavior visualized in
Fig. 7, directly corresponding to the curves in Fig. 4.
5. Conclusion
The main focus of this paper is the new MetaGNN-EcoWeld framework.
It uses both a Graph Neural Network (GNN) and Meta-Learning to
classify welds (S/F) as per intelligent means or systems within the
petrochemical pipeline. The objective of the MetaGNN-EcoWeld
framework is to capture complex spatial dependencies among materials;
improve how we adapt GNNs to multiple types of petrochemical
pipeline projects; validate the ability to provide interpretable automation
and traceability during decision-making processes that are made
artificially without human intervention. The MetaGNN-EcoWeld system
integrates top-down (meta-level) adaptation (to allow each of the
various GNN architectures to work across multiple projects), graph-
based structured reasoning (to support the representation of materials
and their structure based on connectivity), and decision making logic
that respects the constraints of the fabricated products. Overall, the
system allows for effective, interpretable, and flexible decision making
for weld-level classification and analysis on any of the types of pipelines
being created in the petrochemical industry. Through a series of experiments
with real pipeline datasets, MetaGNN-EcoWeld has demonstrated
its ability to produce results that are more accurate, adapt in a
more timely manner, and consistently produce the best fabrication
consistency rate (FCR) compared to the most common baseline approaches,
which include the main classical GNNs (GCN, GAT,
10
===== PAGE 11 =====
F. Xia et al. Microchemical Journal 220 (2026) 116541
Fig. 7. Few-shot adaptation visualization across seven adaptation steps. The figure shows S/F classification results for three algorithms—MetaGNN-EcoWeld
(Column A), META-SGCN (Column B), and GraphSAGE (Column C)—at different adaptation checkpoints on a new unseen project. Rows 1–7 correspond to adaptation
Steps 1–7 in Fig. 4. Each pipeline segment is bounded by red rings (Field welds) with green rings (Shop welds) marking intermediate connections. Yellow and
orange pipes represent different segments for visual distinction. The progression shows MetaGNN-EcoWeld’s rapid convergence to rational S/F segmentation. (For
interpretation of the references to color in this figure legend, the reader is referred to the web version of this article.)
11
===== PAGE 12 =====
F. Xia et al. Table 6
Performance metrics at each adaptation step.
Adaptation
step
MetaGNN-
EcoWeld(A)
GraphSAGE(B) META-SGCN (C)
Acc
(%)
FCR
(%)
Acc
(%)
FCR
(%)
Acc
(%)
FCR
(%)
1 80.0 75.2 75.0 68.7 72.1 65.3
2 85.8 81.4 80.1 74.3 78.3 71.5
3 90.1 87.3 84.9 79.1 83.2 76.8
4 92.4 90.8 87.1 82.6 85.0 79.4
5 92.9 92.5 88.3 84.1 86.2 80.9
6 93.1 93.8 88.7 84.8 86.7 81.5
7 93.2 94.0 88.9 85.2 86.8 81.8
GraphSAGE), meta-learning (MAML, META-SGCN) based methods, and
rule-based decision making systems. Ablation studies have demonstrated
the importance of each of the MetaGNN-EcoWeld systems three
major components (structural-material, meta-learner controller, and
constraint-aware reasoning) in supporting the overall improvement of
performance. The interpretability module provided human-readable
attributions that matched expert assessments, increasing the trustworthiness
and transparency of the model for use in real-world industry
applications. The MetalGNN-SFWeld framework was demonstrated to be
more than just a quantitative improvement through a real-life example
of a large petrochemical pipeline project. This case study showed that
the framework greatly accelerated the classification and planning of
welds; increased consistency when fabricating pipelines; and reduced
the labour commitment required for manual assessments.
CRediT authorship contribution statement
Fei Xia: Visualization. Zheng Ling Xu: Writing – review & editing,
Writing – original draft, Supervision, Project administration, Investigation,
Formal analysis, Data curation, Conceptualization. Zhe Hui
Cheng: Validation. Nian Liu: Supervision. Shu Zhi Sun: Resources. Ru
Ming Dong: Methodology. Jian Dong: Investigation. Guo Xi Xia:
Formal analysis. Yue Yang: Conceptualization.
Declaration of competing interest
The authors declare that they have no known competing financial
interests or personal relationships that could have appeared to influence
the work reported in this paper.
Data availability
Data sharing not applicable to this article as no datasets were
generated or analyzed during the current study.
References
[1] C.W. Moore, B. Zielinska, G. Petron, et al., Air impacts of increased natural gas
acquisition, processing, and use: a critical review, Environ. Sci. Technol. 48 (15)
(2014) 8349–8359.
[2] S. Liu, Y. Chen, P. Mao, et al., Investigation of key technologies and applications of
factory prefabrication of oil and Gas Station pipeline, Processes 13 (6) (2025)
1890.
[3] W. Zhang, W. Liu, X. Yu, et al., Deep learning-based automated detection of
welding defects in pressure pipeline radiograph, Coatings 15 (7) (2025) 808.
[4] B. Ding, H. Zhang, H. Zhenhua, et al., Data enhanced YOLOv8s algorithm for X-ray
weld defect detection, Nondestruct. Test. Eval. 40 (9) (2025) 4314–4337.
[5] S.T. Han, Y. Moon, J.B. Kim, et al., Graph neural network-based method for
classifying continuous lines in piping and instrumentation diagram, Adv. Eng.
Inform. 66 (2025) 103457.
[6] Q. Hu, Y. Zhang, W. Liu, et al., Predicting water pipe failures with graph neural
networks: integrating coupled road and pipeline features, Water 17 (9) (2025)
1307.
[7] K. Zhang, S. Liu, S. Wang, et al., A survey of deep graph learning under distribution
shifts: from graph out-of-distribution generalization to adaptation, 2024, arXiv
preprint arXiv:2410.19265.
Microchemical Journal 220 (2026) 116541
[8] T.N. Kipf, Semi-supervised classification with graph convolutional networks, 2016,
arXiv preprint arXiv:1609.02907.
[9] Veliˇ ckovi´
c P, Cucurull G, Casanova A, et al. Graph attention networks. arXiv
preprint arXiv:1710.10903,2017.
[10] Z. Wang, S. Zhang, H. Zhang, et al., Machining feature process route planning
based on a graph convolutional neural network, Adv. Eng. Inform. 59 (2024)
102249.
[11] J. Li, W. Yin, B. Yang, et al., Modeling of digital twin workshop in planning via a
graph neural network: the case of an ocean engineering manufacturing intelligent
workshop, Appl. Sci. 13 (18) (2023) 10134.
[12] D. Chen, R. Liu, Q. Hu, et al., Interaction-aware graph neural networks for fault
diagnosis of complex industrial processes, IEEE Trans. Neural Networks Learn.
Syst. 34 (9) (2021) 6015–6028.
[13] R. Liu, Y. Xie, D. Lin, et al., Information-based gradient enhanced causal learning
graph neural network for fault diagnosis of complex industrial processes, Reliab.
Eng. Syst. Saf. 252 (2024) 110468.
[14] C. Finn, P. Abbeel, S. Levine, Model-agnostic meta-learning for fast adaptation of
deep networks, in: International Conference on Machine Learning. PMLR, 2017,
pp. 1126–1135.
[15] A. Nichol, J. Achiam, J. Schulman, On first-order meta-learning algorithms, 2018,
arXiv preprint arXiv:1803.02999.
[16] K. Rakelly, A. Zhou, C. Finn, et al., Efficient off-policy meta-reinforcement learning
via probabilistic context variables, in: International conference on machine
learning. PMLR, 2019: 5331-5340.
[17] L. Wang, S. Zhou, S. Zhang, et al., Improving generalization of meta-learning with
inverted regularization at inner-level, in: Proceedings of the IEEE/CVF Conference
on Computer Vision and Pattern Recognition, 2023, pp. 7826–7835.
[18] D. Wang, M. Zhang, Y. Xu, et al., Metric-based meta-learning model for few-shot
fault diagnosis under multiple limited data conditions, Mech. Syst. Signal Process.
155 (2021) 107510.
[19] D.G. McClement, N.P. Lawrence, P.D. Loewen, et al., A meta-reinforcement
learning approach to process control, IFAC-PapersOnLine 54 (3) (2021) 685–692.
[20] J. Yang, X. Wang, Z. Luo, Few-shot remaining useful life prediction based on meta-
learning with deep sparse kernel network, Inf. Sci. 653 (2024) 119795.
[21] L. Xie, Y. Chen, R. Chang, Scheduling optimization of prefabricated construction
projects by genetic algorithm, Appl. Sci. 11 (12) (2021) 5531.
[22] C. Boje, A. Guerriero, S. Kubicki, et al., Towards a semantic construction digital
twin: directions for future research, Autom. Constr. 114 (2020) 103179.
[23] K. Li, V.J.L. Gan, M. Li, et al., Automated generative design and prefabrication of
precast buildings using integrated BIM and graph convolutional neural network,
Dev. Built Environ. 18 (2024) 100418.
[24] J.C.P. Cheng, W. Chen, K. Chen, et al., Data-driven predictive maintenance
planning framework for MEP components based on BIM and IoT using machine
learning algorithms, Autom. Constr. 112 (2020) 103087.
[25] W. Hamilton, Z. Ying, J. Leskovec, Inductive representation learning on large
graphs, Adv. Neural Inf. Proces. Syst. 30 (2017).
[26] K. Xu, W. Hu, J. Leskovec, et al., How powerful are graph neural networks?, 2018,
arXiv preprint arXiv:1810.00826.
[27] L. Shi, L. Wang, C. Long, et al., META-SGCN: Sparse graph convolution network for
pedestrian trajectory prediction, in: Proceedings of the IEEE/CVF conference on
computer vision and pattern recognition, 2021, pp. 8994–9003.
[28] A. Karpatne, X. Jia, V. Kumar, Knowledge-guided machine learning: Current trends
and future prospects, 2024, arXiv preprint arXiv:2403.15989.
[29] S. Yun, M. Jeong, R. Kim, et al., Graph transformer networks, Adv. Neural Inf.
Proces. Syst. 32 (2019).
[30] M. Li, T. Jia, H. Wang, B. Ma, H. Lu, S. Lin, D. Chen, AO-DETR: anti-overlapping
DETR for X-ray prohibited items detection, IEEE Trans. Neural Networks Learn.
Syst. 36 (7) (2025) 12076–12090, https://doi.org/10.1109/
TNNLS.2024.3487833.
[31] J. Deng, S. Liu, H. Chen, Y. Chang, Y. Yu, W. Ma, H. Xie, A precise method for
identifying 3-D circles in freeform surface point clouds, IEEE Trans. Instrum. Meas.
74 (2025) 1–13, https://doi.org/10.1109/TIM.2025.3547492.
[32] X. Wang, X. Song, Z. Li, H. Wang, YOLO-DBS: efficient target detection in complex
underwater scene images based on improved YOLOv8, J. Ocean Univ. China 24 (4)
(2025) 979–992, https://doi.org/10.1007/s11802-025-6029-2.
[33] D. Di, Y. Bai, H. Fang, B. Sun, N. Wang, B. Li, Intelligent siltation diagnosis for
drainage pipelines using weak-form analysis and theory-guided neural networks in
geo-infrastructure, Autom. Constr. 176 (2025) 106246, https://doi.org/10.1016/j.
autcon.2025.106246.
[34] Y. Cao, H. Chi, Z. Zhu, S. Fan, Y. Zhang, Y. Tang, D. Hou, Multi-functional self-
sensing electronic gasket for structural health monitoring of transportation
pipelines, Adv. Funct. Mater. 35 (20) (2025) 2412634, https://doi.org/10.1002/
adfm.202412634.
[35] B. Chen, F. Qiu, L. Xia, L. Xu, J. Jin, G. Gou, In situ ultrasonic characterization of
hydrogen damage evolution in X80 pipeline steel, Materials 17 (23) (2024) 5891,
https://doi.org/10.3390/ma17235891.
[36] Z. Wang, D. Gao, Y. Lu, K. Deng, Z. Yuan, M. Huang, T. Jiang, A mutual cross-
attention fusion network for surface roughness prediction in robotic machining
process using internal and external signals, J. Manuf. Syst. 82 (2025) 284–300,
https://doi.org/10.1016/j.jmsy.2025.06.018.
[37] Y. Li, X. Weng, D. Hu, Z. Tan, J. Liu, Data-driven method for predicting Long-term
underground pipeline settlement induced by rectangular pipe jacking tunnel
construction, J. Pipeline Syst. Eng. Pract. 16 (3) (2025) 4025046, https://doi.org/
10.1061/JPSEA2.PSENG-1855.
[38] H. Zhang, Y. Deng, F. Chen, Y. Luo, X. Xiao, N. Lu, Y. Deng, Fatigue life prediction
for orthotropic steel bridge decks welds using a Gaussian variational bayes network
12
===== PAGE 13 =====
F. Xia et al. Microchemical Journal 220 (2026) 116541
and small sample experimental data, Reliab. Eng. Syst. Saf. 264 (2025) 111406,
https://doi.org/10.1016/j.ress.2025.111406.
[39] J. Zhu, X. Wang, G. Cao, L. Xu, Y. Cao, Quantum interval neural network for
uncertain structural static analysis, Int. J. Mech. Sci. 303 (2025) 110646, https://
doi.org/10.1016/j.ijmecsci.2025.110646.
[40] X. Shen, J. Liu, Y. Ren, L. Jiang, L. Wang, H. Zhao, R. Li, A task-oriented physical
collaborative network for pipeline defect diagnosis in a magnetic flux leakage
detection system, Comput. Ind. 169 (2025) 104290, https://doi.org/10.1016/j.
compind.2025.104290.
[41] H. Xu, F. Han, W. Zhou, Y. Liu, F. Ding, J. Zhu, ESMNet: an enhanced YOLOv7-
based approach to detect surface defects in precision metal workpieces,
Measurement 235 (2024) 114970, https://doi.org/10.1016/j.
measurement.2024.114970.
[42] G. Zhang, J. Gu, H. Shi, P. Zhang, Z. Yu, W. Zhao, G. Yang, Microstructures and
mechanical properties analysis of TiAl joints using novel brazing filler metal, Weld.
World (2025), https://doi.org/10.1007/s40194-025-02210-3.
[43] J. Peng, S. Xie, T. Chen, X. Wang, X. Yu, L. Yang, Z. Ni, Z. Ling, Z. Yuan, J. Shi,
Z. Yang, Numerical simulation and process optimization of laser welding in 6056
aluminum alloy T-joints, Crystals 15 (1) (2025) 35, https://doi.org/10.3390/
cryst15010035.
[44] J. Peng, S. Xie, Y. Tian, X. Wang, X. Yu, N. Chen, Z. Chen, Numerical simulation
and process parameter optimization of laser spot welding for ultra-thin sheets, Opt.
Laser Technol. 193 (2026) 114240, https://doi.org/10.1016/j.
optlastec.2025.114240.
[45] H. Xu, Y. Xu, K. Hu, A vision-based inspection system for pharmaceutical
production line, J. Supercomput. 81 (4) (2025) 625, https://doi.org/10.1007/
s11227-025-07135-8.
13
