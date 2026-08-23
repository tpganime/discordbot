export interface BotStats {
  guilds: number;
  users: number;
  commands: number;
}

export interface Command {
  name: string;
  description: string;
  category: string;
}
