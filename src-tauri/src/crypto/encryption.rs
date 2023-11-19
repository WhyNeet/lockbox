use aes_gcm::{
    aead::{Aead, OsRng},
    AeadCore, Aes256Gcm, Key, KeyInit, Nonce,
};

pub fn encrypt_value(password: &[u8], key: &[u8]) -> Result<(Vec<u8>, Vec<u8>), aes_gcm::Error> {
    let key = Key::<Aes256Gcm>::from_slice(key);
    let cipher = Aes256Gcm::new(key);
    let nonce = Aes256Gcm::generate_nonce(&mut OsRng);
    let ciphertext = cipher.encrypt(&nonce, password).unwrap();

    Ok((ciphertext, nonce.to_vec()))
}

pub fn decrypt_value(
    ciphertext: &[u8],
    key: &[u8],
    nonce: &[u8],
) -> Result<Vec<u8>, aes_gcm::Error> {
    let key = Key::<Aes256Gcm>::from_slice(key);
    let cipher = Aes256Gcm::new(key);
    let nonce = Nonce::from_slice(nonce);
    let plaintext = cipher.decrypt(nonce, ciphertext)?;

    Ok(plaintext)
}
