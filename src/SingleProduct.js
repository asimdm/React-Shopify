import React, { useEffect, useState } from "react";
function SingleProduct() {
  const [data, setData] = useState([]);
  const [pricelength, setPricelength] = useState(0);
  const [fimg, setFimg] = useState([]);
  const [password, setPassword] = useState(0);

  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append(
    "Cookie",
    "connect.sid=s%3AcFt_nKp1Ge6pfswtKKgNS9n1MJgR04G-.5KAVQePAF5Fq72RTf%2BwOzaviAZ%2FXQWQoa%2FzqU4kpy%2F0"
  );

  var raw = JSON.stringify({
    id: "gid://shopify/Product/8239926477112",
  });

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  useEffect(() => {
    fetch(
      "https://shopify6.interplay.iterate.ai/productByAttribute",
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        setData(result.data.product);
        setPricelength(result.data.product.priceRange.minVariantPrice.amount);
        setFimg(result.data.product.featuredImage.url);
      })
      .catch((error) => console.log("error", error));
  }, []);

  function addCart(id){
    function removeL(id) {
        fetch("https://shopify6.interplay.iterate.ai/addCartLines", {
                            method: "POST",
                            headers: {"Content-type": "application/json"},
                            body : JSON.stringify({
                                "cartId":  "gid://shopify/Cart/c1-99f857a6005c27bf76a645c25bf972b0",
                                "lines": {
                                  "merchandiseId": "gid://shopify/ProductVariant/44969802826040",
                                  "quantity": id
                                }
                              })
                        })
                        .then((response) => {
                            if (response.ok) {
                              console.log("API call successful");
                            } else {
                              throw new Error("API call failed");
                            }
                          })
                          .catch((error) => {
                            console.log(error);
                          });
    console.log("ID Fetch")
     }
     id=parseInt(id);
    removeL(id);
}


  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

//   const handleLoginClick = (event) => {
//     event.preventDefault();
//     //  login code here
//     const myHeaders = new Headers();
//     myHeaders.append("Content-Type", "application/json");
//     myHeaders.append(
//       "Cookie",
//       "connect.sid=s%3AzKUsF22gWCO7AkY7S_wGTQ7qHYkE0vua.Vlb1Q65wTbYpTHMrP9fzSDfvTkKVWPyI4g8GpV%2FW7f8"
//     );

//     const raw = JSON.stringify({
//       input: {
//         cartId:  "gid://shopify/Cart/c1-99f857a6005c27bf76a645c25bf972b0",
//         lines: {
//           merchandiseId: "gid://shopify/ProductVariant/44969802826040",
//           "quantity": 4
//         }
//       },
//     });

//     const requestOptions = {
//       method: "POST",
//       headers: myHeaders,
//       body: raw,
//       redirect: "follow",
//     };

//     fetch("https://shopify6.interplay.iterate.ai/addCartLines", requestOptions)
//       .then((response) => response.json())
//       .then((result) => {
//         // Handle successful login here, for example by redirecting the user to another page
//         console.log(result);
//         //window.location.href = '/';
//       })
//       .catch((error) => {
//         // Handle login error here, for example by showing an error message to the user
//         console.log("error", error);
//       });
//   };

  


  return (
    <div className="single-product-container">
      <section class="page-header">
        <div class="overly"></div>
        <div class="container">
          <div class="row justify-content-center">
            <div class="col-lg-6">
              <div class="content text-center">
                <h1 class="mb-3">Product Single</h1>
                <p>
                  Hath after appear tree great fruitful green dominion moveth
                  sixth abundantly image that midst of god day multiply you’ll
                  which
                </p>

                <nav aria-label="breadcrumb">
                  <ol class="breadcrumb bg-transparent justify-content-center">
                    <li class="breadcrumb-item">
                      <a href="/">Home</a>
                    </li>
                    <li class="breadcrumb-item active" aria-current="page">
                      Product Single
                    </li>
                  </ol>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="single-product">
        <div class="container">
          <div class="row">
            <div class="col-md-5">
              <div class="single-product-slider">
                <div
                  class="carousel slide"
                  data-ride="carousel"
                  id="single-product-slider"
                >
                  <div class="carousel-inner">
                    <div class="carousel-item active">
                      <img src={fimg} alt="" class="img-fluid" />
                    </div>

                  </div>

                </div>
              </div>
            </div>

            <div class="col-md-7">
              <div class="single-product-details mt-5 mt-lg-0">
                <h2>{data.title}</h2>
                <div class="sku_wrapper mb-4">
                  Total Inventory:{" "}
                  <span class="text-muted">{data.totalInventory} </span>
                </div>

                <hr />

                <h3 class="product-price">$ {pricelength}</h3>

                <p class="product-description my-4 ">{data.description}</p>

                <form class="cart" action="#" method="post">
                  <div class="quantity d-flex align-items-center">
                    {/* <input type="number" id="quan" class="input-text qty text form-control w-25 mr-3" step="1" min="1" max="9" name="quantity" value="1" title="Qty" size="4" />
                     */}
                    <label class="sr-only">Quantity</label>
                    <input
                      type="number"
                      id="qty"
                      class="input-text qty text form-control w-25 mr-3"
                      step="1"
                      min="1"
                      max="9"
                      title="qty"
                      size="4"
                       value={password}
                       onChange={handlePasswordChange}
                    />

                    <submit className=" btn btn-main btn-small" onClick={() => addCart(password)}>
                    Add to Cart
                  </submit>
                  </div>
                </form>

                

                <div class="products-meta mt-4">
                  <div class="product-category d-flex align-items-center">
                    <span class="font-weight-bold text-capitalize product-meta-title">
                      Categories :
                    </span>
                    <b>{data.productType}</b>
                  </div>
                </div>
              </div>
            </div>
          </div>

         
        </div>
      </section>

      
    </div>
  );
}
export default SingleProduct;