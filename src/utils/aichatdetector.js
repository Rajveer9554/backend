// greeting detection

export function detectGreeting(message) {

    const greetings = [
        "hello", "hi", "namaste", "kaise ho", "how are you", "tum kaise ho",
        "prnam", "pranam ji"];
        // "i" flag case‑insensitive matching and "\\b" word boundary ensure करता है कि "hello123" जैसी चीज़ match न हो।
    return greetings.some(g => new RegExp(`\\b${g}\\b`, "i").test(message));

}

// Date query detection

export function detectDateQuery(message){
    return /\b(date|aaj|today)\b/i.test(message);
}
// ✅ Department detection
export function detectDepartment(message) {
  const departmentRules = [
    { dept: "Public Works Department (PWD)", keywords: ["road", "sadak", "pothole", "road repair","dirty water collection on road", "road traffic road transport"] },
    { dept: "Water Supply Department", keywords: ["pani", "water", "pipeline", "water supply", "dirty water"] },
    { dept: "Municipal Corporation", keywords: ["garbage", "kuda", "cleaning", "drainage"] },
    { dept: "Electricity Department", keywords: ["bijli", "electricity", "power", "light", "street light"] },
    {dept:"DM" , keywords:["dm","district magistrate","district officer"]},
    {dept:"SDM" , keywords:["sdm","sub divisional magistrate","sub dm"]},
    {dept:"Jal Nigam" , keywords:["jal nigam","jal vibhag","water board"]},
    {dept:"RTO" , keywords:["rto","transport","vehicle","traffic"]},

  ];

  const msg = message.toLowerCase();
  for (const rule of departmentRules) {
    if (rule.keywords.some(k => msg.includes(k))) {
      return rule.dept;
    }
  }
  return null;
}

// language detction (hindi / english)
// ✅ Application request detection
export function detectApplicationRequest(message) {
  const applicationKeywords = [
    "application likho",
    "application ka formate",
    "application kaise likhe",
    "application likh kr do",
    "write complaints application in english",
    "give application formate",
    "write application in english on road",
    "write application in english on water supply",
    "complaint application",
    "write complaint letter",
    "application banao",
    "complaint likh do"
  ];

  return applicationKeywords.some(kw =>
    message.toLowerCase().includes(kw)
  );
}


export function detectLanguage(message){
    if(/english/i.test(message)) return "English";
    if(/hindi/i.test(message)) return "Hindi";

    const hasEnglish= /[a-zA-Z]/.test(message);
    const hasHindi = /[\u0900-\u097F]/.test(message);

    if (hasEnglish && hasHindi) return "English"; // default hinglish -> english
    return hasEnglish ? "English" :"Himndi"
}