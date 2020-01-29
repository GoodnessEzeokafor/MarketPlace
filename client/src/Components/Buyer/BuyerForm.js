import React, { Component } from 'react';

export default class BuyerForm extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
}


  handleSubmit(event){
    try {

    this.setState({loading:true})
    this.props.MarketPlaceDapp.methods.createBuyer(
        this.full_name.value,
        this.picture.value,
        this.email_address.value
    )
    .send({from:this.props.account})
    .once('receipt',(receipt) => {
        this.setState({loading:false})
        console.log(receipt)
    })
    this.full_name.value = ""
    this.picture.value =""
    this.email_address.value = ""
    } catch (error){
        console.log(error)
    }
    // this.setState({addModalShow:true})
    event.preventDefault();
    event.stopPropagation();
  }

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
                <form onSubmit={this.handleSubmit}>
            <div className="input-group" style={{marginBottom:"18px"}}>
                <input 
                    type="text" 
                    className="form-control" 
                    placeholder="Full Name" 
                    aria-describedby="basic-addon1"
                    ref = {(input) => {this.full_name = input}}
                    />
                </div>
                <div class="input-group"  style={{marginBottom:"18px"}}>
                <input 
                    type="text" 
                    className="form-control" 
                    placeholder="Picture Url" 
                    aria-describedby="basic-addon2"
                    ref = {(input)=> {this.picture = input}}
                    />
                </div>
                <div class="input-group"  style={{marginBottom:"18px"}}>
                <input 
                    type="email" 
                    className="form-control" 
                    placeholder="Email Addres" 
                    aria-describedby="basic-addon2"
                    ref = {(input) => {this.email_address = input}}
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