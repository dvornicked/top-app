import styles from './Product.module.css'
import { ProductProps } from './Product.props'
import cn from 'classnames'
import { Card } from '../Card/Card'
import { Rating } from '../Rating/Rating'
import { Tag } from '../Tag/Tag'
import { Button } from '../Button/Button'
import { declOfNum, priceRu } from '../../helpers/helpers'
import { Divider } from '../Divider/Divider'
import Image from 'next/image'
import { ForwardedRef, forwardRef, useRef, useState } from 'react'
import { Review } from '../Review/Review'
import { ReviewForm } from '../ReviewForm/ReviewForm'
import { motion } from 'framer-motion'

export const Product = motion(
  forwardRef(function Product(
    { product, className, ...props }: ProductProps,
    ref: ForwardedRef<HTMLDivElement>
  ): JSX.Element {
    const [isReviewOpened, setIsReviewOpened] = useState<boolean>(false)
    const reviewRef = useRef<HTMLDivElement>(null)

    const scrollToReview = () => {
      setIsReviewOpened(true)
      reviewRef.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      })
      reviewRef.current?.focus()
    }

    const variants = {
      visible: {
        opacity: 1,
        height: 'auto'
      },
      hidden: {
        opacity: 0,
        height: 0
      }
    }

    return (
      <div className={className} {...props} ref={ref}>
        <Card className={styles.product}>
          <div className={styles.logo}>
            <Image
              src={process.env.NEXT_PUBLIC_DOMAIN + product.image}
              alt={product.title}
              width={70}
              height={70}
            />
          </div>
          <div className={styles.title}>{product.title}</div>
          <div className={styles.price}>
            <span className="visualyHidden">цена</span>
            {priceRu(product.price)}
            {product.oldPrice && (
              <Tag className={styles.oldPrice} color="green">
                <span className="visualyHidden">скидка</span>
                {priceRu(product.price - product.oldPrice)}
              </Tag>
            )}
          </div>
          <div className={styles.credit}>
            <span className="visualyHidden">кредит</span>
            {priceRu(product.credit)}/<span className={styles.month}>мес</span>
          </div>
          <div className={styles.rating}>
            <span className="visualyHidden">
              {'рейтинг ' + (product.reviewAvg ?? product.initialRating)}
            </span>
            <Rating rating={product.reviewAvg ?? product.initialRating} />
          </div>
          <div className={styles.tags}>
            {product.categories.map(c => (
              <Tag className={styles.category} key={c} color="ghost">
                {c}
              </Tag>
            ))}
          </div>
          <div aria-hidden={true} className={styles.priceTitle}>
            цена
          </div>
          <div aria-hidden={true} className={styles.creditTitle}>
            кредит
          </div>
          <div className={styles.rateTitle}>
            <a href="#ref" onClick={scrollToReview}>
              {product.reviewCount}{' '}
              {declOfNum(product.reviewCount, ['отзыв', 'отзыва', 'отзывов'])}
            </a>
          </div>
          <Divider className={styles.hr} />
          <div className={styles.description}>{product.description}</div>
          <div className={styles.feature}>
            {product.characteristics.map(c => (
              <div className={styles.characteristics} key={c.name}>
                <span className={styles.characteristicsName}>{c.name}</span>
                <span className={styles.characteristicsDots}></span>
                <span className={styles.characteristicsValue}>{c.value}</span>
              </div>
            ))}
          </div>
          <div className={styles.advBlock}>
            {product.advantages && (
              <div className={styles.advantages}>
                <div className={styles.advTitle}>Преимущества</div>
                <div>{product.advantages}</div>
              </div>
            )}
            {product.disadvantages && (
              <div className={styles.disadvantages}>
                <div className={styles.advTitle}>Недостатки</div>
                <div>{product.disadvantages}</div>
              </div>
            )}
          </div>
          <Divider className={cn(styles.hr, styles.hr2)} />
          <div className={styles.actions}>
            <Button appearance="primary">Узнать подробнее</Button>
            <Button
              className={styles.reviewButton}
              appearance="ghost"
              arrow="right"
              onClick={() => setIsReviewOpened(!isReviewOpened)}
              aria-expanded={isReviewOpened}
            >
              Читать отзывы
            </Button>
          </div>
        </Card>
        <motion.div
          animate={isReviewOpened ? 'visible' : 'hidden'}
          variants={variants}
          initial="hidden"
        >
          <Card
            color="blue"
            className={cn(styles.review)}
            ref={reviewRef}
            tabIndex={isReviewOpened ? 0 : -1}
          >
            {product.reviews.length ? (
              product.reviews.map(r => (
                <div key={r._id}>
                  <Review review={r} />
                  <Divider />
                </div>
              ))
            ) : (
              <>
                <span>Нет отзывов</span>
                <Divider />
              </>
            )}
            <ReviewForm productId={product._id} isOpened={isReviewOpened} />
          </Card>
        </motion.div>
      </div>
    )
  })
)
