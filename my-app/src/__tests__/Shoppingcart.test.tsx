import { describe, expect, test } from 'vitest';
import { Shoppingcart } from '../models/Shoppingcart';
import type { ICartProduct } from '../models/ICartProduct';
import type { ICustomerData } from '../models/ICustomerData';

const product1: ICartProduct = {
  id: 3,
  name: "Headphones",
  price: 418,
  quantity: 1,
}
const product2: ICartProduct = {
  id: 6,
  name: "Waterbottle",
  price: 13,
  quantity: 1,
}
let customerData: ICustomerData = {
  firstName: "Diana",
  lastName: "Henriksson",
  streetName: "Kodgatan 5",
  postalCode: "11100",
  city: "JavaScript City",
  phoneNr: "0000000000",
  email: "Diana.H@email.com",
  cardHolderName: "Diana Henriksson",
  cardNr: "0110100001101001",
  cardCvc: "001",
  cardExpiration: "12/27",
}

describe('Shoppingcart basic functions', () => {
  test('shoppingcart should be empty at first', () => {
    const shoppingcart = new Shoppingcart();
      expect(shoppingcart.cart.length).toBe(0);
  });
})

describe('Add product to shoppingcart', () => {
  test('should succesfully add one product', () => {
    const shoppingcart = new Shoppingcart();
    shoppingcart.addProduct(product1.id, product1.name, product1.price, product1.quantity);
    expect(shoppingcart.cart.length).toBe(1);
    expect(shoppingcart.cart[0].id).toBe(3) 
  });

  test('should allow adding multiple of the same product', () => {
    const shoppingcart = new Shoppingcart();
    shoppingcart.addProduct(product1.id, product1.name, product1.price, product1.quantity);
    shoppingcart.addProduct(product1.id, product1.name, product1.price, product1.quantity);
    expect(shoppingcart.cart.length).toBe(1);
    expect(shoppingcart.cart[0].id).toBe(3);
    expect(shoppingcart.cart[0].quantity).toBe(2);
  });

  test('should allow adding multiple different products', () => {
    const shoppingcart = new Shoppingcart();
    shoppingcart.addProduct(product1.id, product1.name, product1.price, product1.quantity);
    shoppingcart.addProduct(product2.id, product2.name, product2.price, product2.quantity);
    expect(shoppingcart.cart.length).toBe(2);
    expect(shoppingcart.cart[0].id).toBe(3);
    expect(shoppingcart.cart[0].quantity).toBe(1);
    expect(shoppingcart.cart[1].id).toBe(6);
    expect(shoppingcart.cart[1].quantity).toBe(1);
  });
  test('Should update total price when one product is added', () => {
    const shoppingcart = new Shoppingcart();
    shoppingcart.addProduct(product1.id, product1.name, product1.price, product1.quantity);
    expect(shoppingcart.cartTotal).toBe(product1.price);
  });
    test('Should update total price when multiple products are added', () => {
    const shoppingcart = new Shoppingcart();
    shoppingcart.addProduct(product1.id, product1.name, product1.price, product1.quantity);
    shoppingcart.addProduct(product1.id, product1.name, product1.price, product1.quantity);
    expect(shoppingcart.cartTotal).toBe(product1.price * 2);
  });
      test('Should update total price when multiple different products are added', () => {
    const shoppingcart = new Shoppingcart();
    shoppingcart.addProduct(product1.id, product1.name, product1.price, product1.quantity);
    shoppingcart.addProduct(product1.id, product1.name, product1.price, product1.quantity);
    shoppingcart.addProduct(product2.id, product2.name, product2.price, product2.quantity);
    shoppingcart.addProduct(product2.id, product2.name, product2.price, product2.quantity);
    expect(shoppingcart.cartTotal).toBe((product1.price * 2) + (product2.price * 2));
  });
});

