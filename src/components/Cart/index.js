import {Component} from 'react'
import {Link} from 'react-router-dom'
import CartContext from '../../Context/Contextdata'
import Header from '../Header'
import Footer from '../Footer'
import Cartlist from '../Cartlist'
import Counter from '../Counter'
import NoOrder from '../Noroder'
import './index.css'

class Cart extends Component {
  state = {}

  componentDidMount() {}

  orderlistitem = () => (
    <CartContext.Consumer>
      {value => {
        const {CartItem, removeallitem} = value
        const makeremove = () => {
          console.log('remove')
          removeallitem()
        }
        let totalbill = 0
        CartItem.forEach(object => {
          totalbill = totalbill + object.cost * object.count
        })

        if (CartItem.length === 0) {
          return <NoOrder />
        }
        return (
          <div className="part">
            <Header />
            <div className="supercontainer">
              <ul className="cartundorder">
                <div className="removetop">
                  <h1 className="mycart">My Cart</h1>
                  <button onClick={makeremove} className="buttonremove">
                    Remove all
                  </button>
                </div>
                {CartItem.map(object => (
                  <Cartlist key={object.id} items={object} />
                ))}
                <hr />
                <div className="billcontainer">
                  <h1 className="ordertotal">Order Total:</h1>
                  <div>
                    <p className="bill">Rs.{totalbill}/-</p>
                    <Link to="/payment">
                      <button className="order" type="button">
                        Place Order
                      </button>
                    </Link>
                  </div>
                </div>
              </ul>
            </div>
            <Footer />
          </div>
        )
      }}
    </CartContext.Consumer>
  )

  render() {
    return <div className="homecontainer">{this.orderlistitem()}</div>
  }
}

export default Cart
