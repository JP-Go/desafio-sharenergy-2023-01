import { useAuth } from '../lib/authContext';

export default function Header() {
  const { logout } = useAuth();

  return (
    <nav className="h-12 bg-white w-full">
      <ul className="h-full flex justify-end font-bold divide-x">
        <li className="px-4 py-2 h-full cursor-pointer bg-indigo-500 text-white hover:bg-indigo-600">
          User Listing
        </li>
        <li className="px-4 py-2 h-full cursor-pointer hover:bg-gray-100">
          HTTP Cat
        </li>
        <li className="px-4 py-2 h-full cursor-pointer hover:bg-gray-100">
          Random Dog
        </li>
        <li className="px-4 py-2 h-full cursor-pointer hover:bg-gray-100">
          Clients
        </li>
        <li
          className="px-4 py-2 h-full text-white cursor-pointer bg-red-500 hover:bg-red-600"
          onClick={logout}
        >
          Logout
        </li>
      </ul>
    </nav>
  );
}
