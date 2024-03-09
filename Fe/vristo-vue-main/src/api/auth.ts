import DefaultService, { StatusResponse } from '@/api/defaultAxios';

type LoginParams = {
  username: string;
  password: string;
}

interface LoginResponse extends StatusResponse {
  data: {
    token: string;
  }
}

export const fetchLogin = (account: LoginParams) => new Promise<LoginResponse>((resolve, reject) => {
  DefaultService.post('/auth/login', account)
    .then((res: LoginResponse | PromiseLike<LoginResponse>) => resolve(res))
    .catch((error: { response: { data: any; }; }) => reject(error.response.data));
});