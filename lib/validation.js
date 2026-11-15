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

export const CONTACT_KINDS = ['idea', 'comment'];

export function validateContact(body, experimentSlugs = []) {
  const { name, email, message, kind = 'idea', about = '' } = body || {};
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
  if (!CONTACT_KINDS.includes(kind)) {
    return { ok: false, error: 'Invalid kind' };
  }
  if (about !== '' && about !== null && !experimentSlugs.includes(about)) {
    return { ok: false, error: 'Unknown experiment' };
  }
  return { ok: true, error: null };
}
