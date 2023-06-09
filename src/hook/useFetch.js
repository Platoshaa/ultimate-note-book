import { useEffect, useState } from "react";
export const useFetch = (req) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [fetchError, setFetchError] = useState(null);

  return [data, isLoading, fetchError];
};
