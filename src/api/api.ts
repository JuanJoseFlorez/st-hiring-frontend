import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { EventDTO, Event, Settings, SettingsInput, toEvent } from './types';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: '' }),
  tagTypes: ['Settings'],
  endpoints: (builder) => ({
    getEvents: builder.query<Event[], void>({
      query: () => '/events',
      transformResponse: (response: EventDTO[]) => response.map(toEvent),
    }),
    getSettings: builder.query<Settings, void>({
      query: () => '/settings',
      providesTags: ['Settings'],
    }),
    postSettings: builder.mutation<Settings, SettingsInput>({
      query: (body) => ({ url: '/settings', method: 'POST', body }),
      invalidatesTags: (_result, error) => (error ? [] : ['Settings']),
    }),
  }),
});

export const { useGetEventsQuery, useGetSettingsQuery, usePostSettingsMutation } = api;
