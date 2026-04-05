# Launch Studio — Product Definition

<!--
TL;DR FOR CLAUDE — read this first, skip the rest if context is tight

1. Launch Studio helps AI builders (founders, engineers, SIs) make their AI APP OR AGENT enterprise-ready
2. Core workflow: Step 0 (enterprise context) → Step 1 (solution intelligence) → Step 2 (9-agent evaluation) → Step 3 (remediation) → Step 4 (expert review, premium) → Step 5 (procurement package) → Step 6 (support preview → hands off to Support Studio)
3. Charged per evaluation. Premium tier adds expert sign-off
4. Two workspace types: ISV (product-centric) and SI (client-centric) — drives all UI framing
5. Score always contextualised: "74/100 — Conditionally Ready for GDPR + FINMA + EU AI Act"
6. Agent 9 (Support System Design) produces the Support Preview — the handoff to Support Studio
7. Canonical ISV demo: Acme Manufacturing / Helio CRM Agent v3.4.2 / Sarah Chen
8. Canonical SI demo: Contoso Digital / Finance Flow Agent v1.8.5 / Marcus Webb (Swiss fintech, FINMA)
9. Routes: /context /intelligence /readiness /review /package /preview
10. Launch Studio ENDS with a teaser — full support design and operation is in Support Studio
-->

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
| Software engineer at a scaleup | Building AI features replacing internal SaaS, board wants assurance | "We'll get blocked at the security review" |
| Innovation / platform engineer at an enterprise | Built an internal AI tool, needs sign-off before rollout | "My internal customers — Security, QA, Legal, IT Ops — will reject this" |
| Security engineer | Reviewing an AI tool before it enters the enterprise environment | "I need to know exactly what this does with our data" |
| IT Operations / AIops engineer | Responsible for running AI tools in production | "I need to know this can be supported before it goes live" |
| SI delivery engineer | Deploying agents for a client, needs repeatable governance | "I'm reinventing the wheel on every project" |
| Technical CTO / CTO-for-hire | Brought in to make someone else's product enterprise-ready | "I know what needs doing but have no tooling" |

### The internal customer (within an enterprise)
Within an enterprise, the builder is an internal engineer and the buyer is an internal customer: Security, QA, Legal, IT Operations, Architecture Review Board, AIops. Launch Studio serves both external enterprise deals and internal enterprise sign-off equally.

### The buyer (output consumer)
The enterprise customer's procurement team — CISO, CTO, legal, compliance. They never log into Launch Studio but receive its output. The readiness report is a procurement artifact designed for them.

---

## Workspace types

| Type | Who | UI framing |
|------|-----|-----------|
| ISV | Vendor deploying their own product | Product-centric |
| SI | Integrator deploying for a client | Client-centric |

---

## Business model

- **Charged per evaluation** — each completed evaluation is a discrete transaction
- **Standard tier** — automated evaluation and procurement package, no expert sign-off
- **Premium tier** — includes expert review and sign-off by a named SavanoAI reviewer
- **Continuous re-evaluation** — not part of Launch Studio, handled in Support Studio

---

## The value chain

Launch Studio covers **Understand → Package**.
Support Studio covers **Deploy → Re-evaluate**.

---

## The core workflow

### Step 0 — Enterprise Context

Before evaluating the solution, Launch Studio understands what "enterprise ready" means for this specific deployment context — the internal standards of the receiving organisation.

**Who provides these documents:** Both builder and receiving organisation can contribute. Launch Studio accepts input from either side.

**Sources accepted:**

| Document / System | What it reveals |
|------------------|----------------|
| IT Operations runbooks | Monitoring standards, incident response, on-call norms |
| Internal security policy | InfoSec baseline — access control, encryption, approved tooling |
| Change management documentation | CAB process, deployment approval workflow |
| Vendor risk questionnaire | Their exact procurement checklist |
| Existing SLA agreements | SLA levels already committed to |
| Data classification policy | How they categorise data |
| Architecture review board documents | Approved tech stack, banned technologies |
| Business continuity / DR plan | RPO/RTO expectations |
| Internal audit reports | Previous findings — where they have been burned before |
| IT asset management records | Approved vendors list |

**Three input modes (all produce the same EnterpriseBaseline output):**

**MODE 1 — Document upload**
Upload real documents from the receiving organisation. Parser extracts requirements directly from documents. High accuracy, high specificity. Suitable for: Enterprises uploading their own estate, SIs with client documents from the engagement.

**MODE 2 — Guided questionnaire**
Answer targeted questions about the deployment context. Parser infers likely requirements from sector norms. Suitable for: Software Vendors with no receiving organisation documents yet.