describe('Remove product from shoppingcart', () => {
  test('should successfully remove one product', () => {
    const shoppingcart = new Shoppingcart();
    shoppingcart.addProduct(product1.id, product1.name, product1.price, product1.quantity);
    shoppingcart.removeProduct(product1.id);
    expect(shoppingcart.cart.length).toBe(0);
  });
  test('should successfully remove one type of product', () => {
    const shoppingcart = new Shoppingcart();
    shoppingcart.addProduct(product1.id, product1.name, product1.price, product1.quantity);
    shoppingcart.addProduct(product2.id, product2.name, product2.price, product2.quantity);
    shoppingcart.addProduct(product2.id, product2.name, product2.price, product2.quantity);
    shoppingcart.removeProduct(product1.id);
    expect(shoppingcart.cart[0].id).toBe(6);
    expect(shoppingcart.cart[0].quantity).toBe(2);
    expect(shoppingcart.cart.length).toBe(1);
  });
  test('should successfully remove multiple of the same product', () => {
    const shoppingcart = new Shoppingcart();
    shoppingcart.addProduct(product1.id, product1.name, product1.price, product1.quantity);
    shoppingcart.addProduct(product1.id, product1.name, product1.price, product1.quantity);
    shoppingcart.removeProduct(product1.id);
    shoppingcart.removeProduct(product1.id);
    expect(shoppingcart.cart.length).toBe(0);
  });
  test('should successfully remove multiple different products', () => {
    const shoppingcart = new Shoppingcart();
    shoppingcart.addProduct(product1.id, product1.name, product1.price, product1.quantity);
    shoppingcart.addProduct(product1.id, product1.name, product1.price, product1.quantity);
    shoppingcart.addProduct(product2.id, product2.name, product2.price, product2.quantity);
    shoppingcart.addProduct(product2.id, product2.name, product2.price, product2.quantity);
    shoppingcart.removeProduct(product1.id);
    shoppingcart.removeProduct(product1.id);
    shoppingcart.removeProduct(product2.id);
    expect(shoppingcart.cart.length).toBe(1);
  });
  test('should succesfully ensure that the product is removed if there is 0 of them', () => {
    const shoppingcart = new Shoppingcart();
    shoppingcart.addProduct(product1.id, product1.name, product1.price, product1.quantity);
    shoppingcart.addProduct(product1.id, product1.name, product1.price, product1.quantity);
    shoppingcart.removeProduct(product1.id);
    shoppingcart.removeProduct(product1.id);
    expect(shoppingcart.cart.length).toBe(0);
  });
  test('Should update total price when one product is removed', () => {
    const shoppingcart = new Shoppingcart();
    shoppingcart.addProduct(product1.id, product1.name, product1.price, product1.quantity);
    shoppingcart.addProduct(product1.id, product1.name, product1.price, product1.quantity);
    shoppingcart.removeProduct(product1.id);
    expect(shoppingcart.cartTotal).toBe(product1.price);
  });
  test('Should update total price when multiple products are removed', () => {
    const shoppingcart = new Shoppingcart();
    shoppingcart.addProduct(product1.id, product1.name, product1.price, product1.quantity);
    shoppingcart.addProduct(product1.id, product1.name, product1.price, product1.quantity);
    shoppingcart.addProduct(product1.id, product1.name, product1.price, product1.quantity);
    shoppingcart.removeProduct(product1.id);
    shoppingcart.removeProduct(product1.id);
    expect(shoppingcart.cartTotal).toBe(product1.price);
  });
  test('Should update total price when multiple different products are removed', () => {
    const shoppingcart = new Shoppingcart();
    shoppingcart.addProduct(product1.id, product1.name, product1.price, product1.quantity);
    shoppingcart.addProduct(product1.id, product1.name, product1.price, product1.quantity);
    shoppingcart.addProduct(product2.id, product2.name, product2.price, product2.quantity);
    shoppingcart.addProduct(product2.id, product2.name, product2.price, product2.quantity);
    shoppingcart.removeProduct(product1.id);
    shoppingcart.removeProduct(product2.id);
    expect(shoppingcart.cartTotal).toBe(product1.price + product2.price);
  });
})

