import type { ElementType } from 'npm:react@18.3.1'
import { template as leadNotificationTemplate } from './lead-notification.tsx'
import { template as leadConfirmationTemplate } from './lead-confirmation.tsx'

export interface TemplateEntry {
  component: ElementType
  subject: string | ((data: Record<string, unknown>) => string)
  displayName?: string
  previewData?: Record<string, unknown>
  /** Fixed recipient — overrides caller-provided recipientEmail when set. */
  to?: string
}

/**
 * Template registry — maps template names to their React Email components.
 * Import and register new templates here after creating them in this directory.
 *
 * Example:
 *   import { template as welcomeTemplate } from './welcome.tsx'
 *   // then add to TEMPLATES: 'welcome': welcomeTemplate
 */
export const TEMPLATES: Record<string, TemplateEntry> = {
  'lead-notification': leadNotificationTemplate,
  'lead-confirmation': leadConfirmationTemplate,
}
