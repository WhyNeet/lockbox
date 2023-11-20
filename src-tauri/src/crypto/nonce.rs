use aes::cipher::typenum::U16;
use aes::cipher::{generic_array::GenericArray, BlockDecrypt, BlockEncrypt, KeyInit};
use aes::Aes256;

pub fn encrypt_nonce(nonce: &[u8], key: &[u8]) -> anyhow::Result<Vec<u8>> {
    let key = GenericArray::from_slice(key);
    let mut block: GenericArray<u8, U16> = [0u8; 16].into();
    let random_bytes: [u8; 4] = rand::random();

    block[..nonce.len()].copy_from_slice(nonce);
    block[nonce.len()..].copy_from_slice(&random_bytes);

    let cipher = Aes256::new(key);
    cipher.encrypt_block(&mut block);

    Ok(block.to_vec())
}

pub fn decrypt_nonce(nonce: &[u8], key: &[u8]) -> anyhow::Result<Vec<u8>> {
    let key = GenericArray::from_slice(key);
    let mut block: GenericArray<u8, U16> = *GenericArray::from_slice(nonce);

    let cipher = Aes256::new(key);
    cipher.decrypt_block(&mut block);

    Ok(block.to_vec())
}
