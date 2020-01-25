import React, { Component } from 'react';

export default class Products extends Component {
    render() {
        return (
            <div>
            <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="section__title text-center pb--50">
                  <h2 className="title__be--2">Best <span className="color--theme">Seller </span></h2>
                  <p>There are many variations of passages of Lorem Ipsum available, but the majority have suffered lebmid alteration in some ledmid form</p>
                </div>
              </div>
            </div>
          </div>
          <div className="container">
          <div className="row">
          <div className="col-sm-6 col-md-4">
            <div className="thumbnail">
              <img src="/images/books/1.jpg" alt="..." />
              <div className="caption">
                <h3>Product Name</h3>
                <p>
                  
                </p>
                <p><a href="#" className="btn btn-primary" role="button">Button</a> 
                <a href="#" className="btn btn-default" role="button">Button</a></p>
              </div>
            </div>
          </div>
          <div className="col-sm-12 col-md-4">
            <div className="thumbnail">
              <img src="/images/books/1.jpg" alt="..." />
              <div className="caption">
                <h3>Product Name</h3>
                <p>hello</p>
                <p><a href="#" className="btn btn-primary" role="button">Button</a> <a href="#" className="btn btn-default" role="button">Button</a></p>
              </div>
            </div>
          </div>
          <div className="col-sm-6 col-md-4">
            <div className="thumbnail">
              <img src="/images/books/1.jpg" alt="..." />
              <div className="caption">
                <h3>Product Name</h3>
                <p>hello</p>
                <p><a href="#" className="btn btn-primary" role="button">Button</a> <a href="#" className="btn btn-default" role="button">Button</a></p>
              </div>
            </div>
          </div>
        </div>
          </div>

            </div>
        );
    }
}