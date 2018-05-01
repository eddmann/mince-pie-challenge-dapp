const MincePieChallenge = artifacts.require('MincePieChallenge');

const assertRevert = async promise => {
  try {
    await promise;
    assert.fail('Expected revert not received');
  } catch (error) {
    assert(error.message.search('revert') >= 0, `Expected "revert", got ${error} instead`);
  }
};

const parseBigNumbers = arr => Object.values(arr).map(el => (el.toNumber ? el.toNumber() : el));

contract('Mince Pie Challenge', ([PRIMAY_ACCOUNT, ANOTHER_ACCOUNT]) => {
  const PIE_NAME = 'Sample Pie';
  const PHOTO_HASH = 'sample-photo-hash';

  let contract;

  beforeEach(async () => {
    contract = await MincePieChallenge.new({ from: PRIMAY_ACCOUNT });
  });

  it('assigns the contract creator as the admin', async () => {
    assert.equal(PRIMAY_ACCOUNT, await contract.admin());
  });

  it('is active when contract is created', async () => {
    assert.equal(true, await contract.isActive());
  });

  it('can only be activated when inactive', async () => {
    assertRevert(contract.activate({ from: PRIMAY_ACCOUNT }));
  });

  it('can only be deactivated when active', async () => {
    await contract.deactivate({ from: PRIMAY_ACCOUNT });

    assert.equal(false, await contract.isActive());
  });

  it('can add a new pie', async () => {
    const result = await contract.addPie(PIE_NAME, PHOTO_HASH, { from: PRIMAY_ACCOUNT });

    assert.equal(1, await contract.totalPies());

    const pie = await contract.getPie(0, { from: PRIMAY_ACCOUNT });
    assert.deepEqual([0, PIE_NAME, PHOTO_HASH, true, 0, 0], parseBigNumbers(pie));

    assert.equal('PieAdded', result.logs[0].event);
    assert.deepEqual([0, 'Sample Pie', PHOTO_HASH, true], parseBigNumbers(result.logs[0].args));
  });

  it('returns empty when pie not found', async () => {
    const pie = await contract.getPie(0, { from: PRIMAY_ACCOUNT });

    assert.deepEqual([0, '', '', false, 0, 0], parseBigNumbers(pie));
  });

  it('can rate a pie', async () => {
    await contract.addPie(PIE_NAME, PHOTO_HASH, { from: PRIMAY_ACCOUNT });

    const result = await contract.ratePie(0, 2, { from: PRIMAY_ACCOUNT });

    const pie = await contract.getPie(0, { from: PRIMAY_ACCOUNT });
    assert.deepEqual([0, PIE_NAME, PHOTO_HASH, false, 1, 2], parseBigNumbers(pie));

    assert.equal('PieRated', result.logs[0].event);
    assert.deepEqual([0, 1, 2], parseBigNumbers(result.logs[0].args));
  });

  it('can only rate a pie once', async () => {
    await contract.addPie(PIE_NAME, PHOTO_HASH, { from: PRIMAY_ACCOUNT });
    await contract.ratePie(0, 5, { from: PRIMAY_ACCOUNT });

    assertRevert(contract.ratePie(0, 5, { from: PRIMAY_ACCOUNT }));
  });
});
