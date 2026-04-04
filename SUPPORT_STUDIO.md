# Support Studio — Product Definition

## Headline
**"Your app is live. Now keep it governed, trusted, and improving."**

Deploying a custom AI app or agent to an enterprise customer is not the finish line — it is the starting line. The real work begins when the app encounters real users, real edge cases, and real regulatory scrutiny in production.

**Support Studio is where you design, deploy, and run support for your AI apps and agents. Routine cases automated. Engineers pulled in only for exceptions, approvals, and high-risk situations. Support that scales with your client portfolio — not your team.**

---

## What it is

Support Studio is the operational layer of the SavanoAI platform. It takes the Support Preview from Launch Studio as a starting point — and provides the full environment to design, configure, and run a governed support operation.

The distinction is important: **Launch Studio gives a glimpse of what support could look like. Support Studio is where you actually design and run it.**

It covers the **Propose** and **Run** phases of the SavanoAI three-phase workflow:

| Phase | Product | Output |
|-------|---------|--------|
| **Evaluate** | Launch Studio | Readiness score + gap report |
| **Propose** | Support Studio | Support blueprint + SLA definition |
| **Run** | Support Studio | Automated response, escalation, client reporting |

Launch Studio output flows directly into Support Studio — no re-onboarding.

---

## The three problems it solves

**1. No defined support model for AI apps**
Custom AI apps are replacing enterprise SaaS — but nobody has defined what support for them looks like. Every deployment is handled differently, from scratch. Support Studio provides a structured way to design and run support for any AI app or agent.

**2. No way to scale without growing the team**
As client portfolios grow, support load grows linearly. Support Studio breaks this — routine cases automated, engineers handle only what needs human judgment. Support scales with the portfolio, not the headcount.

**3. No ongoing proof of governance**
Enterprise customers — especially in regulated industries — need continuous evidence that the app is operating within agreed boundaries. Support Studio maintains this evidence automatically, and backs it with an annual independent audit.

---

## Who uses it

### Primary user — the Support Ops Lead

| Persona | Context | Core need |
|---------|---------|-----------|
| Support Ops Lead (ISV) | Owns support for their AI app across multiple enterprise customers | "I need to know my app is working correctly for every customer at once" |
| Support Ops Lead (SI) | Manages support delivery for client AI app deployments | "I need to demonstrate governed, scalable support to my clients" |
| Enterprise Support Engineer | Handles escalations and complex cases | "I need full context on what happened before I intervene" |
| AIops / Platform Engineer | Responsible for AI app health in production | "I need signals before problems become incidents" |

### Secondary user — the enterprise customer
The enterprise customer's support manager or IT operations team. They receive Support Studio's compliance reports, governance evidence, and the annual audit report. Their trust in the deployment depends on what Support Studio produces — particularly in regulated industries where independent audit evidence is required.

---

## Workspace types

| Type | Who | Scaling story |
|------|-----|--------------|
| ISV | Vendor running support for their own AI app | Upload product knowledge once → deploy blueprint to every enterprise customer → unlimited deployments from one baseline |
| SI | Integrator running support for client AI app deployments | Complete one engagement → save as reusable template → every future client in the same sector starts from a proven baseline |

**ISV key CTA:** "Deploy to [customer]"
**SI key CTAs:** "Save as template" + "Deploy to [client]"

---

## Business model

- **Subscription** — charged per active deployment, recurring monthly or annually
- **Tiers** based on: number of active deployments, case volume, compliance reporting requirements
- **Annual audit** — included in premium subscription tier, conducted by an independent third-party auditor
- **Continuous re-evaluation** — included in subscription
- **Re-evaluation** triggering a new Launch Studio assessment charged at Launch Studio per-evaluation pricing

---

## The 6-stage workflow

