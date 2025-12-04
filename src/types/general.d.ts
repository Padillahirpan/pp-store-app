export type formState = {
  status?: string;
  errors?: {
    _form?: string[];
  };
};

export type PreviewImage = {
  file: File;
  displayUrl: string;
};
