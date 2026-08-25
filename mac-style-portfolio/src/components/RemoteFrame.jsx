import { useState, useEffect } from 'react';
import { MacOSLoader } from '../assets/loader';

const RemoteFrame = ({ src, title, className, wrapperClassName, sandbox }) => {
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        setLoaded(false);
    }, [src]);

    return (
        <div className={`relative ${wrapperClassName}`}>
            {!loaded && (
                <div className="absolute inset-0 flex items-center justify-center">
                    <MacOSLoader size={40} />
                </div>
            )}

            <iframe
                src={src}
                title={title}
                sandbox={sandbox}
                onLoad={() => setLoaded(true)}
                className={`${className} transition-opacity duration-200 ${loaded ? 'opacity-100' : 'opacity-0'}`}
            />
        </div>
    );
};

export default RemoteFrame;
