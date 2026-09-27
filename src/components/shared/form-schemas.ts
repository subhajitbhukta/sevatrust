import type { FormSchema } from "./FormDialog";

// ============ ACTIVITIES ============
export const ACTIVITY_FORM_SCHEMA: FormSchema = {
  title: "Add New Activity / Project",
  description: "Create a new welfare activity record. All fields will be saved to the database.",
  fields: [
    { key: "name", label: "Activity / Project Name", type: "text", placeholder: "e.g., Winter Blanket Distribution 2025", required: true, span: 2 },
    { key: "category", label: "Category", type: "select", required: true, options: ["Community Development", "Education", "Environment", "Healthcare", "Women Empowerment", "Rural Development", "Child Welfare", "Senior Citizen Welfare", "Skill Development", "Disaster Relief"] },
    { key: "date", label: "Activity Date", type: "date", required: true },
    { key: "location", label: "Location", type: "text", placeholder: "Village / area name", required: true },
    { key: "status", label: "Project Status", type: "select", required: true, default: "Ongoing", options: ["Ongoing", "Completed", "Planned", "On Hold"] },
    { key: "beneficiaries", label: "Number of Beneficiaries", type: "number", placeholder: "0", default: 0 },
    { key: "objectives", label: "Objectives", type: "textarea", placeholder: "What does this activity aim to achieve?", span: 2 },
    { key: "description", label: "Description", type: "textarea", placeholder: "Detailed description of the activity...", span: 2 },
    { key: "impact", label: "Impact / Result", type: "textarea", placeholder: "What was the measurable impact?", span: 2 },
  ],
};

// ============ BENEFICIARIES ============
export const BENEFICIARY_FORM_SCHEMA: FormSchema = {
  title: "Add New Beneficiary",
  description: "Register a new beneficiary. Sensitive fields are restricted to admin access.",
  fields: [
    { key: "name", label: "Beneficiary Name", type: "text", placeholder: "Full name", required: true },
    { key: "age", label: "Age", type: "number", required: true },
    { key: "gender", label: "Gender", type: "radio", required: true, options: ["Male", "Female", "Other"] },
    { key: "category", label: "Category of Assistance", type: "select", required: true, options: ["Community Development", "Education", "Environment", "Healthcare", "Women Empowerment", "Disaster Relief"] },
    { key: "contact", label: "Contact Number", type: "tel", placeholder: "+91 9XXXXXXXXX" },
    { key: "address", label: "Address", type: "textarea", placeholder: "Full address", span: 2 },
    { key: "assistance", label: "Assistance Provided", type: "text", placeholder: "e.g., Winter blanket + warm clothing", required: true },
    { key: "assistanceDate", label: "Assistance Date", type: "date", required: true },
    { key: "project", label: "Linked Project", type: "select", required: true, options: ["Winter Warmth Drive", "Year-Round Clothes Distribution", "Tree Plantation Drive", "Education Supplies Drive", "Essentials Distribution", "Flood Relief", "Women Empowerment Drive"] },
    { key: "status", label: "Status", type: "select", default: "Active", options: ["Active", "Completed", "Follow-up"] },
  ],
};

// ============ DONATIONS ============
export const DONATION_FORM_SCHEMA: FormSchema = {
  title: "Record Manual Donation",
  description: "Record an offline or manual donation entry. Online donations are auto-recorded.",
  fields: [
    { key: "donor", label: "Donor Name", type: "text", placeholder: "Full name", required: true },
    { key: "mobile", label: "Mobile Number", type: "tel", placeholder: "+91 9XXXXXXXXX", required: true },
    { key: "email", label: "Email", type: "email", placeholder: "donor@example.com" },
    { key: "address", label: "Address", type: "textarea", placeholder: "Full address", span: 2 },
    { key: "pan", label: "PAN (for 80G receipt)", type: "text", placeholder: "ABCDE1234F" },
    { key: "amount", label: "Donation Amount (₹)", type: "number", placeholder: "0", required: true },
    { key: "purpose", label: "Donation Purpose", type: "select", default: "General Donation", options: ["General Donation", "Campaign Contribution", "Sponsorship", "Specific Project", "Relief Fund"] },
    { key: "campaign", label: "Campaign (optional)", type: "select", options: ["—", "Winter Warmth Drive 2025", "Green Singur Initiative", "Education Scholarship Program", "Flood Relief Distribution"] },
    { key: "paymentMethod", label: "Payment Method", type: "select", default: "UPI", options: ["UPI", "Card", "Net Banking", "Cash", "Cheque", "In Kind"], required: true },
    { key: "txnId", label: "Transaction / Cheque Reference", type: "text", placeholder: "Transaction ID or cheque number" },
    { key: "date", label: "Donation Date", type: "date", required: true },
    { key: "anonymous", label: "Make this donation anonymous", type: "checkbox", default: false, span: 2 },
  ],
};

