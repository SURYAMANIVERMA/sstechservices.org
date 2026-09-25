import cablingImg from "@/assets/project-cabling.jpg";
import cctvImg from "@/assets/project-cctv.jpg";
import serverImg from "@/assets/project-server.jpg";
import cloudImg from "@/assets/project-cloud.jpg";

export interface ProjectEntry {
  id: string;
  image: string;
  service: string;
  serviceHi: string;
  title: string;
  titleHi: string;
  client: string;
  clientHi: string;
  location: string;
  summary: string;
  summaryHi: string;
  status: "verification-pending";
}

export const projectDrafts: ProjectEntry[] = [
  {
    id: "structured-cabling",
    image: cablingImg,
    service: "Structured Cabling",
    serviceHi: "स्ट्रक्चर्ड केबलिंग",
    title: "Structured cabling project",
    titleHi: "स्ट्रक्चर्ड केबलिंग प्रोजेक्ट",
    client: "Client details pending verification",
    clientHi: "क्लाइंट विवरण सत्यापन के बाद",
    location: "Lucknow, Uttar Pradesh",
    summary: "Verified scope, site photographs and measurable outcomes will be published after client approval.",
    summaryHi: "क्लाइंट की अनुमति के बाद सत्यापित कार्यक्षेत्र, साइट फोटो और परिणाम प्रकाशित किए जाएँगे।",
    status: "verification-pending",
  },
  {
    id: "server-installation",
    image: serverImg,
    service: "Server Installation",
    serviceHi: "सर्वर इंस्टॉलेशन",
    title: "Server infrastructure project",
    titleHi: "सर्वर इंफ्रास्ट्रक्चर प्रोजेक्ट",
    client: "Client details pending verification",
    clientHi: "क्लाइंट विवरण सत्यापन के बाद",
    location: "Uttar Pradesh",
    summary: "This card is reserved for an authenticated SS TECH SERVICES deployment record.",
    summaryHi: "यह कार्ड SS TECH SERVICES के सत्यापित डिप्लॉयमेंट रिकॉर्ड के लिए आरक्षित है।",
    status: "verification-pending",
  },
  {
    id: "cctv-installation",
    image: cctvImg,
    service: "CCTV Installation",
    serviceHi: "CCTV इंस्टॉलेशन",
    title: "CCTV and surveillance project",
    titleHi: "CCTV और सर्विलांस प्रोजेक्ट",
    client: "Client details pending verification",
    clientHi: "क्लाइंट विवरण सत्यापन के बाद",
    location: "Uttar Pradesh",
    summary: "Actual camera count, coverage plan and commissioning details will be added with supporting photos.",
    summaryHi: "वास्तविक कैमरा संख्या, कवरेज योजना और कमीशनिंग विवरण फोटो के साथ जोड़े जाएँगे।",
    status: "verification-pending",
  },
  {
    id: "cloud-monitoring",
    image: cloudImg,
    service: "Cloud & Monitoring",
    serviceHi: "क्लाउड और मॉनिटरिंग",
    title: "Cloud monitoring project",
    titleHi: "क्लाउड मॉनिटरिंग प्रोजेक्ट",
    client: "Client details pending verification",
    clientHi: "क्लाइंट विवरण सत्यापन के बाद",
    location: "India",
    summary: "The final case study will show the approved monitoring scope, tools and operational outcome.",
    summaryHi: "अंतिम केस स्टडी में स्वीकृत मॉनिटरिंग कार्यक्षेत्र, टूल और संचालन परिणाम दिखाए जाएँगे।",
    status: "verification-pending",
  },
];