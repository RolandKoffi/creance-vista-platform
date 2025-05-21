
import { apiGet, apiPatch } from './apiClient';
import { API_URLS } from './config';
import { Notification } from '@/types';

export const getAllNotifications = async (): Promise<Notification[]> => {
  return await apiGet<Notification[]>(API_URLS.NOTIFICATIONS);
};

export const markNotificationAsRead = async (id: string): Promise<Notification> => {
  return await apiPatch<Notification>(API_URLS.NOTIFICATION_READ(id), {});
};
