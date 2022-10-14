import './App.css';
import {useState, useEffect} from "react";
import AttachMoney from '@material-ui/icons/AttachMoney';

function App() {

  const [amount1, setAmount1] = useState(1);
  const [amount2, setAmount2] = useState(1);
  const [currency1, setCurrency1] = useState('USD');
  const [currency2, setCurrency2] = useState('EUR');
  const [rate, setRates] = useState([]);

  useEffect(() => {
    fetch("http://localhost:2000/currency")
    .then(res=>res.json())
    .then(result=>{
      console.log(result);
      setRates(result);
    })
  }, []);

  function roundUp(number) {
    return number.toFixed(4);
  }

  function handleAmount1Change(event) {
    setAmount2(roundUp(Number(event.target.value) * Number(currency2) / Number(currency1)));
    setAmount1(event.target.value);
  }

  function handleCurrency1Change(event) {
    const findInfo = rate.find(r=>r.name === event.target.value);
    console.log(findInfo);
    setAmount2(roundUp(amount1 * Number(currency2) / Number(findInfo.value)));
    setCurrency1(findInfo.value);
 
  }

  function handleAmount2Change(event) {
    setAmount1(roundUp(Number(event.target.value) * Number(currency1) / Number(currency2)));
    setAmount2(event.target.value);
  }

  function handleCurrency2Change(event) {
    const findInfo = rate.find(r=>r.name === event.target.value);
    console.log(findInfo);
    setAmount2(roundUp(Number(amount2) * Number(findInfo?.value) / Number(currency1)));
    setCurrency2(findInfo?.value);
  }


  return (
    <section className="input-container">
    <div className="input-div">
      <main className="currency-converter-main">
      <AttachMoney />
      <AttachMoney />
      <AttachMoney />
      </main>
      <h1 className="currency-converter">Currency Converter</h1>
         <div className="currency-input">
            <input type="text" value={amount1} onChange={(event)=>handleAmount1Change(event)}/>
            <select onChange={(event)=>handleCurrency1Change(event)}>
                {rate?.map((currency => (
                    <option value={currency.name}>{currency.name}</option>
                )))}
                </select>   
        </div>
         <div className="currency-input">
            <input type="text" value={amount2} onChange={(event)=>{handleAmount2Change(event)}} />
            <select onChange={(event)=>handleCurrency2Change(event)}>
                {rate?.map((currency => (
                    <option value={currency.name}>{currency.name}</option>
                )))}
                </select>
        </div>
              

    </div>
    </section>
  );
}

export default App;
