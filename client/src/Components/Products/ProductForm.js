import React, { Component } from 'react';

export default class ProductForm extends Component {

    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    
      handleSubmit(event){
        try {
    
        this.setState({loading:true})
        this.props.MarketPlaceDapp.methods.createProduct(
            this.product_name.value,
            this.product_description.value,
            // this.product_price.value,
            window.web3.utils.toWei(this.product_price.value.toString(),'Ether'),
            this.upload_image.value,
        )
        .send({from:this.props.account})
        .once('receipt',(receipt) => {
            this.setState({loading:false})
            console.log(receipt)
        })
        this.product_name.value = ""
        this.product_description.value =""
        this.farm_name.value=""
        this.product_price.value = ""
        this.upload_image.value=""
        
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
    <h2 className="title__be--2">Add A <span className="color--theme">Product </span></h2>
    <p>There are many variations of passages of Lorem Ipsum available, but the majority have suffered lebmid alteration in some ledmid form</p>
    </div>
    </div>
    </div>
    </div>
    <div className="container">
    <div className="row">
    <div className='col-md-2'></div>
    <div className="col-sm-12 col-md-7">
    <form  onSubmit={this.handleSubmit}>
    <div className="input-group" style={{marginBottom:"18px"}}>
    <input 
        type="text" 
        className="form-control" 
        placeholder="Product Name" 
        aria-describedby="basic-addon1"
        ref = {(input) => {this.product_name = input}}
        />
    </div>

    <div class="input-group"  style={{marginBottom:"18px"}}>
    <input 
        type="text" 
        className="form-control" 
        placeholder="Price per package unit (e.g 0.001 ETH per basket)" 
        aria-describedby="basic-addon2"
        ref = {(input) => {this.product_price = input}}
        />
    </div>
    <div class="input-group"  style={{marginBottom:"18px"}}>
    <input 
        type="text" 
        className="form-control" 
        placeholder="Picture Url" 
        aria-describedby="basic-addon2"
        ref = {(input) => this.upload_image = input}
        />
    </div>
    <div class="input-group"  style={{marginBottom:"18px"}}>
    <textarea 
    ref = {(input) => this.product_description = input}
    class="form-control" name="" id="" rows="3" placeholder="Product Description"></textarea>

    </div>
    <button type="submit" className="btn btn-primary btn-block">Add Product</button>
    </form>
    </div>
    </div>
    </div>

    </div>

        );
    }
}