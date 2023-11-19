use serde::{Deserialize, Serialize};

use super::entry::EncryptedEntry;

#[derive(Serialize, Deserialize)]
#[serde(tag = "type")]
pub enum Metadata {
    Empty,
    Login {
        account: String,
        website: Option<String>,
    },
}

impl Metadata {
    pub fn into_encrypted_entry(self, key: &[u8]) -> anyhow::Result<EncryptedEntry> {
        let value = serde_json::to_string(&self)?;
        let encrypted_entry = EncryptedEntry::new(value.as_bytes(), key)?;

        Ok(encrypted_entry)
    }
}
