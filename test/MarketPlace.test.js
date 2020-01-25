require('chai')
    .use(require('chai-as-promised'))
    .should()


const MarketPlace = artifacts.require("./MarketPlace.sol")



contract("MarketPlace smart contract unit testing",([deployer, seller, buyer, transport]) => {
    before(async() => {
        this.contract = await MarketPlace.deployed()
    })


    it("checks if it deploys successfully", async() => {
        const address = this.contract.address
        assert.notEqual(address, 0x0)
        assert.notEqual(address, null)
        assert.notEqual(address, '')
        assert.notEqual(address, undefined)
    })

    it("checks if farmerCount is 0", async() => {
        const farmerCount = await this.contract.farmerCount()
        assert.equal(farmerCount,0)
    })
    it("checks if buyerCount is 0", async() => {
        const buyerCount = await this.contract.buyerCount()
        assert.equal(buyerCount,0)
    })
    it("checks if productCount is 0", async() => {
        const productCount =  await this.contract.productCount()
        assert.equal(productCount,0)
    })
    // transportCompanyCount
    it("checks if productCount is 0", async() => {
        const transportCompanyCount =  await this.contract.transportCompanyCount()
        assert.equal(transportCompanyCount,0)
    })
    it("checks if dapp builder is Goodness", async() => {
        const dapp_builder = await this.contract.dapp_builder()
        assert.equal(dapp_builder,"@GoodnessEzeokafor")
    })

    it("MarketPlace Contract:- create a createSellerProfile", async() => {
        const newSeller = await this.contract.createSellerProfile(
            "Full Name",
            "pic.jpg",
            "Farm Name",
            "email.gmail.com",
            "Farm Description",
            {'from':seller}
        )
        const farmerCount = await this.contract.farmerCount()
        const result = newSeller.logs[0].args
        assert.equal(result['id'].toString(),farmerCount)
        assert.equal(result['full_name'].toString(),"Full Name")        
        assert.equal(result['picture'].toString(),"pic.jpg")
        assert.equal(result['farm_name'].toString(),"Farm Name")
        assert.equal(result['email_adddress'].toString(),"email.gmail.com")
        assert.equal(result['farm_description'].toString(),"Farm Description")
        assert.equal(result['farmer_wallet_address'].toString(),seller)
    })
    it("MarketPlace Contract:- create a createBuyer", async() => {
        const newBuyer = await this.contract.createBuyer(
            "Full Name",
            "pic.jpg",
            "email.gmail.com",
            {'from':buyer}
        )
        const buyerCount = await this.contract.buyerCount()
        const result = newBuyer.logs[0].args
        assert.equal(result['id'].toString(),buyerCount)
        assert.equal(result['full_name'].toString(),"Full Name")        
        assert.equal(result['picture'].toString(),"pic.jpg")
        assert.equal(result['email_address'].toString(),"email.gmail.com")
        assert.equal(result['buyer_wallet_address'].toString(),buyer)
    })
    

    it("MarketPlace Contract:- create a createTransportCompany", async() => {
        const newTransportCompany = await this.contract.createTransportCompany(
            "transport name",
            "transport description",
            "picture.jpg",
            "transport address",
            web3.utils.toWei('0.3','Ether'),
            {'from':transport}
        )
        const transportCompanyCount = await this.contract.transportCompanyCount()
        const result = newTransportCompany.logs[0].args
        assert.equal(result['id'].toString(),transportCompanyCount)
        assert.equal(result['transport_name'].toString(),"transport name")        
        assert.equal(result['transport_description'].toString(),"transport description")
        assert.equal(result['picture'].toString(),"picture.jpg")
        assert.equal(result['transport_address'].toString(),"transport address")
        assert.equal(result['transport_wallet_address'].toString(),transport)
    })

    it("MarketPlace Contract:- create a createProduct", async() => {
        const newProduct = await this.contract.createProduct(
            "product name",
            "product description",
            web3.utils.toWei('0.3','Ether'),
            "picture.jpg",
            {'from':seller}
        )
        const productCount = await this.contract.productCount()
        const result = newProduct.logs[0].args
        assert.equal(result['id'].toString(),productCount)
        assert.equal(result['product_name'].toString(),"product name")        
        assert.equal(result['product_description'].toString(),"product description")
        assert.equal(result['product_price'].toString(),web3.utils.toWei('0.3','Ether'))
        assert.equal(result['upload_image'].toString(),"picture.jpg")
        assert.equal(result['seller'].toString(),seller)
    })
    
    it("MarketPlace Contract:- create a getFarmerDetail", async() => {
        const single_farmer = await this.contract.getFarmerDetail(1)
        assert.equal(single_farmer['0'].toString(),1)
        assert.equal(single_farmer['1'].toString(),"Full Name")
        assert.equal(single_farmer['2'].toString(),"pic.jpg")
        assert.equal(single_farmer['3'].toString(),"Farm Name")
        assert.equal(single_farmer['4'].toString(),"email.gmail.com")
        assert.equal(single_farmer['5'].toString(),"Farm Description")
        assert.equal(single_farmer['6'].toString(),seller)
    })
    //
    
    it("MarketPlace Contract:- create a getBuyerDetail", async() => {
        const single_buyer = await this.contract.getBuyerDetail(1)
        assert.equal(single_buyer['0'].toString(),1)
        assert.equal(single_buyer['1'].toString(),"Full Name")
        assert.equal(single_buyer['2'].toString(),"pic.jpg")
        assert.equal(single_buyer['3'].toString(),"email.gmail.com")
        assert.equal(single_buyer['4'].toString(),buyer)
    })


    it("MarketPlace Contract:- create a getTransportCompanyDetail", async() => {
        const single_transport_comapny = await this.contract.getTransportCompanyDetail(1)
        assert.equal(single_transport_comapny['0'].toString(),1)
        assert.equal(single_transport_comapny['1'].toString(),"transport name")
        assert.equal(single_transport_comapny['2'].toString(),"transport description")
        assert.equal(single_transport_comapny['3'].toString(),"picture.jpg")
        assert.equal(single_transport_comapny['4'].toString(),"transport address")
        // assert.equal(single_transport_comapny['5'].toString(),web3.utils.toWei('0.3','Ether'))
        // assert.equal(single_transport_comapny['6'].toString(),transport.toString())
    })
  
    
    
})