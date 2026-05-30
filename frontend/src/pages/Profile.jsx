import Navbar from "../components/Navbar";

function Profile() {

  const username =
    localStorage.getItem("username") || "Guest";

  return (
    <div className="min-h-screen bg-[#030712] text-white">

      <Navbar />

      <div className="max-w-5xl mx-auto px-6 py-12">

        <div className="bg-white/5 border border-white/10 backdrop-blur-2xl rounded-3xl p-10">

          <h1 className="text-5xl font-black mb-10">
            My Profile 👤
          </h1>

          <div className="space-y-6">

            <div className="bg-white/5 p-6 rounded-2xl">

              <p className="text-gray-400 mb-2">
                Username
              </p>

              <h2 className="text-3xl font-bold">
                {username}
              </h2>

            </div>

            <div className="bg-white/5 p-6 rounded-2xl">

              <p className="text-gray-400 mb-2">
                Account Status
              </p>

              <h2 className="text-green-400 text-2xl font-bold">
                Active
              </h2>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Profile;