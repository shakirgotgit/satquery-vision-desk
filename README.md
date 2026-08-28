# SatQuery Pro

We are building an SIH project called "SatQuery AI".

Problem statement:

SIH26167 — SatQuery AI: An Interactive Vision-Language Assistant for Multimodal Remote Sensing Image Analysis through Text Queries.

PROJECT PURPOSE:

SatQuery AI is an AI copilot for satellite/remote-sensing imagery. Users should be able to interact with satellite images using natural-language queries instead of manually selecting complex remote-sensing tools.

The core user workflow is:

User Query

→ AI Agent understands the query

→ Task is identified

→ Appropriate AI model/tool is selected

→ Satellite imagery is analyzed

→ Visual evidence is generated

→ Final answer is presented with confidence and supporting results.

CORE CAPABILITIES:

1. Single-image Visual Question Answering (VQA)

2. Image captioning and visual grounding

3. Bi-temporal change detection between two satellite images

4. Optical + SAR multimodal analysis

5. Agentic orchestration of the analysis workflow

FRONTEND RESPONSIBILITY:

The frontend will be responsible for:

- Natural-language query/chat interface

- Image upload

- Satellite image viewer

- Before/after image comparison

- GIS/map visualization

- Image overlays

- Spatial regions and bounding boxes

- Change maps and heatmaps

- AI analysis results

- Confidence scores

- Statistics

- Evidence visualization

- Execution trace showing the AI workflow

- Query history/dashboard

TECHNOLOGY:

Use:

- Next.js

- React

- TypeScript

- Tailwind CSS

The frontend will later connect to a separate FastAPI backend developed by another team member. Do NOT implement the backend or real AI models yet. For now, the interface should use clean mock data where necessary.

IMPORTANT ARCHITECTURE PRINCIPLE:

Do not create a generic AI chatbot website.

This must look and feel like a professional satellite intelligence / remote sensing analysis platform.

VISUAL DIRECTION:

- Dark professional satellite/space-inspired interface

- Deep navy/black backgrounds

- Blue/cyan accents

- Purple accents for AI-related elements

- Green for successful/completed workflow steps

- High information density but clean layout

- Modern dashboard design

- Professional enough for an SIH demonstration

- Responsive desktop-first design

MAIN APPLICATION CONCEPT:

Left Sidebar:

- SatQuery AI logo/name

- New Query

- Dashboard

- Single Image Analysis

- Change Detection

- Optical + SAR Analysis

- My Queries

- Datasets

- Models

- Settings

- About

Main workspace:

- Natural-language query interface

- Image upload area

- Satellite image visualization

- Analysis results

- Evidence

- Statistics

Right-side information area:

"How SatQuery AI Works"

Show the six conceptual steps:

1. Upload Data

2. Ask in Natural Language

3. AI Agent Understands

4. Selects Best Model

5. Analysis & Processing

6. Answer with Evidence

IMPORTANT:

At this stage, focus on establishing the application's overall structure, information architecture, navigation, visual language, and reusable component structure.

Do not build the complete application yet.

Do not implement real API calls.

Do not implement real AI processing.

Do not invent unsupported backend functionality.

Create a strong foundation that we can incrementally develop in later prompts.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/a2f9fe07-202c-4ee2-85e0-893826674ae9).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
