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
    string public dapp_name;
    string public dapp_builder = "@GoodnessEzeokafor";
    
    uint public farmerCount =0;
    uint public buyerCount =0;
    uint public transportCompanyCount =0;
    uint public traceCount =0;
    
    mapping (uint=>Farmer) public farmers;
    mapping (uint=>Buyer) public buyers;
    mapping (uint=>TransportCompany) public transport_companies;
    mapping (uint=>Product) public products;
    mapping (uint=>Trace) public tracing;
    


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
        bool sold;
        address payable seller;
        uint price;
    }

    struct Trace{
        uint id;
        uint price_id;
        string  product_name;
        uint product_price;
        // uint transport_company_id;
        bool left;
        bool arrived;
        bool pending; 
        uint timestamp;
        uint updated;
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
        bool sold,
        address payable seller,
        uint price
    );
    event TraceCreated(
        uint id,
        uint product_id,
        string  product_name,
        uint product_price,
        // uint transport_company_id,
        bool left,
        bool arrived,
        bool pending,
        uint timestamp,
        uint updated
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
    }

    function createTrace(
        uint _product_id,
        string memory transport_name
    )public{
        traceCount++;
        Product memory product = products[_product_id];
        tracing[traceCount] = Trace(
            traceCount,
            product.id,
            product.product_name,
            product.product_price,
            false,
            false,
            true,
            now,
            0
        );
    }
        // uint price_id;
        // string  product_name;
        // uint product_price;

        //     uint id;
        // uint product_id;
        // uint transport_company_id;
        // bool left;
        // bool arrived;
        // bool pending; 
        // uint timestamp;
        // uint updated;


    /* END METHOD */
    

}
