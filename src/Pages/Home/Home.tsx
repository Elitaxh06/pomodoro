import { Timer } from "./Timer/Timer"
import { Todo } from "./todo/Todo"
function Home() {
    return(
        <main className="grid grid-cols-1 lg:grid-cols-2 md:grid-cols-1 sm:grid-cols-1">
            <Todo />
            <Timer />
        </main>
    )
}

export { Home } 