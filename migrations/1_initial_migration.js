const MetaCardsNFT = artifacts.require("MetaCardsNft");

module.exports = function (deployer) {
  deployer.deploy(MetaCardsNFT, "MetaCards", "MC");
};
