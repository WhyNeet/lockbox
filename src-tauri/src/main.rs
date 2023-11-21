// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use lockbox::{state::storage::Storage, storage::model::metadata::Metadata};
use serde_json::Value;
use tauri::Manager;

fn main() {
    tauri::Builder::default()
        .setup(|app| {
            let app_data_dir = app
                .path_resolver()
                .app_data_dir()
                .ok_or(anyhow::anyhow!("Failed to retreive app_data_dir"))?;

            app.manage(Storage::new(app_data_dir)?);

            Ok(())
        })
        .invoke_handler(tauri::generate_handler![
            create_password,
            create_vault,
            update_password,
            get_all_passwords,
            delete_passwords,
            unlock_vault,
            vault_created,
            vault_unlocked
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

#[tauri::command]
async fn create_vault(
    storage: tauri::State<'_, Storage>,
    master_pass: String,
) -> Result<String, String> {
    storage.create(master_pass).map_err(|err| err.to_string())?;

    Ok("Vault created".to_string())
}

#[tauri::command]
async fn unlock_vault(
    storage: tauri::State<'_, Storage>,
    master_pass: String,
) -> Result<(), String> {
    storage.unlock(master_pass).map_err(|err| err.to_string())
}

#[tauri::command]
async fn vault_created(storage: tauri::State<'_, Storage>) -> Result<bool, ()> {
    Ok(storage.exists())
}

#[tauri::command]
async fn vault_unlocked(storage: tauri::State<'_, Storage>) -> Result<bool, String> {
    storage.is_unlocked().map_err(|err| err.to_string())
}

#[tauri::command]
async fn create_password(
    storage: tauri::State<'_, Storage>,
    password: String,
    metadata: Metadata,
) -> Result<serde_json::Value, String> {
    let password = storage
        .create_password(password, metadata)
        .map_err(|err| err.to_string())?;

    Ok(password)
}

#[tauri::command]
async fn update_password(
    storage: tauri::State<'_, Storage>,
    password: String,
) -> Result<serde_json::Value, String> {
    let password = storage
        .update_password(password)
        .map_err(|err| err.to_string())?;

    Ok(password)
}

#[tauri::command]
async fn get_all_passwords(storage: tauri::State<'_, Storage>) -> Result<Vec<Value>, String> {
    let passwords = storage.get_all_passwords().map_err(|err| err.to_string())?;

    Ok(passwords)
}

#[tauri::command]
async fn delete_passwords(storage: tauri::State<'_, Storage>) -> Result<String, String> {
    storage
        .delete_all_passwords()
        .map_err(|err| err.to_string())?;

    Ok(String::from("passwords deleted"))
}
