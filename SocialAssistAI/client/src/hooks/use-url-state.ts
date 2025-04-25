import { useCallback, useEffect } from "react";
import { useLocation, useSearch } from "wouter";

/**
 * Hook to manage state synchronized with URL parameters
 */
export function useUrlState<T extends Record<string, any>>(
  initialState: T
): [T, (newState: Partial<T>) => void] {
  const [location, setLocation] = useLocation();
  const search = useSearch();
  const searchParams = new URLSearchParams(search);

  // Parse current URL parameters
  const parseUrlParams = useCallback(() => {
    const result = { ...initialState } as T;

    // Handle string values
    for (const key of Object.keys(initialState)) {
      if (searchParams.has(key)) {
        const value = searchParams.get(key);
        if (value !== null) {
          if (key === "specialties") {
            // Handle specialties as array
            (result as any)[key] = value ? value.split(",") : [];
          } else if (value === "null") {
            // Handle explicit null values
            (result as any)[key] = null;
          } else {
            // Handle primitive values
            (result as any)[key] = value;
          }
        }
      }
    }

    return result;
  }, [search, initialState]);

  // Update URL with new state
  const setState = useCallback(
    (newState: Partial<T>) => {
      const nextState = { ...parseUrlParams(), ...newState };
      const params = new URLSearchParams();

      // Add all non-null, non-empty values to URL
      for (const [key, value] of Object.entries(nextState)) {
        if (value !== null && value !== undefined) {
          if (Array.isArray(value)) {
            if (value.length > 0) {
              params.set(key, value.join(","));
            }
          } else if (value !== "") {
            params.set(key, String(value));
          }
        }
      }

      // Build new URL and navigate
      const newSearch = params.toString();
      const newPath = newSearch ? `${location.split("?")[0]}?${newSearch}` : location.split("?")[0];
      setLocation(newPath);
    },
    [location, setLocation, parseUrlParams]
  );

  return [parseUrlParams(), setState];
}
