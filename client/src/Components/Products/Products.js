import React, { Component } from 'react';

export default class Products extends Component {
    render() {
        return (
            <div>
            <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="section__title text-center pb--50">
                  <h2 className="title__be--2"><span className="color--theme">Products </span></h2>
                  <p>There are many variations of passages of Lorem Ipsum available, but the majority have suffered lebmid alteration in some ledmid form</p>
                </div>
              </div>
            </div>
          </div>
          <div className="container">
          <div className="row">
          {this.props.products.map((product, key) => {
            return(

              <div className="col-sm-6 col-md-4" key={product.id}>
              <div className="thumbnail">
                <img src={`${product.upload_image}`} alt="..." />
                <div className="caption">
            <h3>{product.product_name}</h3>
                  <p>
                      {product.product_description}
                  </p>
            <p className="mb-2"><b>{product.product_price/1000000000000000000}ETH</b></p>
            <p>
                <input 
                  type="text" 
                  className="mb-2"   
                  placeholder="QUANTITY TO BUY" 
                  ref = {(input) => {this.quantity = input}}                  />
                  <b>Quantity you want to buy</b>
            </p> 
            

                  <p><button 
                      className="btn btn-primary" 
                      // role="button"
                      id={product.id}
                      value={product.product_price}
                    onClick = {(event) => {
                      const id = event.target.id;
                      const quantity = parseInt(this.quantity.value,10)
                      console.log("Quantity", quantity)
                      this.props.MarketPlaceDapp.methods.buyProduct(id).send({from: this.props.account,value:event.target.value * quantity })
                        .once('receipt', (receipt)=> {
                          // this.setState({ loading: false})
                        })
                      event.persist();
                    }}
                  >Buy Product</button> </p>
                </div>
              </div>
            </div>
            )
          })}
          
        </div>
          </div>

            </div>
        );
    }
}
