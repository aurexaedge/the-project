import axios from 'axios';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

const useFetchData = ({
  queryKey,
  endpoint,
  queryFn = async () => {
    const response = await axios.get(endpoint);
    const data = await response.data.message;
    // console.log(`${queryKey} data:`, data);
    return data;
  },
  staleTime = 1000,
  refetchInterval = 1000 * 60,
}) => {
  return useQuery({
    queryKey,
    queryFn,
    staleTime,
    refetchInterval,
  });
};

export default useFetchData;
