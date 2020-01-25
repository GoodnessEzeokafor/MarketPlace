import React, { Component } from 'react';
import { Route, Link, Switch, BrowserRouter as Router } from "react-router-dom";
import SellerForm from "./Components/Seller/SellerForm"
import BuyerForm from "./Components/Buyer/BuyerForm"
// import Products from "./Components/Seller/Products"
import Products from "./Components/Products/Products"
import  ProductForm from "./Components/Products/ProductForm"
import Web3 from 'web3';
import MarketPlace from "./abis/MarketPlace.json"


export default class App extends Component {
  async componentWillMount(){
    await this.loadWeb3() 
    await this.loadBlockchainData()
  }
  async loadWeb3(){
    window.addEventListener('load', async () => {
      // Modern dapp browsers...
      if (window.ethereum) {
          window.web3 = new Web3(window.ethereum)
          await window.ethereum.enable()
          const web3 = window.web3
          // // load accounts
          const accounts = await web3.eth.getAccounts() // returns all the account in our wallet 
          console.log(accounts)

          // console.log("Window Ethereum Enabled")
      }
      // Legacy dapp browsers...
      else if (window.web3) {
          window.web3 = new Web3(window.web3.currentProvider);
          
      }
      else {
          alert("Non-Ethereum browser detected. You should consider trying MetaMask!")
          console.log('Non-Ethereum browser detected. You should consider trying MetaMask!');
      }
  });
  }

  //load Blockchain Data
  async loadBlockchainData(){
    // console.log(ProductDapp)
    window.web3 = new Web3(window.ethereum)
    const web3 = window.web3
    // // load accounts
    const accounts = await web3.eth.getAccounts() // returns all the account in our wallet 
    this.setState({'account':accounts[0]})
    console.log(accounts)

    // // detects the network dynamically 
    const networkId = await web3.eth.net.getId()

    // // get network data
    const networkData = MarketPlace.networks[networkId]
    // console.log("Network Id:",networkId)
    // console.log("Network Data:", networkData)

    if(networkData){
      const MarketPlaceDapp = new web3.eth.Contract(MarketPlace.abi, networkData.address) // loads the smart contract
      // console.log(MarketPlaceDapp)
      this.setState({MarketPlaceDapp}) // updates the state
      // // console.log("Contract:", this.state.productDapp)
      const productCount = await MarketPlaceDapp.methods.productCount().call() 
      const farmerCount = await MarketPlaceDapp.methods.farmerCount().call()
      const buyerCount = await MarketPlaceDapp.methods.buyerCount().call()
      
      this.setState({productCount})
      this.setState({farmerCount})
      this.setState({buyerCount})

      // const productDappName = await productDapp.methods.dapp_name().call()
      // this.setState({productDappName})

      // console.log("Product Count:", this.state.productCount)


      // Load Seller
      // for(var j=1; j <= sellerCount; j++){
      //   const seller = await productDapp.methods.sellers(j).call()
      //   this.setState({
      //     sellers:[...this.state.sellers, seller]
      //   })
      // }

      // // Load Product
      // for(var i=1; i <= productCount; i++){
      //   const product = await productDapp.methods.products(i).call()
      //   this.setState({
      //     products:[...this.state.products, product]
      //   })
      // }


    //   this.setState({loading:false})

    //   //logging out
    //   console.log(marketplace)
    //   console.log("Network Id:", networkId)
    //   console.log("Contract Address:", networkData.address)
    //   console.log("Available Products on the blockchain: ", this.state.products)
    }
    else {
      window.alert("Marketplace contract is not deployed to the network")
    }
  }
  constructor(props){
    super(props)
    this.state={
      account:'',
      message:'',
      products:[],
      buyerCount:0,
      productCount:0,
      sellerCount:0,
      // sellers:[],
      loading:true,
      MarketPlaceDapp:null
    }
  }

