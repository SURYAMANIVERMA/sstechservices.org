import { Body, Container, Head, Heading, Hr, Html, Preview, Section, Text } from 'npm:@react-email/components@0.0.22'
import type { TemplateEntry } from './registry.ts'

interface LeadNotificationProps {
  name?: string
  email?: string
  phone?: string
  company?: string
  service?: string
  message?: string
  source?: string
  submittedAt?: string
}

const LeadNotificationEmail = ({
  name = 'Website visitor',
  email = 'Not provided',
  phone = 'Not provided',
  company = 'Not provided',
  service = 'General IT services',
  message = 'No message provided.',
  source = 'Website',
  submittedAt = 'Just now',
}: LeadNotificationProps) => (
  <Html lang="en" dir="ltr">
    <Head />
    <Preview>New {service} inquiry from {name}</Preview>
    <Body style={main}>
      <Container style={container}>
        <Section style={brandBar}>
          <Text style={brand}>SS TECH SERVICES</Text>
          <Text style={brandTagline}>IT Infrastructure & Support · Lucknow</Text>
        </Section>
        <Section style={content}>
          <Text style={eyebrow}>NEW WEBSITE INQUIRY</Text>
          <Heading style={heading}>{service}</Heading>
          <Text style={intro}>A new service request has been received from <strong>{name}</strong>.</Text>

          <Section style={details}>
            <Text style={detail}><strong>Name:</strong> {name}</Text>
            <Text style={detail}><strong>Email:</strong> {email}</Text>
            <Text style={detail}><strong>Phone:</strong> {phone}</Text>
            <Text style={detail}><strong>Company:</strong> {company}</Text>
            <Text style={detail}><strong>Service:</strong> {service}</Text>
          </Section>

          <Text style={label}>PROJECT DETAILS</Text>
          <Section style={messageBox}>
            <Text style={messageText}>{message}</Text>
          </Section>

          <Hr style={rule} />
          <Text style={meta}>Source: {source}</Text>
          <Text style={meta}>Submitted: {submittedAt} (India time)</Text>
          <Text style={footer}>Reply directly to this email to contact the customer.</Text>
        </Section>
      </Container>
    </Body>
  </Html>
)

export const template = {
  component: LeadNotificationEmail,
  subject: (data) => `New lead: ${data.service || 'IT service inquiry'} — ${data.name || 'Website visitor'}`,
  displayName: 'New lead notification',
  to: 'info@sstechservices.org',
  previewData: {
    name: 'Amit Sharma',
    email: 'amit@example.com',
    phone: '+91 98765 43210',
    company: 'Example Enterprises',
    service: 'Structured Cabling',
    message: 'We need structured cabling for a new office with 40 workstations.',
    source: '/contact',
    submittedAt: '25 Sep 2026, 10:15 am',
  },
} satisfies TemplateEntry

const main = { backgroundColor: '#ffffff', color: '#172033', fontFamily: 'Arial, sans-serif', margin: 0, padding: '24px 12px' }
const container = { border: '1px solid #dbe3ef', borderRadius: '8px', margin: '0 auto', maxWidth: '620px', overflow: 'hidden' as const }
const brandBar = { backgroundColor: '#083b80', padding: '22px 30px' }
const brand = { color: '#ffffff', fontSize: '21px', fontWeight: '700', letterSpacing: '0', margin: '0 0 4px' }
const brandTagline = { color: '#c9e8ff', fontSize: '12px', margin: 0 }
const content = { padding: '28px 30px 24px' }
const eyebrow = { color: '#e2293f', fontSize: '11px', fontWeight: '700', margin: '0 0 8px' }
const heading = { color: '#083b80', fontSize: '26px', lineHeight: '1.25', margin: '0 0 12px' }
const intro = { color: '#334155', fontSize: '15px', lineHeight: '1.6', margin: '0 0 20px' }
const details = { backgroundColor: '#f5f8fc', borderLeft: '4px solid #0b74c8', padding: '14px 18px' }
const detail = { color: '#243247', fontSize: '14px', lineHeight: '1.5', margin: '4px 0' }
const label = { color: '#64748b', fontSize: '11px', fontWeight: '700', margin: '24px 0 8px' }
const messageBox = { border: '1px solid #dbe3ef', borderRadius: '6px', padding: '4px 16px' }
const messageText = { color: '#243247', fontSize: '15px', lineHeight: '1.65', whiteSpace: 'pre-wrap' as const }
const rule = { borderColor: '#dbe3ef', margin: '24px 0 16px' }
const meta = { color: '#64748b', fontSize: '12px', margin: '4px 0' }
const footer = { color: '#334155', fontSize: '13px', fontWeight: '600', margin: '18px 0 0' }