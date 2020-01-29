

import React, { Component } from 'react';

export default class Transports extends Component {
    render() {
        return (
            <div>
            <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="section__title text-center pb--50">
                  <h2 className="title__be--2">Best <span className="color--theme">Transports Companies </span></h2>
                  <p>There are many variations of passages of Lorem Ipsum available, but the majority have suffered lebmid alteration in some ledmid form</p>
                </div>
              </div>
            </div>
          </div>
          <div className="container">
          <div className="row">
            {this.props.transport_companies.map((transport, key) => {
              return(

                <div className="col-sm-6 col-md-4" key={transport.id}>
                <div className="thumbnail">
                  <img src={`${transport.picture}`} alt="..." />
                  <div className="caption">
              <h3>{transport.transport_name}</h3>
            <small>{transport.transport_address}</small><br />
            <small>{transport.price}</small> <br />
            <small><b>{transport.transport_wallet_address}</b></small>
            
            
                    <p>
                      {transport.transport_description}
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