// SPDX-License-Identifier: MIT
pragma solidity =0.8.3;

// Modifed the _mint() function in the node_moduels folder in @openzeppelin/contracts
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract MetaCardsNftV2 is ERC721("MetaCards", "MC") {
    function mint(address to, uint256 tokenId, string memory tokenURI) public {
        _mint(to, tokenId, tokenURI);
    }
}