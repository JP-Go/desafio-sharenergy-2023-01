import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../lib/authContext';

export default function Header() {
  const { logout } = useAuth();
  const { pathname } = useLocation();

  return (
    <nav className="h-12 bg-white w-full">
      <ul className="h-full flex justify-end font-bold divide-x">
        <Link
          className={`${
            pathname === '/home' ? 'active-header-item' : 'inactive-header-item'
          }`}
          to={'/home'}
        >
          User Listing
        </Link>
        <Link
          className={`${
            pathname === '/http-cat'
              ? 'active-header-item'
              : 'inactive-header-item'
          }`}
          to={'/http-cat'}
        >
          HTTP Cat
        </Link>
        <li
          className={`${
            pathname === '/dog' ? 'active-header-item' : 'inactive-header-item'
          }`}
        >
          Random Dog
        </li>
        <li
          className={`${
            pathname === '/clients'
              ? 'active-header-item'
              : 'inactive-header-item'
          }`}
        >
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
