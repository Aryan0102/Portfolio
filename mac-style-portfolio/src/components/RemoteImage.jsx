import { useState, useEffect, useRef } from 'react';
import { MacOSLoader } from '../assets/loader';

const RemoteImage = ({ src, alt, className, wrapperClassName, loaderSize = 32 }) => {
    const [loaded, setLoaded] = useState(false);
    const imageRef = useRef(null);

    useEffect(() => {
        setLoaded(Boolean(imageRef.current?.complete));
    }, [src]);

    return (
        <div className={`relative overflow-hidden ${wrapperClassName}`}>
            {!loaded && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-800">
                    <MacOSLoader size={loaderSize} />
                </div>
            )}

            <img
                ref={imageRef}
                src={src}
                alt={alt}
                onLoad={() => setLoaded(true)}
                onError={() => setLoaded(true)}
                className={`${className} transition-opacity duration-200 ${loaded ? 'opacity-100' : 'opacity-0'}`}
            />
        </div>
    );
};

export default RemoteImage;
