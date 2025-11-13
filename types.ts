export interface PrdResponse {
  title: string;
  prd_markdown: string;
  prd_html: string;
  open_questions: string[];
  assumptions: string[];
  vibecoding_prompt: string;
  completeness_score?: number;
  security_analysis?: SecurityAnalysis;
  project_estimate?: ProjectEstimate;
}

// Represents the PRD state during the two-phase generation
export type PartialPrdResponse = {
  title: string;
  prd_markdown: string;
  prd_html?: string;
  open_questions?: string[];
  assumptions?: string[];
  vibecoding_prompt?: string;
  completeness_score?: number;
  security_analysis?: SecurityAnalysis;
  project_estimate?: ProjectEstimate;
}

export interface SavedPrd extends PrdResponse {
  id: string;
  createdAt: string;
  updatedAt?: string;
  version: number;
  parentId?: string;
  tags?: string[];
}

export interface SecurityAnalysis {
  overall_risk: 'low' | 'medium' | 'high';
  vulnerabilities: SecurityIssue[];
  recommendations: string[];
  compliance_notes: string[];
}

export interface SecurityIssue {
  severity: 'low' | 'medium' | 'high' | 'critical';
  category: string;
  description: string;
  mitigation: string;
}

export interface ProjectEstimate {
  complexity: 'simple' | 'moderate' | 'complex' | 'very_complex';
  estimated_hours: {
    min: number;
    max: number;
  };
  estimated_cost: {
    min: number;
    max: number;
    currency: string;
  };
  team_size_recommended: number;
  timeline_weeks: {
    min: number;
    max: number;
  };
  breakdown: {
    frontend: number;
    backend: number;
    design: number;
    testing: number;
    deployment: number;
  };
  with_ai: {
    estimated_hours: {
      min: number;
      max: number;
    };
    estimated_cost: {
      min: number;
      max: number;
      currency: string;
    };
    time_reduction_percentage: number;
  };
}

export interface PrdTemplate {
  id: string;
  name: string;
  description: string;
  structure: string;
  category: 'mobile' | 'web' | 'api' | 'feature' | 'platform' | 'custom';
}
