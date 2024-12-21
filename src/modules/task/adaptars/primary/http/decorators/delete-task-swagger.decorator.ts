import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';

export function DeleteTaskSwagger() {
  return applyDecorators(
    ApiOperation({
      summary: 'Delete uma tarefa pelo ID',
    }),
    ApiParam({
      name: 'id',
      required: true,
      description: 'A tarefa é encontrada pelo ID',
      example: '72cfef2f-03ba-402e-93f7-71a74bf1fa08',
    }),
    ApiResponse({ status: 200, description: 'Tarefa deletada com sucesso' }),
    ApiResponse({ status: 404, description: 'Não encontrou a tarefa pelo ID' }),
  );
}