// ============ CAMPAIGNS ============
export const CAMPAIGN_FORM_SCHEMA: FormSchema = {
  title: "Create New Campaign",
  description: "Launch a new fundraising campaign with target and timeline.",
  fields: [
    { key: "title", label: "Campaign Title", type: "text", placeholder: "e.g., Winter Warmth 2025", required: true, span: 2 },
    { key: "category", label: "Category", type: "select", required: true, options: ["Community Development", "Education", "Environment", "Healthcare", "Women Empowerment", "Disaster Relief"] },
    { key: "status", label: "Status", type: "select", default: "Upcoming", options: ["Active", "Upcoming", "Completed"] },
    { key: "targetAmount", label: "Target Amount (₹)", type: "number", placeholder: "0", required: true },
    { key: "beneficiaries", label: "Expected Beneficiaries", type: "number", placeholder: "0", required: true },
    { key: "startDate", label: "Start Date", type: "date", required: true },
    { key: "endDate", label: "End Date", type: "date", required: true },
    { key: "objective", label: "Objective", type: "textarea", placeholder: "What will this campaign achieve?", span: 2 },
    { key: "description", label: "Description (public-facing)", type: "textarea", placeholder: "Detailed description shown to donors", span: 2 },
  ],
};

// ============ SPONSORSHIPS ============
export const SPONSORSHIP_FORM_SCHEMA: FormSchema = {
  title: "Add New Sponsorship",
  description: "Record a recurring sponsorship for a child, education, food, medical, or event.",
  fields: [
    { key: "sponsorName", label: "Sponsor Name", type: "text", placeholder: "Full name", required: true },
    { key: "type", label: "Sponsorship Type", type: "select", required: true, default: "Child", options: ["Child", "Education", "Food", "Medical", "Event", "Equipment", "Monthly Support"] },
    { key: "amount", label: "Sponsorship Amount (₹)", type: "number", placeholder: "0", required: true },
    { key: "duration", label: "Duration", type: "select", default: "12 months", options: ["3 months", "6 months", "12 months", "24 months", "One-time"] },
    { key: "startDate", label: "Start Date", type: "date", required: true },
    { key: "beneficiary", label: "Beneficiary / Recipient", type: "text", placeholder: "Beneficiary name or project", required: true },
    { key: "status", label: "Status", type: "select", default: "Active", options: ["Active", "Completed", "Pending"] },
    { key: "nextPayment", label: "Next Payment Date", type: "date" },
  ],
};

// ============ VOLUNTEERS ============
export const VOLUNTEER_FORM_SCHEMA: FormSchema = {
  title: "Register New Volunteer",
  description: "Add a volunteer record manually (in addition to public registration).",
  fields: [
    { key: "name", label: "Full Name", type: "text", placeholder: "Volunteer name", required: true },
    { key: "mobile", label: "Mobile Number", type: "tel", placeholder: "+91 9XXXXXXXXX", required: true },
    { key: "email", label: "Email", type: "email", placeholder: "volunteer@example.com", required: true },
    { key: "location", label: "Location", type: "text", placeholder: "Village / city", required: true },
    { key: "occupation", label: "Occupation", type: "text", placeholder: "e.g., Student, Teacher, Doctor" },
    { key: "skills", label: "Skills (comma-separated)", type: "text", placeholder: "Teaching, Photography, Logistics", span: 2 },
    { key: "interests", label: "Areas of Interest (comma-separated)", type: "text", placeholder: "Education, Environment", span: 2 },
    { key: "availability", label: "Availability", type: "select", default: "Weekends", options: ["Weekends", "Weekdays", "Flexible", "Monthly", "1 week/month"] },
    { key: "status", label: "Status", type: "select", default: "Pending", options: ["Active", "Pending", "Inactive"] },
  ],
};

