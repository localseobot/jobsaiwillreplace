export interface SurveyData {
  jobTitle: string;
  industry: string;
  yearsExperience: string;
  primaryTasks: string[];
  repetitivePercent: number;
  usesAI: string;
  educationLevel: string;
}

export interface FreeReport {
  riskScore: number;
  timelineEstimate: string;
  summary: string;
  tasksAtRisk: string[];
  tasksResistant: string[];
}

export interface PaidReport extends FreeReport {
  taskAnalysis: {
    task: string;
    automationRisk: number;
    explanation: string;
    toolsAvailable: string[];
  }[];
  learningRoadmap: {
    title: string;
    description: string;
    timeframe: string;
  }[];
  aiTools: {
    name: string;
    description: string;
    url: string;
  }[];
  videoResources: {
    title: string;
    description: string;
    url: string;
  }[];
  futureProofStrategies: string[];
}
