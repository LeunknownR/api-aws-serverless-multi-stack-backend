type User = Readonly<{
  id: string;
  email: string;
  postalCode: string;
  fullAddress: string;
  phone: string;
}>;

export default User;
