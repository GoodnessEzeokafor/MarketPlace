import React, { Component } from 'react';

export default class Sellers extends Component {


    
    render() {
        return (
            <div>
            <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="section__title text-center pb--50">
                  <h2 className="title__be--2">Best <span className="color--theme">Seller </span></h2>
                </div>
              </div>
            </div>
          </div>
          <div className="container">
          <div className="row">
            {this.props.farmers.map((farmer, key) => {
              return(

                <div className="col-sm-6 col-md-4" key={farmer.id}>
                <div className="thumbnail">
                  <img src={`${farmer.picture}`} alt="..." />
                  <div className="caption">
              <h3>{farmer.full_name}</h3>
            <small>{farmer.farm_name}</small><br />
            <small>{farmer.email_adddress}</small> <br />
            <small><b>{farmer.farmer_wallet_address}</b></small>
            
            
                    <p>
                      {farmer.farm_description}
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