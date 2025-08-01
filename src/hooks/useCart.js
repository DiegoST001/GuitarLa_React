import { useState, useEffect } from 'react';
import {db} from "../db/db.js"


const useCart = () =>{
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

    return{
        data,
        car,
        addToCar,
        removerFromCart,
        increaseQuantity,
        decreaseQuantity,
        clearCart
    }
}

export{
    useCart
}