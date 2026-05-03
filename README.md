
```
 ██████╗ ███████╗████████╗██████╗  █████╗ ███████╗ █████╗
██╔══██╗██╔════╝╚══██╔══╝██╔══██╗██╔══██╗██╔════╝██╔══██╗
███████║███████╗   ██║   ██████╔╝███████║█████╗  ███████║
██╔══██║╚════██║   ██║   ██╔══██╗██╔══██║██╔══╝  ██╔══██║
██║  ██║███████║   ██║   ██║  ██║██║  ██║███████╗██║  ██║
╚═╝  ╚═╝╚══════╝   ╚═╝   ╚═╝  ╚═╝╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝
```

### `ASTRAEA // TERRA`
**Observing Earth from above — real-time natural event tracker powered by NASA EONET & GDACS**

![Next.js](https://img.shields.io/badge/Next.js_15-black?style=for-the-badge&logo=next.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![shadcn/ui](https://img.shields.io/badge/shadcn%2Fui-000000?style=for-the-badge&logo=shadcnui&logoColor=white)
![NASA](https://img.shields.io/badge/NASA_EONET-E03C31?style=for-the-badge&logo=nasa&logoColor=white)
![Free & Open Source](https://img.shields.io/badge/Free%20%26%20Open%20Source-00CC66?style=for-the-badge)

---

## Overview

**ASTRAEA** is a real-time Earth event monitoring dashboard that aggregates live natural disaster and environmental event data from NASA's Earth Observatory Natural Event Tracker (EONET) and the Global Disaster Alert and Coordination System (GDACS).

Track wildfires, earthquakes, floods, droughts, volcanic activity, severe storms, sea ice, and more — all in one place, updated live.

---

## Features

- **Live event feed** — real-time data from NASA EONET v3 + GDACS
- **Smart search** — filter events by name, category, or country
- **Category filters** — Wildfires, Earthquakes, Floods, Droughts, Volcanoes, Sea Ice, and more
- **Time window selector** — 1 week up to 3 months of historical data
- **Reverse geocoding** — country resolution via BigDataCloud
- **Fully responsive** — works on mobile, tablet, and desktop

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16.2.4 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| UI Components | shadcn/ui |
| Icons | React Icons, Lucide React | 
| Data Sources | NASA EONET v3, GDACS |
| Geocoding | BigDataCloud API |

---

## Getting Started

### Prerequisites

- Node.js 18+
- npm / yarn / pnpm

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/keshavarun20/astraea
cd astraea

# 2. Install dependencies
npm install

# 3. Set up environment variables
cp .env.example .env.local

# 4. Run the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.
```

---

## 🖥️ Usage

Once running, the dashboard gives you:

**Header** — shows live event count, active time window, number of sources, and feed status at a glance.

**Sidebar** — use the category buttons to filter events by type (Wildfires, Earthquakes, Floods, etc.), and use the time window selector to choose how far back to look (1 week → 3 months).

**Event Grid** — scrollable list of all matching events. Each card shows:
- Event type & category code
- Event name and description
- Data source (EONET or GDACS)
- Alert level (for GDACS events)
- Date and coordinates
- Country flag and name (via reverse geocoding)

**Search** — type in the header search bar to instantly filter events by name, category, or country.

---

## 📁 Project Structure

```
astraea/
├── app/
│   ├── layout.tsx              # Root layout
│   ├── page.tsx                # Home / dashboard
│   ├── globals.css             # Global styles
│   ├── providers.tsx           # Client providers
│   └── api/
│       ├── eonet/
│       │   └── route.ts        # NASA EONET v3 proxy
│       ├── gdacs/
│       │   └── route.ts        # GDACS proxy
│       └── location/
│           └── route.ts        # BigDataCloud reverse geocoding
├── components/
│   ├── ui/                     # shadcn/ui primitives
│   ├── header.tsx              # Top header bar
│   ├── sidebar.tsx             # Category filters & time window
│   ├── event-grid.tsx          # Events list / grid
│   ├── event-card.tsx          # Individual event card
│   └── footer.tsx              # Footer with data source credits
├── lib/
│   ├── hooks/
│   │   ├── useEonet.ts         # EONET data fetching hook
│   │   └── useIsMobile.ts      # Mobile breakpoint hook
│   ├── constants.ts            # Event categories, time windows
│   ├── types.ts                # Shared TypeScript types
│   └── utils.ts                # Utility functions
└── public/
```

---

## 🌐 Data Sources

| Source | Description | Link |
|---|---|---|
| NASA EONET v3 | Earth Observatory Natural Event Tracker | [eonet.gsfc.nasa.gov](https://eonet.gsfc.nasa.gov/) |
| GDACS | Global Disaster Alert and Coordination System | [gdacs.org](https://www.gdacs.org/) |
| BigDataCloud | Reverse geocoding API | [bigdatacloud.com](https://www.bigdatacloud.com/) |

---

## 📊 Event Categories

| Code | Category |
|---|---|
| `WF` | Wildfires |
| `EQ` | Earthquakes |
| `FL` | Floods |
| `DR` | Drought |
| `VO` | Volcanoes |
| `SS` | Severe Storms |
| `SLI` | Sea and Lake Ice |
| `LS` | Landslides |
| `SN` | Snow |
| `DH` | Dust and Haze |
| `MM` | Manmade |

---

## 📄 License

**ASTRAEA is free and open source.**

Do whatever you want with it — use it, modify it, build on top of it, deploy it. No restrictions. No warranties. Just credit appreciated but not required.

---