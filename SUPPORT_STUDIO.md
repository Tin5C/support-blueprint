# Support Studio — Product Definition

<!--
TL;DR FOR CLAUDE — read this first, skip the rest if context is tight

1. Support Studio is where you DESIGN and RUN support for AI apps and agents after deployment — Launch Studio gives a preview, Support Studio is the full thing
2. Core workflow: 6 stages — Stage 0 (baseline existing support + import Launch Studio) → Stage 1 (define support) → Stage 2 (generate blueprint) → Stage 3 (deploy per-customer) → Stage 4 (execute in Teams) → Stage 5 (learn and improve)
3. Stage 0 is critical: evaluates the EXISTING support system (tickets, runbooks, escalation paths) BEFORE designing the new one
4. Subscription model — charged per active deployment
5. Two workspace types: ISV (master blueprint → unlimited customer deployments) and SI (engagement → reusable template)
6. ISV CTA: "Deploy to [customer]" — SI CTAs: "Save as template" + "Deploy to [client]"
7. Annual independent audit — third-party auditor (not SavanoAI), Support Studio prepares the evidence package
8. Canonical ISV demo: Acme Manufacturing / Helio CRM Agent v3.4.2 / Sarah Chen — Tier 2, ISO 27001 + WAF
9. Canonical SI demo: Contoso Digital / Finance Flow Agent v1.8.5 / Marcus Webb — Tier 3, FINMA regulated, Deloitte Switzerland
10. Routes: / /blueprints /studio /teams/cases /teams/approvals /teams/escalations /insights
-->

## Headline
**"Your app is live. Now keep it governed, trusted, and improving."**

Deploying a custom AI app or agent to an enterprise customer is not the finish line — it is the starting line. The real work begins when the app encounters real users, real edge cases, and real regulatory scrutiny in production.

**Support Studio is where you design, deploy, and run support for your AI apps and agents. Routine cases automated. Engineers pulled in only for exceptions, approvals, and high-risk situations. Support that scales with your client portfolio — not your team.**

---

## What it is

Support Studio is the operational layer of the SavanoAI platform. It takes the Support Preview from Launch Studio as a starting point — and provides the full environment to design, configure, and run a governed support operation.

**Launch Studio gives a glimpse of what support could look like. Support Studio is where you actually design and run it.**

| Phase | Product | Output |
|-------|---------|--------|
| **Evaluate** | Launch Studio | Readiness score + gap report |
| **Propose** | Support Studio | Support blueprint + SLA definition |
| **Run** | Support Studio | Automated response, escalation, client reporting |

Launch Studio output flows directly into Support Studio — no re-onboarding.

---

## The three problems it solves

**1. No defined support model for AI apps**
Custom AI apps are replacing enterprise SaaS — but nobody has defined what support for them looks like. Every deployment handled differently, from scratch. Support Studio provides a structured way to design and run support for any AI app or agent.

**2. No way to scale without growing the team**
Routine cases automated. Engineers handle only what needs human judgment. Support scales with the portfolio, not the headcount.

**3. No ongoing proof of governance**
Enterprise customers need continuous evidence the app operates within agreed boundaries — backed by an annual independent audit.

---

## Who uses it

### Primary user — the Support Ops Lead

| Persona | Context | Core need |
|---------|---------|-----------|
| Support Ops Lead (ISV) | Owns support across multiple enterprise customers | "I need to know my app is working correctly for every customer at once" |
| Support Ops Lead (SI) | Manages support for client AI app deployments | "I need to demonstrate governed, scalable support to my clients" |
| Enterprise Support Engineer | Handles escalations and complex cases | "I need full context before I intervene" |
| AIops / Platform Engineer | Responsible for AI app health in production | "I need signals before problems become incidents" |

### Secondary user — the enterprise customer
Receives compliance reports, governance evidence, and the annual audit report. Their trust depends on what Support Studio produces.

---

## Workspace types

