# Welcome to the Guardians of AI - Savano AI

## What this is

This repo is the core product codebase for SavanoAI — two studios that together govern AI apps from build to production.

**Launch Studio** handles everything before go-live: agentic assessment against enterprise IT standards, EU AI Act, ISO 42001, GDPR, ISO 27001, and the receiving organisation's own requirements. Output is a procurement package — readiness report, architecture diagram, data flow map, gap register, expert sign-off — that procurement teams can act on without explanation.
**Launch Studio** is the structured bridge between "we built it" and "enterprises will deploy it." It evaluates AI apps and agentic systems against enterprise readiness — security posture, AI governance, data privacy, infrastructure, compliance, and operational standards — mapped to the specific regulations and internal requirements of the receiving organisation. Output is a contextualised readiness score, gap report, and remediation roadmap.**Support Studio** handles everything after go-live: governed support operations running continuously. Governance blueprint per deployment, hybrid agent/human case handling, annual audit evidence assembled automatically.

## The problem

Enterprise AI apps are built in weeks. Go-live takes months. Procurement needs security reviews, compliance documentation, audit trails, and a support structure before sign-off. No standardised framework for this exists. Compliance tools certify companies, not AI apps. Support tools were built for deterministic software. This gap is unoccupied.

## Product docs

- LAUNCH_STUDIO.md — full product definition, 9-agent evaluation engine, workflows, user stories, success metrics
- SUPPORT_STUDIO.md — governed support operations, blueprint generation, audit automation
- CLAUDE.md — Claude Code instructions for building this product

## Architecture
engine/    evaluation engine and agentic assessment logic
src/       frontend (React + TypeScript + shadcn/ui)
public/    static assets

## Tech stack

- React + TypeScript + Vite
- shadcn/ui
- Bun
- Netlify

## Evaluation engine — 9 agents

| Agent | Domain | Weight |
|-------|--------|--------|
| Security Posture | AppSec, identity, secrets, auth | 18% |
| AI Governance | Model lifecycle, hallucinations, audit logging | 25% |
| Data and Privacy | PII, lineage, retention, third-party flows | 15% |
| Infrastructure and Reliability | Reliability, scalability, ops excellence | 12% |
| Integration and Dependency | APIs, MCP servers, vendor risk | 10% |
| Operational Readiness | Monitoring, runbooks, incident response | 8% |
| Compliance and Regulatory | Industry-specific regulation | 7% |
| Documentation and Knowledge | Architecture completeness | 3% |
| Support System Design | Synthesises all outputs into Support Preview | 2% |

AI Governance at 25% — AI-specific risks are the core differentiator.

## Score bands

| Score | Status |
|-------|--------|
| 80–100 | Enterprise Ready |
| 60–79 | Conditionally Ready |
| 40–59 | Requires Remediation |
| 0–39 | Not Ready |

Score always shown with context — e.g. 74/100 Conditionally Ready for GDPR + FINMA + EU AI Act.

## Regulatory frameworks

EU AI Act, ISO 42001, GDPR, ISO 27001, SOC 2, FINMA, MiFID II, HIPAA, NIST AI RMF, Microsoft WAF, AWS Well-Architected, GCP Architecture Framework

## Business model

Per app per month. Platform at 350 EUR/app/month. Managed retainer at 1500 EUR/app/month. Launch Studio charged per evaluation — standard (automated) and premium (named expert review and sign-off).

## Status

Pre-seed. Product in active development. First design partners being signed.

## Contact

hello@savanoai.com — savanoai.com — Built in Zürich
