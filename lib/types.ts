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
  industryOutlook: {
    currentState: string;
    trendDirection: "rapidly_automating" | "moderately_automating" | "slowly_automating" | "stable";
    keyDrivers: string[];
    notableCompanies: string[];
  };
  timelinePhases: {
    phase: string;
    timeframe: string;
    description: string;
    impactLevel: "minimal" | "moderate" | "significant" | "transformative";
  }[];
  taskAnalysis: {
    task: string;
    automationRisk: number;
    explanation: string;
    currentAICapability: string;
    toolsAvailable: string[];
  }[];
  salaryImpact: {
    currentOutlook: string;
    projectedChange: string;
    highValueSkills: string[];
    emergingRoles: string[];
  };
  learningRoadmap: {
    title: string;
    description: string;
    timeframe: string;
    priority: "critical" | "high" | "medium";
    resources: string[];
  }[];
  aiTools: {
    name: string;
    description: string;
    url: string;
    category: string;
    pricing: string;
  }[];
  videoResources: {
    title: string;
    description: string;
    url: string;
    platform: string;
    duration: string;
  }[];
  aiMasterySequence?: {
    step: number;
    title: string;
    description: string;
    videoUrl: string;
    videoTitle: string;
    channel: string;
    duration: string;
    keyTakeaways: string[];
  }[];
  skillsAIMap?: {
    skill: string;
    currentApproach: string;
    aiApproach: string;
    toolRecommendation: string;
    timeSavedPerWeek: string;
    proactiveAdvantage: string;
  }[];
  automationPlaybook: {
    task: string;
    howToAutomate: string;
    timeSaved: string;
    difficulty: "easy" | "medium" | "advanced";
    examplePrompt?: string;
  }[];
  futureProofStrategies: {
    strategy: string;
    explanation: string;
    actionSteps: string[];
  }[];
  immediateActions: {
    action: string;
    why: string;
    timeToComplete: string;
  }[];
}
