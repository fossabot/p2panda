import { expect } from 'chai';

import { Session } from '../lib';

import data from './test-data.json';

// const PRIVATE_KEY =
//   '31f33f8e6c262f36a0e5397348093a459d66d8cb5946798ad62d5eb8e7645bdb';

const PUBLIC_KEY = data.firstEntry.encoded.author;

const SCHEMA = data.firstEntry.message.schema;

describe('Session', () => {
  it('can query entries', async () => {
    const session = new Session('http://localhost:2020');
    const entries = await session.queryEntries(SCHEMA);
    expect(entries.length).to.equal(2);
  });

  it('throws when querying without a schema', async () => {
    const session = new Session('http://localhost:2020');
    let error;
    try {
      await session.queryEntries();
    } catch (e) {
      error = e;
    }
    expect(error.message).to.equal('Schema must be provided');
  });

  it('gets next entry args', async () => {
    const session = new Session('http://localhost:2020');
    const nextEntryArgs = await session.getNextEntryArgs(PUBLIC_KEY, SCHEMA);
    expect(nextEntryArgs.entryHashSkiplink).to.equal(
      data.thirdEntryArgs.entryHashSkiplink,
    );
    expect(nextEntryArgs.entryHashBacklink).to.equal(
      data.thirdEntryArgs.entryHashBacklink,
    );
    expect(nextEntryArgs.seqNum).to.equal(data.thirdEntryArgs.seqNum);
    expect(nextEntryArgs.logId).to.equal(data.thirdEntryArgs.logId);
  });

  it('can publish entries', async () => {
    const session = new Session('http://localhost:2020');
    const nextEntryArgs = await session.publishEntry(
      data.secondEntry.encoded.entryBytes,
      data.secondEntry.encoded.payloadBytes,
    );
    expect(nextEntryArgs.entryHashSkiplink).to.equal(
      data.thirdEntryArgs.entryHashSkiplink,
    );
    expect(nextEntryArgs.entryHashBacklink).to.equal(
      data.thirdEntryArgs.entryHashBacklink,
    );
    expect(nextEntryArgs.seqNum).to.equal(data.thirdEntryArgs.seqNum);
    expect(nextEntryArgs.logId).to.equal(data.thirdEntryArgs.logId);
  });

  it('caches next entry args');

  it('throws when publishing without a key pair');

  it('throws without a configured endpoint');
});
