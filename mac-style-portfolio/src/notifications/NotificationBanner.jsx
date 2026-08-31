import { getAppIcon } from '../appList';

const NotificationBanner = ({ notification, onOpen, onDismiss }) => (
    <div
        onClick={onOpen}
        className={`notification-in w-notification max-w-[90vw] rounded-2xl vibrancy border border-white/15 shadow-2xl overflow-hidden cursor-pointer transition-all duration-200 ${
            notification.leaving ? 'opacity-0 translate-x-[110%]' : 'opacity-100'
        }`}
    >
        <div className="bg-black/35 p-3 flex gap-3">
            <img src={getAppIcon(notification.app)} alt={notification.app} className="w-9 h-9 flex-shrink-0 self-center" />

            <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-white leading-tight">{notification.title}</p>
                <p className="text-xs text-white/80 leading-snug truncate">{notification.body}</p>
            </div>

            <button
                onClick={(e) => { e.stopPropagation(); onDismiss(); }}
                className="text-white/50 hover:text-white text-xs self-start"
            >
                ✕
            </button>
        </div>
    </div>
);

export default NotificationBanner;
