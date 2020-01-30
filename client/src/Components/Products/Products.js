import React, { Component } from 'react';
import CheckoutModal from "./Modal/CheckoutModal"

export default class Products extends Component {
  constructor(props){
    super(props)
    this.state = {
      show:false,
      getProduct:"",
      quantity:0,
      price:0,
    }
  }

  showModal = () => {
    this.setState({show : true})
  }

  hideModal = () => {
    this.setState({ show: false });
  }

  async getProduct(id) {
    const getProduct = await this.props.MarketPlaceDapp.methods
      .getProductDetail(id)
      .call();
    console.log("Writing To The Blockchain");
    console.log(getProduct);
    return getProduct;
  }
  
    render() {
        return (
            <div>
            <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="section__title text-center pb--50">
                  <h2 className="title__be--2"><span className="color--theme">Products </span></h2>
                </div>
              </div>
            </div>
          </div>
          <div className="container">
          <div className="row">
          {this.props.products.map((product, key) => {
            return(

              <div className="col-sm-6 col-md-4" key={product.id}>
                <CheckoutModal
                                show={this.state.show}
                                handleClose={this.hideModal}
                                getProduct={this.state.getProduct}
                                // ElectionDapp = {this.props.ElectionDapp}
                                // account={this.props.account} 
                                transport_companies={this.props.transport_companies}
                                quantity={this.state.quantity}
                                price={this.state.price}

                            />
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
                  ref = {(input) => {this.quantity = input}}  value="1"                 />
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
                      this.setState({quantity})
                      this.setState({price:product.product_price* quantity })
                      console.log("Quantity", quantity)
                      this.props.MarketPlaceDapp.methods.buyProduct(id).send({from: this.props.account,value:event.target.value * quantity })
                        .once('receipt', (receipt)=> {
                          // this.setState({ loading: false})
                        })
                      event.persist();
                    }}
                  >Buy Product</button> 
                  <button
                  id = {product.id}
                  className="btn btn-danger"
                  onClick = {async(event) => {
                    this.showModal()
                    const id = parseInt(event.target.id, 10);
                    const quantity = parseInt(this.quantity.value,10)
                    this.setState({quantity})
                    // this.setState({price:(product.product_price/1000000000000000000)* quantity })
                    this.setState({price:parseInt(product.product_price/1000000000000000000, 10) * quantity})
                    // console.log(id, typeof id);
                    // console.log(id)
                    const getProduct = await this.getProduct(id);
                // console.log("Content:",getcandidates)
                    this.setState({ getProduct });
                    event.persist();
                  }}
                  >Cart</button>
                  </p>
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
