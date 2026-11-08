# SUTI Secure × Arcanum · message and intake architecture

**id:** `suti.security.secure-arcanum.v1`

**state:** design proposal · no private backend or protected inbox is connected

**review date:** 2026-11-08

**scope:** channel forms, consented support requests, delivery states, server options and threat review

## decision summary

Do not rent or deploy a new server yet. The observed SUTIcore Pages workflow builds a static site and publishes selected files; it has no intake API, private database, user accounts, message queue, or care-team inbox. The only identified external intake is a Russian Google Form. First complete a bounded pilot plan, name an accountable operator, and define response hours and data handling. A server is justified only when an approved staffed pilot needs one.

Keep public content and self-guided reflection static and local. If people later request human follow-up, add a separate minimal intake service in one territory. If confidential free-text messages are required, use an established, audited end-to-end encrypted (E2EE) messaging client/protocol. Do not invent a cryptographic protocol or claim that ordinary HTTPS makes a form end-to-end encrypted.

## repository reverse audit · observed facts

| surface | observed state | implication |
|---|---|---|
| `.github/workflows/pages.yml` | copies root `index.html` and selected static files into `_site`, then deploys GitHub Pages | repository workflow is a static publisher; no server-side intake is configured |
| care reflection in `index.html` | text is assembled in the browser and is not sent automatically | suitable for self-guided practice, not a request queue |
| Google Form | one Russian-language form is referenced in public source | social links must identify this language and external recipient; do not route every locale to it as if translated |
| GitHub repository | public source and release material | never place case data, keys, live participant lists, tokens or private messages in issues, commits, actions logs or artifacts |
| Secure / Arcanum | names are present as design concepts, with no verified runtime, keys, cryptographic client or monitored service | labels must not imply protection already in operation |

Audit boundary :: repository source and its workflow were inspected. DNS, GitHub Pages settings, external Google Form permissions/retention, hosting account controls, and any private operational service were not inspected and remain `UNKNOWN`.

## concepts and promises

| term | proposed meaning | cannot promise |
|---|---|---|
| **Secure** | HTTPS, constrained roles, access logging, encryption at rest, minimal fields, deletion schedule, incident response and tested recovery | that an operator, vendor, administrator, compromised device or legal process can never access data |
| **Arcanum** | optional E2EE channel for a person-selected message to a verified recipient device; keys remain with participants | anonymity, hidden metadata, recovery without keys, guaranteed delivery/read, or server-side AI analysis of plaintext |
| **delivery receipt** | a verifiable state transition emitted by the recipient client | proof that a human read, understood, agreed with, or acted on a message |

Use a distinct status sequence :: `drafted → encrypted on device → accepted by transport → delivered to recipient device → decrypted by recipient → optional acknowledgement`. Failed or unknown states remain visible. Do not compress these into “safely received in full”.

## channel adapters · one service, several doors

Each channel may change the question format, but it must not silently change the data recipient or privacy level. All channels link to a central public SUTI.world route with a language parameter and a visible current-language status.

| surface | good for | permitted intake | boundary to display |
|---|---|---|---|
| website, keyboard and screen reader | full self-guided flow | local reflection by default; future minimal request only after separate consent | what is local, what will be sent, recipient and response window |
| QR / print card | offline discovery | same public route; no personal code or tracker in QR | short human URL, language choice, print date and service status |
| Instagram / TikTok / public post | public invitation and one-click interest | platform-native non-sensitive poll or link click | platform stores engagement metadata; never invite public disclosure of needs |
| Telegram / WhatsApp / social DM | ordinary contact, if an accountable operator chooses the channel | first contact only, no sensitive case narrative; move to an approved secure route | platform and bot limitations; a bot is not an E2EE human inbox |
| offline / low-bandwidth | printed prompt, text-only page, downloadable blank form | user keeps paper/local copy; no upload by default | paper custody and destruction are the person's choice |
| email | scheduling and simple non-sensitive correspondence | minimum contact details, no case file or secrets | email is not represented as E2EE unless separately configured and verified |

