import { useEffect, useState } from "react"
function Timer() {
    const [ time, setTime ] = useState(25 * 60)
    const [ running, setRunning ] = useState(false)
    const plus25 = () => setTime(time + 25 * 60)
    const plus10 = () => setTime(time + 10 * 60)
    const plus5 = () => setTime(time + 5 * 60)
    const plus1 = () => setTime(time + 1 * 60)
    const reset = () => setTime(25 * 60)
    const modTime = () => setRunning(!running)
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
        <section className="mt-20"> 
            
            <h1 className="text-5xl font-bold">{Math.floor(time / 60)}:{String(time % 60).padStart(2, "0")}</h1>
            <div className="mt-5 flex gap-4 mb-4">
                <button className="border border-slate-300 w-22" onClick={plus25}>+ 25 min</button>
                <button className="border border-slate-300 w-22" onClick={plus10}>+ 10 min</button>
                <button className="border border-slate-300 w-22" onClick={plus5}>+ 5 min</button>
                <button className="border border-slate-300 w-22" onClick={plus1}>+ 1 min</button>
            </div>
            <aside className="flex gap-4">
                <button className="border border-slate-300 w-22" onClick={modTime}>{running ? 'Stop' : 'Start'}</button>
                <button className="border border-slate-300 w-22" onClick={reset}>Reset</button>
            </aside>
        </section>
    )
}


export { Timer } 