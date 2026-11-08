const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateEmail(email) {
  if (typeof email !== 'string' || email.trim() === '') {
    return { ok: false, error: 'Email is required' };
  }
  if (!EMAIL_REGEX.test(email.trim())) {
    return { ok: false, error: 'Invalid email' };
  }
  return { ok: true, error: null };
}

export function validateContact(body) {
  const { name, email, message } = body || {};
  if (typeof name !== 'string' || name.trim() === '') {
    return { ok: false, error: 'Name is required' };
  }
  const emailCheck = validateEmail(email);
  if (!emailCheck.ok) {
    return emailCheck;
  }
  if (typeof message !== 'string' || message.trim() === '') {
    return { ok: false, error: 'Message is required' };
  }
  return { ok: true, error: null };
}
