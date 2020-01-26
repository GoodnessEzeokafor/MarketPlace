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
                  <p><a href="#" className="btn btn-primary" role="button">Buy Button</a> </p>
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