**MODE 3 — Hybrid (default, most common)**
Upload what exists, questionnaire fills detected gaps.
- Stage 1: Upload documents
- Stage 2: Gap analysis — what's covered, what's missing
- Stage 3: Targeted questions only for gaps

Suitable for: All personas. Default mode.

Each requirement in the output is labelled:
- **"extracted"** — from a real document (high confidence)
- **"inferred"** — from questionnaire answers (medium confidence)

**Output:** Enterprise Readiness Baseline + internal standards mapped + gap preview.

---

### Step 1 — Solution Intelligence

Three states: **empty → ingesting → populated**

#### 1a. AI Risk Classification

| Risk tier | Examples | Requirements |
|-----------|---------|-------------|
| Unacceptable | Social scoring, biometric surveillance | Prohibited |
| High | HR screening, credit scoring, critical infrastructure AI | Conformity assessment, human oversight, registration |
| Limited | Chatbots, content generation | Transparency obligations |
| Minimal | Spam filters, recommendations | Good practices only |

Expert reviewer validates and can override in premium tier.

#### 1b. Discovery

Designed to work with messy, incomplete inputs — vibe-coded repos, partial docs, informal architecture notes.

**The solution itself:** GitHub repo, Lovable/Cursor/Bolt exports, architecture docs, API specs, release notes, security guides

**The deployment environment:** Cloud IaC, Jira/ServiceNow, Datadog/PagerDuty, Slack, Confluence, GitHub

**Auto-inferred:** Architecture patterns, data flows, data types (PII/financial/health), security posture signals, operational maturity, AI-specific patterns, geographic footprint.

For vibe-coded apps with no docs, Launch Studio generates a first-draft architecture map from the codebase.

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

Builder reviews and confirms. Can add frameworks manually.

**Combined evaluation = Enterprise Context (Step 0) + External Frameworks (Step 1c)**

#### 1d. Populated State Output

Context Overview · Enterprise Readiness Baseline · Solution Footprint · Graph Readiness score (0–100%, gates evaluation) · Regulatory Profile · Connected Systems · Classified Entities · Risk Signals · Knowledge Sources

---

### Step 2 — 9-Agent Evaluation

| # | Agent | Domain | Frameworks | Weight |
|---|-------|--------|-----------|--------|
| 1 | Security Posture | AppSec, identity, secrets, auth | OWASP, ISO 27001, SOC 2 + internal security policy | 18% |
| **2** | **AI Governance** | **Model lifecycle, hallucinations, audit logging, approval boundaries** | **EU AI Act, NIST AI RMF, ISO 42001** | **25%** |
| 3 | Data & Privacy | PII, data lineage, retention, third-party flows | GDPR, FINMA, HIPAA + internal data classification | 15% |
| 4 | Infrastructure & Reliability | Reliability, scalability, cost, ops excellence | Microsoft WAF, AWS WA, GCP AF + internal DR/BCP | 12% |
| 5 | Integration & Dependency | APIs, MCP servers, vendor risk | ISO 27001, SOC 2 + internal approved vendor list | 10% |
| 6 | Operational Readiness | Monitoring, runbooks, incident response, on-call | WAF Operational Excellence + internal IT ops runbooks | 8% |
| 7 | Compliance & Regulatory | Industry-specific regulation | FINMA, MiFID II, HIPAA, EU AI Act — context-driven | 7% |
| 8 | Documentation & Knowledge | Architecture completeness, knowledge gaps | ISO 42001 + internal architecture review standards | 3% |
| **9** | **Support System Design** | **Synthesises all outputs → Support Preview** | **All frameworks + enterprise context** | **2%** |

*AI Governance weighted at 25% — this product is for AI builders, AI-specific risks are the core differentiator.*

**Score bands:**

| Score | Status | Meaning |
|-------|--------|---------|
| 80–100 | Enterprise Ready | Suitable for production contracts |
| 60–79 | Conditionally Ready | Suitable for pilots with remediation roadmap |
| 40–59 | Requires Remediation | Not suitable — critical gaps present |
| 0–39 | Not Ready | Significant structural work required |

Score always contextualised: *"74/100 — Conditionally Ready for GDPR + FINMA + EU AI Act (Limited Risk) + [Company] Internal Standards"*

**Graduated readiness:**

| Stage | Target | Meaning |
|-------|--------|---------|
| First enterprise pilot | 60–79 | Conditionally Ready with credible roadmap |
| Production contracts | 75–85 | Enterprise Ready for specific context |
| Regulated industry | 85+ | Full compliance posture, audit-ready |

