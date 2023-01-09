import Header from '../components/Header';
import AuthedPage from './authed-page';

export default function Clients() {
  return (
    <AuthedPage>
      <Header path="/clients" />
    </AuthedPage>
  );
}
