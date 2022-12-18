import { useState, useEffect, useMemo } from "react";

const LIMIT = 20;

const useGiphy = () => {
  const [offset, setOffset] = useState(0);
  const [gifs, setGifs] = useState<any>([]);
  const [data, setData] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>(false);
  const maximumOffset = 4999;

  const fetchGifs = async () => {
    setError(false);
    setLoading(true);
    try {
      const response = await fetch(
        `http://api.giphy.com/v1/gifs/trending?api_key=6wFW7z1QzgfOfkWXUFsFANV5PYGcV83r&limit=${LIMIT}&offset=${offset}`
      );
      const data = await response.json();
      setGifs(data.data);
      setData((prevData: any) => {
        return [...new Set([...prevData, ...data.data])];
      });
      setError(false);
      setLoading(false);
    } catch (error) {
      setError(true);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGifs();
  }, [offset]);

  const fetchNextPage = () => {
    setOffset((prevOffset) => prevOffset + LIMIT);
  };

  const hasNextPage = useMemo(() => {
    return offset < maximumOffset;
  }, [gifs]);

  return {
    error,
    fetchNextPage,
    loading,
    hasNextPage,
    gifs,
    data,
  };
};

export default useGiphy;
