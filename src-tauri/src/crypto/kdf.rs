use argon2::{password_hash::SaltString, PasswordHasher};

use super::utils;

pub fn kdf(key: &[u8]) -> Result<Vec<u8>, argon2::password_hash::Error> {
    let argon2 = utils::argon2()?;

    // DO NOT CHANGE THE SALT
    let salt = SaltString::encode_b64(b"nIYawfayuX2pEzysqYfU3nGHcBeBy/bgLMqKtWb1fFU=")?;

    let derived_key = argon2
        .hash_password(key, &salt)?
        .hash
        .ok_or(argon2::password_hash::Error::Crypto)?;

    Ok(derived_key.as_bytes().to_vec())
}
