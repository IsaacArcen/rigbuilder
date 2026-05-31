import { createContext, useContext, useEffect, useState } from "react";

const BuildContext = createContext();

const emptyBuild = {
  cpu: null,
  gpu: null,
  motherboard: null,
  ram: null,
  storage: null,
  cooling: null,
  extra: null,
  psu: null,
  case: null,
};

export function BuildProvider({ children }) {
    const [build, setBuild] = useState(() => {
        const savedBuild = localStorage.getItem("build");

        if (savedBuild) {
            return JSON.parse(savedBuild);
        }

        return emptyBuild;
    });

    useEffect(() => {
        localStorage.setItem("build", JSON.stringify(build));
    }, [build]);

    const selectComponent = (category, product) => {
        setBuild((currentBuild) => ({
            ...currentBuild,
            [category]: {
                ...product,
                quantity: 1,
            },
        }));
    };

    const removeComponent = (category) => {
        setBuild((currentBuild) => ({
            ...currentBuild,
            [category]: null,
        }));
    };

    const clearBuild = () => {
        setBuild(emptyBuild);
    };

    return (
        <BuildContext.Provider
            value={{
                build,
                selectComponent,
                removeComponent,
                clearBuild,
            }}
            >
            {children}
            </BuildContext.Provider>
    );
}

export function useBuild() {
    return useContext(BuildContext);
}