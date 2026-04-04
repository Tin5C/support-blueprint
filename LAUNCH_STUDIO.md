# Launch Studio — Product Definition

## Headline
**"You shipped it. Now make it enterprise-ready."**

AI apps are replacing enterprise SaaS faster than anyone predicted. The build is fast. Getting the enterprise deal across the line — through procurement, security review, legal, and compliance — is where teams slow down or get stuck entirely.

**Launch Studio is the structured bridge between "we built it" and "enterprises will deploy it."**

An AI builder is not just a founder — it is any engineer or team building with AI tools, whether at a startup, a scaleup, or inside a large enterprise. Today, vibe coding is the norm, not the exception.

---

## The three problems it solves

**1. Builders don't know what they don't know**
A vibe-coded founder has no idea what a CISO will ask, what GDPR Article 25 requires, or what "SOC 2 Type II" means for their architecture. Launch Studio surfaces every gap before procurement does.

**2. No repeatable process from delivery to governed deployment**
SIs reinvent the wheel on every client engagement. Enterprises have no standard for evaluating internal AI tools. Launch Studio gives everyone the same structured process.

**3. The output is wrong**
Most builders think the output of readiness work is a score. Enterprise buyers need artifacts — a signed report, an architecture diagram, a gap register, an AI risk classification, expert sign-off. Launch Studio produces the package, not just the number.

---

## Who uses it

### The builder (primary user)

| Persona | Context | Core fear |
|---------|---------|-----------|
| Startup founder / solo builder | Built in Lovable/Cursor/Bolt, first enterprise deal incoming | "Procurement will kill my deal" |
| Software engineer at a scaleup | Building AI features replacing internal SaaS tools, board wants assurance | "We'll get blocked at the security review" |
| Innovation / platform engineer at an enterprise | Built an internal AI tool, needs sign-off before company-wide rollout | "My internal customers — Security, QA, Legal, IT Ops — will reject this" |
| Security engineer | Reviewing an AI tool before it gets deployed into the enterprise environment | "I need to know exactly what this does with our data" |
| IT Operations / AIops engineer | Responsible for running and supporting AI tools in production | "I need to know this can actually be supported before it goes live" |
| SI delivery engineer | Deploying agents for a client, needs repeatable governance across engagements | "I'm reinventing the wheel on every project" |
| Technical CTO / CTO-for-hire | Brought in to make someone else's product enterprise-ready | "I know what needs doing but have no tooling" |

### The internal customer (within an enterprise)
Within an enterprise, the builder is often an internal engineer and the "buyer" is an internal customer: Security, QA, Legal, IT Operations, Architecture Review Board, AIops. The procurement process is internal approval, not an external sales cycle. Launch Studio serves both dynamics equally — external enterprise deals and internal enterprise sign-off follow the same readiness logic.

### The buyer (output consumer)
The enterprise customer's procurement team — CISO, CTO, legal, compliance. They never log into Launch Studio but they **receive its output**. The readiness report is a procurement artifact. Everything about the report format, language, and structure is designed for them, not just the builder.

---

## Workspace types

| Type | Who | UI framing |
|------|-----|-----------|
| ISV | Vendor deploying their own product | Product-centric |
| SI | Integrator deploying for a client | Client-centric |

---

## Business model

- **Charged per evaluation** — each completed evaluation is a discrete transaction
- **Premium tier** — includes expert review and sign-off (see Step 4)
- **Standard tier** — automated evaluation, procurement package, no expert sign-off
- **Continuous re-evaluation** — not part of Launch Studio. Handled in Support Studio once the deployment is live

---

## The value chain

Enterprise readiness is a loop, not a one-time event:

```
BUILD → UNDERSTAND → CONTEXTUALISE → EVALUATE → REMEDIATE → VALIDATE → PACKAGE → DEPLOY → MONITOR → RE-EVALUATE
```

Launch Studio covers **Understand → Package**.
Support Studio covers **Deploy → Re-evaluate**.

---

## The core workflow

---

### Step 0 — Enterprise Context (What does "ready" mean here?)

**This step happens before the solution is evaluated.**