---

### Step 3 — Remediation

- Exact fix instructions cited to specific framework articles
- Framework attribution on every task
- Priority: P0 blockers / P1 critical / P2 recommended
- Effort estimate per task
- Builder-type-aware guidance — plain language for vibe-coders, technical for engineers
- Evidence tracking — resolved items marked with supporting evidence
- Graph readiness score updates in real time

---

### Step 4 — Expert Review (Premium tier only)

After all P0 findings resolved, a named SavanoAI expert:
- Validates AI risk classification (can override with written rationale)
- Reviews top findings for accuracy and contextual relevance
- Validates auto-generated architecture diagram — iterates with builder if corrections needed
- Identifies findings the automated evaluation may have missed
- Signs off the procurement package

**If critical findings emerge after package shared:** Expert flags, works with builder through remediation, re-signs updated package. Version history maintained. Buyer notified of updated version.

---

### Step 5 — The Procurement Package

| Artifact | Standard | Premium |
|---------|---------|---------|
| Readiness Report (PDF) | ✅ Automated | ✅ Expert sign-off added |
| Architecture Diagram | ✅ Auto-generated | ✅ Expert validated |
| Data Flow Map | ✅ | ✅ |
| Gap Register | ✅ | ✅ |
| AI Risk Classification | ✅ Automated | ✅ Expert validated |
| Enterprise Context Compliance | ✅ | ✅ |
| Regulatory Coverage Summary | ✅ | ✅ |
| Remediation Roadmap | ✅ | ✅ |
| Expert Commentary | ❌ | ✅ |
| Third-party Sign-off Statement | ❌ | ✅ |

---

### Step 6 — Support Preview (Handoff moment)

Agent 9 produces a snapshot — intentionally incomplete. Shows the shape without building it.

**Contains:** Top 10 failure modes · Automation boundaries · SLA recommendations · Support tier (1/2/3) · Client communication templates · Improvement triggers · Regulatory watch items

**The message:**
> *"Your deployment scores 74/100 — Conditionally Ready for GDPR + FINMA + EU AI Act. Your procurement package is ready. Here's a preview of what your governed support system looks like. Build and run it in Support Studio."*

**CTA: "Set up Support Studio →"**

---

## Key concepts

| Term | Definition |
|------|-----------|
| Enterprise Context | Internal standards of the company deploying/buying — established in Step 0 |
| Solution Intelligence | Classified knowledge graph of the solution — scoped to the solution itself |
| AI risk classification | EU AI Act tier — determines evaluation depth. Expert-validated in premium |
| Graph readiness | 0–100% completeness — gates evaluation |
| Contextualised score | Always stated with context — "74/100 — Conditionally Ready for GDPR + FINMA" |
| Graduated readiness | Stage-appropriate targets — pilot vs. production vs. regulated |
| Expert review | Premium — named reviewer elevates self-assessment to third-party verified |
| Procurement package | Full artifact set for receiving organisation procurement teams |
| Support Preview | Agent 9 output — snapshot of governed support, hands off to Support Studio |
| Per-evaluation pricing | Each completed evaluation is a discrete charged transaction |

---

## What Launch Studio is NOT

- Not a code deployment tool
- Not a full support system — that is Support Studio
- Not a legal compliance certification — identifies gaps, does not certify
- Not just for polished products — explicitly for messy vibe-coded products
- Not a continuous monitoring tool — that is Support Studio

---

## Canonical demo accounts

| Account | Type | AI Risk | Regulatory context | Contact |
|---------|------|---------|-------------------|---------|
| FinTrack AG | ISV / Swiss Fintech | High | GDPR, FINMA, EU AI Act (High Risk), ISO 27001, Microsoft WAF | — |
| Acme Manufacturing | ISV / Enterprise | Limited | ISO 27001, Microsoft WAF, internal IT runbooks | Sarah Chen |
| Contoso Digital | SI / Swiss Financial Services | High | GDPR, FINMA, MiFID II, Microsoft WAF, internal audit history | Marcus Webb |

**FinTrack AG** — primary demo scenario for all evaluation engine tests.
Client: Alpina Bank (Swiss private bank). App: AI cash flow forecasting agent · Azure Switzerland North.

---

## Screens

| Screen | Route | Purpose |
|--------|-------|---------|
| Enterprise Context | /context | Step 0 — internal standards, receiving organisation baseline |
| Solution Intelligence | /intelligence | Connect sources, classify AI risk, detect regulatory context |
| Readiness Report | /readiness | 9-agent scores, gap register, remediation |
| Expert Review | /review | Premium — expert validation and sign-off |
| Procurement Package | /package | Generated artifacts for receiving organisation |
| Support Preview | /preview | Agent 9 output — teaser for Support Studio |