| Type | Who | Scaling story |
|------|-----|--------------|
| ISV | Vendor running support for their own AI app | Upload once → deploy blueprint to every enterprise customer → unlimited deployments from one baseline |
| SI | Integrator running support for client deployments | Complete one engagement → save as reusable template → every future client starts from a proven baseline |

**ISV key CTA:** "Deploy to [customer]"
**SI key CTAs:** "Save as template" + "Deploy to [client]"

---

## Business model

- **Subscription** — charged per active deployment, monthly or annually
- **Tiers** based on: deployments, case volume, compliance reporting requirements
- **Annual audit** — included in premium subscription, conducted by independent third-party auditor
- **Continuous re-evaluation** — included in subscription
- **Re-evaluation** triggering new Launch Studio assessment charged at Launch Studio per-evaluation pricing

---

## The 6-stage workflow

| Stage | Name | What happens |
|-------|------|-------------|
| **0** | Baseline existing support | Evaluate current tickets, runbooks, escalation process, tooling. Import Launch Studio context. Establish what exists today |
| **1** | Define support | Upload product/solution knowledge — docs, GitHub, runbooks, API refs |
| **2** | Generate blueprint | AI proposes issue categories, failure modes, playbooks, telemetry, approval boundaries |
| **3** | Deploy per-customer template | Blueprint instantiated per client — varying by plan, compliance, environment |
| **4** | Execute in Teams | Agents handle cases; engineers see only exceptions and approvals |
| **5** | Learn and improve | Cases feed back into better templates, telemetry, documentation. Annual audit validates the operation |

---

### Stage 0 in depth — Baseline existing support

The most important and most overlooked step. The new app lands in an organisation with existing processes — Stage 0 understands those before designing anything new.

**From the existing support system:**
- Ticket history — volume, categories, resolution times, escalation rates, patterns
- Existing runbooks — what exists and how complete
- Current escalation paths — who handles what, what SLA
- Support tooling — Jira SM, ServiceNow, Zendesk
- Team structure — roles, capacity
- Known pain points — what breaks regularly, what customers complain about

**From Launch Studio (imported automatically):**
- Readiness score and gap register
- AI risk classification
- Regulatory context
- Top 10 failure modes from Agent 9
- Support Preview — automation boundaries, SLA recommendations, support tier
- Procurement package context

**Stage 0 produces:**
- Support Baseline Report — current operation: what exists, what works, what doesn't
- Gap analysis — what the current system can't handle for this deployment
- Reuse opportunities — existing runbooks and escalation paths to carry forward
- Change impact assessment — what needs to change in the existing operation
- Starting configuration for Stage 1

---

### What varies per customer in Stage 3

| Variable | Examples |
|----------|---------|
| Plan tier | Standard vs. enterprise — different SLA and automation levels |
| Compliance configuration | FINMA-regulated client gets stricter approval boundaries |
| Environment specifics | Connected systems, data residency, monitoring setup |
| Governance boundaries | One customer allows more automation than another |
| SLA commitments | Response times agreed per contract |

---

### ISV vs SI experience

| | ISV | SI |
|--|-----|----|
| Stage 0 | Import Launch Studio + customer existing support baseline | Import Launch Studio + client existing support baseline per engagement |
| Stage 1 | Upload product knowledge once — reused across all customers | Upload engagement knowledge per client |
| Stage 2 | Master blueprint → instantiated per customer | Engagement blueprint → save as template |
| Stage 3 | Configure per-customer variations | Deploy from saved template with client config |
| Stage 5 | Learnings improve master blueprint | Learnings improve template for all future clients |

---

## The annual audit

### What it is

Once a year, an independent third-party auditor reviews the entire support operation and issues a formal audit report. **SavanoAI prepares the evidence base throughout the year. The auditor conducts the review and issues certification under their own credentials.**

### Why it matters

Passing procurement is not enough. Enterprise customers — especially in regulated industries — need ongoing independent proof that:
- The AI app operates within agreed governance boundaries
- SLA commitments are being met
- Regulatory compliance is maintained as frameworks evolve
- Nothing material has changed without proper governance

