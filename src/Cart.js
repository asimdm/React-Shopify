import React, { useEffect, useState } from "react";

function Cart() {

    function decrease(variantId,quantity,cartLineId){
        function removeLine(variantId,cartLineID,quantity) {
            fetch("https://shopify6.interplay.iterate.ai/removeCartLines", {
                                method: "POST",
                                headers: {"Content-type": "application/json"},
                                body : JSON.stringify({
                                    cartId: "gid://shopify/Cart/c1-99f857a6005c27bf76a645c25bf972b0",
                                    lineIds: [
                                        cartLineID
                                    ]
                                })
                            })
                            .then((response) => {
                                if (response.ok) {
                                  console.log("API call successful");
                                  fetch("https://shopify6.interplay.iterate.ai/addCartLines", {
                                method: "POST",
                                headers: {"Content-type": "application/json"},
                                body : JSON.stringify({
                                    cartId: "gid://shopify/Cart/c1-99f857a6005c27bf76a645c25bf972b0",
                                    lines: {
                                        merchandiseId: variantId,
                                        quantity: quantity - 1
                                      } 
                                })
                            })
                            .then((response) => {
                                if (response.ok) {
                                  console.log("API call successful");
                                  window.location.reload();
                                } else {
                                  throw new Error("API call failed");
                                }
                              })
                              .catch((error) => {
                                console.log(error);
                              });
                                } else {
                                  throw new Error("API call failed");
                                }
                              })
                              .catch((error) => {
                                console.log(error);
                              });
        }
        removeLine(variantId,cartLineId,quantity);
    }

    function addQauntity(variantId){
        function reduceQuantity(variantId) {
            fetch("https://shopify6.interplay.iterate.ai/addCartLines", {
                                method: "POST",
                                headers: {"Content-type": "application/json"},
                                body : JSON.stringify({
                                    cartId: "gid://shopify/Cart/c1-99f857a6005c27bf76a645c25bf972b0",
                                    lines: {
                                        merchandiseId: variantId,
                                        quantity: 1
                                      } 
                                })
                            })
                            .then((response) => {
                                if (response.ok) {
                                  console.log("API call successful");
                                  window.location.reload();
                                } else {
                                  throw new Error("API call failed");
                                }
                              })
                              .catch((error) => {
                                console.log(error);
                              });
        }
        reduceQuantity(variantId);
    }

    function RemoveCartLines(id){
        function removeL(id) {
            fetch("https://shopify6.interplay.iterate.ai/removeCartLines", {
                                method: "POST",
                                headers: {"Content-type": "application/json"},
                                body : JSON.stringify({
                                    cartId: "gid://shopify/Cart//* c1-99f857a6005c27bf76a645c25bf972b0 */",
                                    lineIds: [
                                        id
                                    ] 
                                })
                            })
                            .then((response) => {
                                if (response.ok) {
                                  console.log("API call successful");
                                  window.location.reload();
                                } else {
                                  throw new Error("API call failed");
                                }
                              })
                              .catch((error) => {
                                console.log(error);
                              });
        }
        removeL(id);
    }
    
    const [data, setData]=useState([]);
    const [subtotal, setSubtotal]=useState([]);
    const [total, settotal]=useState([]);
    useEffect(()=>{
        async function fetchData() {
            let product =await fetch("https://shopify6.interplay.iterate.ai/cartById", {
                                method: "POST",
                                headers: {"Content-type": "application/json"},
                                body : JSON.stringify({
                                    id : "gid://shopify/Cart//* c1-99f857a6005c27bf76a645c25bf972b0 */" 
                                })
                            });
            let result = await product.json();
            setData(result.data.cart.lines.edges);
            setSubtotal(result.data.cart.cost.subtotalAmount);
            settotal(result.data.cart.cost.totalAmount);
          }
          fetchData();
    },[])
    return (
        <div className="checkout-container">
            <section class="page-header">
            <div class="overly"></div> 	
            <div class="container">
            <div class="row justify-content-center">
                <div class="col-lg-6">
                <div class="content text-center">
                    <h1 class="mb-3">Cart</h1>
                    Hath after appear tree great fruitful green dominion moveth sixth abundantly image that midst of god day multiply you’ll which
        
                <nav aria-label="breadcrumb">
                    <ol class="breadcrumb bg-transparent justify-content-center">
                    <li class="breadcrumb-item"><a href="/">Home</a></li>
                    <li class="breadcrumb-item active" aria-current="page">Cart</li>
                    </ol>
                </nav>
                </div>
                </div>
            </div>
            </div>
        </section>
        
        
        
            <section class="cart shopping page-wrapper">
            <div class="container">
                <div class="row justify-content-center">
                <div class="col-lg-12">
                    <div class="product-list">
                        <form class="cart-form">
                            <table class="table shop_table shop_table_responsive cart" cellspacing="0">
                                <thead>
                                <tr>
                                    <th class="product-thumbnail"> </th>
                                    <th class="product-name">Product</th>
                                    <th class="product-price">Price</th>
                                    <th class="product-quantity">Quantity</th>
                                    <th class="product-subtotal">Total</th>
                                    <th class="product-remove"> </th>
                                </tr>
                                </thead>
                        {
                            data.map((item)=>
                                <tbody>
                                <tr class="cart_item">
                                    <td class="product-thumbnail" data-title="Thumbnail">
                                        <a href="/product-single"><img src={item.node.merchandise.image.url} class="attachment-woocommerce_thumbnail size-woocommerce_thumbnail" alt="" /></a>
                                    </td>
        
                                    <td class="product-name" data-title="Product">
                                        <a href="#">{item.node.merchandise.product.title}</a>
                                    </td>
        
                                    <td class="product-price" data-title="Price">
                                        <span class="amount"><span class="currencySymbol"><pre wp-pre-tag-3=""></pre>
        </span>${item.node.merchandise.price.amount}</span>
                                    </td>
                                    <td class="product-quantity" data-title="Quantity">
                                    <a href="#" onClick={()=>decrease(item.node.merchandise.id,item.node.quantity,item.node.id)}>-</a>
                                        <label style={{"marginLeft":"10px", "marginRight":"10px"}}>{item.node.quantity}</label>
                                        {/* <div class="quantity">
                                            <label class="sr-only" >Quantity</label>
                                            <input type="number" id="qty" class="input-text qty text" step="1" value={item.node.quantity} title="Qty" size="4"  />
                                        </div> */}
                                        <a href="#" onClick={()=>addQauntity(item.node.merchandise.id)}>+</a>
                                    </td>
                                    <td class="product-subtotal" data-title="Total">
                                        <span class="amount">
                                            <span class="currencySymbol">
        <pre wp-pre-tag-3=""></pre>
                                            </span>${parseFloat(item.node.quantity*item.node.merchandise.price.amount)}</span>
                                    </td>
                                    <td class="product-remove" data-title="Remove">
                                        <a href="#" className="remove" aria-label="Remove this item" data-product_id="30" data-product_sku="" onClick={() => RemoveCartLines(item.node.id)}>×</a>
                                    </td>
                                </tr>
                                </tbody>
                                )
                        }
                                {/* <tr class="cart_item">
                                    <td class="product-thumbnail" data-title="Thumbnail">
                                        <a href="/product-single"><img src="assets/images/cart-2.jpg" class="attachment-woocommerce_thumbnail size-woocommerce_thumbnail" alt="" /></a>
                                    </td>
                                    <td class="product-name" data-title="Product">
                                        <a href="#">Sunglasses</a>
                                    </td>
                                    <td class="product-price" data-title="Price">
                                        <span class="amount"><span class="currencySymbol">
        <pre wp-pre-tag-3=""></pre>
                                        </span>90.00</span>
                                    </td>
                                    <td class="product-quantity" data-title="Quantity">
                                        <div class="quantity">
                                            <label class="sr-only" >Quantity</label>
                                            <input type="number" id="quantity_5cc58182489a8" class="input-text qty text" step="1" min="0" max="9" name="#" title="Qty" size="4"  />
                                        </div>
                                    </td>
                                    <td class="product-subtotal" data-title="Total">
                                        <span class="amount">
                                            <span class="currencySymbol">
        <pre wp-pre-tag-3=""></pre>
                                            </span>90.00</span>
                                    </td>
                                    <td class="product-remove" data-title="Remove">
                                        <a href="#" class="remove" aria-label="Remove this item" data-product_id="30" data-product_sku="">×</a>
                                    </td>
                                </tr> */}
                                {/* <tr>
                                    <td colspan="6" class="actions">
                                        <div class="coupon">
                                            <input type="text" name="coupon_code" class="input-text form-control" id="coupon_code" value="" placeholder="Coupon code" /> 
                                            <button type="button" class="btn btn-black btn-small" name="apply_coupon" value="Apply coupon">Apply coupon</button>
                                            <span class="float-right mt-3 mt-lg-0">
                                            <button type="button" class="btn btn-dark btn-small" name="update_cart" value="Update cart" disabled="">Update cart</button>
                                            </span>
                                        </div>
                                        <input type="hidden" id="woocommerce-cart-nonce" name="woocommerce-cart-nonce" value="27da9ce3e8" />
                                        <input type="hidden" name="_wp_http_referer" value="/cart/" />
                                        </td>
                                </tr> */}
                                
                            </table>
                        </form>
                    </div>
                </div>
                </div>
                <div class="row justify-content-end">
                    <div class="col-lg-4">
                    <div class="cart-info card p-4 mt-4">
                        <h4 class="mb-4">Cart totals</h4>
                        <ul class="list-unstyled mb-4">
                            <li class="d-flex justify-content-between pb-2 mb-3">
                            <h5>Subtotal</h5>
                            <span>${subtotal.amount}</span>
                            </li>
                            <li class="d-flex justify-content-between pb-2 mb-3">
                            <h5>Shipping</h5>
                            <span>Free</span>
                            </li>
                            <li class="d-flex justify-content-between pb-2">
                            <h5>Total</h5>
                            <span>${total.amount}</span>
                            </li>
                        </ul>
                        <a href="#" class="btn btn-main btn-small">Proceed to checkout</a>
                    </div>
                    </div>
                </div>
                </div>
            </section>
        </div>
    )
}

export default Cart