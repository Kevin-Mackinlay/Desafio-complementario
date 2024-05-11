class ContactDto {
  constructor(contact) {
    (this._id = contact._id), (this.fullName = `${contact.firstName} ${contact.lastName}`), (this.email = contact.email), (this.birthDate = contact.birthDate), (this.role = contact.role), (this.lastConnection = contact.lastConnection);
  }
}

export default ContactDto;