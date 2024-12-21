import { applyDecorators } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';

export function Title(required: boolean) {
  const decoratorRequired = required
    ? IsNotEmpty({
        message: 'O titulo é um campo obrigatório',
        context: 'title',
      })
    : IsOptional();

  return applyDecorators(
    ApiProperty({
      description: 'O titulo de uma tarefa que será exibido para todos',
      example: 'Estudar Backend',
      minLength: 3,
      required,
    }),
    decoratorRequired,
    IsString({ message: 'O titulo tem que ser uma string válida' }),
    MinLength(3, { message: 'O titulo está muito curto' }),
  );
}
