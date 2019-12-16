import * as React from 'react';

// <div className="footer-logo">
//   <img className="logo-brand" alt="logo" src={require('./../../../../static/assets/images/logo-est.png')} />
// </div>
const Footer = () => {
  return (
    <footer>
      <div className="footer-top">
        <div className="footer-contact">
          <div>
            <div className="footer-contact-icon">
              <i className="icon-phone"></i>
            </div>
          </div>
          <div className="footer-contact-text">
            <table>
              <tbody>
                <tr>
                  <th><a className="link-phone" href="tel:+372-555-1">555 1234</a></th>
                  <th>Üldinfo</th>
                </tr>
                <tr>
                  <td><a className="link-phone" href="tel:+372-555-1234">555 1234</a></td>
                  <td>Teine osakond</td>
                </tr>
                <tr>
                  <td><a className="link-phone" href="tel:+372-555-1234">555 1234</a></td>
                  <td>Kolmas osakond</td>
                </tr>
              </tbody>
            </table>
            <a className="link-orange" href="http://www.digilugu.ee/" target="_blank" rel="noopener noreferrer">Kõik kontaktandmed</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer;