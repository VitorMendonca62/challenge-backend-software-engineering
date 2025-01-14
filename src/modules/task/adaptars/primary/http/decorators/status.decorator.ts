import { EnumTaskStatus } from '@modules/task/core/domain/task.entity';
import { applyDecorators } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsOptional } from 'class-validator';

export function Status(required: boolean) {
  const decoratorRequired = required
    ? IsNotEmpty({ message: 'O status é um campo obrigatório' })
    : IsOptional();

  return applyDecorators(
    ApiProperty({
      description: 'O status de uma tarefa que será exibido para todos',
      example: EnumTaskStatus,
      required: required,
    }),
    decoratorRequired,
    IsEnum(EnumTaskStatus, {
      message: 'O status está inválido, escolha outro válido',
    }),
  );
}