// ============ EVENTS ============
export const EVENT_FORM_SCHEMA: FormSchema = {
  title: "Create New Event",
  description: "Schedule a new event with participant registration.",
  fields: [
    { key: "title", label: "Event Title", type: "text", placeholder: "e.g., Winter Blanket Distribution Drive", required: true, span: 2 },
    { key: "date", label: "Event Date", type: "date", required: true },
    { key: "time", label: "Event Time", type: "text", placeholder: "10:00 AM", required: true },
    { key: "venue", label: "Venue", type: "text", placeholder: "Full address", required: true, span: 2 },
    { key: "participantLimit", label: "Participant Limit", type: "number", placeholder: "0", required: true },
    { key: "status", label: "Status", type: "select", default: "Upcoming", options: ["Upcoming", "Ongoing", "Completed", "Cancelled"] },
    { key: "description", label: "Description", type: "textarea", placeholder: "Event details and agenda", span: 2 },
  ],
};

// ============ ENQUIRIES ============
export const ENQUIRY_FORM_SCHEMA: FormSchema = {
  title: "Record Manual Enquiry",
  description: "Manually log an enquiry received via phone or in-person.",
  fields: [
    { key: "name", label: "Enquirer Name", type: "text", placeholder: "Full name", required: true },
    { key: "email", label: "Email", type: "email", placeholder: "name@example.com" },
    { key: "mobile", label: "Mobile Number", type: "tel", placeholder: "+91 9XXXXXXXXX", required: true },
    { key: "category", label: "Enquiry Category", type: "select", required: true, default: "General", options: ["General", "Donation", "Volunteer", "Sponsorship", "CSR", "Partnership", "Event", "Media", "Other"] },
    { key: "subject", label: "Subject", type: "text", placeholder: "Brief subject", required: true, span: 2 },
    { key: "message", label: "Message", type: "textarea", placeholder: "Detailed enquiry", span: 2 },
    { key: "assignedTo", label: "Assigned To", type: "select", options: ["Founder Trustee", "Community Coordinator", "Volunteer Lead", "Treasurer", "Communications Lead"] },
    { key: "status", label: "Status", type: "select", default: "New", options: ["New", "In Progress", "Resolved", "Closed"] },
  ],
};

// ============ CSR PARTNERS ============
export const CSR_FORM_SCHEMA: FormSchema = {
  title: "Add CSR Partner",
  description: "Register a new corporate partner or CSR enquiry.",
  fields: [
    { key: "companyName", label: "Company Name", type: "text", placeholder: "Registered company name", required: true, span: 2 },
    { key: "contactPerson", label: "Contact Person", type: "text", placeholder: "Full name", required: true },
    { key: "email", label: "Email", type: "email", placeholder: "csr@company.com", required: true },
    { key: "mobile", label: "Mobile Number", type: "tel", placeholder: "+91 9XXXXXXXXX", required: true },
    { key: "location", label: "Company Location", type: "text", placeholder: "City, State" },
    { key: "csrInterest", label: "CSR Interest Areas", type: "text", placeholder: "Education, Healthcare, Environment", span: 2 },
    { key: "proposedContribution", label: "Proposed Contribution (₹)", type: "number", placeholder: "0" },
    { key: "projectInterest", label: "Project of Interest", type: "select", options: ["—", "Winter Warmth Drive", "Green Singur Initiative", "Education Supplies Drive", "Women Empowerment Drive", "Flood Relief Distribution"] },
    { key: "status", label: "Partnership Status", type: "select", default: "New", options: ["New", "In Discussion", "Approved", "Active", "Closed"] },
    { key: "date", label: "Enquiry Date", type: "date", required: true },
  ],
};

