import Aside from "../(components)/layout/Aside/profile/Aside"

export default function AccountLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <div className="col">
      <Aside />
      {children}
    </div>
}
