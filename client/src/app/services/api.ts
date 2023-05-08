import { createApi, fetchBaseQuery, retry} from '@reduxjs/toolkit/query/react'
import { RootState } from '../store'

const baseQuety = fetchBaseQuery({
  baseUrl: 'http://localhost:8000/api',
  prepareHeaders: (headers, {getState}) => {
    const token = (getState() as RootState).auth.user?.token || localStorage.getItem('token');
    
    if(token && token !== null){
      headers.set('authorization', `Bearer ${token}`)
    }
  }
});

const baseQuetyWithRetry = retry(baseQuety, {maxRetries: 1});//переотправляет запрос, при получении ошибки с первой повытки

export const api = createApi({
  reducerPath: 'splitApi',
  baseQuery: baseQuetyWithRetry,
  refetchOnMountOrArgChange: true,
  endpoints: () => ({}),
})