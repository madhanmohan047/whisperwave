import { useContext, createContext, useState, useEffect } from "react";

const BreakPointContext = createContext();

const BreakPointProvider = ({ children }) => {
    const [breakPoint, setBreakPoint] = useState();

    const onResize = () => {
        if (window.innerWidth < 576) {
            setBreakPoint('phone');
        }
        else if (window.innerWidth < 768) {
            setBreakPoint('tablet')
        }
        else {
            setBreakPoint('desktop')
        }
    }

    window.onresize = onResize;

    useEffect(() => {
        onResize();
    }, []);

    return (
        <BreakPointContext.Provider value={{ breakPoint }}>
            {children}
        </BreakPointContext.Provider>
    );

};

export default BreakPointProvider;

export const useBreakPoint = () => {
    return useContext(BreakPointContext);
};