### How it works

**Throughout the year — Support Studio builds the evidence base automatically:**
Every blueprint decision, version change, human oversight event, compliance report, drift event, SLA performance record, and re-evaluation is logged and structured for audit.

**At audit time — SavanoAI prepares the audit package:**
Full year case audit trail · Blueprint version history · Governance compliance summary · SLA performance report · Human oversight frequency evidence · Regulatory framework adherence · Re-evaluation reports

**The auditor conducts the review:**
Reviews evidence package · Assesses against applicable frameworks · Issues formal audit report with findings and certification status

**The audit report:**
- Issued under the auditor's own brand and credentials — not SavanoAI's
- Includes: scope, methodology, findings, certification status, conditions if any
- Available to the enterprise customer as standalone document

### Audit partners

| Context | Audit partner type |
|---------|------------------|
| General enterprise | Big 4 (PwC, KPMG, Deloitte, EY) |
| Swiss financial services | KPMG Switzerland, BDO Switzerland, Deloitte Switzerland |
| EU AI Act conformity | Specialist AI conformity assessment bodies |
| ISO 42001 certification | BSI, SGS, TÜV |
| SOC 2 | AICPA-accredited CPA firms |

Specific auditor agreed with enterprise customer during onboarding — using a firm they already recognise is more effective.

### Audit outcomes

| Result | Meaning | Action |
|--------|---------|--------|
| Certified — no conditions | Full certification | Renew as-is |
| Certified — with recommendations | Certified, improvement areas noted | Address before next audit |
| Conditional certification | Certified subject to specific fixes | Fix within agreed period |
| Not certified | Significant gaps — certification not issued | Remediation + re-audit |

---

## The core product

### Blueprint (Governance record)

Live deployed governance ruleset. Source of truth for what the app can/cannot do.

9 collapsible sections:
1. Automated Actions
2. Approval-Required Actions
3. Human-Only Actions
4. Escalation Matrix
5. Support Categories
6. Signals (telemetry)
7. Failure Modes
8. Health Indicators
9. Coverage Score (donut chart + 6 metrics)

**Blueprint drift detection:** When app acts outside boundaries → drift event created within 1 hour → accumulates into patterns in Insights.

**Blueprint updates:** Change → rationale → approval workflow → version controlled → customer notified if governance boundaries change.

---

### Teams Execution (Where support happens)

Engineers see only what needs them.

**Live Cases** — three columns: Customer channels + cases | Case thread with actions/evidence/confidence | Evidence & Governance panel

**Approvals** — what app wants to do + blueprint rule + risk + Approve/Escalate/Reject + SLA countdown

**Escalations** — severity + SLA countdown + case history + recommended owner + regulatory flags

**Agent Activity** — per-agent: cases handled, auto-resolved, escalated, confidence trends, blueprint compliance rate

---

### Insights (Learning loop)

**KPIs:** Automation Rate · Escalation Rate · Approval Wait Time · Human Workload · Blueprint Compliance Rate · CSAT

**Blueprint gap detection:** Cases with no blueprint rule, ranked by frequency and manual effort cost.

**Runbook improvement suggestions:** Same pattern 3+ times with same resolution → suggest adding to runbook.

**Re-evaluation triggers:** Compliance below threshold · Regulatory change · Major codebase change · Quarterly review · Contract renewal · Annual audit finding

---

### Overview (Control panel)

KPI summary · Exception management · Customer Health ranking · Recent Activity · **Audit Status (next date, last result per deployment)**

---

## Compliance and regulatory continuity

- Audit trail — every decision logged
- Human oversight evidence — EU AI Act high-risk requirement
- Compliance reports — periodic, exportable PDF
- Data handling log — GDPR per case
- Regulatory watch — framework change monitoring
- **Annual audit package — full year evidence bundle prepared automatically**

**DACH-specific:** FINMA compliance evidence and Swiss data residency documentation are first-class outputs.

