use std::{fs, ops::Deref, path::PathBuf};

use crate::crypto::{kdf, master, nonce};

pub struct Master {
    key: Vec<u8>,
    storage_path: PathBuf,
}

impl Master {
    pub fn new(password: &[u8], app_data_dir: PathBuf) -> anyhow::Result<Self> {
        let key = kdf::kdf(password).map_err(|err| anyhow::anyhow!(err))?;

        Ok(Self {
            key,
            storage_path: app_data_dir.join(".lbx"),
        })
    }

    pub fn check_exists(app_dir: PathBuf) -> bool {
        app_dir.join(".lbx").exists()
    }

    pub fn new_from_stored(password: &[u8], app_data_dir: PathBuf) -> anyhow::Result<Self> {
        if !Master::check_exists(app_data_dir.clone()) {
            anyhow::bail!("Vault is not created")
        }

        let challenge = fs::read(app_data_dir.join(".lbx"))?;
        let key = kdf::kdf(password).map_err(|err| anyhow::anyhow!(err))?;

        if !master::compare_master_challenge(&key, &challenge)
            .map_err(|err| anyhow::anyhow!(err.to_string()))?
            .is_empty()
        {
            anyhow::bail!("Master password does not match")
        }

        Ok(Self {
            key,
            storage_path: app_data_dir.join(".lbx"),
        })
    }

    pub fn store(&self) -> anyhow::Result<()> {
        let (mut challenge, nonce) = master::encrypt_master_challenge(&self.key)?;
        let mut nonce = nonce::encrypt_nonce(&nonce, &self.key)?;
        challenge.append(&mut nonce);
        fs::write(self.storage_path.clone(), challenge)?;

        Ok(())
    }
}

impl Deref for Master {
    type Target = [u8];
    fn deref(&self) -> &Self::Target {
        &self.key
    }
}
