import * as React from 'react';
import { fullname } from '../../../../i18n';
import { Backend } from '../backendAPI';
import { LanguageSelector } from '../../../../components/LanguageSelector';
import { Translation } from 'react-i18next';

const Header = ({ backend }: { backend: Backend }) => {
  const backendUse = backend.use();
  const [t] = backendUse ? backendUse.tRefs() : [];
  return (
    <Translation>{ (_t) => (
    <>
      <nav className="navbar">
        <ul className="navbar-nav desktop-nav">
          <li className="nav-item with-logo">
            <img className="logo-brand" alt="logo" width="170" src={require('./../../../../static/assets/images/logo-est.png')} />
          </li>
          <li className="nav-item">
            <LanguageSelector/>
          </li>
          {backendUse && backendUse.mem && backendUse.mem.ui.user &&
            <li className="nav-item with-title">
              <p className="nav-item-title">{t!('header-user')}</p>
              <p>{fullname(backendUse.mem.ui.user)}</p>
            </li>
          }
          {backendUse && backendUse.mem && backendUse.mem.ui.user &&
            <li className="nav-item nav-logout">
              <button className="btn btn-logout" onClick={(ev) => backendUse.login(ev)}>{t!('header-logout')}</button>
            </li>
          }
        </ul>
      </nav>
    </>
    )}</Translation>
  )
}

export default Header;