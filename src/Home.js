import React, { useEffect, useState } from "react";

function Home() {
    const [data, setData]=useState([]);
    useEffect(()=>{
        async function fetchData() {
            let product =await fetch("https://shopify6.interplay.iterate.ai/queryCollection", {
                                method: "POST",
                                headers: {"Content-type": "application/json"},
                            });
            let result = await product.json();
            setData(result.data.collections.edges);
          }
          fetchData();
    },[])
    return (
        <div className="home-container">
            <div className="main-slider slider slick-initialized slick-slider">
                    <div  class="slider-item" style={{backgroundImage:"url('assets/images/banner.jpg')", backgroundPosition:"50%",backgroundRepeat:"no-repeat"}}>
                        <div class="container">
                        <div class="row">
                            <div class="col-lg-6 col-12 offset-lg-6 offset-md-6">
                            <div class="slider-caption">
                                <span class="lead">Trendy Shoes</span>
                                <h1 class="mt-2 mb-5"><span class="text-color">New </span>Collection</h1>
                                <a href="#" class="btn btn-main">Shop Now</a>
                            </div>
                            </div>
                        </div>
                        </div>
                    </div>
            </div>
            

            <section class="section products-main">
                <div class="container">
                    <div class="row justify-content-center">
                        <div class="col-lg-8">
                            <div class="title text-center">
                                <h2>Collections</h2>
                                <p>Everything you need is right here</p>
                            </div>
                        </div>
                    </div>
            
            
                <div class="row">

                {
                    data.map((item)=>
                    <div class="grid-flow-row grid gap-2 gap-y-6 md:gap-4 lg:gap-6 grid-cols-1 md:grid-cols-2  false false false" >
                        <div class="product">
                        <div class="product-wrap">
                            <a href="/product-single"><img src={item.node.image.url} alt="product-img" height="350px" width="350px" style={{"margin":"10px", "borderRadius":"7px", "objectFit":"cover","box-shadow": "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)" }} /></a>
                        </div>
            
                        <div class="product-info">
                            <h2 class="product-title h5 mb-0"><a href="#">{item.node.title}</a></h2>
                        </div>
                    </div>
                    </div>
                    )
                }
                </div>
                </div>
            </section>

            
            
        </div>
    )
}
export default Home;