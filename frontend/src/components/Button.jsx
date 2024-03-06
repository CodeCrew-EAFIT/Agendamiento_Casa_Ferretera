export default function Button({ text, onClick, className }) {
  return (
    <button className={className || "bg-primary"} onClick={onClick}>{text}</button>
  )
}