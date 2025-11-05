import React from 'react';

const Documentation: React.FC = () => {
    const tocItems = [
        { id: 'overview', title: '1. Overview' },
        { id: 'system-requirements', title: '2. System Requirements' },
        { id: 'installation', title: '3. Installation Guide' },
        { id: 'architecture', title: '4. Architecture & Design' },
        { id: 'api-reference', title: '5. API / Interface' },
        { id: 'deployment', title: '6. Deployment & Operations' },
        { id: 'troubleshooting', title: '7. Troubleshooting' },
        { id: 'contributing', title: '8. Contributing' },
        { id: 'appendix', title: '9. Appendix' },
    ];

    const DocSection: React.FC<{ id: string, title: string, children: React.ReactNode }> = ({ id, title, children }) => (
        <section id={id} className="mb-12 scroll-mt-24">
            <h2 className="text-3xl font-bold border-b border-gray-300 dark:border-gray-700 pb-3 mb-6 text-brand-text-primary dark:text-dark-brand-text-primary">{title}</h2>
            <div className="prose dark:prose-invert max-w-none text-brand-text-secondary dark:text-dark-brand-text-secondary text-lg leading-relaxed space-y-6">
                {children}
            </div>
        </section>
    );

    const CodeBlock: React.FC<{ children: React.ReactNode }> = ({ children }) => (
        <pre className="bg-gray-800 text-gray-200 p-4 rounded-lg overflow-x-auto text-sm">
            <code>{children}</code>
        </pre>
    );

    return (
        <div className="flex flex-col lg:flex-row gap-12 animate-fade-in">
            {/* Table of Contents */}
            <aside className="lg:w-1/4 xl:w-1/5">
                <nav className="sticky top-24">
                    <h3 className="text-xl font-semibold mb-4 text-brand-text-primary dark:text-dark-brand-text-primary">On this page</h3>
                    <ul className="space-y-2">
                        {tocItems.map(item => (
                            <li key={item.id}>
                                <a href={`#${item.id}`} className="text-brand-secondary dark:text-dark-brand-secondary hover:text-brand-primary dark:hover:text-dark-brand-primary transition-colors text-base font-medium">{item.title}</a>
                            </li>
                        ))}
                    </ul>
                </nav>
            </aside>

            {/* Main Content */}
            <article className="lg:w-3/4 xl:w-4/5">
                <DocSection id="overview" title="1. Overview">
                    <h3 className="text-2xl font-semibold">What The System Does</h3>
                    <p>The ARC Smart Agriculture Dashboard is a modern, real-time web application designed to visualize sensor data for a smart agriculture project. It provides a comprehensive overview of both soil conditions and greenhouse atmospheric data on a single, user-friendly interface.</p>
                    <p>The dashboard displays key metrics such as:</p>
                    <ul>
                        <li><strong>Soil Data:</strong> Moisture, Temperature, Electrical Conductivity (EC), pH, and NPK (Nitrogen, Phosphorus, Potassium) levels.</li>
                        <li><strong>Greenhouse Data:</strong> Air Temperature, Humidity, Pressure, Altitude, Light Intensity, and air quality metrics (CO, Smoke, general quality).</li>
                    </ul>
                    <p>It also features an AI-powered analysis tool that uses the Google Gemini API to interpret the combined sensor data, provide a summary, identify observations, and offer actionable recommendations.</p>
                    
                    <h3 className="text-2xl font-semibold mt-8">High-Level Data Flow</h3>
                    <p>The application operates by fetching data from external sources, processing it, and then rendering it for the user. The AI component acts as an additional layer of analysis on top of this data.</p>
                    <CodeBlock>{`+------------------+      (1) Fetches Data      +--------------------+
|                  | ------------------------>  | Oracle APEX APIs   |
|   React Client   |                            | (Soil & Greenhouse)|
| (User's Browser) | <------------------------  +--------------------+
|                  |    (2) Returns JSON Data
+--------+---------+
         |
         | (3) User Requests AI Analysis
         | (Sends latest sensor data)
         v
+--------+---------+      (4) Sends Prompt      +--------------------+
| services/        | ------------------------>  | Google Gemini API  |
| geminiService.ts |                            |                    |
|                  | <------------------------  +--------------------+
+--------+---------+  (5) Returns JSON Analysis
         |
         | (6) AI Response is Displayed in UI
         | (7) If Critical, sends alert
         v
+--------+---------+
| services/        |
| webhookService.ts| ------------------------> +--------------------+
|                  |     (8) POST request       |   n8n Webhook      |
+------------------+                            +--------------------+`}</CodeBlock>
                </DocSection>

                <DocSection id="system-requirements" title="2. System Requirements">
                    <p>The application is web-based and OS-agnostic, designed to run on any modern device and browser.</p>
                    <ul>
                        <li><strong>Operating System:</strong> Windows, macOS, Linux, iOS, or Android.</li>
                        <li><strong>Web Browser:</strong> An up-to-date version of Google Chrome, Mozilla Firefox, Microsoft Edge, or Apple Safari.</li>
                        <li><strong>For Development:</strong> Node.js v18.x or higher is required to run the local development server.</li>
                    </ul>
                </DocSection>

                <DocSection id="installation" title="3. Installation Guide">
                    <p>This project is configured with a "no-build" setup using import maps, meaning it can run directly in a browser without a complex build process. For local development, a simple static file server is required.</p>
                    <ol>
                        <li><strong>Download the Codebase:</strong> Save all the project files into a single folder on your local machine.</li>
                        <li><strong>Set Up Environment Variables:</strong> The application requires an API key for the Google Gemini API. For local testing, you can temporarily replace <code>process.env.API_KEY</code> in <code>services/geminiService.ts</code> with your key string. <strong>Remember to remove it before committing any code!</strong></li>
                        <li><strong>Install a Local Web Server:</strong> The easiest way is using the <code>serve</code> package via <code>npx</code>.
                            <CodeBlock>npx serve</CodeBlock>
                        </li>
                        <li><strong>Run the Application:</strong> Open your web browser and navigate to the local address provided by the server (e.g., <code>http://localhost:3000</code>).</li>
                    </ol>
                </DocSection>

                <DocSection id="architecture" title="4. Architecture & Design">
                    <h3 className="text-2xl font-semibold">Folder & File Structure</h3>
                    <p>The project is organized by feature and function, separating UI components, data services, and core application logic.</p>
                    <CodeBlock>{`/
├── assets/
├── components/
│   ├── AIAnalysis.tsx        # Manages fetching and displaying AI insights.
│   ├── Dashboard.tsx         # The main dashboard view container.
│   ├── Documentation.tsx     # This documentation page.
│   ├── GreenhousePanel.tsx   # Displays all metrics for the greenhouse.
│   ├── Header.tsx            # Top navigation bar with status and theme switcher.
│   ├── MetricCard.tsx        # Reusable card for a single prominent metric.
│   └── ... (other UI components)
├── services/
│   ├── geminiService.ts      # Handles communication with the Google Gemini API.
│   ├── greenhouseService.ts  # Fetches data from the greenhouse sensor API.
│   ├── supabaseService.ts    # Fetches soil data from the Oracle APEX API.
│   └── webhookService.ts     # Sends alerts to the n8n webhook.
├── App.tsx                   # Main component: manages state, routing, and data fetching.
├── index.html                # HTML entry point with import maps.
├── index.tsx                 # Root React script.
├── sw.js                     # Service Worker script for PWA features.
└── types.ts                  # All TypeScript type definitions.
`}</CodeBlock>
                    <h3 className="text-2xl font-semibold mt-8">Component Hierarchy</h3>
                    <CodeBlock>{`- App.tsx
  ├── Header.tsx
  ├── (Router logic)
  │   ├── Dashboard.tsx
  │   │   ├── RefreshControl.tsx
  │   │   ├── MetricCard.tsx (multiple)
  │   │   ├── GreenhousePanel.tsx
  │   │   ├── AIAnalysis.tsx
  │   │   └── ... (other dashboard components)
  │   └── Documentation.tsx
  └── Footer.tsx
`}</CodeBlock>
                </DocSection>
                
                <DocSection id="api-reference" title="5. API / Interface">
                    <p>This documents the functions within the <code>services/</code> directory, which act as the internal API for the frontend.</p>
                    <div className="space-y-4">
                        <div>
                            <strong><code>fetchSoilData(limit?: number): Promise&lt;SoilData[]&gt;</code></strong>
                            <p>Fetches historical soil sensor data from the Oracle APEX API, maps it to the internal <code>SoilData</code> type, and sorts it chronologically.</p>
                        </div>
                        <div>
                            <strong><code>fetchGreenhouseData(limit?: number): Promise&lt;GreenhouseData[]&gt;</code></strong>
                            <p>Fetches historical greenhouse environmental data and maps it to the <code>GreenhouseData</code> type.</p>
                        </div>
                         <div>
                            <strong><code>getCombinedAnalysis(soilData, greenhouseData): Promise&lt;AIAnalysisResponse&gt;</code></strong>
                            <p>Sends the latest sensor data to the Google Gemini API. It constructs a detailed prompt and defines a strict JSON schema to ensure a predictable response structure.</p>
                        </div>
                         <div>
                            <strong><code>sendAlertToWebhook(analysis, email): Promise&lt;void&gt;</code></strong>
                            <p>Sends an alert to the n8n webhook if the analysis priority is "Warning" or "Critical". It formats the payload and sends it as a "fire-and-forget" POST request.</p>
                        </div>
                    </div>
                </DocSection>

                 <DocSection id="deployment" title="6. Deployment & Operations">
                    <p>This application is a collection of static files. It can be deployed to any static web hosting provider like Vercel, Netlify, or AWS S3.</p>
                    <h3 className="text-2xl font-semibold mt-8">Environment Variables</h3>
                    <p>The most critical step is managing the <code>API_KEY</code>. <strong>DO NOT</strong> hardcode the API key in the code. Your hosting provider must support environment variables. You will need to set a variable named <code>API_KEY</code> and find a way to substitute it into the JavaScript file during a build/deployment step.</p>
                </DocSection>

                <DocSection id="troubleshooting" title="7. Troubleshooting">
                     <table className="w-full text-left">
                        <thead className="bg-gray-100 dark:bg-gray-800">
                            <tr><th className="p-3">Symptom</th><th className="p-3">Possible Cause</th><th className="p-3">Fix</th></tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                            <tr><td className="p-3">Page is blank on load.</td><td className="p-3">A critical JavaScript error occurred.</td><td className="p-3">Open the Browser Developer Console (`F12`) and check for errors.</td></tr>
                            <tr><td className="p-3">"Dashboard Critical Error" message.</td><td className="p-3">The Oracle APEX API for soil data is down.</td><td className="p-3">Check your internet connection and verify the API URL in <code>services/supabaseService.ts</code>.</td></tr>
                            <tr><td className="p-3">AI Analysis fails.</td><td className="p-3">The Gemini API key is missing or invalid.</td><td className="p-3">Ensure your <code>API_KEY</code> is set correctly in your deployment environment.</td></tr>
                        </tbody>
                    </table>
                </DocSection>

                <DocSection id="contributing" title="8. Contributing">
                    <p>Contributions to the ARC Smart Agriculture Dashboard are welcome! Please follow these guidelines to ensure a smooth process.</p>
                    <h3 className="text-2xl font-semibold mt-8">Reporting Issues</h3>
                    <p>If you find a bug or have a feature request, please open an issue on the project's repository. Provide a clear title, a detailed description of the issue or feature, steps to reproduce (for bugs), and any relevant screenshots.</p>
                    <h3 className="text-2xl font-semibold mt-8">Pull Requests</h3>
                    <ol>
                        <li>Fork the repository and create a new branch from `main`.</li>
                        <li>Make your changes and ensure the code lints and builds correctly.</li>
                        <li>Write a clear, concise commit message.</li>
                        <li>Open a pull request, detailing the changes you have made and referencing any related issues.</li>
                    </ol>
                </DocSection>

                <DocSection id="appendix" title="9. Appendix">
                    <h3 className="text-2xl font-semibold">Glossary</h3>
                     <ul className="list-disc list-inside">
                        <li><strong>API:</strong> Application Programming Interface. A way for different software systems to communicate.</li>
                        <li><strong>EC:</strong> Electrical Conductivity. A measure of salts/nutrients in the soil.</li>
                        <li><strong>JSON:</strong> JavaScript Object Notation. A standard format for sending data.</li>
                        <li><strong>NPK:</strong> Nitrogen (N), Phosphorus (P), and Potassium (K). The three primary macronutrients for plants.</li>
                        <li><strong>PWA:</strong> Progressive Web App. A web application that can be "installed" on a device and can work offline.</li>
                    </ul>
                </DocSection>
            </article>
        </div>
    );
};

export default Documentation;
