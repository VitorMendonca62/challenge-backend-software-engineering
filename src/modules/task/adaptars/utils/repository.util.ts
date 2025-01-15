import { InMemoryTaskRepository } from '../secondary/database/repositories/in-memory-task-repository';
import { MongooseTaskRepository } from '../secondary/database/repositories/mongoose-taks-repository';

export function getRepositoryForEnvironment(isTest?: boolean) {
  const repositoryType =
    process.env[!isTest ? 'REPOSITORY' : 'REPOSITORY_TEST'];

  switch (repositoryType) {
    case 'MONGOOSE':
      return new MongooseTaskRepository();
    case 'INMEMORY':
      return new InMemoryTaskRepository();
    default:
      throw new Error('Invalid STORAGE_TYPE');
  }
}
