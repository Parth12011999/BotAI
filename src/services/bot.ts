import { createApiService, handleApiError } from '@/lib/axios';
import { Bot, BotCreateRequest, BotListResponse, BotDeleteResponse } from '@/types/chat';

const botService = createApiService<BotCreateRequest | { bot_id: string }>('/chat/bot');

export const bot = {
  list: async () => {
    try {
      return await botService.get<BotListResponse>('/list');
    } catch (error) {
      throw handleApiError(error);
    }
  },

  create: async (data: BotCreateRequest) => {
    try {
      return await botService.post<Bot>('/create', data);
    } catch (error) {
      throw handleApiError(error);
    }
  },

  delete: async (botId: string) => {
    try {
      return await botService.delete<BotDeleteResponse>('/delete', { bot_id: botId });
    } catch (error) {
      throw handleApiError(error);
    }
  },
}; 