import { Link } from "react-router";

const NotFound = () => {
    return (
        <div className="min-h-[80vh] flex items-center justify-center px-4">
            <div className="text-center max-w-md">
                <h1 className="text-7xl font-bold text-purple-500">404</h1>

                <h2 className="mt-4 text-2xl font-semibold text-gray-100">
                    Page not found
                </h2>

                <p className="mt-2 text-gray-400">
                    Sorry, the page you are looking for doesn’t exist or has been moved.
                </p>

                <div className="mt-6 flex justify-center gap-4">
                    <Link
                        to="/"
                        className="rounded-lg bg-purple-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-purple-700 transition"
                    >
                        Go Home
                    </Link>

                    <button
                        onClick={() => window.history.back()}
                        className="rounded-lg border border-gray-700 px-5 py-2.5 text-sm font-medium text-gray-300 hover:bg-gray-800 transition"
                    >
                        Go Back
                    </button>
                </div>
            </div>
        </div>
    );
};

export default NotFound;
