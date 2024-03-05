import DefaultService from '@/api/defaultAxios';

type LoginParams = {
  username: string;
  password: string;
}

type LoginResponse = {
  data: {
    token: string;
  },
  status: {
    code: string;
    displayMessage: string;
    message: string;
    responseTime: string;
  }
}

export const fetchLogin = (account: LoginParams) => new Promise<LoginResponse>((resolve, reject) => {
  DefaultService.post('/auth/login', account)
    .then((res) => resolve(res))
    .catch((error) => reject(error.response.data));
});