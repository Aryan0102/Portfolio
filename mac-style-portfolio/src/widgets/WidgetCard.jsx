import { MacOSLoader } from '../assets/loader';

const shell = "widget-card rounded-2xl border shadow-xl";

const WidgetCard = ({ status, fallback, surface = "bg-[#0d1117] border-white/10", onClick, className = "", children }) => {
    if (status !== 'ready') {
        return (
            <div className={`${shell} widget-placeholder bg-[#0d1117] border-white/10 flex items-center justify-center`}>
                {status === 'loading'
                    ? <MacOSLoader size={24} />
                    : <p className="text-xs text-white/50">{fallback}</p>}
            </div>
        );
    }

    return (
        <div onClick={onClick} className={`${shell} ${surface} p-3 ${onClick ? 'cursor-pointer' : ''} ${className}`}>
            {children}
        </div>
    );
};

export default WidgetCard;
