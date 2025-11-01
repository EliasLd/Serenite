import { useState } from "react";
import Register from "./components/Register";
import Login from "./components/Login";

function App() {
    const [showLogin, setShowLogin] = useState(false);

    return (
        <div className="flex items-center justify-center min-h-screen bg-neutral-900">
            <div className="w-full max-w-sm p-6 rounded">
                <button
                    onClick={() => setShowLogin(!showLogin)}
                    className="text-sereniteText mb-6 p-2 w-full"
                >
                    Switch to {showLogin ? "Register" : "Login"}
                </button>
                {showLogin ? <Login /> : <Register />}
            </div>
        </div>
    );
}

export default App;
