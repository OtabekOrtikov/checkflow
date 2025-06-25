// src/services/api.ts
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

import {
  mockProfileInfo,
  mockTimeWorked,
  mockDepartmentAssignments,
  mockPositionAssignments,
} from '@/data/profile';
import type {
  ProfileInfo,
  TimeWorkedRecord,
  DepartmentAssignment,
  PositionAssignment,
} from '@/types/profile.t';

// 1) Создаём Axios-инстанс
export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000',
  headers: { 'Content-Type': 'application/json' },
});

// 2) Вешаем моки, только в режиме разработки
if (process.env.NODE_ENV === 'development') {
  const mock = new MockAdapter(api, { delayResponse: 300 });

  mock.onGet('/user/profile').reply(200, mockProfileInfo);
  mock.onGet('/user/time-worked').reply(200, mockTimeWorked);
  mock.onGet('/user/departments').reply(200, mockDepartmentAssignments);
  mock.onGet('/user/positions').reply(200, mockPositionAssignments);

  // можно также мокать POST/PUT/DELETE:
  // mock.onPost('/user/departments').reply(201, newDept)
}

export const fetchProfileInfo = () =>
  api.get<ProfileInfo>('/user/profile');

export const fetchTimeWorked = () =>
  api.get<TimeWorkedRecord[]>('/user/time-worked');

export const fetchDepartments = () =>
  api.get<DepartmentAssignment[]>('/user/departments');

export const fetchPositions = () =>
  api.get<PositionAssignment[]>('/user/positions');
