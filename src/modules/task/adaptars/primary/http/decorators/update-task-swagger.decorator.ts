import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';

export function UpdateTaskSwagger() {
  return applyDecorators(
    ApiOperation({
      summary: 'Atualizar alguns campos de uma tarefa pelo ID',
    }),
    ApiParam({
      name: 'id',
      required: true,
      description: 'A tarefa é encontrada pelo ID',
      example: '72cfef2f-03ba-402e-93f7-71a74bf1fa08',
    }),
    ApiResponse({ status: 200, description: 'Tarefa atualizada com sucesso' }),
    ApiResponse({ status: 400, description: 'Dados inválidos' }),
    ApiResponse({ status: 404, description: 'Não encontrou a tarefa pelo ID' }),
  );
}
