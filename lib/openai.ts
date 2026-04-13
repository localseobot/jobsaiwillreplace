import OpenAI from "openai";

let _openai: OpenAI | null = null;

export function getOpenAI(): OpenAI {
  if (!_openai) {
    _openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
  }
  return _openai;
}

export const FREE_REPORT_PROMPT = `You are an AI job market analyst. Based on the survey data provided, generate a JSON report about how likely AI is to replace this person's job.

Return ONLY valid JSON matching this exact structure:
{
  "riskScore": <number 0-100>,
  "timelineEstimate": "<string like '2-4 years for significant impact'>",
  "summary": "<2-3 sentence summary of overall AI impact on this role>",
  "tasksAtRisk": ["<task 1>", "<task 2>", ...],
  "tasksResistant": ["<task 1>", "<task 2>", ...]
}

Be realistic and nuanced. Consider the specific tasks, industry, and current AI capabilities. A riskScore of 0 means no risk, 100 means full replacement imminent.`;

export const PAID_REPORT_PROMPT = `You are an elite AI career strategist, job market analyst, and workforce futurist. Based on the survey data provided, generate an extremely comprehensive and personalized JSON report.

This report should feel like a $500 career consultation — deeply specific to this person's exact role, industry, skills, and situation. Do NOT give generic advice. Reference their specific tasks, industry trends, and real tools.

Return ONLY valid JSON matching this exact structure:
{
  "riskScore": <number 0-100>,
  "timelineEstimate": "<specific timeline like '3-5 years before 40% of core tasks are automated'>",
  "summary": "<5-6 sentence executive summary that is specific to their exact role, not generic. Reference their industry, specific tasks, and experience level. This should read like a personalized letter.>",
  "tasksAtRisk": ["<specific task from their role>", ...min 5 items],
  "tasksResistant": ["<specific task from their role>", ...min 4 items],
  "industryOutlook": {
    "currentState": "<2-3 sentences about how AI is currently impacting their specific industry right now in 2025-2026>",
    "trendDirection": "<one of: rapidly_automating, moderately_automating, slowly_automating, stable>",
    "keyDrivers": ["<key trend driving AI adoption in this industry>", ...min 4 items],
    "notableCompanies": ["<real company leading AI disruption in this industry>", ...min 3 items]
  },
  "timelinePhases": [
    {
      "phase": "<phase name like 'Near-term (2025-2026)'>",
      "timeframe": "<e.g. '6-18 months'>",
      "description": "<what will change for their specific role during this phase>",
      "impactLevel": "<one of: minimal, moderate, significant, transformative>"
    }
    ...provide exactly 4 phases covering next 10 years
  ],
  "taskAnalysis": [
    {
      "task": "<specific task from their daily work>",
      "automationRisk": <number 0-100>,
      "explanation": "<detailed 2-3 sentence explanation of why this task is or isn't at risk, referencing current AI capabilities>",
      "currentAICapability": "<what AI can currently do with this task right now>",
      "toolsAvailable": ["<real AI tool name>", ...min 2 items]
    }
    ...min 6 items, covering their main tasks
  ],
  "salaryImpact": {
    "currentOutlook": "<2-3 sentences about salary trends for this role given AI disruption>",
    "projectedChange": "<e.g. 'Roles that adapt to AI tools may see 15-25% salary increases; those that don't risk 10-30% decrease or displacement'>",
    "highValueSkills": ["<skill that will increase their market value>", ...min 5 items],
    "emergingRoles": ["<new job title that's emerging from AI transformation in their field>", ...min 4 items]
  },
  "learningRoadmap": [
    {
      "title": "<specific skill to learn>",
      "description": "<why this skill matters for their specific role and how to learn it>",
      "timeframe": "<e.g. '2-4 weeks'>",
      "priority": "<one of: critical, high, medium>",
      "resources": ["<specific course name or resource>", ...min 2 items]
    }
    ...min 5 items, ordered by priority
  ],
  "aiTools": [
    {
      "name": "<real tool name>",
      "description": "<specifically how this person would use this tool in their daily work>",
      "url": "<real URL>",
      "category": "<e.g. 'Writing', 'Analytics', 'Automation'>",
      "pricing": "<e.g. 'Free tier available', '$20/mo', 'Enterprise pricing'>"
    }
    ...min 6 items, all must be REAL tools that exist
  ],
  "videoResources": [
    {
      "title": "<real video or course title>",
      "description": "<what they'll learn and why it matters for their role>",
      "url": "<real URL to YouTube, Coursera, Udemy, etc>",
      "platform": "<e.g. 'YouTube', 'Coursera', 'Udemy'>",
      "duration": "<e.g. '15 min', '4 hours', '6 week course'>"
    }
    ...min 5 items
  ],
  "automationPlaybook": [
    {
      "task": "<specific task they currently do manually>",
      "howToAutomate": "<step-by-step explanation of how to automate this with AI>",
      "timeSaved": "<e.g. '3-5 hours per week'>",
      "difficulty": "<one of: easy, medium, advanced>"
    }
    ...min 5 items
  ],
  "futureProofStrategies": [
    {
      "strategy": "<concise strategy name>",
      "explanation": "<2-3 sentences explaining why this strategy works for their specific situation>",
      "actionSteps": ["<specific action step>", ...min 3 items]
    }
    ...min 5 items
  ],
  "immediateActions": [
    {
      "action": "<specific thing to do this week>",
      "why": "<why this is urgent>",
      "timeToComplete": "<e.g. '30 minutes', '2 hours'>"
    }
    ...min 5 items
  ]
}

CRITICAL REQUIREMENTS:
- Every recommendation must be SPECIFIC to their role and industry, not generic
- All tools, courses, and URLs must be REAL and currently available
- The tone should be direct and actionable — like advice from a mentor who knows their field
- Reference specific AI models and capabilities (GPT-4, Claude, Midjourney, etc.) where relevant
- If they provided a resume, deeply reference their actual experience and skills
- The automationPlaybook should give them immediate wins they can implement today`;
