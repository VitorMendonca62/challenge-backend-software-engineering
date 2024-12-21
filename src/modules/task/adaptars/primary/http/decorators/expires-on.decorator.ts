import { applyDecorators } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsOptional } from 'class-validator';

export function ExpiresOn() {
  return applyDecorators(
    ApiProperty({
      description:
        'Data de vencimento de uma tarefa que será exibido para todos, caso presente',
      example: '2024-12-21T15:30:00+03:00',
      required: false,
    }),
    IsDateString({}, { message: 'A data de vencimento está inválida' }),
    IsOptional(),
  );
}
