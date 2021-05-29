// SPDX-License-Identifier: MIT
pragma solidity =0.8.3;

import "./Interface/IERC721.sol";
import "./Interface/IERC721Metadata.sol";

contract MetaCardsNft is IERC721, IERC721Metadata {
    string public override name;
    string public override symbol;
    
    mapping (uint256 => string) _tokenURI;
    mapping (address => uint256) public override balanceOf;
    mapping (uint256 => address) public override ownerOf;
    mapping (uint256 => address) public tokenAproved;
    mapping (address => mapping (address => bool)) private operatorApproved;

    constructor (string memory _name, string memory _symbol) {
        _name = name;
        _symbol = symbol;      
    }

    function mint(address _to, uint256 tokenId, string memory _TokenURI) public {
        require(_to != address(0), "ERC721: mint to the zero address");
        require(!_exists(tokenId), "ERC721: token already minted");

        balanceOf[_to] += 1;
        ownerOf[tokenId] = _to;
        _tokenURI[tokenId] = _TokenURI;

        emit Transfer(address(0), _to, tokenId);
    }

    function tokenURI(uint256 _tokenId) external view override returns (string memory) {
        require(_exists(_tokenId) , "Token Not Created");
        return _tokenURI[_tokenId];
    }

    function safeTransferFrom(address _from, address _to, uint256 _tokenId, bytes memory data) external override payable {
        require(ownerOf[_tokenId] == msg.sender, "Caller is not owner of token");
        require(tokenAproved[_tokenId] == _to , "Token is not approved");
        require(address(0) != _to , "_to address is null");

        ownerOf[_tokenId] = _to;
        balanceOf[_to] += 1;
        balanceOf[_from] -= 1;

        emit Transfer(_from, _to, _tokenId);
    }

    function safeTransferFrom(address _from, address _to, uint256 _tokenId) external override payable {
        require(ownerOf[_tokenId] == msg.sender, "Caller is not owner of token");
        require(tokenAproved[_tokenId] == _to , "Token is not approved");
        require(address(0) != _to, "_to address is null");

        ownerOf[_tokenId] = _to;
        balanceOf[_to] += 1;
        balanceOf[_from] -= 1;

        emit Transfer(_from, _to, _tokenId);
    }

    function transferFrom(address _from, address _to, uint256 _tokenId) external override payable {
        require(ownerOf[_tokenId] == msg.sender , "msg.sender is not the owner");
        require(ownerOf[_tokenId] == _from , "_from is not owner of nft");
        require(ownerOf[_tokenId] != address(0) , "Token Doesn't exsit");
        require(address(0) != _to , "_to address is null");

        ownerOf[_tokenId] = _to;
        balanceOf[_to] += 1;
        balanceOf[_from] -= 1;

        emit Transfer(_from, _to, _tokenId);
    }

    function approve(address _approved, uint256 _tokenId) external override payable {
        require(ownerOf[_tokenId] != _approved , "_approved can't be owner");
        tokenAproved[_tokenId] = _approved;

        emit Approval(ownerOf[_tokenId], _approved, _tokenId);
    }

    function getApproved(uint256 _tokenId) external override view returns (address) {
        return (tokenAproved[_tokenId]);
    }

    function _exists(uint256 tokenId) internal view virtual returns (bool) {
        return ownerOf[tokenId] != address(0);
    }
}