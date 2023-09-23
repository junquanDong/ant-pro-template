export const baseInfo = [
  {
    label: '姓名',
    key: 'user.real_name',
    placeholder: '请输入姓名',
  },
  {
    label: '手机号',
    required: true,
    key: 'user.phone',
    placeholder: '请输入手机号',
  },
  {
    label: '公司名称',
    key: 'company.name',
    placeholder: '请输入公司名称',
  },
  {
    label: '邮箱',
    key: 'user.email',
    placeholder: '请输入邮箱',
  },
  {
    label: '公司税号',
    key: 'company.invoicing_tax_number',
    placeholder: '请输入公司税号',
  },
  {
    label: '公司ID',
    disabled: true,
    existShow: true,
    key: 'company.company_id',
  },
  {
    label: '账号ID',
    disabled: true,
    existShow: true,
    key: 'user.id',
  },
  {
    label: '密码',
    defaultValue: false,
    key: 'user.password',
  },
  {
    label: '是否主管理员',
    key: 'user.is_admin',
  },
];

export const invoicingInfo = [
  {
    label: '开票名称',
    key: 'company.invoicing_name',
    placeholder: '请输入开票名称',
  },
  {
    label: '银行账号',
    key: 'company.bank_account',
    placeholder: '请输入银行账号',
  },
  {
    label: '银行名称',
    key: 'company.invoicing_bank',
    placeholder: '请输入银行名称',
  },
  {
    label: '公司税号',
    key: 'company.tax_number',
    placeholder: '请输入公司税号',
  },
  {
    label: '邮寄地址',
    key: 'company.mailing_address',
    placeholder: '请输入邮寄地址',
  },
  {
    label: '收件人',
    key: 'company.recipient',
    placeholder: '请输入收件人',
  },
  {
    label: '收件电话',
    key: 'company.recipient_phone',
    placeholder: '请输入收件电话',
  },
];