| Stage | Name | What happens |
|-------|------|-------------|
| **0** | Baseline existing support | Evaluate current support system — tickets, runbooks, escalation process, tooling, team structure. Import Launch Studio context. Establish what exists today before designing what is needed |
| **1** | Define support | Upload product/solution knowledge — docs, GitHub, runbooks, API refs. Complement with what was found in Stage 0 |
| **2** | Generate blueprint | AI proposes issue categories, failure modes, playbooks, telemetry, approval boundaries — grounded in both the existing support baseline and the new deployment's needs |
| **3** | Deploy per-customer template | Blueprint instantiated per client — varying by plan, compliance configuration, environment specifics |
| **4** | Execute in Teams | Agents handle cases; engineers see only exceptions and approvals |
| **5** | Learn and improve | Cases feed back into better templates, telemetry, documentation. Annual audit validates the entire operation |

---

### Stage 0 in depth — Baseline existing support

Before designing support for a new AI app, Support Studio establishes what the existing support operation looks like. The new app does not land in a vacuum — it lands in an organisation that already has support processes, tools, and habits.

**What Stage 0 collects and analyses:**

*From the existing support system:*
- Ticket history — volume, categories, resolution times, escalation rates, recurring patterns
- Existing runbooks — what procedures already exist and how complete they are
- Current escalation paths — who handles what, at what tier, with what SLA
- Support tooling in use — Jira Service Management, ServiceNow, Zendesk, etc.
- Team structure — who is on support, what their roles are, what their capacity is
- Known pain points — what breaks regularly, what takes the most time, what customers complain about most

*From Launch Studio (imported automatically):*
- Readiness score and gap register
- AI risk classification
- Regulatory context
- Top 10 failure modes from Agent 9
- Support Preview — automation boundaries, SLA recommendations, support tier classification
- Procurement package context

**What Stage 0 produces:**
- **Support Baseline Report** — structured view of the current operation: what exists, what works, what does not
- **Gap analysis** — what the current system cannot handle for this new AI app deployment
- **Reuse opportunities** — existing runbooks, escalation paths, and tooling that can be carried forward
- **Change impact assessment** — what will need to change in the existing support operation
- **Starting configuration for Stage 1** — Stage 0 feeds directly into blueprint design

---

### What varies per customer in Stage 3

| Variable | Examples |
|----------|---------|
| Plan tier | Standard vs. enterprise — different SLA commitments and automation levels |
| Compliance configuration | FINMA-regulated client gets stricter approval boundaries |
| Environment specifics | Customer's connected systems, data residency, monitoring setup |
| Governance boundaries | One customer allows more automation than another based on risk appetite |
| SLA commitments | Response times and escalation paths agreed per contract |

---

### ISV vs SI experience

| | ISV | SI |
|--|-----|----|
| Stage 0 | Import Launch Studio context + customer's existing support baseline | Import Launch Studio context + client's existing support baseline per engagement |
| Stage 1 | Upload product knowledge once — reused across all customers | Upload engagement knowledge per client |
| Stage 2 output | Master blueprint → instantiated per customer | Engagement blueprint → save as template |
| Stage 3 | Configure per-customer variations | Deploy from saved template with client-specific config |
| Stage 4 | Same execution layer | Same execution layer |
| Stage 5 | Learnings improve the master blueprint | Learnings improve the template for all future clients |
| Key CTA | "Deploy to [customer]" | "Save as template" + "Deploy to [client]" |
| Scaling story | One upload → unlimited customer blueprints | One engagement → reusable template |

---

## The annual audit

### What it is

Once a year, an independent third-party auditor reviews the entire support operation for a deployment and issues a formal audit report. This is not a SavanoAI internal review — it is conducted by an established, recognised auditor whose sign-off carries weight in enterprise procurement and regulatory contexts.

Support Studio's role is to prepare and maintain the evidence base throughout the year so that the audit is as efficient as possible. The auditor does the formal review and issues the certification.

### Why it matters

Passing an initial enterprise procurement process is not enough for long-term enterprise relationships. Enterprise customers — especially in regulated industries — need ongoing, independent proof that:
- The AI app is still operating within its agreed governance boundaries
- The support operation is still meeting its SLA commitments
- Regulatory compliance has been maintained as frameworks evolve
- Nothing material has changed without proper governance

An annual audit from a recognised third party provides this proof in a form that holds up to board-level scrutiny, regulatory review, and contract renewal negotiations.

### How it works

**Throughout the year — Support Studio builds the evidence base:**
- Every blueprint decision logged with rationale and approvals
- Every version change recorded with impact assessment
- All human oversight events captured
- Compliance reports generated automatically
- Drift events and resolutions documented
- SLA performance tracked and reported
- Re-evaluation history maintained

