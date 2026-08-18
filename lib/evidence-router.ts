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

function score(text: string, rule: Rule) {
  return rule.terms.reduce((total, term) => total + (term.test(text) ? 1 : 0), 0);
}

export function selectEvidenceKeys(question: string, recentUserQuestions: string[] = []): EvidenceKey[] {
  const current = question.trim();
  if (broadOnly.test(current)) return [];

  if (/product manager|product management|product role/i.test(current)) {
    return ["roleFit", "technical", "bittensor"];
  }
  if (/finance manager|financial controller|accounting role/i.test(current)) {
    return ["roleFit", "kpmg", "education"];
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
  if (/would you hire (?:eirik|him)|what roles? (?:suit|fit)|best roles? for|career fit/i.test(current)) {
    return ["roleFit"];
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

  if (/what (?:has|did) (?:he|eirik) build|what has (?:he|eirik) actually built/i.test(current)) {
    return ["technical", "bittensor", "dusd"];
  }

  if (/partnership|business development|\bbd\b/i.test(current) && /ai|infrastructure|compute|inference/i.test(current)) {
    return ["bittensor", "commercial", "gartner"];
  }

  return ranked.slice(0, 3).map((item) => item.key);
}
