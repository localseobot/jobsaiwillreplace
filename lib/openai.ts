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

export const PAID_REPORT_PROMPT = `You are an AI career strategist and job market analyst. Based on the survey data provided, generate a comprehensive JSON report about AI's impact on this person's job AND actionable guidance.

Return ONLY valid JSON matching this exact structure:
{
  "riskScore": <number 0-100>,
  "timelineEstimate": "<string>",
  "summary": "<3-4 sentence detailed summary>",
  "tasksAtRisk": ["<task>", ...],
  "tasksResistant": ["<task>", ...],
  "taskAnalysis": [
    {
      "task": "<specific task from their job>",
      "automationRisk": <number 0-100>,
      "explanation": "<why this task is/isn't at risk>",
      "toolsAvailable": ["<AI tool that can help with this task>", ...]
    }
  ],
  "learningRoadmap": [
    {
      "title": "<skill to learn>",
      "description": "<why and how to learn it>",
      "timeframe": "<e.g. '1-2 months'>"
    }
  ],
  "aiTools": [
    {
      "name": "<tool name>",
      "description": "<what it does for their role>",
      "url": "<real URL to the tool>"
    }
  ],
  "videoResources": [
    {
      "title": "<video/course title>",
      "description": "<what they'll learn>",
      "url": "<real URL to YouTube or course>"
    }
  ],
  "futureProofStrategies": [
    "<actionable strategy 1>",
    "<actionable strategy 2>",
    ...
  ]
}

Be specific to their role and industry. Include REAL tools, courses, and resources that exist. Provide at least 4 items in taskAnalysis, 3 in learningRoadmap, 4 in aiTools, 3 in videoResources, and 5 in futureProofStrategies.`;