---

## The feedback loop back to Launch Studio

| Support Studio signal | Launch Studio action |
|----------------------|---------------------|
| Blueprint compliance below threshold | Re-evaluation (builder confirms first) |
| New failure mode discovered | Re-evaluation recommended |
| Regulatory framework updated | Re-evaluation with new context |
| App confidence scores declining | Agent evaluation re-run |
| Blueprint gap repeated | Blueprint update recommended |
| Annual audit finding — material gap | Re-evaluation required before next deployment |

---

## Key concepts

| Term | Definition |
|------|-----------|
| Support Baseline | Structured view of existing support operation — produced in Stage 0 |
| Active Blueprint | Live deployed governance ruleset for a specific customer |
| Blueprint drift | App acting outside blueprint boundaries — early warning |
| Blueprint gap | Case type the blueprint has no rule for |
| Per-customer template | Blueprint instantiated per client with specific configuration |
| Master blueprint (ISV) | ISV product-level blueprint — instantiated per customer |
| Engagement template (SI) | SI reusable blueprint from a completed engagement |
| Coverage score | Composite score measuring blueprint completeness |
| Annual audit | Independent third-party review — issued under auditor credentials, not SavanoAI's |
| Re-evaluation trigger | Condition initiating new Launch Studio assessment — confirm-first |
| Support Preview | What Launch Studio provides — a glimpse. Full design is in Support Studio |

---

## What Support Studio is NOT

- Not a generic helpdesk — governs AI apps, does not replace Zendesk/Intercom
- Not a monitoring platform — consumes signals, does not replace Datadog/PagerDuty
- Not a one-time assessment — ongoing operational layer
- Not a code deployment tool — governs, does not deploy
- Not a customer-facing portal — builder-facing control plane
- Not the audit body — SavanoAI prepares evidence, independent auditor certifies

---

## Canonical demo accounts

| Account | Type | Deployment | Tier | Audit | Contact |
|---------|------|-----------|------|-------|---------|
| Acme Manufacturing | ISV / Enterprise | Helio CRM Agent v3.4.2 | Tier 2 | ISO 27001 + WAF — KPMG | Sarah Chen |
| Contoso Digital | SI / Swiss Financial Services | Finance Flow Agent v1.8.5 | Tier 3 (FINMA) | FINMA + GDPR — Deloitte CH | Marcus Webb |

---

## Screens

| Screen | Route | Purpose |
|--------|-------|---------|
| Overview | / | Dashboard — KPIs, exceptions, health, audit status |
| Active Blueprint | /blueprints | Live governance record |
| Blueprint Studio | /studio | Stage 2 — generate blueprint |
| Live Cases | /teams/cases | Stage 4 — case execution |
| Approvals | /teams/approvals | Human-in-the-loop queue |
| Escalations | /teams/escalations | Active escalations + SLA |
| Insights | /insights | Stage 5 — learning loop |

---

## Building decisions (for Claude Code)

When building Support Studio screens, apply these rules without being asked:

- **Stage 0 always first:** Stage 0 baseline always precedes Stage 1 in any flow or onboarding sequence
- **Workspace type framing:** ISV = product-centric language + "Deploy to [customer]" CTA. SI = client-centric language + "Save as template" + "Deploy to [client]" CTAs. Never mix the two
- **Blueprint sections:** Always 9 sections in the defined order. Only Approval-Required open by default. "Expand all / Collapse all" toggle always present
- **Score display:** Coverage score always shown as a donut chart with 6 metrics — never as a plain number
- **SLA countdowns:** Always colour-coded: green > 50% remaining, amber < 50%, red < 20%
- **Audit status:** Always visible on the Overview dashboard — next date, last result, certificate expiry
- **Annual audit package:** Never requires manual evidence gathering — always auto-assembled
- **Re-evaluation trigger:** Always confirm-first — never auto-start a Launch Studio evaluation without builder confirmation
- **Blueprint drift:** Always shown as a drift event within 1 hour — never silent
- **Regulatory flags:** Always shown on cases with compliance implications — never hidden
- **Human oversight log:** Always exportable as a compliance artifact — not just viewable
- **Route guard:** Never create a route not listed in the Screens table above without explicit instruction

