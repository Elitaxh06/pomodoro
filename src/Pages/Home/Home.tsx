import { Timer } from "./Timer/Timer"
import { Todo } from "./todo/Todo"
function Home() {
    return(
        <main className="grid grid-cols-1 lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-2">
            <Todo />
            <Timer />
        </main>
    )
}

export { Home } 