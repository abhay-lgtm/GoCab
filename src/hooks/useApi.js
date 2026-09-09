import { useState, useEffect, useCallback } from 'react';

export function useApi(url, { method = 'GET', body = null, skip = false, pollInterval = 0 } = {}) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(!skip);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async (isPolling = false) => {
    if (!url || skip) return;
    if (!isPolling) setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: body ? JSON.stringify(body) : undefined,
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.message || 'Request failed');
      setData(json);
    } catch (err) {
      if (!isPolling) setError(err.message);
    } finally {
      if (!isPolling) setLoading(false);
    }
  }, [url, skip, method, body]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    if (!pollInterval || pollInterval <= 0 || skip) return;
    const timer = setInterval(() => {
      fetchData(true);
    }, pollInterval);
    return () => clearInterval(timer);
  }, [fetchData, pollInterval, skip]);

  return { data, loading, error, refetch: () => fetchData(false) };
}

export async function apiPost(url, body, method = 'POST') {
  const token = localStorage.getItem('token');
  const res = await fetch(url, {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: body ? JSON.stringify(body) : undefined,
  });
  const json = await res.json();
  if (!res.ok) throw new Error(json.message || 'Request failed');
  return json;
}
