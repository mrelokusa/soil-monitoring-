import React from 'react';

const Documentation: React.FC = () => {
    const tocItems = [
        { id: 'overview', title: '1. Overview' },
        { id: 'system-requirements', title: '2. System Requirements' },
        { id: 'installation', title: '3. Installation Guide' },
        { id: 'folder-structure', title: '4. Folder & File Structure' },
        { id: 'code-walkthrough', title: '5. Code Walkthrough' },
        { id: 'architecture', title: '6. Architecture & Design' },
        { id: 'api-reference', title: '7. API / Interface Documentation' },
        { id: 'deployment', title: '8. Deployment & Operations' },
        { id: 'troubleshooting', title: '9. Troubleshooting Guide' },
        { id: 'testing', title: '10. Testing' },
        { id: 'security', title: '11. Security' },
        { id: 'changelog', title: '12. Change Log & Decision Records' },
        { id: 'appendix', title: '13. Appendices' },
    ];

    const DocSection: React.FC<{ id: string, title: string, children: React.ReactNode }> = ({ id, title, children }) => (
        <section id={id} className="mb-12 scroll-mt-24">
            <h2 className="text-3xl font-bold border-b border-gray-300 dark:border-gray-700 pb-3 mb-6 text-brand-text-primary dark:text-dark-brand-text-primary">{title}</h2>
            <div className="prose dark:prose-invert max-w-none text-brand-text-secondary dark:text-dark-brand-text-secondary text-lg leading-relaxed space-y-6">
                {children}
            </div>
        </section>
    );
    
    const Subheading: React.FC<{ children: React.ReactNode }> = ({ children }) => (
        <h3 className="text-2xl font-semibold !mt-10 !mb-4 text-brand-text-primary dark:text-dark-brand-text-primary">{children}</h3>
    );

    const CodeBlock: React.FC<{ children: React.ReactNode, language?: string }> = ({ children, language }) => (
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
                    <Subheading>What The System Does</Subheading>
                    <p>The ARC Smart Agriculture Dashboard is a modern, real-time web application designed to visualize sensor data for a smart agriculture project. It provides a comprehensive overview of both soil conditions and greenhouse atmospheric data on a single, user-friendly interface.</p>
                    <p>The dashboard displays key metrics such as:</p>
                    <ul>
                        <li><strong>Soil Data:</strong> Moisture, Temperature, Electrical Conductivity (EC), pH, and NPK (Nitrogen, Phosphorus, Potassium) levels.</li>
                        <li><strong>Greenhouse Data:</strong> Air Temperature, Humidity, Pressure, Altitude, Light Intensity, and air quality metrics (CO, Smoke, general quality).</li>
                    </ul>
                    <p>It also features an AI-powered analysis tool that uses the Google Gemini API to interpret the combined sensor data, provide a summary, identify observations, and offer actionable recommendations.</p>
                    
                    <Subheading>Why It Exists</Subheading>
                    <p>This project was created to provide stakeholders (farmers, researchers, agronomists) with a centralized and accessible platform to monitor crop and environmental health. By consolidating complex data into intuitive visualizations, charts, and AI-driven insights, the dashboard empowers users to make timely, data-driven decisions to optimize crop yield, manage resources efficiently, and prevent potential issues before they become critical.</p>

                    <Subheading>Key Components</Subheading>
                    <ul>
                        <li><strong>Frontend Application:</strong> A single-page application (SPA) built with <strong>React</strong> and <strong>TypeScript</strong>.</li>
                        <li><strong>Styling:</strong> Styled with <strong>Tailwind CSS</strong> for a responsive, utility-first design, including light and dark modes.</li>
                        <li><strong>Data Visualization:</strong> Utilizes the <strong>Recharts</strong> library to render historical data trends and nutrient balance charts.</li>
                        <li><strong>Data Sources:</strong> Fetches real-time data from two external REST APIs hosted on Oracle APEX.</li>
                        <li><strong>AI Analysis:</strong> Integrates with the <strong>Google Gemini API</strong> to provide intelligent analysis of the sensor data.</li>
                        <li><strong>Alerting System:</strong> Sends critical alerts to an <strong>n8n webhook</strong>, which can then notify users (e.g., via email).</li>
                        <li><strong>Offline Capability:</strong> Implemented as a Progressive Web App (PWA) with a <strong>Service Worker</strong> for basic offline access to the application shell.</li>
                    </ul>

                    <Subheading>High-Level Data Flow</Subheading>
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
                    <Subheading>Hardware Requirements</Subheading>
                    <ul>
                        <li>A standard desktop, laptop, or mobile device with a modern web browser.</li>
                        <li>Minimum 2GB RAM.</li>
                    </ul>

                    <Subheading>Operating System & Version</Subheading>
                    <p>The application is a web-based client and is therefore operating system-agnostic. It is verified to run on:</p>
                    <ul>
                        <li>Windows 10 or newer</li>
                        <li>macOS 11 (Big Sur) or newer</li>
                        <li>Any major Linux distribution (e.g., Ubuntu 20.04+)</li>
                        <li>iOS 15 or newer</li>
                        <li>Android 10 or newer</li>
                    </ul>
                    
                    <Subheading>Required Tools & Versions</Subheading>
                    <ul>
                        <li><strong>Web Browser:</strong> An up-to-date version of a modern browser is required for viewing the application.
                            <ul>
                                <li>Google Chrome (v90+)</li>
                                <li>Mozilla Firefox (v90+)</li>
                                <li>Microsoft Edge (v90+)</li>
                                <li>Apple Safari (v15+)</li>
                            </ul>
                        </li>
                        <li><strong>For Development:</strong>
                            <ul>
                                <li><strong>Node.js:</strong> v18.x (LTS) or higher. This is needed to run a local development server. You can download it from <a href="https://nodejs.org/" target="_blank" rel="noopener noreferrer">nodejs.org</a>.</li>
                                <li><strong>Code Editor:</strong> A text editor or IDE, such as <a href="https://code.visualstudio.com/" target="_blank" rel="noopener noreferrer">Visual Studio Code</a> (recommended).</li>
                            </ul>
                        </li>
                    </ul>
                </DocSection>

                <DocSection id="installation" title="3. Installation Guide (Full Walkthrough)">
                    <p>This project is configured with a "no-build" setup using import maps. This means it can run directly in a browser that supports them without a complex build process. For local development, a simple static file server is required. This guide assumes you have a clean computer with no prior setup.</p>
                    
                    <Subheading>Step 1: Install Node.js</Subheading>
                    <p>Node.js is required to run the local development server. We will use <code>npx</code>, a tool that comes with Node.js, to run the server without installing it globally.</p>
                    <ol>
                        <li>Navigate to the official Node.js website: <a href="https://nodejs.org/" target="_blank" rel="noopener noreferrer">https://nodejs.org/</a>.</li>
                        <li>Download the installer for the "LTS" (Long-Term Support) version for your operating system (Windows, macOS, or Linux).</li>
                        <li>Run the installer and follow the on-screen prompts to complete the installation.</li>
                        <li>To verify the installation, open your terminal (Command Prompt on Windows, Terminal on macOS/Linux) and run the following command:
                            <CodeBlock>node -v</CodeBlock>
                            You should see a version number, e.g., <code>v18.18.0</code>.
                        </li>
                    </ol>

                    <Subheading>Step 2: Download the Project Code</Subheading>
                    <ol>
                        <li>Create a folder on your computer where you'll store the project. For example, in your user's home directory.
                            <CodeBlock>{`# On macOS or Linux
mkdir ~/arc-smart-agriculture
cd ~/arc-smart-agriculture

# On Windows
mkdir %USERPROFILE%\\arc-smart-agriculture
cd %USERPROFILE%\\arc-smart-agriculture`}</CodeBlock>
                        </li>
                        <li>Download and save all the provided files (<code>index.html</code>, <code>App.tsx</code>, etc.) into this new folder, preserving the directory structure (e.g., create a <code>components/</code> folder, a <code>services/</code> folder, etc.).</li>
                    </ol>

                    <Subheading>Step 3: Set Up Environment Variables (Gemini API Key)</Subheading>
                    <p>The application requires an API key to communicate with the Google Gemini API for the AI Analysis feature.</p>
                    <ol>
                        <li><strong>Obtain a Gemini API Key:</strong>
                           <ul>
                               <li>Go to <a href="https://aistudio.google.com/" target="_blank" rel="noopener noreferrer">Google AI Studio</a>.</li>
                               <li>Sign in with your Google account.</li>
                               <li>Click on "<strong>Get API key</strong>" and create a new API key in a new or existing project.</li>
                               <li>Copy the generated key. <strong>Treat this key like a password; do not share it publicly.</strong></li>
                           </ul>
                        </li>
                        <li><strong>Configure the Key for Local Development:</strong>
                            <p>This project is designed to read the API key from an environment variable named <code>process.env.API_KEY</code>. In a real deployment, this variable would be injected by the hosting service. To run it locally, you must temporarily add the key to the code.
                            </p>
                            <p className="border-l-4 border-yellow-500 pl-4 bg-yellow-500/10 py-2"><strong>Warning:</strong> This method is for local testing only. Never commit an API key directly into your source code repository.</p>
                            <ul>
                                <li>Open the file <code>services/geminiService.ts</code> in your code editor.</li>
                                <li>Find the line:
                                    <CodeBlock>const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });</CodeBlock>
                                </li>
                                <li>Replace <code>process.env.API_KEY as string</code> with your actual key inside quotes:
                                    <CodeBlock>const ai = new GoogleGenAI({ apiKey: "YOUR_API_KEY_HERE" });</CodeBlock>
                                </li>
                                <li>Save the file. Remember to revert this change before sharing or deploying the code.</li>
                            </ul>
                        </li>
                    </ol>
                    
                    <Subheading>Step 4: Run the Local Development Server</Subheading>
                    <p>The browser has security restrictions that prevent JavaScript modules from being loaded from the local file system (<code>file:///...</code>). Therefore, you must use a local web server.</p>
                     <ol>
                        <li><strong>Open a terminal</strong> or command prompt in your project's root directory (the <code>arc-smart-agriculture</code> folder).</li>
                        <li><strong>Run the server using <code>npx</code>:</strong>
                            <CodeBlock>npx serve</CodeBlock>
                            <p>This command downloads and runs the <code>serve</code> package without installing it globally.</p>
                        </li>
                        <li><strong>Note the URL:</strong> The terminal will output a URL where the server is running, usually <code>http://localhost:3000</code>.
                            <CodeBlock>{`┌──────────────────────────────────────────────────┐
│                                                  │
│   Serving!                                       │
│                                                  │
│   - Local:    http://localhost:3000              │
│   - Network:  http://192.168.1.100:3000          │
│                                                  │
│   Copied local address to clipboard!             │
│                                                  │
└──────────────────────────────────────────────────┘`}</CodeBlock>
                        </li>
                    </ol>

                    <Subheading>Step 5: View the Application</Subheading>
                    <ol>
                        <li>Open your web browser (e.g., Chrome, Firefox).</li>
                        <li>Navigate to the local address from the previous step (e.g., <code>http://localhost:3000</code>).</li>
                        <li>The ARC Smart Agriculture Dashboard should now be running in your browser. It will begin fetching data from the APIs, which may take a few moments on the initial load.</li>
                    </ol>
                </DocSection>

                <DocSection id="folder-structure" title="4. Folder & File Structure">
                    <p>The project is organized by feature and function, separating UI components, data services, and core application logic.</p>
                    <CodeBlock>{`/
├── assets/
│   └── icon.svg              # SVG icon for the application logo and PWA.
├── components/
│   ├── AIAnalysis.tsx        # Manages fetching and displaying AI insights from Gemini.
│   ├── AnimatedNumber.tsx    # A simple component to animate numerical value changes.
│   ├── Dashboard.tsx         # The main container component for the dashboard view.
│   ├── Documentation.tsx     # This documentation page component.
│   ├── EmailSubscription.tsx # UI for users to input an email for webhook alerts.
│   ├── Footer.tsx            # The application's footer section.
│   ├── GreenhousePanel.tsx   # Displays all metrics related to the greenhouse environment.
│   ├── Header.tsx            # Top navigation bar with title, status, and theme switcher.
│   ├── HistoricalDataChart.tsx # Renders line charts for historical data trends.
│   ├── HistoryTable.tsx      # A table showing the history of all soil sensor readings.
│   ├── Icons.tsx             # Central repository for all SVG icons.
│   ├── MetricCard.tsx        # A reusable card to display a single, prominent metric.
│   ├── NPKChart.tsx          # A bar chart specifically for N-P-K nutrient levels.
│   └── RefreshControl.tsx    # UI controls for manual and automatic data refreshing.
├── services/
│   ├── geminiService.ts      # Handles all communication with the Google Gemini API.
│   ├── greenhouseService.ts  # Fetches and transforms data from the greenhouse sensor API.
│   ├── supabaseService.ts    # NOTE: Misnamed. Fetches soil data from the Oracle APEX API.
│   └── webhookService.ts     # Sends POST requests with alert data to the n8n webhook.
├── App.tsx                   # The main application component. Manages state, routing, and data fetching.
├── index.html                # The HTML entry point. Contains structure, Tailwind config, and import maps.
├── index.tsx                 # The root React script. Renders the <App /> component.
├── manifest.json             # The Progressive Web App (PWA) manifest file.
├── metadata.json             # Metadata for the hosting environment (e.g., AI Studio).
├── sw.js                     # The Service Worker script that enables PWA features like caching.
└── types.ts                  # Contains all TypeScript type definitions (e.g., SoilData).
`}</CodeBlock>
                </DocSection>

                <DocSection id="code-walkthrough" title="5. Code Walkthrough">
                    <Subheading>Core Logic (`App.tsx`)</Subheading>
                    <p><code>App.tsx</code> is the orchestrator of the application.</p>
                    <ul>
                        <li><strong>State Management:</strong> It uses <code>useState</code> hooks to manage all primary data (<code>soilData</code>, <code>greenhouseData</code>), loading states, error states, and UI preferences (<code>theme</code>, <code>page</code>).</li>
                        <li><strong>Routing:</strong> A simple state-based router controlled by the <code>page</code> state variable determines whether to render the <code>Dashboard</code> or <code>Documentation</code> component.</li>
                        <li><strong>Data Fetching:</strong> The <code>getData</code> function, wrapped in <code>useCallback</code> for optimization, orchestrates calls to services. A <code>useEffect</code> hook calls <code>getData</code> on initial mount and sets up an interval for auto-refreshing.</li>
                        <li><strong>Layout:</strong> The component's return statement defines the overall page structure, including the <code>Header</code>, <code>Footer</code>, and the main content area.</li>
                    </ul>

                    <Subheading>Data Services (`services/`)</Subheading>
                    <p>This directory decouples data fetching and external API interactions from the UI components. This separation of concerns makes the code more modular and easier to maintain.</p>
                    <ul>
                        <li><strong><code>supabaseService.ts</code> & <code>greenhouseService.ts</code>:</strong> Each file exports an async function that handles a <code>fetch</code> request to a hardcoded Oracle APEX API URL. They parse the JSON response and map the raw API data to the application's internal data structures, ensuring a consistent data shape. <code>supabaseService.ts</code> contains a crucial <code>parseOracleDate</code> helper function to convert the API's non-standard date format into a standard ISO string.</li>
                        <li><strong><code>geminiService.ts</code>:</strong> The <code>getCombinedAnalysis</code> function constructs a detailed system instruction and a user prompt with the current data. It defines a strict JSON schema that it expects the Gemini model to return, ensuring a predictable response structure.</li>
                        <li><strong><code>webhookService.ts</code>:</strong> The <code>sendAlertToWebhook</code> function is designed to be "fire-and-forget". It only sends a request if the AI analysis priority is "Warning" or "Critical" to avoid unnecessary notifications. It uses <code>mode: 'no-cors'</code> to bypass browser security restrictions for simple POST requests.</li>
                    </ul>
                </DocSection>

                 <DocSection id="architecture" title="6. Architecture & Design">
                    <Subheading>Architecture</Subheading>
                    <p>The application follows a standard <strong>Component-Based Architecture</strong>, idiomatic to React.</p>
                    <ul>
                        <li><strong>Presentation Components (Dumb Components):</strong> Most components inside <code>/components</code> are presentational. They receive data via props and render UI (e.g., <code>MetricCard</code>, <code>Footer</code>).</li>
                        <li><strong>Container Components (Smart Components):</strong> <code>App.tsx</code> acts as the primary container, managing state and logic. <code>AIAnalysis.tsx</code> is another example, as it manages its own state for loading and fetching AI data.</li>
                        <li><strong>Service Layer:</strong> The <code>/services</code> directory acts as a dedicated layer for handling external communication, separating API logic from the view layer.</li>
                    </ul>

                    <Subheading>Component Hierarchy Diagram</Subheading>
                    <CodeBlock>{`- App.tsx
  ├── Header.tsx
  ├── (Router: conditionally renders one of the following)
  │   ├── Dashboard.tsx
  │   │   ├── RefreshControl.tsx
  │   │   ├── MetricCard.tsx (multiple)
  │   │   ├── GreenhousePanel.tsx
  │   │   ├── EmailSubscription.tsx
  │   │   ├── AIAnalysis.tsx
  │   │   ├── NPKChart.tsx
  │   │   ├── HistoricalDataChart.tsx
  │   │   └── HistoryTable.tsx
  │   └── Documentation.tsx
  └── Footer.tsx
`}</CodeBlock>

                    <Subheading>Design Trade-offs</Subheading>
                    <ul>
                        <li><strong>No Build Step vs. Bundler:</strong>
                            <ul>
                                <li><strong>Decision:</strong> The project uses import maps in <code>index.html</code> to load modules directly from a CDN, avoiding a build step (like with Vite or Webpack).</li>
                                <li><strong>Pro:</strong> Simplifies setup and is great for rapid prototyping or environments like AI Studio.</li>
                                <li><strong>Con:</strong> Less performant for production. It results in more network requests and misses out on optimizations like code splitting, tree-shaking, and minification that bundlers provide.</li>
                            </ul>
                        </li>
                        <li><strong>Centralized State vs. Context/Redux:</strong>
                            <ul>
                                <li><strong>Decision:</strong> All global state is managed within the <code>App.tsx</code> component and passed down via props ("prop drilling").</li>
                                <li><strong>Pro:</strong> Simple to understand and implement for an application of this size. No extra library dependencies.</li>
                                <li><strong>Con:</strong> Can become difficult to manage in larger applications, as props may need to be passed through many intermediate components. For a larger app, React Context or a state management library like Zustand would be a better choice.</li>
                            </ul>
                        </li>
                    </ul>
                </DocSection>

                <DocSection id="api-reference" title="7. API / Interface Documentation">
                    <p>This section documents the functions within the <code>services/</code> directory, which serve as the internal API for the frontend components.</p>
                    <div className="space-y-6">
                        <div>
                            <p><strong>File:</strong> <code>services/supabaseService.ts</code></p>
                            <p><strong>Function:</strong> <code>fetchSoilData(limit?: number): Promise&lt;SoilData[]&gt;</code></p>
                            <ul>
                                <li><strong>Purpose:</strong> Fetches the historical soil sensor data from the Oracle APEX API.</li>
                                <li><strong>Input Parameters:</strong>
                                    <ul>
                                        <li><code>limit</code> (optional, <code>number</code>): The number of recent records to return. If omitted, returns all records from the API.</li>
                                    </ul>
                                </li>
                                <li><strong>Output Schema:</strong> A promise that resolves to an array of <code>SoilData</code> objects.</li>
                                <li><strong>Error Codes:</strong> Throws an <code>Error</code> if the network request fails or the API returns a non-200 status code.</li>
                            </ul>
                        </div>
                        <div>
                            <p><strong>File:</strong> <code>services/greenhouseService.ts</code></p>
                            <p><strong>Function:</strong> <code>fetchGreenhouseData(limit?: number): Promise&lt;GreenhouseData[]&gt;</code></p>
                            <ul>
                                <li><strong>Purpose:</strong> Fetches historical greenhouse environmental data.</li>
                                <li><strong>Input Parameters:</strong>
                                    <ul>
                                        <li><code>limit</code> (optional, <code>number</code>): The number of recent records to return.</li>
                                    </ul>
                                </li>
                                <li><strong>Output Schema:</strong> A promise that resolves to an array of <code>GreenhouseData</code> objects.</li>
                                <li><strong>Error Codes:</strong> Throws an <code>Error</code> if the network request fails.</li>
                            </ul>
                        </div>
                        <div>
                            <p><strong>File:</strong> <code>services/geminiService.ts</code></p>
                            <p><strong>Function:</strong> <code>getCombinedAnalysis(soilData: SoilData, greenhouseData: GreenhouseData): Promise&lt;AIAnalysisResponse&gt;</code></p>
                            <ul>
                                <li><strong>Purpose:</strong> Sends the latest sensor data to the Gemini API for analysis.</li>
                                <li><strong>Input Parameters:</strong>
                                    <ul>
                                        <li><code>soilData</code> (<code>SoilData</code>): The most recent soil data object.</li>
                                        <li><code>greenhouseData</code> (<code>GreenhouseData</code>): The most recent greenhouse data object.</li>
                                    </ul>
                                </li>
                                <li><strong>Output Schema:</strong> A promise that resolves to an <code>AIAnalysisResponse</code> object.</li>
                                <li><strong>Error Codes:</strong> Throws an <code>Error</code> if the Gemini API call fails or returns an invalid response.</li>
                            </ul>
                        </div>
                        <div>
                            <p><strong>File:</strong> <code>services/webhookService.ts</code></p>
                            <p><strong>Function:</strong> <code>sendAlertToWebhook(analysis: AIAnalysisResponse, email: string | null): Promise&lt;void&gt;</code></p>
                            <ul>
                                <li><strong>Purpose:</strong> Sends an alert to the n8n webhook if the analysis priority is "Warning" or "Critical".</li>
                                <li><strong>Input Parameters:</strong>
                                    <ul>
                                        <li><code>analysis</code> (<code>AIAnalysisResponse</code>): The analysis object returned from Gemini.</li>
                                        <li><code>email</code> (<code>string | null</code>): The user's email to include in the payload.</li>
                                    </ul>
                                </li>
                                <li><strong>Output Schema:</strong> A promise that resolves when the fetch request is initiated.</li>
                                <li><strong>Error Codes:</strong> This function catches its own errors and logs them to the console; it does not throw errors up to the caller.</li>
                            </ul>
                        </div>
                    </div>
                </DocSection>

                <DocSection id="deployment" title="8. Deployment & Operations">
                    <p>This application is a collection of static files (HTML, CSS, JS). It can be deployed to any static web hosting provider.</p>
                    <Subheading>Deployment Steps</Subheading>
                    <ol>
                        <li><strong>Prepare Files:</strong> Ensure all source code is in a single directory.</li>
                        <li><strong>Configure Environment Variables:</strong> This is the most critical step. Your hosting provider must support environment variables.
                            <ul>
                                <li>Go to your provider's settings (e.g., Vercel, Netlify).</li>
                                <li>Add a new environment variable named <code>API_KEY</code>.</li>
                                <li>Set its value to your Google Gemini API key.</li>
                                <li>You will need a mechanism to make this variable available to your client-side code. A common approach is to use a build step that replaces a placeholder in your code with the actual key. Since this project has no build step, you would need to add one (e.g., using Vite) to handle this securely.</li>
                                <li><strong>Never commit your API key directly to your code repository.</strong></li>
                            </ul>
                        </li>
                        <li><strong>Upload Files:</strong> Use the provider's command-line interface (CLI) or web dashboard to upload the entire project directory.</li>
                    </ol>
                    <Subheading>Monitoring</Subheading>
                    <ul>
                        <li><strong>API Health:</strong> Set up uptime monitoring for the two Oracle APEX API endpoints. If they go down, the dashboard will fail.</li>
                        <li><strong>AI Usage:</strong> Monitor your Google Gemini API usage and costs in the Google Cloud Console to prevent unexpected bills.</li>
                    </ul>
                    <Subheading>Deployment Troubleshooting Guide</Subheading>
                    <table className="w-full text-left">
                        <thead className="bg-gray-100 dark:bg-gray-800">
                            <tr><th className="p-3">Symptom</th><th className="p-3">Possible Cause</th><th className="p-3">Fix</th></tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                            <tr>
                                <td className="p-3">AI Analysis fails with an API key error after deployment.</td>
                                <td className="p-3">The <code>API_KEY</code> environment variable was not set correctly on the hosting provider or was not injected into the application.</td>
                                <td className="p-3">1. Go to your hosting provider's dashboard (e.g., Vercel, Netlify).<br/>2. Find the "Environment Variables" section for your project.<br/>3. Ensure a variable named <code>API_KEY</code> exists and its value is your correct Gemini API key.<br/>4. Redeploy the application to apply the changes. Note: A build step is required to substitute this variable into static files.</td>
                            </tr>
                            <tr>
                                <td className="p-3">The application gives a 404 error when refreshing on the <code>/documentation</code> page.</td>
                                <td className="p-3">The hosting provider is not configured for a Single-Page Application (SPA). It's looking for a file named <code>documentation.html</code> which doesn't exist.</td>
                                <td className="p-3">1. In your hosting provider's settings, find "Redirects" or "Rewrites".<br/>2. Add a rule to rewrite all requests to <code>/index.html</code>. For Netlify, this is a <code>_redirects</code> file. For Vercel, it's in <code>vercel.json</code>. The rule is typically: <code>/* /index.html 200</code>.</td>
                            </tr>
                            <tr>
                                <td className="p-3">CORS errors appear in the console for API requests.</td>
                                <td className="p-3">The Oracle APEX APIs do not have the correct <code>Access-Control-Allow-Origin</code> headers set to allow requests from your deployment domain.</td>
                                <td className="p-3">1. This is a server-side issue. The Oracle APEX endpoints must be configured to include your deployed application's domain in the CORS allowlist.<br/>2. If you cannot modify the API's CORS settings, you must set up a proxy server.</td>
                            </tr>
                        </tbody>
                    </table>
                </DocSection>

                <DocSection id="troubleshooting" title="9. Troubleshooting Guide">
                     <p>This guide covers general runtime issues. For deployment-specific problems, see the guide in the section above.</p>
                     <table className="w-full text-left">
                        <thead className="bg-gray-100 dark:bg-gray-800">
                            <tr><th className="p-3">Symptom</th><th className="p-3">Possible Cause</th><th className="p-3">Fix</th></tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                            <tr><td className="p-3">Page is blank on load.</td><td className="p-3">A critical JavaScript error occurred.</td><td className="p-3">Open the Browser Developer Console (`F12` or `Cmd+Opt+I`) and check for errors in the `Console` tab.</td></tr>
                            <tr><td className="p-3">Dashboard shows "Connection Lost" or "Dashboard Critical Error".</td><td className="p-3">The Oracle APEX API for soil data is down, unreachable, or a network error occurred.</td><td className="p-3">1. Check your internet connection. <br/> 2. Verify the API URL in <code>services/supabaseService.ts</code> is correct and the API is operational.</td></tr>
                             <tr><td className="p-3">Greenhouse panel shows an error but soil data loads.</td><td className="p-3">The Oracle APEX API for greenhouse data is down.</td><td className="p-3">Verify the API URL in <code>services/greenhouseService.ts</code>.</td></tr>
                            <tr><td className="p-3">AI Analysis fails with an error message (locally).</td><td className="p-3">1. The Gemini API key is missing or invalid in <code>geminiService.ts</code>. <br/> 2. Google's API service is experiencing an outage.</td><td className="p-3">1. Ensure your <code>API_KEY</code> is set correctly as per the installation guide. <br/> 2. Check the Google Cloud status dashboard.</td></tr>
                             <tr><td className="p-3">The app looks strange or unstyled.</td><td className="p-3">Tailwind CSS failed to load from the CDN.</td><td className="p-3">Check your internet connection and look for network errors in the Developer Console.</td></tr>
                        </tbody>
                    </table>
                </DocSection>
                 <DocSection id="testing" title="10. Testing">
                    <Subheading>Test Strategy</Subheading>
                    <p>Currently, the project does not have an automated test suite. A comprehensive testing strategy would involve:</p>
                    <ul>
                        <li><strong>Unit Tests:</strong> For utility functions and services. For example, the <code>parseOracleDate</code> function in <code>supabaseService.ts</code> is a prime candidate for unit testing with various date string inputs. A library like <strong>Jest</strong> or <strong>Vitest</strong> would be suitable.</li>
                        <li><strong>Component Tests:</strong> To verify that individual React components render correctly given different props. For instance, testing the <code>MetricCard</code> to ensure it displays the correct low-value warning styles. <strong>React Testing Library</strong> is the standard for this.</li>
                        <li><strong>End-to-End (E2E) Tests:</strong> To simulate user flows, such as loading the page, seeing data, and requesting an AI analysis. Tools like <strong>Cypress</strong> or <strong>Playwright</strong> would be used.</li>
                    </ul>
                    <Subheading>How to Run Tests</Subheading>
                    <p>Once a test runner like Vitest is added to the project, tests would typically be run from the command line with:</p>
                    <CodeBlock># This command is a placeholder for a future test script
npm test</CodeBlock>
                </DocSection>

                <DocSection id="security" title="11. Security">
                     <Subheading>Authentication</Subheading>
                    <p>The application is public and does not have any user authentication or authorization mechanisms. All data displayed is considered public.</p>

                    <Subheading>Data Protection</Subheading>
                    <p>The user's email for alerts is stored in the browser's <code>localStorage</code>. This is not a secure storage method and is susceptible to Cross-Site Scripting (XSS) attacks. For a production application with sensitive user data, this should be replaced with a secure backend storage solution tied to a user account.</p>

                    <Subheading>Secrets Management</Subheading>
                    <p>The primary secret is the Google Gemini <code>API_KEY</code>. As detailed in the Installation and Deployment sections, this key <strong>must not</strong> be hardcoded in the client-side JavaScript. It must be managed via environment variables on the hosting platform and injected securely, ideally through a backend proxy or a build-time substitution.</p>
                </DocSection>

                <DocSection id="changelog" title="12. Change Log & Decision Records">
                    <p>Major architectural decisions and a versioned history of changes should be maintained in a <code>CHANGELOG.md</code> file at the root of the project. This practice was not in place at the start of the project but is recommended for future development.</p>
                    <p>Key Decisions:</p>
                    <ul>
                        <li><strong>2024-05-20:</strong> Adopted a no-build, import-map-based setup for simplicity and rapid prototyping.</li>
                        <li><strong>2024-05-22:</strong> Chose centralized state management in <code>App.tsx</code> over a dedicated library to minimize complexity for the current application scale.</li>
                    </ul>
                </DocSection>

                <DocSection id="appendix" title="13. Appendices">
                    <Subheading>Glossary</Subheading>
                     <ul className="list-disc list-inside">
                        <li><strong>API:</strong> Application Programming Interface. A way for different software systems to communicate.</li>
                        <li><strong>EC:</strong> Electrical Conductivity. A measure of salts/nutrients in the soil.</li>
                        <li><strong>JSON:</strong> JavaScript Object Notation. A standard format for sending data.</li>
                        <li><strong>NPK:</strong> Nitrogen (N), Phosphorus (P), and Potassium (K). The three primary macronutrients for plants.</li>
                        <li><strong>PWA:</strong> Progressive Web App. A web application that can be "installed" on a device and can work offline.</li>
                        <li><strong>CDN:</strong> Content Delivery Network. A system of distributed servers that deliver web content quickly.</li>
                    </ul>
                    <Subheading>FAQ</Subheading>
                    <ul>
                        <li><strong>Why is the soil data service named <code>supabaseService.ts</code>?</strong>
                            <p>This is a legacy name from a previous iteration of the project that may have used Supabase as a backend. It should be refactored to <code>soilDataService.ts</code> for clarity, as it currently fetches data from an Oracle APEX endpoint.</p>
                        </li>
                         <li><strong>Where can I change the API endpoints?</strong>
                            <ul>
                                <li>Soil API: <code>const API_URL</code> in <code>services/supabaseService.ts</code>.</li>
                                <li>Greenhouse API: <code>const API_URL</code> in <code>services/greenhouseService.ts</code>.</li>
                                <li>Webhook URL: <code>const WEBHOOK_URL</code> in <code>services/webhookService.ts</code>.</li>
                            </ul>
                        </li>
                    </ul>
                </DocSection>
            </article>
        </div>
    );
};

export default Documentation;