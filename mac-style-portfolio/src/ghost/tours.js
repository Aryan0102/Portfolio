// Scripted tours. `to` values match data-ghost attributes in the UI.

// Opens Spotlight with a visible ⌘K, types a query and opens the top result.
const spotlight = (query) => [
    { type: 'keys', label: ['⌘', 'K'], key: 'k', meta: true },
    { type: 'move', to: 'spotlight:field' },
    { type: 'typing', to: 'spotlight:field', text: query },
    { type: 'move', to: 'spotlight:top' },
    { type: 'keys', label: ['↩'], key: 'Enter', to: 'spotlight:field' },
];

const outro = [
    { type: 'say', text: "That's me. Press ⌘K anytime to search everything. The mouse is yours." },
];

const recruiter = [
    { type: 'say', text: "Perfect, I'll keep it quick." },

    { type: 'move', to: 'dock:Time Machine' },
    { type: 'click', open: 'Time Machine', target: 'Visa' },
    { type: 'wait', ms: 450 },
    { type: 'move', to: 'timemachine:role' },
    { type: 'scribble', to: 'timemachine:role', shape: 'circle' },
    { type: 'say', text: "Most recently, Software Engineer Intern at Visa." },

    { type: 'say', text: "Quick tip: ⌘K searches everything. Watch." },
    ...spotlight('notability'),
    { type: 'wait', ms: 600 },
    { type: 'move', to: 'timemachine:role' },
    { type: 'scribble', to: 'timemachine:role', shape: 'circle' },
    { type: 'say', text: "Before that, a Software Engineer Co-op at Notability." },

    { type: 'move', to: 'timemachine:close' },
    { type: 'click' },
    { type: 'wait', ms: 300 },

    { type: 'move', to: 'desktop:Resume.pdf' },
    { type: 'click' },
    { type: 'wait', ms: 500 },
    { type: 'move', to: 'window:Preview' },
    { type: 'say', text: "And here's the one-pager." },

    ...outro,
];

const engineer = [
    { type: 'say', text: "Nice. Let's look at code." },

    { type: 'move', to: 'dock:Visual Studio Code' },
    { type: 'click', open: 'Visual Studio Code', target: 'Claude Trades' },
    { type: 'wait', ms: 400 },
    { type: 'move', to: 'vscode:tech' },
    { type: 'scribble', to: 'vscode:tech', shape: 'circle' },
    { type: 'say', text: "Claude Trades: an LLM makes the actual buy and sell calls, built on the Claude API and MCP." },

    { type: 'move', to: 'vscode:file:Snowcode' },
    { type: 'click' },
    { type: 'wait', ms: 250 },
    { type: 'move', to: 'vscode:title' },
    { type: 'scribble', to: 'vscode:title', shape: 'underline' },
    { type: 'say', text: "Snowcode: a real-time collaborative code editor." },

    { type: 'say', text: "Quick tip: ⌘K jumps straight to any project." },
    ...spotlight('typescript flows'),
    { type: 'wait', ms: 300 },
    { type: 'move', to: 'vscode:title' },
    { type: 'scribble', to: 'vscode:title', shape: 'underline' },
    { type: 'say', text: "TypeScript Flows: Kotlin's Flow and StateFlow, rebuilt in TypeScript." },

    ...outro,
];

const curious = [
    { type: 'say', text: "Love that. Here's a bit more about me." },

    { type: 'move', to: 'dock:Maps' },
    { type: 'click', open: 'Maps', target: 'Northeastern University' },
    { type: 'wait', ms: 400 },
    { type: 'move', to: 'maps:place' },
    { type: 'scribble', to: 'maps:place', shape: 'circle' },
    { type: 'say', text: "I study Computer Science at Northeastern, in Boston." },

    { type: 'say', text: "Quick tip: ⌘K finds anything, even my hometown." },
    ...spotlight('home'),
    { type: 'wait', ms: 500 },
    { type: 'move', to: 'maps:place' },
    { type: 'scribble', to: 'maps:place', shape: 'underline' },
    { type: 'say', text: "Home is Easton, PA, in the Lehigh Valley." },

    { type: 'move', to: 'dock:Reminders' },
    { type: 'click', open: 'Reminders', target: 'Visit all US National Parks' },
    { type: 'wait', ms: 400 },
    { type: 'move', to: 'reminders:Visit all US National Parks' },
    { type: 'scribble', to: 'reminders:Visit all US National Parks', shape: 'circle' },
    { type: 'say', text: "The big goal: all 63 US national parks." },

    ...outro,
];

export const openerTour = [
    { type: 'say', text: "Hey, I'm Aryan." },
    {
        type: 'ask',
        text: "Who's visiting? I'll tailor the tour.",
        options: [
            { label: 'Recruiter', steps: recruiter },
            { label: 'Engineer', steps: engineer },
            { label: 'Just curious', steps: curious },
            { label: 'Skip', steps: null },
        ],
    },
];
