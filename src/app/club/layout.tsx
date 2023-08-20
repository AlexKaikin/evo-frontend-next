import Aside from "../(components)/layout/Aside/club/Aside"

export default function ClubLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <div className="col">
      <Aside />
      {children}
    </div>
}
