import React, { useEffect, useState } from "react";
import preactLogo from './assets/preact.svg'
import viteLogo from '/vite.svg'
import './app.css'
import { Header } from './Components/Header'

export function App() {
const [cars, setCars] = useState<Car[]>([]);
const [loading, setLoading] = useState<boolean>(true);
const [error, setError] = useState<string | null>(null);
useEffect(() => {
   const fetchCars = async () => {
     try {
       const response = await fetch("http://localhost:8000/api/cars/", {
         method: "GET",
         headers: {
           "Content-Type": "application/json",
         },
         credentials: "include", // include cookies if using Django session auth
       });

       if (!response.ok) {
         throw new Error(`HTTP error! Status: ${response.status}`);
       }

       const data:Car[] = await response.json();
       setCars(data);
     } catch (err: any) {
       console.error("Error fetching cars:", err);
       setError(err.message || "Something went wrong");
     } finally {
       setLoading(false);
     }
   };

   fetchCars();
 }, []);



  return (
    <>
      <Header title="Wheel-Deal" subtitle='Buy and Sell Cars Online'/>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} class="logo" alt="Vite logo" />
        </a>
        <a href="https://preactjs.com" target="_blank">
          <img src={preactLogo} class="logo preact" alt="Preact logo" />
        </a>
      </div>
      <button onClick={()=> {
         console.log(cars);
      }}>Fetch Data</button>
      <div class="grid" style={{display:'flex',}} >
      {cars.map((car) => (
         <div key={car.id} class="card">
             <h2>{car.model} ({car.year})</h2>
             <p>Price: {car.price} Rs</p>
             <p>Mileage: {car.mileage} miles</p>
             <p>Vehicle Number: {car.vin}</p>
         </div>
      ))}
      </div>   
    </>
  )
}
