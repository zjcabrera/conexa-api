export const RolesMockedService = {
  create: jest.fn(() => {
    return true;
  }),
  findAll: jest.fn(() => {
    return true;
  }),
  findOne: jest.fn(() => {
    return true;
  }),
  findBy: jest.fn(() => {
    return true;
  }),
};

export const RolesMockedRepository = {
  createRole: jest.fn(() => {
    return true;
  }),
  findRole: jest.fn(() => {
    return true;
  }),
  findRoleById: jest.fn(() => {
    return true;
  }),
  findRoleBy: jest.fn(() => {
    return true;
  }),
  updateMovie: jest.fn(() => {
    return true;
  }),
  deleteRole: jest.fn(() => {
    return true;
  }),
};
