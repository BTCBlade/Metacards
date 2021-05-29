const MetaCardsNft = artifacts.require('MetaCardsnft')

const { expect } = require('chai')

let accounts
let owner
let personOne;
let personTwo;
let MetaCards;

const TokenID = 1

describe('Test Swap', () => {
    before(async () => {
        accounts = await web3.eth.getAccounts()

        owner = accounts[0]
        personOne = accounts[1]
        personTwo = accounts[2]
    })

    it("Deploy NFT Contract", async () => {
        MetaCards = await MetaCardsNft.new("MetaCardsNFT", "MC")

        expect(MetaCards.address).not.to.be.null
    })

    it("Mint NFT's in contracts", async () => {
        await MetaCards.mint(personOne, TokenID, "https://www.ipfs.io/ipfs")

        expect(await MetaCards.ownerOf(TokenID)).to.be.equal(personOne)
    })

    it("Returns tokenURI", async () => {
        let _tokenURI;

        await MetaCards.tokenURI(TokenID).then(function (res) {
            console.log(res);
            _tokenURI = res;
        })

        expect(_tokenURI).to.be.equal("https://www.ipfs.io/ipfs")
    })

    it ("NFT Token for Transfers", async () => {        
        await MetaCards.transferFrom(personOne, personTwo, TokenID, {from: personOne})

        expect(await MetaCards.ownerOf(TokenID)).to.be.equal(personTwo)
    })
})