Before Launch Studio can assess whether a solution is enterprise-ready, it needs to understand what "enterprise ready" means for this specific deployment context — not just against generic external frameworks, but against the internal standards of the company deploying or buying the solution.

Every enterprise already has its own baseline: IT policies, security standards, approved vendor lists, change management processes, SLA templates, and architectural standards. The AI solution needs to fit their world, not just meet generic external standards.

**Who provides these documents:**
Both the builder and the buyer can contribute. In an ISV sale, the builder may have received the buyer's vendor questionnaire. In an SI engagement, the SI has the client's internal IT documentation. In an internal enterprise deployment, the builder IS the organisation and connects their own standards. Launch Studio accepts input from either side.

**Sources Launch Studio accepts for enterprise context:**

| Document / System | What it reveals |
|------------------|----------------|
| IT Operations runbooks | How they run systems — monitoring standards, incident response expectations, on-call norms, escalation paths |
| Internal security policy | InfoSec baseline — access control, encryption standards, password policy, approved tooling |
| Change management documentation | CAB process, deployment approval workflow — how changes must be submitted and approved |
| Vendor risk questionnaire | Their exact procurement checklist — gives the builder a direct map of what they will be asked |
| Existing SLA agreements | SLA levels they have committed to internally or with other vendors — sets the benchmark |
| Data classification policy | How they categorise data — determines what tier the AI solution's data sits in |
| Architecture review board documents | Approved tech stack, banned technologies, required architectural patterns |
| Business continuity / DR plan | RPO/RTO expectations — what availability and recovery the AI solution must meet |
| Internal audit reports | Previous findings — where they have been burned before and what they are sensitive to |
| IT asset management records | Approved vendors list — is the AI stack even on it? |

**If buyer documents are not available:**
Launch Studio provides a structured enterprise context questionnaire — a set of questions that infers the same information through direct input. This ensures even builders who have not yet received formal documentation from their prospect can run a meaningful evaluation.

**Output of Step 0:**
- Enterprise Readiness Baseline — a structured profile of what this deployment context requires
- Internal standards mapped — which of the buyer's own requirements will be checked
- Gap preview — first look at obvious mismatches before full evaluation runs

---

### Step 1 — Solution Intelligence (Connect & Ingest)

The account moves through three states: **empty → ingesting → populated**

**Empty state** — guided context cards explaining what to connect and why. For vibe-coders this is often the moment they realise documentation does not exist yet.

#### 1a. AI Risk Classification (before evaluation begins)

Launch Studio classifies the AI system's risk tier under the EU AI Act. This determines evaluation depth.

| Risk tier | Examples | Requirements |
|-----------|---------|-------------|
| Unacceptable | Social scoring, real-time biometric surveillance | Prohibited |
| High | HR screening, credit scoring, critical infrastructure AI | Conformity assessment, human oversight, registration |
| Limited | Chatbots, content generation tools | Transparency obligations |
| Minimal | Spam filters, recommendation engines | Good practices only |

The classification is shown with plain-language explanation and rationale. The builder reviews it before evaluation runs. In the premium tier, the expert reviewer validates and can override this classification.

#### 1b. Discovery — Understanding what you actually have

Launch Studio is designed to work with messy, incomplete inputs.

**The solution itself:**
- GitHub repo — codebase scan even if messy or AI-generated
- Lovable export, Cursor project, Bolt output — treated as first-class inputs
- Architecture docs (even partial or informal)
- API specs
- Release notes and changelogs
- Security and compliance guides

**The deployment environment:**
- Cloud infrastructure — IaC, Terraform, Docker, CI/CD configs
- Issue tracking (Jira, ServiceNow)
- Monitoring setup (Datadog, PagerDuty)
- Communication (Slack)
- Internal wikis (Confluence)
- Source control (GitHub)

**What discovery infers automatically:**
- Architecture patterns and component boundaries
- Data flows and third-party dependencies
- Data types being processed (PII, financial, health)
- Security posture signals (exposed secrets, missing auth, unpatched dependencies)
- Operational maturity (monitoring, runbooks, on-call)
- AI-specific patterns (model versioning, hallucination guardrails, audit logging)
- Geographic deployment footprint

