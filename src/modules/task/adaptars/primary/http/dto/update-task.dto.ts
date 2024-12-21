import {
  IsString,
  MinLength,
  IsOptional,
  IsEnum,
  IsDateString,
} from 'class-validator';
import {
  EnumTaskStatus,
  TaskStatus,
} from '../../../../core/domain/task.entity';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateTaskDTO {
  @ApiProperty({
    description:
      'O titulo atualizado de uma tarefa que será exibido para todos',
    example: 'Estudar Backend Modularizado',
    minLength: 3,
    required: false,
  })
  @IsString({ message: 'O titulo tem que ser uma string válida' })
  @MinLength(3, { message: 'O titulo está muito curto' })
  @IsOptional()
  title?: string;

  @ApiProperty({
    description:
      'A descrição atualizada de uma tarefa que será exibido para todos, caso presente',
    example:
      'Estudar NestJS com arquitetura hexagonal, documentação com swagger e testes automatizados',
    minLength: 5,
    required: false,
  })
  @IsString({ message: 'A descrição tem que ser uma string válida' })
  @MinLength(5, { message: 'A descrição está muito curto' })
  @IsOptional()
  description?: string;

  @ApiProperty({
    description:
      'Data de vencimento de uma tarefa que será exibido para todos, caso presente',
    example: '2024-12-21T15:30:00+03:00',
    required: false,
  })
  @IsDateString({}, { message: 'A data de vencimento está inválida' })
  @IsOptional()
  expiresOn?: Date;

  @ApiProperty({
    description:
      'O status atualizada de uma tarefa que será exibido para todos',
    example: EnumTaskStatus.Doing,
    required: false,
  })
  @IsEnum(EnumTaskStatus, {
    message: 'O status está inválido, escolha outro válido',
  })
  @IsOptional()
  status: TaskStatus;
}
