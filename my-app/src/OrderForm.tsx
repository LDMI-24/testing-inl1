import './orderForm.css'

export const OrderForm = () => {

  return (
    <>
    <h1>Order Form</h1>
      <form>
        <div className="form-fields">
          <div className="form-basic-info">
            <label>
              <span>First Name</span>
              <input className="form-field" id="f-name" type="text" autoComplete="given-name" required />
            </label>
            <label>
              <span>Last Name</span>
              <input className="form-field" id="l-name" type="text" autoComplete="family-name" required />
            </label>
            <label>
              <span>Streetname</span>
              <input className="form-field" id="street-name" type="text" required />
            </label>
            <label>
              <span>Postal code</span>
              <input className="form-field" id="postal-code" type="number" required />
            </label>
            <label>
              <span>City</span>
              <input className="form-field" id="city" type="text" required />
            </label>
            <label>
              <span>Door Code (if applicable)</span>
              <input className="form-field" id="door-code" type="number" inputMode="numeric" />
            </label>
            <label>
              <span>Your phonenumber (mobile)</span>
              <input className="form-field" id="phone-number" type="tel" autoComplete="tel" required />
            </label>
            <label>
              <span>Your Email</span>
              <input className="form-field" id="email" type="email" autoComplete="on" required />
            </label>
          </div>
          <div className="payment-info">
            <p className='card-txt'>Pay with Card</p>
            <div id="card-details">
              <label>
                  <span>Card Number</span>
                  <input className="form-field" id="card-number" type="number" />
              </label>
              <label>
                  <span>Card Expiration</span>
                  <input className="form-field" id="card-expiration" type="number" />
              </label>
              <label>
                  <span>Card CVC</span>
                  <input className="form-field" id="card-cvc" type="number" />
              </label>
            </div>
          </div>
        </div>
        <div className="order-buttons">
          <input className="cancel-order-btn" type="reset" value="Cancel Order" />
          <input className="place-order-btn" type="submit" value="Place Order" disabled />
        </div>
      </form>
    </>
  );
};

//<form onSubmit={handleSubmit}>