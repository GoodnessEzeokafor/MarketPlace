import React, { Component } from 'react';
import "./Modal.css"

export default class CheckoutModal extends Component {
    render() {
        const showHideClassName = this.props.show ? "modal display-block" : "modal display-none";

        return (
            <div
            className={showHideClassName} 
              // class="modal fade" 
              tabIndex="-1" role="dialog">
                  <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
    <h5 className="modal-title">CHECKOUT For {this.props.getProduct["1"]}</h5>
                  <button onClick={this.props.handleClose} type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                </div>  
                <div className="modal-body">
                <form >
                            <div className="form-row">
                                {/* Election Name */}
                                <div className="col-md-12 mb-3">
                                    <label htmlFor="validationServer01">Product Name: </label>
                                    <b>{this.props.getProduct["1"]}</b>
                                </div>
                                <div className="col-md-12 mb-3">
                                    <label htmlFor="validationServer01">Product Description: </label>
                                    <b>{this.props.getProduct["2"]}</b>
                                </div>
                                <div className="col-md-12 mb-3">
                                    <label htmlFor="validationServer01">Product Unit Price: </label>
                                    <b>{this.props.getProduct["3"]/1000000000000000000}</b>
                                </div>

                                <div className="col-md-12 mb-3">
                                    <label htmlFor="validationServer01">Sellers's Address: </label>
                                    <b>{this.props.getProduct["4"]}</b>
                                </div>

                                <div className="col-md-12 mb-3">
                                    <label htmlFor="validationServer01">Price To Pay: </label>
                                    <b>price X quantity</b> <br />
        <b>{this.props.getProduct["3"]/1000000000000000000} X {this.props.quantity} per Basket</b> <br />
                                    <b>= {this.props.price} ETH</b>
                                </div>
                                
                                <div className="col-md-12 mb-3">
                                           <label htmlFor="">Select Transport Company</label>
                                           <select
                                                ref={(input) => this.post = input} 
                                                className="form-control" name="" id="">
                                            {this.props.transport_companies.map((transport, key) => {
                                                return(
                                                <option key={key} id="{transport.id}" value="PRESIDENT">
                                            {transport.transport_name} FOR {transport.price/1000000000000000000} ETH</option>
                                                );
                                            })}
                                           </select>
                                    <div className="valid-feedback">
                                        Looks good!
                                    </div>
                                </div> 
                            </div>
                            <button 
                            id = {this.props.getProduct["0"]}
                            className="btn btn-primary btn-block" type="button"
                            onClick = {async(event) => {
                                const id = parseInt(event.target.id, 10);
                                const quantity = parseInt(this.props.quantity,10)
                                this.props.MarketPlaceDapp.methods.buyProduct(id).send({from: this.props.account,value:this.props.price })

                                event.persist();
                            }}
                            
                            >Buy Product</button>
                        </form>
                </div>
                <div className="modal-footer">             
                  <button 
                    onClick={this.props.handleClose} 
                    data-dismiss="modal" 
                    type="button" 
                    className="btn btn-primary">Close</button>
                </div>
              </div>
            </div> 
            </div>
        );
    }
}