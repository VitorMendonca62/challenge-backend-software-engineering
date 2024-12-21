import { applyDecorators } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, MinLength } from 'class-validator';

export function Description() {
  return applyDecorators(
    ApiProperty({
      description:
        'A descrição atualizada de uma tarefa que será exibido para todos, caso presente',
      example:
        'Estudar NestJS com arquitetura hexagonal e documentação com swagger',
      minLength: 5,
      required: false,
    }),
    IsString({ message: 'A descrição tem que ser uma string válida' }),
    MinLength(5, { message: 'A descrição está muito curto' }),
    IsOptional(),
  );
}