describe('Apply voucher to shoppingcart', () => {
  test('should apply discount to the cart', () => {
    const shoppingcart = new Shoppingcart();
    shoppingcart.addProduct(product1.id, product1.name, product1.price, product1.quantity);
    shoppingcart.addProduct(product2.id, product2.name, product2.price, product2.quantity);
    shoppingcart.applyVoucher("418_I'm_A_Teapot");
    expect(shoppingcart.discount).toBe(0.25);
  });
  test('should fail if voucher is incorrect', () => {
    const shoppingcart = new Shoppingcart();
    shoppingcart.addProduct(product1.id, product1.name, product1.price, product1.quantity);
    shoppingcart.addProduct(product2.id, product2.name, product2.price, product2.quantity);
    expect(() => {
    shoppingcart.applyVoucher("identity_crisis_aquired");
    }).toThrowError('That is not a valid voucher, please try again');
  });
})

describe('Delete all items from the shoppingcart', () => {
  test('should delete all items', () => {
    const shoppingcart = new Shoppingcart();
    shoppingcart.addProduct(product1.id, product1.name, product1.price, product1.quantity);
    shoppingcart.addProduct(product2.id, product2.name, product2.price, product2.quantity);
    shoppingcart.clearCart();
    expect(shoppingcart.cart.length).toBe(0);
  });
  test('Should set total price to 0 when cart is cleared', () => {
    const shoppingcart = new Shoppingcart();
    shoppingcart.addProduct(product1.id, product1.name, product1.price, product1.quantity);
    shoppingcart.addProduct(product2.id, product2.name, product2.price, product2.quantity);
    shoppingcart.clearCart();
    expect(shoppingcart.cartTotal).toBe(0);
  });
})

