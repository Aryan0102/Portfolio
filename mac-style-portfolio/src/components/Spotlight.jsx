import { useState, useEffect, useRef, useContext } from 'react';
import { Context } from '../context';
import { apps, getAppIcon } from '../appList';
import { desktopItems } from '../desktopItems';
import { getInformation } from '../getInfo';
import { IoSearch } from "react-icons/io5";

const sources = [
    { sheet: 'Skills', app: 'App Store', category: 'Skills', title: (row) => row.title, subtitle: (row) => row.description },
    { sheet: 'Experience', app: 'Time Machine', category: 'Experience', title: (row) => row.company, subtitle: (row) => [row.role, row.date].filter(Boolean).join(' · ') },
    { sheet: 'Projects', app: 'Visual Studio Code', category: 'Projects', title: (row) => row.title, subtitle: (row) => row.tech || row.description },
    { sheet: 'Research2', app: 'Matlab', category: 'Research', title: (row) => row.lab, subtitle: (row) => row.current_project || row.areas },
    { sheet: 'Maps', app: 'Maps', category: 'Places', title: (row) => row.name, subtitle: (row) => row.address || row.description },
    { sheet: 'BucketList', app: 'Reminders', category: 'Bucket List', title: (row) => row.title, subtitle: (row) => row.description || row.category },
    { sheet: 'Safari', app: 'Safari', category: 'Bookmarks', title: (row) => row.title, subtitle: (row) => row.description },
    { sheet: 'Tips', app: 'Tips', category: 'Tips', title: (row) => row.title, subtitle: (row) => row.description }
];

