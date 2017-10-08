/**
 * Created by bhavyaagg on 8/10/17.
 */


const blockchain = require('./blockchain');
const BlockChain = new blockchain.BlockChain();
const Block = blockchain.Block;

BlockChain.addBlock(new Block(1, (new Date()).toDateString(), {amount: 50}, ''));
BlockChain.addBlock(new Block(2, (new Date()).toDateString(), {amount: 10}, ''));

console.log(BlockChain.isValid());
console.log(JSON.stringify(BlockChain, null, 4));

module.exports = {
  addTransaction: function (data) {
    BlockChain.addBlock(new Block(BlockChain.chain.length, (new Date()).toDateString(), data, ''));
  }
};