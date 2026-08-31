import { IoSunny, IoMoon, IoPartlySunny, IoCloudy, IoRainy, IoSnow, IoThunderstorm } from "react-icons/io5";
import { useWidgetData } from './useWidgetData';
import { useViewport } from '../useViewport';
import WidgetCard from './WidgetCard';

const conditions = {
    0: { label: "Clear", sky: "clear" },
    1: { label: "Mostly Clear", sky: "clear" },
    2: { label: "Partly Cloudy", sky: "cloudy" },
    3: { label: "Overcast", sky: "cloudy" },
    45: { label: "Fog", sky: "cloudy" },
    48: { label: "Fog", sky: "cloudy" },
    51: { label: "Drizzle", sky: "wet" },
    53: { label: "Drizzle", sky: "wet" },
    55: { label: "Drizzle", sky: "wet" },
    61: { label: "Rain", sky: "wet" },
    63: { label: "Rain", sky: "wet" },
    65: { label: "Heavy Rain", sky: "wet" },
    71: { label: "Snow", sky: "wet" },
    73: { label: "Snow", sky: "wet" },
    75: { label: "Heavy Snow", sky: "wet" },
    80: { label: "Showers", sky: "wet" },
    81: { label: "Showers", sky: "wet" },
    82: { label: "Showers", sky: "wet" },
    95: { label: "Thunderstorms", sky: "storm" },
    96: { label: "Thunderstorms", sky: "storm" },
    99: { label: "Thunderstorms", sky: "storm" }
};

const skies = {
    clear: "from-[#2f7fd1] to-[#7ec2f0]",
    clearNight: "from-[#141e3c] to-[#3b4d80]",
    cloudy: "from-[#4a6076] to-[#8ba3b8]",
    wet: "from-[#33475b] to-[#6b8298]",
    storm: "from-[#232a43] to-[#4a5570]"
};

const weatherUrl = "https://api.open-meteo.com/v1/forecast?latitude=42.34&longitude=-71.09&current=temperature_2m,weather_code,is_day&hourly=temperature_2m,weather_code&daily=temperature_2m_max,temperature_2m_min&temperature_unit=fahrenheit&timezone=America/New_York&forecast_hours=6&forecast_days=1";

const toWeather = (data) => ({
    temperature: Math.round(data.current.temperature_2m),
    code: data.current.weather_code,
    isDay: data.current.is_day === 1,
    high: Math.round(data.daily.temperature_2m_max[0]),
    low: Math.round(data.daily.temperature_2m_min[0]),
    hours: data.hourly.time.slice(1, 5).map((time, index) => ({
        time,
        hour: new Date(time).toLocaleTimeString('en-US', { hour: 'numeric' }).replace(' ', ''),
        temperature: Math.round(data.hourly.temperature_2m[index + 1]),
        code: data.hourly.weather_code[index + 1]
    }))
});

const weatherIcon = (code, isDay) => {
    if (code >= 95) return <IoThunderstorm />;
    if (code >= 71 && code <= 77) return <IoSnow />;
    if (code >= 51) return <IoRainy />;
    if (code >= 2) return <IoCloudy />;
    if (code === 1) return isDay ? <IoPartlySunny /> : <IoMoon />;
    return isDay ? <IoSunny /> : <IoMoon />;
};

const hoursForWidth = (width) => {
    if (width < 900) return 2;
    if (width < 1200) return 3;
    return 4;
};

const WeatherWidget = () => {
    const { data: weather, status } = useWidgetData(weatherUrl, toWeather);
    const viewport = useViewport();

    const hours = (weather?.hours || []).slice(0, hoursForWidth(viewport.width));

    const condition = weather ? conditions[weather.code] || conditions[0] : conditions[0];
    const sky = condition.sky === 'clear' && weather && !weather.isDay ? skies.clearNight : skies[condition.sky];

    return (
        <WidgetCard
            status={status}
            fallback="Weather unavailable"
            surface={`border-white/15 text-white bg-gradient-to-br ${sky}`}
            className="flex gap-3"
        >
            <div className="flex flex-col justify-between w-[42%]">
                <div className="flex items-start justify-between">
                    <p className="text-sm font-semibold drop-shadow">Boston</p>
                    <div className="text-xl drop-shadow">{weatherIcon(weather?.code, weather?.isDay)}</div>
                </div>

                <p className="text-fluid-2xl font-light leading-none drop-shadow">{weather?.temperature}°</p>

                <div className="text-[11px] drop-shadow">
                    <p>{condition.label}</p>
                    <p className="text-white/75">H:{weather?.high}° L:{weather?.low}°</p>
                </div>
            </div>

            <div className="flex-1 flex justify-between items-center border-l border-white/25 pl-3">
                {hours.map((hour) => (
                    <div key={hour.time} className="flex flex-col items-center gap-1">
                        <p className="text-[10px] text-white/80">{hour.hour}</p>
                        <div className="text-sm">{weatherIcon(hour.code, weather.isDay)}</div>
                        <p className="text-[11px] font-medium">{hour.temperature}°</p>
                    </div>
                ))}
            </div>
        </WidgetCard>
    );
};

export default WeatherWidget;