---

## Requirements

### Product goals

| # | Goal | Why |
|---|------|-----|
| G1 | Stage 0 baseline complete in under 2 hours | Slow Stage 0 blocks the whole workflow |
| G2 | Full case context in under 60 seconds | Context speed determines resolution speed |
| G3 | Blueprint drift detected within 1 hour | Early detection prevents incidents |
| G4 | 90%+ of approval decisions within SLA | Approval bottlenecks are the most common failure |
| G5 | ISV deploys master blueprint to new customer in under 30 minutes | Proves ISV scaling story |
| G6 | SI deploys from saved template to new client in under 1 hour | Proves SI scaling story |
| G7 | Compliance evidence accessible on demand without involving builder | Reduces overhead, builds trust |
| G8 | Annual audit package prepared automatically — no manual gathering | If manual work is needed the product has failed |
| G9 | Zero audit findings from missing evidence or documentation gaps | Support Studio's job is to make the auditor's job easy |

---

### Non-goals

| # | Not in scope | Why |
|---|-------------|-----|
| N1 | Replacing human support entirely | Human-in-the-loop is a design principle |
| N2 | Building or modifying the AI app | Governs, does not build |
| N3 | Customer-facing support portal | Separate product |
| N4 | Full ITSM replacement | Integrates with, does not replace |
| N5 | Conducting the audit | SavanoAI prepares evidence, auditor certifies |
| N6 | Real-time regulatory monitoring service | Signal-based, not legal monitoring |

---

### User stories (condensed)

#### Epic 0 — Stage 0: Baseline existing support

**US-01** · P0 · Support Ops Lead
Connect existing ticketing system so current ticket patterns establish a baseline before blueprint design.
*Done when:* Support Baseline Report produced showing volume, categories, resolution times, patterns.

**US-02** · P0 · Support Ops Lead
Upload existing runbooks and escalation procedures to identify what can be reused.
*Done when:* Reuse opportunities surfaced clearly before Stage 1 begins.

**US-03** · P0 · Support Ops Lead
Launch Studio context imported automatically on activation.
*Done when:* All Launch Studio outputs visible in Stage 0, clearly labelled by source.

**US-04** · P1 · Support Ops Lead
Change impact assessment showing what needs to change in existing support operation.
*Done when:* Actionable items covering process, tooling, and capacity — feeds into Stage 1.

#### Epic 1 — Stage 1: Define support

**US-05** · P0 · ISV Support Ops Lead
Upload product knowledge once and have it reused across all customer deployments.
*Done when:* Updates to master propagate to all active deployments, per-customer additions don't affect master.

**US-06** · P0 · SI Support Ops Lead
Upload client-specific knowledge per engagement, clearly separated from any template.
*Done when:* Client knowledge clearly separated, reusable at template level if client type recurs.

#### Epic 2 — Stage 2: Generate blueprint

**US-07** · P0 · Support Ops Lead
Blueprint generated from both Stage 0 baseline and Stage 1 product knowledge.
*Done when:* Blueprint shows source of each section (Stage 0 vs Stage 1 vs Launch Studio).

**US-08** · P0 · Support Ops Lead
Review and edit every section before deploying. Deployment is deliberate, not automatic.
*Done when:* Every section editable, changes tracked, first deployed version saved as v1.0.

#### Epic 3 — Stage 3: Deploy per-customer template

**US-09** · P0 · ISV Support Ops Lead
Deploy master blueprint to new customer by configuring only what varies, in under 30 minutes.
*Done when:* Only variable fields presented, non-variable inherited, v1.0 saved on activation.

**US-10** · P0 · SI Support Ops Lead
Save completed engagement blueprint as reusable template with sector tag.
*Done when:* Template independently versioned from deployment, new client initiable from template.