  render() {
    return (
      // <!-- Main wrapper -->
      <Router>
      <div className="wrapper" id="wrapper">
        {/* <!-- Header --> */}
        <header id="wn__header" className="header__area header__absolute sticky__header">
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-6 col-sm-6 col-6 col-lg-2">
                <div className="logo">
                  <a href="index.html">
                    <img src="/images/logo/logo.png" alt="logo images" /> 
                  </a>
                </div>
              </div>
              <div className="col-lg-8 d-none d-lg-block">
                <nav className="mainmenu__nav">
                  <ul className="meninmenu d-flex justify-content-start">
                    <li className="drop with--one--item"><Link to="/">Home</Link></li>                    
                    <li><Link to="/products">Products</Link></li> 
                    <li><Link to="/seller">Be a seller</Link></li>
                    <li><Link to="/buyer">Be a buyer</Link></li>
                    <li><Link to="/product">Add A Product</Link></li>
                  </ul>
                </nav>
              </div>
            </div>
          </div>		
        </header>
      
        <section className="best-seel-area pt--80 pb--60">
        <Switch>
            <Route path="/products">
              <Products 
              products={this.state.products}
              />
            </Route>
            <Route path="/seller">
              <SellerForm 
              MarketPlaceDapp={this.state.MarketPlaceDapp}
              account={this.state.account}
              />
            </Route>
            <Route path="/buyer">
              <BuyerForm 
                MarketPlaceDapp={this.state.MarketPlaceDapp}
                account={this.state.account}
              />
            </Route>
           
            <Route path="/product">
              <ProductForm 
                MarketPlaceDapp={this.state.MarketPlaceDapp}
                account={this.state.account}
              />
            </Route>
            <Route path="/">
            </Route>
            </Switch>

        </section>
        {/* <!-- Best Sale Area Area -->
        <!-- Footer Area --> */}
        <footer id="wn__footer" className="footer__area bg__cat--8 brown--color">
          <div className="footer-static-top">
            <div className="container">
              <div className="row">
                <div className="col-lg-12">
                  <div className="footer__widget footer__menu">
                    <div className="ft__logo">
                      <a href="index.html">
                        <img src="/images/logo/3.png" alt="logo" />
                      </a>
                      <p>There are many variations of passages of Lorem Ipsum available, but the majority have suffered duskam alteration variations of passages</p>
                    </div>
                    <div className="footer__content">
                      <ul className="social__net social__net--2 d-flex justify-content-center">
                        <li><a href="#"><i className="bi bi-facebook"></i></a></li>
                        <li><a href="#"><i className="bi bi-google"></i></a></li>
                        <li><a href="#"><i className="bi bi-twitter"></i></a></li>
                        <li><a href="#"><i className="bi bi-linkedin"></i></a></li>
                        <li><a href="#"><i className="bi bi-youtube"></i></a></li>
                      </ul>
                      <ul className="mainmenu d-flex justify-content-center">
                        <li><a href="index.html">Trending</a></li>
                        <li><a href="index.html">Best Seller</a></li>
                        <li><a href="index.html">All Product</a></li>
                        <li><a href="index.html">Wishlist</a></li>
                        <li><a href="index.html">Blog</a></li>
                        <li><a href="index.html">Contact</a></li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="copyright__wrapper">
            <div className="container">
              <div className="row">
                <div className="col-lg-6 col-md-6 col-sm-12">
                  <div className="copyright">
                    <div className="copy__right__inner text-left">
                      <p>Copyright <i className="fa fa-copyright"></i> <a href="https://freethemescloud.com/">Free themes Cloud.</a> All Rights Reserved</p>
                    </div>
                  </div>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-12">
                  <div className="payment text-right">
                    <img src="/images/icons/payment.png" alt="" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </footer>
        {/* <!-- //Footer Area -->
        <!-- QUICKVIEW PRODUCT --> */}
        <div id="quickview-wrapper">
            {/* <!-- Modal --> */}
            <div className="modal fade" id="productmodal" tabindex="-1" role="dialog">
                <div className="modal-dialog modal__container" role="document">
                    <div className="modal-content">
                        <div className="modal-header modal__header">
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                        </div>
                        <div className="modal-body">
                            <div className="modal-product">
                                {/* <!-- Start product images --> */}
                                <div className="product-images">
                                    <div className="main-image images">
                                        <img alt="big images" src="/images/product/big-img/1.jpg" />
                                    </div>
                                </div>
                                {/* <!-- end product images --> */}
                                <div className="product-info">
                                    <h1>Simple Fabric Bags</h1>
                                    <div className="rating__and__review">
                                        <ul className="rating">
                                            <li><span className="ti-star"></span></li>
                                            <li><span className="ti-star"></span></li>
                                            <li><span className="ti-star"></span></li>
                                            <li><span className="ti-star"></span></li>
                                            <li><span className="ti-star"></span></li>
                                        </ul>
                                        <div className="review">
                                            <a href="#">4 customer reviews</a>
                                        </div>
                                    </div>
                                    <div className="price-box-3">
                                        <div className="s-price-box">
                                            <span className="new-price">$17.20</span>
                                            <span className="old-price">$45.00</span>
                                        </div>
                                    </div>
                                    <div className="quick-desc">
                                        Designed for simplicity and made from high quality materials. Its sleek geometry and material combinations creates a modern look.
                                    </div>
                                    <div className="select__color">
                                        <h2>Select color</h2>
                                        <ul className="color__list">
                                            <li className="red"><a title="Red" href="#">Red</a></li>
                                            <li className="gold"><a title="Gold" href="#">Gold</a></li>
                                            <li className="orange"><a title="Orange" href="#">Orange</a></li>
                                            <li className="orange"><a title="Orange" href="#">Orange</a></li>
                                        </ul>
                                    </div>
                                    <div className="select__size">
                                        <h2>Select size</h2>
                                        <ul className="color__list">
                                            <li className="l__size"><a title="L" href="#">L</a></li>
                                            <li className="m__size"><a title="M" href="#">M</a></li>
                                            <li className="s__size"><a title="S" href="#">S</a></li>
                                            <li className="xl__size"><a title="XL" href="#">XL</a></li>
                                            <li className="xxl__size"><a title="XXL" href="#">XXL</a></li>
                                        </ul>
                                    </div>
                                    <div className="social-sharing">
                                        <div className="widget widget_socialsharing_widget">
                                            <h3 className="widget-title-modal">Share this product</h3>
                                            <ul className="social__net social__net--2 d-flex justify-content-start">
                                                <li className="facebook"><a href="#" className="rss social-icon"><i className="zmdi zmdi-rss"></i></a></li>
                                                <li className="linkedin"><a href="#" className="linkedin social-icon"><i className="zmdi zmdi-linkedin"></i></a></li>
                                                <li className="pinterest"><a href="#" className="pinterest social-icon"><i className="zmdi zmdi-pinterest"></i></a></li>
                                                <li className="tumblr"><a href="#" className="tumblr social-icon"><i className="zmdi zmdi-tumblr"></i></a></li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="addtocart-btn">
                                        <a href="#">Add to cart</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        {/* <!-- END QUICKVIEW PRODUCT --> */}
      </div>
    </Router>
    );
  }
}