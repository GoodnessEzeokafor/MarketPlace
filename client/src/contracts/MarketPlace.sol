/*
    PUBLIC PROPERTIES
        - dapp_name
        - dapp_builders
        - farmers
        - buyers
        - products
        - transport companies
        - farmerCont
        - buyerCount
        - transportCompanyCount
        - productsCount


    PUBLIC METHODS
        - CreateFarmer
        - CreateBuyer
        - CreateTransportCompanies
        - CreateProduct

        - getFarmerDetail
        - getTransportCompanyDetail
        - getBuyerDetail
        - getProductDetail

        - traceProduct
        - store transactionHash
*/
pragma solidity ^0.5.0;

contract MarketPlace{



    string public dapp_name;  //dapp_name 
    string public dapp_builder = "Chynasah";
    uint public farmerCount =0; 
    uint public buyerCount =0;
    uint public transportCompanyCount =0;
    uint public productCount = 0;

    mapping (uint=>Farmer) public farmers;
    mapping (uint=>Buyer) public buyers;
    mapping (uint=>TransportCompany) public transport_companies;
    mapping (uint=>Product) public products;
    

    /* START STRUCT  */
    struct Farmer{
        uint id;
        string full_name;
        string picture;
        string farm_name;
        string email_adddress;
        string farm_description;
        address farmer_wallet_address;
    }




    struct Buyer{
        uint id;
        string full_name;
        string picture;
        string email_address;
        address buyer_wallet_address;
    }


    struct TransportCompany{
        uint id;
        string transport_name;
        string transport_description;
        string picture;       
        string transport_address;
        address payable transport_wallet_address;
        uint price ; 
    }


    struct Product{
        uint id;
        string product_name;
        string product_description;
        uint product_price;
        string upload_image;
        address payable seller;
    }

    /* END STRUCT  */

    /*START EVENT */
    event FarmCreated(
        uint id,
        string full_name,
        string picture,
        string farm_name,
        string email_adddress,
        string farm_description,
        address farmer_wallet_address
    );


    event BuyerCreated(
        uint id,
        string full_name,
        string picture,
        string email_address,
        address buyer_wallet_address
    );
    event ProductCreated(
        uint id,
        string product_name,
        string product_description,
        uint product_price,
        string upload_image,
        address payable seller
    );
    event TransportCompanyCreated(
        uint id,
        string transport_name,
        string transport_description,
        string picture,
        string transport_address,
        address transport_wallet_address,
        uint price  
    );
    event BoughtProduct(address _from,address _to,uint amt);
    /* END EVENT */

    /* START METHOD */
    function createSellerProfile(
        string memory _full_name,
        string memory _picture,
        string memory _farm_name,
        string memory _email_address,
        string memory _farm_description
    )public{
        farmerCount++;
        farmers[farmerCount] = Farmer(
            farmerCount,
            _full_name,
            _picture,
            _farm_name,
            _email_address,
            _farm_description,
            msg.sender
        );

        emit FarmCreated(
            farmerCount,
            _full_name,
            _picture,
            _farm_name,
            _email_address,
            _farm_description,
            msg.sender
        );

    }


    function createBuyer(
        string memory _full_name,
        string memory _picture,
        string memory  _email_address
        // address buyer_wallet_address
    )public{
        buyerCount++;
        buyers[buyerCount] = Buyer(
                buyerCount,
                _full_name,
                _picture,
                _email_address,
                msg.sender
        );
        emit BuyerCreated(
            buyerCount,
                _full_name,
                _picture,
                _email_address,
                msg.sender
        );
    }

    function createTransportCompany(
        string memory _transport_name,
        string memory _transport_description,
        string memory _picture,
        string memory _transport_address,
        uint  _price
    )public{
        transportCompanyCount++;
        transport_companies[transportCompanyCount] = TransportCompany(
            transportCompanyCount,
            _transport_name,
            _transport_description,
            _picture,
            _transport_address,
            msg.sender,
            _price
        );

        emit TransportCompanyCreated(
            transportCompanyCount,
                _transport_name,
                _transport_description,
                _picture,
                _transport_address,
                msg.sender,
                _price
        );
    }





    function getFarmerDetail(uint _id)public view returns(
                                  uint id,
                                  string memory,
                                  string memory,
                                  string memory,
                                  string memory,
                                  string memory,
                                  address
    ){
        Farmer memory f = farmers [_id];
        return (
            f.id,
            f.full_name,
            f.picture,
            f.farm_name,
            f.email_adddress,
            f.farm_description,
            f.farmer_wallet_address
        );
    }

function getProductDetail(uint _id)public view returns(
                                  uint id,
                                  string memory,
                                  string memory,
                                  uint,
                                  address
    ){
        Product memory p = products [_id];
        return (
            p.id,
            p.product_name,
            p.product_description,
            p.product_price,
            p.seller
        );
    }

    function getBuyerDetail(uint _id)public view returns(
                uint,
        string  memory,
        string memory,
        string memory ,
        address
    ){
        Buyer memory b = buyers [_id];
        return(
            b.id,
            b.full_name,
            b.picture,
            b.email_address,
            b.buyer_wallet_address
        );
    }


    function getTransportCompanyDetail(uint _id)public view returns(
        uint id,
        string memory,
        string memory,
        string memory, 
        string memory,
        address,
        uint
    ){
        TransportCompany memory t = transport_companies [_id];
        return (
            t.id,
            t.transport_name,
            t.transport_description,
            t.picture,
            t.transport_address,
            t.transport_wallet_address,
            t.price
        );
    }   



    function createProduct(
        string memory _product_name,
        string memory _product_description,
        uint _price,
        string memory _upload_image
    )public{
        productCount++;
        products[productCount]= Product(
            productCount,
            _product_name,
            _product_description,
            _price,
            _upload_image,
            msg.sender
        );
        emit ProductCreated(
              productCount,
            _product_name,
            _product_description,
            _price,
            _upload_image,
            msg.sender
        );
    }

    function buyProduct(uint _id) public payable{
        // fetch the product
                // Product memory p = products[_id];

        Product memory _product = products[_id];
        // fetch the owner
        address payable _seller = _product.seller;
        // make sure the product is is valid
        require(_product.id > 0 && _product.id <= productCount,"NOT A PRODUCT ID");
        // require that there is enough Ether in the transaction
        require(msg.value >= _product.product_price,"You Don't Have Enough Ether");
        // require that the buyer is not the seller
        require(_seller != msg.sender,"Seller Can't Purchase His Item");
        // transfer ownership
        // _product.owner = msg.sender;
        // mark as purchased
        //update the product
        products[_id] = _product;
        // pay the seller by paying them ether
        address(_seller).transfer(msg.value); 
        // trigger an event
        emit BoughtProduct(
            msg.sender,   
            _seller,
            msg.value
        );
    }
}