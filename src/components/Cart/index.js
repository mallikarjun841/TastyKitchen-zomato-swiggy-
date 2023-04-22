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
  state = {cartdata: JSON.parse(localStorage.getItem('cartData'))}

  componentDidMount() {
    this.getdatamore()
  }

  getdatamore = () => {
    this.setState({cartdata: JSON.parse(localStorage.getItem('cartData'))})
  }

  removeitem = id => {
    const removedata = JSON.parse(localStorage.getItem('cartData'))
    const filterdata = removedata.filter(ele => id !== ele.id)
    console.log(filterdata)
    localStorage.setItem('cartData', JSON.stringify(filterdata))
    this.getdatamore()
  }

  increasecountdata = id => {
    const cartdata = JSON.parse(localStorage.getItem('cartData'))
    const updatedCartData = cartdata.map(eachItem => {
      if (eachItem.id === id) {
        const updatedQuantity = eachItem.quantity + 1
        return {...eachItem, quantity: updatedQuantity}
      }
      return eachItem
    })
    localStorage.setItem('cartData', JSON.stringify(updatedCartData))
    this.getdatamore()
  }

  decreasecountdata = id => {
    const storagedata = localStorage.getItem('cartData')
    const parsestorge = JSON.parse(storagedata)
    const checkdata = parsestorge.map(object => {
      if (id === object.id) {
        if (object.quantity > 0) {
          console.log(object.quantity)
          return {...object, quantity: object.quantity - 1}
        }
      }
      return object
    })

    console.log(checkdata)
    localStorage.setItem('cartData', JSON.stringify(checkdata))
    this.getdatamore()
  }

  makeremove = () => {
    localStorage.setItem('cartData', JSON.stringify([]))
    this.getdatamore()
  }

  orderlistitem = () => {
    const cartdata = JSON.parse(localStorage.getItem('cartData'))

    return (
      <CartContext.Consumer>
        {value => {
          const {CartItem, removeallitem} = value

          let totalbill = 0
          cartdata.forEach(object => {
            totalbill = totalbill + object.cost * object.quantity
          })

          if (cartdata.length === 0) {
            return <NoOrder />
          }
          return (
            <div className="part">
              <Header />
              <div className="supercontainer">
                <ul className="cartundorder">
                  <div className="removetop">
                    <h1 className="mycart">My Cart</h1>
                    <button onClick={this.makeremove} className="buttonremove">
                      Remove all
                    </button>
                  </div>
                  {cartdata.map(object => (
                    <Cartlist
                      key={object.id}
                      items={object}
                      removeitem={this.removeitem}
                      decreasecountdata={this.decreasecountdata}
                      increasecountdata={this.increasecountdata}
                    />
                  ))}
                  <hr />
                  <div className="billcontainer">
                    <h1 className="ordertotal">Order Total:</h1>
                    <div>
                      {/*  testid="total-price" */}
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
  }

  render() {
    return <div className="homecontainer">{this.orderlistitem()}</div>
  }
}

export default Cart