Social templates are adapters, not separate databases. Keep one canonical question set and version each short form. A channel can collect `language`, `intent` (ask / offer / explore / skip), and optional consent to be contacted. Do not collect health, trauma, identity, exact location, age, free-form biography or third-party details in a public story poll.

## proposed system map

```text
static public site / QR / accessible social link
                 │
        local-only reflection (default)
                 │ person chooses to request human follow-up
                 ▼
       consent screen + minimal intake API
                 │
     rate limit · abuse controls · idempotency
                 │
      region-specific encrypted case store
                 │
         staffed queue · named operator
                 │
      verified secure conversation channel
```

Separate public documents, user-owned reflection, support requests, volunteer records, payment records and research data. The future service must not create a universal user profile or join identity across social channels. Service staff see the minimum assigned case fields; analysts receive de-identified aggregate counts only.

### Secure intake service

- host one small API in the launch territory after the service owner and region are chosen;
- accept only a short schema with `request_id`, language, request type, optional contact channel, consent version, submitted-at time and response status;
- keep detailed narrative off by default; allow a short note only with a warning and a separate consent, and only when the operator has capacity to respond;
- validate on server, escape on output, rate limit, protect against CSRF/replay, and use per-request random identifiers;
- use tenant/region separation, least-privilege roles, multi-factor authentication for staff, access audit, retention/deletion automation, and encrypted backups;
- hold secrets in a managed secret store; do not put API secrets or service-role keys in the browser, repository, QR, URL, email or logs;
- scrub request bodies and identifiers from access, analytics and exception logs; document any necessary security telemetry;
- use a queue with `open / paused / full` state. When full, reject new follow-up requests clearly and keep public self-guided pages available;
- use a tested export, correction, deletion, incident and restore process before inviting real participants.

Row-level security is defense in depth, not a complete data-protection program. A publishable browser key is not a secret; administrative keys must remain server-side. A managed database provider can encrypt disks and backups while authorized project operators still read application plaintext. For genuinely confidential text, encrypt in the client before transport and make key recovery and loss visible.

### Arcanum message transport

For small private conversations, evaluate a maintained Matrix client and homeserver or a maintained Signal-compatible client/channel rather than implementing ratchets. Before use: verify recipient identity/device, disclose federation and metadata, set room membership/history, test device changes, define key backup/recovery, and establish a moderation/abuse path. E2EE protects message content between endpoints when correctly configured; it does not hide all timing, account, IP, membership or delivery metadata. Lost keys can mean lost messages. If a recipient changes, rotate keys and re-verify.

Do not run automatic cloud summarization, classifier triage, AI analysis, or notification previews over E2EE content. A person may explicitly export selected plaintext to a local assistant; the UI must show exactly what leaves the secure channel.

## hosting and scale decision

| option | fit | cost/ops shape | decision now |
|---|---|---|---|
| current static GitHub Pages | public pages, documents, QR destinations, local-only reflection | lowest operations; no private API or database | keep for public entry |
| managed serverless API + managed database | bounded, low-volume intake when a named service is staffed | low initial operations; vendor, data region, access policies, backup, logs and plan limits still require review | evaluate for a future one-region pilot |
| managed E2EE messaging service | private person-to-person conversation with device verification | avoids building crypto; still needs account policy, room operations, metadata review and support | pilot only after channel/privacy review |
| self-hosted Matrix / VPS | control over hosting and deployment | continuous patching, monitoring, abuse handling, backups, restore drills, key support and on-call burden | do not rent until an operator and funded runbook exist |
| multi-region active-active services | service with demonstrated multi-region load and staffed support | more data-routing, replication, residency, consistency and incident complexity | explicitly defer |

Static hosting already has no request-storage cost. A server is not justified by projected viral growth alone. First measure with synthetic load; set capacity from trained staff and response times, then cap intake to the lowest of human queue capacity, tested throughput and recovery capacity. Add service only when a named owner accepts its operating duty.

## growth plan and stop controls

