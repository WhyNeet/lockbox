use std::ops::Deref;

use anyhow::Context;

use crate::crypto::{encryption, nonce};

#[derive(serde::Serialize, serde::Deserialize)]
pub struct EncryptedEntry {
    hash: Vec<u8>,
    nonce: Vec<u8>,
}

impl EncryptedEntry {
    pub fn new(entry: &[u8], key: &[u8]) -> anyhow::Result<Self> {
        let (hash, nonce) =
            encryption::encrypt_value(entry, key).map_err(|err| anyhow::anyhow!(err))?;
        let nonce = nonce::encrypt_nonce(&nonce, key).map_err(|err| anyhow::anyhow!(err))?;
        Ok(Self { hash, nonce })
    }

    pub fn get_hash(&self) -> anyhow::Result<Vec<u8>> {
        Ok([self.hash.as_slice(), self.nonce.as_slice()]
            .concat()
            .to_vec())
    }
}

impl From<&[u8]> for EncryptedEntry {
    fn from(value: &[u8]) -> Self {
        let (hash, nonce) = value.split_at(value.len() - 16);

        Self {
            hash: hash.to_vec(),
            nonce: nonce.to_vec(),
        }
    }
}

impl From<Vec<u8>> for EncryptedEntry {
    fn from(mut value: Vec<u8>) -> Self {
        let nonce = value.split_off(value.len() - 16);

        Self { hash: value, nonce }
    }
}

#[derive(serde::Serialize, serde::Deserialize)]
pub struct DecryptedEntry {
    value: Vec<u8>,
}

impl DecryptedEntry {
    pub fn from(value: &EncryptedEntry, key: &[u8]) -> anyhow::Result<Self> {
        // this nonce is 16 bytes ([...nonce, 0, 0, 0, 0])
        let nonce = nonce::decrypt_nonce(&value.nonce, key).context("failed to decrypt nonce")?;

        let value = encryption::decrypt_value(&value.hash, key, &nonce[..12])
            .map_err(|err| anyhow::anyhow!(err.to_string()))?;

        Ok(Self { value })
    }
}

impl Deref for DecryptedEntry {
    type Target = Vec<u8>;

    fn deref(&self) -> &Self::Target {
        &self.value
    }
}
