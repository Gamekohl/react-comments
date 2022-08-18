import { DependencyList, useCallback, useEffect, useState } from "react"

export const useAsync = (func: Function, dependencies: DependencyList = []) => {
    const { exec, ...state } = useAsyncInternal(func, dependencies, true);

    useEffect(() => {
        exec();
    }, [exec]);

    return state;
}

export const useAsyncFn = (func: Function, dependencies: DependencyList = []) => {
    return useAsyncInternal(func, dependencies);
}

const useAsyncInternal = (func: Function, dependencies: DependencyList, initialLoading = false) => {
    const [loading, setLoading] = useState<boolean>(initialLoading);
    const [error, setError] = useState<any>();
    const [value, setValue] = useState<any>();

    const exec = useCallback((...params: any[]) => {
        setLoading(true);

        return func(...params)
            .then((data: any) => {
                setValue(data);
                setError(undefined);
                return data;
            })
            .catch((error: any) => {
                setValue(undefined);
                setError(error);
                return Promise.reject(error);
            })
            .finally(() => {
                setLoading(false);
            })
    }, dependencies);

    return { loading, error, value, exec };
}