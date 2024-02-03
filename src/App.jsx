import { useCallback, useEffect, useState, useRef } from "react";
import "./App.css";
import click from "./click.mp3"

function App() {
  const [length, setLength] = useState(8);
  const [number, setNumber] = useState(0);
  const [char, setChar] = useState(0);
  const [password, setPassword] = useState("");

  //useRef HOOK

  const passRef=useRef(null)

  const copyPasswordToClipboard=useCallback(()=>{ 
    
    passRef.current?.select();
    window.navigator.clipboard.writeText(password);
    playClickSound();

  },[password])

  const passwordGenerator = useCallback(()=>{
    let pass="";
    let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if(number) str+="0123456789";
    if(char) str+="!@#$%^&*()~`"
  
    for(let i=1;i<=length;i++)
    {
      let char=Math.floor(Math.random()*str.length+1);
      pass+=str.charAt(char)
     
    }
    setPassword(pass);
  },[length,number,char])


  useEffect(()=>{
    passwordGenerator()
  },[length,number,char])


  //for clcik sound
  useEffect(() => {
    const clickSound = new Audio(click);
    // Preload the sound file
    clickSound.load();
  }, []);

  // Function to play the sound
  const playClickSound = () => {
    const clickSound = new Audio(click);
    clickSound.play();
  };


  return (
    <>
      <div className="w-full max-w-md mx-auto shadow-md px-4 my-8 rounded-lg text-green-500 bg-gray-600">
        <h1 className="text-4xl font-semibold text-white mb-4">
          Password Generator
        </h1>
        <div className="flex shadow  rounded-lg overflow-hidden  mb-4">
          <input
            type="text"
            className="outline-none w-full py-1  px-3  "
            value={password}
            ref={passRef}
          />
          <button className="outline-none px-3 py-0.5 bg-blue-600 text-white shrink-0 hover:bg-blue-500" 
            onClick={copyPasswordToClipboard}>
            Copy
          </button>
        </div>

        <div className="flex flex-wrap text-sm gap-x-4 py-2 ">
          <div className="flex  mb-3 sm:mb-0 items-center gap-x-1">
            <input
              type="range"
              className="cursor-pointer "
              min={6}
              max={100}
              value={length}
              onChange={(e) => {
                setLength(e.target.value);
              }}
            />
            <span className="font-bold">Length: {length}</span>
          </div>

          <div className="flex items-center mb-3 sm:mb-0 gap-x-1 ">
            <input
              type="checkbox"
              id="checkNumber"
              defaultChecked={number}
              onChange={() => {
                setNumber((prev) => !prev);
              }}
            />
            <label htmlFor="checkNumber">Numbers</label>
          </div>

          <div className="flex items-center gap-x-1 mb-3 sm:mb-0">
            <input
              type="checkbox"
              id="checkChar"
              defaultChecked={char}
              onChange={() => {
                setChar((prev) => !prev);
              }}
            />
            <label htmlFor="checkChar">Symbol</label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
