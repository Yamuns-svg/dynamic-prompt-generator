export function Card({ children }: { children: React.ReactNode }) {
  return <div className="bg-white shadow rounded">{children}</div>;
}
export function CardContent({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={className}>{children}</div>;
}