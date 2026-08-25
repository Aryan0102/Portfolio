import { VscGithubInverted } from "react-icons/vsc";
import { useWidgetData } from './useWidgetData';
import WidgetCard from './WidgetCard';

const githubUser = "Aryan0102";
const weeksShown = 26;
const levelColors = ["bg-[#161b22]", "bg-[#0e4429]", "bg-[#006d32]", "bg-[#26a641]", "bg-[#39d353]"];
const contributionsUrl = `https://github-contributions-api.jogruber.de/v4/${githubUser}?y=last`;

const toContributions = (data) => ({
    days: data.contributions || [],
    total: data.total?.lastYear ?? null
});

const GitHubWidget = () => {
    const { data, status } = useWidgetData(contributionsUrl, toContributions);

    const days = data?.days || [];
    const state = status === 'ready' && days.length === 0 ? 'error' : status;

    const recent = days.slice(-weeksShown * 7);
    const weeks = [];
    for (let i = 0; i < recent.length; i += 7) {
        weeks.push(recent.slice(i, i + 7));
    }

    return (
        <WidgetCard
            status={state}
            fallback="Contributions unavailable"
            onClick={() => window.open(`https://github.com/${githubUser}`, "_blank")}
            className="hover:border-white/25 transition-colors"
        >
            <div className="flex items-center gap-2">
                <VscGithubInverted className="w-4 h-4 text-white" />
                <p className="text-sm font-semibold text-white flex-1">@{githubUser}</p>
                <p className="text-[10px] text-[#7d8590]">{weeksShown} wks</p>
            </div>

            <div className="flex gap-[3px] mt-2.5">
                {weeks.map((week, index) => (
                    <div key={index} className="flex flex-col gap-[3px]">
                        {week.map((day) => (
                            <div
                                key={day.date}
                                title={`${day.count} contributions on ${day.date}`}
                                className={`w-[8px] h-[8px] rounded-[2px] ${levelColors[day.level]}`}
                            />
                        ))}
                    </div>
                ))}
            </div>

            <div className="flex items-center justify-between mt-2.5">
                <p className="text-[11px] text-[#7d8590]">
                    <span className="text-white font-semibold">{data?.total?.toLocaleString()}</span> this year
                </p>
                <div className="flex items-center gap-[3px]">
                    <p className="text-[9px] text-[#7d8590] mr-0.5">Less</p>
                    {levelColors.map((color) => (
                        <div key={color} className={`w-[8px] h-[8px] rounded-[2px] ${color}`} />
                    ))}
                    <p className="text-[9px] text-[#7d8590] ml-0.5">More</p>
                </div>
            </div>
        </WidgetCard>
    );
};

export default GitHubWidget;