For vibe-coded apps with minimal documentation, Launch Studio generates a first-draft architecture map from the codebase — giving builders a view of their own product they may never have had. This diagram is validated by the expert reviewer in the premium tier.

#### 1c. Regulatory Context Detection

| Signal detected | Frameworks triggered |
|----------------|---------------------|
| EU operations or EU customer data | GDPR, EU AI Act |
| Swiss financial services | FINMA, GDPR |
| EU financial services | MiFID II, GDPR, EU AI Act |
| UK financial services | FCA, UK GDPR |
| US financial services | SEC/FINRA, SOC 2 |
| Healthcare (EU) | GDPR, MDR |
| Healthcare (US) | HIPAA, SOC 2 |
| Any AI deployment | EU AI Act, NIST AI RMF, ISO 42001 |
| Azure infrastructure | Microsoft WAF (5 pillars) |
| AWS infrastructure | AWS Well-Architected Framework |
| GCP infrastructure | GCP Architecture Framework |
| Security baseline (all) | OWASP, ISO 27001, SOC 2 |

The builder reviews and confirms. They can add frameworks manually.

**Combined evaluation criteria = Enterprise Context (Step 0) + External Frameworks (Step 1c)**

Both feed the evaluation. The procurement package shows compliance against both.

#### 1d. Populated State Output

- Context Overview — solution scope, AI risk classification, regulatory context
- Enterprise Readiness Baseline — internal standards profile from Step 0
- Solution Footprint — products, environments, integrations, criticality
- Graph Readiness score — 0–100%, gates evaluation
- Regulatory Profile — confirmed frameworks
- Connected Systems, Classified Entities, Risk Signals, Knowledge Sources

---

### Step 2 — 9-Agent Evaluation

Each agent evaluates against both the external frameworks (Step 1) and the internal enterprise standards (Step 0).

**Ingestion agents (run first):**

| Agent | What it reads |
|-------|--------------|
| GitHub repo reader | Code, dependencies, secrets, security patterns |
| Documentation parser | Architecture docs, API specs, data flows |
| Infrastructure analyser | IaC, Docker, CI/CD, cloud configs |
| Integration mapper | External dependencies, MCP servers, vendor APIs |

**Analysis agents:**

| # | Agent | Domain | Frameworks | Weight |
|---|-------|--------|-----------|--------|
| 1 | Security Posture | AppSec, identity, NHI, secrets, auth | OWASP, ISO 27001, SOC 2 + internal security policy | 18% |
| **2** | **AI Governance** | **Model lifecycle, hallucinations, audit logging, approval boundaries, human oversight** | **EU AI Act, NIST AI RMF, ISO 42001** | **25%** |
| 3 | Data & Privacy | PII handling, data lineage, retention, third-party flows | GDPR, FINMA, HIPAA + internal data classification policy | 15% |
| 4 | Infrastructure & Reliability | Reliability, scalability, cost, ops excellence | Microsoft WAF, AWS WA, GCP AF + internal DR/BCP requirements | 12% |
| 5 | Integration & Dependency | APIs, MCP servers, vendor risk, agent tool access | ISO 27001, SOC 2 + internal approved vendor list | 10% |
| 6 | Operational Readiness | Monitoring, runbooks, incident response, on-call | WAF Operational Excellence + internal IT ops runbooks | 8% |
| 7 | Compliance & Regulatory | Industry-specific regulation | FINMA, MiFID II, HIPAA, EU AI Act — context-driven | 7% |
| 8 | Documentation & Knowledge | Architecture completeness, knowledge gaps, change log | ISO 42001 + internal architecture review standards | 3% |
| **9** | **Support System Design** | **Synthesises all outputs into Support Preview** | **All frameworks + enterprise context** | **2%** |

**Score bands:**

| Score | Status | What it means |
|-------|--------|--------------|
| 80–100 | Enterprise Ready | Suitable for production enterprise contracts |
| 60–79 | Conditionally Ready | Suitable for pilots with a remediation roadmap |
| 40–59 | Requires Remediation | Not suitable — critical gaps present |
| 0–39 | Not Ready | Significant structural work required |

