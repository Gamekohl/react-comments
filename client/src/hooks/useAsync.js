import { useCallback, useEffect, useState } from "react"

export const useAsync = (func, dependencies = []) => {
    const { exec, ...state } = useAsyncInternal(func, dependencies, true);

    useEffect(() => {
        exec();
    }, [exec]);

    return state;
}

export const useAsyncFn = (func, dependencies = []) => {
    return useAsyncInternal(func, dependencies);
}

const useAsyncInternal = (func, dependencies, initialLoading = false) => {
    const [loading, setLoading] = useState(initialLoading);
    const [error, setError] = useState();
    const [value, setValue] = useState();

    const exec = useCallback((...params) => {
        setLoading(true);

        return func(...params)
            .then(data => {
                setValue(data);
                setError(undefined);
                return data;
            })
            .catch(error => {
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