import styles from './Sort.module.css'
import { SortEnum, SortProps } from './Sort.props'
import cn from 'classnames'
import SortIcon from './sort.svg'

export const Sort = ({
  sort,
  setSort,
  className,
  ...props
}: SortProps): JSX.Element => {
  return (
    <div className={cn(styles.sort, className)} {...props}>
      <span
        onClick={() => setSort(SortEnum.Rating)}
        className={cn({
          [styles.active]: sort == SortEnum.Rating
        })}
      >
        <SortIcon className={styles.sortIcon} />
        По рейтингу
      </span>
      <div className={cn(styles.sort, className)} {...props}>
        <span
          onClick={() => setSort(SortEnum.Price)}
          className={cn({
            [styles.active]: sort == SortEnum.Price
          })}
        >
          <SortIcon className={styles.sortIcon} />
          По цене
        </span>
      </div>
    </div>
  )
}
