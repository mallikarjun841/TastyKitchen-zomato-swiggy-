import {Component} from 'react'
import {AiFillStar} from 'react-icons/ai'
import {BiRupee} from 'react-icons/bi'
import CartContext from '../../Context/Contextdata'
import Counter from '../Counter'
import './index.css'

class FoodDetails extends Component {
  state = {count: 1, viewbutton: true}

  componentDidMount() {
    this.findview()
  }

  removecartitem = () => {
    const cartData = JSON.parse(localStorage.getItem('cartData'))
    const {item} = this.props
    const updatedCartData = cartData.filter(
      eachCartItem => eachCartItem.id !== item.id,
    )
    localStorage.setItem('cartData', JSON.stringify(updatedCartData))
    this.findview()
  }

  findview = () => {
    const {item} = this.props
    const storagedata = localStorage.getItem('cartData')
    const parsestorge = JSON.parse(storagedata)
    const findmoredata = parsestorge.filter(data => item.id === data.id)
    console.log('findview')
    console.log(findmoredata)
    if (findmoredata.length !== 0) {
      if (findmoredata[0].quantity > 0) {
        this.setState({count: findmoredata[0].quantity, viewbutton: false})
      } else if (findmoredata[0].quantity < 1) {
        this.removecartitem()
        this.setState({count: findmoredata[0].quantity, viewbutton: true})
      }
    }
  }

  onDecrement = () => {
    const {count} = this.state
    const storagedata = localStorage.getItem('cartData')
    const parsestorge = JSON.parse(storagedata)
    const {item} = this.props
    console.log(parsestorge)
    console.log('checkdata')
    const checkdata = parsestorge.map(object => {
      if (item.id === object.id) {
        if (object.quantity > 0) {
          console.log(object.quantity)
          return {...object, quantity: object.quantity - 1}
        }
        this.setState({count: 0})
      }
      return object
    })

    console.log(checkdata)
    localStorage.setItem('cartData', JSON.stringify(checkdata))
    this.findview()
  }

  onIncrement = () => {
    console.log('viewparo')
    const cartdata = JSON.parse(localStorage.getItem('cartData'))

    console.log(cartdata)
    const {item} = this.props
    const updatedCartData = cartdata.map(eachItem => {
      if (eachItem.id === item.id) {
        const updatedQuantity = eachItem.quantity + 1
        return {...eachItem, quantity: updatedQuantity}
      }
      return eachItem
    })
    localStorage.setItem('cartData', JSON.stringify(updatedCartData))
    this.findview()
  }

  additem = () => {
    const {getmoredetails} = this.props
    const getdata = JSON.parse(localStorage.getItem('cartData'))
    const {item} = this.props
    getdata.push({...item, quantity: 1})
    localStorage.setItem('cartData', JSON.stringify(getdata))
    this.findview(item)
    this.setState({count: 1, viewbutton: false})
  }

  render() {
    const {count, viewbutton} = this.state
    const {item, ids, onmakeadd, getmoredetails} = this.props
    const {id, cuisine, name, imageUrl, cost, rating} = item

    return (
      <CartContext.Consumer>
        {value => {
          const {CartItem, addcartitemlist} = value

          //    console.log('visibleitem')
          // const visibleitem = CartItem.some(object => object.id === id)
          // console.log(visibleitem)

          return (
            <li testid="foodItem" className="hotellists">
              <img
                src={imageUrl}
                alt="restaurant"
                className="hotelimg foodimg"
              />
              <div className="details">
                <h1 className="m1">{name}</h1>
                <p className="m1 starrating">
                  <BiRupee className="rupee" />
                  {cost}
                </p>
                <p className="m1 starrating">
                  <AiFillStar className="star" />
                  {rating} <span className="view">Rating</span>
                </p>
                {viewbutton === true ? (
                  <button
                    onClick={this.additem}
                    className="addbutton"
                    type="button"
                  >
                    Add
                  </button>
                ) : (
                  <div className="counter k1">
                    <button
                      testid="decrement-count"
                      className="measure"
                      type="button"
                      onClick={this.onDecrement}
                    >
                      -
                    </button>

                    <p testid="active-count" className="dots">
                      {count}
                    </p>

                    <button
                      testid="increment-count"
                      className="measure"
                      type="button"
                      onClick={this.onIncrement}
                    >
                      +
                    </button>
                  </div>
                )}
              </div>
            </li>
          )
        }}
      </CartContext.Consumer>
    )
  }
}
export default FoodDetails
