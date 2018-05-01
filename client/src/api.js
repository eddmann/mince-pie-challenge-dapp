/* @global WEB3_URL FileReader */

import ipfsAPI from 'ipfs-api';
import Web3 from 'web3';
import contract from 'truffle-contract';

const ipfs = ipfsAPI();
const web3 = new Web3(new Web3.providers.HttpProvider(global.WEB3_URL));

const MincePieChallenge = contract(require('./contracts/MincePieChallenge.json'));
MincePieChallenge.setProvider(web3.currentProvider);
if (typeof MincePieChallenge.currentProvider.sendAsync !== 'function') {
  MincePieChallenge.currentProvider.sendAsync = (...args) => MincePieChallenge.currentProvider.send(...args);
}

const parsePie = ([id, name, photoHash, isRatable, totalRatings, avgRating]) => ({
  id: id.toNumber(),
  name,
  photoHash,
  isRatable,
  totalRatings: totalRatings && totalRatings.toNumber(),
  avgRating: avgRating && avgRating.toNumber(),
});

const parseRating = ({ id, total, average }) => ({
  id: id.toNumber(),
  totalRatings: total.toNumber(),
  avgRating: average.toNumber(),
});

const uploadPiePhoto = photo =>
  new Promise(res => {
    const reader = new global.FileReader();
    reader.onloadend = () => {
      ipfs.add(Buffer.from(reader.result)).then(files => {
        res(files[0].hash);
      });
    };
    reader.readAsArrayBuffer(photo);
  });

export const fetchAccounts = () => web3.eth.getAccounts();

export const fetchPies = async account => {
  const contract = await MincePieChallenge.deployed();
  const total = (await contract.totalPies({ from: account })).toNumber();
  return Promise.all(new Array(total).fill(0).map((_, idx) => contract.getPie(idx, { from: account }).then(parsePie)));
};

export const addPie = async (account, name, photo) => {
  const contract = await MincePieChallenge.deployed();
  const photoHash = await uploadPiePhoto(photo);
  contract.addPie(name, photoHash, { from: account, gas: 1000000 });
};

export const registerPieAddedEvent = async onAdded => {
  const contract = await MincePieChallenge.deployed();
  contract.PieAdded().watch((_, res) => onAdded(parsePie(Object.values(res.args))));
};

export const ratePie = async (account, id, rating) => {
  const contract = await MincePieChallenge.deployed();
  contract.ratePie(id, rating, { from: account, gas: 1000000 });
};

export const registerPieRatedEvent = async onRated => {
  const contract = await MincePieChallenge.deployed();
  contract.PieRated().watch((_, res) => onRated(parseRating(res.args)));
};
