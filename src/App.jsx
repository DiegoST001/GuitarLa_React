import { useState, useEffect } from 'react'
import Guitar from './components/Guitar'
import Header from './components/Header'
import { db } from './db/db.js'
function App() {

  const initialCar = () =>{
    const localStorageCart = localStorage.getItem('car');
    return localStorageCart ? JSON.parse(localStorageCart) : [];
  }

  // state
  // const [auth, setAuth] = useState(false);
  const [data] = useState(db);
  const [car, setCar] = useState(initialCar);

  const MAX_ITEM = 5;
  const MIN_ITEM = 1
/* para consultas ah api
  useEffect(() => {
    setData(db);
  }, [])
*/

  useEffect(() =>{
    localStorage.setItem('car', JSON.stringify(car));
  }, [car])

  // console.log(db);
  function addToCar(items){
    const itemExist = car.findIndex(guitar => guitar.id === items.id);

    
      if(itemExist >= 0){
        // console.log(itemExist);
        const newCar = [...car];
        newCar[itemExist].quantity ++;
        setCar(newCar);
      }else{
        // console.log(itemExist);
        items.quantity = 1;
        setCar([...car, items])
      }

    
  }

  function removerFromCart(id){
    setCar(car.filter(prevCar => prevCar.id !== id));
  }

  function increaseQuantity(id) {
    const updateCar = car.map(item => {
      if (item.id === id && item.quantity < MAX_ITEM) {
        return {
          ...item,
          quantity: item.quantity + 1,
        };
      }
      return item;
    });
    setCar(updateCar);
  }

  function decreaseQuantity(id) {
    const updateCar = car.map(item => {
      if(item.id === id & item.quantity > MIN_ITEM){
        return{
          ...item,
          quantity: item.quantity - 1,
        }
      }
      return item;
    })
    setCar(updateCar);
  }
  function clearCart(){
    setCar([]);
  }


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
