import { InMemoryTaskRepository } from '../repositories/in-memory-task-repository';
import { MongooseTaskRepository } from '../repositories/mongoose-taks-repository';

export function getRepositoryForEnvironment(isTest?: boolean) {
  const repositoryType =
    process.env[!isTest ? 'REPOSITORY' : 'REPOSITORY_TEST'];

  if (repositoryType === 'MONGOOSE') {
    return new MongooseTaskRepository();
  } else if (repositoryType === 'INMEMORY') {
    return new InMemoryTaskRepository();
  } else {
    throw new Error('Invalid STORAGE_TYPE');
  }
}
