import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import { CreateTaskDTO } from '../dto/create-task.dto';

@Injectable()
export class ValidationExpiresOnPipe implements PipeTransform {
  transform(value: CreateTaskDTO) {
    if (value.expiresOn) {
      if (new Date().getTime() >= new Date(value.expiresOn).getTime()) {
        throw new BadRequestException(
          'A data de vencimento deve ser maior que a data atual',
        );
      }
    }

    return value;
  }
}
