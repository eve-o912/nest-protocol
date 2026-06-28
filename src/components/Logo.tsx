import { Link } from '@tanstack/react-router'

export function Logo({ className }: { className?: string }) {
  return (
    <Link to="/" className={`font-sora font-bold text-2xl ${className}`}>
      nest<span className="text-primary">.</span>
    </Link>
  )
}
