export const botKeys = {
  all: ["bots"] as const,
  lists: () => [...botKeys.all, "list"] as const,
  list: (userId: string) => [...botKeys.lists(), userId] as const,
  details: (botId: string) => [...botKeys.all, "detail", botId] as const,
} as const; 