use super::{encryption, nonce};

pub fn encrypt_master_challenge(key: &[u8]) -> anyhow::Result<(Vec<u8>, Vec<u8>)> {
    let challenge =
        encryption::encrypt_value(b"", key).map_err(|err| anyhow::anyhow!(err.to_string()))?;

    Ok(challenge)
}

pub fn compare_master_challenge(key: &[u8], challenge: &[u8]) -> anyhow::Result<Vec<u8>> {
    let (challenge, nonce) = challenge.split_at(challenge.len() - 16);

    let nonce = nonce::decrypt_nonce(nonce, key)?;
    let res = encryption::decrypt_value(challenge, key, &nonce[..12])
        .map_err(|err| anyhow::anyhow!(err.to_string()))?;

    Ok(res)
}
