/**
 * Created by bhavyaagg on 8/10/17.
 */

const SHA256 = require('crypto-js/sha256');

class Block {
  constructor(index, timestamp, data, previousHash) {
    this.index = index;
    this.timestamp = timestamp;
    this.data = data;
    this.previousHash = previousHash;
    this.hash = this.calculateHash();
  }

  calculateHash() {
    return SHA256(this.index + this.timestamp.toString() + JSON.stringify(this.data) + this.previousHash.toString()).toString();
  }

}

class BlockChain {
  constructor() {
    this.chain = [this.createGenesisBlock()];
  }

  createGenesisBlock() {
    return new Block(0, (new Date()).toDateString(), "Genesis Block", "0");
  }

  getLatestBlock() {
    return this.chain[this.chain.length - 1];
  }

  addBlock(newBlock) {
    newBlock.previousHash = this.getLatestBlock().hash;
    newBlock.hash = newBlock.calculateHash();
    this.chain.push(newBlock);
  }


  isValid() {
    for (let i = 1; i < this.chain.length; i++) {

      const currentBlock = this.chain[i];
      const previousBlock = this.chain[i - 1];

      if (currentBlock.hash !== currentBlock.calculateHash())
        return false;

      if (currentBlock.previousHash !== previousBlock.hash)
        return false;

    }
    return true;
  }
}

module.exports = {
  BlockChain: BlockChain,
  Block: Block
};