**At audit time — SavanoAI prepares the audit package:**
- Full year of case audit trail
- Blueprint version history with all changes
- Governance compliance summary
- SLA performance report
- Human oversight frequency evidence
- Regulatory framework adherence record
- Any re-evaluation reports from the year

**The auditor conducts the review:**
- Reviews the evidence package
- Assesses against the applicable frameworks (GDPR, FINMA, EU AI Act, ISO 42001, etc.)
- Interviews key personnel if required
- Issues a formal audit report with findings and certification status

**The audit report:**
- Issued under the auditor's own brand and credentials — not SavanoAI's
- Includes: scope, methodology, findings, certification status, any conditions or recommendations
- Available to the enterprise customer as a standalone document
- Referenced in the annual contract renewal process

### Audit partners

SavanoAI works with established audit and assurance firms appropriate to the deployment context:

| Context | Audit partner type |
|---------|------------------|
| General enterprise | Big 4 assurance firms (PwC, KPMG, Deloitte, EY) |
| Swiss financial services | KPMG Switzerland, BDO Switzerland, Deloitte Switzerland |
| EU AI Act conformity | Specialist AI conformity assessment bodies |
| ISO 42001 certification | Accredited ISO certification bodies (BSI, SGS, TÜV) |
| SOC 2 | AICPA-accredited CPA firms |

The specific auditor is agreed with the enterprise customer during onboarding — using a firm they already recognise and trust is more effective than imposing an unknown one.

### What the audit covers

| Domain | What is assessed |
|--------|-----------------|
| Blueprint governance | Are the governance rules appropriate, consistently applied, and properly versioned? |
| Human oversight | Is human-in-the-loop happening at the right frequency and with proper documentation? |
| SLA performance | Has the deployment met its committed SLA levels over the audit period? |
| Regulatory compliance | Has the deployment remained compliant with applicable frameworks throughout the year? |
| Security posture | Has the security baseline been maintained — no regressions from the Launch Studio assessment? |
| Operational readiness | Are runbooks current, incidents properly managed, escalations properly handled? |
| Learning loop | Has the support operation improved over the year — are blueprint gaps being addressed? |
| Data handling | Is data being processed, retained, and deleted in accordance with GDPR/FINMA requirements? |

### Outcome

| Audit result | Meaning | Action |
|-------------|---------|--------|
| Certified — no conditions | Full certification for the audit period | Renew as-is |
| Certified — with recommendations | Certified but improvement areas identified | Address recommendations before next audit |
| Conditional certification | Certification granted subject to specific fixes within a defined timeframe | Fix conditions within agreed period |
| Not certified | Significant gaps found — certification not issued | Remediation required, re-audit scheduled |

---

## The core product

### Blueprint (Governance record)

The live deployed version of the governed blueprint for a specific customer. Source of truth for what the app is and is not allowed to do.

**Active Blueprint shows:**
- Governance summary — Automated / Approval-Required / Human-Only split with live counts
- 9 collapsible sections:
  1. Automated Actions
  2. Approval-Required Actions
  3. Human-Only Actions
  4. Escalation Matrix
  5. Support Categories
  6. Signals (telemetry)
  7. Failure Modes
  8. Health Indicators
  9. Coverage Score (donut chart + 6 metrics)
- Version history — every change with rationale
- Live execution status

**Blueprint drift detection:**
When the app acts outside its defined boundaries, a drift event is created within 1 hour. Drift events accumulate into patterns surfaced in Insights.

**Blueprint updates:**
Change → rationale → approval workflow → version controlled deployment → customer notification if governance boundaries change.

---

### Teams Execution (Where support happens)

The operational interface. Engineers see only what needs them.

**Live Cases** — three-column layout:
- Left: Customer channels + active case list
- Centre: Full case thread with app actions, evidence, confidence scores, decision trail
- Right: Evidence and Governance panel — blueprint context, justification, approval actions

**Approvals** — cases requiring human sign-off:
- What the app wants to do and why
- Blueprint rule triggering the requirement
- Risk assessment
- Approve / Escalate / Reject with reason + SLA countdown

