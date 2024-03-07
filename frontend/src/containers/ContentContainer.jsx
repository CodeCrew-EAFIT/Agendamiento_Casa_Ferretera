export default function ContentContainer ({ children, className, ...rest }) {
    return (
      <div className={`px-[13px] ${className}`} {...rest}>
        {children}
      </div>
    )
}