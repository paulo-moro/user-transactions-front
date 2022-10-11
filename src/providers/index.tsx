import { Ichildrentype } from "../interface";
import { AuthProvider } from "./authtoken";
import { ContactTypeProvider } from "./contactForm";
import { ContactsProvider } from "./contacts";
import { EditContactProvider } from "./editcontact";
import { ModalProvider } from "./modal";
import { ModalTypeProvider } from "./modalType";
import { UserProvider } from "./user";

const Providers = ({ children }: Ichildrentype) => {
  return (
    <AuthProvider>
      <UserProvider>
        <ContactsProvider>
          <ContactTypeProvider>
            <EditContactProvider>
              <ModalTypeProvider>
                <ModalProvider>{children}</ModalProvider>
              </ModalTypeProvider>
            </EditContactProvider>
          </ContactTypeProvider>
        </ContactsProvider>
      </UserProvider>
    </AuthProvider>
  );
};

export default Providers;