describe('Enter customer data and place order', () => {
  test('should ensure the customer data is correct', () => {
    const shoppingcart = new Shoppingcart();
    shoppingcart.addProduct(product1.id, product1.name, product1.price, product1.quantity);
    shoppingcart.addProduct(product2.id, product2.name, product2.price, product2.quantity);
    shoppingcart.placeOrder(customerData);
    expect(shoppingcart.cart.length).toBe(2);
    expect(shoppingcart.customerData).toBe(customerData);
  });
  test('should fail if first name contains anything but letters', () => {
    const customerDataOld = {...customerData}
    const shoppingcart = new Shoppingcart();
    shoppingcart.addProduct(product1.id, product1.name, product1.price, product1.quantity);
    shoppingcart.addProduct(product2.id, product2.name, product2.price, product2.quantity);
    customerData.firstName = "blerp2"
    expect(() => shoppingcart.placeOrder(customerData)).toThrowError('Names can only contain letters, please try again');
    customerData = customerDataOld
  });
  test('should fail if last name contains anything but letters', () => {
    const customerDataOld = {...customerData}
    const shoppingcart = new Shoppingcart();
    shoppingcart.addProduct(product1.id, product1.name, product1.price, product1.quantity);
    shoppingcart.addProduct(product2.id, product2.name, product2.price, product2.quantity);
    customerData.lastName = "blerp2"
    expect(() => shoppingcart.placeOrder(customerData)).toThrowError('Names can only contain letters, please try again');
    customerData = customerDataOld
  });
  test('should fail if streetname contains anything but letters and numbers', () => {
    const customerDataOld = {...customerData}
    const shoppingcart = new Shoppingcart();
    shoppingcart.addProduct(product1.id, product1.name, product1.price, product1.quantity);
    shoppingcart.addProduct(product2.id, product2.name, product2.price, product2.quantity);
    customerData.streetName = "blerp 2.0"
    expect(() => shoppingcart.placeOrder(customerData)).toThrowError('Invalid street name, please try again');
    customerData = customerDataOld
  });
  test('should fail if postalcode contains anything but numbers', () => {
    const customerDataOld = {...customerData}
    const shoppingcart = new Shoppingcart();
    shoppingcart.addProduct(product1.id, product1.name, product1.price, product1.quantity);
    shoppingcart.addProduct(product2.id, product2.name, product2.price, product2.quantity);
    customerData.postalCode = "IamATest!"
    expect(() => shoppingcart.placeOrder(customerData)).toThrowError('Invalid postal code, please try again');
    customerData = customerDataOld
  });
  test('should fail if city contains anything but letters', () => {
    const customerDataOld = {...customerData}
    const shoppingcart = new Shoppingcart();
    shoppingcart.addProduct(product1.id, product1.name, product1.price, product1.quantity);
    shoppingcart.addProduct(product2.id, product2.name, product2.price, product2.quantity);
    customerData.city = "JavaScript City 3.0!!"
    expect(() => shoppingcart.placeOrder(customerData)).toThrowError('Citynames can only contain letters, please try again');
    customerData = customerDataOld
  });
  test('should fail if phone number contains anything but numbers', () => {
    const customerDataOld = {...customerData}
    const shoppingcart = new Shoppingcart();
    shoppingcart.addProduct(product1.id, product1.name, product1.price, product1.quantity);
    shoppingcart.addProduct(product2.id, product2.name, product2.price, product2.quantity);
    customerData.phoneNr = "ring ring banan phone"
    expect(() => shoppingcart.placeOrder(customerData)).toThrowError('Invalid phone number, please try again');
    customerData = customerDataOld
  });
  test('should fail if phone number contains anything but numbers', () => {
    const customerDataOld = {...customerData}
    const shoppingcart = new Shoppingcart();
    shoppingcart.addProduct(product1.id, product1.name, product1.price, product1.quantity);
    shoppingcart.addProduct(product2.id, product2.name, product2.price, product2.quantity);
    customerData.phoneNr = "ring ring banana phone"
    expect(() => shoppingcart.placeOrder(customerData)).toThrowError('Invalid phone number, please try again');
    customerData = customerDataOld
  });
  test('should fail if email contains anything but the allowed signs', () => {
    const customerDataOld = {...customerData}
    const shoppingcart = new Shoppingcart();
    shoppingcart.addProduct(product1.id, product1.name, product1.price, product1.quantity);
    shoppingcart.addProduct(product2.id, product2.name, product2.price, product2.quantity);
    customerData.email = "Diana'.H@email.com"
    expect(() => shoppingcart.placeOrder(customerData)).toThrowError('Email is invalid, please try again');
    customerData = customerDataOld
  });
  test('should fail if card holder name contains anything but letters', () => {
    const customerDataOld = {...customerData}
    const shoppingcart = new Shoppingcart();
    shoppingcart.addProduct(product1.id, product1.name, product1.price, product1.quantity);
    shoppingcart.addProduct(product2.id, product2.name, product2.price, product2.quantity);
    customerData.cardHolderName = "Diana2 Henriksson"
    expect(() => shoppingcart.placeOrder(customerData)).toThrowError('Invalid card details, please try again');
    customerData = customerDataOld
  });
  test('should fail if card number contains anything but numbers', () => {
    const customerDataOld = {...customerData}
    const shoppingcart = new Shoppingcart();
    shoppingcart.addProduct(product1.id, product1.name, product1.price, product1.quantity);
    shoppingcart.addProduct(product2.id, product2.name, product2.price, product2.quantity);
    customerData.cardNr = "O11O1OOOO11O1OO1"
    expect(() => shoppingcart.placeOrder(customerData)).toThrowError('Invalid card details, please try again');
    customerData = customerDataOld
  });
  test('should fail if card CVC contains anything but numbers', () => {
    const customerDataOld = {...customerData}
    const shoppingcart = new Shoppingcart();
    shoppingcart.addProduct(product1.id, product1.name, product1.price, product1.quantity);
    shoppingcart.addProduct(product2.id, product2.name, product2.price, product2.quantity);
    customerData.cardCvc = "00!"
    expect(() => shoppingcart.placeOrder(customerData)).toThrowError('Invalid card details, please try again');
    customerData = customerDataOld
  });
    test('should fail if card expiration contains anything but numbers', () => {
    const customerDataOld = {...customerData}
    const shoppingcart = new Shoppingcart();
    shoppingcart.addProduct(product1.id, product1.name, product1.price, product1.quantity);
    shoppingcart.addProduct(product2.id, product2.name, product2.price, product2.quantity);
    customerData.cardExpiration = "!2/27"
    expect(() => shoppingcart.placeOrder(customerData)).toThrowError('Invalid card details, please try again');
    customerData = customerDataOld
  });
  test('should fail if shoppingcart is empty', () => {
    const shoppingcart = new Shoppingcart();
    expect(() => shoppingcart.placeOrder(customerData)).toThrowError('Can not order with an empty cart! Why would you do this? Why. Really sit down and think about what you did.');
  });
})