---

## Building decisions (for Claude Code)

When building Launch Studio screens, apply these rules without being asked:

- **Score display:** Always show score with regulatory context — never a bare number. Format: "74/100 — Conditionally Ready for GDPR + FINMA"
- **Workspace type:** When workspace is ISV, use product-centric language. When SI, use client-centric language. This applies to every label, CTA, and heading
- **Route guard:** Never create a route not listed in the Screens table above without explicit instruction
- **Step 0 first:** Enterprise Context (/context) always precedes Solution Intelligence (/intelligence) in any flow or navigation
- **Premium gating:** Expert Review (/review) and expert sign-off on the procurement package are premium only — show a locked/upgrade state for standard tier
- **Support Preview CTA:** Always reads "Set up Support Studio →" — never "Get started" or generic variants
- **Regulatory context:** Always show which frameworks apply alongside any score, finding, or remediation task
- **Architecture diagram:** Always shown as auto-generated with an "expert validated" badge in premium tier
- **Priority labels:** Always P0/P1/P2 — never Critical/High/Medium or other variants
- **Vibe-coder language:** Plain language first, framework jargon secondary. Business impact before technical detail on all findings
- **Navigation:** "+" button on LAUNCH STUDIO section header navigates to /context to start a new evaluation. No standalone "New Blueprint" CTA button
- **Enterprise Context language:** Always use "receiving organisation" — never "buyer" — to remain persona-neutral across Software Vendors, SIs, and Enterprises

---

## Requirements

### Product goals

| # | Goal | Why |
|---|------|-----|
| G1 | Completed evaluation in under 4 hours (well-documented project) | Speed is core — builders abandon slow processes |
| G2 | Every finding is actionable | A score without remediation is useless |
| G3 | Procurement package trusted by buyers without explanation | If CISO needs builder to explain it, it has failed |
| G4 | Builders improve score by 15+ points after remediation | Proves product drives real change |
| G5 | 40%+ of completions activate Support Studio | Core commercial handoff metric |
| G6 | Works for vibe-coded projects with no existing documentation | Wrong audience if it only works for clean codebases |

---

### Non-goals

| # | Not in scope | Why |
|---|-------------|-----|
| N1 | Automated remediation execution | Different product, different liability |
| N2 | Formal legal certification | Requires accredited bodies |
| N3 | Real-time regulatory monitoring | Support Studio |
| N4 | Multi-user collaboration in v1 | Nail single-user first |
| N5 | External certification body integration in v1 | Partnership dependency |
| N6 | Building or modifying the AI solution | Evaluates, does not build |

---

### User stories (condensed)

Full acceptance criteria available on request. Each story shows intent and done-when condition.

#### Epic 0 — Enterprise Context

**US-01** · P0 · SI delivery engineer
Upload client IT ops runbooks and security policy so evaluation runs against actual internal standards.
*Done when:* Detected standards appear alongside external frameworks in evaluation results.

**US-02** · P0 · Enterprise innovation engineer
See which internal company requirements the solution fails so I can fix them before requesting Security/QA review.
*Done when:* Internal gaps shown separately, each citing the specific document and section.

**US-03** · P1 · IT operations engineer
Upload our IT ops runbooks and see how the deployment maps to our existing processes to assess supportability.
*Done when:* Operational readiness section explicitly mapped against uploaded runbooks with gaps surfaced.

**US-04** · P1 · SI delivery engineer
Save enterprise context profile per client for reuse across projects.
*Done when:* Saved profile selectable on new evaluation start, updates don't affect completed evaluations.

**US-05** · P1 · Startup founder
Use a structured questionnaire when receiving organisation documents aren't available.
*Done when:* Questionnaire produces equivalent profile with visible warning distinguishing it from document scanning.

#### Epic 1 — Solution Intelligence

**US-06** · P0 · Vibe-coder founder
Connect messy GitHub repo and receive a first-draft architecture diagram.
*Done when:* Diagram generated, annotatable, and included in procurement package.

**US-07** · P0 · Any builder
System classifies my app's EU AI Act risk tier before evaluation.
*Done when:* Plain-language explanation shown, rationale visible, expert can override in premium.

**US-08** · P0 · Security engineer
See exactly which regulatory frameworks were used and why.
*Done when:* Each framework shown with triggering signal, addable/removable with reason, included in package.

**US-09** · P1 · Any builder
Graph readiness score shows knowledge base completeness before full evaluation.
*Done when:* Score updates in real time, below 40% triggers warning, can proceed with warning.

