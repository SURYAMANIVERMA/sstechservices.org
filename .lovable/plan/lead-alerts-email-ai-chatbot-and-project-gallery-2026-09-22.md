# Lead Alerts, Email, AI Chatbot, and Project Gallery

## Goal
Make every website inquiry reach the SS TECH SERVICES team quickly, add a bilingual visitor chatbot, and prepare the project gallery for genuine company work without publishing invented client claims.

## What will be built

### 1. WhatsApp new-lead alerts
- Link a WhatsApp Business connection to the project.
- Add a server-side lead alert after each inquiry is saved.
- Send the alert to `+91 88082 27885` with the lead name, phone, requested service, message, and submission time.
- Use an approved utility template because these are business-initiated notifications.
- Keep inquiry submission successful even if WhatsApp is temporarily unavailable, while recording the delivery error for diagnosis.

### 2. New-lead email delivery
- Configure `sstechservices.org` as the branded sending domain.
- Set up managed transactional email delivery and the required sending queue.
- Create a professional “New lead” email for `info@sstechservices.org` containing contact, company, service, message, source page, and time.
- Keep a short confirmation email to the customer and prevent duplicate sends with one key per inquiry.
- Test the complete submission-to-inbox flow once domain verification is active.

### 3. Bilingual live AI chatbot
- Add a floating chat button available across the site without conflicting with the existing WhatsApp button.
- Build a compact, mobile-friendly conversation panel with Hindi/English labels, suggested questions, message history, loading/error states, and clear escalation actions.
- Add a secure AI endpoint using the existing AI Gateway.
- Ground answers in the verified SS TECH SERVICES service catalogue, public project information, company contact details, and pricing policy.
- Do not invent fixed prices, client names, certifications, or guarantees; guide visitors to request a quote when details require assessment.
- Limit message size and retained conversation history for speed and cost control.

### 4. Genuine project gallery structure
- Replace the current fictional project/client copy with a centralized bilingual project data source and an explicit “details being verified” empty state.
- Build professional project cards ready for authentic photos, client names or privacy-safe labels, location, service scope, work completed, and outcomes.
- Remove unverified client stories and numerical claims from the gallery rather than presenting them as real.
- Keep the current generic imagery only as clearly non-client visual placeholders until authentic project photos and details are supplied.

## Technical details
- Update the existing inquiry function rather than creating a second lead-write path.
- Create one chatbot function with validated request input, bounded history, bilingual system context, CORS handling, and safe provider errors.
- Add reusable project data and chatbot UI files before importing them into pages/layout.
- Deploy and live-test changed server functions.
- Verify inquiry submission, chatbot conversations, language switching, desktop/mobile layout, and current build/runtime logs.

## Required setup
- WhatsApp Business connection and Meta template approval are required before automatic phone alerts can send.
- The owned domain `sstechservices.org` must complete sender-domain verification before new-lead emails can arrive automatically.
- Real project photos and facts can be inserted later without redesigning the gallery.
