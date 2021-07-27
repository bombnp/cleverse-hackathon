export enum FormRule {
  REQUIRE = 'require',
  EMAIL = 'email',
  PHONE_NUMBER = 'phoneNumber',
  UPLOAD_REQUIRE = 'upload-require',
  IS_URL = 'is-url'
}
const DEFAULT_ERROR_MSG = 'กรุณากรอกข้อมูล';

export const getRule = (
  type: FormRule,
  msg: String = DEFAULT_ERROR_MSG
): any => {
  if (type === FormRule.REQUIRE) return { required: true, message: msg };

  if (type === FormRule.EMAIL)
    return {
      pattern: new RegExp(
        /^([A-Za-z0-9_\-\.]){1,}\@([A-Za-z0-9_\-\.]){1,}\.([A-Za-z]){2,4}$/ // eslint-disable-line no-useless-escape
      ),
      message: 'รูปแบบอีเมลไม่ถูกต้อง'
    };
  if (type === FormRule.PHONE_NUMBER)
    return {
      pattern: new RegExp(/^0\(?([0-9]{2})\)?[- ]?([0-9]{3})[- ]?([0-9]{4})$/), // eslint-disable-line no-useless-escape
      message: 'รูปแบบเบอร์โทรศัพท์ไม่ถูกต้อง'
    };

  if (type === FormRule.UPLOAD_REQUIRE)
    // @ts-ignore
    return () => ({
      validator(rule: any, value: any) {
        if (value && value.fileList.length > 0) return Promise.resolve();
        return Promise.reject(msg);
      }
    });
  if (type === FormRule.IS_URL)
    return {
      pattern: new RegExp(
        '^(https?:\\/\\/)?' + // protocol
          '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
          '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
          '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
          '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
          '(\\#[-a-z\\d_]*)?$',
        'i'
      ),
      message: msg
    };
};
