// Type definitions for the Trust Management Application

export type PublicPage =
  | "home"
  | "about"
  | "activities"
  | "campaigns"
  | "donate"
  | "sponsorship"
  | "gallery"
  | "news"
  | "transparency"
  | "contact";

export type AdminPage =
  | "dashboard"
  | "activities"
  | "beneficiaries"
  | "donations"
  | "campaigns"
  | "sponsorships"
  | "volunteers"
  | "events"
  | "enquiries"
  | "csr"
  | "grants"
  | "expenses"
  | "news"
  | "gallery"
  | "documents"
  | "certificates"
  | "notifications"
  | "users"
  | "audit"
  | "settings";

export type ActivityCategory =
  | "Education"
  | "Healthcare"
  | "Women Empowerment"
  | "Rural Development"
  | "Child Welfare"
  | "Senior Citizen Welfare"
  | "Skill Development"
  | "Environment"
  | "Disaster Relief"
  | "Community Development";

export type DonationStatus = "Successful" | "Pending" | "Failed";

export type CampaignStatus = "Active" | "Completed" | "Upcoming";

export type ProjectStatus = "Ongoing" | "Completed" | "Planned" | "On Hold";

export type VolunteerStatus = "Active" | "Pending" | "Inactive";

export type EventStatus = "Upcoming" | "Ongoing" | "Completed" | "Cancelled";

export type EnquiryStatus = "New" | "In Progress" | "Resolved" | "Closed";

export type EnquiryCategory =
  | "General"
  | "Donation"
  | "Volunteer"
  | "Sponsorship"
  | "CSR"
  | "Partnership"
  | "Event"
  | "Media"
  | "Other";

export type PartnershipStatus = "New" | "In Discussion" | "Approved" | "Active" | "Closed";

export type SponsorshipType =
  | "Child"
  | "Education"
  | "Food"
  | "Medical"
  | "Event"
  | "Equipment"
  | "Monthly Support";

export interface Trustee {
  id: string;
  name: string;
  role: string;
  photo: string;
  bio: string;
}

export interface Activity {
  id: string;
  name: string;
  category: ActivityCategory;
  date: string;
  location: string;
  description: string;
  objectives: string;
  beneficiaries: number;
  status: ProjectStatus;
  impact: string;
  cover: string;
}

export interface Beneficiary {
  id: string;
  name: string;
  age: number;
  gender: "Male" | "Female" | "Other";
  address: string;
  contact: string;
  category: ActivityCategory;
  assistance: string;
  assistanceDate: string;
  project: string;
  status: "Active" | "Completed" | "Follow-up";
}

export interface Donation {
  id: string;
  donor: string;
  mobile: string;
  email: string;
  amount: number;
  purpose: string;
  campaign: string;
  paymentMethod: "UPI" | "Card" | "Net Banking";
  status: DonationStatus;
  date: string;
  txnId: string;
  anonymous: boolean;
}

export interface Campaign {
  id: string;
  title: string;
  description: string;
  objective: string;
  targetAmount: number;
  collectedAmount: number;
  beneficiaries: number;
  startDate: string;
  endDate: string;
  status: CampaignStatus;
  cover: string;
  category: ActivityCategory;
}

export interface Sponsorship {
  id: string;
  sponsorName: string;
  type: SponsorshipType;
  amount: number;
  duration: string;
  startDate: string;
  beneficiary: string;
  status: "Active" | "Completed" | "Pending";
  nextPayment: string;
}

export interface Volunteer {
  id: string;
  name: string;
  mobile: string;
  email: string;
  location: string;
  occupation: string;
  skills: string[];
  interests: string[];
  availability: string;
  status: VolunteerStatus;
  joinedDate: string;
  activitiesCount: number;
}

export interface EventItem {
  id: string;
  title: string;
  date: string;
  time: string;
  venue: string;
  description: string;
  participantLimit: number;
  registered: number;
  status: EventStatus;
  cover: string;
}

export interface Enquiry {
  id: string;
  name: string;
  email: string;
  mobile: string;
  category: EnquiryCategory;
  subject: string;
  message: string;
  status: EnquiryStatus;
  date: string;
  assignedTo: string;
}

export interface CSRPartner {
  id: string;
  companyName: string;
  contactPerson: string;
  email: string;
  mobile: string;
  csrInterest: string;
  proposedContribution: number;
  location: string;
  projectInterest: string;
  status: PartnershipStatus;
  date: string;
}

export interface Grant {
  id: string;
  name: string;
  fundingOrganisation: string;
  project: string;
  sanctionedAmount: number;
  receivedAmount: number;
  utilisedAmount: number;
  startDate: string;
  endDate: string;
  status: "Active" | "Completed" | "Pending";
}

export interface Expense {
  id: string;
  date: string;
  category: string;
  amount: number;
  project: string;
  fundingSource: string;
  vendor: string;
  remarks: string;
}

export interface NewsItem {
  id: string;
  title: string;
  category: "News" | "Announcement" | "Press Release" | "Achievement" | "Notice";
  date: string;
  excerpt: string;
  content: string;
  cover: string;
  author: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  type: "Photo" | "Video";
  category: string;
  date: string;
  url: string;
  caption: string;
}

export interface DocumentItem {
  id: string;
  name: string;
  category: string;
  date: string;
  version: string;
  visibility: "Public" | "Admin Only";
  size: string;
}

export interface Certificate {
  id: string;
  certificateNo: string;
  recipientName: string;
  recipientType: "Volunteer" | "Donor" | "Participant" | "Sponsor";
  issueDate: string;
  event: string;
  verified: boolean;
}

export interface AuditLog {
  id: string;
  user: string;
  action: string;
  module: string;
  details: string;
  timestamp: string;
  ip: string;
}

export interface UserAccount {
  id: string;
  name: string;
  email: string;
  role: "Super Admin" | "Trust Admin" | "Accounts" | "Project Manager" | "Volunteer Coordinator" | "Content Manager";
  status: "Active" | "Inactive";
  lastLogin: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  quote: string;
  rating: number;
}
