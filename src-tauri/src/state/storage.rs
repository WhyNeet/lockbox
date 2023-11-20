use std::{path::PathBuf, sync::Mutex};

use serde_json::Value;

use crate::storage::{master::Master, model::metadata::Metadata, passwords::PasswordStorage};

pub struct Storage {
    master: Mutex<Option<Master>>,
    app_data_dir: PathBuf,
    password_storage: PasswordStorage,
}

impl Storage {
    pub fn new(app_data_dir: PathBuf) -> anyhow::Result<Self> {
        let password_storage = PasswordStorage::new(app_data_dir.clone())?;

        Ok(Self {
            master: Mutex::new(None),
            app_data_dir,
            password_storage,
        })
    }

    pub fn create_password(
        &self,
        password: String,
        metadata: Metadata,
    ) -> anyhow::Result<serde_json::Value> {
        let key = self
            .master
            .lock()
            .map_err(|err| anyhow::anyhow!(err.to_string()))?;

        if key.is_none() {
            anyhow::bail!("Vault is not prepared")
        }

        let password =
            self.password_storage
                .create_password(password, metadata, key.as_ref().unwrap())?;

        password.decrypt(key.as_ref().unwrap())
    }

    pub fn get_all_passwords(&self) -> anyhow::Result<Vec<Value>> {
        let master = self
            .master
            .lock()
            .map_err(|err| anyhow::anyhow!(err.to_string()))?;

        if master.is_none() {
            anyhow::bail!("Vault is not prepared")
        }

        let master = master.as_ref().unwrap();

        let passwords = self.password_storage.get_all_passwords(master)?;

        Ok(passwords)
    }

    pub fn delete_all_passwords(&self) -> anyhow::Result<()> {
        if self
            .master
            .lock()
            .map_err(|err| anyhow::anyhow!(err.to_string()))?
            .is_none()
        {
            anyhow::bail!("Vault is not prepared")
        }

        self.password_storage.delete_all_passwords()?;

        Ok(())
    }
}

impl Storage {
    pub fn create(&self, password: String) -> anyhow::Result<()> {
        if Master::check_exists(self.app_data_dir.clone()) {
            anyhow::bail!("Vault is already created")
        }

        let master = Master::new(password.as_bytes(), self.app_data_dir.clone())?;

        master.store()?;

        let mut key = self
            .master
            .lock()
            .map_err(|err| anyhow::anyhow!(err.to_string()))?;

        *key = Some(master);

        Ok(())
    }

    pub fn unlock(&self, password: String) -> anyhow::Result<()> {
        let master = Master::new_from_stored(password.as_bytes(), self.app_data_dir.clone())?;

        let mut key = self
            .master
            .lock()
            .map_err(|err| anyhow::anyhow!(err.to_string()))?;

        *key = Some(master);

        Ok(())
    }

    pub fn is_unlocked(&self) -> anyhow::Result<bool> {
        let key = self
            .master
            .lock()
            .map_err(|err| anyhow::anyhow!(err.to_string()))?;

        Ok(key.is_some())
    }

    pub fn exists(&self) -> bool {
        let master_exists = Master::check_exists(self.app_data_dir.clone());
        let db_exists = self.app_data_dir.join("app.db").exists();

        master_exists && db_exists
    }
}