1. **now** :: static multilingual entry and local reflection; no collection or account.
2. **design** :: finalize data map, language coverage, service scope, safeguarding, retention, threat model, budget and owner.
3. **synthetic prototype** :: API contract and accessibility prototype using generated test data only; no DNS or production credentials.
4. **closed pilot** :: one territory, up to five adult participants, explicit opt-in, one named human coordinator, a fixed two-week window, a daily time budget and an immediate pause route. This is a proposed test size, not an open invitation or active pilot.
5. **regional service** :: only after reviewed evidence, privacy/security test, local operational review, incident simulation, support capacity and a published service status.
6. **federation** :: independent regional stores and local partners; share public schemas and aggregate learning, never pooled case files.

Each stage requires explicit `GO / HOLD / ROLLBACK` from the accountable human owner. Load or wait-time alarms pause the intake automatically; they never auto-accept cases or generate a care-priority decision.

## threat review · veche and trickster lenses

| lens | challenge | required control |
|---|---|---|
| Veche · accountable deliberation | who is affected, who decides, what evidence and dissent exist? | human decision record with support / objection / abstention / no response distinct |
| Trickster · adversarial tabletop | forged QR, form spam, stolen account, insider browsing, prompt injection, malicious volunteer, key loss | abuse cases, rate limits, device verification, least privilege, incident drill, rollback |
| Verenium · participant guidance | can a person understand, refuse, pause, export, correct and leave? | plain-language choices, no dark patterns, no role assigned by AI |
| security review | can a public endpoint expose someone else's request? | authorization checks server-side, negative tests, audit trail and independent review |
| service review | can the staffed team answer within its stated window? | published queue status, capacity cap, tested handoff and stop-intake control |

These are review perspectives and tabletop prompts. They are not autonomous agents, cryptographic controls, consent or approval.

## open decisions · HOLD

- named service owner, responsible organization and launch country;
- what precise support is in scope, response window and emergency boundary;
- the actual current Google Form owner, questions, access list, retention and deletion path;
- whether any request ever needs server storage, and the data region/processor if so;
- whether the channel is HTTPS form, E2EE message, or both, and how recipient keys are verified;
- language availability and who reviews each of the 13 layers;
- staffed coordinator, volunteers, safeguarding, budget and incident contact;
- backup retention and whether recovery or deliberate unrecoverability is the chosen policy.

## primary references · documentation reviewed 2026-11-08

- [Matrix end-to-end encryption implementation guide](https://matrix.org/docs/matrix-concepts/end-to-end-encryption/) — device keys, verification, group sessions, membership changes and key loss boundaries.
- [Matrix Client-Server API specification](https://spec.matrix.org/latest/client-server-api/) — encrypted room events and session handling.
- [Matrix.org privacy notice](https://matrix.org/legal/privacy-notice/) — the provider's own description of room visibility, data storage and E2EE key custody; this is provider-specific, not a universal Matrix guarantee.
- [Signal Protocol specifications](https://signal.org/docs/) — X3DH, Double Ratchet and asynchronous multi-device session management.
- [Cloudflare Pages Functions](https://developers.cloudflare.com/pages/functions/) — one example of adding server-side functions to a static surface; not the currently observed SUTI deployment.
- [Cloudflare Pages limits](https://developers.cloudflare.com/pages/platform/limits/) — current product limits; check again before choosing a plan.
- [OWASP ASVS](https://owasp.org/www-project-application-security-verification-standard/) — verification basis for web controls.
- [OWASP authorization guidance](https://cheatsheetseries.owasp.org/cheatsheets/Authorization_Cheat_Sheet.html) — access checks belong server-side.
- [Supabase Row Level Security guide](https://supabase.com/docs/guides/database/postgres/row-level-security) and [data security guide](https://supabase.com/docs/guides/database/secure-data) — example managed Postgres controls and key boundaries; a provider feature is not independent verification of an application.

## release status

`architecture: PROPOSED` · `backend: NONE OBSERVED` · `private service: HOLD` · `deployment: NOT REQUESTED HERE` · `capacity: UNKNOWN` · `security assurance: NOT AUDITED`