Score is always contextualised:
*"74/100 — Conditionally Ready for GDPR + FINMA + EU AI Act (Limited Risk) + [Company] Internal Standards"*

**Graduated readiness:**

| Builder stage | Target band | What "ready" means |
|-------------|-------------|-------------------|
| First enterprise pilot | 60–79 | Conditionally Ready with a credible roadmap |
| Production contracts | 75–85 | Enterprise Ready for specific context |
| Regulated industry | 85+ | Full compliance posture, audit-ready |

---

### Step 3 — Remediation

Every finding generates a remediation task grounded in the applicable framework or internal standard:

- **Exact fix instructions** cited to specific framework articles and internal policy clauses
- **Framework attribution** — every task cites where the requirement comes from
- **Priority ranking** — P0 blockers (must resolve before expert review) / P1 critical / P2 recommended
- **Effort estimate** — hours or days
- **Builder-type-aware guidance** — plain language for vibe-coders, technical detail for security and IT ops engineers
- **Evidence tracking** — each resolved item marked with supporting evidence

The graph readiness score updates in real time as items are resolved.

---

### Step 4 — Expert Review (Premium tier only)

**This is a stage, not a feature. Available in the premium tier.**

After automated evaluation completes and all P0 findings are resolved, a SavanoAI expert reviews the entire assessment before the procurement package is finalised.

**What the expert does:**
- Validates the AI risk classification — EU AI Act tier assignment is consequential and should not be fully automated
- Reviews top findings for accuracy, completeness, and contextual relevance
- Adds industry and regulatory nuance the agents cannot have
- Validates the auto-generated architecture diagram — iterates with the builder if corrections are needed
- Identifies any critical findings the automated evaluation may have missed or underweighted
- Reviews the enterprise context mapping — are the right internal standards being checked?
- Signs off the procurement package as a named, accountable reviewer

**If critical findings emerge after the package has been shared:**
The expert flags them, works with the builder to remediate, and re-signs an updated package. Version control is maintained — the buyer receives a clear notification that an updated version is available.

**What expert review adds to the procurement package:**
- Named reviewer with credentials
- Review date and methodology statement
- Expert commentary on top 3 findings
- Validated AI risk classification with rationale
- Validated architecture diagram
- Sign-off statement

**Why this matters:**
An automated score alone is not trusted by enterprise procurement. A CISO does not accept a self-assessment from an unknown tool. Expert sign-off elevates the output from automated self-assessment to third-party verified assessment.

---

### Step 5 — The Procurement Package

Full output artifact set, designed for enterprise buyer procurement teams.

| Artifact | Purpose | Audience |
|---------|---------|---------|
| Readiness Report (PDF) | Formal scored assessment with methodology and expert sign-off (premium) | CISO, CTO, Legal |
| Architecture Diagram | Auto-generated from codebase and docs, expert-validated (premium) | CTO, Security |
| Data Flow Map | PII flows, data residency, third-party exposure | Privacy/Legal, DPO |
| Gap Register | All findings with remediation status and evidence | Procurement, Auditors |
| AI Risk Classification | EU AI Act tier + rationale + expert validation (premium) | Legal, Compliance |
| Enterprise Context Compliance | Internal standards checked and status | Internal IT/Security |
| Regulatory Coverage Summary | External frameworks covered, which clauses | Legal, Compliance |
| Remediation Roadmap | Outstanding items with timelines | CTO, CISO |

---

### Step 6 — Support Preview (The handoff moment)

Agent 9 produces a **Support Preview** — a snapshot of what governed support for this deployment would look like. Intentionally incomplete — it shows the shape without building it.

**Support Preview contains:**
- Top 10 most likely failure modes specific to this deployment
- Automation boundaries — what could be auto-resolved vs. what needs a human
- SLA recommendations — availability %, response times, review cadence
- Support tier classification — Tier 1/2/3 based on complexity, risk, regulatory exposure
- Client communication templates per failure type
- Improvement triggers — "if this happens N times, do X"
- Regulatory watch items — ongoing compliance obligations support needs to monitor

