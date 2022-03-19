import styles from './Rating.module.css'
import { RatingProps } from './Rating.props'
import cn from 'classnames'
import StarIcon from './star.svg'
import {
  useEffect,
  useState,
  KeyboardEvent,
  forwardRef,
  ForwardedRef,
  useRef
} from 'react'

export const Rating = forwardRef(function Rating(
  {
    isEditable = false,
    rating,
    setRating,
    tabIndex,
    className,
    error,
    ...props
  }: RatingProps,
  ref: ForwardedRef<HTMLDivElement>
): JSX.Element {
  const [ratingArray, setRatingArray] = useState<JSX.Element[]>(
    new Array(5).fill(undefined)
  )
  const ratingArrayRef = useRef<(HTMLSpanElement | null)[]>([])

  useEffect(() => {
    constructRating(rating)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rating, tabIndex])

  const computeFocus = (r: number, i: number): number => {
    if (!isEditable) {
      return -1;
    }
    if (!rating && i == 0) {
      return tabIndex ?? 0;
    }
    if (r == i + 1) {
      return 0
    }
    return -1
  }

  const constructRating = (currentRating: number) => {
    const updatedArray = ratingArray.map((r: JSX.Element, i: number) => {
      return (
        <span
          key={i}
          className={cn(styles.star, className, {
            [styles.filled]: i < currentRating,
            [styles.editable]: isEditable
          })}
          onMouseEnter={() => changeDisplay(i + 1)}
          onMouseLeave={() => changeDisplay(rating)}
          onClick={() => onClick(i + 1)}
          tabIndex={computeFocus(rating, i)}
          onKeyDown={handleKey}
          ref={r => ratingArrayRef.current?.push(r)}
          role={isEditable ? 'slider' : ''}
          aria-valuenow={rating}
          aria-label={isEditable ? 'Укажите рейтинг': ('Рейтинг' + rating)}
          aria-invalid={error ? true : false}
          aria-valuemin={1}
          aria-valuemax={5}
        >
          <StarIcon />
        </span>
      )
    })
    setRatingArray(updatedArray)
  }

  const changeDisplay = (i: number) => {
    if (!isEditable) {
      return
    }
    constructRating(i)
  }

  const onClick = (i: number) => {
    if (!isEditable || !setRating) {
      return
    }
    setRating(i)
  }

  const handleKey = (e: KeyboardEvent) => {
    if (!isEditable || !setRating) {
      return
    }
    if (e.code == 'ArrowRight' || e.code == 'ArrowUp') {
      console.log(ratingArrayRef)
      if (!rating) {
        setRating(1)
      } else {
        e.preventDefault()
        setRating(rating < 5 ? rating + 1 : 5)
      }
        ratingArrayRef.current[rating]?.focus()
    }

    if (e.code == 'ArrowLeft' || e.code == 'ArrowDown') {
      e.preventDefault()
      setRating(rating > 1 ? rating - 1 : 1)
      ratingArrayRef.current[rating - 2]?.focus()
    }
  }

  return (
    <div
      className={cn(styles.ratingWrapper, {
        [styles.error]: error
      })}
      ref={ref}
      {...props}
    >
      {ratingArray}
      {error && <span role='alert' className={styles.errorMessage}>{error.message}</span>}
    </div>
  )
})