**Escalations** — cases beyond app capability:
- Severity and SLA countdown
- Full case history
- Recommended owner
- Regulatory flags if compliance implications exist

**Agent Activity** — per-agent performance:
- Cases handled, auto-resolved, escalated
- Confidence score trends
- Blueprint compliance rate

---

### Insights (Learning loop)

**KPIs:**
- Automation Rate
- Escalation Rate
- Approval Wait Time
- Human Workload trend
- Blueprint Compliance Rate
- CSAT

**Blueprint gap detection:**
Cases where the blueprint had no clear rule. Each gap ranked by frequency and manual effort cost.

**Runbook improvement suggestions:**
When the same escalation pattern occurs 3+ times with the same resolution → suggestion to add it to the runbook → turns manual pattern into automated one.

**Re-evaluation triggers:**
- Blueprint compliance drops below threshold
- Regulatory framework updated
- Major codebase change detected via GitHub
- Scheduled quarterly review
- Customer contract renewal
- Annual audit finding requiring remediation

---

### Overview (Control panel)

Dashboard across all active deployments.

- KPI summary: Automation Rate, Pending Approvals, Active Escalations, At-Risk Customers, Avg Resolution Time
- Exception management: Approvals needing attention, Escalations with SLA status, System Status
- Customer Health: All deployments ranked by health score
- Recent Activity: Live feed of significant events across all deployments
- Audit Status: Next audit date, last audit result per deployment

---

## Compliance and regulatory continuity

Support Studio maintains ongoing compliance evidence automatically — the foundation of the annual audit:

- **Audit trail** — every app decision logged with blueprint reference
- **Human oversight evidence** — required for EU AI Act high-risk deployments
- **Compliance reports** — periodic reports on app behaviour against regulatory requirements
- **Data handling log** — GDPR-compliant processing evidence per case
- **Regulatory watch** — monitoring for changes to applicable frameworks
- **Annual audit package** — full year evidence bundle prepared automatically for the auditor

**DACH-specific:** FINMA compliance evidence and Swiss data residency documentation are first-class outputs for Swiss financial services deployments. Annual audits for FINMA-regulated deployments use Swiss-based assurance firms.

---

## The feedback loop back to Launch Studio

| Support Studio signal | Launch Studio action |
|----------------------|---------------------|
| Blueprint compliance drops below threshold | Re-evaluation triggered (builder confirms first) |
| New failure mode not in original blueprint | Re-evaluation recommended |
| Regulatory framework updated | Re-evaluation with new context |
| App confidence scores declining | Agent evaluation re-run |
| Blueprint gap detected repeatedly | Blueprint update recommended |
| Annual audit finding — material gap | Re-evaluation required before next deployment |

---

## Key concepts

| Term | Definition |
|------|-----------|
| Support Baseline | Structured view of the existing support operation — produced in Stage 0 before blueprint design begins |
| Active Blueprint | Live deployed governance ruleset for a specific customer deployment |
| Blueprint drift | App acting outside blueprint boundaries — early warning signal |
| Blueprint gap | Case type the blueprint has no rule for — surfaces in Insights |
| Per-customer template | Blueprint instantiated per client with client-specific configuration |
| Master blueprint (ISV) | ISV product-level blueprint — instantiated for each customer |
| Engagement template (SI) | SI reusable blueprint saved from a completed engagement |
| Coverage score | Composite score measuring how completely the blueprint covers support needs |
| Annual audit | Independent third-party review of the entire support operation — issued under the auditor's credentials, not SavanoAI's |
| Re-evaluation trigger | Condition initiating a new Launch Studio assessment — confirm-first |
| Compliance continuity | Ongoing regulatory evidence maintained across the full deployment lifetime |
| Support Preview | What Launch Studio provides — a glimpse. Full design and operation is in Support Studio |

---

## What Support Studio is NOT

- Not a generic helpdesk — it governs AI apps and agents, it does not replace Zendesk or Intercom
- Not a monitoring platform — it consumes monitoring signals, it does not replace Datadog or PagerDuty
- Not a one-time assessment — it is the ongoing operational layer
- Not a code deployment tool — it governs deployed apps, it does not deploy them
- Not a customer-facing support portal — this is the builder-facing control plane
- Not the audit body — SavanoAI prepares the evidence, the independent auditor conducts the review and issues certification