**The message:**
> *"Your deployment scores 74/100 — Conditionally Ready for GDPR + FINMA + EU AI Act. Your procurement package is ready. Here's a preview of what your governed support system looks like. Build and run it in Support Studio."*

**CTA: "Set up Support Studio →"**

Note: Continuous re-evaluation is handled in Support Studio, not Launch Studio. Launch Studio is charged per evaluation.

---

## Key concepts

| Term | Definition |
|------|-----------|
| Enterprise Context | Internal standards, policies, and requirements of the company deploying or buying the solution — established in Step 0 |
| Solution Intelligence | Classified knowledge graph of the solution — scoped to the solution itself |
| AI risk classification | EU AI Act tier — set before evaluation, determines depth. Expert-validated in premium tier |
| Regulatory context | Confirmed external frameworks applicable to this deployment |
| Graph readiness | 0–100% completeness score — gates evaluation |
| Contextualised score | Score stated with full context — "74/100 — Conditionally Ready for GDPR + FINMA + [Company] Internal Standards" |
| Graduated readiness | Stage-appropriate targets — pilot-ready vs. production-ready vs. regulated-industry-ready |
| Expert review | Premium tier — SavanoAI expert sign-off elevating self-assessment to third-party verified assessment |
| Procurement package | Full artifact set designed for enterprise buyer procurement teams |
| Support Preview | Agent 9 output — snapshot of governed support, hands off to Support Studio |
| Per-evaluation pricing | Each completed evaluation is a discrete charged transaction |

---

## What Launch Studio is NOT

- Not a code deployment tool
- Not a full support system — that is Support Studio
- Not a legal compliance certification — identifies gaps and recommends fixes, does not certify
- Not just for polished products — explicitly designed for messy vibe-coded products
- Not a continuous monitoring tool — that is Support Studio

---

## Canonical demo accounts

| Account | Type | AI Risk | Regulatory context | Contact |
|---------|------|---------|-------------------|---------|
| Acme Manufacturing | ISV / Enterprise | Limited | ISO 27001, Microsoft WAF, internal IT runbooks | Sarah Chen |
| Contoso Digital | SI / Swiss Financial Services | High | GDPR, FINMA, MiFID II, Microsoft WAF, internal audit history | Marcus Webb |

---

## Screens

| Screen | Route | Purpose |
|--------|-------|---------|
| Enterprise Context | /context | Step 0 — upload internal standards, configure buyer baseline |
| Solution Intelligence | /intelligence | Connect sources, classify AI risk, detect regulatory context |
| Readiness Report | /readiness | 9-agent scores, gap register, remediation tasks |
| Expert Review | /review | Premium — SavanoAI expert validation and sign-off |
| Procurement Package | /package | Generated artifacts for enterprise buyer |
| Support Preview | /preview | Agent 9 output — teaser for Support Studio |

---

## Requirements

### Product goals

| # | Goal | Why it matters |
|---|------|---------------|
| G1 | A builder can complete a scored evaluation in under 4 hours for a well-documented project | Speed is core — builders abandon slow processes before procurement |
| G2 | Every finding is actionable — tells the builder exactly what to fix, not just that something is broken | A score without remediation is useless |
| G3 | The procurement package is trusted by enterprise buyers without additional explanation | If a CISO needs the builder to explain the report, the report has failed |
| G4 | Builders who complete remediation improve their score by at least 15 points on average | Proves the product drives real change, not just measurement |
| G5 | At least 40% of builders who complete Launch Studio activate Support Studio | The commercial handoff must be compelling |
| G6 | The product works for vibe-coded projects with no existing documentation | If it only works for well-documented codebases it serves the wrong audience |

---

### Non-goals

| # | Not in scope | Why |
|---|-------------|-----|
| N1 | Automated remediation execution | Automated code changes are a different product category with different liability |
| N2 | Formal legal certification | Certification requires accredited bodies |
| N3 | Real-time regulatory monitoring | Handled in Support Studio |
| N4 | Multi-user collaboration on a single evaluation in v1 | Add complexity after nailing single-user |
| N5 | Integration with external certification bodies in v1 | Partnership dependencies that would block core product |
| N6 | Building or modifying the AI solution itself | Launch Studio evaluates, it does not build |

