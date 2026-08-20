import { useEffect, useRef, useContext } from 'react';
import { Context } from './context';

export const useLaunchTarget = (appName, ready, apply) => {
    const { launchTarget, clearLaunchTarget } = useContext(Context);
    const applyRef = useRef(apply);
    applyRef.current = apply;

    useEffect(() => {
        if (!ready || launchTarget?.app !== appName) return;

        applyRef.current(launchTarget.title);
        clearLaunchTarget();
    }, [ready, launchTarget, appName, clearLaunchTarget]);
};
