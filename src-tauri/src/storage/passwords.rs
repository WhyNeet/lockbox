use std::{
    path::PathBuf,
    sync::{Arc, Mutex},
};

use rusqlite::Connection;
use serde_json::Value;

use super::model::{metadata::Metadata, password::Password};

pub struct PasswordStorage(Arc<Mutex<Connection>>);

impl PasswordStorage {
    pub fn new(app_data_dir: PathBuf) -> anyhow::Result<Self> {
        let conn = Connection::open(app_data_dir.join("app.db"))?;

        conn.execute(
            r#"CREATE TABLE IF NOT EXISTS passwords (
            id BLOB PRIMARY KEY,
            password BLOB NOT NULL,
            metadata BLOB NOT NULL
        )"#,
            (),
        )?;

        let conn = Arc::new(Mutex::new(conn));

        Ok(Self(conn))
    }

    pub fn create_password(
        &self,
        password: String,
        metadata: Metadata,
        key: &[u8],
    ) -> anyhow::Result<Password> {
        let conn = self.0.lock().unwrap();

        let password = Password::new(password.as_bytes(), metadata, key)
            .map_err(|err| anyhow::anyhow!(err.to_string()))?;

        conn.execute(
            r#"INSERT INTO passwords (id, password, metadata) VALUES ($1, $2, $3)"#,
            password.clone().into_params()?,
        )?;

        Ok(password)
    }

    pub fn update_password(&self, password: Password) -> anyhow::Result<Password> {
        let conn = self.0.lock().unwrap();

        conn.execute(
            r#"UPDATE passwords SET password = $2, metadata = $3 WHERE id = $1"#,
            password.clone().into_params()?,
        )?;

        Ok(password)
    }

    pub fn get_all_passwords(&self, key: &[u8]) -> anyhow::Result<Vec<Value>> {
        let conn = self.0.lock().unwrap();

        let mut passwords = conn.prepare(r#"SELECT * FROM passwords"#)?;
        let mut passwords = passwords.query(())?;

        let mut p = Vec::new();

        while let Some(row) = passwords.next()? {
            p.push(Password::from_row(row)?.decrypt(key)?);
        }

        Ok(p)
    }

    pub fn delete_all_passwords(&self) -> anyhow::Result<()> {
        let conn = self.0.lock().unwrap();

        conn.execute(r#"DELETE FROM passwords"#, ())?;

        Ok(())
    }
}
