import React, { useState, useEffect } from 'react';

function App() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [basket, setBasket] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3000/products');
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        setError(`Error fetching data: ${error.message}`);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  function handelAddBasket(item) {
    const existingItem = basket.find((x) => x.id === item.id);

    if (existingItem) {
      existingItem.count += 1;
      setBasket([...basket]);
    } else {
      setBasket([...basket, { ...item, count: 1 }]);
    }
  }

  function handleIncrement(id) {
    const uptadedBasket = basket.map((item)=>
    item.id === id ? {...item,count:item.count+1 } : item
    )
    setBasket(uptadedBasket)
  }
  function handleDecrement(id) {
    const uptadedBasket = basket.map((item)=>
    item.id === id && item.count>1 ? {...item,count:item.count-1 } : item
    )
    setBasket(uptadedBasket)
  }
  
  function handleRemove(id) {
    setBasket(basket.filter((item) => item.id !== id));
  }
  function handelRemoveBasket() {
    setBasket([])
  }

  return (
    <div>
      <h2>Umumi hisse</h2>
      <button  onClick={()=>handelRemoveBasket()}>ClearAll</button>
      <div style={{ border: "1px solid black" }}>
        <h3>basketim</h3>
        {basket && basket.map((item) => (
          <ul>
            <li>{item.id}</li>
            <li>{item.manufacturer}</li>
            <li>{item.model}</li>
            <li>{item.price}</li>
            <li>{item.count}</li>
            <button onClick={() => handleRemove(item.id)}>Remove from Basket</button>
            <button onClick={()=>handleIncrement(item.id)}>+</button>
            <button onClick={()=>handleDecrement(item.id)}>-</button>
          </ul>
        ))}
        
      </div>
      {isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <>
        
          {data &&
            data.map((item) => (
              <ul key={item.id}>
                <li>{item.id}</li>
                <li>{item.manufacturer}</li>
                <li>{item.model}</li>
                <li>{item.price}</li>
                <button onClick={()=>handelAddBasket(item)}>Add to Basket</button>
              </ul>
            ))}
        </>
      )}
    </div>
  );
}

export default App;
