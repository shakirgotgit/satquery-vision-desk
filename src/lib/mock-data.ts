/**
 * Mock data for the SatQuery AI interface.
 * Replaced later by the FastAPI backend. No real inference happens here.
 */

export type TaskType =
  | "vqa"
  | "captioning"
  | "grounding"
  | "change-detection"
  | "sar-fusion";

export const taskLabels: Record<TaskType, string> = {
  vqa: "Visual Question Answering",
  captioning: "Image Captioning",
  grounding: "Visual Grounding",
  "change-detection": "Bi-temporal Change Detection",
  "sar-fusion": "Optical + SAR Fusion",
};

export type TraceStatus = "done" | "running" | "pending";

export interface TraceStep {
  id: string;
  title: string;
  detail: string;
  status: TraceStatus;
  durationMs?: number;
}

export interface Detection {
  id: string;
  label: string;
  confidence: number;
  /** Normalised 0-1 box: x, y, width, height */
  box: { x: number; y: number; w: number; h: number };
}

export interface Statistic {
  label: string;
  value: string;
  hint?: string;
}

export interface AnalysisResult {
  id: string;
  query: string;
  task: TaskType;
  model: string;
  answer: string;
  confidence: number;
  createdAt: string;
  detections: Detection[];
  statistics: Statistic[];
  trace: TraceStep[];
}

export const workflowSteps = [
  {
    step: 1,
    title: "Upload Data",
    detail: "Optical, SAR or bi-temporal scenes with geo metadata.",
  },
  {
    step: 2,
    title: "Ask in Natural Language",
    detail: "\u201cHow much farmland was lost between 2019 and 2024?\u201d",
  },
  {
    step: 3,
    title: "AI Agent Understands",
    detail: "Intent parsing, region resolution and task classification.",
  },
  {
    step: 4,
    title: "Selects Best Model",
    detail: "Routes to VQA, grounding, change or SAR fusion models.",
  },
  {
    step: 5,
    title: "Analysis & Processing",
    detail: "Tiling, inference, masks, heatmaps and statistics.",
  },
  {
    step: 6,
    title: "Answer with Evidence",
    detail: "Grounded answer, confidence and visual evidence overlays.",
  },
] as const;

export const mockTrace: TraceStep[] = [
  {
    id: "parse",
    title: "Query understanding",
    detail: "Intent: quantify change · AOI: uploaded scene extent",
    status: "done",
    durationMs: 240,
  },
  {
    id: "task",
    title: "Task identification",
    detail: "Classified as bi-temporal change detection",
    status: "done",
    durationMs: 180,
  },
  {
    id: "model",
    title: "Model selection",
    detail: "ChangeFormer-B2 selected (SAR fallback available)",
    status: "done",
    durationMs: 90,
  },
  {
    id: "infer",
    title: "Inference & tiling",
    detail: "512px tiles · 64px overlap · 36 tiles processed",
    status: "running",
    durationMs: 4120,
  },
  {
    id: "evidence",
    title: "Evidence generation",
    detail: "Change mask, heatmap and per-class area statistics",
    status: "pending",
  },
  {
    id: "answer",
    title: "Answer synthesis",
    detail: "Grounded natural-language response with confidence",
    status: "pending",
  },
];

export const mockResult: AnalysisResult = {
  id: "qry_4821",
  query: "What changed in the urban area between the two acquisitions?",
  task: "change-detection",
  model: "ChangeFormer-B2",
  answer:
    "Built-up area expanded by approximately 3.42 km² in the north-east quadrant, mainly replacing bare soil and low vegetation. Two new road corridors and one reservoir extension are visible in the change mask.",
  confidence: 0.87,
  createdAt: "2026-08-28T12:04:00Z",
  detections: [
    { id: "d1", label: "New built-up cluster", confidence: 0.91, box: { x: 0.52, y: 0.18, w: 0.26, h: 0.2 } },
    { id: "d2", label: "Road corridor", confidence: 0.78, box: { x: 0.14, y: 0.58, w: 0.42, h: 0.09 } },
    { id: "d3", label: "Water body extension", confidence: 0.83, box: { x: 0.2, y: 0.22, w: 0.16, h: 0.18 } },
  ],
  statistics: [
    { label: "Changed area", value: "3.42 km²", hint: "+12.4% vs. baseline" },
    { label: "Change pixels", value: "184,502", hint: "of 1.49M analysed" },
    { label: "Mean confidence", value: "0.87", hint: "per-tile average" },
    { label: "Processing time", value: "6.8 s", hint: "36 tiles" },
  ],
  trace: mockTrace,
};

