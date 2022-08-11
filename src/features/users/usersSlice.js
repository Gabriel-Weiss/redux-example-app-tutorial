import { createSelector } from '@reduxjs/toolkit'
import { apiSlice } from '../../api/apiSlice'

// Calling `someEndpoint.select(someArg)` generates a new selector that will return
// the query result object for a query with those parameters.
// In this case, the users query has no params, so we don't pass anything to select()
// export const selectUsersResult = apiSlice.endpoints.getUsers.select()

const emptyUsers = []

export const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getUsers: builder.query({
      query: () => '/users'
    })
  })
})

export const { useGetUsersQuery } = extendedApiSlice

export const selectUsersResult = extendedApiSlice.endpoints.getUsers.select()

export const selectAllUsers = createSelector(
  selectUsersResult,
  usersResult => usersResult?.data ?? emptyUsers
)

export const selectUserById = createSelector(
  selectAllUsers,
  (state, userId) => userId,
  (users, userId) => users.find(user => user.id === userId)
)