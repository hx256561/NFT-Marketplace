pragma solidity ^0.8.0;

//import openzeppelin erc1155
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC1155/ERC1155.sol";
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/access/Ownable.sol";


contract NFTContract is ERC1155, Ownable{
    uint256 public constant ARTWORK=0;
    uint256 public constant PHOTO=1;

    constructor() ERC1155("https://pc4zvkhb19ar.usemoralis.com/{id}.json"){
        _mint(msg.sender, ARTWORK, 1, "");
        _mint(msg.sender, PHOTO, 2, "");
    } 

    function mint(address account, uint256 id, uint256 amount) public onlyOwner{
        _mint(account, id, amount, "");
    }

    function burn(address account, uint256 id, uint256 amount) public {
        require(msg.sender==account);
        _burn(account, id, amount);
    }


}

//1:53:55
//transaction hash: 0x3ec01bb8a0169dac36d2e131588a4b41020d40a0e4a43c23e171958884eda439
//contract address: 0x0191091F01E291C4DD27F1e3c8fB55dD4A63d135
//To see my contract on OpenseaTestnet: opensea.io/get-listed/

//new address: 0x85b4a47006aa5e6cb00e925667927a9d5ae6f4a3