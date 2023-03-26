const { deterministicPartitionKey } = require('./dpk');

describe('deterministicPartitionKey', () => {
    it('Returns the literal \'0\' when given no input', () => {
        const trivialKey = deterministicPartitionKey();
        expect(trivialKey).toBe('0');
    });

    it('Returns the literal \'0\' when given null', () => {
        const trivialKey = deterministicPartitionKey(null);
        expect(trivialKey).toBe('0');
    });

    it('Returns the literal \'0\' when given undefined', () => {
        const trivialKey = deterministicPartitionKey(undefined);
        expect(trivialKey).toBe('0');
    });

    it('Returns the hash when given string 0', () => {
        const trivialKey = deterministicPartitionKey('0');
        expect(trivialKey).toBe('5ae8f97ede3b9ae9f4b496c125d45d34edf13ce2f9e29c1c085ae0f499820173b86d731c4ca453d2e119b4ff63d3afd3ed5fdb9753fe222ef300d4f465f522ea');
    });

    it('Returns the literal \'0\' when given integer 0', () => {
        const trivialKey = deterministicPartitionKey(0);
        expect(trivialKey).toBe('0');
    });

    it('Returns the hash when the partitionKey is null', () => {
        const trivialKey = deterministicPartitionKey({ partitionKey: null });
        expect(trivialKey).toBe('58540d4d440df8c6c6da0d79cfce715bc92953c6cde8be9f749790004ef2d5a7322d0fd5170eac9a37d57ee0cc975cfca068a60b01622529d9e0fd657f71b8e2');
    });

    it('Returns the hash when the partitionKey is undefined', () => {
        const trivialKey = deterministicPartitionKey({ partitionKey: undefined });
        expect(trivialKey).toBe('c1802e6b9670927ebfddb7f67b3824642237361f07db35526c42c555ffd2dbe74156c366e1550ef8c0508a6cc796409a7194a59bba4d300a6182b483d315a862');
    });

    it('Returns the hash when the partitionKey is the integer 0', () => {
        const trivialKey = deterministicPartitionKey({ partitionKey: 0 });
        expect(trivialKey).toBe('e65a0cb83a95cae7eb0642da576cac881e397c0405c63577c977068f7892f69f1c315baa294124da2a67e0c486d340f9d357377f894d0c0fd850484f8984f2e7');
    });

    it('Returns the literal \'0\' when the partitionKey is the string \'0\'', () => {
        const trivialKey = deterministicPartitionKey({ partitionKey: '0' });
        expect(trivialKey).toBe('0');
    });

    it('Returns the literal \'50\' when the partitionKey is the integer 50', () => {
        const trivialKey = deterministicPartitionKey({ partitionKey: 50 });
        expect(trivialKey).toBe('50');
    });

    it('Returns the literal \'50\' when the partitionKey is the string \'50\'', () => {
        const trivialKey = deterministicPartitionKey({ partitionKey: '50' });
        expect(trivialKey).toBe('50');
    });

    it('Returns the hash for index 50 when given input is the string \'50\'', () => {
        const trivialKey = deterministicPartitionKey('50');
        expect(trivialKey).toBe('9be69e3c7182c0dd4326515ce8e37d411eb64fd7c553af33c854805c7e621caaed9b0e4549fe573c2073c2516a7e4ee25a801ca3200dfd73e2053838c774a783');
    });

    it('Returns the hash for index 50 when given input is the integer 50', () => {
        const trivialKey = deterministicPartitionKey(50);
        expect(trivialKey).toBe('e55e36b58a817b0cc2729f0ffd22ac0d8ecf255abae0e545884b9508a68ece9c3e7fb7efff3c45913fc664668fa57b32e609abcdd439e9a8fd62fd8e1da738d6');
    });

    it('Returns the hash less than 256 when the partitionKey is longer than 256', () => {
        const trivialKey = deterministicPartitionKey({ partitionKey: '9be69e3c7182c0dd4326515ce8e37d411eb64fd7c553af33c854805c7e621caaed9b0e4549fe573c2073c2516a7e4ee25a801ca3200dfd73e2053838c774a7839be69e3c7182c0dd4326515ce8e37d411eb64fd7c553af33c854805c7e621caaed9b0e4549fe573c2073c2516a7e4ee25a801ca3200dfd73e2053838c774a783AA' });
        expect(trivialKey.length).toBeLessThan(256);
        expect(trivialKey).toBe('98e79090b0fb4464bb5fa98dd263cb6af7c2b02470cabe7ba93b59033d7f9f234c89540309cbd892108cf750ea4eadfddc5ba256b8e253b3e0f3381ebbd13703');
    });

    it('Returns the hash less than 256 when the value is longer than 256', () => {
        const trivialKey = deterministicPartitionKey('9be69e3c7182c0dd4326515ce8e37d411eb64fd7c553af33c854805c7e621caaed9b0e4549fe573c2073c2516a7e4ee25a801ca3200dfd73e2053838c774a7839be69e3c7182c0dd4326515ce8e37d411eb64fd7c553af33c854805c7e621caaed9b0e4549fe573c2073c2516a7e4ee25a801ca3200dfd73e2053838c774a783AA');
        expect(trivialKey.length).toBeLessThan(256);
        expect(trivialKey).toBe('30e5d84d76e4e1dd9e214f1510e2b6ea0992eea9a89a7110a4a8266142138f9bbd1eb0ed398d82dd099f38fecbaf38fd011efc1d401731f5a9348cc13008f384');
    });

    it('Returns the object when the partitionKey is object and less than 256', () => {
        const trivialKey = deterministicPartitionKey({ partitionKey: { id: 50 } });
        expect(trivialKey).toBe('{\"id\":50}');
    });

    it('Returns the hash when the partitionKey is object and greather than 256', () => {
        const trivialKey = deterministicPartitionKey({ partitionKey: { id: '9be69e3c7182c0dd4326515ce8e37d411eb64fd7c553af33c854805c7e621caaed9b0e4549fe573c2073c2516a7e4ee25a801ca3200dfd73e2053838c774a7839be69e3c7182c0dd4326515ce8e37d411eb64fd7c553af33c854805c7e621caaed9b0e4549fe573c2073c2516a7e4ee25a801ca3200dfd73e2053838c774a783AA' } });
        expect(trivialKey).toBe('a0db5778c81083e1b68b167c56606bd033d0b39e1334fe45910dbaee12955df42af7e693a0764b5bc934e5b722e83e6dc99909c084b7b9daf7fde74f53618809');
    });

    it('Returns the hash when the value is object and less than 256', () => {
        const trivialKey = deterministicPartitionKey({ id: 50 });
        expect(trivialKey).toBe('7bde0e3ceece039fc34def496e6d6d26452187423645316b8ec788dadaaadc9c57383dcc02e097665f571ede9319e588bf5128af79b4d12ce85f5b2923fc9985');
    });

    it('Returns the hash when the value is object and greather than 256', () => {
        const trivialKey = deterministicPartitionKey({ id: '9be69e3c7182c0dd4326515ce8e37d411eb64fd7c553af33c854805c7e621caaed9b0e4549fe573c2073c2516a7e4ee25a801ca3200dfd73e2053838c774a7839be69e3c7182c0dd4326515ce8e37d411eb64fd7c553af33c854805c7e621caaed9b0e4549fe573c2073c2516a7e4ee25a801ca3200dfd73e2053838c774a783AA' });
        expect(trivialKey).toBe('a0db5778c81083e1b68b167c56606bd033d0b39e1334fe45910dbaee12955df42af7e693a0764b5bc934e5b722e83e6dc99909c084b7b9daf7fde74f53618809');
    });
});
