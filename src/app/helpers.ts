export class Utilities {
  containsUpperAndLower(text: string) {
    return /[a-z]/.test(text) && /[A-Z]/.test(text) ? true : false;
  }

  containsNumberOrSymbol(text: string) {
    return /[0-9]/.test(text) || /[.*]/.test(text) ? true : false;
  }

  containsEmail(email: string, text: string) {
    if (email == '' || text == '') {
      return true;
    }

    return text.includes(email) ? true : false;
  }
}
