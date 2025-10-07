/**
 * Orchestrator Agent Types
 *
 * Defines types for coordinating multi-agent content creation workflow
 */

export interface ContentCreationRequest {
  /** Blog post title */
  title: string;

  /** Target keyword for SEO */
  targetKeyword: string;

  /** Search volume per month */
  searchVolume?: number;

  /** Cost per click */
  cpc?: number;

  /** Target word count */
  wordCount: number;

  /** Content category */
  category: 'executive-coaching' | 'board-advisory' | 'wellbeing' | 'leadership';

  /** Tags for the post */
  tags: string[];

  /** Strategic angle/positioning */
  angle: string;

  /** Call to action */
  cta: string;

  /** Priority level */
  priority: 'high' | 'medium' | 'low';
}

export interface WorkflowStage {
  name: string;
  status: 'pending' | 'in_progress' | 'completed' | 'failed';
  startTime?: Date;
  endTime?: Date;
  output?: any;
  error?: string;
}

export interface OrchestratorResult {
  success: boolean;
  request: ContentCreationRequest;
  stages: WorkflowStage[];
  finalOutputPath?: string;
  error?: string;
  duration: number;
}

export interface AgentConfig {
  name: string;
  enabled: boolean;
  timeout?: number;
}

export interface OrchestratorConfig {
  /** Agents to use in pipeline */
  agents: {
    research: AgentConfig;
    contentWriter: AgentConfig;
    visualAssets: AgentConfig;
    qa: AgentConfig;
    aiOptimizer: AgentConfig;
    publishing: AgentConfig;
  };

  /** Quality gates */
  qualityGates: {
    minQaScore: number;
    minAiTrustScore: number;
    requireHumanReview: boolean;
  };

  /** Output settings */
  output: {
    saveIntermediateResults: boolean;
    outputDir: string;
  };
}
