import '@types/redis';

declare module 'redis' {
  export interface RedisClient {
    hsetAsync(hashKey: string, field: string, value: string, ...args: any): Promise<number>;
    hgetAsync(hashKey: string, key: string): Promise<string>;
  }
}