#### Epic 2 — 9-Agent Evaluation

**US-10** · P0 · Any builder
See each agent's individual score and top 3 findings.
*Done when:* 9 individual scores shown, weighted composite explained, score band with plain-language meaning displayed.

**US-11** · P0 · Vibe-coder founder
All findings in plain language without framework jargon.
*Done when:* Every finding has plain-language title, business impact statement, framework reference secondary.

**US-12** · P0 · Security engineer
Security Posture and AI Governance agents check specific controls I care about.
*Done when:* Specific checks for auth, secrets, model versioning, audit logs, human override — each mapped to framework article.

**US-13** · P1 · SI delivery engineer
Compare scores across multiple client deployments.
*Done when:* Dashboard view sortable by score/band/date, drill-down available, exportable.

#### Epic 3 — Remediation

**US-14** · P0 · Any builder
Every finding includes exact remediation instruction cited to specific framework article.
*Done when:* Fix instruction, framework citation, effort estimate, and builder-level guidance present on every finding.

**US-15** · P0 · Any builder
Mark task complete with evidence — score updates immediately.
*Done when:* Evidence attachable, score recalculates on resolution, resolved items retained in gap register.

**US-16** · P0 · Any builder
P0/P1/P2 priority on all findings.
*Done when:* P0 blocks expert review trigger, default sorted by priority, filterable.

**US-17** · P1 · AIops engineer
Operational readiness findings include specific monitoring and runbook gaps.
*Done when:* Findings specify missing monitoring, runbook gaps, on-call gaps, mapped to internal runbooks from Step 0.

#### Epic 4 — Expert Review (Premium)

**US-18** · P0 (premium) · Any builder
Named expert validates AI risk classification and signs off procurement package.
*Done when:* Expert named with credentials, validates/overrides classification with rationale, validates architecture diagram, commentary on top 3 findings, reviewer name on cover page.

**US-19** · P0 (premium) · CISO receiving package
See reviewer name, credentials, methodology, and scope.
*Done when:* All on cover page plus methodology appendix plus scope statement plus what was NOT reviewed.

**US-20** · P0 (premium) · Any builder
Expert flags critical findings discovered after package shared with prospect.
*Done when:* Builder notified immediately, expert remediates with builder, re-signs updated package, receiving organisation notified of new version.

#### Epic 5 — Procurement Package

**US-21** · P0 · Any builder
Download PDF readiness report to send to procurement team.
*Done when:* Professional PDF with cover, executive summary, scores, gap register, diagrams, regulatory summary, expert sign-off (premium).

**US-22** · P0 · CISO
Data flow map showing PII movement, storage, and third-party access.
*Done when:* PII flows distinguished, third parties labelled, data residency shown, auto-generated from code analysis.

**US-23** · P1 · Legal team member
Regulatory coverage summary showing which clauses passed/failed.
*Done when:* Per-framework clause list with pass/fail/partial/N/A, failed clauses linked to gap register, exportable.

#### Epic 6 — Support Preview

**US-24** · P0 · Any builder completing Launch Studio
See top 10 failure modes specific to this deployment.
*Done when:* Failure modes specific (not generic), each shows likelihood + business impact + auto-resolvable flag, derived from evaluation findings.

**US-25** · P0 · Any builder
Compelling preview of what governed support would look like.
*Done when:* Shows support tier, automation boundaries, SLA recommendations, sample templates. Intentionally incomplete. CTA prominent and contextualised.

**US-26** · P1 · Any builder
Evaluation data auto-populates Support Studio on handoff.
*Done when:* CTA passes all context, Support Studio opens pre-populated, builder shown what carried over.

---

### Success metrics

| Metric | Target | Why |
|--------|--------|-----|
| Time to completed evaluation (well-documented) | < 4 hours | Proves practical speed |
| Time to completed evaluation (vibe-coded) | < 8 hours | Proves core audience works |
| % reaching passing band (60+) | > 55% | Proves remediation works |
| Average score improvement after remediation | +15 points | Proves real change |
| % downloading procurement package | > 70% | Proves output is useful |
| % activating Support Studio | > 40% | Core commercial handoff |
| Expert review NPS (premium) | > 50 | Proves human review adds value |
| Expert credibility from buyers (premium) | > 4/5 | Proves trusted in procurement |

---

### Open questions

| # | Question | Status |
|---|----------|--------|
| OQ-1 | Minimum graph readiness score to proceed — default warn-but-proceed, threshold TBD | Open |
| OQ-2 | Expert review turnaround time commitment for premium tier | Open |
