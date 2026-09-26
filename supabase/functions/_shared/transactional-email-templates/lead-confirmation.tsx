import { Body, Button, Container, Head, Heading, Html, Preview, Section, Text } from 'npm:@react-email/components@0.0.22'
import type { TemplateEntry } from './registry.ts'

interface LeadConfirmationProps {
  name?: string
  service?: string
  message?: string
}

const LeadConfirmationEmail = ({
  name = 'there',
  service = 'IT service',
  message = 'Your service request has been received.',
}: LeadConfirmationProps) => (
  <Html lang="en" dir="ltr">
    <Head />
    <Preview>We received your {service} request</Preview>
    <Body style={main}>
      <Container style={container}>
        <Section style={brandBar}>
          <Text style={brand}>SS TECH SERVICES</Text>
          <Text style={brandTagline}>IT Infrastructure & Support · Lucknow</Text>
        </Section>
        <Section style={content}>
          <Heading style={heading}>Thank you, {name}.</Heading>
          <Text style={text}>We received your request for <strong>{service}</strong>. Our team will review the details and contact you within 24 hours.</Text>
          <Section style={summary}>
            <Text style={summaryLabel}>YOUR MESSAGE</Text>
            <Text style={summaryText}>{message}</Text>
          </Section>
          <Button href="https://wa.me/918808227885" style={button}>Contact us on WhatsApp</Button>
          <Text style={contact}>Urgent requirement? Call +91 88082 27885 or email info@sstechservices.org.</Text>
          <Text style={footer}>SS TECH SERVICES · Lucknow, Uttar Pradesh</Text>
        </Section>
      </Container>
    </Body>
  </Html>
)

export const template = {
  component: LeadConfirmationEmail,
  subject: (data) => `We received your ${data.service || 'service'} request — SS TECH SERVICES`,
  displayName: 'Lead confirmation',
  previewData: {
    name: 'Amit',
    service: 'Structured Cabling',
    message: 'We need structured cabling for a new office with 40 workstations.',
  },
} satisfies TemplateEntry

const main = { backgroundColor: '#ffffff', color: '#172033', fontFamily: 'Arial, sans-serif', margin: 0, padding: '24px 12px' }
const container = { border: '1px solid #dbe3ef', borderRadius: '8px', margin: '0 auto', maxWidth: '620px', overflow: 'hidden' as const }
const brandBar = { backgroundColor: '#083b80', padding: '22px 30px' }
const brand = { color: '#ffffff', fontSize: '21px', fontWeight: '700', letterSpacing: '0', margin: '0 0 4px' }
const brandTagline = { color: '#c9e8ff', fontSize: '12px', margin: 0 }
const content = { padding: '30px' }
const heading = { color: '#083b80', fontSize: '27px', lineHeight: '1.25', margin: '0 0 16px' }
const text = { color: '#334155', fontSize: '15px', lineHeight: '1.65' }
const summary = { backgroundColor: '#f5f8fc', borderLeft: '4px solid #e2293f', margin: '22px 0', padding: '14px 18px' }
const summaryLabel = { color: '#64748b', fontSize: '11px', fontWeight: '700', margin: '0 0 6px' }
const summaryText = { color: '#243247', fontSize: '14px', lineHeight: '1.6', margin: 0, whiteSpace: 'pre-wrap' as const }
const button = { backgroundColor: '#0b74c8', borderRadius: '6px', color: '#ffffff', display: 'inline-block', fontSize: '14px', fontWeight: '700', padding: '12px 18px', textDecoration: 'none' }
const contact = { color: '#64748b', fontSize: '13px', lineHeight: '1.6', margin: '22px 0' }
const footer = { borderTop: '1px solid #dbe3ef', color: '#64748b', fontSize: '12px', margin: '24px 0 0', paddingTop: '16px' }