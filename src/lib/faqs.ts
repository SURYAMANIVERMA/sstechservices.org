export interface ServiceFaq {
  service: string;
  serviceHi: string;
  question: string;
  questionHi: string;
  answer: string;
  answerHi: string;
  timeline: string;
  timelineHi: string;
  needed: string;
  neededHi: string;
}

export const serviceFaqs: ServiceFaq[] = [
  {
    service: "Network Installation", serviceHi: "नेटवर्क इंस्टॉलेशन",
    question: "How long does a new office network installation take?", questionHi: "नए ऑफिस नेटवर्क की स्थापना में कितना समय लगता है?",
    answer: "A small office is often completed in 2–5 working days. Multi-floor or multi-site networks require a survey and phased plan.", answerHi: "छोटा ऑफिस नेटवर्क सामान्यतः 2–5 कार्यदिवस में पूरा होता है। मल्टी-फ्लोर या मल्टी-साइट नेटवर्क के लिए सर्वे और चरणबद्ध योजना बनती है।",
    timeline: "Typical time: 2–5 days after survey", timelineHi: "अनुमानित समय: सर्वे के बाद 2–5 दिन",
    needed: "Share user count, floor plan, internet links and Wi-Fi coverage needs.", neededHi: "यूज़र संख्या, फ्लोर प्लान, इंटरनेट लिंक और Wi-Fi कवरेज की जरूरत साझा करें।",
  },
  {
    service: "Structured Cabling", serviceHi: "स्ट्रक्चर्ड केबलिंग",
    question: "What information is needed for a cabling quotation?", questionHi: "केबलिंग कोटेशन के लिए कौन-सी जानकारी चाहिए?",
    answer: "We need outlet count, cable category, floor layout, rack location and whether testing or certification is required.", answerHi: "हमें आउटलेट संख्या, केबल कैटेगरी, फ्लोर लेआउट, रैक की जगह और टेस्टिंग या सर्टिफिकेशन की जरूरत जाननी होती है।",
    timeline: "Typical time: 3–10 days", timelineHi: "अनुमानित समय: 3–10 दिन",
    needed: "Floor plan, endpoint count, cable type and site access hours.", neededHi: "फ्लोर प्लान, एंडपॉइंट संख्या, केबल प्रकार और साइट एक्सेस समय।",
  },
  {
    service: "Server Installation", serviceHi: "सर्वर इंस्टॉलेशन",
    question: "Can you install and migrate business servers?", questionHi: "क्या आप बिज़नेस सर्वर इंस्टॉल और माइग्रेट कर सकते हैं?",
    answer: "Yes. We handle rack installation, operating systems, virtualization, storage, backup and planned workload migration.", answerHi: "हाँ। हम रैक इंस्टॉलेशन, ऑपरेटिंग सिस्टम, वर्चुअलाइजेशन, स्टोरेज, बैकअप और योजनाबद्ध वर्कलोड माइग्रेशन करते हैं।",
    timeline: "Typical time: 1–7 days", timelineHi: "अनुमानित समय: 1–7 दिन",
    needed: "Server model, workloads, storage size, downtime window and backup status.", neededHi: "सर्वर मॉडल, वर्कलोड, स्टोरेज आकार, डाउनटाइम विंडो और बैकअप स्थिति।",
  },
  {
    service: "IT Support & AMC", serviceHi: "IT सपोर्ट और AMC",
    question: "What is covered under an IT AMC?", questionHi: "IT AMC में क्या-क्या शामिल होता है?",
    answer: "Coverage can include preventive maintenance, helpdesk, remote support, onsite visits, patching and incident response under an agreed SLA.", answerHi: "AMC में तय SLA के अनुसार प्रिवेंटिव मेंटेनेंस, हेल्पडेस्क, रिमोट सपोर्ट, ऑनसाइट विज़िट, पैचिंग और समस्या समाधान शामिल हो सकते हैं।",
    timeline: "Onboarding usually takes 2–5 days", timelineHi: "ऑनबोर्डिंग सामान्यतः 2–5 दिन",
    needed: "Device inventory, locations, business hours, current issues and preferred SLA.", neededHi: "डिवाइस सूची, स्थान, कार्य समय, मौजूदा समस्याएँ और पसंदीदा SLA।",
  },
  {
    service: "CCTV Installation", serviceHi: "CCTV इंस्टॉलेशन",
    question: "How many CCTV cameras does my site need?", questionHi: "मेरी साइट पर कितने CCTV कैमरे चाहिए?",
    answer: "Camera count depends on entry points, blind spots, recording quality, retention days and remote-viewing requirements. A site survey gives the correct design.", answerHi: "कैमरों की संख्या प्रवेश बिंदुओं, ब्लाइंड स्पॉट, रिकॉर्डिंग गुणवत्ता, स्टोरेज अवधि और रिमोट व्यू जरूरत पर निर्भर करती है। सही डिजाइन के लिए साइट सर्वे किया जाता है।",
    timeline: "Typical time: 1–5 days after survey", timelineHi: "अनुमानित समय: सर्वे के बाद 1–5 दिन",
    needed: "Site layout, priority areas, retention days, internet and power availability.", neededHi: "साइट लेआउट, प्राथमिक क्षेत्र, रिकॉर्डिंग अवधि, इंटरनेट और बिजली की उपलब्धता।",
  },
  {
    service: "System Administration", serviceHi: "सिस्टम एडमिनिस्ट्रेशन",
    question: "Do you provide remote Linux and Windows administration?", questionHi: "क्या आप रिमोट Linux और Windows एडमिनिस्ट्रेशन देते हैं?",
    answer: "Yes. Our team can manage users, updates, security hardening, backups, performance and scheduled maintenance remotely or onsite.", answerHi: "हाँ। हमारी टीम यूज़र, अपडेट, सिक्योरिटी हार्डनिंग, बैकअप, परफॉर्मेंस और निर्धारित मेंटेनेंस रिमोट या ऑनसाइट संभाल सकती है।",
    timeline: "Initial assessment: 1–2 days", timelineHi: "प्रारंभिक आकलन: 1–2 दिन",
    needed: "OS versions, server count, access method, current alerts and support window.", neededHi: "OS वर्ज़न, सर्वर संख्या, एक्सेस तरीका, मौजूदा अलर्ट और सपोर्ट समय।",
  },
  {
    service: "OpenShift & Linux Support", serviceHi: "OpenShift और Linux सपोर्ट",
    question: "Can you troubleshoot OpenShift and Kubernetes production issues?", questionHi: "क्या आप OpenShift और Kubernetes की production समस्याएँ हल कर सकते हैं?",
    answer: "Yes. We support cluster health, deployments, networking, storage, upgrades, CI/CD and Linux platform issues.", answerHi: "हाँ। हम क्लस्टर हेल्थ, डिप्लॉयमेंट, नेटवर्किंग, स्टोरेज, अपग्रेड, CI/CD और Linux प्लेटफ़ॉर्म समस्याओं में सहायता करते हैं।",
    timeline: "Triage can begin within agreed support hours", timelineHi: "तय सपोर्ट समय में जाँच शुरू की जा सकती है",
    needed: "Platform version, topology, logs, impact, recent changes and support access.", neededHi: "प्लेटफ़ॉर्म वर्ज़न, टोपोलॉजी, लॉग, प्रभाव, हाल के बदलाव और सपोर्ट एक्सेस।",
  },
  {
    service: "Cloud & Monitoring", serviceHi: "क्लाउड और मॉनिटरिंग",
    question: "Can you monitor cloud and on-premise systems together?", questionHi: "क्या आप cloud और on-premise सिस्टम को एक साथ मॉनिटर कर सकते हैं?",
    answer: "Yes. We can centralize infrastructure, application and alert monitoring with tools such as Prometheus, Grafana, Zabbix and Nagios.", answerHi: "हाँ। हम Prometheus, Grafana, Zabbix और Nagios जैसे टूल से इंफ्रास्ट्रक्चर, एप्लिकेशन और अलर्ट मॉनिटरिंग को एक जगह ला सकते हैं।",
    timeline: "Typical setup: 3–10 days", timelineHi: "अनुमानित सेटअप: 3–10 दिन",
    needed: "Cloud accounts, asset list, important metrics, alert contacts and retention needs.", neededHi: "क्लाउड अकाउंट, एसेट सूची, महत्वपूर्ण मेट्रिक्स, अलर्ट संपर्क और डेटा अवधि।",
  },
  {
    service: "IT Manpower Support", serviceHi: "IT मैनपावर सपोर्ट",
    question: "Can you deploy engineers for short or long-term IT projects?", questionHi: "क्या आप छोटे या लंबे IT प्रोजेक्ट के लिए इंजीनियर उपलब्ध करा सकते हैं?",
    answer: "Yes. We provide screened L1, L2 and L3 engineers for project assignments, onsite support and longer engagements.", answerHi: "हाँ। हम प्रोजेक्ट कार्य, ऑनसाइट सपोर्ट और लंबी अवधि के लिए जाँचे हुए L1, L2 और L3 इंजीनियर उपलब्ध कराते हैं।",
    timeline: "Profiles usually shared in 2–7 days", timelineHi: "प्रोफाइल सामान्यतः 2–7 दिन में",
    needed: "Required skills, level, location, shift, duration and joining date.", neededHi: "आवश्यक कौशल, स्तर, स्थान, शिफ्ट, अवधि और जॉइनिंग तारीख।",
  },
];