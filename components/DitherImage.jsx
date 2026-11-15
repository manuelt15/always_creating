export default function DitherImage({
  large,
  small,
  alt,
  sizes = '100vw',
  priority = false,
  className = '',
}) {
  if (!large) return null

  return (
    <picture className="block h-full w-full">
      <source media="(max-width: 640px)" srcSet={small || large} />
      <img
        src={large}
        srcSet={small ? `${small} 480w, ${large} 900w` : undefined}
        sizes={sizes}
        width={900}
        height={1125}
        alt={alt}
        loading={priority ? 'eager' : 'lazy'}
        fetchPriority={priority ? 'high' : 'auto'}
        decoding={priority ? 'sync' : 'async'}
        className={className}
      />
    </picture>
  )
}
