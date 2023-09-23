// @ts-ignore
/* eslint-disable */

declare namespace UserEdit {
  type InfoUser = {
    id?: number;
    username?: string;
    real_name?: string;
    phone?: string;
    password?: string;
    is_admin?: boolean;
  };

  type InfoCompany = {
    id?: number;
    name?: string;
    company_id?: string;
    addr?: string;
    legal_person?: string;
    tax_number?: string;
    invoicing_bank?: string;
    invoicing_name?: string;
    bank_account?: string;
    mailing_address?: string;
    recipient?: string;
    recipient_phone?: string;
  };

  type EditInfo = {
    user: InfoUser;
    company: InfoCompany;
  };

  /* API */
  type APIDefaultParams = {
    user_id: number | string;
  };

  type UserInfoResult = {
    code: number;
    message?: string;
    data: EditInfo;
  };

  type DefaultResult = {
    code: number;
    message?: string;
  };
}
