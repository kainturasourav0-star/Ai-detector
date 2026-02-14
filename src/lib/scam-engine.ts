// Text scam detection engine - client-side heuristic analyzer
export interface ScanResult {
  riskScore: number;
  label: "Safe" | "Low Risk" | "Medium Risk" | "High Risk" | "Scam Blocked";
  flags: string[];
  details: string;
}

const RED_FLAGS = [
  { word: "lottery", weight: 20 },
  { word: "winner", weight: 18 },
  { word: "urgent", weight: 15 },
  { word: "act now", weight: 20 },
  { word: "bank account", weight: 22 },
  { word: "congratulations", weight: 15 },
  { word: "claim now", weight: 20 },
  { word: "wire transfer", weight: 25 },
  { word: "social security", weight: 25 },
  { word: "verify your", weight: 15 },
  { word: "suspended", weight: 15 },
  { word: "government official", weight: 20 },
  { word: "irs", weight: 18 },
  { word: "won", weight: 12 },
  { word: "prize", weight: 15 },
  { word: "free money", weight: 25 },
  { word: "click here", weight: 18 },
  { word: "limited time", weight: 12 },
  { word: "password", weight: 10 },
  { word: "bitcoin", weight: 10 },
  { word: "cryptocurrency", weight: 10 },
  { word: "invest now", weight: 18 },
  { word: "guaranteed", weight: 12 },
  { word: "risk-free", weight: 15 },
];

const URGENCY_PATTERNS = [
  /\b(immediately|right now|asap|hurry|expires? (today|soon)|last chance|final notice)\b/i,
  /\b(don'?t miss|don'?t delay|act fast|time.?sensitive)\b/i,
];

const URL_PATTERN = /https?:\/\/(?:[a-zA-Z]|[0-9]|[$\-_@.&+]|[!*\\(\\),]|%[0-9a-fA-F]{2})+/g;

const AUTHORITY_PATTERNS = [
  /\b(official|government|federal|department|agency|law enforcement|police)\b/i,
  /\b(your account (has been|will be|is being))\b/i,
];

export function analyzeText(text: string): ScanResult {
  const lower = text.toLowerCase();
  let score = 0;
  const flags: string[] = [];

  // Check URLs
  const urls = text.match(URL_PATTERN);
  if (urls && urls.length > 0) {
    score += 30;
    flags.push("Suspicious URL detected");
  }

  // Check red flag keywords
  for (const { word, weight } of RED_FLAGS) {
    if (lower.includes(word)) {
      score += weight;
      flags.push(`Keyword: "${word}"`);
    }
  }

  // Check urgency
  for (const pattern of URGENCY_PATTERNS) {
    if (pattern.test(lower)) {
      score += 15;
      flags.push("Urgency tactics");
      break;
    }
  }

  // Check authority claims
  for (const pattern of AUTHORITY_PATTERNS) {
    if (pattern.test(lower)) {
      score += 15;
      flags.push("Authority impersonation");
      break;
    }
  }

  // ALL CAPS detection
  const words = text.split(/\s+/);
  const capsWords = words.filter(w => w.length > 2 && w === w.toUpperCase());
  if (capsWords.length / words.length > 0.3) {
    score += 10;
    flags.push("Excessive CAPS (pressure tactic)");
  }

  // Exclamation marks
  const exclamations = (text.match(/!/g) || []).length;
  if (exclamations > 2) {
    score += 8;
    flags.push("Multiple exclamation marks");
  }

  // Cap at 100
  score = Math.min(score, 100);

  let label: ScanResult["label"];
  let details: string;

  if (score < 15) {
    label = "Safe";
    details = "No significant threat indicators found.";
  } else if (score < 35) {
    label = "Low Risk";
    details = "Minor indicators detected. Exercise normal caution.";
  } else if (score < 60) {
    label = "Medium Risk";
    details = "Multiple scam indicators found. Verify sender identity through a secondary channel.";
  } else if (score < 80) {
    label = "High Risk";
    details = "Strong scam signatures detected. Do not share personal or financial information.";
  } else {
    label = "Scam Blocked";
    details = "Critical threat level. This message has been quarantined. Do not interact with the sender.";
  }

  return { riskScore: score, label, flags: flags.slice(0, 6), details };
}
