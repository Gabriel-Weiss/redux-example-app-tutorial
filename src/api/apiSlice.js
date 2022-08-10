import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const apiSlice = createApi({
  // The cache reducer(optional) expects to be added at `state.api` (this is default)
  reducerPath: 'api',
  // All of our requests will have URLs starting with '/fakeApi'
  baseQuery: fetchBaseQuery({ baseUrl: '/fakeApi' }),
  tagTypes: ['Post'],
  endpoints: builder => ({
    getPosts: builder.query({
      query: () => '/posts',
      providesTags: ['Post'],
    }),
    getPost: builder.query({
      query: id => `/posts/${id}`
    }),
    addPost: builder.mutation({
      query: post => ({
        url:'/posts',
        method: 'POST',
        body: post
      }),
      invalidatesTags:  ['Post'],
    })
  })
})

export const { useGetPostsQuery, useGetPostQuery, useAddPostMutation } = apiSlice