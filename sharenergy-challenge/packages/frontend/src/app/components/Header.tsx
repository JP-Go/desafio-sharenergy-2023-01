import { Link } from 'react-router-dom';
import { useAuth } from '../lib/authContext';

interface HeaderProps {
  path: string;
}

export default function Header({ path }: HeaderProps) {
  const { logout } = useAuth();

  return (
    <nav className="h-12 bg-white w-full">
      <ul className="h-full flex justify-end font-bold divide-x">
        <Link
          className={`${
            path === '/home' ? 'active-header-item' : 'inactive-header-item'
          }`}
          to={'/home'}
        >
          User Listing
        </Link>
        <Link
          className={`${
            path === '/http-cat' ? 'active-header-item' : 'inactive-header-item'
          }`}
          to={'/http-cat'}
        >
          HTTP Cat
        </Link>
        <Link
          to={'/random-dog'}
          className={`${
            path === '/random-dog'
              ? 'active-header-item'
              : 'inactive-header-item'
          }`}
        >
          Random Dog
        </Link>
        <li
          className={`${
            path === '/clients' ? 'active-header-item' : 'inactive-header-item'
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
