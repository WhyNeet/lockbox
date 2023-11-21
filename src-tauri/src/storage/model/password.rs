use rusqlite::Row;
use serde::Deserialize;
use serde_json::json;
use uuid::Uuid;

use crate::storage::model::entry::DecryptedEntry;

use super::{entry::EncryptedEntry, metadata::Metadata};

#[derive(Clone)]
pub struct Password {
    id: Uuid,
    password: EncryptedEntry,
    metadata: EncryptedEntry,
}

impl Password {
    pub fn new(password: &[u8], metadata: Metadata, key: &[u8]) -> anyhow::Result<Self> {
        let password = EncryptedEntry::new(password, key).map_err(|err| anyhow::anyhow!(err))?;
        let metadata = metadata.into_encrypted_entry(key)?;

        Ok(Self {
            id: Uuid::new_v4(),
            password,
            metadata,
        })
    }

    pub fn into_params(self) -> anyhow::Result<(Uuid, Vec<u8>, Vec<u8>)> {
        Ok((
            self.id,
            self.password.get_hash()?,
            self.metadata.get_hash()?,
        ))
    }

    pub fn update_metadata(&mut self, metadata: Metadata, key: &[u8]) -> anyhow::Result<()> {
        self.metadata = metadata.into_encrypted_entry(key)?;

        Ok(())
    }
}

#[derive(Deserialize)]
pub struct PasswordJsonEntry {
    id: Uuid,
    password: String,
    metadata: Metadata,
}

impl Password {
    pub fn decrypt(&self, key: &[u8]) -> anyhow::Result<serde_json::Value> {
        Ok(
            json!({ "id": self.id, "password": String::from_utf8_lossy(&DecryptedEntry::from(&self.password, key)?).to_string(), "metadata": String::from_utf8_lossy(&DecryptedEntry::from(&self.metadata, key)?).to_string() }),
        )
    }

    pub fn from_json(password: String, key: &[u8]) -> anyhow::Result<Self> {
        let password: PasswordJsonEntry = serde_json::from_str(&password)?;
        let id = password.id;
        let mut password = Password::new(password.password.as_bytes(), password.metadata, key)?;

        password.id = id;

        Ok(password)
    }
}

impl Password {
    pub fn from_row(row: &Row<'_>) -> anyhow::Result<Self> {
        let id = row.get::<usize, Uuid>(0)?;
        let password = row.get::<usize, Vec<u8>>(1)?.into();
        let metadata = row.get::<usize, Vec<u8>>(2)?.into();

        Ok(Self {
            id,
            password,
            metadata,
        })
    }
}