---

## Canonical demo accounts

| Account | Type | Deployment | Support Tier | Audit context | Contact |
|---------|------|-----------|-------------|--------------|---------|
| Acme Manufacturing | ISV / Enterprise | Helio CRM Agent v3.4.2 | Tier 2 | ISO 27001 + WAF — KPMG | Sarah Chen |
| Contoso Digital | SI / Swiss Financial Services | Finance Flow Agent v1.8.5 | Tier 3 (FINMA regulated) | FINMA + GDPR — Deloitte Switzerland | Marcus Webb |

---

## Screens

| Screen | Route | Purpose |
|--------|-------|---------|
| Overview | / | Dashboard — KPIs, exceptions, customer health, audit status |
| Active Blueprint | /blueprints | Live governance record — view and update |
| Blueprint Studio | /studio | Stage 2 — propose and generate blueprint |
| Live Cases | /teams/cases | Stage 4 — day-to-day case execution |
| Approvals | /teams/approvals | Human-in-the-loop approval queue |
| Escalations | /teams/escalations | Active escalations with SLA tracking |
| Insights | /insights | Stage 5 — learning loop |

---

## Requirements

### Product goals

| # | Goal | Why it matters |
|---|------|---------------|
| G1 | Stage 0 baseline complete in under 2 hours | If Stage 0 is slow the whole workflow is slow |
| G2 | Full case context in under 60 seconds | Context speed determines resolution speed |
| G3 | Blueprint drift detected within 1 hour | Early detection prevents incidents |
| G4 | Approval decisions within SLA in > 90% of cases | Approval bottlenecks are the most common failure |
| G5 | ISV deploys master blueprint to new customer in under 30 minutes | Proves the ISV scaling story |
| G6 | SI saves engagement blueprint as template and deploys to new client in under 1 hour | Proves the SI scaling story |
| G7 | Enterprise customers access compliance evidence on demand without involving the builder | Reduces overhead, builds trust |
| G8 | Annual audit package prepared automatically with no manual evidence gathering | If audit prep requires significant manual work, the product has failed |
| G9 | Zero audit findings related to missing evidence or documentation gaps | Support Studio's job is to make the auditor's job easy |

---

### Non-goals

| # | Not in scope | Why |
|---|-------------|-----|
| N1 | Replacing human support entirely | Human-in-the-loop is a design principle, not a failure state |
| N2 | Building or modifying the AI app | Support Studio governs, it does not build |
| N3 | Customer-facing support portal | Separate product |
| N4 | Full ITSM replacement | Integrates with ServiceNow and Jira, does not replace them |
| N5 | Conducting the audit | SavanoAI prepares evidence, the independent auditor certifies |
| N6 | Real-time regulatory monitoring service | Signal-based, not a legal monitoring service |

---

### User stories

Priority: **P0** = must have · **P1** = should have · **P2** = nice to have

---

#### Epic 0 — Stage 0: Baseline existing support

**US-01** · P0
As a Support Ops Lead, I want to connect my existing support ticketing system so that Support Studio can analyse current ticket patterns and establish a baseline before blueprint design begins.

*Acceptance criteria:*
- Connects to Jira Service Management, ServiceNow, Zendesk
- Analyses ticket history: volume, categories, resolution times, escalation rates, recurring patterns
- Produces a Support Baseline Report
- Baseline Report visible before Stage 1 begins

---

**US-02** · P0
As a Support Ops Lead, I want to upload my existing runbooks and escalation procedures so that Stage 0 can identify what can be reused versus what needs to be built from scratch.

*Acceptance criteria:*
- Existing runbooks uploaded and analysed
- System identifies: relevant runbooks, completeness gaps, reuse opportunities
- Reuse opportunities surfaced clearly before blueprint design begins

---

**US-03** · P0
As a Support Ops Lead, I want the Launch Studio context imported automatically so that blueprint design starts with full context.

*Acceptance criteria:*
- Launch Studio outputs imported automatically on activation
- Imported items shown clearly: what came from Launch Studio vs. existing support analysis
- Builder can review and supplement before moving to Stage 1

