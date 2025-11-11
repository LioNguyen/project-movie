import { useState, useCallback } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { axiosInstance } from '@/core/services/axios'
import type {
  BaseAxiosResponse,
  BaseServiceOptions,
  BasePaginationParams,
  BasePaginationResponse,
} from '@/core/domains/types'

/**
 * Generic BaseService hook for API operations
 * Provides common patterns for Create, Read, Update, Delete operations
 */
export const useBaseService = <T extends { id: string }>(
  options: BaseServiceOptions<T>
) => {
  const {
    endpoint,
    queryKey,
    defaultSort = 'createdAt',
    defaultFilters = {},
    onSuccess,
    onError,
  } = options

  const queryClient = useQueryClient()
  const [params, setParams] = useState<BasePaginationParams>({
    page: 1,
    limit: 10,
    sort: defaultSort,
    order: 'desc',
    search: '',
    filters: defaultFilters,
  })

  // GET /endpoint - Get all items with pagination
  const getAllQuery = useQuery({
    queryKey: [...queryKey, 'list', params],
    queryFn: async (): Promise<BasePaginationResponse<T>> => {
      const response = await axiosInstance.get<
        BaseAxiosResponse<BasePaginationResponse<T>>
      >(endpoint, { params })
      return response.data.data
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  })

  // GET /endpoint/:id - Get single item by ID (hook factory)
  const getById = useCallback(
    (id: string | null) => {
      // This returns a query hook that can be used in components
      // eslint-disable-next-line react-hooks/rules-of-hooks
      return useQuery({
        queryKey: [...queryKey, 'detail', id],
        queryFn: async (): Promise<T> => {
          if (!id) throw new Error('ID is required')
          const response = await axiosInstance.get<BaseAxiosResponse<T>>(
            `${endpoint}/${id}`
          )
          return response.data.data
        },
        enabled: !!id,
        staleTime: 5 * 60 * 1000, // 5 minutes
      })
    },
    [endpoint, queryKey]
  )

  // POST /endpoint - Create new item
  const createMutation = useMutation({
    mutationFn: async (
      data: Omit<T, 'id' | 'createdAt' | 'updatedAt'>
    ): Promise<T> => {
      const response = await axiosInstance.post<BaseAxiosResponse<T>>(
        endpoint,
        data
      )
      return response.data.data
    },
    onSuccess: (data) => {
      // Invalidate and refetch list to show new item
      queryClient.invalidateQueries({ queryKey: [...queryKey, 'list'] })
      onSuccess?.(data)
    },
    onError: (error) => {
      onError?.(error as Error)
    },
  })

  const create = useCallback(
    (data: Omit<T, 'id' | 'createdAt' | 'updatedAt'>) => {
      return createMutation.mutate(data)
    },
    [createMutation]
  )

  const createAsync = useCallback(
    async (data: Omit<T, 'id' | 'createdAt' | 'updatedAt'>) => {
      return createMutation.mutateAsync(data)
    },
    [createMutation]
  )

  // PUT /endpoint/:id - Update item
  const updateMutation = useMutation({
    mutationFn: async ({
      id,
      data,
    }: {
      id: string
      data: Partial<T>
    }): Promise<T> => {
      const response = await axiosInstance.put<BaseAxiosResponse<T>>(
        `${endpoint}/${id}`,
        data
      )
      return response.data.data
    },
    onSuccess: (data) => {
      // Update specific item in cache
      queryClient.setQueryData([...queryKey, 'detail', data.id], data)
      // Invalidate list to reflect updated item
      queryClient.invalidateQueries({ queryKey: [...queryKey, 'list'] })
      onSuccess?.(data)
    },
    onError: (error) => {
      onError?.(error as Error)
    },
  })

  const update = useCallback(
    (params: { id: string; data: Partial<T> }) => {
      return updateMutation.mutate(params)
    },
    [updateMutation]
  )

  const updateAsync = useCallback(
    async (params: { id: string; data: Partial<T> }) => {
      return updateMutation.mutateAsync(params)
    },
    [updateMutation]
  )

  // DELETE /endpoint/:id - Delete item
  const deleteMutation = useMutation({
    mutationFn: async (id: string): Promise<void> => {
      await axiosInstance.delete(`${endpoint}/${id}`)
    },
    onSuccess: (_, id) => {
      // Remove item from cache
      queryClient.removeQueries({ queryKey: [...queryKey, 'detail', id] })
      // Invalidate list to reflect deleted item
      queryClient.invalidateQueries({ queryKey: [...queryKey, 'list'] })
    },
    onError: (error) => {
      onError?.(error as Error)
    },
  })

  const deleteItem = useCallback(
    (id: string) => {
      return deleteMutation.mutate(id)
    },
    [deleteMutation]
  )

  const deleteAsync = useCallback(
    async (id: string) => {
      return deleteMutation.mutateAsync(id)
    },
    [deleteMutation]
  )

  // Bulk operations
  const bulkDeleteMutation = useMutation({
    mutationFn: async (ids: string[]): Promise<void> => {
      await axiosInstance.delete(endpoint, { data: { ids } })
    },
    onSuccess: (_, ids) => {
      // Remove items from cache
      ids.forEach((id) => {
        queryClient.removeQueries({ queryKey: [...queryKey, 'detail', id] })
      })
      // Invalidate list to reflect bulk deleted items
      queryClient.invalidateQueries({ queryKey: [...queryKey, 'list'] })
    },
    onError: (error) => {
      onError?.(error as Error)
    },
  })

  const bulkDelete = useCallback(
    (ids: string[]) => {
      return bulkDeleteMutation.mutate(ids)
    },
    [bulkDeleteMutation]
  )

  const bulkDeleteAsync = useCallback(
    async (ids: string[]) => {
      return bulkDeleteMutation.mutateAsync(ids)
    },
    [bulkDeleteMutation]
  )

  // Helper functions
  const updateParams = useCallback(
    (newParams: Partial<BasePaginationParams>) => {
      setParams((prev) => ({ ...prev, ...newParams }))
    },
    []
  )

  const setPage = useCallback(
    (page: number) => {
      updateParams({ page })
    },
    [updateParams]
  )

  const setLimit = useCallback(
    (limit: number) => {
      updateParams({ limit, page: 1 }) // Reset to first page when changing limit
    },
    [updateParams]
  )

  const setSort = useCallback(
    (sort: string, order: 'asc' | 'desc' = 'desc') => {
      updateParams({ sort, order, page: 1 }) // Reset to first page when changing sort
    },
    [updateParams]
  )

  const setSearch = useCallback(
    (search: string) => {
      updateParams({ search, page: 1 }) // Reset to first page when searching
    },
    [updateParams]
  )

  const setFilters = useCallback(
    (filters: Record<string, unknown>) => {
      updateParams({ filters, page: 1 }) // Reset to first page when filtering
    },
    [updateParams]
  )

  const resetParams = useCallback(() => {
    setParams({
      page: 1,
      limit: 10,
      sort: defaultSort,
      order: 'desc',
      search: '',
      filters: defaultFilters,
    })
  }, [defaultSort, defaultFilters])

  // Optimistic updates
  const optimisticUpdate = useCallback(
    (id: string, data: Partial<T>) => {
      queryClient.setQueryData(
        [...queryKey, 'detail', id],
        (old: T | undefined) => {
          if (!old) return old
          return { ...old, ...data }
        }
      )
    },
    [queryClient, queryKey]
  )

  const optimisticDelete = useCallback(
    (id: string) => {
      // Remove from list cache
      queryClient.setQueryData(
        [...queryKey, 'list', params],
        (old: BasePaginationResponse<T> | undefined) => {
          if (!old) return old
          return {
            ...old,
            data: old.data.filter((item) => item.id !== id),
            total: old.total - 1,
          }
        }
      )
      // Remove from detail cache
      queryClient.removeQueries({ queryKey: [...queryKey, 'detail', id] })
    },
    [queryClient, queryKey, params]
  )

  return {
    // Query actions
    getAll: getAllQuery,
    getById,

    // Mutation actions
    create,
    createAsync,
    update,
    updateAsync,
    delete: deleteItem,
    deleteAsync,
    bulkDelete,
    bulkDeleteAsync,

    // Pagination & Filtering actions
    params,
    updateParams,
    setPage,
    setLimit,
    setSort,
    setSearch,
    setFilters,
    resetParams,

    // Optimistic update actions
    optimisticUpdate,
    optimisticDelete,
  }
}
