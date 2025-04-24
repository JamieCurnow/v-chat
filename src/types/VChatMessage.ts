export type VChatMessage<T extends object = object> = {
  role?: 'model' | 'user' | string
  text?: string
  id?: string
  index?: number
} & T
