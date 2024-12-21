import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

export function PostTaskSwagger() {
  return applyDecorators(
    ApiOperation({
      summary: 'Criar uma tarefa no banco de dados',
      parameters: null,
    }),
    ApiResponse({ status: 201, description: 'Tarefa criada com sucesso' }),
    ApiResponse({ status: 400, description: 'Dados inválidos' }),
  );
}