// ============ GRANTS ============
export const GRANT_FORM_SCHEMA: FormSchema = {
  title: "Add New Grant",
  description: "Record a new grant received from a funding organisation.",
  fields: [
    { key: "name", label: "Grant Name", type: "text", placeholder: "e.g., Education Support Grant", required: true, span: 2 },
    { key: "fundingOrganisation", label: "Funding Organisation", type: "text", placeholder: "e.g., WB Forest Dept", required: true, span: 2 },
    { key: "project", label: "Linked Project", type: "select", required: true, options: ["Winter Warmth Drive 2025", "Green Singur Initiative", "Education Scholarship Program", "Flood Relief Distribution", "Women Empowerment Drive", "General"] },
    { key: "sanctionedAmount", label: "Sanctioned Amount (₹)", type: "number", placeholder: "0", required: true },
    { key: "receivedAmount", label: "Received Amount (₹)", type: "number", placeholder: "0" },
    { key: "utilisedAmount", label: "Utilised Amount (₹)", type: "number", placeholder: "0" },
    { key: "startDate", label: "Start Date", type: "date", required: true },
    { key: "endDate", label: "End Date", type: "date", required: true },
    { key: "status", label: "Status", type: "select", default: "Active", options: ["Active", "Completed", "Pending"] },
  ],
};

// ============ EXPENSES ============
export const EXPENSE_FORM_SCHEMA: FormSchema = {
  title: "Add New Expense Entry",
  description: "Record a new expense against a project with funding source tracking.",
  fields: [
    { key: "date", label: "Expense Date", type: "date", required: true },
    { key: "category", label: "Expense Category", type: "select", required: true, options: ["Winter Materials", "Saplings", "Education Materials", "Essentials", "Equipment", "Relief Material", "Event Logistics", "Travel", "Administrative", "Other"] },
    { key: "amount", label: "Amount (₹)", type: "number", placeholder: "0", required: true },
    { key: "project", label: "Project", type: "select", required: true, options: ["Winter Warmth Drive 2025", "Green Singur Initiative", "Education Supplies Drive", "Essentials Distribution", "Women Empowerment Drive", "Flood Relief Distribution", "General"] },
    { key: "fundingSource", label: "Funding Source", type: "select", required: true, options: ["General Donation", "CSR Contribution", "Government Grant", "Sponsorship", "Internal Funds"] },
    { key: "vendor", label: "Vendor / Payee", type: "text", placeholder: "Vendor name" },
    { key: "remarks", label: "Remarks", type: "textarea", placeholder: "Invoice reference, purpose details", span: 2 },
  ],
};

// ============ NEWS ============
export const NEWS_FORM_SCHEMA: FormSchema = {
  title: "Publish News Article",
  description: "Create and publish a new news article or announcement.",
  fields: [
    { key: "title", label: "Article Title", type: "text", placeholder: "Headline", required: true, span: 2 },
    { key: "category", label: "Category", type: "select", required: true, default: "News", options: ["News", "Announcement", "Press Release", "Achievement", "Notice"] },
    { key: "date", label: "Publish Date", type: "date", required: true },
    { key: "author", label: "Author", type: "text", placeholder: "Author name", required: true },
    { key: "excerpt", label: "Excerpt (short summary)", type: "textarea", placeholder: "1-2 sentence summary", span: 2 },
    { key: "content", label: "Full Article Content", type: "textarea", placeholder: "Full article body (supports paragraphs)", span: 2 },
    { key: "coverUrl", label: "Cover Image URL", type: "text", placeholder: "https://...", span: 2 },
    { key: "externalLink", label: "External Link (optional)", type: "text", placeholder: "https://...", span: 2 },
  ],
};

// ============ GALLERY ============
export const GALLERY_FORM_SCHEMA: FormSchema = {
  title: "Add Gallery Item",
  description: "Add a single photo or video to the public gallery.",
  fields: [
    { key: "title", label: "Title", type: "text", placeholder: "Photo or video title", required: true, span: 2 },
    { key: "type", label: "Type", type: "select", required: true, default: "Photo", options: ["Photo", "Video"] },
    { key: "category", label: "Category", type: "select", required: true, default: "Activity", options: ["Activity", "Event", "Campaign", "General"] },
    { key: "date", label: "Date", type: "date", required: true },
    { key: "url", label: "Image URL or YouTube embed URL", type: "text", placeholder: "https://...", required: true, span: 2 },
    { key: "caption", label: "Caption", type: "textarea", placeholder: "Short caption shown under the media", span: 2 },
  ],
};

