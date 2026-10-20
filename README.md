# SPARK IUCEE RVCE

The official website for SPARK, the IUCEE Student Chapter at RV College of
Engineering, Bengaluru. The site showcases the chapter's activities, projects,
podcasts, wings, achievements, office bearers, and student opportunities.

## Highlights

- Responsive homepage with the SPARK hero section and event showcase.
- Information about the chapter, its vision, mission, and wings.
- Activities, projects, podcasts, achievements, and office bearer pages.
- Recruitment announcement marquee with configurable calls to action.
- Recruitment popup with session-based dismissal.
- Google Form registration integration.
- Responsive navigation, animations, SEO metadata, and accessibility support.

## Technology

- **React 19** for the user interface.
- **Vite** for development and production builds.
- **React Router 7** for client-side routing.
- **Tailwind CSS 4** for utility-first styling.
- **Framer Motion** for page and component animations.
- **Lucide React** for icons.
- **Oxlint** for linting.

## Project Structure

```text
Spark-IUCEE/
├── public/                         # Public files and static assets
│   ├── images/                     # Logos, event photos, and other images
│   └── project-documents/          # Project reports and presentations
├── src/
│   ├── components/                 # Shared site-wide components
│   │   ├── Navbar.jsx
│   │   ├── Footer.jsx
│   │   ├── PageShell.jsx
│   │   ├── RecruitmentMarquee.jsx
│   │   ├── RecruitmentPopup.jsx
│   │   ├── Preloader.jsx
│   │   ├── Reveal.jsx
│   │   └── ScrollToTopButton.jsx
│   ├── config/
│   │   └── recruitmentConfig.js    # Recruitment feature configuration
│   ├── data/                        # Structured event, project, and achievement data
│   ├── features/                    # Page-specific components and assets
│   │   ├── home/
│   │   ├── activities/
│   │   ├── achievements/
│   │   ├── contact-us/
│   │   ├── credits/
│   │   ├── office-bearers/
│   │   ├── podcasts/
│   │   ├── projects/
│   │   ├── registrations/
│   │   └── wings/
│   ├── App.jsx                      # Router and application shell
│   ├── index.css                    # Global styles and marquee animation
│   └── main.jsx                     # Application entry point
├── package.json
├── vite.config.js
└── README.md
```

## Routes

| Route | Page | Purpose |
| --- | --- | --- |
| `/` | Home | Hero, chapter information, dignitaries, and wings |
| `/office-bearers` | Office Bearers | Faculty advisors and student committee |
| `/wings` | Wings | SPARK wing descriptions |
| `/activities` | Activities | Events, workshops, and activity highlights |
| `/podcasts` | Podcasts | The Insight podcast series |
| `/projects` | Projects | Student project showcase |
| `/achievements` | Achievements | Chapter achievements and timeline |
| `/registrations` | Registrations | Active recruitment and registration opportunities |
| `/contact-us` | Contact Us | Contact information and enquiry form |
| `/credits` | Credits | Development and contributor credits |

## Recruitment Configuration

Recruitment behavior is centralized in
[`src/config/recruitmentConfig.js`](./src/config/recruitmentConfig.js).
Update this file when recruitment opens, closes, or moves to a different
registration form.

```js
const recruitmentConfig = {
  recruitmentEnabled: true,
  showRecruitmentPopup: true,
  registrationUrl: 'https://docs.google.com/forms/d/e/FORM_ID/viewform',
};
```

### Configuration fields

| Field | Type | Description |
| --- | --- | --- |
| `recruitmentEnabled` | `boolean` | Master switch for recruitment UI. Set to `false` to hide the marquee. |
| `showRecruitmentPopup` | `boolean` | Controls the delayed homepage recruitment popup independently of the marquee. |
| `registrationUrl` | `string` | The Google Form URL used by “Register Now” buttons and the registrations page. |

Both the marquee and popup validate the configured URL before rendering an
external registration link. Use an HTTPS Google Form URL whenever possible.
The “Know More” action always routes to `/registrations`, where recruitment
details are maintained in the registrations feature.

### Disabling recruitment

To temporarily hide recruitment announcements:

```js
const recruitmentConfig = {
  recruitmentEnabled: false,
  showRecruitmentPopup: false,
  registrationUrl: 'https://docs.google.com/forms/d/e/FORM_ID/viewform',
};
```

When `recruitmentEnabled` is `false`, the recruitment marquee and popup do not
render. The registration page route remains available for existing content.

## Getting Started

### Prerequisites

- Node.js 18 or later.
- npm.

### Install

```bash
git clone https://github.com/spark-rvce/Spark-IUCEE.git
cd Spark-IUCEE
npm install
```

### Run locally

Start the Vite development server:

```bash
npm run dev
```

Open the local URL printed by Vite, usually
`http://localhost:5173`.

### Build and preview

Create a production build:

```bash
npm run build
```

Preview the generated build locally:

```bash
npm run preview
```

The generated files are written to `dist/`.

### Lint

Run the project linter:

```bash
npm run lint
```

## Content and Asset Updates

- Place browser-served assets in `public/` and reference them with root paths
  such as `/images/example.jpg`.
- Keep page-specific components and assets inside the matching
  `src/features/<feature>/` directory.
- Keep shared UI behavior in `src/components/`.
- Keep repeated structured content in `src/data/` rather than embedding large
  datasets in page components.
- Update relevant SEO metadata when adding or changing a public route.

## Accessibility and Responsive Behavior

The site is designed for desktop, tablet, and mobile layouts. Interactive
elements include visible focus styles, and recruitment marquee motion pauses
when the user has enabled `prefers-reduced-motion`. New components should
preserve keyboard access, meaningful labels, sufficient contrast, and reduced
motion behavior.

## Contributing

1. Create a feature branch from `main`.
2. Keep changes scoped to the feature being updated.
3. Follow the existing React, Tailwind, and routing conventions.
4. Run `npm run lint` and `npm run build` before opening a pull request.
5. Include a clear description of the user-facing behavior and validation
   performed.

## License and Branding

SPARK, IUCEE, and RVCE names and logos are used for the chapter website.
Follow the repository's existing branding and asset usage conventions when
adding new content.
