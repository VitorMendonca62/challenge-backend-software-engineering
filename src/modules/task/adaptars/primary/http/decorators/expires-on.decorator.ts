import { applyDecorators } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsDateString, IsOptional } from 'class-validator';

export function ExpiresOn() {
  return applyDecorators(
    ApiProperty({
      description:
        'Data de vencimento de uma tarefa que será exibido para todos, caso presente deve estar em formato ISO',
      example: '2027-12-21T15:30:00+03:00',
      required: false,
    }),
    Transform(({ value }) => {
      const date = new Date(value);
      return isNaN(date.getTime()) ? undefined : value;
    }),
    IsDateString({}, { message: 'A data de vencimento está inválida' }),
    IsOptional(),
  );
}