const Spotlight = () => {
    const { spotlightOpen, toggleSpotlight, closeSpotlight, handleOpenWindow } = useContext(Context);
    const [query, setQuery] = useState('');
    const [selected, setSelected] = useState(0);
    const [index, setIndex] = useState([]);
    const [indexing, setIndexing] = useState(false);

    const inputRef = useRef(null);
    const rowRefs = useRef({});
    const indexed = useRef(false);

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.metaKey && (e.key === 'k' || e.code === 'Space')) {
                e.preventDefault();
                toggleSpotlight();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [toggleSpotlight]);

    useEffect(() => {
        if (!spotlightOpen || indexed.current) return;
        indexed.current = true;

        const buildIndex = async () => {
            setIndexing(true);
            try {
                const sheets = await Promise.all(sources.map((source) => getInformation(source.sheet)));
                const entries = [];

                sheets.forEach((rows, i) => {
                    const source = sources[i];
                    (rows || []).forEach((row) => {
                        const title = source.title(row);
                        if (!title) return;
                        entries.push({
                            title,
                            subtitle: source.subtitle(row) || '',
                            category: source.category,
                            app: source.app,
                            target: title,
                            icon: getAppIcon(source.app)
                        });
                    });
                });

                setIndex(entries);
            } catch (error) {
                console.error("Error building the Spotlight index:", error);
            } finally {
                setIndexing(false);
            }
        };

        buildIndex();
    }, [spotlightOpen]);

    useEffect(() => {
        if (spotlightOpen) {
            inputRef.current?.focus();
        } else {
            setQuery('');
            setSelected(0);
        }
    }, [spotlightOpen]);

    const search = query.trim().toLowerCase();

    const appMatches = (search
        ? apps.filter((app) => app.name.toLowerCase().includes(search))
        : apps
    ).map((app) => ({ title: app.name, subtitle: 'Application', category: 'Applications', app: app.name, icon: app.icon }));

    const shortcutMatches = (search
        ? desktopItems.filter((item) => item.name.toLowerCase().includes(search))
        : []
    ).map((item) => ({
        title: item.name,
        subtitle: item.link ? new URL(item.link).hostname.replace('www.', '') : item.app,
        category: 'Shortcuts',
        app: item.app,
        link: item.link,
        icon: item.image
    }));

    const contentMatches = search
        ? index
            .filter((entry) => entry.title.toLowerCase().includes(search) || entry.subtitle.toLowerCase().includes(search))
            .sort((a, b) => Number(b.title.toLowerCase().includes(search)) - Number(a.title.toLowerCase().includes(search)))
        : [];

    const results = [...appMatches, ...shortcutMatches, ...contentMatches].slice(0, 20);

    const sections = [];
    results.forEach((result) => {
        const section = sections.find((s) => s.category === result.category);
        if (section) {
            section.items.push(result);
        } else {
            sections.push({ category: result.category, items: [result] });
        }
    });

    useEffect(() => {
        setSelected(0);
    }, [query]);

    useEffect(() => {
        rowRefs.current[selected]?.scrollIntoView({ block: 'nearest' });
    }, [selected]);

    const openResult = (result) => {
        if (!result) return;

        if (result.link) {
            window.open(result.link, '_blank');
        } else {
            handleOpenWindow(result.app, result.target);
        }

        closeSpotlight();
    };

    const handleInputKeyDown = (e) => {
        if (e.key === 'Escape') {
            closeSpotlight();
        } else if (e.key === 'ArrowDown') {
            e.preventDefault();
            setSelected((current) => (results.length ? (current + 1) % results.length : 0));
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            setSelected((current) => (results.length ? (current - 1 + results.length) % results.length : 0));
        } else if (e.key === 'Enter') {
            e.preventDefault();
            openResult(results[selected]);
        }
    };

    if (!spotlightOpen) return null;

    let rowIndex = -1;

    return (
        <div
            className="fixed inset-0 z-[3000] flex justify-center pt-[10vh] px-4 bg-black/20"
            onMouseDown={closeSpotlight}
        >
            <div
                className="spotlight-panel h-fit rounded-2xl vibrancy border border-white/15 shadow-2xl overflow-hidden"
                onMouseDown={(e) => e.stopPropagation()}
            >
                <div className="flex items-center gap-3 px-4 h-16 bg-black/25">
                    <IoSearch className="w-6 h-6 text-white/60 flex-shrink-0" />
                    <input
                        ref={inputRef}
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        onKeyDown={handleInputKeyDown}
                        placeholder="Spotlight Search"
                        className="flex-1 bg-transparent text-2xl text-white placeholder-white/50 cursor-text focus:outline-none"
                    />
                    <p className="text-xs text-white/70 flex-shrink-0">⌘K</p>
                </div>

                <div className="max-h-[min(340px,52vh)] overflow-auto noscrollbar border-t border-white/10 p-2 bg-black/25">
                    {results.length === 0 ? (
                        <p className="text-sm text-white/60 px-2 py-3">
                            {indexing ? 'Indexing…' : `No results for “${query}”`}
                        </p>
                    ) : (
                        sections.map((section) => (
                            <div key={section.category}>
                                <p className="px-2 pt-2 pb-1 text-xs font-semibold text-white/70">{section.category}</p>
                                {section.items.map((result) => {
                                    rowIndex += 1;
                                    const position = rowIndex;

                                    return (
                                        <button
                                            key={`${result.category}-${result.title}-${position}`}
                                            ref={(node) => { rowRefs.current[position] = node; }}
                                            onMouseMove={() => position !== selected && setSelected(position)}
                                            onClick={() => openResult(result)}
                                            className={`w-full flex items-center gap-3 px-2 py-1.5 rounded-md text-left transition-colors ${
                                                position === selected ? 'bg-[#0a84ff]' : 'hover:bg-white/10'
                                            }`}
                                        >
                                            <img src={result.icon} alt={result.app} className="w-6 h-6 flex-shrink-0" />
                                            <p className="text-sm text-white truncate">{result.title}</p>
                                            <p className={`flex-1 text-xs truncate text-right ${position === selected ? 'text-white/80' : 'text-white/60'}`}>
                                                {result.subtitle}
                                            </p>
                                        </button>
                                    );
                                })}
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default Spotlight;
