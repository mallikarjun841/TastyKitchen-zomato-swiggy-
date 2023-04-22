import './index.css'
import Popup from 'reactjs-popup'
import {useState, useEffect} from 'react'
import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'

import CardContext from '../../Context/Contextdata'

const Header = props => {
  const [status, setStatus] = useState(true)
  const {history} = props
  const logout = () => {
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  const cartdata = JSON.parse(localStorage.getItem('cartData'))
  const totalcount = cartdata.length

  const homeclick = () => {}

  return (
    <CardContext.Consumer>
      {value => {
        const {CartItem} = value

        return (
          <nav className="navcontainer">
            <ul className="listunordercontainer">
              <li key="logo" className="listitem">
                <Link to="/">
                  <img
                    className="c1 capimg"
                    src="https://res.cloudinary.com/dtfn2tcjz/image/upload/v1644388324/logo_wgefao.png"
                    alt="website logo"
                  />
                </Link>
                <h1 className="c1 logoname lo">Tasty kitchen</h1>
              </li>

              <li
                key="logout"
                onClick={homeclick}
                className="listitem logoutpattern"
              >
                <Link className="move" to="/">
                  <li className="c1 head home">Home</li>
                </Link>
                <Link className="move" to="/cart">
                  <li className="c1 head cart">Cart</li>
                </Link>
                <span className="totalcount">{totalcount}</span>

                <button
                  onClick={logout}
                  className="c1 logoutbutton"
                  type="button"
                >
                  Logout
                </button>
              </li>

              <li
                key="logouts"
                onClick={homeclick}
                className="listitem logoutpattern1"
              >
                <Popup
                  trigger={
                    <button type="button" className="popbut">
                      <img
                        src="https://res.cloudinary.com/dzligmi9w/image/upload/v1670573931/Iconthree_oqndvv.png"
                        alt="img"
                      />
                    </button>
                  }
                >
                  <div className="popupcontainer">
                    <Link className="forward" to="/">
                      <li className="s1">Home</li>
                    </Link>
                    <Link className="forward" to="/cart">
                      <li className="s1 l2">Cart</li>
                    </Link>
                    <button
                      onClick={logout}
                      className="c1 logoutbutton"
                      type="button"
                    >
                      Logout
                    </button>
                  </div>
                </Popup>
              </li>
            </ul>
          </nav>
        )
      }}
    </CardContext.Consumer>
  )
}
export default withRouter(Header)