#### Epic 4 — Stage 4: Execute in Teams

**US-11** · P0 · Support Ops Lead
Full decision trail for any case — action, rule, confidence, evidence.
*Done when:* Every action shows blueprint rule referenced, confidence score, evidence, regulatory flags.

**US-12** · P0 · Enterprise support engineer
Cases needing human intervention in queue with full context assembled.
*Done when:* Summary + actions + recommendation + SLA countdown in one view, decision logged.

**US-13** · P0 · Support Ops Lead
SLA countdowns on all escalations, alert at amber.
*Done when:* Green/amber/red colour coding, amber alert triggered, breach logged in Insights.

#### Epic 5 — Stage 5: Learn and improve

**US-14** · P0 · Support Ops Lead
Blueprint gaps ranked by manual work caused.
*Done when:* Gaps ranked by frequency and effort cost, one-click to initiate blueprint update.

**US-15** · P0 · Support Ops Lead
Runbook improvement suggestions when same escalation pattern occurs 3+ times.
*Done when:* Accept triggers blueprint update, decline archived with reason.

**US-16** · P1 · Support Ops Lead
Re-evaluation triggered when compliance drops — with my confirmation first.
*Done when:* Confirm-first flow, pre-loaded with current state, threshold configurable.

#### Epic 6 — Annual audit

**US-17** · P0 · Support Ops Lead
Annual audit evidence package prepared automatically.
*Done when:* Full year evidence assembled automatically, exportable in auditor-ready format, no manual gathering required.

**US-18** · P0 · Support Ops Lead
Track audit status — scheduled date, auditor, status, last result.
*Done when:* Audit status on Overview dashboard, reminder 60 days before, certificate expiry shown.

**US-19** · P0 · Enterprise customer compliance team
Receive annual audit report directly from auditor.
*Done when:* Report issued under auditor's credentials, delivered directly to customer, referenced in contract renewal.

**US-20** · P1 · Support Ops Lead
Audit findings trigger appropriate remediation workflow automatically.
*Done when:* Each finding categorised and correct workflow triggered, finding stays open until remediation evidenced.

#### Epic 7 — Compliance continuity

**US-21** · P0 · Enterprise customer compliance team
Compliance report for any time period, exportable as PDF.
*Done when:* Configurable period, covers all required dimensions, references specific frameworks, exports cleanly.

**US-22** · P0 · Support Ops Lead (FINMA deployment)
Every human oversight event logged in full, exportable as compliance artifact.
*Done when:* Complete log exportable, low frequency flagged as compliance risk.

---

### Success metrics

| Metric | Target | Why |
|--------|--------|-----|
| Stage 0 baseline time | < 2 hours | Slow Stage 0 blocks everything |
| Time to full case context | < 60 seconds | Context speed = resolution speed |
| Blueprint drift detection | < 1 hour | Early detection prevents incidents |
| Approvals within SLA | > 90% | Most common failure point |
| Blueprint gaps → accepted suggestions | > 50% | Proves learning loop works |
| Automation rate improvement, 90 days | +10pp | Proves system improves |
| ISV new customer deployment | < 30 min | Proves ISV scaling story |
| SI new client from template | < 1 hour | Proves SI scaling story |
| Audit package prep time | < 2 hours | Proves evidence is automated |
| Audits resulting in clean certification | > 80% | Proves enterprise standards maintained |
| Compliance report satisfaction | > 4/5 | Proves trust built |

---

### Open questions

| # | Question | Status |
|---|----------|--------|
| OQ-1 | Annual audit — premium only or all tiers? | Open — commercial |
| OQ-2 | Enterprise customer read-only access vs exported reports only? | Open — UX implication |
| OQ-3 | Audit trail retention for FINMA/MiFID II (7+ years)? | Open — legal |
| OQ-4 | Who selects the auditor — SavanoAI, builder, or enterprise customer? Recommend: customer selects from approved partner list | Open — commercial |
