export const useRouter = () => ({
  push: (href: string) => { window.location.href = href; },
  back: () => history.back(),
  forward: () => history.forward(),
  replace: (href: string) => { window.location.replace(href); },
  refresh: () => window.location.reload(),
  prefetch: () => Promise.resolve(),
});
export const usePathname = () => window.location.pathname;
export const useSearchParams = () => new URLSearchParams(window.location.search);
export const useParams = () => ({});
export const redirect = (href: string) => { window.location.href = href; };
export const notFound = () => {};
