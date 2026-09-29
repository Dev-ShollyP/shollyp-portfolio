// Portfolio Data Store - Olushola Shotayo (Sholly P)
// AI Automation & AI Video Builder

// =============================================================================
// SUPABASE STORAGE CONFIGURATION (Free Video CDN)
// When you upload your 3 videos to a public Supabase Storage bucket, paste the
// bucket URL here (e.g. "https://yourproject.supabase.co/storage/v1/object/public/portfolio-media")
// Leaving this as "" defaults seamlessly to local video files.
// =============================================================================
const SUPABASE_STORAGE_BASE = "https://bsytkjwryirsinktsblq.supabase.co/storage/v1/object/public/portfolio-videos";

function getVideoUrl(filename) {
  if (!filename) return null;
  if (filename.startsWith('http://') || filename.startsWith('https://')) return filename;
  if (typeof SUPABASE_STORAGE_BASE === 'string' && SUPABASE_STORAGE_BASE.trim() !== '') {
    return `${SUPABASE_STORAGE_BASE.trim().replace(/\/$/, '')}/${encodeURIComponent(filename)}`;
  }
  return `./${filename}`;
}

const PORTFOLIO_DATA = {
  profile: {
    name: "Olushola Shotayo",
    alias: "Sholly P",
    title: "AI & Automation Builder",
    subtitle: "AI Automation · Voice Agents · Business Workflows · AI Video Production",
    bio: "I build practical AI automations and cinematic videos that eliminate manual work and drive real results.",
    avatar: "Profile Photo.jpg",
    status: "Available for client projects & consulting",
    socials: {
      whatsapp: "08083708357",
      whatsappUrl: "https://wa.me/2348083708357?text=Hi%20Olushola,%20I'd%20like%20to%20discuss%20an%20AI%20automation%20/%20video%20project",
      email: "shollypaiauto@gmail.com",
      x: "https://x.com/OfficialShollyP",
      xHandle: "@OfficialShollyP",
      linkedin: "https://www.linkedin.com/in/olushola-shotayo",
      instagram: "https://www.instagram.com/official_sholly_p",
      igHandle: "@official_sholly_p"
    }
  },

  skills: {
    coreDomains: [
      { name: "AI Automation", icon: "cpu" },
      { name: "WhatsApp Automation", icon: "message-square" },
      { name: "Workflow Architecture", icon: "git-branch" },
      { name: "API Integrations", icon: "webhook" },
      { name: "AI Voice Agents", icon: "phone-call" },
      { name: "Business Process Automation", icon: "zap" },
      { name: "AI Video Production", icon: "video" },
      { name: "Visual Storytelling", icon: "film" },
      { name: "Client-Focused Systems", icon: "check-circle" }
    ],
    toolStack: [
      { name: "n8n", category: "Automation" },
      { name: "WhatsApp Cloud API", category: "Messaging" },
      { name: "Supabase", category: "Database" },
      { name: "Vapi Voice AI", category: "Voice Agent" },
      { name: "Airtable", category: "Database" },
      { name: "Tally", category: "Forms" },
      { name: "Twilio", category: "SMS & Voice" },
      { name: "Gmail", category: "Email Engine" },
      { name: "OpenAI", category: "AI Models" },
      { name: "Gemini", category: "Multimodal AI" },
      { name: "Google Flow", category: "AI Video" },
      { name: "Filmora", category: "Video Editing" },
      { name: "Make", category: "Automation" },
      { name: "Zapier", category: "Automation" }
    ]
  },

  projects: [
    {
      id: "churchflow-ai",
      title: "ChurchFlow AI",
      shortTitle: "ChurchFlow AI",
      category: "automation",
      categoryLabel: "WhatsApp AI",
      tagline: "Intelligent WhatsApp assistant for church community engagement.",
      need: "Congregants and first-time guests faced slow manual responses for service times, prayer requests, counseling bookings, and giving details.",
      solution: "Built a 24/7 automated WhatsApp assistant that instantly handles member inquiries, prayer requests, giving details, and first-timer welcomes.",
      highlights: [
        "Submit personal prayer requests",
        "Access church bank details",
        "Check service times and upcoming events",
        "Receive service reminders",
        "Register as a first-timer",
        "Connect with pastoral support",
        "Explore Bible books, chapters, and verses",
        "Get Bible verses for different situations"
      ],
      capabilities: [
        "Submit personal prayer requests",
        "Access church bank details",
        "Check service times and upcoming events",
        "Receive service reminders",
        "Register as a first-timer",
        "Connect with pastoral support",
        "Explore Bible books, chapters, and verses",
        "Get Bible verses for different situations"
      ],
      stack: ["WhatsApp API", "n8n", "AI Assistant"],
      mediaType: "image",
      previewImage: "ChurchFlow WhatsApp UI.png",
      videoUrl: null,
      gallery: [
        { url: "ChurchFlow WhatsApp UI.png", title: "EVF Bot WhatsApp Assistant Preview" }
      ],
      stats: [
        { label: "Availability", value: "24/7" },
        { label: "Response", value: "< 2s" },
        { label: "Channel", value: "WhatsApp" }
      ]
    },
    {
      id: "elev8-fitness",
      title: "Elev8 Fitness Hub",
      shortTitle: "Elev8 Fitness Hub",
      category: "automation",
      categoryLabel: "Gym Automation",
      tagline: "Automated member onboarding and subscription renewal system.",
      need: "Gym administrators spent hours manually tracking membership expiration dates on spreadsheets, leading to unnotified expirations and lost revenue.",
      solution: "Built an automated pipeline that registers new members, monitors active memberships daily, and automatically sends personalized renewal emails before plans expire.",
      highlights: [
        "Automated new member registration",
        "Daily expiration alerts (7d & 1d)",
        "Personalized HTML email delivery"
      ],
      stack: ["Tally", "n8n", "Airtable", "Gmail"],
      mediaType: "video",
      videoUrl: "Elev8.mp4",
      secondaryVideoUrl: "Gym Spec.mp4",
      previewImage: "Gym Workflow/Airtable Interface.png",
      gallery: [
        { url: "Gym Workflow/Airtable Interface.png", title: "Member Database" },
        { url: "Gym Workflow/Welcome mail.png", title: "Branded Welcome Email" },
        { url: "Gym Workflow/Renewal mail.png", title: "Renewal Notification" }
      ],
      stats: [
        { label: "Manual Tracking", value: "0 hrs" },
        { label: "Alert Timing", value: "7d & 1d" },
        { label: "System", value: "Automated" }
      ]
    },
    {
      id: "mama-tees-kitchen",
      title: "Mama Tee's Kitchen",
      shortTitle: "Mama Tee's Kitchen",
      category: "automation",
      categoryLabel: "Voice AI Receptionist",
      tagline: "24/7 AI phone receptionist handling food orders and table bookings.",
      need: "Staff frequently missed customer phone calls during peak lunch and dinner rushes, leading to lost meal orders, unbooked tables, and delayed catering inquiries.",
      solution: "Deployed an AI voice receptionist named 'Kemi' that answers calls naturally, takes food orders, books reservations, and sends instant alerts to the owner on WhatsApp.",
      highlights: [
        "24/7 phone call answering",
        "Takes orders & table reservations",
        "Instant WhatsApp notifications to owner"
      ],
      stack: ["Vapi Voice AI", "n8n", "Airtable", "WhatsApp"],
      mediaType: "image",
      previewImage: "Mama Tee_s Kitchen/Order Log.png",
      videoUrl: null,
      gallery: [
        { url: "Mama Tee_s Kitchen/Order Log.png", title: "Incoming Orders Log" },
        { url: "Mama Tee_s Kitchen/Reservation Log.png", title: "Table Reservations" },
        { url: "Mama Tee_s Kitchen/Vapi Assistant.png", title: "Voice Agent Configuration" }
      ],
      stats: [
        { label: "Call Coverage", value: "24/7" },
        { label: "Hold Time", value: "0 sec" },
        { label: "Alerts", value: "Instant" }
      ]
    },
    {
      id: "email-classification",
      title: "Email Classification Engine",
      shortTitle: "Email Classification Engine",
      category: "automation",
      categoryLabel: "Inbox Automation",
      tagline: "Autonomous inbox triage sorting client inquiries into departments.",
      need: "Mixed customer inquiries flooded a single business inbox, causing delayed responses, overlooked sales leads, and tedious manual email sorting.",
      solution: "Built an automated workflow that scans incoming emails and instantly routes them into the right department folders (Sales, Support, HR, Finance) in real time.",
      highlights: [
        "Instant departmental routing",
        "Automated Gmail label dispatch",
        "Zero manual sorting required"
      ],
      stack: ["Gmail API", "n8n", "Airtable"],
      mediaType: "video",
      videoUrl: "Email Classification.mp4",
      previewImage: "Email Classification/Canvas.png",
      gallery: [
        { url: "Email Classification/Canvas.png", title: "n8n Workflow Canvas" },
        { url: "Email Classification/Sales Label.png", title: "Automated Sales Label" }
      ],
      stats: [
        { label: "Sorting Time", value: "Instant" },
        { label: "Departments", value: "5 Routing Folders" },
        { label: "Manual Effort", value: "0%" }
      ]
    },
    {
      id: "the-transformers-media",
      title: "'The Transformers' Film",
      shortTitle: "'The Transformers' Film",
      category: "video",
      categoryLabel: "AI Video Production",
      tagline: "Youth convention multimedia campaign and promotional film.",
      need: "RCCG Ogun Province 27 needed a cinematic, emotionally compelling promotional video package to inspire young people and drive massive convention attendance.",
      solution: "Directed an end-to-end AI video package: scripted the narrative, engineered visual prompts, composed an AI soundtrack, and produced synchronized captions for social media.",
      highlights: [
        "Thematic narrative scriptwriting",
        "Original AI soundtrack & foley",
        "Synchronized social captions"
      ],
      stack: ["AI Video", "Prompt Craft", "Filmora", "Sound Design"],
      mediaType: "video",
      videoUrl: "The Transformer.mp4",
      previewImage: "The Transformer.mp4",
      gallery: [],
      stats: [
        { label: "Format", value: "Cinematic Film" },
        { label: "Audio", value: "Bespoke AI Score" },
        { label: "Delivery", value: "Full Suite" }
      ]
    },
    {
      id: "pas-ad-media",
      title: "Passion Accounting Software (PAS)",
      shortTitle: "Passion Accounting Software (PAS)",
      category: "video",
      categoryLabel: "Product Commercial",
      tagline: "Promotional commercial for a multi-industry Nigerian accounting solution.",
      need: "Passion Accounting Software needed a dynamic commercial to showcase its platform capabilities across pharmacies, supermarkets, wholesale and retail, farms, and hotels.",
      solution: "Directed an engaging product promo video highlighting the software's POS, inventory management, multi-branch tracking, and sales-support capabilities.",
      highlights: [
        "Multi-industry solution showcase",
        "Dynamic feature walkthrough",
        "High-conversion sales asset"
      ],
      stack: ["Product Commercial", "AI Video", "Motion Graphics", "Sales Support"],
      mediaType: "video",
      videoUrl: "PAS AD.mp4",
      previewImage: "PAS Dashboard.png",
      gallery: [
        { url: "PAS Dashboard.png", title: "Passion Accounting Software Dashboard" }
      ],
      stats: [
        { label: "Industries", value: "5+ Sectors" },
        { label: "Focus", value: "Sales & Demo" },
        { label: "Pacing", value: "Dynamic Cuts" }
      ]
    },
    {
      id: "dp-showcase",
      title: "DP Motion Showcase",
      shortTitle: "DP Motion Showcase",
      category: "video",
      categoryLabel: "AI Motion Showcase",
      tagline: "Dynamic AI character animation and stylized visual storytelling.",
      need: "Creators and digital brands need visually striking content with consistent character modeling to capture attention in fast-paced social media feeds.",
      solution: "Produced a high-energy AI motion showcase demonstrating character continuity, rhythm-matched scene cuts, and cinematic color grading.",
      highlights: [
        "Consistent character styling",
        "Rhythm-synced dynamic cuts",
        "Cinematic contrast grading"
      ],
      stack: ["Character Continuity", "AI Motion", "Color Grading"],
      mediaType: "video",
      videoUrl: "DP.mp4",
      previewImage: "DP.mp4",
      gallery: [],
      stats: [
        { label: "Style", value: "Stylized Motion" },
        { label: "Visuals", value: "Character Lock" },
        { label: "Energy", value: "High Retention" }
      ]
    }
  ],

  xPosts: [
    {
      id: "2064678350539407789",
      url: "https://x.com/OfficialShollyP/status/2064678350539407789?s=20",
      topic: "Elev8 Gym Membership Retention",
      badge: "Gym Automation 🧵",
      date: "Jun 10, 2026",
      text: "Hey gym owner — when last did a member leave without you knowing why? 🧵\n\nI'll tell you why. They expired. You didn't notice. Nobody called. Nobody emailed. They moved on.\n\nAnd you? You were busy running the gym.",
      tags: ["#Automation", "#GymCRM", "#n8n", "#NoCode"]
    },
    {
      id: "2062911792389443613",
      url: "https://x.com/OfficialShollyP/status/2062911792389443613?s=20",
      topic: "Automated Email Classification",
      badge: "Email Workflow",
      date: "Jun 5, 2026",
      text: "Your team is still sorting emails manually? Let me show you a better way.\n\nI built an automated email classification workflow using n8n that sorts incoming emails into the right department — Sales, HR, Finance, Customer Service, Operations — instantly, with zero manual effort.",
      tags: ["#n8n", "#EmailTriage", "#Automation", "#Productivity"]
    },
    {
      id: "2051298157661733049",
      url: "https://x.com/OfficialShollyP/status/2051298157661733049?s=20",
      topic: "Consulting Client Inquiry Automation",
      badge: "Inquiry Workflow",
      date: "May 4, 2026",
      text: "Just built something pretty cool — and honestly, I'm proud of how it turned out.\n\nThe task: automate how a consulting firm handles new client inquiries. No more manually sorting emails or figuring out which team gets what.\n\nHere's how the full workflow runs:",
      tags: ["#ClientOnboarding", "#WorkflowDesign", "#n8n"]
    },
    {
      id: "2048473745128325151",
      url: "https://x.com/OfficialShollyP/status/2048473745128325151?s=20",
      topic: "Lead Qualification in Make & Airtable",
      badge: "Make Automation",
      date: "Apr 26, 2026",
      text: "I just built my first Make automation and it works 😊\n\nA lead fills a form → their details go to Airtable → Make checks their budget → qualified leads get a booking link, unqualified ones get a polite decline.\n\nAll automatic. No manual sorting. No missed leads.",
      tags: ["#Make", "#Airtable", "#LeadQualification", "#Automation"]
    },
    {
      id: "2043775446274146475",
      url: "https://x.com/OfficialShollyP/status/2043775446274146475?s=20",
      topic: "First Zapier Automation Milestone",
      badge: "First Zapier Build 🚀",
      date: "Apr 13, 2026",
      text: "Just published my first automation on Zapier 🚀\n\nThe start of the automation journey — learning triggers, webhooks, and data transformation.",
      tags: ["#Zapier", "#AutomationJourney", "#BuildingInPublic"]
    }
  ],

  philosophy: [
    {
      num: "01",
      title: "Real APIs Have Real Constraints",
      desc: "Platforms have rate limits, webhook timeouts, and payload boundaries. Great automation starts with designing around failure modes, retry queues, and graceful degradations."
    },
    {
      num: "02",
      title: "Solve Real Business Friction",
      desc: "The goal of automation isn't adding complex tools — it is giving business owners their time back and ensuring no leads, orders, or members fall through the cracks."
    },
    {
      num: "03",
      title: "Architecture Beats Patchwork",
      desc: "A clean database structure with clear boundaries scales effortlessly. Quick hacks collapse on the first edge case."
    },
    {
      num: "04",
      title: "AI Video Is Directed, Not Generated",
      desc: "Generating prompts is only 20% of the craft. High-impact AI video demands deliberate storytelling, character continuity, disciplined pacing, and sound design."
    }
  ]
};
