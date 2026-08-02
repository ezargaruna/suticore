const docs = [
  "README.md",
  "SYSTEM_MAP.md",
  "specificationes",
  "normae",
  "protocolla"
]

export default function Sidebar() {
  return (
    <aside
      style={{
        width: 260,
        padding: 24,
        borderRight: "1px solid #ddd",
        minHeight: "100vh"
      }}
    >
      <h3>SUTI.world</h3>

      {docs.map(item => (
        <div
          key={item}
          style={{
            margin: "12px 0",
            cursor: "pointer"
          }}
        >
          {item}
        </div>
      ))}
    </aside>
  )
}
