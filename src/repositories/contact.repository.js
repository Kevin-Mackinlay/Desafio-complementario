import ContactDto from "../DTOs/contact.dto.js";

class ContactRepository{
      constructor(dao){
        this.dao = dao
    }

    getContact = async(user) => {
        const contact = await this.dao.getByUser(user)
        return new ContactDto(contact)
    }
}

export default ContactRepository;