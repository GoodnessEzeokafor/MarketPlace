import React, { Component } from 'react';
import { Route, Link, Switch, BrowserRouter as Router } from "react-router-dom";
import SellerForm from "./Components/Seller/SellerForm"
import BuyerForm from "./Components/Buyer/BuyerForm"
// import Products from "./Components/Seller/Products"
import Products from "./Components/Products/Products"
import Sellers from "./Components/Seller/Sellers"
import  ProductForm from "./Components/Products/ProductForm"
import TransportForm from "./Components/TransportCompany/TransportForm"
import Transports from "./Components/TransportCompany/Transports"
import Web3 from 'web3';
import MarketPlace from "./abis/MarketPlace.json"
import NewLogo from "./NewLogo.png"


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
      const transportCompanyCount = await MarketPlaceDapp.methods.transportCompanyCount().call()
      this.setState({productCount})
      this.setState({farmerCount})
      this.setState({buyerCount})
      this.setState({transportCompanyCount})

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
      for(var i=1; i <= productCount; i++){
        const product = await MarketPlaceDapp.methods.products(i).call()
        this.setState({
          products:[...this.state.products, product]
        })
      }

      // LOAD FARMERS 
      for(var j=1; j <= farmerCount; j++){
        const farmer = await MarketPlaceDapp.methods.farmers(j).call()
        this.setState({
          farmers:[...this.state.farmers, farmer]
        })
      }

      // Load Drivers
      for(var x=1; x <= transportCompanyCount; x++){
        const transport_company = await MarketPlaceDapp.methods.transport_companies(x).call()
        this.setState({
          transport_companies:[...this.state.transport_companies, transport_company]
        })
      }

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
      farmers:[], 
      transport_companies:[],
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
                  <a href="/">
                    <img src="/images/NewLogo.png" alt="logo images" width="100" height="50"/> 
                    {/* CROPBLOCK */}
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
                    {/* <li><Link to="/buyer">Be a buyer</Link></li>
                     */}
                    {/* <li><Link to="/transport">Be a driver</Link></li> */}
                    <li><Link to="/sellers">Sellers</Link></li>
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
              MarketPlaceDapp={this.state.MarketPlaceDapp}
              account={this.state.account}
              transport_companies={this.state.transport_companies}

              />
            </Route>
            <Route path="/seller">
              <SellerForm 
              MarketPlaceDapp={this.state.MarketPlaceDapp}
              account={this.state.account}
              />
            </Route>
            <Route path="/sellers">
              <Sellers 
              MarketPlaceDapp={this.state.MarketPlaceDapp}
              account={this.state.account}
              farmers = {this.state.farmers}

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
            <Route path="/transport">
              <TransportForm 
                MarketPlaceDapp={this.state.MarketPlaceDapp}
                account={this.state.account}
              />
            </Route>
             <Route path="/drivers">
              <Transports
                MarketPlaceDapp={this.state.MarketPlaceDapp}
                account={this.state.account}
                transport_companies={this.state.transport_companies}
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
                      {/* <img src="/images/NewLogo.png" alt="logo images"/>  */}
                        CROPBLOCK
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
                        <li><Link to="/transport">Be a driver </Link></li>
                        <li><Link to="/drivers">Transport Companies</Link></li>
                        <li><Link to="/products">All Product</Link></li>
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
      </div>
    </Router>
    );
  }
}