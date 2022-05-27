pragma solidity ^0.8.0;

//import openzeppelin erc1155
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC1155/ERC1155.sol";
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/access/Ownable.sol";


contract NFTContract is ERC1155, Ownable{
    uint256 public constant ARTWORK=0;
    uint256 public constant PHOTO=1;
    uint256 public constant PHOTO2=2;

    constructor() ERC1155("https://lhcutp47xmyd.usemoralis.com/{id}.json"){
        _mint(msg.sender, ARTWORK, 1, "");
        _mint(msg.sender, PHOTO, 2, "");
        _mint(msg.sender, PHOTO2, 3, "");
    } 

    function mint(address account, uint256 id, uint256 amount) public onlyOwner{
        _mint(account, id, amount, "");
    }

    function burn(address account, uint256 id, uint256 amount) public {
        require(msg.sender==account);
        _burn(account, id, amount);
    }

    function MysafeTransferFrom(address from, address to, uint256 id, uint256 amount, bytes memory data) public {
        _safeTransferFrom(from, to, id, amount, data);
    }


}

//2:02:49
//transaction hash: 0x3ec01bb8a0169dac36d2e131588a4b41020d40a0e4a43c23e171958884eda439
//contract address: 0x0191091F01E291C4DD27F1e3c8fB55dD4A63d135
//To see my contract on OpenseaTestnet: opensea.io/get-listed/

//test1: 0x5454106B6aFD7b34ad9dd4c845D7C2Cb518E8e87
//test2: 0x693d55F1587CADeB4dEe8F170ca89B1B1691b3F3

//-----new deploy contract
// 0x0a1a0fd0fc47df5e38f47950ff9308e03af6f682