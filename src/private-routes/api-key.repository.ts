export abstract class ApiKeyRepository {
  abstract exists(apiKey: string): Promise<boolean>
  abstract all(): Promise<string[]>
}
