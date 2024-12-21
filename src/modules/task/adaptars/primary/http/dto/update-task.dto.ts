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

export class UpdateTaskDTO {
  @IsString({ message: 'O titulo tem que ser uma string válida' })
  @MinLength(3, { message: 'O titulo está muito curto' })
  @IsOptional()
  title?: string;

  @IsString({ message: 'A descrição tem que ser uma string válida' })
  @MinLength(5, { message: 'A descrição está muito curto' })
  @IsOptional()
  description?: string;

  @IsDateString({}, { message: 'A data de vencimento está inválida' })
  @IsOptional()
  expiresOn?: Date;

  @IsEnum(EnumTaskStatus, {
    message: 'O status está inválido, escolha outro válido',
  })
  @IsOptional()
  status: TaskStatus;
}
