// Scripted tour. `to` values match data-ghost attributes in the UI.
export const introTour = [
    { type: 'say', text: "Hey, I'm Aryan. Sit back, I'll drive." },

    { type: 'move', to: 'dock:Maps' },
    { type: 'click', open: 'Maps', target: 'Northeastern University' },
    { type: 'wait', ms: 400 },
    { type: 'move', to: 'window:Maps' },
    { type: 'say', text: "I study Computer Science at Northeastern, here in Boston." },

    { type: 'move', to: 'dock:Time Machine' },
    { type: 'click', open: 'Time Machine', target: 'Visa' },
    { type: 'wait', ms: 450 },
    { type: 'move', to: 'timemachine:snapshot' },
    { type: 'say', text: "This summer I was a Software Engineer Intern at Visa." },

    { type: 'move', to: 'timemachine:close' },
    { type: 'click' },
    { type: 'wait', ms: 300 },

    { type: 'move', to: 'dock:Visual Studio Code' },
    { type: 'click', open: 'Visual Studio Code', target: 'Claude Trades' },
    { type: 'wait', ms: 400 },
    { type: 'move', to: 'window:Visual Studio Code' },
    { type: 'say', text: "Claude Trades: an autonomous trading system where an LLM makes the actual buy and sell calls." },

    { type: 'move', to: 'dock:Reminders' },
    { type: 'click', open: 'Reminders', target: 'Visit all US National Parks' },
    { type: 'wait', ms: 400 },
    { type: 'move', to: 'window:Reminders' },
    { type: 'say', text: "And off the clock, I'm working through every US national park." },

    { type: 'say', text: "That's me. The mouse is yours." },
];
