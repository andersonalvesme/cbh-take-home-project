const crypto = require('crypto');

exports.deterministicPartitionKey = (event) => {
    const TRIVIAL_PARTITION_KEY = '0';
    const MAX_PARTITION_KEY_LENGTH = 256;
    let candidate;

    // When you don't have a valid value, you just return the default value and don't need to process the rest of code.
    if (!event) {
        return TRIVIAL_PARTITION_KEY;
    }

    // Is more simple checking if the partitionKey exists and if yes you just execute the creation of hash and return.
    if (!event.partitionKey) {
        const data = JSON.stringify(event);
        return crypto.createHash('sha3-512').update(data).digest('hex');
    }

    // The rest of the code can be executed if the conditions above don't match, but when match the code don't is executed, saving time and processing.
    candidate = event.partitionKey;

    if (typeof candidate !== 'string') {
        candidate = JSON.stringify(candidate);
    }

    if (candidate.length > MAX_PARTITION_KEY_LENGTH) {
        candidate = crypto.createHash('sha3-512').update(candidate).digest('hex');
    }

    return candidate;
};