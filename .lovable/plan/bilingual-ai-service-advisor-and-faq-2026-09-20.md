# Bilingual AI Service Advisor and FAQ

## Goal
Add a practical in-app tool for the SS TECH SERVICES team and customers, make the complete website switchable between English and Hindi, and publish useful service FAQs for stronger search visibility and lead conversion.

## What will be built

### 1. AI Service Advisor
- Add a dedicated `/service-advisor` page linked from the main navigation.
- Let the team describe a customer's setup, issue, location, urgency, preferred timeline, and contact details.
- Send the requirement through a secure backend function to Lovable AI Gateway.
- Return a structured recommendation with:
  - best-fit SS TECH SERVICES service
  - priority level and reason
  - recommended next action
  - information still needed
  - practical response-time guidance
- Present results in Hindi or English based on the selected website language.
- Add clear actions to copy the recommendation, continue to the inquiry form, call, or WhatsApp.
- Show provider-safe errors and stop cleanly when AI access, credits, or configuration prevents completion.

### 2. English / Hindi Language Toggle
- Add a compact EN / हिंदी selector in desktop and mobile navigation.
- Persist the visitor's choice in the browser and update the document language.
- Translate all visible content across Home, About, Services, Projects, Careers, Contact, 404, navigation, footer, WhatsApp message, form labels, validation, success/error messages, and page metadata.
- Keep service names recognizable while providing clear Hindi descriptions.

### 3. SEO-Friendly Service FAQs
- Add an FAQ section to the Services page covering all nine IT services.
- Include common questions, indicative timelines, information needed for assessment, and direct contact choices.
- Add FAQ structured data for search engines and bilingual metadata/content.
- Add call, WhatsApp, and service-request actions beside the FAQs.

## Technical details
- Use a lightweight React language context with typed translation content; no extra localization package is required.
- Keep AI credentials server-only in a new Lovable Cloud function and validate all inputs and outputs.
- Use the required `openai/gpt-6-astra` model through `/v1/responses`, with low reasoning effort, strict output instructions, and no automatic model substitution.
- Reuse the existing service catalogue, company contact details, buttons, forms, and visual system.
- Keep the existing inquiry delivery flow unchanged, except for bilingual labels and messages.

## Verification
- Test English and Hindi across every route on desktop and mobile.
- Test the advisor's form states, AI response display, contact actions, and safe error handling.
- Verify FAQ structured data, page metadata, phone/WhatsApp links, no horizontal overflow, and a clean production build.
