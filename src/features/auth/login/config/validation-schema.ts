import * as v from 'valibot';

export const ValidationSchema = v.object({
    loId: v.pipe(
        v.string(),
        v.nonEmpty('Введите Lo ID'),
    ),
    password: v.pipe(
        v.string(),
        v.nonEmpty('Введите Пароль'),
    ),
});
