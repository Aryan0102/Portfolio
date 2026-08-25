import GitHubWidget from './GitHubWidget';
import WeatherWidget from './WeatherWidget';

const Widgets = () => (
    <div className="absolute top-20 left-6 flex flex-col gap-4">
        <GitHubWidget />
        <WeatherWidget />
    </div>
);

export default Widgets;
