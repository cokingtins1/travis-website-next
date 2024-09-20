export default function getAdmin(userId: string): boolean {
  const admins = [
    {
      email: "cokingtins1@gmail.com",
      id: "292e2950-49b1-4637-9697-83d33751e6f4",
    },
    {
      email: "seancokingtin@gmail.com",
      id: "26dcbb0d-3447-4021-9d8c-9a4e2badd31c",
    },

    {
      email: "beatsmadebyTrav@gmail.com",
      id: "26441262-5775-49d1-9edb-c6c0b07aee0c",
    },
  ];

  const adminSignedIn = admins.some((admin) => admin.id === userId);

  return adminSignedIn;
}
