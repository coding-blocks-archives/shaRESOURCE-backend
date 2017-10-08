/**
 * Created by bhavyaagg on 8/10/17.
 */

const models = require('./db/models').models;
const BlockChain = require('./blockchainHandler').BlockChain;

models.BlockChain.findAll().then((blocks) => {
  for (let i = 0; i < blocks.length; i++) {
    BlockChain.chain.push({
      index: blocks[i].index,
      timestamp: blocks[i].timestamp,
      data: blocks[i].data,
      previousHash: blocks[i].previousHash,
      hash: blocks[i].hash
    });
  }
  console.log(JSON.stringify(BlockChain.chain, null, 4));
});





