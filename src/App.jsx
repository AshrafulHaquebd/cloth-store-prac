import "./App.css"

function App() {
  const categories = [
    {
      id: 1,
      title: "Hats",
    },
    {
      id: 2,
      title: "Jackets",
    },
    {
      id: 3,
      title: "Sneackers",
    },
    {
      id: 4,
      title: "Mens",
    },
    {
      id: 5,
      title: "Womens",
    },
  ]

  return (
    <div className="categories-container">
      {categories.map(({ id, title }) => (
        <div key={id} className="category-container">
          <div className="background-image">
            <div className="category-body-container">
              <h3>{title}</h3>
              <p>Shop Now</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default App
