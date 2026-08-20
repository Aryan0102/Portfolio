import { useState, useEffect, useRef, useContext } from 'react';
import { Context } from '../context';
import { apps, getAppIcon } from '../appList';
import { getInformation } from '../getInfo';
import { IoSearch } from "react-icons/io5";

// Each sheet is indexed under the app that shows it, so a hit can open that app
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

    // ⌘K opens it, ⌘Space too where the OS hasn't already claimed it
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

    // Pull every sheet in the first time Spotlight is opened
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

    const contentMatches = search
        ? index
            .filter((entry) => entry.title.toLowerCase().includes(search) || entry.subtitle.toLowerCase().includes(search))
            // Title hits outrank description hits
            .sort((a, b) => Number(b.title.toLowerCase().includes(search)) - Number(a.title.toLowerCase().includes(search)))
        : [];

    const results = [...appMatches, ...contentMatches].slice(0, 20);

    // Group into sections while keeping the flat order for keyboard selection
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
        handleOpenWindow(result.app);
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
            className="fixed inset-0 z-[3000] flex justify-center pt-[14vh] bg-black/20"
            onMouseDown={closeSpotlight}
        >
            <div
                className="w-[680px] h-fit rounded-2xl bg-gray-900 border border-gray-700 shadow-2xl overflow-hidden"
                onMouseDown={(e) => e.stopPropagation()}
            >
                {/* Search field */}
                <div className="flex items-center gap-3 px-4 h-16">
                    <IoSearch className="w-6 h-6 text-gray-400 flex-shrink-0" />
                    <input
                        ref={inputRef}
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        onKeyDown={handleInputKeyDown}
                        placeholder="Spotlight Search"
                        className="flex-1 bg-transparent text-2xl text-white placeholder-gray-500 cursor-text focus:outline-none"
                    />
                    <p className="text-xs text-gray-500 flex-shrink-0">⌘K</p>
                </div>

                {/* Results */}
                <div className="max-h-[340px] overflow-auto noscrollbar border-t border-gray-800 p-2">
                    {results.length === 0 ? (
                        <p className="text-sm text-gray-400 px-2 py-3">
                            {indexing ? 'Indexing…' : `No results for “${query}”`}
                        </p>
                    ) : (
                        sections.map((section) => (
                            <div key={section.category}>
                                <p className="px-2 pt-2 pb-1 text-xs font-semibold text-gray-500">{section.category}</p>
                                {section.items.map((result) => {
                                    rowIndex += 1;
                                    const position = rowIndex;

                                    return (
                                        <button
                                            key={`${result.category}-${result.title}-${position}`}
                                            ref={(node) => { rowRefs.current[position] = node; }}
                                            onMouseEnter={() => setSelected(position)}
                                            onClick={() => openResult(result)}
                                            className={`w-full flex items-center gap-3 px-2 py-1.5 rounded-md text-left transition-colors ${
                                                position === selected ? 'bg-blue-600' : 'hover:bg-gray-800'
                                            }`}
                                        >
                                            <img src={result.icon} alt={result.app} className="w-6 h-6 flex-shrink-0" />
                                            <p className="text-sm text-white truncate">{result.title}</p>
                                            <p className={`flex-1 text-xs truncate text-right ${position === selected ? 'text-blue-100' : 'text-gray-400'}`}>
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