export interface QueryHistoryItem {
  id: string;
  query: string;
  task: TaskType;
  confidence: number;
  status: "completed" | "running" | "failed";
  createdAt: string;
  scene: string;
}

export const mockHistory: QueryHistoryItem[] = [
  {
    id: "qry_4821",
    query: "What changed in the urban area between the two acquisitions?",
    task: "change-detection",
    confidence: 0.87,
    status: "completed",
    createdAt: "2026-08-28T12:04:00Z",
    scene: "Sentinel-2 · Pune AOI",
  },
  {
    id: "qry_4818",
    query: "How many aircraft are parked on the apron?",
    task: "vqa",
    confidence: 0.93,
    status: "completed",
    createdAt: "2026-08-27T16:41:00Z",
    scene: "WorldView-3 · Airfield tile",
  },
  {
    id: "qry_4815",
    query: "Highlight all flooded farmland in this SAR scene.",
    task: "sar-fusion",
    confidence: 0.74,
    status: "completed",
    createdAt: "2026-08-27T09:12:00Z",
    scene: "Sentinel-1 GRD + S2",
  },
  {
    id: "qry_4811",
    query: "Describe the coastal infrastructure visible here.",
    task: "captioning",
    confidence: 0.81,
    status: "completed",
    createdAt: "2026-08-26T18:55:00Z",
    scene: "Sentinel-2 · Coastal AOI",
  },
  {
    id: "qry_4809",
    query: "Locate the bridge crossing the river.",
    task: "grounding",
    confidence: 0.68,
    status: "failed",
    createdAt: "2026-08-26T11:20:00Z",
    scene: "Cartosat-3 · River tile",
  },
];

export interface DatasetItem {
  id: string;
  name: string;
  sensor: string;
  modality: "Optical" | "SAR" | "Multimodal";
  scenes: number;
  resolution: string;
  updatedAt: string;
}

export const mockDatasets: DatasetItem[] = [
  { id: "ds1", name: "Urban Growth Pune", sensor: "Sentinel-2 L2A", modality: "Optical", scenes: 24, resolution: "10 m", updatedAt: "2026-08-24" },
  { id: "ds2", name: "Flood Monitoring Assam", sensor: "Sentinel-1 GRD", modality: "SAR", scenes: 18, resolution: "20 m", updatedAt: "2026-08-21" },
  { id: "ds3", name: "Coastal Erosion Gujarat", sensor: "Sentinel-1 + 2", modality: "Multimodal", scenes: 31, resolution: "10 m", updatedAt: "2026-08-19" },
  { id: "ds4", name: "Airfield Inventory", sensor: "WorldView-3", modality: "Optical", scenes: 12, resolution: "0.3 m", updatedAt: "2026-08-12" },
];

export interface ModelItem {
  id: string;
  name: string;
  task: TaskType;
  backbone: string;
  status: "ready" | "planned";
  metric: string;
}

export const mockModels: ModelItem[] = [
  { id: "m1", name: "RSVQA-Lite", task: "vqa", backbone: "ViT-B/16 + LLM adapter", status: "ready", metric: "78.4% acc (RSVQA-HR)" },
  { id: "m2", name: "GeoCaption", task: "captioning", backbone: "BLIP-2 (RS finetune)", status: "ready", metric: "0.62 CIDEr" },
  { id: "m3", name: "GroundRS", task: "grounding", backbone: "GroundingDINO", status: "ready", metric: "0.71 mIoU" },
  { id: "m4", name: "ChangeFormer-B2", task: "change-detection", backbone: "Siamese transformer", status: "ready", metric: "0.89 F1 (LEVIR-CD)" },
  { id: "m5", name: "SARFuse", task: "sar-fusion", backbone: "Dual-encoder fusion", status: "planned", metric: "benchmark pending" },
];
