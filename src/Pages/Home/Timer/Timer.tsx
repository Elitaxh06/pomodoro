import { useEffect, useState } from "react"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function Timer() {
    const [sessionType, setSessionType] = useState<"focus" | "shortBreak" | "longBreak">("focus")
    const [ time, setTime ] = useState<number>(25 * 60)
    const [ running, setRunning ] = useState<boolean>(false)
    const plus25 = (): void => setTime((prev) => prev + 25 * 60)
    const plus10 = (): void => setTime((prev) => prev + 10 * 60)
    const plus5 =  (): void => setTime((prev) => prev + 5 * 60)
    const plus1 =  (): void => setTime((prev) => prev + 1 * 60)
    const resetTimer = (): void => {
        switch(sessionType){
            case "focus":
                setTime(25 * 60);
                break;
            case "shortBreak":
                setTime(5 * 60);
                break;
            case "longBreak":
                setTime(15 * 60);
                break;
        }
    }
    useEffect(() => {
        if (time === 0) {
          // Mostrar notificación personalizada con un botón de reiniciar
          toast.info(
            <div style={{ display: 'flex', alignItems: 'center', 'flexDirection': 'column' }}>
              <div>🎉 ¡El tiempo ha terminado! 🎉</div>
              <div style={{ marginTop: '10px' }}>
                <button
                  onClick={resetTimer}
                  style={{
                    backgroundColor: '#4caf50',
                    color: '#fff',
                    border: 'none',
                    padding: '10px 20px',
                    borderRadius: '5px',
                    cursor: 'pointer',
                  }}
                >
                  Reiniciar
                </button>
              </div>
            </div>,
            {
              position: 'top-center',
              autoClose: false, // No se cierra automáticamente
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              style: {
                backgroundColor: '#333',
                color: '#fff',
                fontSize: '16px',
                fontWeight: 'bold',
                borderRadius: '8px',
                padding: '15px',
                boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
                textAlign: 'center',
              }
            }
          );
        }
      }, [time]);

    const modTime =(): void => setRunning((prev) => !prev)
    useEffect(()=> {
        let interval: ReturnType<typeof setInterval> | undefined
        if (running) {
            interval = setInterval(() => {
                setTime((prev) => (prev > 0 ? prev - 1 : 0));
        }, 1000);
        } else {
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [running])

    return(
        <section className="border-l-2 border-slate-500 flex items-center mt-20 flex-col"> 
            <div className="mb-5 flex gap-4 text-slate-300">
                <button className="cursor-pointer w-22 h-8 rounded-lg hover:bg-slate-700" onClick={() => {setSessionType("focus"); setTime(25 * 60)}}>Focus</button>
                <button className="cursor-pointer w-26 h-8 rounded-lg hover:bg-slate-700" onClick={() => {setSessionType("shortBreak"); setTime(5 * 60)}}>Short Break</button>
                <button className="cursor-pointer w-26 h-8 rounded-lg hover:bg-slate-700" onClick={()=> {setSessionType("longBreak"); setTime(15 * 60)}}>Long Break</button>
            </div>
            <h1 className="text-9xl font-bold">{Math.floor(time / 60)}:{String(time % 60).padStart(2, "00")}</h1>
            {/* <h1>{time}</h1> */}
            <ToastContainer />
            <div className="mt-5 flex gap-4 mb-4">
                <button className="cursor-pointer text-slate-400 hover:text-white w-22" onClick={plus25}>+ 25 min</button>
                <button className="cursor-pointer text-slate-400 hover:text-white w-22" onClick={plus10}>+ 10 min</button>
                <button className="cursor-pointer text-slate-400 hover:text-white w-22" onClick={plus5}>+ 5 min</button>
                <button className="cursor-pointer text-slate-400 hover:text-white w-22" onClick={plus1}>+ 1 min</button>
            </div>
            <aside className="flex gap-4">
                <button className={`border border-slate-300 w-22 cursor-pointer hover:scale-105 transition-transform rounded-md ${!running ? 'bg-green-400' : 'bg-red-400'}`} onClick={modTime}>{running ? 'Stop' : 'Start'}</button>
                {time !== 25 * 60 && (
                    <button className="border border-slate-300 w-22 cursor-pointer hover:scale-105 transition-transform rounded-md bg-gray-600" onClick={resetTimer}>Reset</button>
                )}
            </aside>
        </section>
    )
}
export { Timer } 