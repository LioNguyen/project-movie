import { createAxios } from "@/utils";
import { useState } from "react";

export const useApi = () => {
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const axios = createAxios();

  const getData = async (
    url: string,
    successCallback?: (value: any) => void
  ) => {
    try {
      setLoading(true);
      const res = await axios.get(url);

      if (res) {
        setData(res.data);

        if (successCallback) {
          successCallback(res.data);
        }
      }
    } catch (error: any) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  return { data, error, loading, getData };
};