---

**US-04** · P1
As a Support Ops Lead, I want a change impact assessment showing what will need to change in the existing support operation.

*Acceptance criteria:*
- Covers: process changes, tooling changes, team capacity implications
- Framed as actionable items
- Feeds into Stage 1 as additional context

---

#### Epic 1 — Stage 1: Define support

**US-05** · P0
As an ISV Support Ops Lead, I want to upload product knowledge once and have it reused across all customer deployments.

*Acceptance criteria:*
- Product knowledge uploaded once at ISV level
- All new customer deployments inherit the knowledge base
- Updates to master propagate to all active deployments
- Per-customer additions possible without affecting the master

---

**US-06** · P0
As an SI Support Ops Lead, I want to upload client-specific knowledge per engagement.

*Acceptance criteria:*
- Client knowledge uploaded per engagement
- Clearly separated from any master or template knowledge
- Reusable at template level if same client type recurs

---

#### Epic 2 — Stage 2: Generate blueprint

**US-07** · P0
As a Support Ops Lead, I want the blueprint generated from both Stage 0 baseline and Stage 1 product knowledge so that it reflects operational reality.

*Acceptance criteria:*
- Blueprint generation references Stage 0 findings explicitly
- Blueprint generation references Stage 1 product knowledge
- Generated blueprint shows where each section came from

---

**US-08** · P0
As a Support Ops Lead, I want to review and edit every section before deploying.

*Acceptance criteria:*
- Every section editable before deployment
- Changes tracked with rationale
- Deployment is a deliberate confirmed action
- First deployed version saved as v1.0

---

#### Epic 3 — Stage 3: Deploy per-customer template

**US-09** · P0
As an ISV Support Ops Lead, I want to deploy my master blueprint to a new customer by configuring only what varies in under 30 minutes.

*Acceptance criteria:*
- New deployment from master blueprint
- Only variable fields presented: plan, compliance, environment, SLA
- Non-variable fields inherited
- First version saved as v1.0 on activation

---

**US-10** · P0
As an SI Support Ops Lead, I want to save a completed engagement blueprint as a reusable template.

*Acceptance criteria:*
- "Save as template" available on any active blueprint
- Template saved with sector tag and description
- New client deployment initiable from saved template
- Template and deployment versions tracked independently

---

#### Epic 4 — Stage 4: Execute in Teams

**US-11** · P0
As a Support Ops Lead, I want the full decision trail for any case so that I have complete context before intervening.

*Acceptance criteria:*
- Every app action shows: action, blueprint rule, confidence score, evidence
- Full conversation thread visible
- Time tracked against SLA
- Regulatory flags shown if compliance implications exist

---

**US-12** · P0
As an enterprise support engineer, I want cases requiring human intervention in my queue with full context assembled.

*Acceptance criteria:*
- Queue shows: case summary, app actions, recommended next action, SLA countdown
- One-click to full case thread
- Approve / Escalate / Reject with reason
- Decision logged for audit trail

---

**US-13** · P0
As a Support Ops Lead, I want SLA countdowns on all active escalations.

*Acceptance criteria:*
- SLA countdown on every escalation
- Green > 50%, amber < 50%, red < 20%
- Alert at amber
- Breach logged as incident in Insights

---

#### Epic 5 — Stage 5: Learn and improve

**US-14** · P0
As a Support Ops Lead, I want to see which blueprint gaps are causing the most manual work.

*Acceptance criteria:*
- Gaps ranked by frequency and manual effort cost
- Each gap shows: pattern, occurrence count, effort reduction if filled
- One-click to initiate blueprint update

---

**US-15** · P0
As a Support Ops Lead, I want runbook improvement suggestions based on escalation patterns.

*Acceptance criteria:*
- Suggestions when same escalation occurs 3+ times with same resolution
- Accept → triggers blueprint update workflow
- Decline → archived with reason

---

**US-16** · P1
As a Support Ops Lead, I want a re-evaluation triggered when compliance drops — with my confirmation first.

*Acceptance criteria:*
- Configurable threshold (default: < 80%)
- Confirm-first before Launch Studio evaluation starts
- Pre-loaded with current Support Studio state

