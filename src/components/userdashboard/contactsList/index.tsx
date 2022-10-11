import { IcontactType } from "../../../interface";
import { useAuth } from "../../../providers/authtoken";
import { useContacts } from "../../../providers/contacts";
import { useEditContact } from "../../../providers/editcontact";
import { useModal } from "../../../providers/modal";
import { useModalType } from "../../../providers/modalType";
import { useUser } from "../../../providers/user";
import { StyledButton } from "../../../styles/Button/style";

function ContactList() {
  const { contacts } = useContacts();
  const { user } = useUser();
  const { changeModal } = useModal();
  const { changeModalType } = useModalType();
  const { changeEditContact } = useEditContact();
  const { getAuth } = useAuth();

  const handleEdit = (contact: IcontactType) => {
    changeEditContact(contact);
    changeModalType("edit");
    changeModal();
  };
  const logout = () => {
    localStorage.clear();
    getAuth();
  };
  return (
    <section className="list__container">
      <div className="user_container">
        <section>
          <h2>Welcome {user.name}</h2>
          <StyledButton onClick={logout}>logout</StyledButton>
        </section>
        <StyledButton
          onClick={() => {
            changeModal();
            changeModalType("add");
          }}
        >
          Add contact
        </StyledButton>
      </div>
      <ul>
        {contacts.map((contact) => {
          return (
            <li key={contact.id}>
              <input value={contact.name} disabled />
              <input value={contact.phone} disabled />
              <input value={contact.email} disabled />
              <section>
                <button onClick={() => handleEdit(contact)}>Edit</button>
              </section>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

export default ContactList;
