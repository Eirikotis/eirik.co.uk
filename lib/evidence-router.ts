export type EvidenceKey =
  | "career"
  | "bittensor"
  | "kpmg"
  | "oneClickLabs"
  | "gartner"
  | "dusd"
  | "technical"
  | "commercial"
  | "education"
  | "roleFit"
  | "workSystems"
  | "financialSystems"
  | "claimBoundaries";

type Rule = { key: EvidenceKey; terms: RegExp[] };

const rules: Rule[] = [
  { key: "kpmg", terms: [/\bkpmg\b/i, /financial services?/i, /assurance/i, /audit/i, /bank|hedge fund|asset manager|private equity|pension|fintech/i, /controls?|reconciliation|operational risk/i] },
  { key: "bittensor", terms: [/bittensor|opentensor|\btao\b/i, /\bvoid\b/i, /autoresearch|auto research/i, /\bai\b|artificial intelligence|decentrali[sz]ed ai/i, /compute|inference/i, /subnet|token economics|incentive system/i, /morpho|cross-chain|collateral|liquidation|oracle/i] },
  { key: "oneClickLabs", terms: [/one click labs?|\bocl\b/i, /defi investment|portfolio optimi[sz]ation|monte carlo/i, /lending market|amm liquidity/i] },
  { key: "gartner", terms: [/gartner/i, /nordic market|prospecting|contract value/i] },
  { key: "dusd", terms: [/dusd/i, /solana/i, /burn infrastructure|supply analytics/i, /daily visitors?|on-chain product/i] },
  { key: "education", terms: [/warwick|education|degree|university|accounting and finance/i, /\baca\b|icaew|exam/i, /scholarship|2:1|69%/i] },
  { key: "technical", terms: [/can (?:he|eirik) code|coding|programming|software|engineer/i, /python|typescript|next\.?js|react|node\.?js|\bsql\b/i, /api|data pipeline|machine learning|backtest/i, /linux|vps|deployment|automation/i, /technical (?:background|ability|skills?)/i] },
  { key: "commercial", terms: [/partnership|business development|\bbd\b/i, /commercial|go-to-market|\bgtm\b|sales/i, /investor|partner|client-facing|stakeholder/i, /founder'?s associate|ceo office|strategy and operations/i] },
  { key: "career", terms: [/career|experience|chronology|timeline|résumé|resume|\bcv\b/i, /where has (?:he|eirik) worked|what has (?:he|eirik) worked on/i, /employer|employment|roles? has/i] },
  { key: "claimBoundaries", terms: [/did (?:he|eirik) found|founder|employed by/i, /profitable|fundrais|scaled|revenue|tvl|alpha/i, /claim|attribution|official/i] },
];

const broadOnly = /^(?:who is eirik|tell me about (?:eirik|him)|what is (?:eirik|he) like|what (?:interests|motivates) (?:eirik|him)|what(?:'s| is) (?:his|eirik'?s) (?:greatest |biggest )?weakness)\??$/i;
const genericFollowUp = /^(?:what about (?:that|this|it|him)|tell me more|why|how so|go on|and\??|what else)\??$/i;
const implicitEirikProfessionalReference = /(?:my|your)\s+(?:professional\s+)?(?:background|experience|career|work history)/i;

function score(text: string, rule: Rule) {
  return rule.terms.reduce((total, term) => total + (term.test(text) ? 1 : 0), 0);
}

export function selectEvidenceKeys(question: string, recentUserQuestions: string[] = []): EvidenceKey[] {
  const current = question.trim();
  if (broadOnly.test(current)) return [];

  // Eirik often tests his own site in the first person, while visitors can
  // naturally address the interface in the second person. Both still mean
  // Eirik's supplied professional history, not the anonymous visitor's.
  if (implicitEirikProfessionalReference.test(current)) {
    return ["career"];
  }

  // Explicit job titles and role-fit requests outrank incidental technology or
  // project words inside a pasted job description.
  if (/product manager|product management|product role/i.test(current)) {
    return ["roleFit", "technical", "bittensor"];
  }
  if (/finance manager|financial controller|accounting role/i.test(current)) {
    return ["roleFit", "kpmg", "education"];
  }
  if (/finance analyst|financial analyst|\bfp&a\b|financial planning and analysis|commercial finance|finance business partner|financial performance|forecast variances?|finance.{0,30}(?:sql|data team|reporting tools?)/i.test(current)) {
    return ["roleFit", "kpmg", "technical"];
  }
  if (/software engineer|software engineering|engineering role|research scientist/i.test(current)) {
    return ["roleFit", "technical"];
  }
  if (/enterprise (?:account executive|sales)|pure sales|sales role|salesperson/i.test(current)) {
    return ["roleFit", "commercial", "gartner"];
  }
  if (/strategy\s*(?:&|and)\s*operations|strategy\s*(?:&|and)\s*ops|founder'?s associate|ceo office|operations? manager|operations? management/i.test(current)) {
    return ["roleFit", "commercial", "kpmg"];
  }
  if (/partnership|business development|\bbd\b/i.test(current) && /ai|infrastructure|compute|inference/i.test(current)) {
    return ["bittensor", "commercial", "gartner"];
  }
  if (/would you hire (?:eirik|him)|what roles? (?:suit|fit)|best roles? for|career fit/i.test(current)) {
    return ["roleFit"];
  }

  if (/(?:build|built) outside (?:of )?(?:crypto|web3|defi)|non[- ]crypto (?:build|project|system)/i.test(current)) {
    return ["technical", "kpmg"];
  }
  if (/credit protocol|morpho|collateral (?:system|design|asset)|oracle (?:system|architecture)|liquidation (?:system|architecture)/i.test(current)) {
    return ["bittensor"];
  }
  if (/financial products?/i.test(current)) {
    return ["financialSystems"];
  }
  if (/(?:build|built|made|created|worked on|done).{0,30}lending|lending.{0,30}(?:build|built|made|created|worked on|done)/i.test(current)) {
    return ["bittensor", "oneClickLabs"];
  }
  if (/(?:build|built|made|created|worked).{0,25}(?:\bai\b|ai system|machine learning|\bml\b)|(?:\bai\b|machine learning|\bml\b).{0,25}(?:build|built|made|created|experience|work)/i.test(current)) {
    return ["bittensor"];
  }
  if (/quantitative (?:auto[- ]?research|research system)|research system.{0,30}(?:signal|alpha|market|trying)|walk[- ]forward|out[- ]of[- ]time holdout/i.test(current)) {
    return ["bittensor"];
  }
  if (/(?:build|built|created|worked with).{0,25}(?:data systems?|data infrastructure|pipelines?)|(?:data systems?|data infrastructure|pipelines?).{0,25}(?:build|built|created|experience)/i.test(current)) {
    return ["workSystems", "technical"];
  }
  if (/can (?:he|eirik) actually code/i.test(current)) {
    return ["technical", "workSystems"];
  }
  if (/(?:build|built|made|created|worked on|experience|done).{0,25}(?:infrastructure|systems?)|(?:infrastructure|systems?).{0,25}(?:build|built|made|created|experience|work|done)/i.test(current)) {
    return ["workSystems"];
  }
  if (/most (?:technically |technical )?(?:complex|substantial)|hardest technical|deepest technical/i.test(current)) {
    return ["workSystems"];
  }
  if (/what (?:has|did) (?:he|eirik) (?:actually )?(?:build|built|make|made|create|created)|what (?:systems?|products?|tools?) (?:has|did) (?:he|eirik) (?:actually )?(?:build|built|make|made|create|created)|has (?:he|eirik) built real products?|can (?:he|eirik) actually build/i.test(current)) {
    return ["workSystems"];
  }
  if (/did (?:he|eirik) work for (?:bittensor|opentensor)|was (?:his|eirik'?s) bittensor work paid|paid.{0,20}bittensor|bittensor.{0,20}(?:paid|compensated|employment)/i.test(current)) {
    return ["bittensor", "claimBoundaries"];
  }
  if (/what(?:'s| is) (?:his|eirik'?s) bittensor experience|bittensor experience/i.test(current)) {
    return ["bittensor"];
  }
  if (/is dusd (?:a )?(?:meme|community) coin|meme token|community token/i.test(current)) {
    return ["dusd", "claimBoundaries"];
  }

  let ranked = rules
    .map((rule, index) => ({ key: rule.key, score: score(current, rule), index }))
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score || a.index - b.index);

  if (!ranked.length && genericFollowUp.test(current)) {
    const prior = recentUserQuestions.slice(-2).join(" ");
    ranked = rules
      .map((rule, index) => ({ key: rule.key, score: score(prior, rule), index }))
      .filter((item) => item.score > 0)
      .sort((a, b) => b.score - a.score || a.index - b.index);
  }

  return ranked.slice(0, 3).map((item) => item.key);
}

export function normalizeQuestionForModel(question: string) {
  if (!implicitEirikProfessionalReference.test(question)) return question;
  return question.replace(
    /\b(?:my|your)\s+((?:professional\s+)?(?:background|experience|career|work history))\b/gi,
    "Eirik's $1",
  );
}
