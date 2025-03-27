import { useState } from "react";

function Todo() {
    type Task = {
        id:number,
        text:string,
        complete:boolean
    }
    const localStorageTask: string = localStorage.getItem('tasks') ?? "[]";
    let parset: Task[];
    if(!localStorageTask) {
        localStorage.setItem('tasks', JSON.stringify([]))
        parset = []
    }else{
        parset = JSON.parse(localStorageTask)
    }
    const [newTask, setNewTask] = useState<string>("")
    const [tasks, setTasks] = useState<Task[]>(parset)
    const [filter, setFilter] = useState<string>('')
    const [search, setSearch] = useState<string>('')

    const saveTasks = (newTasks: Task[]): void => {
        localStorage.setItem('tasks', JSON.stringify(newTasks))
        setTasks(newTasks)
    }
    const addTask = ():void => {
        if(newTask.trim() !== ''){
            const ta = {
                id:Date.now(),
                text:newTask,
                complete:false
            }
            saveTasks([...tasks, ta])
            setNewTask('')
        }
    }

    const removeTask = (id:number): void => {
        const newTasks = tasks.filter(task => task.id !== id)
        saveTasks(newTasks)
    }

    const toggleTask = (id:number): void => {
        const newTasks = tasks.map(task => {
            if(task.id == id) {
                return {...task, complete: !task.complete}
            }
            return task
        })
        saveTasks(newTasks)
    }

    const filterTasks = (): Task[] => {
        switch(filter){
            case 'complete':
                return tasks.filter(task => task.complete)
            case 'pending':
                return tasks.filter(task => !task.complete)
            default:
                return tasks
        }
    }

    const countTask = () => {
        const total = tasks.length
	    const completed = tasks.filter(task => task.complete).length
	    const pending = total - completed
	    return {total, completed, pending} 
    }

    const filterTasksBySearch = filterTasks().filter(tar => tar.text.toLowerCase().includes(search.toLocaleLowerCase()))
    
    
    return(
        <section className="mt-20 ml-5 h-[calc(100vh-150px)] flex flex-col mr-8">
            <h1 className="text-4xl text-center font-semibold mb-4">Lista de tareas</h1>
            <div className="flex gap-4 items-center">
                <form onSubmit={addTask} className="mt-4 mb-4">
                    <input
                    className="bg-gray-700 rounded-xl w-96 h-12 placeholder:text-center text-center hover:scale-105 transition-transform hover:border border-green-300" 
                    type="text" 
                    value={newTask}
                    onChange={(e) => setNewTask(e.target.value)}
                    placeholder="Agregar Tarea"
                    />
                </form>
                <button onClick={addTask} className="border border-green-800 rounded-lg w-32 h-12 bg-gray-600 cursor-pointer hover:scale-105 transition-transform hover:border-green-300 hover:text-sky-300 hover:bg-gray-500">Agregar</button>
            </div>
            <div className="flex gap-4 items-center mt-3 mb-4">
                <input 
                    className="bg-gray-700 rounded-xl w-96 h-8 placeholder:text-center text-center hover:scale-105 transition-transform hover:border border-green-300"
                    type="" 
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Buscar tareas"
                    />
                    <select value={filter} onChange={(e) => setFilter(e.target.value)} className="bg-gray-700 rounded-xl w-32 h-8 placeholder:text-center text-center  hover:scale-105 transition-transform hover:border border-green-300 cursor-pointer">
                        <option value="todas">Todas</option>   
                        <option value="complete">Completadas</option>
                        <option value="pending">Pendientes</option>
                    </select>
            </div>
            

            <p>Total: {countTask().total}</p>
            <p>Completed: {countTask().completed}</p>
            <p>Pending: {countTask().pending}</p>
            <div className="mt-4 mx-h-64 overflow-y-scroll border border-gray-600 p-4 rounded-lg">
                <ul>
                    {filterTasksBySearch.map(task => (
                        <li className="gap-4 border-b border-slate-600 py-2 mb-2" key={task.id}>
                            <div className="flex items-center justify-between">
                                <div className="flex gap-3 items-center">
                                    <input 
                                    className="border-2 border-green-300 cursor-pointer w-4 h-6" 
                                    type="checkbox" 
                                    checked={task.complete}
                                    onChange={() => toggleTask(task.id)}
                                    />
                                <span className={`${task.complete ? 'line-through' : ''} text-lg font-semibold`}>{task.text}</span>
                                </div>
                            <button className="rounded-md h-6 hover:scale-105 transition-transform cursor-pointer text-red-400 hover:text-red-500 font-semibold" onClick={() => removeTask(task.id)}><svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="bi bi-trash w-6" viewBox="0 0 16 16"><path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"></path><path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"></path></svg></button>
                            </div>
                        </li>
                    ))}
                    {filterTasks().length === 0 && <p className='text-center text-xl font-bold'>No hay tareas para mostrar</p>}
                </ul>
            </div>
        </section>
    )

}

export { Todo }