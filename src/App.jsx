import Guitar from "./components/Guitar";
import Header from "./components/Header";
import { useCart } from "./hooks/useCart";

function App() {
  
  const { data, addToCar, car, removerFromCart, increaseQuantity, decreaseQuantity, clearCart } = useCart();

  return (
    <>
      <Header
        car = {car}
        removerFromCart = {removerFromCart}
        increaseQuantity = {increaseQuantity}
        decreaseQuantity = {decreaseQuantity}
        clearCart = {clearCart}
      />
      <main className="container-xl mt-5">
          <h2 className="text-center">Nuestra Colección</h2>
            
          <div className="row mt-5">
            {data.map((guitar) => (
              <Guitar
                key={ guitar.id }
                guitar = { guitar }
                addToCar={ addToCar }
                // car = { car }
                // setCar = { setCar }
              />
            )
            )}
          </div>
      </main>


      <footer className="bg-dark mt-5 py-5">
          <div className="container-xl">
              <p className="text-white text-center fs-4 mt-4 m-md-0">GuitarLA - Todos los derechos Reservados</p>
          </div>
      </footer>
    </>
  )
}

export default App
