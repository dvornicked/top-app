import styles from './Rating.module.css'
import { RatingProps } from './Rating.props'
import cn from 'classnames'
import StarIcon from './star.svg'
import {
  useEffect,
  useState,
  KeyboardEvent,
  forwardRef,
  ForwardedRef
} from 'react'

export const Rating = forwardRef(function Rating(
  {
    isEditable = false,
    rating,
    setRating,
    className,
    error,
    ...props
  }: RatingProps,
  ref: ForwardedRef<HTMLDivElement>
): JSX.Element {
  const [ratingArray, setRatingArray] = useState<JSX.Element[]>(
    new Array(5).fill(undefined)
  )

  useEffect(() => {
    constructRating(rating)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rating])

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
        >
          <StarIcon
            tabIndex={isEditable ? 0 : -1}
            onKeyDown={(e: KeyboardEvent<SVGElement>) =>
              isEditable && handleSpace(i + 1, e)
            }
          />
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

  const handleSpace = (i: number, e: KeyboardEvent<SVGElement>) => {
    if (e.code !== 'Space' || !setRating) {
      return
    }
    setRating(i)
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
      {error && <span className={styles.errorMessage}>{error.message}</span>}
    </div>
  )
})
