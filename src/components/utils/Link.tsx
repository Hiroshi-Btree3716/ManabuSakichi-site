import * as React from "react"
import clsx from "clsx"
import { useRouter } from "next/router"
import NextLink, { LinkProps as NextLinkProps } from "next/link"
import MuiLink, { LinkProps as MuiLinkProps } from "@mui/material/Link"

// 💡 1. 型定義（Props）からNext.js側と衝突する原因になるプロパティを徹底的に除外する
interface NextLinkComposedProps
  extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href' | 'onClick' | 'onMouseEnter'>,
    Omit<NextLinkProps, 'href' | 'as' | 'passHref' | 'prefetch'> {
  to: NextLinkProps['href'];
  linkAs?: NextLinkProps['as'];
  prefetch?: NextLinkProps['prefetch'];
}
/*
// 💡 NextLinkPropsから、衝突しやすいプロパティを安全に除外する
interface NextLinkComposedProps
  extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href' | 'onClick' | 'onMouseEnter'>,
    Omit<NextLinkProps, 'href' | 'as' | 'passHref'> {
  to: NextLinkProps['href'];
  linkAs?: NextLinkProps['as'];
}

interface NextLinkComposedProps
  extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href'>,
    Omit<NextLinkProps, 'href' | 'as' | 'passHref' | 'onMouseEnter' | 'onClick'> {
  to: NextLinkProps['href'];
  linkAs?: NextLinkProps['as'];
}
export const NextLinkComposed = React.forwardRef<HTMLAnchorElement, NextLinkComposedProps>(
  function NextLinkComposed(props, ref) {
    const {
      to,
      linkAs,
      replace,
      scroll,
      shallow,
      prefetch,
      ...other
    } = props;

    return (
      <NextLink
        href={to}
        prefetch={prefetch}
        as={linkAs}
        replace={replace}
        scroll={scroll}
        shallow={shallow}

        ref={ref}        // 💡 refとotherを直接NextLinkに渡す
        {...other}
      />
    )
  },
)
export const NextLinkComposed = React.forwardRef<HTMLAnchorElement, NextLinkComposedProps>(
  function NextLinkComposed(props, ref) {
    const {
      to,
      linkAs,
      replace,
      scroll,
      shallow,
      prefetch,
      ...other
    } = props;

    return (
      <NextLink
        href={to}
        prefetch={prefetch}
        as={linkAs}
        replace={replace}
        scroll={scroll}
        shallow={shallow}
        // 💡 ref={ref} の代わりに、型を安全に適合させるコールバック形式にする
        ref={(node) => {
          if (typeof ref === 'function') {
            ref(node);
          } else if (ref) {
            ref.current = node;
          }
        }}
        {...other}
      />
    );
  },
);*/
export const NextLinkComposed = React.forwardRef<HTMLAnchorElement, NextLinkComposedProps>(
  function NextLinkComposed(props, ref) {
    const {
      to,
      linkAs,
      replace,
      scroll,
      shallow,
      prefetch,
      ...other
    } = props;

    return (
      <NextLink
        href={to}
        prefetch={prefetch}
        as={linkAs}
        replace={replace}
        scroll={scroll}
        shallow={shallow}

        // 💡 ref を any 型としてキャストして渡すことで、Next.jsとMUIの型の不一致によるエラーを強制突破します
        ref={ref as any}
        {...other}
      />
    );
  },
);
export type LinkProps = {
  activeClassName?: string
  as?: NextLinkProps["as"]
  href: NextLinkProps["href"]
  noLinkStyle?: boolean
} & Omit<NextLinkComposedProps, "to" | "linkAs" | "href"> &
  Omit<MuiLinkProps, "href">

const Link = React.forwardRef<HTMLAnchorElement, LinkProps>(function Link(props, ref) {
  const {
    activeClassName = "active",
    as: linkAs,
    className: classNameProps,
    href,
    noLinkStyle,
    role, // Link don"t have roles.
    ...other
  } = props

  const router = useRouter()
  const pathname = typeof href === "string" ? href : href.pathname
  const className = clsx(classNameProps, {
    [activeClassName]: router.pathname === pathname && activeClassName,
  })

  const isExternal =
    typeof href === "string" && (href.indexOf("http") === 0 || href.indexOf("mailto:") === 0)

  if (isExternal) {
    if (noLinkStyle) {
      return <a className={className} href={href as string} ref={ref as any} {...other} />
    }

    return <MuiLink className={className} href={href as string} ref={ref} {...other} />
  }

  if (noLinkStyle) {
    return <NextLinkComposed className={className} ref={ref as any} to={href} {...other} />
  }

  return (
    <MuiLink
      component={NextLinkComposed}
      linkAs={linkAs}
      className={className}
      ref={ref}
      to={href}
      {...other}
      style={{ textDecoration: "none" }}
    />
  )
})

export default Link
