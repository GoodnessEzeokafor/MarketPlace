import React, { Component } from 'react';

export default class BuyerForm extends Component {
    render() {
        return (
            <div>
                            <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="section__title text-center pb--50">
                  <h2 className="title__be--2">Be A <span className="color--theme">Buyer </span></h2>
                  <p>There are many variations of passages of Lorem Ipsum available, but the majority have suffered lebmid alteration in some ledmid form</p>
                </div>
              </div>
            </div>
          </div>
        <div className="container">
         <div className="row">
            <div className='col-md-2'></div>
            <div className="col-sm-12 col-md-7">
                <form>
            <div className="input-group" style={{marginBottom:"18px"}}>
                <input 
                    type="text" 
                    className="form-control" 
                    placeholder="Full Name" 
                    aria-describedby="basic-addon1"
                    />
                </div>

                <div class="input-group"  style={{marginBottom:"18px"}}>
                <input 
                    type="text" 
                    className="form-control" 
                    placeholder="Picture Url" 
                    aria-describedby="basic-addon2"
                    />
                </div>
                <div class="input-group"  style={{marginBottom:"18px"}}>
                <input 
                    type="email" 
                    className="form-control" 
                    placeholder="Email Addres" 
                    aria-describedby="basic-addon2"
                    />
                </div>
                <button type="submit" className="btn btn-primary btn-block">Create Account</button>
                </form>
            </div>
        </div>
          </div>

            </div>
        );
    }
}