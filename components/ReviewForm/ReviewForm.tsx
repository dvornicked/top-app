import styles from './ReviewForm.module.css'
import { ReviewFormProps } from './ReviewForm.props'
import cn from 'classnames'
import { Rating } from '../Rating/Rating'
import { Textarea } from '../Textarea/Textarea'
import { Button } from '../Button/Button'
import { Input } from '../Input/Input'
import CloseIcon from './close.svg'
import { useForm, Controller } from 'react-hook-form'
import { IReviewForm, IReviewSentResponse } from './ReviewForm.interface'
import axios from 'axios'
import { API } from '../../helpers/api'
import { useState } from 'react'

export const ReviewForm = ({
  productId,
  className,
  isOpened,
  ...props
}: ReviewFormProps): JSX.Element => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    reset,
    clearErrors
  } = useForm<IReviewForm>()
  const [isSuccess, setIsSuccess] = useState<boolean>(false)
  const [isError, setIsError] = useState<string>()

  const onSubmit = async (formData: IReviewForm) => {
    try {
      const { data } = await axios.post<IReviewSentResponse>(
        API.review.createDemo,
        { ...formData, productId }
      )
      if (data.message) {
        setIsSuccess(true)
        reset()
      } else {
        setIsError('Something went wrong')
      }
    } catch (e: any) {
      setIsError(e.message)
    }
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={cn(styles.reviewForm, className)} {...props}>
        <Input
          {...register('name', {
            required: { value: true, message: 'Заполните имя' }
          })}
          placeholder="Имя"
          error={errors.name}
          tabIndex={isOpened ? 0 : -1}
          aria-invalid={errors.name ? true : false}
        />
        <Input
          {...register('title', {
            required: { value: true, message: 'Заполните заголовок' }
          })}
          placeholder="Заголовок отзыва"
          className={styles.title}
          error={errors.title}
          tabIndex={isOpened ? 0 : -1}
          aria-invalid={errors.title ? true : false}
        />
        <div>
          <span>Оценка: </span>
          <Controller
            control={control}
            name="rating"
            rules={{ required: { value: true, message: 'Укажите рейтинг' } }}
            render={({ field }) => (
              <Rating
                isEditable
                rating={field.value}
                setRating={field.onChange}
                ref={field.ref}
                error={errors.rating}
                tabIndex={isOpened ? 0 : -1}
                aria-invalid={errors.description ? true : false}
              />
            )}
          />
        </div>
        <Textarea
          {...register('description', {
            required: { value: true, message: 'Заполните описание' }
          })}
          placeholder="Текст отзыва"
          className={styles.description}
          error={errors.description}
          tabIndex={isOpened ? 0 : -1}
          aria-label="Текст отзыва"
        />
        <div className={styles.submit}>
          <Button
            onClick={() => clearErrors()}
            appearance="primary"
            tabIndex={isOpened ? 0 : -1}
          >
            Отправить
          </Button>
          <span className={styles.info}>
            * Перед публикацией отзыв пройдет предварительную модерацию и
            проверку
          </span>
        </div>
        {isSuccess && (
          <div className={styles.success} role="alert">
            <div className={styles.successTitle}>Ваш отзыв отправлен</div>
            <div>Спасибо, ваш отзыв будет опубликован после проверки</div>
            <button onClick={() => setIsSuccess(false)} aria-label='Закрыть оповещение'>
              <CloseIcon />
            </button>
          </div>
        )}
        {isError && (
          <div className={styles.error} role="alert">
            Что-то пошло не так, попробуйте обновить страницу
            <button onClick={() => setIsError(undefined)} aria-label='Закрыть оповещение'>
              <CloseIcon />
            </button>
          </div>
        )}
      </div>
    </form>
  )
}
