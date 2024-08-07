$(function () {
    let headerElem = $('header');
    let logo = $('#logo');
    let navMenu = $('#nav-menu');
    let navToggle = $('#nav-toggle');
  
   $('#properties-slider').slick({
        slidesToShow: 4,
        slidesToScroll: 1,
        prevArrow: '<a href="#" class="slick-arrow slick-prev">previous</a>',
        nextArrow: '<a href="#" class="slick-arrow slick-next">next</a>',
        responsive: [
            {
                breakpoint: 1100,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    infinite: true,
                }
            },
            {
                breakpoint: 767,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    infinite: true,
                }
            },
            {
                breakpoint: 530,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: true,
                }
            }
        ]
   });
  
   $('#testimonials-slider').slick({
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        prevArrow: '<a href="#" class="slick-arrow slick-prev"><</a>',
        nextArrow: '<a href="#" class="slick-arrow slick-next">></a>'
   });
  
   navToggle.on('click', () => {
       navMenu.css('right', '0');
   });
  
   $('#close-flyout').on('click', () => {
        navMenu.css('right', '-100%');
   });
  
   $(document).on('click', (e) => {
       let target = $(e.target);
       if (!(target.closest('#nav-toggle').length > 0 || target.closest('#nav-menu').length > 0)) {
           navMenu.css('right', '-100%');
       }
   });
  
   $(document).scroll(() => {
       let scrollTop = $(document).scrollTop();
  
       if (scrollTop > 0) {
           navMenu.addClass('is-sticky');
           logo.css('color', '#000');
           headerElem.css('background', '#fff');
           navToggle.css('border-color', '#000');
           navToggle.find('.strip').css('background-color', '#000');
       } else {
           navMenu.removeClass('is-sticky');
           logo.css('color', '#fff');
           headerElem.css('background', 'transparent');
           navToggle.css('bordre-color', '#fff');
           navToggle.find('.strip').css('background-color', '#fff');
       }
  
       headerElem.css(scrollTop >= 200 ? {'padding': '0.5rem', 'box-shadow': '0 -4px 10px 1px #999'} : {'padding': '1rem 0', 'box-shadow': 'none' });
   });
  
   $(document).trigger('scroll');
  });
  // script.js

// Connect to the Ethereum blockchain
const web3 = new Web3(Web3.givenProvider || "http://localhost:8545");

// ABI of the RealEstate contract
const abi = [
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "_location",
                "type": "string"
            },
            {
                "internalType": "uint256",
                "name": "_price",
                "type": "uint256"
            }
        ],
        "name": "registerProperty",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_id",
                "type": "uint256"
            },
            {
                "internalType": "address",
                "name": "_newOwner",
                "type": "address"
            }
        ],
        "name": "transferProperty",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_id",
                "type": "uint256"
            }
        ],
        "name": "getProperty",
        "outputs": [
            {
                "components": [
                    {
                        "internalType": "uint256",
                        "name": "id",
                        "type": "uint256"
                    },
                    {
                        "internalType": "string",
                        "name": "location",
                        "type": "string"
                    },
                    {
                        "internalType": "uint256",
                        "name": "price",
                        "type": "uint256"
                    },
                    {
                        "internalType": "address",
                        "name": "owner",
                        "type": "address"
                    }
                ],
                "internalType": "struct RealEstate.Property",
                "name": "",
                "type": "tuple"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    }
];

// Address of the deployed contract (replace with your contract's address)
const contractAddress = "YOUR_CONTRACT_ADDRESS_HERE";

// Create contract instance
const contract = new web3.eth.Contract(abi, contractAddress);

// Register Property
document.getElementById('registerPropertyForm').addEventListener('submit', async (event) => {
    event.preventDefault();
    const accounts = await web3.eth.getAccounts();
    const location = document.getElementById('location').value;
    const price = document.getElementById('price').value;
    contract.methods.registerProperty(location, price).send({ from: accounts[0] });
});

// Transfer Property
document.getElementById('transferPropertyForm').addEventListener('submit', async (event) => {
    event.preventDefault();
    const accounts = await web3.eth.getAccounts();
    const propertyId = document.getElementById('propertyId').value;
    const newOwner = document.getElementById('newOwner').value;
    contract.methods.transferProperty(propertyId, newOwner).send({ from: accounts[0] });
});

// Get Property Details
document.getElementById('getPropertyForm').addEventListener('submit', async (event) => {
    event.preventDefault();
    const propertyId = document.getElementById('propertyIdDetails').value;
    const property = await contract.methods.getProperty(propertyId).call();
    document.getElementById('propertyDetails').innerHTML = `
        <p>Property ID: ${property.id}</p>
        <p>Location: ${property.location}</p>
        <p>Price: ${property.price}</p>
        <p>Owner: ${property.owner}</p>
    `;
});