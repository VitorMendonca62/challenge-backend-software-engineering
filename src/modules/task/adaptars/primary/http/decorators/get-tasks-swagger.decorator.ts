import { EnumTaskStatus } from '@modules/task/core/domain/task.entity';
import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiResponse } from '@nestjs/swagger';

export function GetTasksSwagger() {
  return applyDecorators(
    ApiOperation({
      summary: 'Listar todas as tarefas no banco de dados',
    }),
    ApiQuery({
      name: 'status',
      required: false,
      description: 'A  tarefa é encontrada pelo status',
      enum: EnumTaskStatus,
    }),
    ApiResponse({ status: 200, description: 'Listagem de todas as tarefas' }),
    ApiResponse({ status: 400, description: 'Dados inválidos' }),
    ApiResponse({ status: 404, description: 'Não encontrou tarefas' }),
  );
}
