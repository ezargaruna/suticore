# SUTI · social channel adapters

**id:** `suti.channels.adapters.v1`

**state:** content and intake design · no social messages sent

**purpose:** one clear invitation that can travel through different platforms without changing its privacy promise

## canonical invitation

**what would help you right now?**

Choose one: ask for a resource, offer a small contribution, explore a practice, or leave the page. The self-guided route is free and stays in the browser. A human reply is available only where a named, staffed partner has opened a request channel.

## platform formats

| channel | message shape | response control |
|---|---|---|
| Instagram story | one question, one poll with “explore / skip”, link sticker to the selected-language public route | never request a diagnosis, contact detail or personal story in the story reply |
| Instagram / TikTok public post | short caption, accessible image text, public route and language note | comments are public; ask people not to post private details |
| Telegram post | short invitation and website link; no private bot intake | bot replies and user handles are processed by Telegram and bot operator; disclose this if a bot is later used |
| WhatsApp message | plain invitation, low-data link and stop/ignore option | do not send repeated outreach; never ask recipients to forward another person's private details |
| QR card / flyer | human-readable short link, one sentence, language marker and date | no UTM, unique person ID, or embedded personal data by default |
| email | subject, short invitation, clear sender and one link | separate subscription consent; no mailing-list enrollment from form completion |
| offline / print | short blank worksheet with “keep / share / discard” choices | person controls the paper; do not collect completed copies without a separate process |

Platform-native polls are for low-risk interest only. Every platform may retain content, account identifiers and interaction metadata under its own terms; SUTI does not control those records.

## social copy · draft, not sent

### short

что тебе сейчас важно? SUTI.world предлагает бесплатную практику, чтобы спокойно выбрать следующий шаг. можно пропустить вопросы; личная заметка остаётся в этой вкладке. перейти: `https://suti.world/?lang=ru#care`

### English

What would help right now? SUTI.world offers a free, self-guided way to find one next step. Skip any question. Your reflection stays in this browser tab. Explore: `https://suti.world/?lang=en#care`

### volunteer interest

Interested in helping shape a future care circle? We are preparing a small, time-bounded design test. It is not an active support service and does not create an angel role. Please do not send personal case details. We will publish an invitation only after a named coordinator, scope, safety rules, time commitment, privacy notice and contact route are ready.

## central route contract

- preserve the selected locale with `?lang=<approved-layer>` and show an explicit fallback notice where a full translation is unavailable;
- accept no sensitive data in URL query parameters, QR codes, pixels or analytics;
- distinguish local reflection, external form submission and encrypted message as separate paths;
- before any external submit, display exact recipient, collected fields, retention notice, response time and an undo/exit path;
- never promise a personalized answer, human support or resource allocation unless the service status is `open` and a responsible person is assigned;
- version each question set; the website and social copy use the same current canonical ID;
- no referral reward or SUTI Coin for form answers, sensitive data, contact sharing or recruitment;
- publish or distribute nothing on third-party accounts until a human owner approves the exact copy and account.

## social-to-service sequence

```text
public post → language-aware entry → local practice or leave
          → optional request, only if a staffed route is open
          → consent preview → named destination → receipt state
```

The route does not assume a social viewer is a service user. Reading, clicking, completing, requesting contact, receiving a reply and accepting a volunteer role are separate choices.
