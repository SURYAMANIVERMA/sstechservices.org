import {
  Network, Cable, Server, Headphones, Camera, Settings,
  Cloud, Users, Shield, LucideIcon, MonitorCog
} from "lucide-react";

export interface Service {
  slug: string;
  title: string;
  titleHi: string;
  short: string;
  shortHi: string;
  description: string;
  icon: LucideIcon;
  features: string[];
}

export const services: Service[] = [
  {
    slug: "network-installation",
    title: "Network Installation",
    titleHi: "नेटवर्क इंस्टॉलेशन",
    short: "Reliable LAN, WAN & Wi-Fi networks engineered to scale.",
    shortHi: "भरोसेमंद और विस्तार योग्य LAN, WAN और Wi-Fi नेटवर्क।",
    description: "Design, deployment and optimization of enterprise-grade wired & wireless networks with high availability and security at the core.",
    icon: Network,
    features: ["LAN / WAN design", "Enterprise Wi-Fi", "Switches & Routers", "VLAN & Firewall setup"],
  },
  {
    slug: "structured-cabling",
    title: "Structured Cabling",
    titleHi: "स्ट्रक्चर्ड केबलिंग",
    short: "Certified Cat6/Cat6A and fiber backbone installations.",
    shortHi: "प्रमाणित Cat6/Cat6A और फाइबर बैकबोन इंस्टॉलेशन।",
    description: "End-to-end structured cabling solutions for offices, factories and data centers — neatly dressed, labeled and performance-tested.",
    icon: Cable,
    features: ["Cat6 / Cat6A / Fiber", "Cable management", "Patch panel termination", "TIA/EIA certification"],
  },
  {
    slug: "server-installation",
    title: "Server Installation",
    titleHi: "सर्वर इंस्टॉलेशन",
    short: "Rack, stack & configure servers for any workload.",
    shortHi: "हर वर्कलोड के लिए सर्वर रैकिंग, इंस्टॉलेशन और कॉन्फ़िगरेशन।",
    description: "Physical and virtual server deployment with high availability, redundancy and storage best practices for production-grade reliability.",
    icon: Server,
    features: ["Rack mounting", "OS & hypervisor setup", "Storage & RAID", "Backup & recovery"],
  },
  {
    slug: "it-support",
    title: "IT Support & AMC",
    titleHi: "IT सपोर्ट और AMC",
    short: "24×7 support contracts that keep your business running.",
    shortHi: "आपके व्यवसाय को चालू रखने वाला 24×7 सपोर्ट और AMC।",
    description: "Onsite & remote IT support with defined SLAs, preventive maintenance and rapid incident response.",
    icon: Headphones,
    features: ["Onsite & remote support", "Annual maintenance contracts", "Helpdesk & ticketing", "SLA-driven response"],
  },
  {
    slug: "cctv-installation",
    title: "CCTV Installation",
    titleHi: "CCTV इंस्टॉलेशन",
    short: "IP & analog surveillance with remote monitoring.",
    shortHi: "रिमोट मॉनिटरिंग के साथ IP और एनालॉग निगरानी।",
    description: "Design and deployment of HD/4K CCTV systems with NVR/DVR, remote access and integration with access control.",
    icon: Camera,
    features: ["IP & HD CCTV", "NVR / DVR setup", "Remote viewing", "Access control"],
  },
  {
    slug: "system-administration",
    title: "System Administration",
    titleHi: "सिस्टम एडमिनिस्ट्रेशन",
    short: "Linux & Windows admin done right, every day.",
    shortHi: "Linux और Windows सिस्टम का भरोसेमंद दैनिक प्रबंधन।",
    description: "Experienced sysadmins to manage your servers, users, patches and security — so your IT just works.",
    icon: Settings,
    features: ["User & policy mgmt", "Patch management", "Performance tuning", "Security hardening"],
  },
  {
    slug: "openshift-linux",
    title: "OpenShift & Linux Support",
    titleHi: "OpenShift और Linux सपोर्ट",
    short: "Container, Kubernetes & RHEL expertise on tap.",
    shortHi: "Container, Kubernetes और RHEL की विशेषज्ञ सहायता।",
    description: "Specialized Red Hat OpenShift, Kubernetes and enterprise Linux engineering for modern, container-native workloads.",
    icon: MonitorCog,
    features: ["OpenShift / Kubernetes", "RHEL / CentOS / Ubuntu", "CI/CD pipelines", "Container migration"],
  },
  {
    slug: "cloud-monitoring",
    title: "Cloud & Monitoring",
    titleHi: "क्लाउड और मॉनिटरिंग",
    short: "AWS, Azure & observability that catches issues early.",
    shortHi: "AWS, Azure और समस्याओं की समय पर पहचान करने वाली मॉनिटरिंग।",
    description: "Cloud migration, infrastructure-as-code and 24×7 observability with Prometheus, Grafana, Zabbix & Nagios.",
    icon: Cloud,
    features: ["AWS / Azure / GCP", "Prometheus & Grafana", "Zabbix / Nagios", "Cost optimization"],
  },
  {
    slug: "it-manpower",
    title: "IT Manpower Support",
    titleHi: "IT मैनपावर सपोर्ट",
    short: "Skilled engineers deployed to your IT projects.",
    shortHi: "आपके IT प्रोजेक्ट के लिए कुशल इंजीनियर।",
    description: "On-demand and long-term IT manpower — L1/L2/L3 engineers, network admins and project resources for your in-house teams.",
    icon: Users,
    features: ["L1 / L2 / L3 engineers", "Project-based deployment", "Contract / FTE", "Pre-screened talent"],
  },
];

export const getService = (slug: string) => services.find(s => s.slug === slug);

export { Shield };
