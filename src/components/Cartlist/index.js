import CardContext from '../../Context/Contextdata'

const Cartlist = props => {
  const {items, removeitem, increasecountdata, decreasecountdata} = props
  console.log(items)
  console.log('items')
  console.log(items)
  const {imageUrl, id, name, cost, quantity} = items
  console.log(items.quantity)
  const getdata = JSON.parse(localStorage.getItem('cartData'))
  const particulardata = getdata.filter(object => id === object.id)
  console.log('datas')
  console.log(particulardata[0])
  console.log('datas')
  return (
    <CardContext.Consumer>
      {value => {
        const {
          CartItem,
          removeelementfromcart,
          increasecount,
          decreasecount,
          remov,
        } = value

        const removeelementcart = () => {
          removeitem(id)
        }

        const onDecrement = () => {
          decreasecountdata(id)
        }
        const onIncrement = () => {
          increasecountdata(id)
        }
        const totalprice = () => {}

        return (
          <li id={id} key={id} className="cartlist">
            {/* testid="cartItem" */}
            <div className="dish">
              <img className="cartimg" src={imageUrl} alt="img" />
              <h1 className="ordertotal">{name}</h1>
              <div className="cartflow">
                <h1 className="ordertotal nametotal">{name}</h1>
                <div className="counter">
                  <button
                    // testid="decrement-quantity"
                    className="measure"
                    type="button"
                    onClick={onDecrement}
                  >
                    -
                  </button>
                  {/*  testid="item-quantity" */}
                  <p className="count">{particulardata[0].quantity}</p>

                  <button
                    // testid="increment-quantity"
                    className="measure"
                    type="button"
                    onClick={onIncrement}
                  >
                    +
                  </button>
                </div>
                {/* testid="total-price" */}
                <p className="price">Rs.{cost * quantity}</p>
                <button
                  className="remove"
                  onClick={removeelementcart}
                  type="button"
                >
                  x
                </button>
              </div>
            </div>

            <button
              className="remove2"
              onClick={removeelementcart}
              type="button"
            >
              x
            </button>
          </li>
        )
      }}
    </CardContext.Consumer>
  )
}

export default Cartlist
