import Sidebar from "./components/Sidebar"

export default function App() {

  return (

    <div
      style={{
        display: "flex",
        fontFamily: "Inter, sans-serif"
      }}
    >

      <Sidebar />

      <main
        style={{
          flex: 1,
          padding: 40
        }}
      >
        <h1>SUTI.world</h1>

        <p>Semantic Civilization Platform</p>

        <p>
          Documentation browser MVP
        </p>

      </main>

    </div>

  )

}
