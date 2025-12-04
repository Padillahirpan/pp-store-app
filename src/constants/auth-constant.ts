export const INITIAL_LOGIN_FORM = {
  email: "",
  password: "",
};

export const INITIAL_STATE_LOGIN_FORM = {
  status: "idle",
  errors: {
    email: [],
    password: [],
    _form: [],
  },
};

export const INITIAL_PROFILE = {
  id: "",
  name: "",
  avatar_url: "",
  role: "",
};

export const INITIAL_CREATE_USER_FORM = {
  email: "",
  password: "",
  name: "",
  role: "",
  avatar_url: "",
};

export const INITIAL_STATE_CREATE_USER = {
  status: "idle",
  errors: {
    email: [],
    password: [],
    name: [],
    role: [],
    avatar_url: [],
    _form: [],
  },
};

export const INITIAL_STATE_UPDATE_USER = {
  status: "idle",
  errors: {
    name: [],
    role: [],
    avatar_url: [],
    _form: [],
  },
};

export const ROLES = [
  {
    value: "admin",
    label: "Admin",
  },
  {
    value: "kitchen",
    label: "Kitchen",
  },
  {
    value: "cashier",
    label: "Cashier",
  },
];
