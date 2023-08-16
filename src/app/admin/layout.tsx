import Aside from "../(components)/layout/Aside/admin/Aside"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <div className="col">
      <Aside />
      {children}
    </div>
}