// ============ DOCUMENTS ============
export const DOCUMENT_FORM_SCHEMA: FormSchema = {
  title: "Upload Document",
  description: "Register a document in the central repository with visibility control.",
  fields: [
    { key: "name", label: "Document Name", type: "text", placeholder: "e.g., Annual Report 2025-26", required: true, span: 2 },
    { key: "category", label: "Category", type: "select", required: true, options: ["Registration Documents", "Trust Deed", "Certificates", "Annual Reports", "Audit Reports", "Activity Reports", "Policies", "Government Correspondence", "Project Documents", "Grant Documents"] },
    { key: "version", label: "Version", type: "text", default: "1.0", placeholder: "1.0" },
    { key: "date", label: "Document Date", type: "date", required: true },
    { key: "size", label: "File Size", type: "text", placeholder: "e.g., 2.4 MB" },
    { key: "visibility", label: "Visibility", type: "select", default: "Public", options: ["Public", "Admin Only"], required: true },
    { key: "fileUrl", label: "File URL or upload path", type: "text", placeholder: "https://... or /uploads/filename.pdf", span: 2 },
  ],
};

// ============ CERTIFICATES ============
export const CERTIFICATE_FORM_SCHEMA: FormSchema = {
  title: "Generate New Certificate",
  description: "Auto-generate a digital certificate with unique number and QR verification.",
  fields: [
    { key: "recipientName", label: "Recipient Name", type: "text", placeholder: "Full name", required: true },
    { key: "recipientType", label: "Recipient Type", type: "select", required: true, options: ["Volunteer", "Donor", "Participant", "Sponsor"] },
    { key: "event", label: "Event / Reason", type: "text", placeholder: "e.g., Winter Warmth Drive 2024", required: true, span: 2 },
    { key: "issueDate", label: "Issue Date", type: "date", required: true },
    { key: "sendEmail", label: "Email certificate to recipient", type: "checkbox", default: true, span: 2 },
  ],
};

// ============ USERS ============
export const USER_FORM_SCHEMA: FormSchema = {
  title: "Add New Admin User",
  description: "Create a new admin account with role-based permissions.",
  fields: [
    { key: "name", label: "Full Name", type: "text", placeholder: "Full name", required: true },
    { key: "email", label: "Email Address", type: "email", placeholder: "user@bbmwt.org", required: true },
    { key: "role", label: "Role", type: "select", required: true, default: "Content Manager", options: ["Super Admin", "Trust Admin", "Accounts", "Project Manager", "Volunteer Coordinator", "Content Manager"] },
    { key: "status", label: "Account Status", type: "select", default: "Active", options: ["Active", "Inactive"] },
    { key: "password", label: "Temporary Password", type: "text", placeholder: "Will be sent via email", required: true },
    { key: "enable2FA", label: "Require 2FA on first login", type: "switch", default: true, span: 2 },
  ],
};

// ============ NOTIFICATIONS ============
export const NOTIFICATION_FORM_SCHEMA: FormSchema = {
  title: "Compose Manual Notification",
  description: "Send a notification to a specific audience across multiple channels.",
  fields: [
    { key: "audience", label: "Target Audience", type: "select", required: true, default: "All Donors", options: ["All Donors", "Active Volunteers", "All Beneficiaries", "Event Participants", "Sponsors", "CSR Partners"] },
    { key: "subject", label: "Subject", type: "text", placeholder: "Subject line", required: true, span: 2 },
    { key: "message", label: "Message", type: "textarea", placeholder: "Notification message body", required: true, span: 2 },
    { key: "email", label: "Send via Email", type: "checkbox", default: true },
    { key: "sms", label: "Send via SMS", type: "checkbox", default: false },
    { key: "whatsapp", label: "Send via WhatsApp", type: "checkbox", default: false },
    { key: "schedule", label: "Schedule for later", type: "date", hint: "Leave empty to send immediately" },
  ],
};
