import {
  EnumTaskStatus,
  TaskStatus,
} from '@modules/task/core/domain/task.entity';
import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import { isEnum } from 'class-validator';

@Injectable()
export class ValidationStatusPipe implements PipeTransform {
  transform(value: TaskStatus | null) {
    if (value && !isEnum(value, EnumTaskStatus)) {
      throw new BadRequestException(
        'O status está inválido, escolha outro válido',
      );
    }

    return value;
  }
}