---

### User stories

Priority: **P0** = must have · **P1** = should have · **P2** = nice to have

---

#### Epic 0 — Enterprise Context

**US-01** · P0
As an SI delivery engineer, I want to upload my client's IT operations runbooks and security policy documents so that the evaluation runs against their actual internal standards, not just generic frameworks.

*Acceptance criteria:*
- Accepts PDF, Word, or plain text documents
- Extracts and displays detected standards before evaluation runs
- Builder can review and correct what was detected
- Detected standards appear alongside external frameworks in results

---

**US-02** · P0
As an enterprise innovation engineer, I want to see which of my company's internal requirements the solution currently fails so that I can prioritise fixes that will satisfy my internal Security and QA teams before requesting their review.

*Acceptance criteria:*
- Internal standard gaps shown separately from external framework gaps
- Each gap cites the specific document and section it came from
- Filterable to show only internal standard failures

---

**US-03** · P1
As an IT operations engineer reviewing a new AI tool, I want to upload our standard IT ops runbooks and see exactly how the proposed deployment maps to our existing operational processes so that I can assess supportability before approving deployment.

*Acceptance criteria:*
- IT ops runbooks accepted as enterprise context input
- Evaluation output includes an operational readiness section mapped against uploaded runbooks
- Gaps between the AI tool's operational model and existing IT ops processes are explicitly surfaced

---

**US-04** · P1
As an SI delivery engineer, I want to save an enterprise context profile per client so that I can reuse it across multiple projects without re-uploading their documents.

*Acceptance criteria:*
- Profiles saved and associated with a client account
- Selectable when starting a new evaluation
- Updates do not retroactively change completed evaluations

---

**US-05** · P1
As a startup founder, I want a structured questionnaire if I don't have the buyer's internal documents so that I can still get a meaningful evaluation based on what I know about their environment.

*Acceptance criteria:*
- Questionnaire covers the same dimensions as document scanning
- Results produce an equivalent enterprise context profile
- Output notes which items came from documents vs. questionnaire

---

#### Epic 1 — Solution Intelligence

**US-06** · P0
As a vibe-coder founder, I want to connect my GitHub repository — even if messy or AI-generated — and receive a first-draft architecture diagram so that I understand what I have built before evaluation runs.

*Acceptance criteria:*
- Accepts any GitHub repo regardless of code quality
- First-draft architecture diagram generated showing detected components
- Builder can annotate or correct before it feeds evaluation
- Diagram becomes part of the procurement package

---

**US-07** · P0
As any builder, I want the system to classify my AI application's EU AI Act risk tier before evaluation begins so that I understand what level of evaluation applies and what obligations I have.

*Acceptance criteria:*
- Plain-language explanation of the classification and what it means
- Rationale shown (what signals triggered it)
- In premium tier, expert reviewer can validate or override
- Classification gates evaluation depth

---

**US-08** · P0
As a security engineer reviewing an AI tool, I want to see exactly which regulatory frameworks the evaluation ran against and why each was included so that I can confirm the assessment scope is appropriate for our environment.

*Acceptance criteria:*
- Each framework shown with the signal that triggered its inclusion
- Frameworks can be added or removed with a reason recorded
- Final confirmed list shown before evaluation runs and included in the procurement package

---

**US-09** · P1
As any builder, I want a graph readiness score showing how complete my knowledge base is so that I know whether to add more documentation before running the full evaluation.

*Acceptance criteria:*
- Score shown as 0–100% with breakdown of contributing factors
- Updates in real time as sources are connected
- Below 40%, advised to add more sources — can proceed with a warning

---

#### Epic 2 — 9-Agent Evaluation

**US-10** · P0
As any builder, I want each agent's individual score and top 3 findings so that I understand which area is weakest and where to focus remediation.

*Acceptance criteria:*
- Each of the 9 agents shows an individual score out of 100
- Each agent shows top 3 findings with severity
- Overall score shown as weighted composite with weighting explained
- Score band shown prominently with plain-language meaning

