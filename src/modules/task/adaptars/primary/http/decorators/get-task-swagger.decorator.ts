import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';

export function GetTaskSwagger() {
  return applyDecorators(
    ApiOperation({
      summary: 'Listar apenas uma tarefa pelo id',
    }),
    ApiResponse({
      status: 200,
      description: 'Aqui está sua tarera encontrada pelo ID',
    }),
    ApiParam({
      name: 'id',
      required: true,
      description: 'Encontrar tarefa pelo ID',
      example: '72cfef2f-03ba-402e-93f7-71a74bf1fa08',
    }),
    ApiResponse({ status: 404, description: 'Não encontrou a tarefa pelo ID' }),
  );
}
