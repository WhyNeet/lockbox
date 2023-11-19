use argon2::{Algorithm, Argon2, Params, Version};

pub fn argon2() -> Result<Argon2<'static>, argon2::Error> {
    Ok(Argon2::new(
        Algorithm::Argon2id,
        Version::V0x13,
        Params::new(64 * 1024, 10, 4, Some(32))?,
    ))
}
