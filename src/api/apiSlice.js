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
      providesTags: (result = [], error, arg) => [
        'Post',
        ...result.map(({ id }) => ({ type: 'Post', id }))
      ]
    }),
    getPost: builder.query({
      query: id => `/posts/${id}`,
      providesTags: (result, error, arg) => [{ type: 'Post', id: arg }]
    }),
    addPost: builder.mutation({
      query: post => ({
        url:'/posts',
        method: 'POST',
        body: post
      }),
      invalidatesTags:  ['Post'],
    }),
    editPost: builder.mutation({
      query: post => ({
        url: `/posts/${post.id}`,
        method: 'PATCH',
        body: post
      }),
      invalidatesTags: (result, error, arg) => [{ type: 'Post', id: arg.id }]
    }),
    getUsers: builder.query({
      query: () => '/users'
    })
  })
})

export const { 
  useGetPostsQuery, useGetUsersQuery, useGetPostQuery, useAddPostMutation, useEditPostMutation, 
} = apiSlice