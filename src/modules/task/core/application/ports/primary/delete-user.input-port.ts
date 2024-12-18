export interface DeleteTaskInputPort {
  execute(id: string): Promise<undefined>;
}
