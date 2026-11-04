// Plays a list of steps one at a time. Each step is { type, ...args } and is
// handled by actions[type](args, signal). Stops as soon as the signal aborts.
export const runTour = async (steps, actions, signal) => {
    for (const step of steps) {
        if (signal?.aborted) return;

        const { type, ...args } = step;
        const action = actions[type];

        if (!action) {
            console.warn(`Ghost tour: unknown step "${type}", skipping`);
            continue;
        }

        await action(args, signal);
    }
};
