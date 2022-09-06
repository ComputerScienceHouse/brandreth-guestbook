import { useOidcUser, useOidc } from '@axa-fr/react-oidc';
import {
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledDropdown,
} from 'reactstrap';

// TODO: move to a types folder
export interface Oidc {
  logout: () => void;
}

export interface OidcUser {
  oidcUser: {
    name: string;
    email: string;
    groups: string[];
    preferred_username: string;
  };
}

const Profile: React.FunctionComponent = () => {
  const { oidcUser } = useOidcUser() as OidcUser;
  const { logout } = useOidc() as Oidc;

  if (!oidcUser) return null;

  const { name, preferred_username: username } = oidcUser;

  return (
    <UncontrolledDropdown nav inNavbar>
      <DropdownToggle nav caret className="navbar-user">
        <img
          className="rounded-circle"
          src={`https://profiles.csh.rit.edu/image/${username}`}
          alt=""
          aria-hidden
          width={32}
          height={32}
        />
        {name} ({username})
        <span className="caret" />
      </DropdownToggle>
      <DropdownMenu>
        <DropdownItem>Dashboard</DropdownItem>
        <DropdownItem>Settings</DropdownItem>
        <DropdownItem divider />
        <DropdownItem onClick={() => logout()}>Logout</DropdownItem>
      </DropdownMenu>
    </UncontrolledDropdown>
  );
};

export default Profile;
