import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';
import {
  EnumTaskStatus,
  Task,
  TaskStatus,
} from 'modules/task/core/domain/task.entity';

export class CreateTaskDTO {
  @ApiProperty({
    description: 'O titulo de uma tarefa que será exibido para todos',
    example: 'Estudar Backend',
    minLength: 3,
    required: true,
  })
  @IsNotEmpty({ message: 'O titulo é um campo obrigatório', context: 'title' })
  @IsString({ message: 'O titulo tem que ser uma string válida' })
  @MinLength(3, { message: 'O titulo está muito curto' })
  title: string;

  @ApiProperty({
    description:
      'A descrição atualizada de uma tarefa que será exibido para todos, caso presente',
    example:
      'Estudar NestJS com arquitetura hexagonal e documentação com swagger',
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
    description: 'O status de uma tarefa que será exibido para todos',
    example: EnumTaskStatus,
    required: true,
  })
  @IsEnum(EnumTaskStatus, {
    message: 'O status está inválido, escolha outro válido',
  })
  @IsNotEmpty({ message: 'O status é um campo obrigatório' })
  status: TaskStatus;
}

export class ResponseCreateTask {
  message: string;
  data: Task;
}
