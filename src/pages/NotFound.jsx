import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center">
      <h1 className="text-[4rem] font-bold text-white">404</h1>
      <h1 className="text-4xl font-bold text-white">Page Not Found</h1>
      <p className="text-lg mt-4 te text-white">
        The page you are looking for does not exist.
      </p>
      <Link to="/" className="mt-6 px-4 py-2 bg-white text-[#111] rounded">
        Go Back Home
      </Link>
    </div>
  );
}

export default NotFound;
