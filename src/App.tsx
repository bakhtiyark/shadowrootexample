import React, { useRef, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import './App.css'
import './index.css'

interface ShadowRootContainerProps {
    children: React.ReactNode;
    depth: number;
}

const getStyle = (depth: number) => {
    const styles: { [key: number]: string } = {
        1: `.layer-1 { font-size: 26px; }`,
        2: `.layer-2 { font-size: 22px; }`,
        3: `.layer-3 { font-size: 18px; }`,
        4: `.layer-4 { font-size: 14px; }`,
    };

    if (depth in styles) {
        return styles[depth];
    }

    return '';
};

const ShadowRootContainer: React.FC<ShadowRootContainerProps> = ({ children, depth }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [shadowRoot, setShadowRoot] = useState<ShadowRoot | null>(null);

    useEffect(() => {
        if (containerRef.current && !shadowRoot) {
            const shadow = containerRef.current.attachShadow({ mode: 'open' });
            setShadowRoot(shadow);
        }
    }, [shadowRoot]);

    useEffect(() => {
        if (shadowRoot) {
            const style = document.createElement('style');
            style.textContent = getStyle(depth);
            shadowRoot.appendChild(style);
        }
    }, [shadowRoot, depth]);

    return (
        <div ref={containerRef} className={`entry-point-${depth}`}>
            {shadowRoot && ReactDOM.createPortal(children, shadowRoot)}
        </div>
    );
};

const NestedShadowRoots: React.FC = () => (
    <ShadowRootContainer depth={1}>
        <div className="layer-1">
            First layer of Shadow root.
        </div>
        <ShadowRootContainer depth={2}>
            <div className="layer-2">
                Second layer of Shadow root.
            </div>
            <ShadowRootContainer depth={3}>
                <div className="layer-3">
                    Third layer of Shadow root, it's getting hotter here.
                </div>
                <ShadowRootContainer depth={4}>
                    <div className="layer-4">
                        This is deeply nested within 4 shadow roots. Burning wild.
                    </div>
                </ShadowRootContainer>
                <ShadowRootContainer depth={5}>
                    <div className="layer-5">
                        <button>This is what we are looking for</button>
                    </div>
                </ShadowRootContainer>
            </ShadowRootContainer>
        </ShadowRootContainer>
    </ShadowRootContainer>
);

const App: React.FC = () => {
    return (
        <div className="main">
            <h1>React App with Nested Shadow Roots</h1>
            <NestedShadowRoots />
        </div>
    );
};

export default App;