---

**US-11** · P0
As a vibe-coder founder, I want all findings explained in plain language so that I understand what is wrong and why it matters without a compliance consultant.

*Acceptance criteria:*
- Every finding has a plain-language title and description
- Framework reference shown but secondary
- High-severity findings include business impact ("this could block your deal because...")
- Technical findings include a non-technical summary for sharing with non-engineers

---

**US-12** · P0
As a security engineer, I want the Security Posture and AI Governance agents to check for specific controls I care about — access control, secrets management, model audit logging, human override — so that I can give a meaningful sign-off to my team.

*Acceptance criteria:*
- Security Posture checks: authentication mechanisms, secrets in code, dependency vulnerabilities, network exposure
- AI Governance checks: human override capability, model version tracking, inference audit logs, hallucination detection, approval boundaries
- Each check maps to a specific framework article
- Missing controls shown as findings with specific implementation guidance

---

**US-13** · P1
As an SI delivery engineer, I want to compare evaluation scores across multiple client deployments so that I can prioritise which client needs the most remediation attention.

*Acceptance criteria:*
- Dashboard view of all active evaluations with scores
- Sortable by score, band, last updated, client name
- Drill down to individual evaluation
- Exportable as summary report

---

#### Epic 3 — Remediation

**US-14** · P0
As any builder, I want every finding to include an exact remediation instruction — not a general recommendation — cited to the specific framework article so that I can action it without researching the fix myself.

*Acceptance criteria:*
- Every finding has a specific "how to fix" instruction
- Cites the specific framework article or internal standard clause
- Effort estimate shown for every task
- Instructions calibrated to builder technical level

---

**US-15** · P0
As any builder, I want to mark a remediation task complete and upload supporting evidence so that the score updates and I have a paper trail for the expert reviewer and procurement team.

*Acceptance criteria:*
- "Mark as resolved" action on each finding
- Evidence attachment (document, screenshot, URL, commit link)
- Score recalculates immediately on resolution
- Resolved items retained in gap register with evidence for procurement package

---

**US-16** · P0
As any builder, I want P0/P1/P2 priority ranking on all findings so that I know which are deal-killers before I approach procurement.

*Acceptance criteria:*
- Every finding labelled P0/P1/P2 with clear definition
- P0 findings block expert review trigger — must be resolved first
- Default view sorted by priority
- Filterable to P0 only

---

**US-17** · P1
As an AIops engineer, I want operational readiness findings to include specific monitoring and runbook gaps so that I can build a concrete action plan for making the AI tool supportable in production.

*Acceptance criteria:*
- Operational Readiness agent findings specify: missing monitoring coverage, runbook gaps, on-call process gaps, incident response gaps
- Each finding maps to the internal IT ops runbooks uploaded in Step 0 where applicable
- Remediation tasks include specific tooling recommendations (Datadog, PagerDuty, etc.)

---

#### Epic 4 — Expert Review (Premium)

**US-18** · P0 (premium tier)
As any builder on the premium tier, I want a named SavanoAI expert to validate my AI risk classification and sign off the procurement package so that I can present it as a third-party verified assessment.

*Acceptance criteria:*
- Expert review triggered after all P0 findings resolved
- Named reviewer with displayed credentials
- Expert can validate or override AI risk classification with written rationale
- Expert validates auto-generated architecture diagram — iterates with builder if corrections needed
- Expert adds commentary on top 3 findings
- Review date and reviewer name on procurement package cover page

---

**US-19** · P0 (premium tier)
As a CISO receiving the procurement package, I want to see the reviewer's name, credentials, methodology, and scope of review so that I can determine whether the assessment is credible enough for my board.

*Acceptance criteria:*
- Reviewer name, title, and certifications on report cover page
- Methodology statement as appendix
- Review date and scope clearly stated
- Statement of what was NOT reviewed included

---

**US-20** · P0 (premium tier)
As any builder, I want the expert to flag any critical findings discovered after I have already shared the package with a prospect so that I can remediate and provide an updated version without losing the deal.

