# CLAUDE.md — SavanoAI Project Instructions

## Read this file before every session. Read the product docs when building specific features.

---

## What this project is

Two products in one React codebase:

| Product | Job | Routes |
|---------|-----|--------|
| **Launch Studio** | Helps AI builders make their app/agent enterprise-ready before deployment | /context /intelligence /readiness /review /package /preview |
| **Support Studio** | Designs and runs governed support for AI apps/agents after deployment | / /blueprints /studio /teams/cases /teams/approvals /teams/escalations /insights |

Launch Studio ends with a Support Preview teaser → user clicks "Set up Support Studio →" → Support Studio takes over.

---

## Product documents — read these when building features

- `LAUNCH_STUDIO.md` — full product definition, personas, workflow, user stories, building decisions
- `SUPPORT_STUDIO.md` — full product definition, personas, 6-stage workflow, annual audit, building decisions

**Each document has a TL;DR FOR CLAUDE block at the top — read that first.**

Each document has a **Building decisions** section — read it before writing any component for that product.

---

## Tech stack

- React 18 + Vite 5 + Tailwind v3 + TypeScript 5
- Client-side only — no backend, all data is mock/static
- No authentication

---

## Design system

| Element | Value |
|---------|-------|
| Headline font | Fraunces, serif, weight 300/400 |
| Body font | DM Sans, weight 300/400/500 |
| Label / mono font | DM Mono, weight 400/500 |
| Primary colour | amber #c47d2a |
| Primary light | #e09840 |
| Background | cream #f5f2ed |
| Ink | #1a1814 |
| Ink light | #2a2620 |
| Muted | #8a7d6e |
| Border | rgba(212,207,198,0.25) |
| Sidebar | Dark ink #1a1814 |
| Content area | Cream #f5f2ed |

Never introduce new colours. Use existing CSS tokens only. See src/index.css for full token set.

---

## Canonical demo data — never change these

| Account | Type | Product | Contact | Slack | Regulatory |
|---------|------|---------|---------|-------|-----------|
| Acme Manufacturing | ISV / Enterprise | Helio CRM Agent v3.4.2 | Sarah Chen | #acme-manufacturing | ISO 27001, WAF |
| Contoso Digital | SI / Swiss Financial Services | Finance Flow Agent v1.8.5 | Marcus Webb | #contoso-digital | GDPR, FINMA, MiFID II |

Current user persona: Sarah Chen, Support Ops Lead

---

## Workspace type rules

This is the most important UI rule in the entire codebase:

| Workspace | Language | ISV-specific | SI-specific |
|-----------|---------|-------------|------------|
| ISV | Product-centric | "Deploy to [customer]" | — |
| SI | Client-centric | — | "Save as template" + "Deploy to [client]" |

Never mix ISV and SI language on the same screen. Always check workspaceType before rendering CTAs, headings, and descriptions.

---

## Navigation structure

### Sidebar — Launch Studio section
- New Blueprint (amber CTA, prominent)
- Enterprise Context → /context
- Solution Intelligence → /intelligence
- Readiness Report → /readiness
- Expert Review → /review (premium — show locked state for standard)
- Procurement Package → /package
- Support Preview → /preview

### Sidebar — Support Studio section
- Overview → /
- Active Blueprint → /blueprints
- Blueprint Studio → /studio
- Live Cases → /teams/cases
- Approvals → /teams/approvals
- Escalations → /teams/escalations
- Insights → /insights

### Sidebar — Bottom
- Templates → /templates
- Settings → /admin

---

## Hard rules

1. Do not commit unless explicitly asked
2. Do not delete any screen or component without explicit instruction
3. Do not create new routes not listed in the navigation above without explicit instruction
4. Always use existing Tailwind classes and CSS tokens — no inline styles with hardcoded colours
5. Never change canonical demo data — account names, IDs, product names, contacts, Slack channels
6. Score display: always show with regulatory context — never a bare number
7. Re-evaluation trigger: always confirm-first — never auto-start Launch Studio evaluation
8. Blueprint sections: always 9 sections in defined order, only Approval-Required open by default
9. Priority labels: always P0/P1/P2 — never Critical/High/Medium
10. SLA colours: green > 50%, amber < 50%, red < 20% — always

---

## Naming conventions

| Old name | Correct name |
|----------|-------------|
| Account Intelligence | Solution Intelligence |
| Support Studio (generic) | Use product name in context — Launch Studio or Support Studio specifically |

---

## Before making any change

1. Check the relevant product document (LAUNCH_STUDIO.md or SUPPORT_STUDIO.md)
2. Read the Building decisions section of that document
3. Check the Screens table — does the route exist?
4. Check workspace type — ISV or SI framing needed?
5. Check canonical demo data — are you about to change something that should never change?
