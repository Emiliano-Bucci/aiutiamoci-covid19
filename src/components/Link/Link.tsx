/** @jsx jsx */
import { jsx, css } from '@emotion/core'
import { LinkProps } from 'next/link'
import NextLink from 'next/link'
import { SerializedStyles } from '@emotion/css'
import {
  AnchorHTMLAttributes,
  useRef,
  useEffect,
  MutableRefObject,
} from 'react'

const basicLinkStyles = css`
  text-decoration: none;
  cursor: pointer;
`

type Props = {
  /** Any react children */
  children: React.ReactNode
  /** Prefetch a page on mouse over */
  prefetchOnMouseOver?: string
  /** Custom styles */
  customStyles?: SerializedStyles
  /** Check if the link should be disabled */
  isDisabled?: boolean
  extRef?: MutableRefObject<HTMLAnchorElement | null>
} & LinkProps &
  AnchorHTMLAttributes<HTMLAnchorElement>

export const Link: React.FC<Props> = ({
  href,
  as,
  children,
  customStyles,
  replace,
  scroll,
  shallow,
  passHref = true,
  prefetch,
  prefetchOnMouseOver,
  isDisabled = false,
  extRef,
  ...rest
}) => {
  const internalRef = useRef<HTMLAnchorElement | null>(null)
  const linkRef = extRef ? extRef : internalRef

  useEffect(() => {
    if (isDisabled && linkRef && linkRef.current) {
      linkRef.current.blur()
    }
  }, [isDisabled, linkRef])

  const linkStyles = css`
    ${basicLinkStyles};
    ${customStyles};
    ${isDisabled
      ? css`
          pointer-events: none !important;
          opacity: 0.5 !important;
        `
      : undefined}
  `

  return (
    <NextLink
      href={href}
      as={as}
      passHref={passHref}
      prefetch={prefetch}
      replace={replace}
      shallow={shallow}
    >
      <a
        {...rest}
        tabIndex={0}
        onClick={event => isDisabled && event.preventDefault()}
        css={linkStyles}
        ref={linkRef}
      >
        {children}
      </a>
    </NextLink>
  )
}
