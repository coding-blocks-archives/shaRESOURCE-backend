/**
 * Created by bhavyaagg on 8/10/17.
 */


const blockchain = require('./blockchain');
const BlockChain = new blockchain.BlockChain();
const Block = blockchain.Block;

const BlockChainModel = require('./db/models').models.BlockChain;

// BlockChain.addBlock(new Block(1, (new Date()).toDateString(), {amount: 50}, ''));
// BlockChain.addBlock(new Block(2, (new Date()).toDateString(), {amount: 10}, ''));

// console.log(BlockChain.isValid());
// console.log(JSON.stringify(BlockChain, null, 4));

module.exports = {
  addTransaction: async function (data) {
    const date = (new Date()).toDateString();
    const index = BlockChain.chain.length;
    BlockChain.addBlock(new Block(index, date, data, ''));
    await BlockChainModel.create({
      index: index,
      timestamp: date,
      data: JSON.stringify(data),
      previousHash: BlockChain.getLatestBlock().previousHash,
      hash: BlockChain.getLatestBlock().hash
    }).then(block => {
      console.log(JSON.stringify(BlockChain.chain, null, 4));
      return {success: true}
    }).catch(err => {
      console.log(err);
      return {success: false}
    });
  },
  BlockChain: BlockChain
};