---

#### Epic 6 — Annual audit

**US-17** · P0
As a Support Ops Lead, I want the annual audit evidence package prepared automatically so that I do not have to manually gather a year's worth of documentation when the audit arrives.

*Acceptance criteria:*
- Audit package assembled automatically from the year's logged data
- Covers: case audit trail, blueprint version history, governance compliance summary, SLA performance, human oversight log, regulatory adherence record, re-evaluation history
- Package exportable in auditor-ready format (PDF + structured data)
- No manual evidence gathering required

---

**US-18** · P0
As a Support Ops Lead, I want to track the status of the annual audit — scheduled date, auditor assigned, current status, last result — so that I can manage it proactively.

*Acceptance criteria:*
- Audit status visible on the Overview dashboard
- Shows: next audit date, auditor name, current status (scheduled / in progress / complete)
- Last audit result shown with certificate expiry date
- Reminder notification 60 days before next audit

---

**US-19** · P0
As an enterprise customer's compliance team, I want to receive the annual audit report directly so that I have independent third-party certification of the support operation without asking the builder for it.

*Acceptance criteria:*
- Audit report issued under the auditor's own brand and credentials
- Delivered directly to the enterprise customer on completion
- Includes: scope, methodology, findings, certification status, any conditions
- Referenced in annual contract renewal documentation

---

**US-20** · P1
As a Support Ops Lead, I want audit findings that require remediation to automatically trigger the appropriate workflow — blueprint update, re-evaluation, or runbook improvement — so that findings are actioned, not just noted.

*Acceptance criteria:*
- Each audit finding categorised: blueprint gap / re-evaluation needed / runbook gap / operational gap
- Appropriate workflow triggered per category
- Finding remains open until remediation is evidenced
- Remediation evidence included in next audit package

---

#### Epic 7 — Compliance continuity

**US-21** · P0
As an enterprise customer's compliance team, I want a compliance report for any time period showing app behaviour against regulatory requirements.

*Acceptance criteria:*
- Covers: case volumes, automation rates, human oversight events, regulatory framework adherence
- Configurable time period
- Exportable as PDF
- References specific regulatory frameworks

---

**US-22** · P0
As a Support Ops Lead managing a FINMA-regulated deployment, I want every human oversight event logged in full.

*Acceptance criteria:*
- Every approval and escalation logged: who, when, what was decided
- Exportable as compliance artifact
- Low oversight frequency flagged as potential compliance risk

---

### Success metrics

| Metric | Target | Why |
|--------|--------|-----|
| Time to complete Stage 0 baseline | < 2 hours | If Stage 0 is slow the whole workflow is slow |
| Time to full case context | < 60 seconds | Context speed determines resolution speed |
| Blueprint drift detection time | < 1 hour | Early detection prevents incidents |
| % of approval decisions within SLA | > 90% | Approval bottlenecks are the most common failure |
| % of blueprint gaps generating accepted suggestions | > 50% | Proves the learning loop works |
| Automation rate improvement over first 90 days | +10 percentage points | Proves the system improves with use |
| Time to deploy new ISV customer from master blueprint | < 30 minutes | Proves ISV scaling story |
| Time to deploy new SI client from saved template | < 1 hour | Proves SI scaling story |
| Time to prepare annual audit package | < 2 hours | Proves evidence gathering is automated |
| % of audits resulting in certification (no conditions) | > 80% | Proves the system maintains enterprise standards |
| Enterprise customer compliance report satisfaction | > 4/5 | Proves compliance builds trust |

---

### Open questions

| # | Question | Status |
|---|----------|--------|
| OQ-1 | Which subscription tier includes the annual audit — premium only or all tiers? | Open — commercial decision |
| OQ-2 | Does the enterprise customer get read-only access to their Support Studio view or exported reports only? | Open — significant UX implication |
| OQ-3 | Audit trail retention period for FINMA/MiFID II deployments (potentially 7+ years)? | Open — legal decision |
| OQ-4 | Who selects the auditor — SavanoAI, the builder, or the enterprise customer? Recommend: enterprise customer selects from SavanoAI's approved partner list | Open — commercial/operational decision |