*Acceptance criteria:*
- Expert can add findings post-sign-off
- Builder notified immediately of new findings
- Expert works with builder through remediation
- Expert re-signs updated package once resolved
- Version history maintained — buyer receives notification of updated version

---

#### Epic 5 — Procurement Package

**US-21** · P0
As any builder, I want a downloadable PDF readiness report I can email to a prospect's procurement team without requiring them to log in anywhere.

*Acceptance criteria:*
- Professionally formatted PDF
- Includes: cover page, executive summary, overall score with context, per-agent scores, gap register, architecture diagram, data flow map, regulatory coverage summary, expert sign-off (premium)
- Executive summary written for non-technical audience
- Technical detail in appendices

---

**US-22** · P0
As a CISO, I want a data flow map showing exactly where PII moves, where it is stored, and which third parties have access so that I can assess GDPR compliance in under 30 minutes.

*Acceptance criteria:*
- Shows all data inputs, processing steps, storage locations, outputs
- PII flows visually distinguished
- Third-party services labelled with data processing role
- Data residency shown for all storage
- Generated automatically from code and infrastructure analysis

---

**US-23** · P1
As a legal team member at the enterprise, I want a regulatory coverage summary showing which specific clauses of each applicable framework were checked and whether they passed or failed.

*Acceptance criteria:*
- Lists every applicable framework
- For each framework: specific articles/clauses checked with pass/fail/partial/N/A
- Failed clauses link to corresponding finding in gap register
- Exportable as standalone document

---

#### Epic 6 — Support Preview

**US-24** · P0
As any builder who has completed Launch Studio, I want to see the top 10 most likely failure modes for my specific deployment so that I understand what support scenarios I need to plan for.

*Acceptance criteria:*
- Failure modes specific to this deployment, not generic
- Each shows: likelihood, business impact, whether auto-resolvable or human-required
- Derived from evaluation findings and regulatory context
- Shown before the Support Studio CTA

---

**US-25** · P0
As any builder, I want a compelling preview of what governed support for my deployment would look like so that I understand the value of Support Studio before committing.

*Acceptance criteria:*
- Shows: support tier, automation boundaries, SLA recommendations, sample communication templates
- Intentionally incomplete — enough to understand the shape, not enough to use without Support Studio
- Gap between preview and full support system clearly communicated
- CTA "Set up Support Studio" prominent and contextualised to this deployment

---

**US-26** · P1
As any builder completing Launch Studio, I want my evaluation data to automatically populate Support Studio so that I do not re-enter anything when setting up support.

*Acceptance criteria:*
- Clicking CTA passes evaluation data, regulatory context, failure modes, enterprise context to Support Studio
- Support Studio opens pre-populated with deployment context
- Builder shown what was carried over and what still needs configuring

---

### Success metrics

| Metric | Target | Why |
|--------|--------|-----|
| Time to completed evaluation (well-documented) | < 4 hours | Proves the product is fast enough to be practical |
| Time to completed evaluation (vibe-coded, no docs) | < 8 hours | Proves it works for the core audience |
| % of started evaluations reaching a passing band (60+) | > 55% | Proves remediation works and builders don't give up |
| Average score improvement after remediation | +15 points minimum | Proves the product drives real change |
| % of builders downloading the procurement package | > 70% | Proves the output is useful |
| % of completed evaluations activating Support Studio | > 40% | The core commercial handoff metric |
| Expert review NPS from builders (premium) | > 50 | Proves human review adds perceived value |
| Expert review credibility rating from buyers (premium) | > 4/5 | Proves the output is trusted in procurement |

---

### Open questions

| # | Question | Status |
|---|----------|--------|
| OQ-1 | Minimum viable graph readiness score to proceed with evaluation — warn but don't block is the recommended default, but threshold needs setting | Open — needs product decision |
| OQ-2 | What is the turnaround time commitment for expert review in the premium tier? | Open — commercial/operational decision |
| OQ-3 | Should the questionnaire path (no buyer documents) produce a clearly lower-confidence evaluation with explicit caveats, or be treated equivalently to document scanning? | Open — needs product decision |
