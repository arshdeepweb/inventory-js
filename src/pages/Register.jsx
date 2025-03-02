// Register Component
export function Register() {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <div className="bg-white shadow-md rounded-lg p-6 w-96">
          <h2 className="text-2xl font-semibold mb-4">Register</h2>
          <input className="border p-2 w-full mb-4" type="text" placeholder="Name" />
          <input className="border p-2 w-full mb-4" type="email" placeholder="Email" />
          <input className="border p-2 w-full mb-4" type="password" placeholder="Password" />
          <button className="bg-green-500 text-white w-full p-2 rounded">Register</button>
        </div>
      </div>
    );
  }
